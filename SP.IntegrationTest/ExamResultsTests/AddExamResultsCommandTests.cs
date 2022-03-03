using NUnit.Framework;
using Shouldly;
using Sp.Models.Dtos.Request;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces;
using SP.TestInfrastructure;
using SP.TestInfrastructure.MountedCourseCommandTests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SP.IntegrationTest.UploadExamResultsTests
{
    public class AddExamResultsCommandTests : IDisposable
    {
        private IUploadExamResultsCommand _uploadexamresultscommand;
        private IProgramService _programService;


        [SetUp]
        public void Setup()
        {
            TestBootStrapper.Setup();
            _uploadexamresultscommand = TestBootStrapper.Resolve<IUploadExamResultsCommand>();
            _programService = TestBootStrapper.Resolve<IProgramService>();
        }



        [Test]
        public void UploadExamResultsCommand_With_Non_Empty_ResultList_Should_Return_False()
        {
            var getexamresults = ExamResultsCommandData.GetExamResultsRequest();

            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            dynamic _result = _programService.GetProgramByName("BSc. Computer Science");
            Program program = _result.Value;

            var request = new UploadExamResultsRequest(getexamresults.ToArray());

            foreach (var uploadexamresult in request.StudentResults)
            {
                uploadexamresult.ProgramId = program.ProgramId;
            }

            var result = _uploadexamresultscommand.Execute(request) as Result;

            result.IsSucessful.ShouldBe(false);
        }
        [Test]
        public void UploadExamResultsCommand_With_Empty_ResultList_Should_Return_False()
        {
            var getexamresults = new ExamResult[] { };

            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            dynamic _result = _programService.GetProgramByName("BSc. Computer Science");
            Program program = _result.Value;

            var request = new UploadExamResultsRequest(getexamresults.ToArray());

            var result = _uploadexamresultscommand.Execute(request) as Result;

            result.IsSucessful.ShouldBe(false);
        }


        public void Dispose()
        {
            TestBootStrapper.Dispose();
        }
    }
}
