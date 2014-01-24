using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BuzzerWeb
{
    public class Buzzer : Hub
    {
        static string winner = String.Empty;
        static object locker = new { };

        public void Reset()
        {
            lock (locker)
            {
                winner = String.Empty;
            }
            Clients.All.Reset();
        }

        public void Buzz()
        {
            if (string.IsNullOrEmpty(winner))
            {
                lock (locker)
                {
                    if (string.IsNullOrEmpty(winner))
                    {
                        Clients.Caller.YouWin();
                        winner = Context.ConnectionId;
                        Clients.Others.Sorry();
                    }
                }
            }
        }
    }
}
