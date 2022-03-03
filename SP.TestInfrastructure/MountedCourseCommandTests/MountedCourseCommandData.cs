using SP.Commands;
using SP.Models;
using SP.Models.Dtos;
using SP.Models.Dtos.Request;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.TestInfrastructure.MountedCourseCommandTests
{
    public static class MountedCourseCommandData
    {

        public static IEnumerable<MountedCourseDto> GetMountedCourseRequests()
        {

            return new List<MountedCourseDto>
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
              },

            };
        
        }

    }
}
