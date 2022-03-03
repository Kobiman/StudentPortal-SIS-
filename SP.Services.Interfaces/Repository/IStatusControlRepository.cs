using Sp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.Services.Interfaces.Repository
{
    public interface IStatusControlRepository
    {
        bool Add(StatusControl statusControl);
        bool Update(StatusControl statusControl);
        bool Add(IList<StatusControl> statusControls);
        StatusControl GetStatusControl(string academicYear, string programId);
        IEnumerable<StatusControl> GetStatusControls(string academicYear);
    }
}
