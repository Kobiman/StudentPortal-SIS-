using NUnit.Framework;
using Shouldly;
using Sp.Models.Dtos.Request;
using SP.Commands;
using SP.Common;
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
    public class ApproveResultCommandTest
    {
        private IProgramService _programService;
        private IApproveResultsCommand _approveResultsCommand;
        private IUploadExamResultsCommand _uploadexamresultscommand;
        private IGetExamResultsCommand _getExamResultsCommand;
        private IAddMountedCourseCommand _mountedcoursecommand;
        private IStudentService _studentService;
        private IGetMountedCoursesCommand _getMountedCoursesCommand;

        [SetUp]
        public void Setup()
        {
            TestBootStrapper.Setup();
            _programService = TestBootStrapper.Resolve<IProgramService>();
            _uploadexamresultscommand = TestBootStrapper.Resolve<IUploadExamResultsCommand>();
            _approveResultsCommand = TestBootStrapper.Resolve<IApproveResultsCommand>();
            _programService = TestBootStrapper.Resolve<IProgramService>();
            _getExamResultsCommand = TestBootStrapper.Resolve<IGetExamResultsCommand>();
            _mountedcoursecommand = TestBootStrapper.Resolve<IAddMountedCourseCommand>();
            _studentService = TestBootStrapper.Resolve<IStudentService>();
            _getMountedCoursesCommand = TestBootStrapper.Resolve<IGetMountedCoursesCommand>();

        }


        [Test]
        public void ApproveResults_With_Status_Approved_Should_Return_True()
        {

            var student = new AddStudentRequest
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
                Level = "200",
                DateOfEntry = DateTime.Now,
                PamentOption = "GFP"
            };

            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            var program = _programService.GetProgramByName("BSc. Computer Science") as Result<Program>;
            student.ProgramId = program.Value.ProgramId;
            _studentService.AddStudent(student);

            var addMountedCourseRequest = new AddMountedCourseRequest(MountedCourseCommandData.GetMountedCourseRequests());

            foreach (var mountedCourse in addMountedCourseRequest.MountedCourses)
            {
                mountedCourse.ProgramId = program.Value.ProgramId;
            }
             _mountedcoursecommand.Execute(addMountedCourseRequest);
            var mountedCourses = _getMountedCoursesCommand.Execute(
                new GetMountedCoursesRequest(new List<Query>{ new Query("2019/2020", "BSc. Computer Science") })
                ) as Result<IEnumerable<GetMountedCoursesResponse>>;

            var mountedCoursesArray = mountedCourses?.Value.ToArray();
            var examsResults = new List<ExamResult>();
            for (int i = 0; i < mountedCoursesArray.Length; i++)
            {
                examsResults.Add(new ExamResult
                {
                    AcademicYear = "2019/2020",
                    Semester = "1",
                    MountedCourseId = mountedCoursesArray[i].MountedCourseId,
                    LecturerId = "Kobby",
                    ClassMark = 35,
                    Credit = 3,
                    ExamMark = 45,
                    Grade = "B",
                    GradePoint = 2.4f,
                    IndexNumber = "12345",
                    Level = "200",
                    ProgramId = "1487",
                    TotalMark = 80
                });
            }

            var uploadExamResultsRequest = new UploadExamResultsRequest(examsResults.ToArray());

            foreach (var uploadexamresult in uploadExamResultsRequest.StudentResults)
            {
                uploadexamresult.ProgramId = program.Value.ProgramId;
            }

            _uploadexamresultscommand.Execute(uploadExamResultsRequest);

            var examsResult = _getExamResultsCommand
                     .Execute(new GetExamResultsRequest { AcademicYear = "2019/2020", Level = "200", Program = program.Value.ProgramId }) 
                     as Result<IEnumerable<GetExamResultsResponse>>;
            var approveResultsDto = new List<ApproveResultsDto>();

            foreach(var r in examsResult.Value)
            {
                foreach (var s in r.StudentResults)
                {
                    approveResultsDto.Add(new ApproveResultsDto { IndexNumber = s.IndexNumber, Comment = "Good", ExamResultId = s.ExamResultId, Status = "Approved" });
                }
            }
            
            var result1 = _approveResultsCommand.Execute(new ApproveResultsRequest(approveResultsDto));
            var result2 = _getExamResultsCommand.Execute(new GetExamResultsRequest { AcademicYear = "2019/2020", Level = "200", Program = program.Value.ProgramId }) as Result<IEnumerable<GetExamResultsResponse>>;
            result1.IsSucessful.ShouldBeTrue();
           // result2.Value.ToArray()[0].StudentResults[0].Status.ShouldBe("Approved");
        }
    }
}
