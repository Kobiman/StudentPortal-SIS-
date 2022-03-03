using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.DAL.Models
{
    public class _Student
    {
        public string StudentId { get; set; }
        public string IndexNumber { get; set; }
        public string ReferenceNumber { get; set; }
        public string Surname { get; set; }
        public string Othernames { get; set; }
        public string Title { get; set; }
        public string Gender { get; set; }
        public string MaritalStatus { get; set; }
        public string DateofBirth { get; set; }
        public bool Disability { get; set; }

        //Contact Details
        public string Country { get; set; }
        public string Region { get; set; }
        public string HomeTown { get; set; }
        public string Address1 { get; set; }

        public string Address2 { get; set; }
        public string Contact1 { get; set; }
        public string Contact2 { get; set; }
        public string PersonalEmail { get; set; }
        public string UniversityEmail { get; set; }
        public string ResidentialStatus { get; set; }

        //Academics
        public string ProgramId { get; set; }
        public string Specialization { get; set; }
        public string ProgramStatus { get; set; }
        public string Level { get; set; }
        public string StudentType { get; set; }
        public string EnrollmentOption { get; set; }
        public string RegistrationStatus { get; set; }
        public DateTime DateOfEntry { get; set; }
        public DateTime DateOfCompletion { get; set; }




        //Finance
        //public bool Owning { get; set; }
        //public string FeesBalance { get; set; }
        public string PamentOption { get; set; }


        public string DepartmentId { get; set; }
        public int State { get; set; }
    }
}
