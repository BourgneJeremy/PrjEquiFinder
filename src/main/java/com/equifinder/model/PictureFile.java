package com.equifinder.model;

import java.sql.Timestamp;

public class PictureFile {
	private int id;
	private String name;
	private String idExt;
	private Timestamp timestamp;
	private double size;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public Timestamp getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Timestamp timestamp) {
		this.timestamp = timestamp;
	}

	public double getSize() {
		return size;
	}
	
	public void setSize(double size) {
		this.size = size;
	}

	public String getIdExt() {
		return idExt;
	}

	public void setIdExt(String idExt) {
		this.idExt = idExt;
	}
}
