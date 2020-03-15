using Microsoft.AspNetCore.Mvc;
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
    }
}