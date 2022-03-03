using Sp.Models;
using SP.DAL.Models;
using SP.DAL.Repository;
using SP.Models;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        private IStudentRepository _students;
        private IInstitutionRepository _institutions;
        private ISchoolRepository _schools;
        private IDepartmentRepository _departments;
        private IProgramRepository _programs;
        private IGradesSettingsRepository _gradesSettings;
        private ICourseRepository _courses;
        private ILookupRepository _lookups;
        private ILecturerRepository _lecturers;
        private IUserPermissionRepository _userPermissions;
        private IPagesRepository _pages;
        private IStatusControlRepository _statusControls;

        public UnitOfWork()
        {
            DataWriter.Start(25);
        }
        public IStudentRepository Students => _students ??= new StudentRepository(LoadStudents());

        public IInstitutionRepository Institutions => _institutions ??= new InstitutionRepository(LoadInstitutions());

        public ISchoolRepository Schools => _schools ??= new SchoolRepository(LoadSchools());

        public IDepartmentRepository Departments => _departments ??= new DepartmentRepository(LoadDepartments());

        public IProgramRepository Programs => _programs ??= new ProgramRepository(LoadPrograms());

        public ICourseRepository Courses => _courses ??= new CourseRepository(LoadCourses());

        public ILookupRepository Lookups => _lookups ??= new LookupRepository(LoadLookups());

        public ILecturerRepository Lecturers => _lecturers ??= new LecturerRepository(LoadLectures());

        public IGradesSettingsRepository GradesSettings => _gradesSettings ??= new GradesSettingsRepository(LoadGradesSettings());

        public IUserPermissionRepository UserPermissions => _userPermissions??=  new UserPermissionRepository(LoadUserPermission());
        public IPagesRepository Pages => _pages ??= new PagesRepository(LoadPage());

        public IStatusControlRepository StatusControls => _statusControls??= new StatusControlRepository(LoadStatusControls());

        private StudentDM LoadStudents()
        {
            var registeredCourses = DataReader
                .ReadCsv<RegisteredCourse>(nameof(RegisteredCourse))
                .Distinct(x => x.RegisteredCourseId, x => x.State)
                .Where(x => !x.Deleted)
                .GroupBy(x => x.StudentId)
                .ToDictionary(x => x.Key, x => x.ToArray());

            var studentResults = DataReader
                .ReadCsv<StudentResult>(nameof(StudentResult))
                .Distinct(x => x.ExamResultId, x => x.State)
                //.Where(x => !x.Deleted)
                .GroupBy(b => b.StudentId)
                .ToDictionary(x=>x.Key, x=>x.ToArray());

            var emergencyContact = DataReader
                .ReadCsv<EmergencyContact>(nameof(EmergencyContact))
                .Distinct(x => x.Id, x => x.State).ToList();

            var studentsList = DataReader
                .ReadCsv<Student>(nameof(Student))
                .Distinct(x => x.StudentId, x => x.State).ToArray();

            var students = new StudentDM(50000);
            for(var s = 0; s < studentsList.Length; s++)
            {
                Student student = studentsList[s];
                registeredCourses.TryGetValue(student.StudentId, out RegisteredCourse[] registerCourses);
                student.RegisterCourses(registerCourses);
                studentResults.TryGetValue(student.StudentId, out StudentResult[] examResults);
                student.AddResults(examResults);
                student.AddEmergencyContact(emergencyContact.Where(x => x.StudentId == student.StudentId));
                students.Add(student);
            }
            return students;
        }

        private InstitutionDM LoadInstitutions()
        {
            var _institutions = DataReader
                .ReadCsv<Institution>(nameof(Institution))
                .Distinct(x => x.InstitutionId, x => x.State);
            var institutions = new InstitutionDM(10);
            foreach (var student in _institutions)
            {
                institutions.Add(student);
            }
            return institutions;
        }

        private LookupDM LoadLookups()
        {
           var _lookups = DataReader
                .ReadCsv<Lookup>(nameof(Lookup))
                .Distinct(x => x.LookupId, x => x.State);
            var lookups = new LookupDM(1000);
            foreach (var s in _lookups)
            {
                lookups.Add(s);
            }
            return lookups;
        }

        private ProgramDM LoadPrograms()
        {
            var _programs =
                 DataReader
                 .ReadCsv<Program>(nameof(Program))
                 .Distinct(x => x.ProgramId, x => x.State);
            var mountedCourses =
                DataReader
                .ReadCsv<MountedCourse>(nameof(MountedCourse))
                .Where(x => !x.Deleted)
                .Distinct(x => x.MountedCourseId, x => x.State);
            var specialization =
                DataReader
                .ReadCsv<Specialization>(nameof(Specialization))
                .Where(x => !x.Deleted)
                .Distinct(x => x.SpecializationId, x => x.State);
            var creditLimits =
                DataReader.ReadCsv<CreditLimit>(nameof(CreditLimit))
                .Distinct(x => x.CreditLimitId, x => x.State);
            var programs = new ProgramDM(1000);
            foreach (var program in _programs)
            {
                program.MountCourses(mountedCourses.Where(x => x.ProgramId == program.ProgramId));
                program.AddSpecializations(specialization.Where(x=>x.ProgramId == program.ProgramId));
                program.AddCreditLimits(creditLimits.Where(x => x.ProgramId == program.ProgramId));
                programs.Add(program);
            }
            return programs;
        }


        private GradesSettingsDM LoadGradesSettings()
        {
            var _gradesSettings =
                 DataReader
                 .ReadCsv<GradesSettings>(nameof(GradesSettings))
                 .Distinct(x => x.GradesSettingsId, x => x.State);
            
            var gradesSettings = new GradesSettingsDM(1000);
            foreach (var program in _gradesSettings)
            {
                gradesSettings.Add(program);
            }
            return gradesSettings;
        }

        private SchoolDM LoadSchools()
        {
            var _schools = DataReader
                .ReadCsv<School>(nameof(School))
                .Distinct(x => x.SchoolId, x => x.State);
            var schools = new SchoolDM(200);
            foreach (var s in _schools)
            {
                schools.Add(s);
            }
            return schools;
        }

        private CourseDM LoadCourses()
        {
            var _courses = DataReader
                .ReadCsv<Course>(nameof(Course))
                .Distinct(x => x.CourseId, x => x.State);
            var courses = new CourseDM(2000);
            foreach(var c in _courses)
            {
                courses.Add(c);
            }
            return courses;
        }

        private UserPermissionDM LoadUserPermission()
        {
            var _userPermission = DataReader
                .ReadCsv<UserPermission>(nameof(UserPermission))
                .Where(x => !x.Deleted)
                .Distinct(x => x.Id, x => x.State);
            var userPermission = new UserPermissionDM(10000);
            foreach(var up in _userPermission)
            {
               userPermission.Add(up);
            }
            return userPermission;
        }
        private PageDM LoadPage()
        {
            var _page = DataReader
                .ReadCsv<Page>(nameof(Page))
                .Distinct(x => x.Id, x => x.State);
            var page = new PageDM(10000);
            foreach(var up in _page)
            {
               page.Add(up);
            }
            return page;
        }

        private LecturerDM LoadLectures()
        {
            var _lecturers = DataReader
                .ReadCsv<Lecturer>(nameof(Lecturer))
                .Distinct(x => x.LecturerId, x => x.State);
            var lecturers = new LecturerDM(1000);
            foreach (var c in _lecturers)
            {
                lecturers.Add(c);
            }
            return lecturers;
        }

        private DepartmentDM LoadDepartments()
        {
            var _departments = DataReader
                .ReadCsv<Department>(nameof(Department))
                .Distinct(x => x.DepartmentId, x => x.State);
            var departments = new DepartmentDM(1000);
            foreach (var c in _departments)
            {
                departments.Add(c);
            }
            return departments;
        }

        private StatusControlDM LoadStatusControls()
        {
            var _statusControls = DataReader
                .ReadCsv<StatusControl>(nameof(StatusControl))
                .Distinct(x => x.Id, x => x.State);
            var statusControls = new StatusControlDM(1000);
            foreach (var c in _statusControls)
            {
                statusControls.Add(c);
            }
            return statusControls;
        }

        public void SaveChanges<T>(IList<T> data, string table)
        {
            DataWriter.AddRange(data, table);
        }

        public void SaveChanges()
        {
        }

    }
}
