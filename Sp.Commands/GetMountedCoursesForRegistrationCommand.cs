using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Models.Dtos.Request;
using SP.Services.Interfaces.Commands;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Commands
{
    public class GetMountedCoursesForRegistrationCommand : IGetMountedCoursesForRegistrationCommand
    {
        private readonly IUnitOfWork _uow;
        public GetMountedCoursesForRegistrationCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public IResult Execute(IRequest request)
        {
            if (request is GetMountedCoursesForRegistrationRequest r)
            {
                var mountedCourses = _uow.Programs
                                    ?.GetProgram(r.Program)
                                    ?.GetMountedCourses(r.AcademicYear, r.Semester, r.Level,r.ErollmentOption);

                if (mountedCourses == null) return new Result(false, "No Course Mouted");

                return new Result<IEnumerable<GetMountedCoursesResponse>>(
                    true, mountedCourses, Message.FetchOperationCompletedSuccesfully);
            }

            return new Result(false, "");
        }
    }
}
