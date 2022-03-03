using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SP.Services.Interfaces.Commands
{
    public interface ICommand
    {
        IResult Execute(IRequest request);
    }

    public interface ICommandAsync
    {
        Task<IResult> Execute(IRequest request);
    }
}
