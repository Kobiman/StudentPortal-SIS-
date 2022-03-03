using SP.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.DAL.Models
{
    public class InstitutionDM
    {
        public InstitutionDM(int length)
        {
            InstitutionId = new string[length];
            Code = new string[length];
            Name = new string[length];
            PostalAddress = new string[length];
            Email = new string[length];
            Country = new string[length];
            City = new string[length];
            Telephone = new string[length];
            Logo = new string[length];
            DateCreated = new System.DateTime[length];
        }
        public void Add(Institution type)
        {
            lock (type)
            {
                if (Count == InstitutionId.Length)
                {
                    var newLength = InstitutionId.Length + 2;
                    var _InstitutionId = new string[newLength];
                    InstitutionId.CopyTo(_InstitutionId, 0);
                    InstitutionId = _InstitutionId;
                    var _Code = new string[newLength];
                    Code.CopyTo(_Code, 0);
                    Code = _Code;
                    var _Name = new string[newLength];
                    Name.CopyTo(_Name, 0);
                    Name = _Name;
                    var _PostalAddress = new string[newLength];
                    PostalAddress.CopyTo(_PostalAddress, 0);
                    PostalAddress = _PostalAddress;
                    var _Email = new string[newLength];
                    Email.CopyTo(_Email, 0);
                    Email = _Email;
                    var _Country = new string[newLength];
                    Country.CopyTo(_Country, 0);
                    Country = _Country;
                    var _City = new string[newLength];
                    City.CopyTo(_City, 0);
                    City = _City;
                    var _Telephone = new string[newLength];
                    Telephone.CopyTo(_Telephone, 0);
                    Telephone = _Telephone;
                    var _Logo = new string[newLength];
                    Logo.CopyTo(_Logo, 0);
                    Logo = _Logo;
                    var _DateCreated = new System.DateTime[newLength];
                    DateCreated.CopyTo(_DateCreated,0);
                    DateCreated = _DateCreated;

                }
                InstitutionId[Count] = type.InstitutionId;
                Code[Count] = type.Code;
                Name[Count] = type.Name;
                PostalAddress[Count] = type.PostalAddress;
                Email[Count] = type.Email;
                Country[Count] = type.Country;
                City[Count] = type.City;
                Telephone[Count] = type.Telephone;
                Logo[Count] = type.Logo;
                DateCreated[Count] = type.DateCreated;
                Count++;
            }
        }

        public int Count;
        public string[] InstitutionId;
        public string[] Code;
        public string[] Name;
        public string[] PostalAddress;
        public string[] Email;
        public string[] Country;
        public string[] City;
        public string[] Telephone;
        public string[] Logo;
        public System.DateTime[] DateCreated;
    }
}
