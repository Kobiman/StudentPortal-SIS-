using System;
using System.Collections.Generic;
using System.Linq;

namespace SP.Models
{
    public class School
    {
        public School()
        {
            if (SchoolId == null)
            {
                SchoolId = Guid.NewGuid().ToString();
            }
        }
        public string SchoolId { get; set; }
        public string Name { get; set; }
        public string AcademicYear { get; set; }
        public string Semester { get; set; }
        /// <summary>
        /// This is used to turn on and off registration for a school
        /// </summary>
        public bool RegistrationActivated { get; set; }
        public bool ResultUploaded { get; set; }

        //Foreign Key
        public string InstitutionId { get; set; }
        public string LecturerId { get; set; }
        public int State { get; set; }


        /// <summary>
        /// Edit a 
        /// </summary>
        /// <returns></returns>
        public School Edit(School school)
        {
            InstitutionId = school.InstitutionId;
            Name = school.Name;
            RegistrationActivated = school.RegistrationActivated;
            ResultUploaded = school.ResultUploaded;
            SchoolId = school.SchoolId;
            Semester = school.Semester;
            AcademicYear = school.AcademicYear;
            LecturerId = school.LecturerId;
            return this;
        }
    }
}