import * as ui from "./dragdrop-ui.js";
import { t } from "../../libraries/i18n/lang.js";

var errorFilesNames = [];

$(function(){
  /*
   * For the sake keeping the code clean and the examples simple this file
   * contains only the plugin configuration & callbacks.
   * 
   * UI functions ui_* can be located in: demo-ui.js
   */
  var path = window.location.pathname;
  if (path === "/EquiFinder/ajouter") {
	  $('#drag-and-drop-zone').dmUploader({ //
		    url: 'AddServlet',
		    // queue: true,
		    multiple: true,
		    // extFilter: ["jpg", "png", "tif"],
		    onDragEnter: function(){
		      // Happens when dragging something over the DnD area
		      this.addClass('active');
		    },
		    onDragLeave: function(){
		      // Happens when dragging something OUT of the DnD area
		      this.removeClass('active');
		    },
		    onInit: function(){
		      // Plugin is ready to use
		      // ui_add_log('Penguin initialized :)', 'info');
		    },
		    onComplete: function(){
		      // All files in the queue are processed (success or error)
		      // ui_add_log('All pending tranfers finished');
	    	  var errNamesList = document.getElementById("errNamesList");
	    
	    	  errorFilesNames.map(x => {
	        	errNamesList.innerHTML += `<li>${x}</li>`;
	          })
		    },
		    onNewFile: function(id, file){
		      errorFilesNames = [];
		      // 10Megs
		      // Comment limiter le nombre de fichiers
		    	
			  var errAll = document.getElementById("picture-wrong-all");
		      var errExt = document.getElementById("picture-wrong-ext");
		      var errSize = document.getElementById("picture-wrong-size");
		      var errNames = document.getElementById("picture-wrong-names");
		      var errNamesList = document.getElementById("errNamesList");

		      errAll.hidden = true;
		      errExt.hidden = true;
		      errSize.hidden = true;
		      errNames.hidden = true;
		      
		      errNamesList.innerHTML = "";
		 
			  ui.multi_add_file(id, file);
		    },
		    onBeforeUpload: function(id){
		      // about tho start uploading a file
		      // ui_add_log('Starting the upload of #' + id);
		      // send the files here
		      ui.multi_update_file_status(id, 'uploading', t("dragndrop-content-downloading"));
		      ui.multi_update_file_progress(id, 0, '', true);
		    },
		    onUploadCanceled: function(id) {
		      alert("onUploadCanceled");
		      // Happens when a file is directly canceled by the user.
		      ui.multi_update_file_status(id, 'warning', t("dragndrop-content-cancel"));
		      ui.multi_update_file_progress(id, 0, 'warning', false);
		    },
		    onUploadProgress: function(id, percent){
		      // alert("onBeforeUpload");
		      // Updating file progress
		      ui.multi_update_file_progress(id, percent);
		    },
		    onUploadSuccess: function(id, data){
		      // A file was successfully uploaded
		      // ui_add_log('Server Response for file #' + id + ': ' + JSON.stringify(data));
		      // ui_add_log('Upload of file #' + id + ' COMPLETED', 'success');
		      ui.multi_update_file_status(id, 'success', t("dragndrop-content-success"));
		      ui.multi_update_file_progress(id, 100, 'success', false);
		    },
		    onFileExtError: function() {
		        document.getElementById("picture-format-error").hidden = false;
		    },
		    onFileSizeError: function() {
		    	document.getElementById("picture-size-error").hidden = false;
		    },
		    onUploadError: function(id, xhr, status, message){
				var jsonResponse = xhr.responseJSON;
			    
			    if (jsonResponse != undefined) {
			  	  	var isSize = jsonResponse.isSize;
			        var isExtension = jsonResponse.isExtension;
			        var filename = jsonResponse.filename;
			        
			        errorFilesNames.push(filename);
			        // console.log("filename: ", filename, "; isSize: ", isSize, "; isExtension: ", isExtension);

			        var errAll = document.getElementById("picture-wrong-all");
			        var errExt = document.getElementById("picture-wrong-ext");
			        var errSize = document.getElementById("picture-wrong-size");
			        var errNames = document.getElementById("picture-wrong-names");
			        
		      	    if (isExtension == "false" && isSize == "false") {
		      	    	errAll.hidden = false;
		      	    	errNames.hidden = false;
		      	    	errExt.hidden = true;
		      	    	errSize.hidden = true;
		            } else if (isExtension == "false" && isSize == "true") {
		            	if (!errAll.hidden) {
		            		errExt.hidden = true;
		            	} else {
		            		errExt.hidden = false;
		            	}
		            	errNames.hidden = false;
		            } else if (isSize == "false" && isExtension == "true") {
		            	if (!errAll.hidden) {
		            		errSize.hidden = true;
		            	} else {
		            		errSize.hidden = false;
		            	}
		            	errNames.hidden = false;
		            }  
			    }
				
			    ui.multi_update_file_status(id, 'uploading', t("dragndrop-content-downloading"));
			    ui.multi_update_file_progress(id, 25, 'danger', false); 
			  
			    setTimeout(function(){
			    	ui.multi_update_file_progress(id, 50, 'warning', false); 
			    }, 100);
			      
			    setTimeout(function(){
			    	ui.multi_update_file_status(id, 'danger', t("dragndrop-content-error"));
			    	ui.multi_update_file_progress(id, 0, 'danger', false);
			    }, 1000);
			},
		    onFallbackMode: function(){
		    	alert("onFallbackMode");
		      // When the browser doesn't support this plugin :(
		      // ui_add_log('Plugin cant be used here, running Fallback callback', 'danger');
		    },
		    onFileSizeError: function(file){
		    	console.log("Cannot be added");
		      // ui_add_log('File \'' + file.name + '\' cannot be added: size excess limit', 'danger');
		    }
		  });  
  }
});