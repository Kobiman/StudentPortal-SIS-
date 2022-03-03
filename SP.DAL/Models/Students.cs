using Sp.Models.Dtos.Request;
using Sp.Models.Dtos.Response;
using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SP.DAL.Models
{
    public class StudentDM
    {
        public StudentDM(int length)
        {
            this.length = length;
            StudentId = new string[length];
            IndexNumber = new string[length];
            ReferenceNumber = new string[length];
            Surname = new string[length];
            Othernames = new string[length];
            Title = new string[length];
            Gender = new string[length];
            MaritalStatus = new string[length];
            DateofBirth = new DateTime[length];
            Disability = new bool[length];
            Country = new string[length];
            Region = new string[length];
            HomeTown = new string[length];
            Address1 = new string[length];
            Address2 = new string[length];
            Contact1 = new string[length];
            Contact2 = new string[length];
            PersonalEmail = new string[length];
            UniversityEmail = new string[length];
            ResidentialStatus = new string[length];
            ProgramId = new string[length];
            Specialization = new string[length];
            ProgramStatus = new string[length];
            Level = new string[length];
            StudentType = new string[length];
            EnrollmentOption = new string[length];
            RegistrationStatus = new string[length];
            DateOfEntry = new System.DateTime[length];
            DateOfCompletion = new System.DateTime?[length];
            Results = new StudentResultDM[length];
            RegisteredCourses = new RegisteredCourseDM[length];
            EmergencyContact = new EmergencyContactDM[length];
            //Owning = new bool[length];
            //FeesBalance = new string[length];
            PamentOption = new string[length];
            DepartmentId = new string[length];
            State = new int[length];
        }
        public void Add(Student student)
        {

            lock (student)
            {
                if (Count == StudentId.Length)
                {
                    var newLength = StudentId.Length + 1000;
                    var _StudentId = new string[newLength];
                    StudentId.CopyTo(_StudentId,0);
                    StudentId = _StudentId;
                    var _IndexNumber = new string[newLength];
                    IndexNumber.CopyTo(_IndexNumber, 0);
                    IndexNumber = _IndexNumber;
                    var _ReferenceNumber = new string[newLength];
                    ReferenceNumber.CopyTo(_ReferenceNumber, 0);
                    ReferenceNumber = _ReferenceNumber;
                    var _Surname = new string[newLength];
                    Surname.CopyTo(_Surname, 0);
                    Surname = _Surname;
                    var _Othernames = new string[newLength];
                    Othernames.CopyTo(_Othernames, 0);
                    Othernames = _Othernames;
                    var _Title = new string[newLength];
                    Title.CopyTo(_Title, 0);
                    Title = _Title;
                    var _Gender = new string[newLength];
                    Gender.CopyTo(_Gender, 0);
                    Gender = _Gender;
                    var _MaritalStatus = new string[newLength];
                    MaritalStatus.CopyTo(_MaritalStatus, 0);
                    MaritalStatus = _MaritalStatus;
                    var _DateofBirth = new DateTime[newLength];
                    DateofBirth.CopyTo(_DateofBirth, 0);
                    DateofBirth = _DateofBirth;
                    var _Disability = new bool[newLength];
                    Disability.CopyTo(_Disability, 0);
                    Disability = _Disability;
                    var _Country = new string[newLength];
                    Country.CopyTo(_Country, 0);
                    Country = _Country;
                    var _Region = new string[newLength];
                    Region.CopyTo(_Region, 0);
                    Region = _Region;
                    var _HomeTown = new string[newLength];
                    HomeTown.CopyTo(_HomeTown, 0);
                    HomeTown = _HomeTown;
                    var _Address1 = new string[newLength];
                    Address1.CopyTo(_Address1, 0);
                    Address1 = _Address1;
                    var _Address2 = new string[newLength];
                    Address2.CopyTo(_Address2, 0);
                    Address2 = _Address2;
                    var _Contact1 = new string[newLength];
                    Contact1.CopyTo(_Contact1, 0);
                    Contact1 = _Contact1;
                    var _Contact2 = new string[newLength];
                    Contact2.CopyTo(_Contact2, 0);
                    Contact2 = _Contact2;
                    var _PersonalEmail = new string[newLength];
                    PersonalEmail.CopyTo(_PersonalEmail, 0);
                    PersonalEmail = _PersonalEmail;
                    var _UniversityEmail = new string[newLength];
                    UniversityEmail.CopyTo(_UniversityEmail, 0);
                    UniversityEmail = _UniversityEmail;
                    var _ResidentialStatus = new string[newLength];
                    ResidentialStatus.CopyTo(_ResidentialStatus, 0);
                    ResidentialStatus = _ResidentialStatus;
                    var _ProgramOfStudy = new string[newLength];
                    ProgramId.CopyTo(_ProgramOfStudy, 0);
                    ProgramId = _ProgramOfStudy;
                    var _Specialization = new string[newLength];
                    Specialization.CopyTo(_Specialization, 0);
                    Specialization = _Specialization;
                    var _ProgramStatus = new string[newLength];
                    ProgramStatus.CopyTo(_ProgramStatus, 0);
                    ProgramStatus = _ProgramStatus;
                    var _Level = new string[newLength];
                    Level.CopyTo(_Level, 0);
                    Level = _Level;
                    var _StudentType = new string[newLength];
                    StudentType.CopyTo(_StudentType, 0);
                    StudentType = _StudentType;
                    var _EnrollmentOption = new string[newLength];
                    EnrollmentOption.CopyTo(_EnrollmentOption, 0);
                    EnrollmentOption = _EnrollmentOption;
                    var _RegistrationStatus = new string[newLength];
                    RegistrationStatus.CopyTo(_RegistrationStatus, 0);
                    RegistrationStatus = _RegistrationStatus;
                    var _DateOfEntry = new System.DateTime[newLength];
                    DateOfEntry.CopyTo(_DateOfEntry, 0);
                    DateOfEntry = _DateOfEntry;
                    var _DateOfCompletion = new System.DateTime?[newLength];
                    DateOfCompletion.CopyTo(_DateOfCompletion, 0);
                    DateOfCompletion = _DateOfCompletion;
                    var _Results = new StudentResultDM[newLength];;
                    Results.CopyTo(_Results, 0);
                    Results = _Results;
                    var _RegisteredCourses = new RegisteredCourseDM[newLength]; 
                    RegisteredCourses.CopyTo(_RegisteredCourses, 0);
                    RegisteredCourses = _RegisteredCourses;
                    var _EmergencyContact = new EmergencyContactDM[newLength];
                    EmergencyContact.CopyTo(_EmergencyContact, 0);
                    EmergencyContact = _EmergencyContact;
                    var _Owning = new bool[newLength];
                    //Owning.CopyTo(_Owning);
                    //Owning = _Owning;
                    //var _FeesBalance = new string[newLength];
                    //FeesBalance.CopyTo(_FeesBalance);
                    //FeesBalance = _FeesBalance;
                    var _PamentOption = new string[newLength];
                    PamentOption.CopyTo(_PamentOption, 0);
                    PamentOption = _PamentOption;
                    var _DepartmentId = new string[newLength];
                    DepartmentId.CopyTo(_DepartmentId, 0);
                    DepartmentId = _DepartmentId;
                    var _State = new int[newLength];
                    State.CopyTo(_State,0);
                    State = _State;
                }
                StudentId[Count] = student.StudentId;
                IndexNumber[Count] = student.IndexNumber;
                ReferenceNumber[Count] = student.ReferenceNumber;
                Surname[Count] = student.Surname;
                Othernames[Count] = student.Othernames;
                Title[Count] = student.Title;
                Gender[Count] = student.Gender;
                MaritalStatus[Count] = student.MaritalStatus;
                DateofBirth[Count] = student.DateofBirth;
                Disability[Count] = student.Disability;
                Country[Count] = student.Country;
                Region[Count] = student.Region;
                HomeTown[Count] = student.HomeTown;
                Address1[Count] = student.Address1;
                Address2[Count] = student.Address2;
                Contact1[Count] = student.Contact1;
                Contact2[Count] = student.Contact2;
                PersonalEmail[Count] = student.PersonalEmail;
                UniversityEmail[Count] = student.UniversityEmail;
                ResidentialStatus[Count] = student.ResidentialStatus;
                ProgramId[Count] = student.ProgramId;
                Specialization[Count] = student.Specialization;
                ProgramStatus[Count] = student.ProgramStatus;
                Level[Count] = student.Level;
                StudentType[Count] = student.StudentType;
                EnrollmentOption[Count] = student.EnrollmentOption;
                RegistrationStatus[Count] = student.RegistrationStatus;
                DateOfEntry[Count] = student.DateOfEntry;
                DateOfCompletion[Count] = student.DateOfCompletion;

                //Owning.Span[Count] = student.Owning;
                //FeesBalance.Span[Count] = student.FeesBalance;
                PamentOption[Count] = student.PamentOption;
                DepartmentId[Count] = student.DepartmentId;

                //Results.Span[Count] = new StudentResultDM(length);
                if (student.Results?.Count > 0)
                {
                    if (Results[Count] is null)
                    {
                        Results[Count] = new StudentResultDM(50);
                    }
                    foreach (var t in student.Results)
                    {
                        Results[Count].Add(t);
                    }
                }

                //EmergencyContact.Span[Count] = new EmergencyContactDM(length);
                if (student.EmergencyContact?.Count > 0)
                {
                    if (EmergencyContact[Count] is null)
                    {
                        EmergencyContact[Count] = new EmergencyContactDM(5);
                    }
                    foreach (var t in student.EmergencyContact)
                    {
                        EmergencyContact[Count].Add(t);
                    }
                }

                //RegisteredCourses[Count] = new RegisteredCourseDM(800);
                if (student.RegisteredCourses?.Count > 0)
                {
                    if (RegisteredCourses[Count] is null)
                    {
                        RegisteredCourses[Count] = new RegisteredCourseDM(50);
                    }
                    foreach (var t in student.RegisteredCourses)
                    {
                        RegisteredCourses[Count].Add(t);
                    }
                }
                
                State[Count]++;
                Count++;
            }
        }

        public void RegisterCourses(IEnumerable<RegisteredCourse> courses, int index)
        {
            if (RegisteredCourses[index] is null)
            {
                RegisteredCourses[index] = new RegisteredCourseDM(50);
            }
            foreach (var r in courses)
            {
                var result = RegisteredCourses[index].Find((x, y) => x.MountedCourseId[y] == r.MountedCourseId && x.AcademicYear[y] == r.AcademicYear);
                if (!result.success)
                {
                    RegisteredCourses[index].Add(r);
                }
            }
        }

        public void UpdateRegisteredCourses(IList<RegisteredCourse> updatedRegistration, int index)
        {
            var up = updatedRegistration.FirstOrDefault();
            var originalRegistration = RegisteredCourses[index].Select((x,y)=> x.Semester[y] == up.Semester && x.AcademicYear[y] == up.AcademicYear && x.StudentId[y] == up.StudentId,
                                                                 (x,y)=> x.CreateRegisteredCourse(y)).ToList();

            //New Course Added To Registration
            foreach (var u in updatedRegistration)
            {
                var or = RegisteredCourses[index].Find((x, y) => x.Semester[y] == u.Semester && x.AcademicYear[y] == u.AcademicYear && x.StudentId[y] == u.StudentId && x.MountedCourseId[y] == u.MountedCourseId);
                if (or.success)
                {
                    u.State = or.Value.State[or.Index]++;
                    RegisteredCourses[index].Add(u);
                    DataWriter.Add(u, nameof(RegisteredCourse));
                }
                else
                {
                    RegisteredCourses[index].Add(u);
                    DataWriter.Add(u, nameof(RegisteredCourse));
                }
            }

            foreach (var r in originalRegistration)
            {
                var ur = RegisteredCourses[index].Find((x, y) => x.MountedCourseId[y] == r.MountedCourseId && x.AcademicYear[y] == r.AcademicYear && x.Semester[y] == r.Semester && x.StudentId[y] == r.StudentId);
                if (ur.success)
                {
                    RegisteredCourses[index].Remove(ur.Index);
                    r.State = r.State + 1;
                    r.Deleted = true;
                    DataWriter.Add(r, nameof(RegisteredCourse));
                }
            }

            //Course Removed To Registration
            //if (originalRegistration.Count <= updatedRegistration.Count)
            //{
            //    foreach (var r in originalRegistration
            //        .Where(o => !updatedRegistration.Any(e => e.MountedCourseId == o.MountedCourseId && e.AcademicYear == o.AcademicYear)))
            //    {
            //        var ur = RegisteredCourses[index].Find((x, y) => x.MountedCourseId[y] == r.MountedCourseId && x.AcademicYear[y] == r.AcademicYear);
            //        if (ur.success)
            //        {
            //            RegisteredCourses[index].Remove(ur.Index);
            //            r.State = ur.Value.State[ur.Index]+1;
            //            r.Deleted = true;
            //            DataWriter.Add(r, nameof(RegisteredCourse));
            //        }
            //    }
            //}
        }

        public void AddResults(IEnumerable<StudentResult> results, int index)
        {
            if (Results[index] is null)
            {
                Results[index] = new StudentResultDM(50);
            }
            foreach (var result in results)
            {
                Results[index].Add(result);
            }
        }

        public void AddResult(StudentResult result, int index)
        {
            if(Results[index] is null)
            {
                Results[index] = new StudentResultDM(50);
            }
            Results[index].Add(result);
        }

        public void UpdateResults(IEnumerable<ApproveResultsDto> results, int index)
        {
            var arr = results.ToArray();
            if (Results[index] is null)
            {
                Results[index] = new StudentResultDM(50);
            }
            for (var i = 0; i < arr.Length; i++)
            {
                if(Results[index].ExamResultId[i] == arr[i].ExamResultId)
                {
                    Results[index].Comment[i] = arr[i].Comment;
                    Results[index].Status[i] = arr[i].Status;
                    DataWriter.Add(Results[index].CreateStudentResult(i), nameof(StudentResult));
                }
            }
        }

        public Student CreateStudentWithChildren(int Index)
        {
            var student = CreateStudent(Index);
            student.EmergencyContact = EmergencyContact[Index].Select((a, b) =>
                {
                    return new EmergencyContact
                    {
                        Address = a.Address[b],
                        StudentId = a.StudentId[b],
                        Email = a.Email[b],
                        HomeTown = a.HomeTown[b],
                        Mobile = a.Mobile[b],
                        Name = a.Name[b],
                        Occupation = a.Occupation[b],
                        Id = a.Id[b],
                        Region = a.Region[b]
                    };
                }).ToList();
            student.RegisteredCourses = CreateRegisteredCourses(Index);
            student.Results = CreateStudentResults(Index).ToList();
            return student;
        }

        public Student CreateStudentWithResults(int Index)
        {
            var student = CreateStudent(Index);
            student.Results = CreateStudentResults(Index).ToList();
            return student;
        }

        public Student CreateStudentWithRegisteredCourses(int Index)
        {
            var student = CreateStudent(Index);
            student.RegisteredCourses = CreateRegisteredCourses(Index);
            return student;
        }

        public IEnumerable<StudentResult> CreateStudentResults(int Index)
        {
            return Results[Index].Select((a, b) =>
            {
                return a.CreateStudentResult(b);
            })
            .OrderBy(x => x.Level)
            .ThenBy(x => x.Semester);
        }

        public GetMountedCoursesForRegistrationReponse CreateStudentWithRegisteredCourses(string academicYear, int Index)
        {
            var registeredCouses = CreateRegisteredCourses(academicYear, Index);
            var results = CreateStudentResults(Index).GroupBy(x => x.ProgramId);
            return new GetMountedCoursesForRegistrationReponse
            {
                StudentId = StudentId[Index],
                IndexNumber = IndexNumber[Index],
                Level = Level[Index],
                Othernames = Othernames[Index],
                ProgramId = ProgramId[Index],
                ReferenceNumber = ReferenceNumber[Index],
                Surname = Surname[Index],
                //PendingTrails = GetPendingTrails(results).Count(),
                TotalCredit = registeredCouses.Sum(x => x.Credit),
                RegisteredCourses = registeredCouses,
                TrailCourses = GetPendingTrails(results).ToList()
            };
        }

        public List<GetRegisteredCoursesResponse> CreateRegisteredCourses(string academicYear, int Index)
        {
            return RegisteredCourses[Index].Select((x, y) => x.AcademicYear[y] == academicYear, (a, b) =>
            {
                return a.CreateGetRegisteredCoursesResponse(b);
            }).ToList();
        }

        public IEnumerable<PendingTrailsResponse> GetPendingTrails(IEnumerable<IGrouping<string, StudentResult>> results)
        {
            foreach (var t in results.SelectMany(r => r))//.Where(x => x.Grade == "F")
            {
                yield return new PendingTrailsResponse
                {
                    MountedCourseId = t.MountedCourseId,
                    StudentId = t.StudentId,
                    Date = t.Date,
                    Grade = t.Grade
                };
                break;
            }
        }

        public List<RegisteredCourse> CreateRegisteredCourses(int Index)
        {
            return RegisteredCourses[Index].Select((a, b) =>
            {
                return a.CreateRegisteredCourse(b);
            }).ToList();
        }

        public Student CreateStudent(int Index)
        {
            return new Student
            {
                StudentId = StudentId[Index],
                Address1 = Address1[Index],
                Address2 = Address2[Index],
                Contact1 = Contact1[Index],
                Contact2 = Contact2[Index],
                Country = Country[Index],
                DateofBirth = DateofBirth[Index],
                DateOfCompletion = DateOfCompletion[Index],
                DateOfEntry = DateOfEntry[Index],
                DepartmentId = DepartmentId[Index],
                Disability = Disability[Index],
                EnrollmentOption = EnrollmentOption[Index],
                Gender = Gender[Index],
                HomeTown = HomeTown[Index],
                IndexNumber = IndexNumber[Index],
                Level = Level[Index],
                MaritalStatus = MaritalStatus[Index],
                Othernames = Othernames[Index],
                PamentOption = PamentOption[Index],
                PersonalEmail = PersonalEmail[Index],
                ProgramId = ProgramId[Index],
                ProgramStatus = ProgramStatus[Index],
                ReferenceNumber = ReferenceNumber[Index],
                Region = Region[Index],
                RegistrationStatus = RegistrationStatus[Index],
                ResidentialStatus = ResidentialStatus[Index],
                Specialization = Specialization[Index],
                State = State[Index],
                StudentType = StudentType[Index],
                Surname = Surname[Index],
                Title = Title[Index],
                UniversityEmail = UniversityEmail[Index]
            };
        }

        private readonly int length;


        public int Count;

        public string[] StudentId;
        public string[] IndexNumber;
        public string[] ReferenceNumber;
        public string[] Surname;
        public string[] Othernames;
        public string[] Title;
        public string[] Gender;
        public string[] MaritalStatus;
        public DateTime[] DateofBirth;
        public bool[] Disability;
        public string[] Country;
        public string[] Region;
        public string[] HomeTown;
        public string[] Address1;
        public string[] Address2;
        public string[] Contact1;
        public string[] Contact2;
        public string[] PersonalEmail;
        public string[] UniversityEmail;
        public string[] ResidentialStatus;
        public string[] ProgramId;
        public string[] Specialization;
        public string[] ProgramStatus;
        public string[] Level;
        public string[] StudentType;
        public string[] EnrollmentOption;
        public string[] RegistrationStatus;
        public System.DateTime[] DateOfEntry;
        public System.DateTime?[] DateOfCompletion;
        public StudentResultDM[] Results;
        public RegisteredCourseDM[] RegisteredCourses;
        public EmergencyContactDM[] EmergencyContact;
        //public Memory<bool> Owning;
        //public Memory<string> FeesBalance;
        public string[] PamentOption;
        public string[] DepartmentId;
        public int[] State;
    }
}
