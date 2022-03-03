using SP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SP.DAL.Models
{

    public class ProgramDM
    {
        public ProgramDM(int length)
        {
            this.length = length;
            ProgramId = new string[length];
            Name = new string[length];
            Duration = new string[length];
            MaxCredit = new int[length];
            MinCredit = new int[length];
            DepartmentId = new string[length];
            Code = new string[length];
            CreditLimits = new CreditLimitDM[length];
            Specializations = new SpecializationDM[length];
            MountedCourses = new MountedCourseDM[length];
            State = new int[length];
        }
        public void Add(Program type)
        {
            lock (type)
            {
                if (Count == ProgramId.Length)
                {
                    var newLength = ProgramId.Length + 4;
                    var _ProgramId = new string[newLength];
                    ProgramId.CopyTo(_ProgramId, 0);
                    ProgramId = _ProgramId;
                    var _Name = new string[newLength];
                    Name.CopyTo(_Name, 0);
                    Name = _Name;
                    var _Duration = new string[newLength];
                    Duration.CopyTo(_Duration, 0);
                    Duration = _Duration;
                    var _MaxLimit = new int[newLength];
                    MaxCredit.CopyTo(_MaxLimit, 0);
                    MaxCredit = _MaxLimit;
                    var _MinLimit = new int[newLength];
                    MinCredit.CopyTo(_MinLimit, 0);
                    MinCredit = _MinLimit;
                    var _DepartmentId = new string[newLength];
                    DepartmentId.CopyTo(_DepartmentId, 0);
                    DepartmentId = _DepartmentId;
                    var _Code = new string[newLength];
                    Code.CopyTo(_Code, 0);
                    Code = _Code;
                    var _CreditLimits = new CreditLimitDM[newLength];
                    CreditLimits.CopyTo(_CreditLimits, 0);
                    CreditLimits = _CreditLimits;
                    var _Specializations = new SpecializationDM[newLength];
                    Specializations.CopyTo(_Specializations, 0);
                    Specializations = _Specializations;
                    var _mountedCourseDM = new MountedCourseDM[newLength];
                    MountedCourses.CopyTo(_mountedCourseDM,0);
                    MountedCourses = _mountedCourseDM;
                    var _State = new int[newLength];
                    State.CopyTo(_State, 0);
                    State = _State;
                }
                ProgramId[Count] = type.ProgramId;
                Name[Count] = type.Name;
                Duration[Count] = type.Duration;
                DepartmentId[Count] = type.DepartmentId;
                State[Count] = type.State;

                //CreditLimits[Count] = new CreditLimitDM(length);
                if (type.CreditLimits?.Count > 0)
                {
                    if (CreditLimits[Count] is null)
                    {
                        CreditLimits[Count] = new CreditLimitDM(5);
                    }
                    foreach (var c in type.CreditLimits)
                    {
                        c.ProgramId = ProgramId[Count];
                        CreditLimits[Count].Add(c);
                    }
                }

                //Specializations[Count] = new SpecializationDM(length);
                if (type.Specializations?.Count > 0)
                {
                    if (Specializations[Count] is null)
                    {
                        Specializations[Count] = new SpecializationDM(5);
                    }
                    foreach (var t in type.Specializations)
                    {
                        t.ProgramId = ProgramId[Count];
                        Specializations[Count].Add(t);
                    }
                }

                //MountedCourses[Count] = new MountedCourseDM(length);
                if (type.MountedCourses?.Count > 0)
                {
                    if (MountedCourses[Count] is null)
                    {
                        MountedCourses[Count] = new MountedCourseDM(100);
                    }
                    foreach (var t in type.MountedCourses)
                    {
                        t.ProgramId = ProgramId[Count];
                        MountedCourses[Count].Add(t);
                    }
                }
                Count++;
            }
        }

        public void UpdateSpecialization(IList<Specialization> specializations,int index)
        {
            foreach (var s in specializations)
            {
                var os = Specializations[index].Find((x, y) => x.SpecializationId[y] == s.SpecializationId);
                if (os.success)
                {
                    os.Value.Name[os.Index] = s.Name;
                    os.Value.Type[os.Index] = s.Type;
                    os.Value.Level[os.Index] = s.Level;
                    os.Value.State[os.Index] = os.Value.State[os.Index]+1;
                    s.State = os.Value.State[os.Index];
                    DataWriter.Add(s, nameof(Specialization));
                }
                if (os.success) continue;
                {
                    Specializations[index].Add(s);
                    DataWriter.Add(s, nameof(Specialization));
                }
            }

            var originalSpecializations = Specializations[index].Select((x, y) => x.ProgramId[y] == specializations.FirstOrDefault().ProgramId,
                (x, y) => new Specialization
                {
                    SpecializationId = x.SpecializationId[y],
                    ProgramId = x.ProgramId[y],
                    Level = x.Level[y],
                    Name = x.Name[y],
                    Type = x.Type[y],
                    State = x.State[y]
                }).ToList();
            if (originalSpecializations.Count > specializations.Count)
            {
                foreach (var o in originalSpecializations
                   .Where(o => !specializations.Any(e => e.SpecializationId == o.SpecializationId)))
                {
                    var ur = Specializations[index].Find((x, y) => x.SpecializationId[y] == o.SpecializationId);
                    if (ur.success)
                    {
                        ur.Value.State[ur.Index] = ur.Value.State[ur.Index] + 1;
                        o.State = ur.Value.State[ur.Index];
                        Specializations[index].Remove(ur.Index);
                        o.Deleted = true;
                        DataWriter.Add(o, nameof(Specialization));
                    }
                }
            }
        }

        public void UpdateCreditLimits(IList<CreditLimit> creditLimits, int index)
        {
            foreach (var c in creditLimits)
            {
                var oc = CreditLimits[index].Find((x, y) => x.CreditLimitId[y] == c.CreditLimitId);
                if (oc.success)
                {
                    oc.Value.MinCredit[oc.Index] = c.MinCredit;
                    oc.Value.MaxCredit[oc.Index] = c.MaxCredit;
                    oc.Value.Level[oc.Index] = c.Level;
                    oc.Value.State[oc.Index] = oc.Value.State[oc.Index] + 1;
                    c.State = oc.Value.State[oc.Index];
                    DataWriter.Add(c, nameof(CreditLimit));
                }               
            }
        }

        public void MountCourses(IEnumerable<MountedCourse> mountedCoures, int index)
        {
            if (MountedCourses[index] is null)
            {
                MountedCourses[index] = new MountedCourseDM(100);
            }
            foreach (var mountedCoure in mountedCoures)
            {
                MountedCourses[index].Add(mountedCoure);
            }
        }

        public void UnMountedCourse(int index, string mountedCourseId)
        {
            var mc = MountedCourses[index].Find((x, y) => x.MountedCourseId[y] == mountedCourseId);
            if (mc.success)
            {
                mc.Value.State[mc.Index] += 1;
                var _mountedCourse = mc.Value.CreateMounedCourse(mc.Index);
                MountedCourses[index].Remove(mc.Index);
                _mountedCourse.Deleted = true;
                DataWriter.Add(_mountedCourse, nameof(MountedCourse));
            }
        }

        private readonly int length;


        public int Count;

        public string[] ProgramId;
        public string[] Name;
        public string[] Code;
        public string[] Duration;
        public int[] MaxCredit;
        public int[] MinCredit;
        public string[] DepartmentId;
        public SpecializationDM[] Specializations;
        public MountedCourseDM[] MountedCourses; 
        public CreditLimitDM[] CreditLimits;
        public int[] State;

    }
}
