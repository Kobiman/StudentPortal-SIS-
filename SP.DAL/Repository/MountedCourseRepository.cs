using KMapper;
using SP.DAL.Models;
using SP.Models;
using SP.Models.Dtos;
using SP.Models.Dtos.Request;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;

namespace SP.DAL.Repository
{
    public class MountedCourseRepository : IMountedCourseRepository
    {
        public MountedCourseRepository()
        {
        }
        public bool MountCourse (AddMountedCourseRequest request)
        {
            DataWriter.WriterData(request, nameof(MountedCourse));
            return true;
        }


        public bool AddMountedCourses(IEnumerable<MountedCourse> mountedcourses)
        {
            DataWriter.WriterData(mountedcourses, nameof(MountedCourse));
            return true;
        }

        public bool RemoveMountedCourse(RemoveMountedCoursesRequest request)
        {
            DataWriter.WriterData(request, nameof(MountedCourse));
            return true;
        }

        public bool UpdateMountedCourse(MountedCourse mountedCourse)
        {
            DataWriter.WriterData(mountedCourse, nameof(MountedCourse));
            return true;
        }

        public MountedCourse GetMountedCourse(string mountedCoureId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<MountedCourse> GetMountedCourse()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<MountedCourse> GetMountedCourseBySemester(string semester)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<MountedCourse> GetMountedCourseByProgram(string program)
        {
            throw new NotImplementedException();
        }

        public bool UpdateMountedCourse(UpdateMountedCourseRequest mountedCourse)
        {
            throw new NotImplementedException();
        }

        public bool UpdateMountedCourses(IEnumerable<UpdateMountedCourseRequest> mountedCourses)
        {
            throw new NotImplementedException();
        }
    }
}
