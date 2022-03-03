using KMapper;
using NUnit.Framework;
using Shouldly;
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

namespace SP.IntegrationTest.MountedCourseTests
{
    public class GetMountedCoursesCommandTests : IDisposable
    {
        private IGetMountedCoursesCommand _getMountedCoursesCommand;
        private IAddMountedCourseCommand _addMountedCoureCommand;
        private IProgramService _programService;

        [SetUp]
        public void Setup()
        {
            TestBootStrapper.Setup();
            _getMountedCoursesCommand = TestBootStrapper.Resolve<IGetMountedCoursesCommand>();
            _addMountedCoureCommand = TestBootStrapper.Resolve<IAddMountedCourseCommand>();
            _programService = TestBootStrapper.Resolve<IProgramService>();

        }

        [Test]
        public void GetMountedCoursesCommand_With_inValid_Program_and_AcademicYear_Should_return_False()
        {
            //arr
            var request = new GetMountedCoursesRequest { AcademicYear = "2021", Program = "BSc. Computer Scienc" };
            var mountedCourses = MountedCourseCommandData.GetMountedCourseRequests();

            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            Result<Program> _result = _programService.GetProgramByName("BSc. Computer Science") as Result<Program>;
            var mountedcourserequest = new AddMountedCourseRequest(mountedCourses);

            foreach (var mountedCourse in mountedcourserequest.MountedCourses)
            {
                mountedCourse.ProgramId = _result.Value.ProgramId;
            }
            //Act
            _addMountedCoureCommand.Execute(mountedcourserequest);

            Result result=
            _getMountedCoursesCommand.Execute(request) as Result;

            //Assert
            result.IsSucessful.ShouldBeFalse();
        }

        [Test]
        public void GetMountedCoursesCommand_With_Valid_Program_and_AcademicYear_Should_return_True()
        {
            //arr
            var request = new GetMountedCoursesRequest { AcademicYear = "2021", Program = "BSc. Computer Science" };
            var mountedCourses = MountedCourseCommandData.GetMountedCourseRequests();

            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            Result<Program> _result = _programService.GetProgramByName("BSc. Computer Science") as Result<Program>;
            var mountedcourserequest = new AddMountedCourseRequest(mountedCourses);

            foreach (var mountedCourse in mountedcourserequest.MountedCourses)
            {
                mountedCourse.ProgramId = _result.Value.ProgramId;
            }
            //Act
            _addMountedCoureCommand.Execute(mountedcourserequest);

            var result = _getMountedCoursesCommand.Execute(request) as Result<IEnumerable<GetMountedCoursesResponse>>;

            //Assert
            result.IsSucessful.ShouldBeTrue();
        }

        public void Dispose()
        {
            TestBootStrapper.Dispose();
        }
    }
}
