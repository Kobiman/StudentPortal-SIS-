using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NUnit.Framework;
using Shouldly;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Commands;
using SP.TestInfrastructure;
using SP.TestInfrastructure.MountedCourseCommandTests;
using SP.TestInfrastructure.RegisteredCourseCommandTests;
using SP.TestInfrastructure.RegisteredCoursesCommandTests;
using SP.TestInfrastructure.StudentServiceTest;

namespace SP.IntegrationTest.RegisteredCourseTests
{
    public class RegisterCoursesTests : IDisposable
    {
        private IAddRegisteredCoursesCommand _registeredcoursecommand;
        private IAddMountedCourseCommand _mountcoursecommand;
        private IGetMountedCoursesCommand _getMountedCoursesCommand;
        private IStudentService _studentService;
        private IProgramService _programService;


        [SetUp]
        public void Setup()
        {
            TestBootStrapper.Setup();
            _registeredcoursecommand = TestBootStrapper.Resolve<IAddRegisteredCoursesCommand>();
            _mountcoursecommand = TestBootStrapper.Resolve<IAddMountedCourseCommand>();
            _getMountedCoursesCommand = TestBootStrapper.Resolve<IGetMountedCoursesCommand>();
            _studentService = TestBootStrapper.Resolve<IStudentService>();
            _programService = TestBootStrapper.Resolve<IProgramService>();
        }

        [Test]
        public void RegisteredCourseCommand_With_Valid_Credential_Should_Return_True()
        {
            var studentRequest = StudentServiceData.GetStudent();
            var registeredCourses = RegisteredCourseCommandData.GetRegisteredCourseRequests();
            var mountedCoursesRequest = MountedCourseCommandData.GetMountedCourseRequests();
            var request = new AddRegisteredCoursesRequest(registeredCourses);

            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            var program = _programService.GetProgramByName("BSc. Computer Science") as Result<Program>;
            studentRequest.ProgramId = program.Value.ProgramId;
            _studentService.AddStudent(studentRequest);
            dynamic s = _studentService.GetStudent("12345fd");

            foreach (var m in mountedCoursesRequest)
            {
                m.ProgramId = program.Value.ProgramId;
            }

            _mountcoursecommand.Execute(new AddMountedCourseRequest(mountedCoursesRequest));
            var mountedCourses = _getMountedCoursesCommand.Execute(new GetMountedCoursesRequest { AcademicYear = "2019/2020", Program = "BSc. Computer Science" }) as Result<IEnumerable<GetMountedCoursesResponse>>;

            int skip = 0;
            foreach (var registeredCourse in request.RegisteredCourses)
            {
                registeredCourse.MountedCourseId = mountedCourses.Value.Skip(skip).FirstOrDefault().MountedCourseId;
                registeredCourse.StudentId = s.Value.StudentId;
                skip++;
            }

            var result = _registeredcoursecommand.Execute(request);
            Result<Student> result2 = _studentService.GetStudent(studentRequest.IndexNumber) as Result<Student>;
            result.IsSucessful.ShouldBe(true);
            result2.Value.RegisteredCourses.Count().ShouldBe(registeredCourses.Count());
        }

        [Test]
        public void RegisteredCourseCommand_With_Invalid_Credential_Should_Return_False()
        {
            var studentRequest = StudentServiceData.GetStudent();
            var registeredCourses = RegisteredCourseCommandWithInvalidData.GetRegisteredCourseRequests();

            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            _studentService.AddStudent(studentRequest);
            var request = new AddRegisteredCoursesRequest(registeredCourses);

            var result = _registeredcoursecommand.Execute(request);

            result.IsSucessful.ShouldBe(false);
        }
        public void Dispose()
        {
            TestBootStrapper.Dispose();
        }
    }
}
