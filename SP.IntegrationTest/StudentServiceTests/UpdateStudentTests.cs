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
    public class UpdateStudentTests : IDisposable
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
        public void UpdateStudent_With_Valid_Index_Ref_number_Should_return_True()
        {
            var student = StudentServiceData.GetStudent();
            var request = new UpdateStudentRequest
            {
                IndexNumber = "12345fd",
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
            };

            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            var program = _programService.GetProgramByName("BSc. Computer Science") as Result<Program>;

             student.ProgramId = program.Value.ProgramId;

            _studentService.AddStudent(student);
            var result = _studentService.UpdateStudent(request);
            Result<Student> originalStudent = _studentService.GetStudent("12345fd") as Result<Student>;
            originalStudent.Value.Surname.ShouldBe("Oppong Lawson");
            result.IsSucessful.ShouldBe(true);
        }

        [Test]
        public void UpdateStudent_With_InValid_Index_Ref_number_Should_return_False()
        {
            var student = StudentServiceData.GetStudent();
            var request = new UpdateStudentRequest
            {
                IndexNumber = "1234",
                ReferenceNumber = "1234",
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
            };
            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            _studentService.AddStudent(student);
            var result = _studentService.UpdateStudent(request);           
            result.IsSucessful.ShouldBe(false);
        }

        public void Dispose()
        {
            TestBootStrapper.Dispose();
        }
    }
}
