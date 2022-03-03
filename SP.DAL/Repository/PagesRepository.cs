using Microsoft.VisualBasic;
using Sp.Models;
using SP.DAL.Models;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.DAL.Repository
{
    internal class PagesRepository : IPagesRepository
    {
        private PageDM Collection;
        public PagesRepository(PageDM collection)
        {
            Collection = collection;
        }
        public bool AddPage(Page page)
        {
            Collection.Add(page);
            DataWriter.Add(page, nameof(Page));
            return true;
        }

        public bool AddPages(IList<Page> pages)
        {
            foreach (var page in pages)
            {
                Collection.Add(page);
                DataWriter.Add(page, nameof(Page));
            }
            return true;
        }

        public bool DeletePage(string pageId)
        {
            var page = Collection.Find((x, y) => x.Id[y] == pageId);
            if (!page.success) return false;
            page.Value.RemovePage(page.Index);
            return true;
        }

        public Page GetPageById(string pageId)
        {
            var result = Collection.Find((x, y) => x.Id[y] == pageId);
            return CreatePage(result);
        }

        public IEnumerable<Page> GetPages()
        {
            return Collection.Select((x, y) => CreatePage(x, y));
        }

        private Page CreatePage((PageDM Value, int Index, bool Success) result)
        {
            if (!result.Success) return default;
            return new Page
            {
                Id = result.Value.Id[result.Index],
                Route = result.Value.Route[result.Index],
                Title = result.Value.Title[result.Index],
                State = result.Value.State[result.Index]
            };
        }

        private Page CreatePage(PageDM Value, int Index)
        {
            return new Page
            {
                Id = Value.Id[Index],
                Route = Value.Route[Index],
                Title = Value.Title[Index],
                State = Value.State[Index]
            };
        }
    }
}
