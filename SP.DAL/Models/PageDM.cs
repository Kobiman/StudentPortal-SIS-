using Sp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.DAL.Models
{
    public class PageDM
    {
        public PageDM(int lenght)
        {
            Id = new string[lenght];
            Title = new string[lenght];
            Route = new string[lenght];
            State = new int[lenght];
        }

        public void Add(Page page)
        {
            lock (page)
            {
                if (Count == Route.Length)
                {
                    var newLength = Id.Length + 15;
                    var _Id = new string[newLength];
                    Id.CopyTo(_Id, 0);
                    Id = _Id;

                    var _Title = new string[newLength];
                    Title.CopyTo(_Title, 0);
                    Title = _Title;

                    var _Route = new string[newLength];
                    Route.CopyTo(_Route, 0);
                    Route = _Route;

                    var _State = new int[newLength];
                    State.CopyTo(_State, 0);
                    State = _State;
                }
            }

            Id[Count] = page.Id;
            Title[Count] = page.Title;
            Route[Count] = page.Route;
            State[Count] += 1;
            Count += 1;

        }

        public void RemovePage(int index)
        {
            lock (this)
            {
                Id.Remove(index, Count);
                Title.Remove(index, Count);
                Route.Remove(index, Count);
                State.Remove(index, Count);
                Count--;
            }
        }

        public int Count;
        public string[] Id;
        public string[] Title;
        public string[] Route;
        public int[] State;
    }
}

