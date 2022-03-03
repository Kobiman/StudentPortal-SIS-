using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces
{
    public interface IDataReader
    {
        IList<T> ReadData<T>(string table);
    }
}
