using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces.Repository
{
    public interface IRepository<T>
    {
         bool Add(T entity);
        //public bool Update(T entity);
        //public bool Update(T entity);
        IEnumerable<T> GetAll();
        //public T GetById(string id);
        //public T GetById(int id);
    }
}
