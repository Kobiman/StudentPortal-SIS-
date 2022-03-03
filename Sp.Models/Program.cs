using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SP.Models
{
    public class Program
    {
        public Program()
        {
            ProgramId = ProgramId ?? Guid.NewGuid().ToString();
        }
        public string ProgramId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Duration { get; set; }
        public string DepartmentId { get; set; }
        public IList<MountedCourse> MountedCourses { get; set; } = new List<MountedCourse>();
        public IList<Specialization> Specializations { get; set; } = new List<Specialization>();
        public IList<CreditLimit> CreditLimits { get; set; } = new List<CreditLimit>();
        public int State { get; set; }

        public Dictionary<string, MountedCourse> GetMountedCourses()
        {
            return MountedCourses.ToDictionary(x => x.MountedCourseId, x => x);
        }

        public IEnumerable<GetMountedCoursesResponse> GetAllMountedCourses()
        {
            return MountedCourses
                   .Select(x => new GetMountedCoursesResponse
                   {
                       AcademicYear = x.AcademicYear,
                       AssignedBy = x.AssignedBy,
                       EnrollmentOption = x.EnrollmentOption,
                       Level = x.Level,
                       ProgramOfStudy = Name,
                       Semester = x.Semester,
                       CourseName = x.CourseName,
                       CourseCode = x.CourseCode,
                       Category = x.Category,
                       Credit = x.Credit,
                       AssignedTo = x.AssignedTo,
                       Scoring = x.Scoring,
                       MountedCourseId = x.MountedCourseId,
                       Specialization = x.Specialization
                       //Scoring = x.Scoring, //oka commented this
                       //MountedCoureId = x.MountedCoureId //oka commented this
                       //MountedCourses = x.MountedCourses
                   });
        }

        public IEnumerable<GetMountedCoursesResponse> GetMountedCourses(string academicYear, string semester, string level, string erollmentOption)
        {
            return MountedCourses.Where(x => x.AcademicYear == academicYear && x.Semester == semester.ToUpper() && x.Level == level && x.EnrollmentOption == erollmentOption)
                                       .Select(x => new GetMountedCoursesResponse
                                       {
                                           AcademicYear = x.AcademicYear,
                                           AssignedBy = x.AssignedBy,
                                           EnrollmentOption = x.EnrollmentOption,
                                           Level = x.Level,
                                           ProgramOfStudy = Name,
                                           Semester = x.Semester,
                                           CourseName = x.CourseName,
                                           CourseCode = x.CourseCode,
                                           Category = x.Category,
                                           Credit = x.Credit,
                                           AssignedTo = x.AssignedTo,
                                           Scoring = x.Scoring,
                                           MountedCourseId = x.MountedCourseId,
                                           Specialization = x.Specialization,
                                           //MountedCourses = x.MountedCourses
                                       }).ToList();
        }

        public void AddSpecializations(IEnumerable<Specialization> specializations)
        {
            foreach (var specialization in specializations)
            {
                Specializations.Add(specialization);
            };
        }

        public void MountCourses(IEnumerable<MountedCourse> mountedCoures)
        {
            foreach (var mountedCoure in mountedCoures)
            {
                MountedCourses.Add(mountedCoure);
            }
        }

        public void AddCreditLimits(IEnumerable<CreditLimit> creditLimits)
        {
            foreach (var creditLimit in creditLimits)
            {
                CreditLimits.Add(creditLimit);
            }
        }

        public MountedCourse GetMountedCourse(string mountedCourseId)
        {
            return MountedCourses.FirstOrDefault(x => x.MountedCourseId == mountedCourseId);
        }


        /// <summary>
        /// Edit a program
        /// </summary>
        /// <returns></returns>
        public Program Edit(Program program)
        {
            DepartmentId = program.DepartmentId;
            Name = program.Name;
            return this;
        }
    }
}