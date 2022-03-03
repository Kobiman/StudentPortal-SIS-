using Sp.Models;
using System.Collections.Generic;

namespace SP.Services.Interfaces.Repository
{
    public interface IPagesRepository
    {
        bool AddPage(Page page);
        Page GetPageById(string pageId);
        bool AddPages(IList<Page> page);
        IEnumerable<Page> GetPages();
        bool DeletePage(string pageId);
    }
}