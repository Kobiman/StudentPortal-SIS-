using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.DAL.Models
{
    public class RegisteredCourseDM
    {
        public RegisteredCourseDM(int length)
        {
            this.length = length;
            RegisteredCourseId = new string[length];
            RegistrationDate = new System.DateTime[length];
            StudentId = new string[length];
            ProgramId = new string[length];
            Semester = new string[length];
            MountedCourseId = new string[length];
            AcademicYear = new string[length];
            Approved = new bool[length];
            Deleted = new bool[length];
            State = new int[length];
        }

        public void Approve(string registeredCourseId, bool approved)
        {
            for(var i = 0; i < Count; i++)
            {
                if(RegisteredCourseId[i] == registeredCourseId)
                {
                    Approved[i] = approved;
                    State[i]++;
                    var registration = new RegisteredCourse
                    {
                        AcademicYear = AcademicYear[i],
                        Approved = Approved[i],
                        MountedCourseId = MountedCourseId[i],
                        ProgramId = ProgramId[i],
                        Semester = Semester[i],
                        RegisteredCourseId = RegisteredCourseId[i],
                        RegistrationDate = RegistrationDate[i],
                        State = State[i],
                        StudentId = StudentId[i],
                    };
                    DataWriter.Add(registration, nameof(RegisteredCourse));
                    break;
                }
            }
        }

        public void Add(RegisteredCourse type)
        {
            lock (type)
            {
                if (Count == RegisteredCourseId.Length)
                {
                    var newLength = RegisteredCourseId.Length + 10;
                    var _RegisteredCourseId = new string[newLength];
                    RegisteredCourseId.CopyTo(_RegisteredCourseId,0);
                    RegisteredCourseId = _RegisteredCourseId;
                    var _RegistrationDate = new System.DateTime[newLength];
                    RegistrationDate.CopyTo(_RegistrationDate, 0);
                    RegistrationDate = _RegistrationDate;
                    var _StudentId = new string[newLength];
                    StudentId.CopyTo(_StudentId, 0);
                    StudentId = _StudentId;
                    var _ProgramId = new string[newLength];
                    ProgramId.CopyTo(_StudentId, 0);
                    ProgramId = _ProgramId;
                    var _Semester = new string[newLength];
                    Semester.CopyTo(_Semester, 0);
                    Semester = _Semester;
                    var _MountedCourseId = new string[newLength];
                    MountedCourseId.CopyTo(_MountedCourseId, 0);
                    MountedCourseId = _MountedCourseId;
                    var _AcademicYear = new string[newLength];
                    AcademicYear.CopyTo(_AcademicYear, 0);
                    AcademicYear = _AcademicYear;
                    var _Approved = new bool[newLength];
                    Approved.CopyTo(_Approved, 0);
                    Approved = _Approved;
                    var _Deleted = new bool[newLength];
                    Deleted.CopyTo(_Approved, 0);
                    Deleted = _Approved;
                    var _State = new int[newLength];
                    State.CopyTo(_State, 0);
                    State = _State;

                }
                RegisteredCourseId[Count] = type.RegisteredCourseId;
                RegistrationDate[Count] = type.RegistrationDate;
                StudentId[Count] = type.StudentId;
                ProgramId[Count] = type.ProgramId;
                Semester[Count] = type.Semester;
                MountedCourseId[Count] = type.MountedCourseId;
                AcademicYear[Count] = type.AcademicYear;
                Approved[Count] = type.Approved;
                State[Count]++;
                Count++;
            }
        }

        public void Update(RegisteredCourse r)
        {
            RegisteredCourseId[Count] = r.RegisteredCourseId;
            RegistrationDate[Count] = r.RegistrationDate;
            StudentId[Count] = r.StudentId;
            ProgramId[Count] = r.ProgramId;
            Semester[Count] = r.Semester;
            MountedCourseId[Count] = r.MountedCourseId;
            AcademicYear[Count] = r.AcademicYear;
            Approved[Count] = r.Approved;
            State[Count]++;

            r.State = State[Count];
        }

        public void Remove(int position)
        {
            RegisteredCourseId.Remove(position, Count);
            RegistrationDate.Remove(position, Count);
            StudentId.Remove(position, Count);
            ProgramId.Remove(position, Count);
            Semester.Remove(position, Count);
            MountedCourseId.Remove(position, Count);
            AcademicYear.Remove(position, Count);
            Approved.Remove(position, Count);
            State.Remove(position, Count);
            Deleted.Remove(position, Count);
            Count--;
        }

        public RegisteredCourse CreateRegisteredCourse(int b)
        {
            return new RegisteredCourse
            {
                Semester = Semester[b],
                StudentId = StudentId[b],
                AcademicYear = AcademicYear[b],
                Approved = Approved[b],
                MountedCourseId = MountedCourseId[b],
                RegisteredCourseId = RegisteredCourseId[b],
                RegistrationDate = RegistrationDate[b],
                State = State[b]
            };
        }

        public GetRegisteredCoursesResponse CreateGetRegisteredCoursesResponse(int b)
        {
            return new GetRegisteredCoursesResponse
            {
                Semester = Semester[b],
                StudentId = StudentId[b],
                AcademicYear = AcademicYear[b],
                Approved = Approved[b],
                MountedCourseId = MountedCourseId[b],
                RegisteredCourseId = RegisteredCourseId[b],
                RegistrationDate = RegistrationDate[b]
            };
        }

        private readonly int length;


        public int Count;

        public string[] RegisteredCourseId;
        public System.DateTime[] RegistrationDate;
        public string[] StudentId;
        public string[] ProgramId;
        public string[] Semester;
        public string[] MountedCourseId;
        public string[] AcademicYear;
        public bool[] Approved; 
        public int[] State;
        public bool[] Deleted;
    }
}
