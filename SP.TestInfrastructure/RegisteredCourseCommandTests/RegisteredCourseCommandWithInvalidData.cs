using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.TestInfrastructure.RegisteredCourseCommandTests
{
    public class RegisteredCourseCommandWithInvalidData
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
                  AcademicYear = "",
                  Approved = true,
                  //Scoring = true,
              },

            };

        }
    }
}
