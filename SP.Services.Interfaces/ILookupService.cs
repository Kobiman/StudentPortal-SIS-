using SP.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces
{
    public interface ILookupService
    {
        IResult AddLookup(Lookup lookup);
        IResult UpdateLookup(Lookup lookup);
        IResult GetLookup(string lookupId);
        IResult GetLookups();
    }
}
