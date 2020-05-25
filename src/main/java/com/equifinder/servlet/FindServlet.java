package com.equifinder.servlet;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

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
import org.json.JSONArray;

import com.equifinder.behavior.Research;
import com.equifinder.model.PictureFile;
import com.server.H2jdbc;

@MultipartConfig(maxRequestSize=1024*1024*50)
@WebServlet( "/rechercher" )
public class FindServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final Logger log = Logger.getLogger(AddServlet.class);
    
    private ResourceBundle bundle = ResourceBundle.getBundle("domain.properties.config");
    private String files_folder = bundle.getString("files.location");
    
	private Research research = new Research();
	
	public FindServlet() {
		super();
	}

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
     *      response)
     */
    protected void doGet( HttpServletRequest request, HttpServletResponse response )
            throws ServletException, IOException {
        RequestDispatcher view = request.getRequestDispatcher( "index.html" );
        view.forward( request, response );
    }
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	try {
			log.info("--- NEW FILE ---");
			// Get the file data from the request
			List<FileItem> items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);
			// Return the file elements of the retrieved data above and do the filtering
			PictureFile pictureFile = research.getAndUploadFileElements(items, request, response);
			// get the similar pictures
			JSONArray pictureInfos = research.calcul(pictureFile, files_folder);
			
			// send the state and the picture id's to the client
			research.result(response, research.getState(), pictureInfos);
			
		} catch (FileUploadException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
}
