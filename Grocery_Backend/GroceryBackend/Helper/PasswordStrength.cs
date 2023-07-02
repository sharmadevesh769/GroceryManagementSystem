using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace GroceryBackend.Helper
{
    public class PasswordStrength
    {
        public static string checkPasswordStrenth(string password)
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 8)
                sb.Append("Minimum password length is 8" + Environment.NewLine);
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]")&& Regex.IsMatch(password, "[0-9]")))
                sb.Append("Password should be AlphaNumeric" + Environment.NewLine);
            if (!Regex.IsMatch(password, "[<,>,@,#,$,%,^,&,*,!,~,),(,+,-,=,+,[,]"))
                sb.Append("Password should containt special character" + Environment.NewLine);

            return sb.ToString();
        }
    }
}
