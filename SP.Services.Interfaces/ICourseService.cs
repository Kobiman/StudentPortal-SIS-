using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces
{
    public interface ICourseService
    {
        IResult AddCourse(AddCourseRequest request);
        IResult GetCourse(string courseId);
        IResult GetCourses();
        IResult UpdateCourse(UpdateCourseRequest request);
        IResult GetCourseName(string name);
    }
}
