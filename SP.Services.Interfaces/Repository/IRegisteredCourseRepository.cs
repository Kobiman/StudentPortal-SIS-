using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces.Repository
{
    public interface IRegisteredCourseRepository : IRepository<RegisteredCourse>
    {
        bool AddRegisteredCourses(IEnumerable<RegisteredCourse> courses);
        bool UpdateRegisteredCourse(ApproveRegisteredCoursesRequest approveRegisteredCoursesRequest);
    }
}
