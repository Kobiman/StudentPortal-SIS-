using SP.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Models.Dtos
{
    public record GetMountedCoursesRequest(IList<Query> Queries) : IRequest{ }
}
