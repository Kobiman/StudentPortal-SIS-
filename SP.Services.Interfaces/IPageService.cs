using Sp.Models;
using SP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.Services.Interfaces
{
    public interface IPageService
    {
        IResult AddPage(Page page);
        IResult AddPages(IList<Page> page);
        IResult GetPageById(string pageId);
        IResult DeletePage(string pageId);
        IResult GetPages();
    }
}
