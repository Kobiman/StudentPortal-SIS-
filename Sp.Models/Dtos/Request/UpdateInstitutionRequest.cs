using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Models.Dtos
{
    public class UpdateInstitutionRequest
    {
        public string InstitutionId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string PostalAddress { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Telephone { get; set; }
        public string Logo { get; set; }
        public DateTime DateCreated { get; set; }
        public int State { get; set; }

    }
}
