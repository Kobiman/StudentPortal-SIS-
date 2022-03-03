using SP.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces.Repository
{
    public interface ILookupRepository
    {
        bool AddLookup(Lookup request);
        Lookup GetLookup(string lookupId);
        IEnumerable<Lookup> GetLookups();
        bool UpdateLookup(Lookup request);
        Lookup GetLookupByName(string name);
        bool Exist(Lookup lookup);
    }
}
