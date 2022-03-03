using Sp.Models;
using SP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.Services.Interfaces
{
    public interface IStatusControlService
    {
        IResult GetStatusControl(string academicYear, string programId);
        IResult GetStatusControls(string academicYear);
        IResult AddStatusControl(StatusControl statusControl);
        IResult AddStatusControls(IList<StatusControl> statusControls);
        IResult UpdateStatusControl(StatusControl statusControl);
        IResult UpdateStatusControls(IList<StatusControl> statusControls);
    }
}
