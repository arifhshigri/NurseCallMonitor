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

        public NurseCallController()
        {
        }

        public IActionResult Index(string floorName="")
        {
            return View();
        }

        public IActionResult AddFloor()
        {
            return View();
        }
    }
}