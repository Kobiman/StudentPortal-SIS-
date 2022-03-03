using SP.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.DAL.Models
{

    public class LecturerDM
    {
        public LecturerDM(int length)
        {
            this.length = length;
            LecturerId = new string[length];
            StaffId = new string[length];
            Name = new string[length];
            Telephone = new string[length];
            Email = new string[length];
            Address = new string[length];
            DepartmentId = new string[length];
            State = new int[length];
            Status = new bool[length];
        }
        public void Add(Lecturer type)
        {

            lock (type)
            {
                if (Count == LecturerId.Length)
                {
                    var newLength = LecturerId.Length + 5;
                    var _LecturerId = new string[newLength];
                    LecturerId.CopyTo(_LecturerId, 0);
                    LecturerId = _LecturerId;
                    var _StaffId = new string[newLength];
                    StaffId.CopyTo(_StaffId, 0);
                    StaffId = _StaffId;
                    var _Name = new string[newLength];
                    Name.CopyTo(_Name, 0);
                    Name = _Name;
                    var _Telephone = new string[newLength];
                    Telephone.CopyTo(_Telephone, 0);
                    Telephone = _Telephone;
                    var _Email = new string[newLength];
                    Email.CopyTo(_Email, 0);
                    Email = _Email;
                    var _Address = new string[newLength];
                    Address.CopyTo(_Address, 0);
                    Address = _Address;
                    var _DepartmentId = new string[newLength];
                    DepartmentId.CopyTo(_DepartmentId, 0);
                    DepartmentId = _DepartmentId;
                    var _State = new int[newLength];
                    State.CopyTo(_State,0);
                    State = _State;
                    var _Status = new bool[newLength];
                    Status.CopyTo(_Status, 0);
                    Status = _Status;
                }
                LecturerId[Count] = type.LecturerId;
                StaffId[Count] = type.StaffId;
                Name[Count] = type.Name;
                Telephone[Count] = type.Telephone;
                Email[Count] = type.Email;
                Address[Count] = type.Address;
                DepartmentId[Count] = type.DepartmentId;
                Status[Count] = type.Status;
                State[Count]++;
                Count++;
            }
        }       

        private readonly int length;


        public int Count;

        public string[] LecturerId;
        public string[] StaffId;
        public string[] Name;
        public string[] Telephone;
        public string[] Email;
        public string[] Address;
        public string[] DepartmentId;
        public int[] State;
        public bool[] Status;
    }
}
