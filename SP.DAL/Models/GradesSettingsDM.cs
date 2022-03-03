using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sp.Models;

namespace SP.DAL.Models
{
    public class GradesSettingsDM
    {
        public GradesSettingsDM(int length)
        {
            this.length = length;
            GradesSettingsId = new string[length];
            Grade = new string[length];
            GradePoint = new string[length];
            UpperLimit = new double[length];
            LowerLimit = new double[length];
            GradeRemarks = new string[length];
            CommissionDate = new DateTime[length];
            Type = new string[length];
            State = new int[length];
        }

        public void Add(GradesSettings type)
        {
            lock (type)
            {
                if (Count == GradesSettingsId.Length)
                {
                    var newLength = GradesSettingsId.Length + 4;
                    var _GradeChar = new string[newLength];
                    Grade.CopyTo(_GradeChar, 0);
                    Grade = _GradeChar;
                    var _GradePoint = new string[newLength];
                    GradePoint.CopyTo(_GradePoint, 0);
                    GradePoint = _GradePoint;
                    var _UpperLimit = new double[newLength];
                    UpperLimit.CopyTo(_UpperLimit, 0);
                    UpperLimit = _UpperLimit;
                    var _LowerLimit = new double[newLength];
                    LowerLimit.CopyTo(_LowerLimit, 0);
                    LowerLimit = _LowerLimit;
                    var _GradeRemarks = new string[newLength];
                    GradeRemarks.CopyTo(_GradeRemarks, 0);
                    GradeRemarks = _GradeRemarks;
                    var _CommissionDate = new DateTime[newLength];
                    CommissionDate.CopyTo(_CommissionDate, 0);
                    CommissionDate = _CommissionDate;
                    var _Type = new string[newLength];
                    Type.CopyTo(_Type, 0);
                    Type = _Type;
                    var _State = new int[newLength];
                    State.CopyTo(_State, 0);
                    State = _State;
                }
                GradesSettingsId[Count] = type.GradesSettingsId;
                Grade[Count] = type.Grade;
                GradePoint[Count] = type.GradePoint;
                UpperLimit[Count] = type.UpperLimit;
                LowerLimit[Count] = type.LowerLimit;
                GradeRemarks[Count] = type.GradeRemarks;
                CommissionDate[Count] = type.CommissionDate;
                Type[Count] = type.Type;
                State[Count] = type.State;
                Count++;
            }
        }


        private readonly int length;


        public int Count;

        public string[] GradesSettingsId;
        public string[] Grade;
        public string[] GradePoint;
        public double[] UpperLimit;
        public double[] LowerLimit;
        public string[] GradeRemarks;
        public DateTime[] CommissionDate;
        public string[] Type;
        public int[] State;
    }
}
