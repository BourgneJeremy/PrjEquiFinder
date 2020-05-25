package com.equifinder.behavior;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.imageio.ImageIO;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.equifinder.model.PictureFile;
import com.equifinder.model.WSFile;
import com.equifinder.servlet.AddServlet;
import com.google.gson.Gson;
import com.server.H2jdbc;

public class Find {
	private ResourceBundle bundle = ResourceBundle.getBundle("domain.properties.config");
    private String ws_get_file_info = bundle.getString("ws.get-file.info");
    private String files_folder = bundle.getString("files.location");
    
	// private static final String WS_GET_SINGLE_FILE = "http://localhost:8080/WSEquiFinder/webapi/pictures/info/";
	// private static final String FILES_FOLDER = "C:\\Users\\Jbourgne\\Desktop\\EquiFinder\\Files\\";
	private static final Logger log = Logger.getLogger(Find.class);
	private H2jdbc h2db = new H2jdbc();
	
	static final String[] EXTENSIONS = new String[]{
	        "png", "jpg", "tif"
    };
	
	// filter to identify images based on their extensions
    static final FilenameFilter IMAGE_FILTER = new FilenameFilter() {
		@Override
		public boolean accept(File dir, String name) {
			for (final String ext : EXTENSIONS) {
                if (name.endsWith("." + ext)) {
                    return (true);
                }
            }
            return (false);
		}
    };
	
	public JSONArray getPicturesInfos(String filename) {
		log.info("Start searching for similar pictures...");
		
		
		JSONArray pictures = h2db.getFileInfosByFilename(filename);
		
		if (pictures != null && pictures.length() >= 1) {
			log.info("Found " + pictures.length() + " similar pictures");
			return pictures;
		} else if (pictures.length() == 0) {
			log.error("Found no pictures");
			throw new Error("Found no pictures");
		} else {
			// show an error message
			log.warn("The file hasn't been downloaded like it should");
			throw new Error("The file hasn't been downloaded like it should");
		}
	}
	
	public List<WSFile> WSEquiFinderData(List<Integer> pictureIds) throws FileNotFoundException {
		log.info("File(s) from EquiFinder API");
		
		List<WSFile> files = new ArrayList<WSFile>();
		
		for (int pictureId: pictureIds) {
			// Create a client
			Client client = ClientBuilder.newClient();
			
			// Set a target to the client
			WebTarget target = client.target(ws_get_file_info + pictureId);
			String wsJSONresult = target.request(MediaType.APPLICATION_JSON).get(String.class);
			
			// Get the response
			Gson gson = new Gson();
			WSFile resultFile = gson.fromJson(wsJSONresult, WSFile.class);
			
			files.add(resultFile);
			log.info(resultFile.toString());
		}
		return files;
	}
	
	public void getServerFilesAndRedirect(List<WSFile> files, HttpServletRequest request, HttpServletResponse response) throws IOException {
		log.info("Get the files from server");
		File dir = new File(files_folder);

		Map<WSFile, BufferedImage> picturesMap = new HashMap<>();
		
		response.setStatus(HttpServletResponse.SC_ACCEPTED);
		
		// This servlet code block read the image from the mentioned directory and writes the content 
		// in the response object using ServletOutputStream and BufferedOutputStream classes.
		for(WSFile file: files) {
			file.getName();
			
			if (dir.isDirectory()) { // make sure it's a directory
	            for (final File f : dir.listFiles(IMAGE_FILTER)) {
	                BufferedImage picture = null;
	                
	                if (file.getName().equals(f.getName())) {
	                	try {
		                    picture = ImageIO.read(f);
		                    
		                    picturesMap.put(file, picture);
		                    /** Some methods
		                     *  ------------
		                     *  img.getWidth()
		                     *  img.getHeight()
		                     *  f.length()
		                     */
		                    
		                    // Display pictures
		                    response.setContentType("image/jpeg; charset=UTF-8");
		                    
		            		ServletOutputStream out;
		            		out = response.getOutputStream();
		            		
		            		FileInputStream fin = new FileInputStream(f.toString());
		            	
		            		BufferedInputStream bin = new BufferedInputStream(fin);
		            		BufferedOutputStream bout = new BufferedOutputStream(out);
		            		
		            		int ch = 0;
		            		
		            		while((ch=bin.read())!=-1) {
		            			bout.write(ch);
		            		}
		            		
		            		bin.close();
		            		fin.close();
		            		bout.close();
		            		out.close();
		        		    
		                } catch (final IOException e) {
		                    // handle errors here
		                }
	                } 
	            }
	        }
		}
	}
}
