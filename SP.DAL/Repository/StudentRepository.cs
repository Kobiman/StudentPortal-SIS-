using KMapper;
using Microsoft.VisualBasic;
using Sp.Models.Dtos;
using Sp.Models.Dtos.Request;
using Sp.Models.Dtos.Response;
using SP.DAL.Models;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SP.DAL.Repository
{
    public class StudentRepository : IStudentRepository
    {
        private StudentDM Collection;
        public StudentRepository(StudentDM collection)
        {
            Collection = collection;
        }

        public bool AddStudent(AddStudentRequest request)
        {
            var student = request.Map<Student, AddStudentRequest>();
            Collection.Add(student);
            var _student = student.Map<_Student, Student>();
            DataWriter.Add(_student, nameof(Student));
            return true;
        }

        public bool UpdateStudent(UpdateStudentRequest student)
        {
            var result = Collection.Find((x, y) => x.IndexNumber[y] == student.IndexNumber);
            if (!result.success) return false;
            //student.Map(result.Value);
            var originalStudent = result.Value;

            originalStudent.Address1[result.Index] = student.Address1;
            originalStudent.Address2[result.Index] = student.Address2;
            originalStudent.Contact1[result.Index] = student.Contact1;
            originalStudent.Contact2[result.Index] = student.Contact2;
            originalStudent.Country[result.Index] = student.Country;
            originalStudent.DateofBirth[result.Index] = student.DateofBirth;
            //originalStudent.DateOfCompletion.Span[result.Index] = student.DateOfCompletion;
            originalStudent.DateOfEntry[result.Index] = student.DateOfEntry;
            //originalStudent.DepartmentId.Span[result.Index] = student.DepartmentId;
            originalStudent.Disability[result.Index] = student.Disability;
            //originalStudent.EmergencyContact.Span[result.Index] = student.EmergencyContact;
            //originalStudent.EnrollmentOption.Span[result.Index] = student.EnrollmentOption;
            originalStudent.Gender[result.Index] = student.Gender;
            originalStudent.HomeTown[result.Index] = student.HomeTown;
            originalStudent.IndexNumber[result.Index] = student.IndexNumber;
            originalStudent.Level[result.Index] = student.Level;
            originalStudent.MaritalStatus[result.Index] = student.MaritalStatus;
            originalStudent.Othernames[result.Index] = student.Othernames;
            originalStudent.PamentOption[result.Index] = student.PamentOption;
            originalStudent.PersonalEmail[result.Index] = student.PersonalEmail;
            originalStudent.ProgramId[result.Index] = student.ProgramId;
            originalStudent.ProgramStatus[result.Index] = student.ProgramStatus;
            originalStudent.ReferenceNumber[result.Index] = student.ReferenceNumber;
            originalStudent.Region[result.Index] = student.Region;
            //originalStudent.RegistrationStatus.Span[result.Index] = student.RegistrationStatus;
            originalStudent.ResidentialStatus[result.Index] = student.ResidentialStatus;
            originalStudent.Specialization[result.Index] = student.Specialization;
            originalStudent.State[result.Index]++;
            originalStudent.StudentType[result.Index] = student.StudentType;
            originalStudent.Surname[result.Index] = student.Surname;
            originalStudent.Title[result.Index] = student.Title;
            originalStudent.UniversityEmail[result.Index] = student.UniversityEmail;
            var s = result.Value.CreateStudent(result.Index);
            s.State = originalStudent.State[result.Index];
            DataWriter.Add(s, nameof(Student));
            return true;
        }

        public bool UpdateStudents(IEnumerable<UpdateStudentRequest> students)
        {
            foreach (var student in students)
            {
                UpdateStudent(student);
            }
            return true;
        }

        public bool AddStudents(IEnumerable<Student> students)
        {
            foreach (var student in students)
            {
                Collection.Add(student);
                DataWriter.Add(students, nameof(Student));
            }
            return true;
        }

        public bool AddResults(List<StudentResult> studentResults)
        {
            foreach (var r in studentResults)
            {
                var student = Collection.Find((x, y) => x.IndexNumber[y] == r.IndexNumber); 
                if (student.success)
                {
                    r.StudentId = student.Value.StudentId[student.Index];
                    student.Value.AddResult(r, student.Index);
                    DataWriter.Add(r, nameof(StudentResult));
                }
            }          
            return true;
        }

        public bool UpdateResults(List<ApproveResultsDto> studentResults)
        {
            var result = Collection.Find((x, y) => x.IndexNumber[y] == studentResults[0].IndexNumber);
            if (!result.success) return false;
            result.Value.UpdateResults(studentResults, result.Index);
            return true;
        }

        public bool ApproveRegistration(IEnumerable<ApproveRegisteredCourseDto> registeredCourses)
        {
            foreach(var r in registeredCourses)
            {
                var student = Collection.Find((x,y)=> x.IndexNumber[y] == r.IndexNumber);
                foreach(var c in r.ApproveCourses)
                {
                    student.Value.RegisteredCourses[student.Index].Approve(c.RegisteredCourseId,c.Status);
                }
            }
            
            return true;
        }

        public bool RegisterCourses(IList<RegisteredCourse> courses)
        {
            var student = Collection.Find((x,y)=> x.StudentId[y] == courses.FirstOrDefault().StudentId);
            if (!student.success) return false;
            student.Value.RegisterCourses(courses,student.Index);
            DataWriter.AddRange(courses, nameof(RegisteredCourse));
            return true;
        }

        public bool UpdateRegisteredCourses(IList<RegisteredCourse> courses)
        {
            var student = Collection.Find((x, y) => x.StudentId[y] == courses.FirstOrDefault().StudentId);
            if (!student.success) return false;
            student.Value.UpdateRegisteredCourses(courses, student.Index);
            return true;
        }

        public Student GetStudent(string indexNumber)
        {
            var result = Collection.Find((x, y) => x.IndexNumber[y] == indexNumber);
            if (!result.success) return null;
            return result.Value.CreateStudentWithChildren(result.Index);
        }

        public IEnumerable<Student> GetStudentsByLevel(string level)
            => Collection.Select((x, y) => x.Level[y] == level, (x, y) => x.CreateStudentWithChildren(y));

        public IEnumerable<StudentEnteryLevelResponse> GetStudentsEnteryLevel()
        {
            return Collection.SelectMany(x => x.Results, 
                //(a,b) => a.ProgramStatus != ""
                (y, z) => new StudentEnteryLevelResponse 
                { 
                    Level = y.CreateStudentResults(z).FirstOrDefault().Level, 
                    IndexNumber = y.IndexNumber[z]
                });
        }

        public IEnumerable<Student> GetStudents()
            => Collection.Select((x, y) => x.CreateStudent(y));

        public bool IndexNumberExist(string indexNumber)
        {
            var result = Collection.Find((x,y) => x.IndexNumber[y] == indexNumber);
            if (!result.success) return false;
            return true;
        }

        public bool ReferenceNumberExist(string referenceNumber)
        {
            var result = Collection.Find((x, y) => x.ReferenceNumber[y] == referenceNumber);
            if (!result.success) return false;
            return true;
        }

        public IEnumerable<Student> GetStudentsByProgram(string program)
            => Collection.Select((x, y) => x.ProgramId[y] == program, (x, y) => x.CreateStudentWithChildren(y));
        public IEnumerable<Student> GetStudentsByProgram(string program, string level)
            => Collection.Select((x, y) => x.ProgramId[y] == program && x.Level[y] == level, 
                (x, y) => x.CreateStudent(y));


        public IEnumerable<GetMountedCoursesForRegistrationReponse> GetStudentsByProgram(string programId, string academicYear, string level)
            => Collection.Select((x, y) => x.ProgramId[y] == programId && x.Level[y] == level, 
                (x, y) => x.CreateStudentWithRegisteredCourses(academicYear, y));

        public IEnumerable<StudentResult> GetStudentResults(string programId)
            => Collection.SelectMany(x => x.Results, 
                (x, y) => x.ProgramId[y] == programId,  
                (a, b) => a.CreateStudentResult(b));
        public IEnumerable<TrailCourseDto> GetTrailCourses(string studentId, string level, Dictionary<string, MountedCourse> mountedCourses)
        {
            var l = int.Parse(level);
            var result = Collection.Find((x, y) => x.StudentId[y] == studentId);
            return result.Value.Results[result.Index].Select((x, y) => int.Parse(x.Level[y]) <= l,
                         (a, b) =>
                         {
                             mountedCourses.TryGetValue(a.RegisteredCourseId[b], out MountedCourse m);
                             return new TrailCourseDto(
                                 a.RegisteredCourseId[b], 
                                 a.Grade[b], a.Date[b],
                                 m?.CourseCode, 
                                 m?.CourseName, 
                                 m?.Credit, 
                                 m?.Category);
                         });
        }

        public IEnumerable<Student> GetStudentResults(string academicYear, string programId, string level)
           => Collection.SelectMany(x => x.Results,
            (x, y) => x.AcademicYear[y] == academicYear 
             && x.ProgramId[y] == programId 
             && x.Level[y] == level,
            (a, b) => a.CreateStudentWithResults(b));

        public IEnumerable<Student> GetRegisteredCourses(string academicYear, string semester, string programId)
          => Collection.SelectMany(x => x.RegisteredCourses,
            (x, y) => x.AcademicYear[y] == academicYear 
             && x.ProgramId[y] == programId 
             && x.Semester[y] == semester,
            (a, b) => a.CreateStudentWithResults(b));

        public IEnumerable<GetRegisteredStudentsReponse> GetRegisteredStudents(string mountedCourseId, string semester, string academicYear, string programId)
        {
            return Collection.SelectMany(x => x.RegisteredCourses,
            (x, y) => x.MountedCourseId[y] == mountedCourseId && x.Semester[y] == semester && x.AcademicYear[y] == academicYear && x.ProgramId[y] == programId,
            (a, b) => {
                return new GetRegisteredStudentsReponse
                {
                    Name = $"{a.Surname[b]} {a.Othernames[b]}",
                    Indexnumber = a.IndexNumber[b],
                    Level = a.Level[b],
                    ProgramId = a.ProgramId[b]
                };
            });
        }
    }
}
