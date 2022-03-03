using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SP.Models.Dtos
{
    public class UpdateStudentRequest
    {
        [Required]
        public string StudentId { get; set; }
        [Required]
        public string IndexNumber { get; set; }
        [Required]
        public string ReferenceNumber { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        public string Othernames { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public string MaritalStatus { get; set; }
        [Required]
        public DateTime DateofBirth { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string Region { get; set; }
        [Required]
        public string HomeTown { get; set; }
        [Required]
        public bool Disability { get; set; }
        [Required]
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        [Required]
        [EmailAddress]
        public string PersonalEmail { get; set; }
        [Required]
        public string StudentType { get; set; }
        [Required]
        public string EnrollmentOption { get; set; }
        [Required]
        public string ResidentialStatus { get; set; }
        [Required]
        public string ProgramId { get; set; }
        [Required]
        public string Specialization { get; set; }
        [Required]
        public string ProgramStatus { get; set; }
        [Required]
        [EmailAddress]
        public string UniversityEmail { get; set; }
        [Required]
        public string Level { get; set; }
        [Required]
        public DateTime DateOfEntry { get; set; }
        [Required]
        public string PamentOption { get; set; }
        [Required]
        [Phone]
        [MaxLength(10)]
        [MinLength(10)]
        public string Contact1 { get; set; }
        [Phone]
        [MaxLength(10)]
        [MinLength(10)]
        public string Contact2 { get; set; }
        public DateTime DateOfCompletion { get; set; }
    }
}
