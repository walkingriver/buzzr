using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BuzzerWeb
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}