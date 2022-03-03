using Sp.Models;
using SP.Common;
using SP.Models;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.Services
{
    public class StatusControlService : IStatusControlService
    {
        private readonly IUnitOfWork _uow;
        public StatusControlService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public IResult AddStatusControl(StatusControl statusControl)
        {
            if (statusControl is null) 
            return new Result(false, Message.CannotBeNull(nameof(StatusControl)));
            _uow.StatusControls.Add(statusControl);
            return new Result(true, "StatusControl Added Successfully");
        }

        public IResult AddStatusControls(IList<StatusControl> statusControls)
        {
            if (statusControls is null)
            return new Result(false, Message.CannotBeNull(nameof(StatusControl)));
            _uow.StatusControls.Add(statusControls);
            return new Result(true, "StatusControls Added Successfully");
        }

        public IResult UpdateStatusControl(StatusControl statusControl)
        {
            if (statusControl is null)
                return new Result(false, Message.CannotBeNull(nameof(StatusControl)));
            _uow.StatusControls.Update(statusControl);
            return new Result(true, "StatusControl Updated Successfully");
        }

        public IResult UpdateStatusControls(IList<StatusControl> statusControls)
        {
            if (statusControls is null)
                return new Result(false, Message.CannotBeNull(nameof(StatusControl)));
            for(var i = 0; i < statusControls.Count; i++)
            {
                _uow.StatusControls.Update(statusControls[i]);
            }
            return new Result(true, "StatusControl Updated Successfully");
        }

        public IResult GetStatusControl(string academicYear,string programId)
        {
            return new Result<StatusControl>(true,
                _uow.StatusControls.GetStatusControl(academicYear, programId),
                Message.OperationCompletedSuccesfully);
        }

        public IResult GetStatusControls(string academicYear)
        {
            return new Result<IEnumerable<StatusControl>>(true,
                _uow.StatusControls.GetStatusControls(academicYear),
                Message.OperationCompletedSuccesfully);
        }
    }
}
