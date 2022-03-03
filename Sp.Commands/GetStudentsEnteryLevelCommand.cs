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
    public class GetStudentsEnteryLevelCommand : IGetStudentsEnteryLevelCommand
    {
        private IUnitOfWork _uow;
        public GetStudentsEnteryLevelCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IResult Execute(IRequest request)
        {
            if (request is GetStudentsEnteryLevelRequest)
            {
               var StudentsEnteryLevel = _uow.Students.GetStudentsEnteryLevel();
                return new Result<IEnumerable<StudentEnteryLevelResponse>>(true, StudentsEnteryLevel, Message.OperationCompletedSuccesfully);
            }
            return new Result(false, Message.OperationFailed);
        }
    }
}
