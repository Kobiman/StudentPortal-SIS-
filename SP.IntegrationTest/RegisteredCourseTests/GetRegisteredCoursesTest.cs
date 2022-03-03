using NUnit.Framework;
using SP.Models.Dtos;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Commands;
using SP.TestInfrastructure;
using System;
using System.Collections.Generic;
using System.Text;
using SP.TestInfrastructure.RegisteredCourseCommandTests;
using SP.TestInfrastructure.RegisteredCoursesCommandTests;
using SP.TestInfrastructure.StudentServiceTest;
using SP.Models;
using Shouldly;
using SP.TestInfrastructure.MountedCourseCommandTests;
using SP.Models.Dtos.Request;
using System.Linq;

namespace SP.IntegrationTest.RegisteredCourseTests
{
    public class GetRegisteredCoursesTest : IDisposable
    {
        private IGetRegisteredCoursesCommand _getRegisteredCoursesCommand;
        private IAddRegisteredCoursesCommand _addRegisteredCoureCommand;
        private IAddMountedCourseCommand _addMountedCoureCommand;
        private IGetMountedCoursesForRegistrationCommand _getMountedCoursesForRegistrationCommand;
        private IStudentService _studentService;
        private IProgramService _programService;

        [SetUp]
        public void Setup()
        {
            TestBootStrapper.Setup();
            _getRegisteredCoursesCommand = TestBootStrapper.Resolve<IGetRegisteredCoursesCommand>();
            _addRegisteredCoureCommand = TestBootStrapper.Resolve<IAddRegisteredCoursesCommand>();
            _addMountedCoureCommand = TestBootStrapper.Resolve<IAddMountedCourseCommand>();
            _getMountedCoursesForRegistrationCommand = TestBootStrapper.Resolve<IGetMountedCoursesForRegistrationCommand>();
            _studentService = TestBootStrapper.Resolve<IStudentService>();
            _programService = TestBootStrapper.Resolve<IProgramService>();

        }

        [Test]
        public void GetRegisteredCoursesCommand_With_Valid_Credentials_Should_Return_True()
        {
            //Given
            var student = StudentServiceData.GetStudent();
            var getRegisteredCourseRequest = new GetRegisteredCoursesRequest { IndexNumber = "12345fd", AcademicYear = "2019/2020", Semester = "1" };
            var mountedCourses = MountedCourseCommandData.GetMountedCourseRequests();
            var mountedcourserequest = new AddMountedCourseRequest(mountedCourses);
            var getMountedCoursesRequest = new GetMountedCoursesForRegistrationRequest { 
                AcademicYear = "2019/2020",
                Level = "200", 
                Program = "BSc. Computer Science", 
                Semester = "1" 
            };

            //When
            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            Result<Program> program = _programService.GetProgramByName("BSc. Computer Science") as Result<Program>;
            student.ProgramId = program.Value.ProgramId;
            _studentService.AddStudent(student);
            dynamic s = _studentService.GetStudent("12345fd");

            
            foreach (var mountedCourse in mountedcourserequest.MountedCourses)
            {
                mountedCourse.ProgramId = program.Value.ProgramId;
            }

            _addMountedCoureCommand.Execute(mountedcourserequest);

            var _mountedCourses = _getMountedCoursesForRegistrationCommand.Execute(getMountedCoursesRequest) as Result<IEnumerable<GetMountedCoursesResponse>>;
            var registerCourseRequest = _mountedCourses.Value.Select( m => new RegisteredCourseDto
            {
                IndexNumber = "12345fd",
                AcademicYear = "2019/2020",
                Approved = false,
                MountedCourseId = m.MountedCourseId,
                Semester = m.Semester,
                StudentId = s.Value.StudentId
            }).ToList();

            _addRegisteredCoureCommand.Execute(new AddRegisteredCoursesRequest(registerCourseRequest));

            Result<IEnumerable<GetRegisteredCoursesResponse>> result =_getRegisteredCoursesCommand.Execute(getRegisteredCourseRequest) as Result<IEnumerable<GetRegisteredCoursesResponse>>;

            //Then
            result.IsSucessful.ShouldBeTrue();
        }

        [Test]
        public void GetRegisteredCoursesCommand_With_invalid_Credentials_Should_Return_False()
        {
            //Given
            var student = StudentServiceData.GetStudent();
            var getRegisteredCourseRequest = new GetRegisteredCoursesRequest { IndexNumber = "12345fd", AcademicYear = "2019/2021", Semester = "1" };
            var mountedCourses = MountedCourseCommandData.GetMountedCourseRequests();
            var mountedcourserequest = new AddMountedCourseRequest(mountedCourses);
            var getMountedCoursesRequest = new GetMountedCoursesForRegistrationRequest
            {
                AcademicYear = "2019/2020",
                Level = "200",
                Program = "BSc. Computer Science",
                Semester = "1"
            };

            //When
            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            _studentService.AddStudent(student);

            Result<Program> program = _programService.GetProgramByName("BSc. Computer Science") as Result<Program>;
            foreach (var mountedCourse in mountedcourserequest.MountedCourses)
            {
                mountedCourse.ProgramId = program.Value.ProgramId;
            }

            _addMountedCoureCommand.Execute(mountedcourserequest);

            var _mountedCourses = _getMountedCoursesForRegistrationCommand.Execute(getMountedCoursesRequest) as Result<IEnumerable<GetMountedCoursesResponse>>;
            var registerCourseRequest = _mountedCourses.Value.Select(m => new RegisteredCourseDto
            {
                IndexNumber = "12345fd",
                AcademicYear = "2019/2020",
                Approved = false,
                MountedCourseId = m.MountedCourseId,
                Semester = m.Semester,
                StudentId = student.IndexNumber
            }).ToList();

            _addRegisteredCoureCommand.Execute(new AddRegisteredCoursesRequest(registerCourseRequest));

            Result result = _getRegisteredCoursesCommand.Execute(getRegisteredCourseRequest) as Result;

            //Then
            result.IsSucessful.ShouldBeFalse();
        }

        public void Dispose()
        {
            TestBootStrapper.Dispose();
        }
    }
}
