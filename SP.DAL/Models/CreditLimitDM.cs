using SP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.DAL.Models
{
    public class CreditLimitDM
    {
        public CreditLimitDM(int length)
        {
            this.length = length;
            ProgramId = new string[length];
            MaxCredit = new int[length];
            MinCredit = new int[length];
            Level = new string[length];
            State = new int[length];
            Deleted = new bool[length];
            CreditLimitId = new string[length];
        }
        public void Add(CreditLimit type)
        {

            lock (type)
            {
                if (Count == ProgramId.Length)
                {
                    var newLength = ProgramId.Length + 1000;
                    var _ProgramId = new string[newLength];
                    ProgramId.CopyTo(_ProgramId, 0);
                    ProgramId = _ProgramId;
                    var _MaxCredit = new int[newLength];
                    MaxCredit.CopyTo(_MaxCredit, 0);
                    MaxCredit = _MaxCredit;
                    var _MinCredit = new int[newLength];
                    MinCredit.CopyTo(_MinCredit, 0);
                    MinCredit = _MinCredit;
                    var _Level = new string[newLength];
                    Level.CopyTo(_Level, 0);
                    Level = _Level;
                    var _CreditLimitId = new string[newLength];
                    CreditLimitId.CopyTo(_CreditLimitId, 0);
                    CreditLimitId = _CreditLimitId;
                    var _State = new int[newLength];
                    State.CopyTo(_State, 0);
                    State = _State;
                    var _Deleted = new bool[newLength];
                    Deleted.CopyTo(_Deleted, 0);
                    Deleted = _Deleted;

                }
                ProgramId[Count] = type.ProgramId;
                MaxCredit[Count] = type.MaxCredit;
                MinCredit[Count] = type.MinCredit;
                Level[Count] = type.Level;
                CreditLimitId[Count] = type.CreditLimitId;
                State[Count] = type.State;
                Deleted[Count] = type.Deleted;
                Count++;
            }
        }
        private readonly int length;


        public int Count;

        public string[] CreditLimitId;
        public string[] ProgramId;
        public int[] MaxCredit;
        public int[] MinCredit;
        public string[] Level;
        public int[] State;
        public bool[] Deleted;
    }
}
