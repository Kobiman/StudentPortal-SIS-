using Sp.Models.Dtos.Request;
using Sp.Models.Dtos.Response;
using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Commands;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Commands
{
    public class GetRegisteredCoursesForApprovalCommand : IGetRegisteredCoursesForApprovalCommand
    {
        private readonly IUnitOfWork _uow;
        public GetRegisteredCoursesForApprovalCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IResult Execute(IRequest request)
        {
            if (request is GetRegisteredCoursesForApprovalRequest r)
            {
                var students = _uow.Students.GetStudentsByProgram(r.ProgramId, r.AcademicYear, r.Level);
                if(!students.Any()) return new Result(false, Message.CannotBeNull(nameof(Student)));
                var program = _uow.Programs.GetProgram(students.FirstOrDefault().ProgramId);
                if (program == null) return new Result(false, Message.CannotBeNull(nameof(Program)));
                List<GetMountedCoursesForRegistrationReponse> registeredStudents = new();
                foreach (var s in students)
                {
                    if(s.RegisteredCourses.Any())
                    {
                        foreach (var c in s.RegisteredCourses)
                        {
                            var course = program.MountedCourses.FirstOrDefault(x => x.MountedCourseId == c.MountedCourseId);
                            c.CourseCode = course.CourseCode;
                            c.CourseName = course.CourseName;
                            c.Credit = course.Credit;
                            c.Category = course.Category;
                        }
                        s.TrailCourses = Join(s.TrailCourses, program.GetMountedCourses())
                            .OrderByDescending(x => x.Date)
                            .GroupBy(x => x.CourseCode).Select(groupings => groupings.First())
                            .Where(x => x.Grade == "F");
                        s.PendingTrails = s.TrailCourses.Count();
                        registeredStudents.Add(s);
                    }
                }

                return new Result<IEnumerable<GetMountedCoursesForRegistrationReponse>>(true, registeredStudents, Message.FetchOperationCompletedSuccesfully);
            }
            return new Result(false, Message.OperationFailed);
        }

        private IEnumerable<PendingTrailsResponse> Join(IEnumerable<PendingTrailsResponse> results, Dictionary<string, MountedCourse> mountedCourses)
        {
            foreach (var r in results)
            {
                if (mountedCourses.TryGetValue(r.MountedCourseId, out var mountedCourse))
                {
                    yield return new PendingTrailsResponse {
                        CourseCode = mountedCourse.CourseCode,
                        CourseName = mountedCourse.CourseName,
                        Credit = r.Credit,
                        Category = mountedCourse.Category
                    };
                };
            }
        }
    }
}
