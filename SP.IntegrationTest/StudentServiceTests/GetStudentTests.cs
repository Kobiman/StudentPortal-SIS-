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
    public class GetStudentTests : IDisposable
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
        public void GetStudent_With_invalid_index_Number_Should_return_False() 
        {
            //arr
            var student = StudentServiceData.GetStudent();
            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            _studentService.AddStudent(student);

            //
            var result = _studentService.GetStudent("yhb677");
            result.IsSucessful.ShouldBeFalse();

        }


        [Test]
        public void GetStudent_With_Valid_index_Number_Should_return_True()
        {
            //arrange
            var student = StudentServiceData.GetStudent();
            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            var program = _programService.GetProgramByName("BSc. Computer Science") as Result<Program>;
            student.ProgramId = program.Value.ProgramId;
            _studentService.AddStudent(student);
            var result = _studentService.GetStudent("12345fd");
            result.IsSucessful.ShouldBeTrue();
        
        }

        [Test]
        public void GetStudent_With_Empty_Index_Number_Should_return_False()
        {
            //arrange
            var student = StudentServiceData.GetStudent();
            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            _studentService.AddStudent(student);
            var result = _studentService.GetStudent("");
            result.IsSucessful.ShouldBeFalse();
        }

        [Test]
        public void GetStudentsByLevel_With_Empty_Level_Should_return_False()
        {
            //arrange
            var student = StudentServiceData.GetStudent();
            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            _studentService.AddStudent(student);
            var result = _studentService.GetStudentsByLevel("");
            result.IsSucessful.ShouldBeFalse();
        }
        [Test]
        public void GetStudentsByLevel_With_Level_Should_return_True()
        {
            //arrange
            var student = StudentServiceData.GetStudent();
            _studentService.AddStudent(student);
            var result = _studentService.GetStudentsByLevel("400");
            result.IsSucessful.ShouldBeTrue();
        }
        public void Dispose()
        {
            //TestBootStrapper.Dispose();
        }
    }
}
