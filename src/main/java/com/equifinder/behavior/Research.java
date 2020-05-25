package com.equifinder.behavior;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.log4j.Logger;
import org.json.JSONArray;

import com.equifinder.enums.State;
import com.equifinder.model.PictureFile;
import com.equifinder.tools.Filtering;
import com.google.gson.Gson;

public class Research {
	private static final Logger log = Logger.getLogger(Research.class);
	private ResourceBundle bundle = ResourceBundle.getBundle("domain.properties.config");
    private String files_folder = bundle.getString("files.location");
	private Find find = new Find();
	public static State state;
	
	public Research() {
		this.state = null;
	}
	
	public JSONArray calcul(PictureFile pictureFile, String dir) throws InterruptedException {
		/*this.setState(State.New);
		Thread.sleep(500);
		this.setState(State.Waiting);
		Thread.sleep(1000);
		this.setState(State.Running);
		Thread.sleep(2000);*/
		this.setState(State.End);
		
		// STEPS FOR THE RESEARCH FUNCTION
		if (pictureFile != null) {
			String filename = new File(pictureFile.getName()).getName();
			JSONArray pictureInfos = find.getPicturesInfos(filename);
			
			if (pictureInfos != null) {
				return pictureInfos;
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
	
	public void result(HttpServletResponse response, State state, JSONArray pictureInfos) throws Exception {
		// Send the state to the client
		if (pictureInfos != null) {
			log.info("Send the result");

		    response.setContentType("application/json");
		    response.setCharacterEncoding("UTF-8");
			response.getWriter().write(pictureInfos.toString());
		} else {
			// FAIL 
			throw new Error("No images found");
		}
	}

	public PictureFile getAndUploadFileElements(List<FileItem> items, HttpServletRequest request, HttpServletResponse response) throws ServletException {
		log.info("Get file elements");
    	PictureFile pictureFile = new PictureFile();
		
		try {
			for (int i = 0; i < items.size(); i++) {
				
				FileItem item = (FileItem) items.get(i);
				File fileTemp = new File(item.getName());
				
				// Filtering stage
				Filtering filter = new Filtering();
				boolean isExtension = filter.fileExtension(fileTemp.getName());
				boolean isSize = filter.size(item.getSize());
				
				if (isExtension && isSize) {
					File file = new File(files_folder + fileTemp.getName());
					/*
					 * file.createNewFile();
					 * item.write(file);
					 * */
					log.info("The file informations have been received");
				} else {
					// If the extension or the size isn't good enough
					Map<String, String> mapResponse = new HashMap<String, String>();
					
					mapResponse.put("status", "ko");
					mapResponse.put("isExtension", Boolean.toString(isExtension));
					mapResponse.put("isSize", Boolean.toString(isSize));
					
					String json = new Gson().toJson(mapResponse);
				    response.setContentType("application/json");
				    response.setCharacterEncoding("UTF-8");
				    response.getWriter().write(json);
				    
				    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
					
					log.error("Error, the file can not be store on the server");
					throw new Exception("Error, the file can not be store on the server");
				}
				
				String name = item.getName();
				long size = item.getSize();
				
				pictureFile.setName(name);
				pictureFile.setSize(size);
				
				return pictureFile;
			}
		} catch (Exception e) {
			throw new ServletException("Parsing file upload failed.", e);
		}
		return null;
	}
	
	public void setState(State state) {
		this.state = state;
	}
	
	public State getState() {
		return state;
	}
}
