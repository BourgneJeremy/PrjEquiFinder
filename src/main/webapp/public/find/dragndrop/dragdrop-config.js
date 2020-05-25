import { pictureInfo } from "./dragndrop-cards.js";
import * as ui from "./dragdrop-ui.js";
import { t } from "../../libraries/i18n/lang.js";

$(function(){
  /*
   * For the sake keeping the code clean and the examples simple this file
   * contains only the plugin configuration & callbacks.
   * 
   * UI functions ui_* can be located in: demo-ui.js
   */
  var path = window.location.pathname;
  if (path === "/EquiFinder/rechercher") {
	  $('#drag-and-drop-zone').dmUploader({ //
	    url: 'FindServlet',
	    // queue: true,
	    multiple: false,
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
	    },
	    onNewFile: function(id, file){
	      // When a new file is added using the file selector or the DnD area
	      // ui_add_log('New file added #' + id);
	      // 10Megs
	      
	      // Comment limiter le nombre de fichiers
	      
	      // var xhr = new XMLHttpRequest();
		  // xhr.onreadystatechange = updateIHM;
	    	
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
	    // Etat ou la requete est en cours de traitement par le serveur
	      ui.multi_update_file_progress(id, 50);
	    },
	    onUploadSuccess: function(id, data){
	      // A file was successfully uploaded
	      // ui_add_log('Server Response for file #' + id + ': ' + JSON.stringify(data));
	      // ui_add_log('Upload of file #' + id + ' COMPLETED', 'success');
	      
	      // $('#ItemPreview').attr('src', `data:image/png;base64,${data}`);
	      
	      ui.multi_update_file_status(id, 'success', t("dragndrop-content-success"));
	      ui.multi_update_file_progress(id, 100, 'success', false);
	      
	      setTimeout(function(){
	    	  pictureInfo(data);
	      }, 1000);
	    },
	    onFileExtError: function() {
	       //  document.getElementById("picture-format-error").hidden = false;
	    },
	    onFileSizeError: function() {
	    	// document.getElementById("picture-size-error").hidden = false;
	    },
	    onUploadError: function(id, xhr, status, message){
		  var errMessage = document.getElementById("picture-not-found");
	      errMessage.hidden = false;
	    	
	      xhr.responseType = "json";
	      var jsonResponse = xhr.responseJSON;
	      
	      if (jsonResponse != undefined) {
	    	  var isSize = jsonResponse.isSize;
	          var isExtension = jsonResponse.isExtension;
	          
	          if (errMessage !== undefined) {
	        	  if (isExtension == "false" && isSize == "false") {
	            	  errMessage.innerHTML = `${t("errors-title-plural")} :
	            	  		<ul>
	            	  			<li>${t("picture-wrong-ext")} <b>.jpg</b> & <b>.png</b> & <b>.tif</b></li>
	            	  			<li>${t("picture-wrong-size")} <b>5</b> ${t("picture-wrong-size-title")}</li>
	            	  		</ul>`;
	            	  errMessage.hidden = false;
	              } else if (isExtension == "false" && isSize == "true") {
	            	  errMessage.innerHTML = `${t("errors-title-single")} : ${t("picture-wrong-ext")} <b>.jpg</b> & <b>.png</b> & <b>.tif</b>`;
	            	  errMessage.hidden = false;
	              } else if (isSize == "false" && isExtension == "true") {
	            	  errMessage.innerHTML = `${t("errors-title-single")} : ${t("picture-wrong-size")} <b>5</b> ${t("picture-wrong-size-title")}`;
	            	  errMessage.hidden = false;
	              }  
	          }
	      }
	    	
	      /*var errMessage = document.getElementById("picture-not-found");
	      errMessage.hidden = false;*/
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







