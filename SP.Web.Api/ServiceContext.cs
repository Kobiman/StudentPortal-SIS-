using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Web.Api
{
    public static class ServiceContext
    {
        static IServiceProvider _scope;
        public static object GetService(Type type)
        {
            return _scope.GetService(type);
        }

        public static IHost SetServiceContext(this IHost host)
        {
            _scope = host.Services;
            return host;
        }
    }
}
