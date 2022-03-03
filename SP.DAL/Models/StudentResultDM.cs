using SP.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.DAL.Models
{
    public class StudentResultDM
    {
        public StudentResultDM(int length)
        {
            this.length = length;
            Date = new System.DateTime[length];
            ExamResultId = new string[length];
            StudentId = new string[length];
            IndexNumber = new string[length];
            AcademicYear = new string[length];
            Semester = new string[length];
            Credit = new int[length];
            ProgramId = new string[length];
            Level = new string[length];
            RegisteredCourseId = new string[length];
            Grade = new string[length];
            GradePoint = new float[length];
            ClassMark = new float[length];
            ExamMark = new float[length];
            TotalMark = new float[length];
            Scoring = new bool[length];
            LecturerId = new string[length];
            Comment = new string[length];
            Status = new string[length];
            State = new int[length];
        }
        public void Add(StudentResult type)
        {

            lock (type)
            {
                if (Count == Date.Length)
                {
                    var newLength = Date.Length + 10;
                    var _Date = new System.DateTime[newLength];
                    Date.CopyTo(_Date, 0);
                    Date = _Date;
                    var _ExamResultId = new string[newLength];
                    ExamResultId.CopyTo(_ExamResultId, 0);
                    ExamResultId = _ExamResultId;
                    var _StudentId = new string[newLength];
                    StudentId.CopyTo(_StudentId, 0);
                    StudentId = _StudentId;
                    var _IndexNumber = new string[newLength];
                    IndexNumber.CopyTo(_IndexNumber, 0);
                    IndexNumber = _IndexNumber;
                    var _AcademicYear = new string[newLength];
                    AcademicYear.CopyTo(_AcademicYear, 0);
                    AcademicYear = _AcademicYear;
                    var _Semester = new string[newLength];
                    Semester.CopyTo(_Semester, 0);
                    Semester = _Semester;
                    var _Credit = new int[newLength];
                    Credit.CopyTo(_Credit, 0);
                    Credit = _Credit;
                    var _ProgramId = new string[newLength];
                    ProgramId.CopyTo(_ProgramId, 0);
                    ProgramId = _ProgramId;
                    var _Level = new string[newLength];
                    Level.CopyTo(_Level, 0);
                    Level = _Level;
                    var _RegisteredCourseId = new string[newLength];
                    RegisteredCourseId.CopyTo(_RegisteredCourseId, 0);
                    RegisteredCourseId = _RegisteredCourseId;
                    var _Grade = new string[newLength];
                    Grade.CopyTo(_Grade, 0);
                    Grade = _Grade;
                    var _GradePoint = new float[newLength];
                    GradePoint.CopyTo(_GradePoint, 0);
                    GradePoint = _GradePoint;
                    var _ClassMark = new float[newLength];
                    ClassMark.CopyTo(_ClassMark, 0);
                    ClassMark = _ClassMark;
                    var _ExamMark = new float[newLength];
                    ExamMark.CopyTo(_ExamMark, 0);
                    ExamMark = _ExamMark;
                    var _TotalMark = new float[newLength];
                    TotalMark.CopyTo(_TotalMark, 0);
                    TotalMark = _TotalMark;
                    var _Scoring = new bool[newLength];
                    Scoring.CopyTo(_Scoring, 0);
                    Scoring = _Scoring;
                    var _LecturerId = new string[newLength];
                    LecturerId.CopyTo(_LecturerId, 0);
                    LecturerId = _LecturerId;
                    var _Comment = new string[newLength];
                    Comment.CopyTo(_Comment, 0);
                    Comment = _Comment;
                    var _Status = new string[newLength];
                    Status.CopyTo(_Status,0);
                    Status = _Status;
                    var _state = new int[newLength];
                    State.CopyTo(_state, 0);
                    State = _state;
                }
                Date[Count] = type.Date;
                ExamResultId[Count] = type.ExamResultId;
                StudentId[Count] = type.StudentId;
                IndexNumber[Count] = type.IndexNumber;
                AcademicYear[Count] = type.AcademicYear;
                Semester[Count] = type.Semester;
                Credit[Count] = type.Credit;
                ProgramId[Count] = type.ProgramId;
                Level[Count] = type.Level;
                RegisteredCourseId[Count] = type.MountedCourseId;
                Grade[Count] = type.Grade;
                GradePoint[Count] = type.GradePoint;
                ClassMark[Count] = type.ClassMark;
                ExamMark[Count] = type.ExamMark;
                TotalMark[Count] = type.TotalMark;
                Scoring[Count] = type.Scoring;
                LecturerId[Count] = type.LecturerId;
                Comment[Count] = type.Comment;
                Status[Count] = type.Status;
                State[Count] = type.State;
                Count++;
            }
        }

        public StudentResult CreateStudentResult(int b)
        {
            return new StudentResult
            {
                Semester = Semester[b],
                StudentId = StudentId[b],
                IndexNumber = IndexNumber[b],
                AcademicYear = AcademicYear[b],
                Date = Date[b],
                ClassMark = ClassMark[b],
                Credit = Credit[b],
                MountedCourseId = RegisteredCourseId[b],
                ExamMark = ExamMark[b],
                ExamResultId = ExamResultId[b],
                Grade = Grade[b],
                GradePoint = GradePoint[b],
                Scoring = Scoring[b],
                LecturerId = LecturerId[b],
                Level = Level[b],
                ProgramId = ProgramId[b],
                TotalMark = TotalMark[b],
                Comment = Comment[b],
                Status = Status[b],
                State = State[b]
            };
        }

        private readonly int length;


        public int Count;

        public System.DateTime[] Date;
        public string[] ExamResultId;
        public string[] StudentId;
        public string[] IndexNumber;
        public string[] AcademicYear;
        public string[] Semester;
        public int[] Credit;
        public string[] ProgramId;
        public string[] Level;
        public string[] RegisteredCourseId;
        public string[] Grade;
        public float[] GradePoint;
        public float[] ClassMark;
        public float[] ExamMark;
        public float[] TotalMark;
        public bool[] Scoring;
        public string[] LecturerId;
        public string[] Comment;
        public string[] Status;
        public int[] State;
    }
}
