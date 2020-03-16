using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RTD_Alerts.Models;
using RTD_Alerts.Services;

namespace RTD_Alerts.Controllers
{
    public class UsersController : Controller
    {
        private ISystemDateTime _systemDateTime;
        public UsersController(ISystemDateTime systemDateTime)
        {
            _systemDateTime = systemDateTime;
        }

        [HttpPost]
        [Route("/User")]
        public Task<User> PostUser([FromBody] User user)
        {
            throw new NotImplementedException();
        }
    }
}