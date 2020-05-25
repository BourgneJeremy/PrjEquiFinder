package com.server;

import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import org.json.JSONArray;
import org.json.JSONObject;

public class H2jdbc {
	private ResourceBundle bundle = ResourceBundle.getBundle("domain.properties.config");
    
	// JDBC driver name and database URL
	private String sgbd_driver = bundle.getString("sgbd.driver");
    private String sgbd_url = bundle.getString("sgbd.url");
    
    // Database credentials
    private String sgbd_user = bundle.getString("sgbd.user");
    private String sgbd_password = bundle.getString("sgbd.password");
    
    Connection conn = null;
    Statement stmt = null;
    
    public void insertFile(Timestamp current, double fileSize) {
        try {
            // STEP 1: register JDBC Driver
            Class.forName(sgbd_driver);
            // STEP 2: open connection
            // connection in server mode
            conn = DriverManager.getConnection(sgbd_url, sgbd_user, sgbd_password);
            // STEP 3: execute a query
            stmt = conn.createStatement();

            // DELETE
            // String filename = new File(filepath).getName();
            
            // ALTER TABLE FILES ALTER COLUMN TIMESTAMP VARCHAR(255);
            String sql = "INSERT INTO FILES(name, size, timestamp) VALUES('" + current + "', " + fileSize + ", '" + current + "');";
            stmt.executeUpdate(sql);

            // STEP 4: Clean the environment
            stmt.close();
            conn.close();

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (stmt != null)
                try {
                    stmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
        }
    }
    
    public Integer getFileId(Timestamp timestamp) {
    	try {
            // STEP 1: register JDBC Driver
            Class.forName(sgbd_driver);
            // STEP 2: open connection
            // connection in server mode
            conn = DriverManager.getConnection(sgbd_url, sgbd_user, sgbd_password);
            // STEP 3: execute a query
            stmt = conn.createStatement();
            
            String sql = "SELECT id FROM Files WHERE name='" + timestamp + "' ORDER BY id DESC";
            ResultSet rs = stmt.executeQuery(sql);
            
            int resId = 0;
            while (rs.next()) {
            	resId = Integer.parseInt(rs.getString("id"));
            }
            // STEP 4: Clean the environment
            stmt.close();
            conn.close();
            
            return resId;
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (stmt != null)
                try {
                    stmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
        }
		return null;
    }
    
    public void updateName(int id, String name) {
    	try {
            // STEP 1: register JDBC Driver
            Class.forName(sgbd_driver);
            // STEP 2: open connection
            // connection in server mode
            conn = DriverManager.getConnection(sgbd_url, sgbd_user, sgbd_password);
            // STEP 3: execute a query
            stmt = conn.createStatement();

            // DELETE
            // String filename = new File(filepath).getName();
            
            String sql = "UPDATE FILES SET NAME = '" + name + "' WHERE id='" + id + "'";
            stmt.executeUpdate(sql);

            // STEP 4: Clean the environment
            stmt.close();
            conn.close();

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (stmt != null)
                try {
                    stmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
        }
    }
    
    public JSONArray getFileInfosByFilename(String filename) {
    	try {
            // STEP 1: register JDBC Driver
            Class.forName(sgbd_driver);
            // STEP 2: open connection
            // connection in server mode
            conn = DriverManager.getConnection(sgbd_url, sgbd_user, sgbd_password);
            // STEP 3: execute a query
            stmt = conn.createStatement();
            
            String sql = "SELECT id, name, size, timestamp FROM Files WHERE name='" + filename + "'";
            ResultSet rs = stmt.executeQuery(sql);
            
            JSONArray ja = new JSONArray();
            
            while (rs.next()) {
            	int resId = Integer.parseInt(rs.getString("id"));
            	String resFullName = rs.getString("name");
            	int resSize = Integer.parseInt(rs.getString("size"));
            	String resTimestamp = rs.getString("timestamp");
            	
            	String frDate = this.getFrDate(resTimestamp);
            	String enDate = this.getEnDate(resTimestamp);
            	
            	File file = new File(resFullName);
            	
            	String resExt = this.getFileExtension(file).substring(1);
            	String resName = this.getBaseName(resFullName);
            	
            	JSONObject jo = new JSONObject();
                jo.put("picId", resId);
                jo.put("name", resName);
                jo.put("extension", resExt);
                jo.put("size", resSize);
                jo.put("frDate", frDate);
                jo.put("enDate", enDate);
                 
                ja.put(jo);
            }
            // STEP 4: Clean the environment
            stmt.close();
            conn.close();
            
            return ja;
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (stmt != null)
                try {
                    stmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
        }
		return null;
    	
    }
    
    public JSONArray getFilesList() {
    	try {
            // STEP 1: register JDBC Driver
            Class.forName(sgbd_driver);
            // STEP 2: open connection
            // connection in server mode
            conn = DriverManager.getConnection(sgbd_url, sgbd_user, sgbd_password);
            // STEP 3: execute a query
            stmt = conn.createStatement();
            
            String sql = "SELECT id, name, size, timestamp FROM Files ORDER BY id DESC";
            ResultSet rs = stmt.executeQuery(sql);
            
            JSONArray ja = new JSONArray();
            
            while (rs.next()) {
            	int resId = Integer.parseInt(rs.getString("id"));
            	String resFullName = rs.getString("name");
            	int resSize = Integer.parseInt(rs.getString("size"));
            	String resTimestamp = rs.getString("timestamp");
            	
            	String frDate = this.getFrDate(resTimestamp);
            	String enDate = this.getEnDate(resTimestamp);
            	File file = new File(resFullName);
            	
            	String resExt = this.getFileExtension(file).substring(1);
            	String resName = this.getBaseName(resFullName);

            	
            	JSONObject jo = new JSONObject();
                jo.put("picId", resId);
                jo.put("name", resName);
                jo.put("extension", resExt);
                jo.put("size", resSize);
                jo.put("frDate", frDate);
                jo.put("enDate", enDate);
                 
                ja.put(jo);
            }
            // STEP 4: Clean the environment
            stmt.close();
            conn.close();
            
            return ja;
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (stmt != null)
                try {
                    stmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
        }
		return null;
    	
    }
    
    private String getFileExtension(File file) {
	    String name = file.getName();
	    int lastIndexOf = name.lastIndexOf(".");
	    if (lastIndexOf == -1) {
	        return ""; // empty extension
	    }
	    return name.substring(lastIndexOf);
	}
    
    public String getBaseName(String fileName) {
        int index = fileName.lastIndexOf('.');
        if (index == -1) {
            return fileName;
        } else {
            return fileName.substring(0, index);
        }
    }
    
    public String getFrDate(String resTimestamp) {
    	String fullDate[] = resTimestamp.split(" ");
    	String yearMonthDay = fullDate[0];
    	
    	String tabEnDate[] = yearMonthDay.split("-");
    	
    	String year = tabEnDate[0];
    	String month = tabEnDate[1];
    	String day = tabEnDate[2];
    	
    	String frDate = day + "/" + month + "/" + year;
    	return frDate;
    }
    
    public String getEnDate(String resTimestamp) {
        String fullDate[] = resTimestamp.split(" ");
        String yearMonthDay = fullDate[0];
        
        String tabEnDate[] = yearMonthDay.split("-");
        
        String year = tabEnDate[0];
        String month = tabEnDate[1];
        String day = tabEnDate[2];
        
        String enDate = month + "/" + day + "/" + year;
        return enDate;
    }
}
