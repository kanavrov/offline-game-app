using Microsoft.AspNetCore.Mvc;

namespace OfflineGameApp.Web.Controllers
{
	public class OfflineController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
