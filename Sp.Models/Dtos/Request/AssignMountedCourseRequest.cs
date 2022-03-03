using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models.Dtos.Request
{
  public  class AssignMountedCourseRequest: IRequest
    {
        [Required]
        public string MountedCourseId { get; set; }

        [Required]
        public string AssignedTo { get; set; }

        [Required]
        public string AcademicYear { get; set; }

        [Required]
        public string Semester { get; set; }

        [Required]
        public string EnrolmentOption { get; set; }
    }
}
