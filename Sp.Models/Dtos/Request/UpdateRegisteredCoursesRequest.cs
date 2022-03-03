using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models.Dtos.Request
{
    public class UpdateRegisteredCoursesRequest : IRequest
    {
        public UpdateRegisteredCoursesRequest(IEnumerable<RegisteredCourseDto> registeredCourses)
        {
            RegisteredCourses = registeredCourses;
        }
        public IEnumerable<RegisteredCourseDto> RegisteredCourses { get; }

    }
}
