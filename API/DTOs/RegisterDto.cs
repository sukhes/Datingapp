using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [StringLength(8, MinimumLength = 4)]
        public String Username { get; set; }
        [Required]
        public String Password { get; set; }
    }
}