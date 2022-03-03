using SP.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.DAL.Models
{
    //public class MountedCourses
    //{
    //    public Memory<MountedCourseDM> Next { get; set; }
    //    public int Heigth { get; set; }
    //    private int _limit;
    //    private int index;
    //    public MountedCourses(int limit)
    //    {
    //        Next = new MountedCourseDM[limit];
    //        _limit = limit;
    //        index = 0;
    //        Heigth = 0;
    //    }

    //    public void Add(MountedCourse student)
    //    {
    //        lock (student)
    //        {
    //            if (Heigth > _limit - 1)
    //            {
    //                if (index == _limit) { index = 0; }
    //                Next.Span[index].Add(student);
    //                index++;
    //            }
    //            else
    //            {
    //                Next.Span[Heigth] = new MountedCourseDM(100);
    //                Next.Span[index].Add(student);
    //                Heigth++;
    //            }
    //        }
    //    }
    //}
    public class MountedCourseDM
    {
        public MountedCourseDM(int length)
        {
            MountedCourseId = new string[length];
            EnrollmentOption = new string[length];
            Level = new string[length];
            Semester = new string[length];
            AcademicYear = new string[length];
            ProgramId = new string[length];
            AssignedBy = new string[length];
            Date = new System.DateTime[length];
            CourseName = new string[length];
            CourseCode = new string[length];
            AssignedTo = new string[length];
            Specialization = new string[length];
            Category = new string[length];
            Scoring = new bool[length];
            Credit = new int[length];
            State = new int[length];
            Deleted = new bool[length];
        }

        public void Update(MountedCourse mountedCourse)
        {
            for (var i = 0; i < Count; i++)
            {
                if(MountedCourseId[i] == mountedCourse.MountedCourseId)
                {
                    AcademicYear[i] = mountedCourse.AcademicYear;
                    EnrollmentOption[i] = mountedCourse.EnrollmentOption;
                    ProgramId[i] = mountedCourse.ProgramId;
                    CourseCode[i] = mountedCourse.CourseCode;
                    CourseName[i] = mountedCourse.CourseName;
                    Credit[i] = mountedCourse.Credit;
                    Category[i] = mountedCourse.Category;
                    AssignedBy[i] = mountedCourse.AssignedBy;
                    AssignedTo[i] = mountedCourse.AssignedTo;
                    Level[i] = mountedCourse.Level;
                    Scoring[i] = mountedCourse.Scoring;
                    Semester[i] = mountedCourse.Semester;
                    State[i] ++;
                    Deleted[i] = mountedCourse.Deleted;
                    break;
                }
            }
        }

        public void Add(MountedCourse type)
        {

            lock (this)
            {
                if (Count == MountedCourseId.Length)
                {
                    var newLength = MountedCourseId.Length + 10;
                    var _MountedCoureId = new string[newLength];
                    MountedCourseId.CopyTo(_MountedCoureId, 0);
                    MountedCourseId = _MountedCoureId;
                    var _EnrollmentOption = new string[newLength];
                    EnrollmentOption.CopyTo(_EnrollmentOption, 0);
                    EnrollmentOption = _EnrollmentOption;
                    var _Level = new string[newLength];
                    Level.CopyTo(_Level, 0);
                    Level = _Level;
                    var _Semester = new string[newLength];
                    Semester.CopyTo(_Semester, 0);
                    Semester = _Semester;
                    var _AcademicYear = new string[newLength];
                    AcademicYear.CopyTo(_AcademicYear, 0);
                    AcademicYear = _AcademicYear;
                    var _ProgramId = new string[newLength];
                    ProgramId.CopyTo(_ProgramId, 0);
                    ProgramId = _ProgramId;
                    var _AssignedBy = new string[newLength];
                    AssignedBy.CopyTo(_AssignedBy, 0);
                    AssignedBy = _AssignedBy;
                    var _Date = new System.DateTime[newLength];
                    Date.CopyTo(_Date, 0);
                    Date = _Date;
                    var _CourseName = new string[newLength];
                    CourseName.CopyTo(_CourseName, 0);
                    CourseName = _CourseName;
                    var _CourseCode = new string[newLength];
                    CourseCode.CopyTo(_CourseCode, 0);
                    CourseCode = _CourseCode;
                    var _AssignedTo = new string[newLength];
                    AssignedTo.CopyTo(_AssignedTo, 0);
                    AssignedTo = _AssignedTo;
                    var _Specialization = new string[newLength];
                    Specialization.CopyTo(_Specialization, 0);
                    Specialization = _Specialization;
                    var _Category = new string[newLength];
                    Category.CopyTo(_Category, 0);
                    Category = _Category;
                    var _Scoring = new bool[newLength];
                    Scoring.CopyTo(_Scoring, 0);
                    Scoring = _Scoring;
                    var _Credit = new int[newLength];
                    Credit.CopyTo(_Credit, 0);
                    Credit = _Credit;
                    var _State = new int[newLength];
                    State.CopyTo(_State, 0);
                    State = _State;
                    var _Deleted = new bool[newLength];
                    Deleted.CopyTo(Deleted,0);
                    Deleted = _Deleted;
                }

                MountedCourseId[Count] = type.MountedCourseId;
                EnrollmentOption[Count] = type.EnrollmentOption;
                Level[Count] = type.Level;
                Semester[Count] = type.Semester;
                AcademicYear[Count] = type.AcademicYear;
                ProgramId[Count] = type.ProgramId;
                AssignedBy[Count] = type.AssignedBy;
                Date[Count] = type.Date;
                CourseName[Count] = type.CourseName;
                CourseCode[Count] = type.CourseCode;
                AssignedTo[Count] = type.AssignedTo;
                Specialization[Count] = type.Specialization;
                Category[Count] = type.Category;
                Scoring[Count] = type.Scoring;
                Credit[Count] = type.Credit;
                State[Count] = type.State;
                Deleted[Count] = type.Deleted;
                Count++;
            }
        }

        public void Remove(int position)
        {
            lock (this)
            {
                MountedCourseId.Remove(position, Count);
                EnrollmentOption.Remove(position, Count);
                Level.Remove(position, Count);
                Semester.Remove(position, Count);
                AcademicYear.Remove(position, Count);
                ProgramId.Remove(position, Count);
                AssignedBy.Remove(position, Count);
                Date.Remove(position, Count);
                CourseName.Remove(position, Count);
                CourseCode.Remove(position, Count);
                AssignedTo.Remove(position, Count);
                Specialization.Remove(position, Count);
                Category.Remove(position, Count);
                Scoring.Remove(position, Count);
                Credit.Remove(position, Count);
                State.Remove(position, Count);
                Deleted.Remove(position, Count);
                Count--;
            }            
        }

        public MountedCourse CreateMounedCourse(int b)
        {
            return new MountedCourse
            {
                Level = Level[b],
                Scoring = Scoring[b],
                AcademicYear = AcademicYear[b],
                Semester = Semester[b],
                Specialization = Specialization[b],
                AssignedBy = AssignedBy[b],
                AssignedTo = AssignedTo[b],
                Category = Category[b],
                CourseCode = CourseCode[b],
                CourseName = CourseName[b],
                Credit = Credit[b],
                Date = Date[b],
                EnrollmentOption = EnrollmentOption[b],
                MountedCourseId = MountedCourseId[b],
                ProgramId = ProgramId[b],
                State=State[b],
                Deleted = Deleted[b]
            };
        }

        //private readonly int length;


        public int Count;

        public string[] MountedCourseId;
        public string[] EnrollmentOption;
        public string[] Level;
        public string[] Semester;
        public string[] AcademicYear;
        public string[] ProgramId;
        public string[] AssignedBy;
        public System.DateTime[] Date;
        public string[] CourseName;
        public string[] CourseCode;
        public string[] AssignedTo;
        public string[] Specialization;
        public string[] Category;
        public bool[] Scoring;
        public int[] Credit;
        public int[] State;
        public bool[] Deleted;
    }
}
