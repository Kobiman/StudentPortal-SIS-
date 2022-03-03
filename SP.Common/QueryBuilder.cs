using SP.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Common
{
    public static class QueryBuilder
    {
        public static bool ExecuteQuery<T>(this T source, IList<Query> querys)
        {
            var result = true;
            for (var query = 0; query < querys.Count; query++)
            {
                result = result && source.IsEqualTo(querys[query]?.PropertyName, querys[query]?.Parameter);
            }
            return result;
        }

        private static bool IsEqualTo<T>(this T source, string propertyName, string parameter)
        {
            var property = source.GetType().GetProperty(propertyName).GetValue(source, null);
            if (property == null) return false;

            //if (property.GetType().FullName.Split(".")[1] == nameof(DateTime))
            //{
            //    DateTime prop = (DateTime)property;
            //    DateTime param = Convert.ToDateTime(parameter);

            //    return prop.ToString("D") == param.ToString("D");
            //}
            return (string)property == parameter;
        }
    }
}
