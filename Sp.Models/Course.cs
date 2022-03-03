using KMapper;
using System;

namespace SP.Models
{
    public class Course
    {
        public Course()
        {

           CourseId = CourseId ?? Guid.NewGuid().ToString();
        }
        public string CourseId { get; set; }
        public string Code { get; set; }
        public string CourseName { get; set; }
        [MatchCustomProperty("Cred")]
        public int Credit { get; set; }
        public string DepartmentId { get; set; }
        public int State { get; set; }

        /// <summary>
        /// Edit a course 
        /// </summary>
        /// <returns></returns>
        public Course Edit(Course course)
        {
            CourseName = course.CourseName;
            Code = course.Code;
            Credit = course.Credit;
            return this;
        }

    }
}