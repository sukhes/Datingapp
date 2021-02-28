using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _ctx;
        public BuggyController(DataContext ctx)
        {
            _ctx = ctx;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret(){
            return "This is a secret.";
        }
        
        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound(){
            var usr = _ctx.Users.Find(1);
            if (usr == null) return NotFound();
            return Ok(usr);
        }
        
        [HttpGet("server-error")]
        public ActionResult<string> GetServerError(){
            var usr = _ctx.Users.Find(1);
            
            return usr.ToString();
        }
        
        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest(){
            
            return BadRequest("Not a good request.");
        }

    }
}