package com.equifinder.servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;

import com.equifinder.behavior.Add;

@MultipartConfig(maxFileSize=1024*1024*10, maxRequestSize=1024*1024*50)
@WebServlet("/ajouter")
public class AddServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final Logger log = Logger.getLogger(AddServlet.class);
	private Add add = new Add();
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println( "AddServlet" );
	    RequestDispatcher view = request.getRequestDispatcher("index.html");
		view.forward(request, response);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
		    // create folder to get pictures
		    add.createFolders();
		    
			log.info("--- NEW FILE ---");
			// Get the file data from the request
			List<FileItem> items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);
			// Return the file elements of the retrieved data above and do the filtering
			add.uploadPicture(items, request, response);
		} catch (FileUploadException e) {
			e.printStackTrace();
		} 
	}
}
