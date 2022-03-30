using IntercallMonitor.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using NurseCallMonitor;
using SignalRChat.Hubs;
using System.Diagnostics;

namespace IntercallMonitor.Controllers
{
    public class NurseCallController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHubContext<ChatHub> _hub;

        public NurseCallController(ILogger<HomeController> logger, IHubContext<ChatHub> hub)
        {
            _hub = hub;
            _logger = logger;
        }

        public IActionResult Index()
        {
            var intObj = new UDPListener(_hub);
            intObj.StartListener("192.168.1.192", 6345);
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {


            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}