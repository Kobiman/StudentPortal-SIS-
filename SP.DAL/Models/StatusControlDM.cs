using Sp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.DAL.Models
{
    public class StatusControlDM
    {
        public StatusControlDM(int length)
        {
            Id = new string[length];
            Date = new DateTime[length];
            Active = new bool[length];
            ProgramId = new string[length];
            ControlType = new string[length];
            AcademicYear = new string[length];
            State = new int[length];
        }

        public void Add(StatusControl type)
        {
            lock (type)
            {
                if (Count == ProgramId.Length)
                {
                    var newLength = ProgramId.Length + 1000;
                    var _Id = new string[newLength];
                    Id.CopyTo(_Id, 0);
                    Id = _Id;
                    var _Date = new DateTime[newLength];
                    Date.CopyTo(Date, 0);
                    Date = _Date;
                    var _Active = new bool[newLength];
                    Active.CopyTo(_Active, 0);
                    Active = _Active;
                    var _ProgramId = new string[newLength];
                    ProgramId.CopyTo(_Active, 0);
                    ProgramId = _ProgramId;
                    var _ControlType = new string[newLength];
                    ControlType.CopyTo(_ControlType, 0);
                    ControlType = _ControlType;
                    var _AcademicYear = new string[newLength];
                    AcademicYear.CopyTo(_AcademicYear, 0);
                    AcademicYear = _AcademicYear;
                    var _State = new int[newLength];
                    State.CopyTo(_State, 0);
                    State = _State;
                }
                Id[Count] = type.Id;
                Date[Count] = type.Date;
                Active[Count] = type.Active;
                ProgramId[Count] = type.ProgramId;
                ControlType[Count] = type.ControlType;
                AcademicYear[Count] = type.AcademicYear;
                State[Count] = type.State;
                Count++;
            }
        }

        public int Count;
        public string[] Id;
        public DateTime[] Date;
        public bool[] Active;
        public string[] ProgramId;
        public string[] ControlType;
        public string[] AcademicYear;
        public int[] State;
    }
}
