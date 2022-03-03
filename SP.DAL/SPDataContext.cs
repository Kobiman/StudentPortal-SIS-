using SP.DAL.Models;
using SP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.DAL
{
    public class SPDataContext
    {
        //private Task<Students> LoadStudents()
        //{
        //    return Task.Run(() => { 
        //        var registeredCourses = DataReader
        //            .ReadCsv<RegisteredCourse>(nameof(RegisteredCourse));
                
        //        var studentResults = DataReader
        //            .ReadCsv<StudentResult>(nameof(StudentResult));
                
        //        var emergencyContact = DataReader
        //            .ReadCsv<EmergencyContact>(nameof(EmergencyContact));
                
        //        var studentsList = DataReader
        //            .ReadCsv<Student>(nameof(Student))
        //            .Distinct(x => x.StudentId, x => x.State)
        //            .ToList();
                
        //        var students = new Students(100);
        //        foreach (var student in studentsList)
        //        {
        //            student.RegisterCourses(registeredCourses.Where(x => x.StudentId == student.StudentId));
        //            student.AddResults(studentResults.Where(x => x.StudentId == student.StudentId));
        //            student.AddEmergencyContact(emergencyContact.Where(x => x.StudentId == student.StudentId));
        //            students.Add(student);
        //        }
        //        return students;
        //    });
        //}
    }
}
