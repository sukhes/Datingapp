using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _lgr;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> lgr, IHostEnvironment env)
        {
            _env = env;
            _lgr = lgr;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext hctx)
        {

            try
            {
                await _next(hctx);
            }
            catch (Exception ex)
            {
                _lgr.LogError(ex, ex.Message);
                hctx.Response.ContentType = "application/json";
                hctx.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var resp = _env.IsDevelopment() ? new APIException(hctx.Response.StatusCode, ex.Message, ex.StackTrace?.ToString()) :
                                                new APIException(hctx.Response.StatusCode, "Internal Server Error");
                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
                var json = JsonSerializer.Serialize(resp, options);

                await hctx.Response.WriteAsync(json);

            }
        }
    }
}