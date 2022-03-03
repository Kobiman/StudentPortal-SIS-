using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models.Dtos
{
    public record TrailCourseDto(string MountedCourseId, 
                                 string Grade, 
                                 DateTime Date, 
                                 string CourseCode, 
                                 string CourseName,
                                 int? Credit,
                                 string Category);
}
