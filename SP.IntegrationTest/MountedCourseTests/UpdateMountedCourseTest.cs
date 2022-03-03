using NUnit.Framework;
using Shouldly;
using SP.Commands;
using SP.Models;
using SP.Models.Dtos;
using SP.Models.Dtos.Request;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Commands;
using SP.TestInfrastructure;
using SP.TestInfrastructure.MountedCourseCommandTests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.IntegrationTest.MountedCourseTests
{
    public class UpdateMountedCourseTest : IDisposable
    {
        private IUpdateMountedCourseCommand _updateMountedCourseVommand;
        private IGetMountedCoursesCommand _getMountedCoursesCommand;
        private IAddMountedCourseCommand _addMountedCourse;
        private IProgramService _programService;
        private ILecturerService _lecturerService;

        [SetUp]
        public void Setup()
        {
            TestBootStrapper.Setup();
            _updateMountedCourseVommand = TestBootStrapper.Resolve<IUpdateMountedCourseCommand>();
            _programService = TestBootStrapper.Resolve<IProgramService>();
            _lecturerService = TestBootStrapper.Resolve<ILecturerService>();
            _addMountedCourse = TestBootStrapper.Resolve<IAddMountedCourseCommand>();
            _getMountedCoursesCommand = TestBootStrapper.Resolve<IGetMountedCoursesCommand>();
        }


        [Test]
        public void UpdateMountedCourseCommand_With_LecturerID_Returns_True()
        {

            var request = new UpdateMountedCourseRequest
            {
                MountedCourseId = "2cba1c34-db62-4c70-8d05-836d0ee42fe4",
                CourseCode = "COMP 201",
                CourseName = "COMP 20",
                AcademicYear = "2019/2020",
                Semester = "1",
                EnrollmentOption = "Regular",
                Level = "200",
                AssignedBy = "GIlbert",
                Category = "Forest Science"
            };

            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            var program = _programService.GetProgramByName("BSc. Computer Science") as Result<Program>;
            request.ProgramId = program.Value.ProgramId;
            _addMountedCourse.Execute(new AddMountedCourseRequest(
                new List<MountedCourseDto>
            {
              new MountedCourseDto
              {
                  CourseCode="COMP 201",
                CourseName = "COMP 20",
                AcademicYear = "2019/2020",
                Semester = "1",
                EnrollmentOption = "Regular",
                Level = "200",
                AssignedBy = "GIlbert",
                AssignedTo = "Kobby",
                Category = "Forest Science",
                ProgramId = request.ProgramId
              },

              new MountedCourseDto
              {
                  CourseCode="COMP 203",
                CourseName = "COMP 203",
                AcademicYear = "2019/2020",
                Semester = "1",
                EnrollmentOption = "Regular",
                Level = "200",
                AssignedBy = "GIlbert",
                AssignedTo = "Kobby",
                Category = "Forest Science",
                ProgramId = request.ProgramId
              },

              new MountedCourseDto
              {
                CourseCode = "COMP 205",
                CourseName = "COMP 205",
                AcademicYear = "2019/2020",
                Semester = "1",
                EnrollmentOption = "Regular",
                Level = "200",
                AssignedBy = "GIlbert",
                AssignedTo = "Kobby",
                Category = "Forest Science",
                ProgramId = request.ProgramId
              },

            }));

            var mountedCourses = _getMountedCoursesCommand
                                                .Execute(new GetMountedCoursesRequest { Program = program.Value.Name, AcademicYear = request.AcademicYear })
                                                as Result<IEnumerable<GetMountedCoursesResponse>>;

            var lec = new Lecturer
            {
                LecturerId = "PSL777",
                StaffId = "PS777",
                Name = "Nana Otiwaa",
                Telephone = "0262057248",
                Email = "nanotiwaaadu@uenr.edu.gh",
                Address = "",
                DepartmentId = "",
                State = 1
            };

            _lecturerService.AddLecturer(lec);
            request.AssignedTo = "PS777";
            request.MountedCourseId = mountedCourses.Value.FirstOrDefault().MountedCourseId;

            //Act when
            var result = _updateMountedCourseVommand.Execute(request);

            var result2 = _getMountedCoursesCommand
                                                   .Execute(new GetMountedCoursesRequest { Program = program.Value.Name, AcademicYear = request.AcademicYear })
                                                   as Result<IEnumerable<GetMountedCoursesResponse>>;
            result.IsSucessful.ShouldBe(true);
            result2.Value.FirstOrDefault().AssignedTo.ShouldBe("PS777");
        }


        public void Dispose()
        {
            TestBootStrapper.Dispose();
        }
    }
}
