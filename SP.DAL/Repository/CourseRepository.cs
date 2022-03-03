using KMapper;
using SP.DAL.Models;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SP.DAL.Repository
{
    public class CourseRepository : ICourseRepository
    {
        private CourseDM Collection;
        public CourseRepository(CourseDM collection)
        {
            Collection = collection;
        }
        public bool AddCourse(AddCourseRequest request)
        {
            var course = request.Map<Course, AddCourseRequest>();
            Collection.Add(course);
            DataWriter.Add(course, nameof(Course));
            return true;
        }
        public Course GetCourse(string courseId)
        {
            var result = Collection.Find((x, y) => x.CourseId[y] == courseId);
            return CreateCourse(result);
        }

        public Course GetCourseByName(string course)
        {
            var result = Collection.Find((x, y) => x.CourseName[y] == course);
            return CreateCourse(result);
        }

        public Course GetCourseByCode(string courseCode)
        {
            var result = Collection.Find((x, y) => x.Code[y] == courseCode);
            return CreateCourse(result);
        }

        public IEnumerable<Course> GetCourses()
        {
            return Collection.Select((x, y) => CreateCourse(x, y));
        }
        public bool UpdateCourse(UpdateCourseRequest request)
        {
            var result = Collection.Find((x, y) => x.CourseId[y] == request.CourseId);
            if (!result.success) return false;
            result.Value.Code[result.Index] = request.Code;
            result.Value.Credit[result.Index] = request.Cred;
            result.Value.CourseName[result.Index] = request.Name;
            result.Value.DepartmentId[result.Index] = request.DepartmentId;
            result.Value.State[result.Index] += 1;
            var originalCourse = CreateCourse(result);
            request.Map(originalCourse);

            DataWriter.Add(originalCourse, nameof(Course));
            return true;
        }

        private Course CreateCourse(CourseDM Value, int Index)
        {
            return new Course
            {
                Code = Value.Code[Index],
                CourseId = Value.CourseId[Index],
                DepartmentId = Value.DepartmentId[Index],
                CourseName = Value.CourseName[Index],
                Credit = Value.Credit[Index],
                State = Value.State[Index],
            };
        }
        private Course CreateCourse((CourseDM Value, int Index, bool Success) result)
        {
            if (!result.Success) return null;
            return new Course { 
                Code = result.Value.Code[result.Index],
                CourseId = result.Value.CourseId[result.Index],
                DepartmentId = result.Value.DepartmentId[result.Index],
                CourseName = result.Value.CourseName[result.Index],
                Credit = result.Value.Credit[result.Index],
                State = result.Value.State[result.Index],
            };
        }
    }
}
