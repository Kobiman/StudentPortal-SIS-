using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Commands;
using SP.Services.Interfaces.Repository;
using System.Collections.Generic;
using System.Linq;

namespace SP.Commands
{
    public class GetExamResultsCommand : IGetExamResultsCommand
    {
        private readonly IUnitOfWork _uow;
        public GetExamResultsCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IResult Execute(IRequest request)
        {
            if (request is GetExamResultsRequest e)
            {
                var program = _uow.Programs.GetProgram(e.Program);
                if (program == null) return new Result(false, "Sorry, No Record Found");
                var mountedCourses = program.GetMountedCourses();
                var level = int.Parse(e.Level);
                var examresults = _uow.Students.GetStudentResults(e.AcademicYear, e.Program, e.Level)
                       .Select(s => new GetExamResultsResponse(
                         e.AcademicYear, 
                         $"{s?.Surname} {s?.Othernames}", 
                         s.IndexNumber, 
                         s.Specialization, 
                         program.Name, 
                         e.Semester, 
                         s.Results.Select(x =>
                         {
                             mountedCourses.TryGetValue(x.MountedCourseId, out MountedCourse m);
                             return CreateStudentResult(x, m);
                         }),
                         _uow.Students.GetTrailCourses(s.StudentId, e.Level, mountedCourses)
                    ));
                return new Result<IEnumerable<GetExamResultsResponse>>(true, examresults, Message.OperationCompletedSuccesfully);
            }
            return new Result(false, Message.OperationFailed);
        }

        private static ExamResultsDto CreateStudentResult(StudentResult x, MountedCourse m)
        {
            return new ExamResultsDto
            (
              x.Date,
              x.AcademicYear,
              x.Level,
              x.ExamResultId,
              x.Semester,
              m?.CourseCode,
              m?.CourseName,
              m?.Category,
              x.IndexNumber,
              x.Status,
              x.Comment,
              x.Credit,
              x.ClassMark,
              x.ExamMark,
              x.TotalMark,
              x.Grade,
              x.GradePoint,
              x.LecturerId,
              x.Scoring
            );
        }
    }
}
