using NUnit.Framework;
using Shouldly;
using Sp.Models.Dtos.Request;
using SP.Commands;
using SP.IntegrationTest.StudentServiceTests;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Commands;
using SP.TestInfrastructure;
using SP.TestInfrastructure.MountedCourseCommandTests;
using SP.TestInfrastructure.StudentServiceTest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.IntegrationTest.UploadExamResultsTests
{
    class CheckExamsResultsTest : IDisposable
    {
        private ICheckResultCommand _checkExamsResultComand;
        private IAddMountedCourseCommand _mountcoursecommand;
        private IGetMountedCoursesCommand _getMountedCoursesCommand;
        private IStudentService _studentService;
        private IUploadExamResultsCommand _uploadexamresultscommand;
        private IProgramService _programService;

        [SetUp]
        public void Setup()
        {
            TestBootStrapper.Setup();
            _checkExamsResultComand = TestBootStrapper.Resolve<ICheckResultCommand>();
            _studentService= TestBootStrapper.Resolve<IStudentService>();
            _programService = TestBootStrapper.Resolve<IProgramService>();
            _getMountedCoursesCommand = TestBootStrapper.Resolve<IGetMountedCoursesCommand>();
            _mountcoursecommand = TestBootStrapper.Resolve<IAddMountedCourseCommand>();
            _uploadexamresultscommand = TestBootStrapper.Resolve<IUploadExamResultsCommand>();
        }

        [Test]
        public void checkStudentResult_WithValidStudID_WithtEmptyResults_ReturnTrue()
        {
            StudentServiceData.AddStudent(_studentService, _programService);

            var result = _checkExamsResultComand.Execute(new CheckResultRequest("12345"));
           
            result.IsSucessful.ShouldBe(true);
        }

        [Test]
        public void checkStudentResult_With_Valid_Results_Should_Return_True()
        {
            StudentServiceData.AddStudent(_studentService, _programService);

            var getexamresults = ExamResultsCommandData.GetExamResultsRequest();
            var mountedCoursesRequest = MountedCourseCommandData.GetMountedCourseRequests();

            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            dynamic _result = _programService.GetProgramByName("BSc. Computer Science");
            Program program = _result.Value;

            foreach (var m in mountedCoursesRequest)
            {
                m.ProgramId = program.ProgramId;
            }

            _mountcoursecommand.Execute(new AddMountedCourseRequest(mountedCoursesRequest));
            var mountedCourses = _getMountedCoursesCommand.Execute(new GetMountedCoursesRequest { AcademicYear = "2019/2020", Program = "BSc. Computer Science" }) as Result<IEnumerable<GetMountedCoursesResponse>>;

            var request = new UploadExamResultsRequest(getexamresults.ToArray());

            int skip = 0;
            foreach (var uploadexamresult in request.StudentResults)
            {
                uploadexamresult.MountedCourseId = mountedCourses.Value.Skip(skip).FirstOrDefault().MountedCourseId;
                uploadexamresult.ProgramId = program.ProgramId;
                skip++;
            }
             _uploadexamresultscommand.Execute(request);


            Result<IEnumerable<ExamResultsDto>> result = _checkExamsResultComand.Execute(new CheckResultRequest("12345")) as Result<IEnumerable<ExamResultsDto>>;
            result.Value.Count().ShouldBe(getexamresults.Count());
            result.IsSucessful.ShouldBe(true);
        }


        [Test]
        public void checkStudentResult_WithWrongStudID_WithoutResults_ReturnFalse()
        {
            StudentServiceData.AddStudent(_studentService, _programService);
                        
                var result = _checkExamsResultComand.Execute(new CheckResultRequest("1234"));
                result.IsSucessful.ShouldBe(false);
        }


        public void Dispose()
        {
            //throw new NotImplementedException();
        }
    }
}
