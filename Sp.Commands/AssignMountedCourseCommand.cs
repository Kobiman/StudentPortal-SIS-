using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sp.Models.Dtos.Request;
using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Models.Dtos.Request;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Repository;

namespace SP.Commands
{
    public class AssignMountedCourseCommand : IAssignMountedCourseCommand
    {

        private readonly IUnitOfWork _uow;
        public AssignMountedCourseCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IResult Execute(IRequest request) { 
        if (request is AssignMountedCourseRequest r){
                if (r is null) return new Result(false, Message.OperationFailed);
                var mountedCourse = _uow.Programs.GetAllMountedCourses(r.AcademicYear, r.EnrolmentOption, r.Semester)
                    .FirstOrDefault(x=>x.MountedCourseId == r.MountedCourseId);
                if (mountedCourse is not null)
                {
                    mountedCourse.AssignedTo = r.AssignedTo;
                    mountedCourse.State+=1;
                    _uow.Programs.UpdateMountedCourse(mountedCourse);
                    return new Result(true, Message.OperationCompletedSuccesfully);
                }
            }
            return new Result(false, Message.OperationFailed);
        }
    }
}
