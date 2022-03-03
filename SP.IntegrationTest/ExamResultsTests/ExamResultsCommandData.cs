using Sp.Models.Dtos.Request;
using SP.Commands;
using SP.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.IntegrationTest.UploadExamResultsTests
{
    public class ExamResultsCommandData
    {

        public static IEnumerable<ExamResult> GetExamResultsRequest()
        {

            return new List<ExamResult>
            {
              new ExamResult
              {
                AcademicYear = "2019/2020",
                Semester = "1",
                MountedCourseId="65757575",
                LecturerId = "Kobby",
               ClassMark=35,
               Credit=3,
               ExamMark=45,
               Grade="B",
               GradePoint=2.4f,
               IndexNumber="12345",
               Level="200",
               ProgramId="1487",
               TotalMark=80
              },

              new ExamResult
              {
                //StudentId = "UE20027714",
                AcademicYear = "2019/2020",
                Semester = "1",
                MountedCourseId="65757575",
                LecturerId = "Kobby",
               ClassMark=15,
               Credit=2,
               ExamMark=55,
               Grade="B",
               GradePoint=2.4f,
               IndexNumber="12345",
               Level="200",
               ProgramId="1487",
               TotalMark=70
              },

              new ExamResult
              {
                //StudentId = "UE20027914",
                AcademicYear = "2019/2020",
                Semester = "1",
                MountedCourseId="65757575",
                LecturerId = "Kobby",
               ClassMark=35,
               Credit=3,
               ExamMark=45,
               Grade="B",
               GradePoint=2.4f,
               IndexNumber="12345",
               Level="200",
               ProgramId="1487",
               TotalMark=80
              },

            };

        }
    }
}
