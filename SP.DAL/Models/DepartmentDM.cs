using SP.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.DAL.Models
{
    public class Departments
    {
        public Memory<DepartmentDM> Next { get; set; }
        public int Heigth { get; set; }
        private int _limit;
        private int index;
        public Departments(int limit)
        {
            Next = new DepartmentDM[limit];
            _limit = limit;
            index = 0;
            Heigth = 0;
        }

        public void Add(Department student)
        {
            lock (student)
            {
                if (Heigth > _limit - 1)
                {
                    if (index == _limit) { index = 0; }
                    Next.Span[index].Add(student);
                    index++;
                }
                else
                {
                    Next.Span[Heigth] = new DepartmentDM(5);
                    Next.Span[index].Add(student);
                    Heigth++;
                }
            }
        }
    }
    public class DepartmentDM
    {
        public DepartmentDM(int length)
        {
            this.length = length;
            DepartmentId = new string[length];
            Name = new string[length];
            Code = new string[length];
            CourseMounting = new bool[length];
            SchoolId = new string[length];
            LecturerId = new string[length];
            State = new int[length];
        }
        public void Add(Department type)
        {
            lock (type)
            {
                if (Count == DepartmentId.Length)
                {
                    var newLength = DepartmentId.Length + 5;
                    var _DepartmentId = new string[newLength];
                    DepartmentId.CopyTo(_DepartmentId,0);
                    DepartmentId = _DepartmentId;
                    var _Code = new string[newLength];
                    Code.CopyTo(_Code, 0);
                    Code = _Code;
                    var _CourseMounting = new bool[newLength];
                    CourseMounting.CopyTo(_CourseMounting, 0);
                    CourseMounting = _CourseMounting;
                    var _SchoolId = new string[newLength];
                    SchoolId.CopyTo(_SchoolId, 0);
                    SchoolId = _SchoolId;
                    var _LecturerId = new string[newLength];
                    LecturerId.CopyTo(_LecturerId, 0);
                    LecturerId = _LecturerId;
                    var _State = new int[newLength];
                    State.CopyTo(_State, 0);
                    State = _State;
                }
                DepartmentId[Count] = type.DepartmentId;
                Name[Count] = type.Name;
                Code[Count] = type.Code;
                CourseMounting[Count] = type.CourseMounting;
                SchoolId[Count] = type.SchoolId;
                LecturerId[Count] = type.LecturerId;
                State[Count]++;
                Count++;
            }
        }
        private readonly int length;


        public int Count;

        public string[] DepartmentId;
        public string[] Name;
        public string[] Code;
        public bool[] CourseMounting;
        public string[] SchoolId;
        public string[] LecturerId;
        public int[] State;
    }
}
