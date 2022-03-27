using System;
using System.ComponentModel.DataAnnotations;

namespace NurseCallMonitor.Models
{
    public class FloorModel
    {
        public FloorModel()
        {
        }
        [Required]
        public string FloorName { get; set; }
        public string FloorData { get; set; }
    }

    
}
