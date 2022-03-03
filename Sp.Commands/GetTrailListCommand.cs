using Sp.Models.Dtos.Request;
using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Commands
{
    public class GetTrailListCommand: IGetTrailListCommand
    {
        private readonly IUnitOfWork _uow;
        public GetTrailListCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IResult Execute(IRequest request)
        {
            if (request is GetTrailListRequest t) { 
                var student = _uow.Students.GetStudent(t.IndexNumber);
                var program = _uow.Programs.GetProgram(student.ProgramId);
                var mountedCourses = program.GetMountedCourses();
                var trailList = Join(student, program, mountedCourses).OrderByDescending(x => x.ResultDate)
                     .GroupBy(x => x.CourseCode).Select(groupings => groupings.First())
                     .Where(x => x.Grade == "F" && x.Semester == t.Semester.ToUpper())
                     .Select(x=> {
                             var m = mountedCourses.Values.FirstOrDefault(y => y.CourseCode == x.CourseCode && y.AcademicYear == t.AcademicYear);
                             if (m is null) return default;
                             return new GetMountedCoursesResponse
                             {
                                 AcademicYear = m.AcademicYear,
                                 AssignedBy = m.AssignedBy,
                                 EnrollmentOption = m.EnrollmentOption,
                                 Level = x.Level,
                                 ProgramOfStudy = x.Name,
                                 Semester = m.Semester,
                                 CourseName = m.CourseName,
                                 CourseCode = m.CourseCode,
                                 Category = m.Category,
                                 Credit = m.Credit,
                                 AssignedTo = m.AssignedTo,
                                 Scoring = m.Scoring,
                                 MountedCourseId = m.MountedCourseId,
                                 Specialization = m.Specialization
                             };
                     });
                   return new Result<IEnumerable<GetMountedCoursesResponse>>(true, trailList, Message.OperationCompletedSuccesfully);
            }
            return new Result(false, Message.OperationFailed);
        }

        private IEnumerable<TrailListResult> Join(Student student, Program program, Dictionary<string, MountedCourse> mountedCourses)
        {            
            foreach (var r in student.Results)
            {
                if (mountedCourses.TryGetValue(r.MountedCourseId, out var mountedCourse))
                {
                    yield return new TrailListResult(
                        mountedCourse.CourseCode,
                        r.Grade,
                        r.Level,
                        r.Semester,
                        r.AcademicYear,
                        mountedCourse.CourseName,
                        r.Date,
                        program.Name
                    );
                };
            }
        }

    }
    public record TrailListResult(string CourseCode, string Grade, string Level, string Semester, string AcademicYear, string CourseName, DateTime ResultDate,string Name);
}
