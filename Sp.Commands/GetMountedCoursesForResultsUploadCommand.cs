using Sp.Models.Dtos.Request;
using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.Commands
{
    public class GetMountedCoursesForResultsUploadCommand : IGetMountedCoursesForResultsUploadCommand
    {
        private readonly IUnitOfWork _uow;
        public GetMountedCoursesForResultsUploadCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IResult Execute(IRequest request)
        {
            if(request is GetMountedCoursesForResultsUploadRequest r)
            {
               var result = _uow.Programs.GetAllMountedCourses(r.AcademicYear,r.EnrollmentOption.ToUpper(), r.Semester.ToUpper(),r.LecturerId);
                if (result is null) return new Result(false, Message.OperationFailed);
                return new Result<IEnumerable<MountedCourse>>(true, result,Message.OperationCompletedSuccesfully);
            }
            return new Result(false, Message.OperationFailed);
        }
    }
}
