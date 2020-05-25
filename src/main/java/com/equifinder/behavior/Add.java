package com.equifinder.behavior;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.log4j.Logger;
import org.json.simple.JSONObject;

import com.equifinder.model.PictureFile;
import com.equifinder.tools.Filtering;
import com.equifinder.tools.ImageResizer;
import com.google.gson.Gson;
import com.server.H2jdbc;

public class Add {
	private static final Logger log = Logger.getLogger(Add.class);
	private ResourceBundle bundle = ResourceBundle.getBundle("domain.properties.config");
    private String files_folder = bundle.getString("files.location");
    private H2jdbc h2db = new H2jdbc();
    
	/**
	 * Retrieve the file data
	 * @param items need the elements of the request  
	 * @return a PictureFile model with all the file elements inside
	 * @throws ServletException
	 */
    
    // Envoi de la réponse JSON dans getFileElements
    public PictureFile uploadPicture(List<FileItem> items, HttpServletRequest request, HttpServletResponse response) throws ServletException {
    	PictureFile pictureFile = new PictureFile();
		
		try {
			for (int i = 0; i < items.size(); i++) {
				FileItem item = (FileItem) items.get(i);
				
				// Do the filter verification before uploading
				File fileTemp = new File(item.getName());
				
				Filtering filter = new Filtering();
				boolean isExtension = filter.fileExtension(fileTemp.getName());
				boolean isSize = filter.size(item.getSize());
				
				if (isExtension && isSize) {

					String name = item.getName();
					long size = item.getSize();
					
					// get the current TimeStamp
					Date now = new Date();
					Timestamp current = new Timestamp(now.getTime());
					System.out.println("current timestamp: " + current);
					
					// insertfile
					h2db.insertFile(current, size);
					
					// get the id
					// h2db select id of the inserted file
					int id = h2db.getFileId(current);
					
					File infoFile = new File(name);
					String ext = this.getFileExtension(infoFile);
					
					// stockage du fichier dans pictureFile
					pictureFile.setId(id);
					pictureFile.setName(id + ext);
					pictureFile.setTimestamp(current);
					pictureFile.setSize(size);
					
					// Upgrade the name in the database
					h2db.updateName(id, name);
					
					String path = files_folder + pictureFile.getName();
					File file = new File(path);
					
					System.out.println( file.getAbsoluteFile() );
					
					file.createNewFile();
					// DOWNLOAD THE FILE
					item.write(file);
					log.info("The file has been downloaded");
					
					this.createThumbnails(file.getAbsoluteFile().toString(), pictureFile.getName());
					
					return pictureFile;
					
				} else {
					// If the extension or the size isn't good
					Map<String, String> mapResponse = new HashMap<String, String>();
					
					String name = item.getName();
					File infoFile = new File(name);
					
					mapResponse.put("status", "ko");
					mapResponse.put("filename", infoFile.getName());
					mapResponse.put("isExtension", Boolean.toString(isExtension));
					mapResponse.put("isSize", Boolean.toString(isSize));
					
					String json = new Gson().toJson(mapResponse);
				    response.setContentType("application/json");
				    response.setCharacterEncoding("UTF-8");
				    response.getWriter().write(json);
					
				    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
					log.error("Error, the file can not be store on the server");
					return null;
				}
			}
		} catch (Exception e) {
			throw new ServletException("Parsing file upload failed.", e);
		}
		return null;
	}
    
	/**
	 * Write the response status and data in order to send it to the client
	 * @param response to send
	 * @param pictureFile to get the path
	 * @param if we want to find the picture then isFindProcess is true
	 * @throws IOException
	 */
	@SuppressWarnings("unchecked")
	public void sendJSONResponse(HttpServletResponse response, PictureFile pictureFile, boolean isFindProcess) throws IOException {
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		new JSONObject();

		if (pictureFile != null) {
			// Send the server response to the client
		    h2db.insertFile(pictureFile.getTimestamp(), pictureFile.getSize());
		    
		    if (isFindProcess) {
		    	log.info("STATUS 100 - The picture has been downloaded");
		    	sendFindProcess(response, pictureFile, true);
		    } else {
		    	log.info("STATUS 200 - The picture has been downloaded");
		    	send(response, pictureFile, true);
		    }
		} else {
			log.error("STATUS 403 - Forbidden file");
			send(response, pictureFile, false);
		}
	}
	
	/**
	 * Send the data 
	 * @param response to send
	 * @param pictureFile to get the path
	 * @param isRequestAccepted useful to set the response state
	 * @throws IOException
	 */
	public void send(HttpServletResponse response, PictureFile pictureFile, Boolean isRequestAccepted) throws IOException {
		Map<String, String> mapResponse = new HashMap<String, String>();
		
		// response.setStatus(HttpServletResponse.SC_ACCEPTED);
		
		System.out.println(isRequestAccepted);
		
		if (!isRequestAccepted) {
			mapResponse.put("status", "ko");
			mapResponse.put("message", "A forbidden image has been send.");
			throw new Error("A forbidden image has been sent");
		};
		String json = new Gson().toJson(mapResponse);
	    response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
	    response.getWriter().write(json);
	}
	
	/**
	 * Send the data 
	 * @param response to send
	 * @param pictureFile to get the path
	 * @param isRequestAccepted useful to set the response state
	 * @throws IOException
	 */
	public void sendFindProcess(HttpServletResponse response, PictureFile pictureFile, Boolean isRequestAccepted) throws IOException {
		if (!isRequestAccepted) {
			throw new Error("Error, the file can not be store on the server");
		}
	}

	private String getFileExtension(File file) {
	    String name = file.getName();
	    int lastIndexOf = name.lastIndexOf(".");
	    if (lastIndexOf == -1) {
	        return ""; // empty extension
	    }
	    return name.substring(lastIndexOf);
	}
	
	/**
	 * Create the folders for the pictures
	 */
	public void createFolders() {
	    // if not exist create the EquiFinderFiles
        File equiFolder = new File("EquiFinderFiles");
        
        if (!equiFolder.exists()) {
            equiFolder.mkdir();
        }
        
        File thumbnailsFolder = new File("EquiFinderFiles/thumbnails");
        
        if (!thumbnailsFolder.exists()) {
            thumbnailsFolder.mkdir();
        }
	}
	
	public void createThumbnails(String inputPath, String filename) {
	    try {
	        // fixed width not proportionnal
            int scaledWidth = 300;
            int scaledHeight = 300;

            ImageResizer.resize(inputPath, ".//EquiFinderFiles//thumbnails//" + filename, scaledWidth, scaledHeight);
 
            // resize smaller by 50%
            /*double percent = 0.5;
            ImageResizer.resize(inputPath, ".//EquiFinderFiles//thumbnails//" + filename, percent);*/
 
        } catch (IOException ex) {
            System.out.println("Error resizing the image.");
            ex.printStackTrace();
        }
	}
}
