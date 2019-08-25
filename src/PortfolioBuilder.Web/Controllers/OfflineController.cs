using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using PortfolioBuilder.Web.Models;

namespace PortfolioBuilder.Web.Controllers
{
	public class OfflineController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
