using Sp.Models;
using SP.Common;
using SP.Models;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.Services
{
    public class PageService : IPageService
    {
        private readonly IUnitOfWork _uow;
        public PageService(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IResult AddPage(Page page)
        {
            if (_uow.Pages.AddPage(page))
                return new Result(true, Message.AddedSuccessfully(nameof(Page)));
            return new Result(false, Message.OperationFailed);
        }

        public IResult AddPages(IList<Page> pages)
        {
                _uow.Pages.AddPages(pages);
            return new Result(true, Message.AddedSuccessfully(nameof(Page)));
        }

        public IResult DeletePage(string pageId)
        {

            if (string.IsNullOrWhiteSpace(pageId)) return new Result(false, Message.CannotBeNull(nameof(Page)));
            if (_uow.Pages.DeletePage(pageId))
                return new Result(true, Message.FetchOperationCompletedSuccesfully);
            return new Result(true, Message.OperationFailed);
        }

        public IResult GetPageById(string pageId)
        {
            if (string.IsNullOrWhiteSpace(pageId)) return new Result(false, Message.CannotBeNull(nameof(Page)));
            var page = _uow.Pages.GetPageById(pageId);
            if (page == null) return new Result(false, Message.NotFound(nameof(Page)));
            return new Result<Page>(true, page, Message.AddedSuccessfully(nameof(Page)));
        }

        public IResult GetPages()
        {
            var page = _uow.Pages.GetPages();
            return new Result<IEnumerable<Page>>(true, page, Message.AddedSuccessfully(nameof(Page)));
        }
    }
}
