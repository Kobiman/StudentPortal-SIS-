using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace SP.Web.Api.Channels
{
    public class MountCourseChannel : IMountCourseChannel
    {
        private readonly Channel<IRequest> Requests = Channel.CreateUnbounded<IRequest>();

        public async Task<IResult> WriteAsync(IRequest request)
        {
            await Requests.Writer.WriteAsync(request);
            return new Result(true, Message.OperationCompletedSuccesfully);
        }

        public IAsyncEnumerable<IRequest> ReadAllAsync()
        {
            return Requests.Reader.ReadAllAsync();
        }
    }
}
