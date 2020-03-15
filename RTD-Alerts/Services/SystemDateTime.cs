using System;

namespace RTD_Alerts.Services
{
    public class SystemDateTime : ISystemDateTime
    {
        public DateTime now
        {
            get
            {
                return DateTime.Now;
            }
        }
    }
}