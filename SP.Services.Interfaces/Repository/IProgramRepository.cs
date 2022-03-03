using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces.Repository
{
    public interface IProgramRepository //: IRepository<Program>
    {
        bool AddProgram(AddProgramRequest request);
        Program GetProgram(string programId);
        IEnumerable<Program> GetPrograms();
        bool UpdateProgram(UpdateProgramRequest request);
        Program GetprogramByName(string program);
        IEnumerable<MountedCourse> GetAllMountedCourses(string academicYear, string enrollmentOption, string semester, string lecturerId);
        IEnumerable<MountedCourse> GetAllMountedCourses(string academicYear, string enrollmentOption, string semester);
        IEnumerable<MountedCourse> GetAllMountedCourses(string academicYear, string semester);
        bool MountCourses(IList<MountedCourse> courses);
        MountedCourse GetMountedCourse(string programId, string mountedCourseId);
        bool UpdateMountedCourse(MountedCourse mountedCourses);
        bool DeleteMountedCourse(string programId, string mountedCourseId);
    }
}
