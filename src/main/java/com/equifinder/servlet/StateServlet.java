package com.equifinder.servlet;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.equifinder.behavior.Research;
import com.equifinder.thread.StateRunnable;
import com.google.gson.Gson;

/**
 * Servlet implementation class StateServlet
 */
public class StateServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final Logger log = Logger.getLogger(StateServlet.class);

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Thread t1 = new Thread(new StateRunnable());
		t1.start();
		
		System.out.printf("%s is %salive and in %s " +
                "state and priority %d \n", t1.getName(), 
                t1.isAlive() ? "" : "not ",
                t1.getState(), 
                t1.getPriority());
		
		String strState = Research.state.toString();
	
		Map<String, String> mapResponse = new HashMap<String, String>();
		
		mapResponse.put("status", "ok");
		mapResponse.put("message", strState);
		
		String json = new Gson().toJson(mapResponse);
	    response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
	    response.getWriter().write(json);
	    
	    System.out.printf("%s is %salive and in %s " +
                "state and priority %d \n", t1.getName(), 
                t1.isAlive() ? "" : "not ",
                t1.getState(), 
                t1.getPriority());
	}
}
