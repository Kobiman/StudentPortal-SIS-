using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SP.Models.Dtos
{
    public class RemoveMountedCoursesRequest :IRequest
    {
        [Required]
        public string MountedCourseId { get; set; }
        
        [Required]
        public string ProgramId { get; set; }
    }
}
