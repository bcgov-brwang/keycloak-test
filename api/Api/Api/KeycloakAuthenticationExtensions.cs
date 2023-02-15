using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;


namespace Api
{
    public static class KeycloakAuthenticationExtensions
    {

        public static AuthenticationBuilder AddKeycloakAuth(this AuthenticationBuilder builder, KeycloakAuthenticationOptions configOptions)
        {

            return builder.AddJwtBearer(o =>
            {
                o.Authority = configOptions.Authority;
                o.Audience = configOptions.Audience;
                o.RequireHttpsMetadata = false;
                o.IncludeErrorDetails = true;

                o.Events = new JwtBearerEvents()
                {
                    OnAuthenticationFailed = context =>
                    {
                        var env = context.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
                        context.NoResult();

                        context.Response.StatusCode = 500;
                        context.Response.ContentType = "text/plain";

                        if (env.IsDevelopment())
                        {
                            return context.Response.WriteAsync(context.Exception.ToString());
                        }

                        return context.Response.WriteAsync("An error occured processing your authentication.");
                    },
                    OnTokenValidated = context =>
                    {
                        var principal = context.Principal;

                        //bruce test
                        var myUser = principal.FindFirstValue("idir_user_guid");

                        if (myUser == null)
                        {
                            

                        }
                        else
                        {
                            
                        }


                       

                        return Task.CompletedTask;
                    }
                };
            });
        }
    }
}
