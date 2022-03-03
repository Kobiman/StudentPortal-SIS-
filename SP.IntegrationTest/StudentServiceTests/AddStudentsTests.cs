using NUnit.Framework;
using Shouldly;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces;
using SP.TestInfrastructure;
using SP.TestInfrastructure.StudentServiceTest;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.IntegrationTest.StudentServiceTests
{
    public class AddStudentsTests : IDisposable
    {
        private IStudentService _studentService;
        private IProgramService _programService;

        [SetUp]
        public void Setup()
        {
            TestBootStrapper.Setup();
            _studentService = TestBootStrapper.Resolve<IStudentService>();
            _programService = TestBootStrapper.Resolve<IProgramService>();
        }

        [Test]
        public void AddStudents_With_Valid_Credentials_Should_Return_True_Test()
        {
            var request = StudentServiceData.GetStudents();

            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            var program = _programService.GetProgramByName("BSc. Computer Science") as Result<Program>;
            
            foreach(var r in request)
            {
                r.ProgramId = program.Value.ProgramId;
            }

            var result = _studentService.AddStudents(request);
            result.IsSucessful.ShouldBe(true);
        }

        [Test]
        public void AddStudents_With_inValid_Credentials_Should_Return_False_Test()
        {
            var request = new List<AddStudentRequest>
            {
                new AddStudentRequest
                {
                    IndexNumber = "12345",
                    ReferenceNumber = "12345",
                    Surname = "Lawson",
                    Othernames = "Kobina",
                    Title = "Mr",
                    Gender = "M",
                    MaritalStatus = "Single",
                    DateofBirth = "6/8/1991",
                    Country = "Ghana",
                    Region = "Western Region",
                    HomeTown = "Cape Coast",
                    Disability = false,
                    Address1 = "Berlin Top",
                    Address2 = "Dominion City",
                    Contact1 = "0205742832",
                    Contact2 = "0124585145",
                    PersonalEmail = "kobiman91gmail.com",
                    StudentType = "Undergraduate",
                    EnrolmentOption = "Regular",
                    ResidentialStatus = "Resident",
                    ProgramId = "BSc. Computer Science",
                    Specialization = "Software Engineering",
                    ProgramStatus = "Inprogress",
                    UniversityEmail = "kobina.lawson@uenr.edu.gh",
                    Level = "400",
                    DateOfEntry = DateTime.Now,
                    PamentOption = "GFP"
                },
                new AddStudentRequest
                {
                    IndexNumber = "12345",
                    ReferenceNumber = "12345",
                    Surname = "Lawson",
                    Othernames = "Kobina",
                    Title = "Mr",
                    Gender = "M",
                    MaritalStatus = "Single",
                    DateofBirth = "6/8/1991",
                    Country = "Ghana",
                    Region = "Western Region",
                    HomeTown = "Cape Coast",
                    Disability = false,
                    Address1 = "Berlin Top",
                    Address2 = "Dominion City",
                    PersonalEmail = "kobiman91gmail.com",
                    StudentType = "Undergraduate",
                    EnrolmentOption = "Regular",
                    ResidentialStatus = "Resident",
                    ProgramId = "BSc. Computer Science",
                    Specialization = "Software Engineering",
                    ProgramStatus = "Inprogress",
                    UniversityEmail = "kobina.lawson@uenr.edu.gh",
                    Level = "400",
                    DateOfEntry = DateTime.Now,
                    PamentOption = "GFP"
                }

            };

            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            var program = _programService.GetProgramByName("BSc. Computer Science") as Result<Program>;

            foreach (var r in request)
            {
                r.ProgramId = program.Value.ProgramId;
            }

            var result = _studentService.AddStudents(request);
            result.IsSucessful.ShouldBe(false);
        }

        //[Test]
        public void AddStudents_With_Valid_Mail_Should_Return_True_Test()
        {
            var request = new List<AddStudentRequest>
            {
                new AddStudentRequest
                {
                   IndexNumber = "12345",
                   ReferenceNumber = "12345",
                   Surname = "Lawson",
                   Othernames = "Kobina",
                   Title = "Mr",
                   Gender = "M",
                   MaritalStatus = "Single",
                   DateofBirth = "6/8/1991",
                   Country = "Ghana",
                   Region = "Western Region",
                   HomeTown = "Cape Coast",
                   Disability = false,
                   Address1 = "Berlin Top",
                   Address2 = "Dominion City",
                   Contact1 = "0205742832",
                   Contact2 = "0124585145",
                   PersonalEmail = "kobiman91@gmail.com",
                   StudentType = "Undergraduate",
                   EnrolmentOption = "Regular",
                   ResidentialStatus = "Resident",
                   ProgramId = "BSc. Computer Science",
                   Specialization = "Software Engineering",
                   ProgramStatus = "Inprogress",
                   UniversityEmail = "kobina.lawson@uenr.edu.gh",
                   Level = "400",
                   DateOfEntry = DateTime.Now,
                   PamentOption = "GFP"
                }
            };


            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });

            var result = _studentService.AddStudents(request);
            result.IsSucessful.ShouldBe(true);
        }

        //[Test]
        public void AddStudents_With_inValid_Mail_Should_Return_False_Test()
        {
            var request = new List<AddStudentRequest>
            {
                new AddStudentRequest
                {
                   IndexNumber = "12345",
                   ReferenceNumber = "12345",
                   Surname = "Lawson",
                   Othernames = "Kobina",
                   Title = "Mr",
                   Gender = "M",
                   MaritalStatus = "Single",
                   DateofBirth = "6/8/1991",
                   Country = "Ghana",
                   Region = "Western Region",
                   HomeTown = "Cape Coast",
                   Disability = false,
                   Address1 = "Berlin Top",
                   Address2 = "Dominion City",
                   PersonalEmail = "kobiman91@gmail.com",
                   StudentType = "Undergraduate",
                   EnrolmentOption = "Regular",
                   ResidentialStatus = "Resident",
                   ProgramId = "BSc. Computer Science",
                   Specialization = "Software Engineering",
                   ProgramStatus = "Inprogress",
                   UniversityEmail = "kobina.lawson@uenr.edu.gh",
                   Level = "400",
                   DateOfEntry = DateTime.Now,
                   PamentOption = "GFP"
                }
            };


            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });

            var result = _studentService.AddStudents(request);
            result.IsSucessful.ShouldBe(false);
        }

        //[Test]
        public void AddStudents_With_Contact_Less_Than_10_Should_Return_False_Test()
        {
            var request = new List<AddStudentRequest>
            {
                new AddStudentRequest
                {
                   IndexNumber = "12345",
                   ReferenceNumber = "12345",
                   Surname = "Lawson",
                   Othernames = "Kobina",
                   Title = "Mr",
                   Gender = "M",
                   MaritalStatus = "Single",
                   Contact1 = "02572832",
                   Contact2 = "23456789",
                   DateofBirth = "6/8/1991",
                   Country = "Ghana",
                   Region = "Western Region",
                   HomeTown = "Cape Coast",
                   Disability = false,
                   Address1 = "Berlin Top",
                   Address2 = "Dominion City",
                   PersonalEmail = "kobiman91@gmail.com",
                   StudentType = "Undergraduate",
                   EnrolmentOption = "Regular",
                   ResidentialStatus = "Resident",
                   ProgramId = "BSc. Computer Science",
                   Specialization = "Software Engineering",
                   ProgramStatus = "Inprogress",
                   UniversityEmail = "kobina.lawson@uenr.edu.gh",
                   Level = "400",
                   DateOfEntry = DateTime.Now,
                   PamentOption = "GFP"
                }
            };

            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });

            var result = _studentService.AddStudents(request);
            result.IsSucessful.ShouldBe(false);

        }

        //[Test]
        public void AddStudents_With_Wrong_Contact_Format_Should_Return_False_Test()
        {
            var request = new List<AddStudentRequest>
            {
                new AddStudentRequest
                {
                   IndexNumber = "12345",
                   ReferenceNumber = "12345",
                   Surname = "Lawson",
                   Othernames = "Kobina",
                   Title = "Mr",
                   Gender = "M",
                   MaritalStatus = "Single",
                   Contact1 = "0205742832",
                   Contact2 = "fhfhjjfhf",
                   DateofBirth = "6/8/1991",
                   Country = "Ghana",
                   Region = "Western Region",
                   HomeTown = "Cape Coast",
                   Disability = false,
                   Address1 = "Berlin Top",
                   Address2 = "Dominion City",
                   PersonalEmail = "kobiman91@gmail.com",
                   StudentType = "Undergraduate",
                   EnrolmentOption = "Regular",
                   ResidentialStatus = "Resident",
                   ProgramId = "BSc. Computer Science",
                   Specialization = "Software Engineering",
                   ProgramStatus = "Inprogress",
                   UniversityEmail = "kobina.lawson@uenr.edu.gh",
                   Level = "400",
                   DateOfEntry = DateTime.Now,
                   PamentOption = "GFP"
                }
            };

            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });

            var result = _studentService.AddStudents(request);
            result.IsSucessful.ShouldBe(false);

        }

        //[Test]
        public void AddStudents_With_IndexNo_That_Exist_Should_Return_IndexNumber_Exist_Test()
        {
            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });

            _studentService.AddStudent(new AddStudentRequest
             {
                 IndexNumber = "12345",
                 ReferenceNumber = "12345",
                 Surname = "Lawson",
                 Othernames = "Kobina",
                 Title = "Mr",
                 Gender = "M",
                 MaritalStatus = "Single",
                 Contact1 = "0205742832",
                 Contact2 = "0214585624",
                 DateofBirth = "6/8/1991",
                 Country = "Ghana",
                 Region = "Western Region",
                 HomeTown = "Cape Coast",
                 Disability = false,
                 Address1 = "Berlin Top",
                 Address2 = "Dominion City",
                 PersonalEmail = "kobiman91@gmail.com",
                 StudentType = "Undergraduate",
                 EnrolmentOption = "Regular",
                 ResidentialStatus = "Resident",
                 ProgramId = "BSc. Computer Science",
                 Specialization = "Software Engineering",
                 ProgramStatus = "Inprogress",
                 UniversityEmail = "kobina.lawson@uenr.edu.gh",
                 Level = "400",
                 DateOfEntry = DateTime.Now,
                 PamentOption = "GFP"
             });

            var request = new List<AddStudentRequest>
            {
                new AddStudentRequest
                {
                    IndexNumber = "12345",
                    ReferenceNumber = "12345",
                    Surname = "Lawson",
                    Othernames = "Kobina",
                    Title = "Mr",
                    Gender = "M",
                    MaritalStatus = "Single",
                    Contact1 = "0205742832",
                    Contact2 = "0214585624",
                    DateofBirth = "6/8/1991",
                    Country = "Ghana",
                    Region = "Western Region",
                    HomeTown = "Cape Coast",
                    Disability = false,
                    Address1 = "Berlin Top",
                    Address2 = "Dominion City",
                    PersonalEmail = "kobiman91@gmail.com",
                    StudentType = "Undergraduate",
                    EnrolmentOption = "Regular",
                    ResidentialStatus = "Resident",
                    ProgramId = "BSc. Computer Science",
                    Specialization = "Software Engineering",
                    ProgramStatus = "Inprogress",
                    UniversityEmail = "kobina.lawson@uenr.edu.gh",
                    Level = "400",
                    DateOfEntry = DateTime.Now,
                    PamentOption = "GFP"
                }
            };

            var result = _studentService.AddStudents(request);
            result.Message.ShouldBe("IndexNumber Exist");

        }

        //[Test]
        public void AddStudents_With_Reference_That_Exist_Format_Return_False_Test()
        {
            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });

            _studentService.AddStudent(new AddStudentRequest
            {
                IndexNumber = "123458",
                ReferenceNumber = "12345",
                Surname = "Lawson",
                Othernames = "Kobina",
                Title = "Mr",
                Gender = "M",
                MaritalStatus = "Single",
                Contact1 = "0205742832",
                Contact2 = "0214585624",
                DateofBirth = "6/8/1991",
                Country = "Ghana",
                Region = "Western Region",
                HomeTown = "Cape Coast",
                Disability = false,
                Address1 = "Berlin Top",
                Address2 = "Dominion City",
                PersonalEmail = "kobiman91@gmail.com",
                StudentType = "Undergraduate",
                EnrolmentOption = "Regular",
                ResidentialStatus = "Resident",
                ProgramId = "BSc. Computer Science",
                Specialization = "Software Engineering",
                ProgramStatus = "Inprogress",
                UniversityEmail = "kobina.lawson@uenr.edu.gh",
                Level = "400",
                DateOfEntry = DateTime.Now,
                PamentOption = "GFP"
            });

            var request = new List<AddStudentRequest>
                          {
                              new AddStudentRequest
                              {
                              IndexNumber = "1234522",
                              ReferenceNumber = "12345",
                              Surname = "Lawson",
                              Othernames = "Kobina",
                              Title = "Mr",
                              Gender = "M",
                              MaritalStatus = "Single",
                              Contact1 = "0205742832",
                              Contact2 = "0214585624",
                              DateofBirth = "6/8/1991",
                              Country = "Ghana",
                              Region = "Western Region",
                              HomeTown = "Cape Coast",
                              Disability = false,
                              Address1 = "Berlin Top",
                              Address2 = "Dominion City",
                              PersonalEmail = "kobiman91@gmail.com",
                              StudentType = "Undergraduate",
                              EnrolmentOption = "Regular",
                              ResidentialStatus = "Resident",
                              ProgramId = "BSc. Computer Science",
                              Specialization = "Software Engineering",
                              ProgramStatus = "Inprogress",
                              UniversityEmail = "kobina.lawson@uenr.edu.gh",
                              Level = "400",
                              DateOfEntry = DateTime.Now,
                              PamentOption = "GFP"
                              }
                            };

            var result = _studentService.AddStudents(request);
            result.Message.ShouldBe("Reference Number Exist");

        }

        public void Dispose()
        {
            TestBootStrapper.Dispose();
        }

    }
}
