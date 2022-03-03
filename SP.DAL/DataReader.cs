using CsvHelper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;

namespace SP.DAL
{
    public static class DataReader
    {
        public static IEnumerable<T> ReadCsv<T>(string table) where T : new()
        {
            var applicationPath = Path.Combine(WebRoot.WWWRoot, $"Data/{table}.csv");
            if (!File.Exists(applicationPath))
            {
                yield return new T();
            }
            else
            {
                var fileName = Path.Combine(WebRoot.WWWRoot, $"Data/{table}.csv");
                using var reader = new StreamReader(fileName);
                using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
                foreach (var r in csv.GetRecords<T>()) { yield return r; }
            }
        }

        public static IEnumerable<T> Distinct<T>(this IEnumerable<T> arr, Func<T, dynamic> predicate1, Func<T, dynamic> predicate2)
        {
            foreach(var p in arr.GroupBy(predicate1))
            {
               yield return p.OrderByDescending(predicate2).First();
            }
        }

        public static IList<T> Include<T, U>(this IList<T> users, IEnumerable<U> issues, Expression<Func<T, IEnumerable<U>>> predicate, Func<T, U, bool> predicate2) where U : class
        {
            var expression = (MemberExpression)predicate.Body;
            Parallel.ForEach(users, (u) =>
            {
                foreach (var property in u.GetType().GetProperties())
                {
                    if (property.Name == expression.Member.Name && property.CanWrite)
                        property.SetValue(u, issues.Where(x => predicate2.Invoke(u, x)).ToList(), null);
                }
            });
            return users;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="input"></param>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public static (T Value, int Index, bool success) Find<T>(this T input, Func<T, int, bool> predicate)
        {
            (T Value, int Index, bool Success) result = (Value: default(T), Index: 0, Success: false);
            int limit = ((dynamic)input)?.Count;
            Parallel.For(0, limit, (index, state) =>
            {
                if (predicate(input, index))
                {
                    result = (Value: input, Index: index, Success: true);
                    state.Break();
                }
            });
            return result;
        }

        public static IEnumerable<T> Select<T, U>(this U data, Func<U, int, bool> predicate, Func<U, int, T> predicate2)
        {
            for (var i = 0; i < ((dynamic)data)?.Count; i++)
            {
                if (predicate.Invoke(data, i))
                   yield return predicate2(data, i);
            }
        }

        public static IEnumerable<T> SelectMany<T, U, V>(this U data, Func<U, V[]> predicate, Func<V, int, bool> predicate2, Func<V, int, T> predicate3) 
        {
            for (var i = 0; i < ((dynamic)data)?.Count; i++)
            {
                var val1 = predicate(data)[i];
                for (var j = 0; j < ((dynamic)val1)?.Count; j++)
                {
                    if (predicate2(val1, j))
                        yield return predicate3(val1, j);
                }
            }
        }

        //public static IEnumerable<T> SelectMany<T, U, V>(this U data, Func<U, V[]> predicate, Func<V, int, T> predicate2)
        //{
        //    for (var i = 0; i < ((dynamic)data)?.Count; i++)
        //    {
        //        var val1 = predicate(data)[i];
        //        for (var j = 0; j < ((dynamic)val1)?.Count; j++)
        //        {
        //            yield return predicate2(val1, j);
        //        }
        //    }
        //}

        public static IEnumerable<T> SelectMany<T, U, V>(this U data, Func<U, V[]> predicate, Func<V, int, bool> predicate2, Func<U, int, T> predicate3)
        {
            for (var i = 0; i < ((dynamic)data)?.Count; i++)
            {
                var val1 = predicate(data)[i];
                for (var j = 0; j < ((dynamic)val1)?.Count; j++)
                {
                    if (predicate2(val1, j))
                    {
                        yield return predicate3(data, i);
                        break;
                    }
                }
            }
        }

        public static IEnumerable<T> SelectMany<T, U, V>(this U data, Func<U, V[]> predicate, Func<U, int, T> predicate2)
        {
            for (var i = 0; i < ((dynamic)data)?.Count; i++)
            {
                var val1 = predicate(data)[i];
                for (var j = 0; j < ((dynamic)val1)?.Count; j++)
                {
                    yield return predicate2(data, i);
                    break;
                }
            }
        }

        public static IEnumerable<T> Select<T, U>(this U arr, Func<U, int, T> predicate)
        {
            for (int i = 0; i < ((dynamic)arr)?.Count; i++)
            {
                yield return predicate.Invoke(arr, i);
            }
        }

        private static PropertyInfo GetPropertyValue<T>(T type, string propName)
        {
            foreach (var property in type.GetType().GetProperties())
            {
                if (property.Name == propName)
                    return property;
            }
            return default;
        }

    }
}
