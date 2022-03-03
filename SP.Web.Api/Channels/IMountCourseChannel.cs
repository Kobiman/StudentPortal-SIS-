using SP.Models;
using SP.Models.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SP.Web.Api.Channels
{
    public interface IMountCourseChannel
    {
        IAsyncEnumerable<IRequest> ReadAllAsync();
        Task<IResult> WriteAsync(IRequest request);
    }
}