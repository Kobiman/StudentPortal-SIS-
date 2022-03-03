using SP.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.DAL.Models
{

    public class CourseDM
    {
        public CourseDM(int length)
        {
            this.length = length;
            CourseId = new string[length];
            Code = new string[length];
            CourseName = new string[length];
            Credit = new int[length];
            DepartmentId = new string[length];
            State = new int[length];
        }
        public void Add(Course type)
        {

            lock (type)
            {
                if (Count == CourseId.Length)
                {
                    var newLength = CourseId.Length + 5;
                    var _CourseId = new string[newLength];
                    CourseId.CopyTo(_CourseId,0);
                    CourseId = _CourseId;
                    var _Code = new string[newLength];
                    Code.CopyTo(_Code, 0);
                    Code = _Code;
                    var _CourseName = new string[newLength];
                    CourseName.CopyTo(_CourseName, 0);
                    CourseName = _CourseName;
                    var _Credit = new int[newLength];
                    Credit.CopyTo(_Credit, 0);
                    Credit = _Credit;
                    var _DepartmentId = new string[newLength];
                    DepartmentId.CopyTo(_DepartmentId, 0);
                    DepartmentId = _DepartmentId;
                    var _State = new int[newLength];
                    State.CopyTo(_State, 0);
                    State = _State;

                }
                CourseId[Count] = type.CourseId;
                Code[Count] = type.Code;
                CourseName[Count] = type.CourseName;
                Credit[Count] = type.Credit;
                DepartmentId[Count] = type.DepartmentId;
                State[Count] = type.State;
                Count++;
            }
        }
        private readonly int length;


        public int Count;

        public string[] CourseId;
        public string[] Code;
        public string[] CourseName;
        public int[] Credit;
        public string[] DepartmentId;
        public int[] State;
    }
}
