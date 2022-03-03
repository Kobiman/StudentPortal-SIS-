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
    public class ProgramRepository : IProgramRepository
    {
        private ProgramDM Collection;
        public ProgramRepository(ProgramDM collection)
        {
            Collection = collection;
        }

        public bool AddProgram(AddProgramRequest request)
        {
            var program = request.Map<Program, AddProgramRequest>();
            Collection.Add(program);
            var _program = program.Map<_Program, Program>();
            
            DataWriter.Add(_program, nameof(Program));
            foreach (var s in program.Specializations)
            {
                s.ProgramId = program.ProgramId;
                DataWriter.Add(s, nameof(Specialization));
            }
            foreach (var c in program.CreditLimits)
            {
                c.ProgramId = program.ProgramId;
                DataWriter.Add(c, nameof(CreditLimit));
            }
            return true;
        }

        public bool MountCourses(IList<MountedCourse> courses)
        {
            var program = Collection.Find((x, y) => x.ProgramId[y] == courses.FirstOrDefault()?.ProgramId);
            if (!program.success) return false;
            program.Value.MountCourses(courses, program.Index);
            return true;
        }

        public bool UpdateMountedCourse(MountedCourse mountedCourse)
        {
            var program = Collection.Find((x, y) => x.ProgramId[y] == mountedCourse.ProgramId);
            if (!program.success) return false;
            program.Value.MountedCourses[program.Index].Update(mountedCourse);            
            DataWriter.Add(mountedCourse, nameof(MountedCourse));
            return true;
        }

        public Program GetProgram(string programId)
        {
            var program = Collection.Find((x, y) => x.ProgramId[y] == programId);
            return CreateProgram(program);
        }

        public Program GetprogramByName(string programName)
        {
            var program = Collection.Find((x, y) => x.Name[y] == programName);
            return CreateProgram(program);
        }

        public IEnumerable<Program> GetPrograms()  => Collection.Select((x, y) => CreateProgram(x, y));

        public bool UpdateProgram(UpdateProgramRequest request)
        {
            var result = Collection.Find((x, y) => x.ProgramId[y] == request.ProgramId);
            if (!result.success) return false;
            result.Value.Name[result.Index] = request.Name;
            result.Value.Duration[result.Index] = request.Duration;
            result.Value.State[result.Index]++;
            result.Value.UpdateSpecialization(request.Specializations, result.Index);
            result.Value.UpdateCreditLimits(request.CreditLimits, result.Index);

            var originalProgram = new Program
            {
                DepartmentId = result.Value.DepartmentId[result.Index],
                ProgramId = result.Value.ProgramId[result.Index],
                Duration = result.Value.Duration[result.Index],
                State = result.Value.State[result.Index],
                Name = result.Value.Name[result.Index]
                
            };
            DataWriter.Add(originalProgram, nameof(Program));
            return true;
        }

        public IEnumerable<MountedCourse> GetAllMountedCourses(string academicYear, string enrollmentOption, string semester, string lecturerId) =>
             Collection.SelectMany(a=> a.MountedCourses,
                                  (a,b)=> a.EnrollmentOption[b] == enrollmentOption
                                     &&   a.AcademicYear[b] == academicYear
                                     &&   a.Semester[b] == semester
                                     &&   a.AssignedTo[b] == lecturerId,
                                  (a,b)=> a.CreateMounedCourse(b));

        public IEnumerable<MountedCourse> GetAllMountedCourses(string academicYear, string enrollmentOption, string semester) =>
             Collection.SelectMany(a => a.MountedCourses,
                                  (a, b) => a.EnrollmentOption[b] == enrollmentOption
                                     && a.AcademicYear[b] == academicYear
                                     && a.Semester[b] == semester,
                                  (a, b) => a.CreateMounedCourse(b));

        public MountedCourse GetMountedCourse(string programId, string mountedCourseId)
        {
            if(programId is null || mountedCourseId is null) return default;
            var result = Collection.Find((x,y) => x.ProgramId[y] == programId);
            if (result.success)
                return result.Value.MountedCourses[result.Index].CreateMounedCourse(result.Index);
            return default;
        }

        public bool DeleteMountedCourse(string programId, string mountedCourseId)
        {
            var program = Collection.Find((x,y)=> x.ProgramId[y] == programId);
            if(!program.success)return false;
            program.Value.UnMountedCourse(program.Index, mountedCourseId);
            return true;
        }

        public IEnumerable<MountedCourse> GetAllMountedCourses(string academicYear, string semester) =>
            Collection.SelectMany(a => a.MountedCourses,
                                 (a, b) =>  a.AcademicYear[b] == academicYear && a.Semester[b] == semester,
                                 (a, b) => a.CreateMounedCourse(b));
        private Program CreateProgram((ProgramDM Value, int Index, bool Success) result)
        {
            if (!result.Success) return null;
            return CreateProgram(result.Value, result.Index);
        }

        private static Program CreateProgram(ProgramDM Value, int Index)
        {
            return new Program
            {
                DepartmentId = Value.DepartmentId[Index],
                ProgramId = Value.ProgramId[Index],
                Duration = Value.Duration[Index],
                Name = Value.Name[Index],
                Specializations = Value.Specializations[Index].Select((a, b) =>
                {
                    return new Specialization
                    {
                        Level = a.Level[b],
                        Name = a.Name[b],
                        SpecializationId = a.SpecializationId[b],
                        Type = a.Type[b],
                        ProgramId = a.ProgramId[b]
                    };
                }).OrderBy(x => x.Level).ToList(),
                CreditLimits = Value.CreditLimits[Index].Select((a, b) =>
                {
                    return new CreditLimit
                    {
                        CreditLimitId = a.CreditLimitId[b],
                        ProgramId = a.ProgramId[b],
                        MaxCredit = a.MaxCredit[b],
                        MinCredit = a.MinCredit[b],
                        Level = a.Level[b],
                        Deleted = a.Deleted[b],
                        State = a.State[b]
                    };
                }).ToList(),
                MountedCourses = Value.MountedCourses[Index].Select((a, b) =>
                {
                    return a.CreateMounedCourse(b);
                }).ToList()
            };
        }
    }
}
