package com.equifinder.model;

public class WSFile {
	private int id;
	private String name;
	private String path;
	private double size;
	
	public WSFile() { }
	
	public WSFile(String path, double size) {
		super();
		this.path = path;
		this.size = size;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getSize() {
		return size;
	}
	
	public void setSize(double size) {
		this.size = size;
	}
	
	public String getPath() {
		return path;
	}
	
	public void setPath(String path) {
		this.path = path;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "WSFile [id=" + id + ", name=" + name + ", path=" + path + ", size=" + size + "]";
	}
}
