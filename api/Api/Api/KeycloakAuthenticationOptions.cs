using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api
{
    public class KeycloakAuthenticationOptions
    {
        public string Authority { get; set; }

        public string Audience { get; set; }
    }
}
