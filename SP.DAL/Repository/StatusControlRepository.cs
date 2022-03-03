using Sp.Models;
using SP.DAL.Models;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.DAL.Repository
{
    public class StatusControlRepository : IStatusControlRepository
    {
        private StatusControlDM Collection;
        public StatusControlRepository(StatusControlDM collection)
        {
            Collection = collection;
        }

        public bool Add(StatusControl statusControl)
        {
            Collection.Add(statusControl);
            DataWriter.Add(statusControl, nameof(StatusControl));
            return true;
        }

        public bool Add(IList<StatusControl> statusControls)
        {
            for(var i = 0; i < statusControls.Count; i++)
            {
                Collection.Add(statusControls[i]);
            }
            DataWriter.Add(statusControls, nameof(StatusControl));
            return true;
        }

        public bool Update(StatusControl statusControl)
        {
            var result = Collection.Find((x, y) => x.Id[y] == statusControl.Id);
            if (!result.success) return false;
            result.Value.AcademicYear[result.Index] = statusControl.AcademicYear;
            result.Value.Active[result.Index] = statusControl.Active;
            result.Value.ControlType[result.Index] = statusControl.ControlType;
            result.Value.ProgramId[result.Index] = statusControl.ProgramId;
            result.Value.State[result.Index] += 1;
            statusControl.State = result.Value.State[result.Index];
            DataWriter.Add(statusControl, nameof(StatusControl));
            return true;
        }

        public StatusControl GetStatusControl(string academicYear, string programId)
        {
            var result = Collection.Find((a, b) => a.AcademicYear[b] == academicYear && a.ProgramId[b] == programId);
            if (!result.success) return null; 
            return new StatusControl
            {
                AcademicYear = result.Value.AcademicYear[result.Index],
                Active = result.Value.Active[result.Index],
                ControlType = result.Value.ControlType[result.Index],
                ProgramId = result.Value.ProgramId[result.Index],
                Id = result.Value.Id[result.Index],
                State = result.Value.State[result.Index]
            };
        }

        public IEnumerable<StatusControl> GetStatusControls(string academicYear)
        {
            return Collection.Select((a,b)=>a.AcademicYear[b] == academicYear,
                (x,y) => new StatusControl
                {
                    AcademicYear = x.AcademicYear[y],
                    Active = x.Active[y],
                    ControlType = x.ControlType[y],
                    ProgramId = x.ProgramId[y],
                    Id = x.Id[y],
                    State = x.State[y]
                });
        }
    }
}
