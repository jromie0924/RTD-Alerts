using System.Net.Http;
using System.Threading.Tasks;

namespace RTD_Alerts.Services
{
    public class TwitterAuthenticationService : ITwitterAuthenticationService
    {
        private IHttpClientFactory _httpClientFactory;

        public TwitterAuthenticationService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task GetToken()
        {
            var request = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/oauth2/token");
            request.Headers.Add("Authorization", "Basic tolf:tolf");

            // var content = new StringContent();

            var client = _httpClientFactory.CreateClient();
            // client.PostAsync()
        }
    }
}