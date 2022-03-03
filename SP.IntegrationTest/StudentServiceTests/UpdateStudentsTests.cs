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
    public class UpdateStudentsTests : IDisposable
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
        public void UpdateStudents_With_Vaild_Credentials_Should_return_True () 
        {
            var students = StudentServiceData.GetStudents();
            var request = new List<UpdateStudentRequest>
            {
                new UpdateStudentRequest
            {
            IndexNumber = "123454kk",
            ReferenceNumber = "12345",
            Surname = "Oppong Lawson",
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
            EnrollmentOption = "Regular",
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
            foreach (var s in students)
            {
                s.ProgramId = program.Value.ProgramId;
            }
            _studentService.AddStudents(students);

            var result = _studentService.UpdateStudents(request);
            Result<Student> originalStudent = _studentService.GetStudent("123454kk") as Result<Student>;
            originalStudent.Value.Surname.ShouldBe("Oppong Lawson");
            result.IsSucessful.ShouldBe(true);
        }


        [Test]
        public void UpdateStudents_InVaild_Students_Should_return_False()
        {
            var student = StudentServiceData.GetStudents();
            var request = new List<UpdateStudentRequest>
            {
                new UpdateStudentRequest
            {
            IndexNumber = "",
            ReferenceNumber = "12345",
            Surname = "Oppong Lawson",
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
            EnrollmentOption = "Regular",
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
            _studentService.AddStudents(student);
            var result = _studentService.UpdateStudents(request);
            result.IsSucessful.ShouldBe(false);

        }

        public void Dispose()
        {
            TestBootStrapper.Dispose();
        }
    }
}
