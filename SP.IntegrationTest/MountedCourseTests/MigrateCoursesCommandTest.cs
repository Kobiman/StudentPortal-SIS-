using NUnit.Framework;
using Shouldly;
using Sp.Commands;
using Sp.Models.Dtos.Request;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Commands;
using SP.TestInfrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.IntegrationTest.MountedCourseTests
{
    class MigrateCoursesCommandTest:IDisposable
    {
        private IMigrateCourseCommand _migrateCourseCommand;
        private IGetMountedCoursesCommand _getMountedCoursesCommand;
        private IAddMountedCourseCommand _addMountedCourse;
        private IProgramService _programService;

        [SetUp]
        public void Setup()
        {
            TestBootStrapper.Setup();
            _migrateCourseCommand = TestBootStrapper.Resolve<IMigrateCourseCommand>();
            _programService = TestBootStrapper.Resolve<IProgramService>();
            _addMountedCourse = TestBootStrapper.Resolve<IAddMountedCourseCommand>();
            _getMountedCoursesCommand = TestBootStrapper.Resolve<IGetMountedCoursesCommand>();
        }

        [Test]
        public void Migrate_Courses_With_Changing_Semester_ReturnTRUE()
        {

            var request = new MigrateCourseRequest
            { 
                AcademicYear = "2020/2021",
                Semester = "1"
            };
            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            var program = _programService.GetProgramByName("BSc. Computer Science") as Result<Program>;

            _addMountedCourse.Execute(new AddMountedCourseRequest(
                new List<MountedCourseDto>
            {
              new MountedCourseDto
              {
                  CourseCode="COMP 201",
                CourseName = "COMP 20",
                AcademicYear = "2019/2020",
                Semester = "1",
                EnrollmentOption =  "Regular",
                Level = "200",
                AssignedBy = "GIlbert",
                AssignedTo = "Kobby",
                Category = "Forest Science",
                ProgramId = program.Value.ProgramId
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
                ProgramId = program.Value.ProgramId
              },

              new MountedCourseDto
              {
                CourseCode = "COMP 205",
                CourseName = "COMP 205",
               AcademicYear = "2019/2020",
                Semester = "1",
                EnrollmentOption = "Regular" ,
                Level = "200",
                AssignedBy = "GIlbert",
                AssignedTo = "Kobby",
                Category = "Forest Science",
                ProgramId = program.Value.ProgramId
              },

            }));

          var result=  _migrateCourseCommand.Execute(request);
            result.IsSucessful.ShouldBeTrue();

        }


        [Test]
        public void Migrate_Courses_With_Non_Existing_Academic_Year_ReturnFalse()
        {

            var request = new MigrateCourseRequest
            {
                AcademicYear = "2025/2026",
                Semester = "1"
            };
            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            var program = _programService.GetProgramByName("BSc. Computer Science") as Result<Program>;

            _addMountedCourse.Execute(new AddMountedCourseRequest(
                new List<MountedCourseDto>
            {
              new MountedCourseDto
              {
                  CourseCode="COMP 201",
                CourseName = "COMP 20",
                AcademicYear = "2019/2020",
                Semester = "1",
                EnrollmentOption =  "Regular",
                Level = "200",
                AssignedBy = "GIlbert",
                AssignedTo = "Kobby",
                Category = "Forest Science",
                ProgramId = program.Value.ProgramId
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
                ProgramId = program.Value.ProgramId
              },

              new MountedCourseDto
              {
                CourseCode = "COMP 205",
                CourseName = "COMP 205",
               AcademicYear = "2019/2020",
                Semester = "1",
                EnrollmentOption = "Regular" ,
                Level = "200",
                AssignedBy = "GIlbert",
                AssignedTo = "Kobby",
                Category = "Forest Science",
                ProgramId = program.Value.ProgramId
              },

            }));

            var result = _migrateCourseCommand.Execute(request);
            result.IsSucessful.ShouldBeFalse();

        }


        [Test]
        public void Migrate_Courses_With_An_Already_Mounted_Course_Existing_Academic_Year_ReturnFalse()
        {

            var request = new MigrateCourseRequest
            {
                AcademicYear = "2020/2021",
                Semester = "1"
            };
            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            var program = _programService.GetProgramByName("BSc. Computer Science") as Result<Program>;

            _addMountedCourse.Execute(new AddMountedCourseRequest(
                new List<MountedCourseDto>
            {
              new MountedCourseDto
              {
                  CourseCode="COMP 201",
                CourseName = "COMP 20",
                AcademicYear = "2020/2021",
                Semester = "1",
                EnrollmentOption =  "Regular",
                Level = "200",
                AssignedBy = "GIlbert",
                AssignedTo = "Kobby",
                Category = "Forest Science",
                ProgramId = program.Value.ProgramId
        },new MountedCourseDto
              {
                  CourseCode="COMP 201",
                CourseName = "COMP 20",
                AcademicYear = "2019/2020",
                Semester = "1",
                EnrollmentOption =  "Regular",
                Level = "200",
                AssignedBy = "GIlbert",
                AssignedTo = "Kobby",
                Category = "Forest Science",
                ProgramId = program.Value.ProgramId
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
                ProgramId = program.Value.ProgramId
              },

              new MountedCourseDto
              {
                CourseCode = "COMP 205",
                CourseName = "COMP 205",
               AcademicYear = "2019/2020",
                Semester = "1",
                EnrollmentOption = "Regular" ,
                Level = "200",
                AssignedBy = "GIlbert",
                AssignedTo = "Kobby",
                Category = "Forest Science",
                ProgramId = program.Value.ProgramId
              },

            }));

            var result = _migrateCourseCommand.Execute(request);
            result.IsSucessful.ShouldBeFalse();

        }

        public void Dispose()
        {
            TestBootStrapper.Dispose();
        }

    }
}
