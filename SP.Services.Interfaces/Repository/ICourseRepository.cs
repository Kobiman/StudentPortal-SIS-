using Sp.Models;
using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces.Repository
{
    public interface ICourseRepository //: IRepository<Course>
    {
        bool AddCourse(AddCourseRequest request);
        Course GetCourse(string courseId);
        IEnumerable<Course> GetCourses();
        bool UpdateCourse(UpdateCourseRequest request);
        Course GetCourseByName(string name);
        Course GetCourseByCode(string courseCode);
    }
}
