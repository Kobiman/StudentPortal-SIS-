using KMapper;
using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Models.Dtos.Request;
using SP.Services.Interfaces.Commands;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace SP.Commands
{
    public class UpdateMountedCourseCommand : IUpdateMountedCourseCommand
    {

        private readonly IUnitOfWork _uow;
        public UpdateMountedCourseCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IResult Execute(IRequest request)
        {
            if (request is UpdateMountedCourseRequest newmountedCourse)
            {
                var mountedCourses = newmountedCourse.Map<MountedCourse, UpdateMountedCourseRequest>();
                _uow.Programs.UpdateMountedCourse(mountedCourses);
                return new Result(true, Message.UpdatedSuccessfully(nameof(MountedCourse)));
            }
            return new Result(false, Message.OperationFailed);
        }
    }
}
