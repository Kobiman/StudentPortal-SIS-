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
    public class GetRegisteredStudentsCommand: IGetRegisteredStudentsCommand
    {
        private readonly IUnitOfWork _uow;
        public GetRegisteredStudentsCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public IResult Execute(IRequest request)
        {
            if (request is GetRegisteredStudentsRequest r)
            {
                var registeredStudents = _uow.Students.GetRegisteredStudents(r.MountedCourseId,r.Semester,r.AcademicYear,r.ProgramId);
                return new Result<IEnumerable<GetRegisteredStudentsReponse>>(true, registeredStudents, Message.FetchOperationCompletedSuccesfully);
            }
            return new Result(false, Message.OperationFailed);
        }
    }
}
