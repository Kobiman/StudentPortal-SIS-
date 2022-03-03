using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SP.DAL.Repository
{
    public class Repository<T> : IRepository<T>
    {
        protected ConcurrentBag<T> Collection { get; }

        public Repository(ConcurrentBag<T> collection)
        {
            Collection = collection;
        }

        public bool Add(T entity)
        {
            Collection.Add(entity);
            return true;
        }

        public IEnumerable<T> GetAll()
        {
            return Collection.ToList();
        }

        //public T GetById(string id)
        //{
        //    throw new NotImplementedException();
        //}

        //public T GetById(int id)
        //{
        //    throw new NotImplementedException();
        //}

        //public bool Update(T entity)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
