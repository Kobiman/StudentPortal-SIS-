using NUnit.Framework;
using Shouldly;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Commands;
using SP.TestInfrastructure;
using SP.TestInfrastructure.MountedCourseCommandTests;
using SP.TestInfrastructure.RegisteredCoursesCommandTests;
using SP.TestInfrastructure.StudentServiceTest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SP.IntegrationTest.RegisteredCourseTests
{
    public class ApproveRegisteredCoursesTest : IDisposable
    {
        private IGetRegisteredCoursesCommand _getRegisteredCoursesCommand;
        private IAddRegisteredCoursesCommand _addRegisteredCoureCommand;
        private IAddMountedCourseCommand _mountcoursecommand;
        private IGetMountedCoursesCommand _getMountedCoursesCommand;
        private IStudentService _studentService;
        private IProgramService _programService;

        [SetUp]
        public void Setup()
        {
            TestBootStrapper.Setup();
            _getRegisteredCoursesCommand = TestBootStrapper.Resolve<IGetRegisteredCoursesCommand>();
            _addRegisteredCoureCommand = TestBootStrapper.Resolve<IAddRegisteredCoursesCommand>();
            _mountcoursecommand = TestBootStrapper.Resolve<IAddMountedCourseCommand>();
            _getMountedCoursesCommand = TestBootStrapper.Resolve<IGetMountedCoursesCommand>();
            _studentService = TestBootStrapper.Resolve<IStudentService>();
            _programService = TestBootStrapper.Resolve<IProgramService>();
        }

        [Test]
        public void ApproveRegisteredCoursesCommand_With_Approved_Set_To_True_Should_Return_True()
        {
            //Arrange
            var request = StudentServiceData.GetStudents();
            var mountedCoursesRequest = MountedCourseCommandData.GetMountedCourseRequests();
            var registerCourseRequest = RegisteredCourseCommandData.GetRegisteredCourseRequests();
            var getRegisteredCourseRequest = new GetRegisteredCoursesRequest { IndexNumber = "123454kk", AcademicYear = "2019/2020", Semester = "1" };

            //Act
            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            var program = _programService.GetProgramByName("BSc. Computer Science") as Result<Program>;

            foreach (var r in request)
            {
                r.ProgramId = program.Value.ProgramId;
            }

            foreach (var m in mountedCoursesRequest)
            {
                m.ProgramId = program.Value.ProgramId;
            }

            _studentService.AddStudents(request);
            dynamic s = _studentService.GetStudent("123454kk");

            _mountcoursecommand.Execute(new AddMountedCourseRequest(mountedCoursesRequest));
            var mountedCourses = _getMountedCoursesCommand.Execute(new GetMountedCoursesRequest { AcademicYear = "2019/2020", Program = "BSc. Computer Science" }) as Result<IEnumerable<GetMountedCoursesResponse>>;

            int skip = 0;
            foreach (var r in registerCourseRequest)
            {
                r.MountedCourseId = mountedCourses.Value.Skip(skip).FirstOrDefault().MountedCourseId;
                r.StudentId = s.Value.StudentId;
                skip++;
            }

            var result = _addRegisteredCoureCommand.Execute(new AddRegisteredCoursesRequest(registerCourseRequest));
            var result2 = _getRegisteredCoursesCommand.Execute(getRegisteredCourseRequest) as Result<IEnumerable<GetRegisteredCoursesResponse>>;

            //Assert
            result.IsSucessful.ShouldBeTrue();
            result2.Value.Count().ShouldBe(3);

        }
        public void Dispose()
        {
            TestBootStrapper.Dispose();
        }
    }
}
