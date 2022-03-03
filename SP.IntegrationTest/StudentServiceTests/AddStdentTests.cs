using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using Shouldly;
using SP.DAL;
using SP.Models;
using SP.Models.Dtos;
using SP.Services;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Repository;
using SP.TestInfrastructure;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.IntegrationTest.StudentServiceTests
{
    public class AddStdentTests : IDisposable
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
        public void AddStudent_With_Valid_Credentials_Should_Return_True_Test()
        {
            TestBootStrapper.Setup();
            _studentService = TestBootStrapper.Resolve<IStudentService>();
            _programService = TestBootStrapper.Resolve<IProgramService>();
            var request = new AddStudentRequest
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
            };

            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            var program = _programService.GetProgramByName("BSc. Computer Science") as Result<Program>;
            request.ProgramId = program.Value.ProgramId;

            var result = _studentService.AddStudent(request);
            result.IsSucessful.ShouldBe(true);
        }

        [Test]
        public void AddStudent_With_Invalid_Credentials_Should_Return_False_Test()
        {
            var request = new AddStudentRequest
            {
                IndexNumber = "",
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
            };

            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            var program = _programService.GetProgramByName("BSc. Computer Science") as Result<Program>;
            request.ProgramId = program.Value.ProgramId;

            var result = _studentService.AddStudent(request);
            result.IsSucessful.ShouldBe(false);
        }

        
        public void Dispose()
        {
            //TestBootStrapper.Dispose();
        }
    }
}
