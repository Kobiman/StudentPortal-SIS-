using IdentityModel.Client;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace SP.Common
{
    public static class HttpHelper
    {
        public async static Task<T> Get<T>(this string apiUrl) where T : new()
        {
            try
            {
                T data = default;
                using (HttpClient client = new())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                    var disco = await client.GetDiscoveryDocumentAsync("https://auth.uenr.edu.gh/");
                    if (!disco.IsError)
                    {
                        // request token
                        var tokenResponse = await client.RequestClientCredentialsTokenAsync(new ClientCredentialsTokenRequest
                        {
                            Address = disco.TokenEndpoint,
                            ClientId = "-------------",
                            ClientSecret = "",
                            Scope = ""
                        });

                        if (!tokenResponse.IsError)
                        {
                            var apiClient = new HttpClient();
                            apiClient.SetBearerToken(tokenResponse.AccessToken);

                            var result = await apiClient.GetStreamAsync(apiUrl);
                            using (Stream s = result)
                            using (StreamReader sr = new StreamReader(s))
                            using (JsonReader reader = new JsonTextReader(sr))
                            {
                                JsonSerializer serializer = new JsonSerializer();
                                data = serializer.Deserialize<T>(reader);
                            }
                        }
                    }

                }
                return data;
            }
            catch
            {
                return default;
            }
        }
    }
}
