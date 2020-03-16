using System;

namespace RTD_Alerts.Exceptions
{
    public class AuthTokenException : Exception
    {
        public AuthTokenException(string message = "Auth token has expired.")
            : base(message)
        {
        }
    }
}