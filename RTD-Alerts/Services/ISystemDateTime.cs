using System;

namespace RTD_Alerts.Services
{
    public interface ISystemDateTime
    {
        DateTime now { get; }
    }
}