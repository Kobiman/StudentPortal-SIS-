using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.TestInfrastructure.RegisteredCoursesCommandTests
{
    public static class RegisteredCourseCommandData
    {

        public static IEnumerable<RegisteredCourseDto> GetRegisteredCourseRequests()
        {

            return new List<RegisteredCourseDto>
            {
              new RegisteredCourseDto
              {
                  StudentId = "202112345",
                  IndexNumber = "12345fd",
                  //CourseCode = "CS102",
                  //CourseName = "INTRO. TO ARTIFICIAL INTELLIGENCE",
                  //Credit = 3,
                  Semester = "1",
                  AcademicYear = "2019/2020",
                  Approved = true,
                  MountedCourseId = "1122"
                  //Scoring = true,
              },

              new RegisteredCourseDto
              {
                  StudentId = "202112345",
                  IndexNumber = "12345fd",
                  //CourseCode = "CS103",
                  //CourseName = "INTRO. TO HUMAN COMPUTER INTERACTION",
                  //Credit = 2,
                  Semester = "1",
                  AcademicYear = "2019/2020",
                  Approved = true,
                  MountedCourseId = "1122"
                  //Scoring = true,
              },

              new RegisteredCourseDto
              {
                  StudentId = "202112345",
                  IndexNumber = "12345fd",
                  //CourseCode = "UENR101",
                  //CourseName = "INTRO. TO FRENCH",
                  //Credit = 2,
                  Semester = "1",
                  AcademicYear = "2019/2020",
                  Approved = true,
                  MountedCourseId = "1122"
                  //Scoring = true,
              },

            };

        }
    }
}
