using System.Net.Cache;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _nxet;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        public ExceptionMiddleware(
            RequestDelegate nxet,
            ILogger<ExceptionMiddleware> logger,
            IHostEnvironment env
        )
        {
            _nxet = nxet;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _nxet(context);
            }
            catch (Exception ex)
            {
                 // TODO
            }
        }
    }
}