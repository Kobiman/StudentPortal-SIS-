using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace SP.Services
{
    public class CourseService : ICourseService
    {
        private readonly IUnitOfWork _uow;
        public CourseService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public IResult AddCourse(AddCourseRequest request)
        {
            var course = _uow.Courses.GetCourseByCode(request.Code);
            if(course != null) return new Result(false, Message.AlreadyExist(nameof(Course)));
            _uow.Courses.AddCourse(request);
            return new Result(true, "Course Added Successfully");
        }

        public IResult UpdateCourse(UpdateCourseRequest request)
        {
            ICollection<ValidationResult> results = new List<ValidationResult>();
            if (!request.Validate(out results)) return new Result(false, results.First().ErrorMessage);
            if (!_uow.Courses.UpdateCourse(request)) return new Result(false, "Could Not Update Course");
            _uow.SaveChanges();
            return new Result(true, "Course Updated Successfully");
        }

        public IResult GetCourse(string courseId)
        {
            if (string.IsNullOrWhiteSpace(courseId)) return new Result(false, "CourseId cannot be null");
            var course = _uow.Courses.GetCourse(courseId);
            if (course == null) return new Result(false, "CourseId was not found");
            return new Result<Course>(true, course, "");
        }

        public IResult GetCourseName(string name)
        {
            if (string.IsNullOrWhiteSpace(name)) return new Result(false, "Course name cannot be null");
            var course = _uow.Courses.GetCourseByName(name);
            if (course == null) return new Result(false, "Course name was not found");
            return new Result<Course>(true, course, "");
        }

        public IResult GetCourses()
        {
            return new Result<IEnumerable<Course>>(true,
                _uow.Courses.GetCourses(), "");
        }
    }
}
