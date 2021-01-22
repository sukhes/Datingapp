using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Service
{
    public class TokenService : ITokenService
    {

        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration _config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));
        }

        public string CreateToken(AppUser user)
        {
            var claim = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };

            var cred = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claim),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = cred
            };

            var tokenHdlr = new JwtSecurityTokenHandler();
            var token = tokenHdlr.CreateToken(tokenDescriptor);
            return tokenHdlr.WriteToken(token);

        }
    }
}