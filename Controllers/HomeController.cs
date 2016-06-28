using Microsoft.AspNetCore.Mvc;

namespace BowlingScorer.Controllers
{
    public class HomeController : Controller
    {

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
   }
}
