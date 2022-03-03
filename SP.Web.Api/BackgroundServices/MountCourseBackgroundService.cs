using Microsoft.Extensions.Hosting;
using SP.Services.Interfaces.Commands;
using SP.Web.Api.Channels;
using System.Threading;
using System.Threading.Tasks;

namespace SP.Web.Api.BackgroundServices
{
    public class MountCourseBackgroundService : BackgroundService
    {
        private readonly ICommandProcessor _processor;
        private readonly IMountCourseChannel _channel;
        public MountCourseBackgroundService(ICommandProcessor processor, IMountCourseChannel channel)
        {
            _processor = processor;
            _channel = channel;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await foreach(var c in _channel.ReadAllAsync())
            {
                _processor.Execute(c);
            }
        }
    }
}
