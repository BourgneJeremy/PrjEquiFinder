package com.equifinder.tools;

import java.io.IOException;
import java.util.ResourceBundle;

import org.apache.log4j.Logger;
import com.equifinder.model.PictureFile;

public class Filtering {
	private static final Logger log = Logger.getLogger(Filtering.class);
	
	/**
	 * FILE SIZE
	 * 1 megabit  =  1 000 000
	 * 3 megabits  = 3 000 000
	 * 5 megabits  = 5 000 000
	 * 10 megabits = 10 000 000
	 */
	ResourceBundle bundle = ResourceBundle.getBundle("domain.properties.config");
    int min_file_size = Integer.parseInt(bundle.getString("files.min-size"));
    int max_file_size = Integer.parseInt(bundle.getString("files.max-size"));
	
	public Filtering() { }
	
	// verify if the size is between 
	public boolean size(double size) {
		if (size < max_file_size && size > min_file_size) {
			log.info("File size - OK");
			return true;
		} else {
			log.error("File size - ERROR");
			return false;
		}
	}
	
	// return true if the file extension is ".jpg", ".png" or ".tif"
	public boolean fileExtension(String filename) throws SecurityException, IOException  {
		// when there is a file
		if (filename != null) {
			int lastIndexOf = filename.lastIndexOf(".");
			
		    if (lastIndexOf == -1) {
		    	return false;
		    } else {
		    	String extension = filename.substring(lastIndexOf).toLowerCase();
		    	
		    	if (extension.contains(".png") || extension.contains(".jpg") || 
		    			extension.contains(".tif")) {
		    		log.info("File extension - OK");
		    		return true;
		    	} else {
		    		log.error("File extension - ERROR");
		    		return false;
		    	}
		    }
		} else {
			log.warn("The filename is null or undefined - FATAL");
			return false;
		}
	}
}
