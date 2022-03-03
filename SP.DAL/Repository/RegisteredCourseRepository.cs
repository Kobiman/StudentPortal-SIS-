using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using KMapper;
using System.Collections.Concurrent;
using System.Linq;

namespace SP.DAL.Repository
{
    public class RegisteredCourseRepository : Repository<RegisteredCourse>, IRegisteredCourseRepository
    {
        public RegisteredCourseRepository(ConcurrentBag<RegisteredCourse> collection) : base(collection)
        {
        }
      
        public bool AddRegisteredCourses(IEnumerable<RegisteredCourse> courses)
        {
            DataWriter.WriterData(courses, nameof(RegisteredCourse));
            return true;
        }
        public bool UpdateRegisteredCourse(ApproveRegisteredCoursesRequest approveRegisteredCoursesRequest)
        {
            //foreach (var c in approveRegisteredCoursesRequest.ApproveRegisteredCourses)
            //{
            //    Collection.FirstOrDefault(x => x.RegisteredCourseId == c.RegisteredCourseId).Approved = true;
            //}
            DataWriter.WriterData(approveRegisteredCoursesRequest.ApproveRegisteredCourses, nameof(RegisteredCourse));
            return true;
        }

    }
}
