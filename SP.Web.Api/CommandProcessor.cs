using Microsoft.AspNetCore.Builder;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Commands;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace SP.Web.Api
{
    public class CommandProcessor : ICommandProcessor
    {
        IEnumerable<Type> types;
        ConcurrentDictionary<string, Type> _commands = new();
        public CommandProcessor()
        {
            types = AppDomain
                    .CurrentDomain
                    .GetAssemblies()
                    .SelectMany(s => s.GetTypes())
                    .Where(t => t.IsInterface);
        }

        public IResult Execute(IRequest request)
        {
            if(_commands.TryGetValue(request.GetType().Name, out Type t)) 
                return (ServiceContext.GetService(t) as ICommand).Execute(request);
            var type = types
                       .FirstOrDefault(x => x.Name == $"I{request.GetType().Name.Replace("Request", "Command")}");
            _commands.TryAdd(request.GetType().Name, type);
            return (ServiceContext.GetService(type) as ICommand).Execute(request);
        }

        public Task<IResult> ExecuteAsync(IRequest request)
        {
            if (_commands.TryGetValue(request.GetType().Name, out Type t))
                return (ServiceContext.GetService(t) as ICommandAsync).Execute(request);
            var type = types
                       .FirstOrDefault(x => x.Name == $"I{request.GetType().Name.Replace("Request", "Command")}");
            _commands.TryAdd(request.GetType().Name, type);
            return (ServiceContext.GetService(type) as ICommandAsync).Execute(request);
        }
    }
}
