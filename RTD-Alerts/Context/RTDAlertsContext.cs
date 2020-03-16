using Microsoft.EntityFrameworkCore;

namespace RTD_Alerts.Context
{
    public class RTDAlertsContext : DbContext
    {
        public RTDAlertsContext(DbContextOptions<RTDAlertsContext> options)
            : base(options)
        {
        }
    }
}