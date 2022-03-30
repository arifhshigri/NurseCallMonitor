using IntercallMonitor.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NurseCallMonitor;
using NurseCallMonitor.Models;
using SignalRChat.Hubs;
using System;
using System.Diagnostics;
using System.Linq;

namespace IntercallMonitor.Controllers
{
    public class HomeController : Controller
    {
        public IOptions<AppSettings> _settings { get; }

        public HomeController(IOptions<AppSettings> settings)
        {
            _settings = settings;
        }

        public IActionResult Index(string floorName="")
        {
            setFloorData(floorName);  
            return View();
        }

        private void setFloorData(string floorName,bool selectFirst=true)
        {
            var fileNames = FilerHelper.ReadFilenames(_settings.Value.FloorFilePath);
            ViewData["Floors"] = fileNames;
            floorName = fileNames.FirstOrDefault(x => x.Trim().ToLower() == floorName.Trim().ToLower());
            ViewData["FloorName"] = floorName;
            ViewData["FloorData"] = FilerHelper.ReadFloor(_settings.Value.FloorFilePath, floorName);
        }

        [ HttpPost]
        public IActionResult AddFloor(FloorModel floorModel)
        {
            var floorModelTemp = floorModel;
            FilerHelper.Write(_settings.Value.FloorFilePath, floorModel.FloorName.Trim(), floorModel.FloorData);
            return Ok(Json(floorModel));
        }
        [HttpGet]
        public IActionResult AddFloor(string floorName = "")
        {
            setFloorData(floorName,false);
            return View();
        }

    }
}