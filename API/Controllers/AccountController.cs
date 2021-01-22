using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using API.DTOs;
using API.Interfaces;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tknSvc;
        public AccountController(DataContext context, ITokenService tknSvc)
        {
            _tknSvc = tknSvc;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto RegDto)
        {

            if (await UserExists(RegDto.Username)) return BadRequest("User is taken.");

            using var hmac = new HMACSHA512();
            var user = new AppUser()
            {
                UserName = RegDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(RegDto.Password)),
                PasswordSalt = hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto{
               Username = user.UserName,
               Token = _tknSvc.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto l_dto)
        {
            var usr = await _context
                            .Users.SingleOrDefaultAsync(u => u.UserName == l_dto.Username.ToLower());

            if (usr == null) return Unauthorized("Invalid user name.");

            using var hmac = new HMACSHA512(usr.PasswordSalt);

            var pwd = hmac.ComputeHash(Encoding.UTF8.GetBytes(l_dto.Password));

            for (int i = 0; i < pwd.Length; i++)
            {
                if (usr.PasswordHash[i] != pwd[i])
                {
                    return Unauthorized("Invalid Password.");
                }
            }
            return new UserDto{
               Username = usr.UserName,
               Token = _tknSvc.CreateToken(usr)
            };        
        }

        private async Task<bool> UserExists(string in_uname)
        {
            return await _context.Users.AnyAsync(u => u.UserName == in_uname.ToLower());
        }

    }
}