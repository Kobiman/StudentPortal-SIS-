using KMapper;
using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Commands;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SP.Commands
{
    public class GetMountedCoursesCommand : IGetMountedCoursesCommand
    {
        private readonly IUnitOfWork _uow;
        public GetMountedCoursesCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }

       

        public IResult Execute(IRequest request)
        {
            if (request is GetMountedCoursesRequest mountedcourse)
            {
                var programs = _uow.Programs.GetPrograms();
                var mountedCourses = GetMountedCourses(programs).Where(x=> x.ExecuteQuery(mountedcourse.Queries));

                if (mountedCourses == null) return new Result(false, Message.NotFound(nameof(MountedCourse)));

                return new Result<IEnumerable<GetMountedCoursesResponse>>(true, mountedCourses, Message.OperationCompletedSuccesfully);
            }

            return new Result(false, Message.OperationFailed);
        }

        private IEnumerable<GetMountedCoursesResponse> GetMountedCourses(IEnumerable<Program> programs)
        {
            foreach (var p in programs)
            {
                if (p is not null)
                {
                    foreach(var x in p.MountedCourses)
                    {
                        yield return new GetMountedCoursesResponse
                        {
                            AcademicYear = x.AcademicYear,
                            AssignedBy = x.AssignedBy,
                            EnrollmentOption = x.EnrollmentOption,
                            Level = x.Level,
                            ProgramOfStudy = p.Name,
                            Semester = x.Semester,
                            CourseName = x.CourseName,
                            CourseCode = x.CourseCode,
                            Category = x.Category,
                            Credit = x.Credit,
                            AssignedTo = x.AssignedTo,
                            Scoring = x.Scoring,
                            MountedCourseId = x.MountedCourseId,
                            Specialization = x.Specialization
                        };
                    }
                }
            }
        }
    }
}
