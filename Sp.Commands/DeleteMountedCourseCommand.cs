using Sp.Models.Dtos.Request;
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
    public class DeleteMountedCourseCommand : IDeleteMountedCourseCommand
    {
        private readonly IUnitOfWork _uow;
        public DeleteMountedCourseCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IResult Execute(IRequest request)
        {
            if (request is DeleteMountedCourseRequest r)
            {
                _uow.Programs.DeleteMountedCourse(r.ProgramId, r.MountedCourseId);
                return new Result(true, Message.OperationCompletedSuccesfully);
            }
            return new Result(false, Message.OperationFailed); 
        }
    }
}
