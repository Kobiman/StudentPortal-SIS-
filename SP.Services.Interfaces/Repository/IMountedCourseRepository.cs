using SP.Models;
using SP.Models.Dtos;
using SP.Models.Dtos.Request;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces.Repository
{
    public interface IMountedCourseRepository//: IRepository<MountedCourse>
    {
        bool MountCourse(AddMountedCourseRequest request);
        bool AddMountedCourses(IEnumerable<MountedCourse> mountedcourses);
        bool UpdateMountedCourse(MountedCourse mountedCourse);
        MountedCourse GetMountedCourse(String mountedCoureId);
        IEnumerable<MountedCourse> GetMountedCourse();
        IEnumerable<MountedCourse> GetMountedCourseBySemester(string semester);
        IEnumerable<MountedCourse> GetMountedCourseByProgram(string program);
        bool UpdateMountedCourse(UpdateMountedCourseRequest mountedCourse);
        bool UpdateMountedCourses(IEnumerable<UpdateMountedCourseRequest> mountedCourses);
        //bool RemoveMountCourse(RemoveMountedCourseRequest request);
    }
}
