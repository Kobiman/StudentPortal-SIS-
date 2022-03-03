using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Models.Dtos
{
    public record ExamResultsDto(DateTime Date,
        string AcademicYear, 
        string Level, 
        string ExamResultId, 
        string Semester,
        string CourseCode,
        string CourseName,
        string Category,
        string IndexNumber, 
        string Status, 
        string Comment, 
        int Credit, 
        float ClassMark, 
        float ExamMark, 
        float TotalMark, 
        string Grade, 
        float GradePoint, 
        string LecturerId,
        bool Scoring);
}
