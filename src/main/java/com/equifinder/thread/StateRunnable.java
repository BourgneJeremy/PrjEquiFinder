package com.equifinder.thread;

import org.apache.log4j.Logger;

import com.equifinder.behavior.Research;

public class StateRunnable implements Runnable {
	private static final Logger log = Logger.getLogger(StateRunnable.class);
	
	@Override
	public void run() {
		String strState = Research.state.toString();
	}
}
