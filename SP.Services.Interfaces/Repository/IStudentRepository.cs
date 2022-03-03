using Sp.Models.Dtos;
using Sp.Models.Dtos.Request;
using Sp.Models.Dtos.Response;
using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces.Repository
{
    public interface IStudentRepository //: IRepository<Student>
    {
        bool AddStudent(AddStudentRequest student);
        bool AddStudents(IEnumerable<Student> students);
        bool IndexNumberExist(string indexNumber);
        bool ReferenceNumberExist(string referenceNumber);
        Student GetStudent(string indexNumber);
        IEnumerable<Student> GetStudents();
        IEnumerable<StudentEnteryLevelResponse> GetStudentsEnteryLevel();
        IEnumerable<Student> GetStudentsByLevel(string level);
        bool UpdateStudent(UpdateStudentRequest student);
        bool ApproveRegistration(IEnumerable<ApproveRegisteredCourseDto> approveRegisteredCourses);
        IEnumerable<GetMountedCoursesForRegistrationReponse> GetStudentsByProgram(string programId, string academicYear, string level);
        IEnumerable<GetRegisteredStudentsReponse> GetRegisteredStudents(string mountedCourseId, string semester, string academicYear, string programId);
        IEnumerable<Student> GetRegisteredCourses(string academicYear, string semester, string programId);
        bool UpdateStudents(IEnumerable<UpdateStudentRequest> students);
        IEnumerable<Student> GetStudentsByProgram(string program);
        IEnumerable<Student> GetStudentResults(string academicYear, string programId, string level);
        IEnumerable<Student> GetStudentsByProgram(string program, string level);
        bool AddResults(List<StudentResult> studentResults);
        bool RegisterCourses(IList<RegisteredCourse> courses);
        bool UpdateRegisteredCourses(IList<RegisteredCourse> courses);
        IEnumerable<StudentResult> GetStudentResults(string programId);
        IEnumerable<TrailCourseDto> GetTrailCourses(string studentId, string level, Dictionary<string, MountedCourse> mountedCourses);
        bool UpdateResults(List<ApproveResultsDto> enumerable);
    }
}
