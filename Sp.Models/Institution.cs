using System;
using System.Collections.Generic;
using System.Linq;

namespace SP.Models
{
    public class Institution
    {
        public Institution()
        {
            if (InstitutionId == null)
            {
                InstitutionId = Guid.NewGuid().ToString();
            }

            DateCreated = DateTime.Now;
        }

        public string InstitutionId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string PostalAddress { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Telephone { get; set; }
        //public string AcademicYear { get; set; }
        //public string Semester { get; set; }
        public string Logo { get; set; }
        public DateTime DateCreated { get; set; }
        public int State { get; set; }

        public Institution Edit(Institution institution)
        {
            Name = institution.Name;
            PostalAddress = institution.PostalAddress;
            Email = institution.Email;
            Country = institution.Country;
            City = institution.City;
            Telephone = institution.Telephone;
            Logo = institution.Logo;
            State++;
            return this;
        }
    }
}