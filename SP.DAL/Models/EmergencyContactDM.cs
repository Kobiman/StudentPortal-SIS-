using SP.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.DAL.Models
{
    public class EmergencyContactDM
    {
        public EmergencyContactDM(int length)
        {
            this.length = length;
            Id = new string[length];
            Name = new string[length];
            Occupation = new string[length];
            Address = new string[length];
            Region = new string[length];
            HomeTown = new string[length];
            Mobile = new string[length];
            Email = new string[length];
            StudentId = new string[length];
            State = new int[length];
        }
        public void Add(EmergencyContact type)
        {

            lock (type)
            {
                if (Count == Id.Length)
                {
                    var newLength = Id.Length + 2;
                    var _ParentId = new string[newLength];
                    Id.CopyTo(_ParentId, 0);
                    Id = _ParentId;
                    var _Name = new string[newLength];
                    Name.CopyTo(_Name, 0);
                    Name = _Name;
                    var _Occupation = new string[newLength];
                    Occupation.CopyTo(_Occupation, 0);
                    Occupation = _Occupation;
                    var _Address = new string[newLength];
                    Address.CopyTo(_Address, 0);
                    Address = _Address;
                    var _Region = new string[newLength];
                    Region.CopyTo(_Region, 0);
                    Region = _Region;
                    var _HomeTown = new string[newLength];
                    HomeTown.CopyTo(_HomeTown, 0);
                    HomeTown = _HomeTown;
                    var _Mobile = new string[newLength];
                    Mobile.CopyTo(_Mobile, 0);
                    Mobile = _Mobile;
                    var _Email = new string[newLength];
                    Email.CopyTo(_Email, 0);
                    Email = _Email;
                    var _StudentId = new string[newLength];
                    StudentId.CopyTo(_StudentId, 0);
                    StudentId = _StudentId;
                    var _State = new int[newLength];
                    State.CopyTo(_StudentId, 0);
                    State = _State;

                }
                Id[Count] = type.Id;
                Name[Count] = type.Name;
                Occupation[Count] = type.Occupation;
                Address[Count] = type.Address;
                Region[Count] = type.Region;
                HomeTown[Count] = type.HomeTown;
                Mobile[Count] = type.Mobile;
                Email[Count] = type.Email;
                StudentId[Count] = type.StudentId;
                State[Count] = type.State;
            }
        }
        private readonly int length;


        public int Count;

        public string[] Id;
        public string[] Name;
        public string[] Occupation;
        public string[] Address;
        public string[] Region;
        public string[] HomeTown;
        public string[] Mobile;
        public string[] Email;
        public string[] StudentId;
        public int[] State;
    }
}
