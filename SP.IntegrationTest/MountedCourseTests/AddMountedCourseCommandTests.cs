using NUnit.Framework;
using Shouldly;
using SP.Commands;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Commands;
using SP.TestInfrastructure;
using SP.TestInfrastructure.MountedCourseCommandTests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SP.IntegrationTest.MountedCourseCommandTests
{
    public class AddMountedCourseCommandTests : IDisposable
    {
        private IAddMountedCourseCommand _mountedcoursecommand;
        private IProgramService _programService;

        [SetUp]
        public void Setup()
        {
            TestBootStrapper.Setup();
            _mountedcoursecommand = TestBootStrapper.Resolve<IAddMountedCourseCommand>();
            _programService = TestBootStrapper.Resolve<IProgramService>();
        }

        [Test]
        public void MountedCourseCommand_With_Valid_Credential_Should_Return_True()
        {
            var mountedCourses = MountedCourseCommandData.GetMountedCourseRequests();

            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            dynamic _result = _programService.GetProgramByName("BSc. Computer Science");
            Program program = _result.Value;

            var request = new AddMountedCourseRequest(mountedCourses);

            foreach (var mountedCourse in request.MountedCourses)
            {
                mountedCourse.ProgramId = program.ProgramId;
            }

            var result = _mountedcoursecommand.Execute(request);
            Result<Program> result2 = _programService.GetProgramByName("BSc. Computer Science") as Result<Program>;

            result.IsSucessful.ShouldBe(true);
            result2.Value.MountedCourses.Count.ShouldBe(mountedCourses.Count());

        }



        [Test]
        public void MountedCourseCommand_With_Invalid_Credential_Should_Return_False()
        {
            var mountedCourses = MountedCourseCommandData.GetMountedCourseRequests();

            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });

            var request = new AddMountedCourseRequest(mountedCourses);

            var result = _mountedcoursecommand.Execute(request);

            result.IsSucessful.ShouldBe(false);
        }
        public void Dispose()
        {
            TestBootStrapper.Dispose();
        }
    }



   
}
