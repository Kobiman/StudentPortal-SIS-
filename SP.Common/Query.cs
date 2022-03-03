using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Common
{
    public record Query(string PropertyName, string Parameter);

    public record DateRange(DateTime From, DateTime To);
}
