/*
	Server side code
*/

[HttpPost]
public JsonResult Upload()
{
	for (int i = 0; i < Request.Files.Count; i++) {
		// for each file being sent over...
		HttpPostedFileBase file = Request.Files[i];

		// Gather information from each file
		int fileSize = file.ContentLength;
		string fileName = file.FileName;
		string mimeType = file.ContentType;

		// Open input stream
		System.IO.Stream fileContent = file.InputStream;

		// Save the files
		file.SaveAs(Server.MapPath("~/Content/upload/") + fileName);
	}
	// Return JSON
	return Json("Uploaded " + Request.Files.Count + " file(s)");
}