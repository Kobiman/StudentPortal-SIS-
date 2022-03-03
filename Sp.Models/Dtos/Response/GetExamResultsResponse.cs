using Sp.Models.Dtos;
using Sp.Models.Dtos.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SP.Models.Dtos
{
    public record GetExamResultsResponse
    {
        public GetExamResultsResponse(string academicYear, string name, string indexNumber, string specialization, string program, string semester, IEnumerable<ExamResultsDto> studentResults, IEnumerable<TrailCourseDto> allResults)
        {
            AcademicYear = academicYear;
            IndexNumber = indexNumber;
            Name = name;
            Program = program;
            Specialization = specialization;
            StudentResults = studentResults.Where(x=>x.Semester == semester.ToUpper() && x.AcademicYear == academicYear);
            CumulativeCredit = studentResults.Sum(s=>s.Credit);
            ActualCredit = studentResults.GroupBy(b => b.CourseCode).Select(x => x.First().Credit).Sum();
            CreditEarned = studentResults.Where(x => x.TotalMark > 45).Sum(x=>x.Credit);
            CumulativeGPA = CumulativeCredit > 0 ? studentResults.Sum(r => r.Credit * r.GradePoint) / CumulativeCredit : 0;
            TrailCourses = allResults.OrderByDescending(x => x.Date)
                            .GroupBy(x => x.CourseCode).Select(groupings => groupings.First())
                            .Where(x => x.Grade == "F")
                            .Select(x => new PendingTrailsResponse
                            {
                                CourseCode = x.CourseCode,
                                CourseName = x.CourseName,
                                Credit = x.Credit.ToString(),
                                Category = x.Category
                            });
        }
        public string AcademicYear { get; }
        public string IndexNumber { get; }
        public string Specialization { get; }
        public string Name { get; }
        public string Program { get; }
        public int CurrentCredit => StudentResults.Sum(r => r.Credit);
        public float CurrentGPA => CurrentCredit > 0 ? StudentResults.Sum(r => r.Credit * r.GradePoint) / CurrentCredit : 0;
        public int CumulativeCredit { get; }
        public int ActualCredit { get; }
        public int CreditEarned { get; }
        public float CumulativeGPA { get; }
        public IEnumerable<ExamResultsDto> StudentResults { get; }
        public IEnumerable<PendingTrailsResponse> TrailCourses { get; }
    }

}
