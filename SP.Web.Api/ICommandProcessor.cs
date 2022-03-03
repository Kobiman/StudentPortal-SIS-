using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SP.Web.Api
{
    public interface ICommandProcessor
    {
        IResult Execute(IRequest request);
        Task<IResult> ExecuteAsync(IRequest request);
    }
}
