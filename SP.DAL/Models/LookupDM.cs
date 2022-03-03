using SP.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.DAL.Models
{
    //public class Lookups
    //{
    //    public Memory<LookupDM> Next { get; set; }
    //    public int Heigth { get; set; }
    //    private int _limit;
    //    private int index;
    //    public Lookups(int limit)
    //    {
    //        Next = new LookupDM[limit];
    //        _limit = limit;
    //        index = 0;
    //        Heigth = 0;
    //    }

    //    public void Add(Lookup lookupDM)
    //    {
    //        lock (lookupDM)
    //        {
    //            if (Heigth > _limit - 1)
    //            {
    //                if (index == _limit) { index = 0; }
    //                Next.Span[index].Add(lookupDM);
    //                index++;
    //            }
    //            else
    //            {
    //                Next.Span[Heigth] = new LookupDM(5);
    //                Next.Span[index].Add(lookupDM);
    //                Heigth++;
    //            }
    //        }
    //    }
    //}
    public class LookupDM
    {
        public LookupDM(int length)
        {
            LookupId = new string[length];
            Name = new string[length];
            Type = new string[length];
            InstitutionId = new string[length];
            State = new int[length];
        }
        public void Add(Lookup type)
        {
            lock (type)
            {
                if (Count == LookupId.Length)
                {
                    var newLength = LookupId.Length + 5;
                    var _LookupId = new string[newLength];
                    LookupId.CopyTo(_LookupId,0);
                    LookupId = _LookupId;
                    var _Name = new string[newLength];
                    Name.CopyTo(_Name, 0);
                    Name = _Name;
                    var _Type = new string[newLength];
                    Type.CopyTo(_Type, 0);
                    Type = _Type;
                    var _InstitutionId = new string[newLength];
                    InstitutionId.CopyTo(_InstitutionId, 0);
                    InstitutionId = _InstitutionId;
                    var _State = new int[newLength];
                    State.CopyTo(_State, 0);
                    State = _State;

                }
                LookupId[Count] = type.LookupId;
                Name[Count] = type.Name;
                Type[Count] = type.Type;
                InstitutionId[Count] = type.InstitutionId;
                State[Count]++;
                Count++;
            }
        }


        public int Count;
        public string[] LookupId;
        public string[] Name;
        public string[] Type;
        public string[] InstitutionId;
        public int[] State;
    }
}
