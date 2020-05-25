package com.equifinder.model;

/**
 * Response send to the client
 */
public class Response {
	private String status;
	private String path;
	
	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	} 
}
