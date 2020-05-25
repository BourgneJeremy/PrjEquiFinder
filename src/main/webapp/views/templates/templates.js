import { t } from "../../public/libraries/i18n/lang.js";

export const homePage = `
	<div id="gallery" class="container">
		<br />
		<div class="row">
			<h1>${t("home-title")}</h1>
		</div>
	</div>
	
	<div id="cards" class="container mt-3">
		<div id="error-paging"></div>
		
        <i><span id="pageNumber"></span></i>

        <div class="card-deck mt-3" id="row_1">
        </div>
        <div class="card-deck mt-3" id="row_2">
        </div>
        <div class="card-deck mt-3" id="row_3">
        </div>
    </div>
    <div id="pagination" class="container mt-3">
        <div class="row">
            <div id="pagination-wrapper"></div>
        </div>
    </div>
	
	<div class="container mb-5" id="backBtn">
		<div class="row">
			<a class="btn btn-outline-info" href="/EquiFinder/ajouter" role="button">${t("home-btn-add")}</a>
		</div>
	</div>
`;

export const addPage = `
	<div class="container">
		<br />
		<div class="row">
			<h1>${t("add-title")}</h1>
		</div>
		<div class="row">
			<i>${t("add-subtitle")}</i>
		</div>
		<br />
		
		<!-- HERE -->
		<main role="main" class="container">
		  <div class="row">
			<div class="alert alert-danger" id="picture-wrong-all" role="alert" hidden>
			  ${t("errors-title-plural")} :
       	  	  <ul>
       	  		<li>${t("picture-wrong-ext")} <b>.jpg</b> & <b>.png</b> & <b>.tif</b></li>
       	  		<li>${t("picture-wrong-size")} <b>5</b> ${t("picture-wrong-size-title")}</li>
       	  	  </ul>
			</div>
			<div class="alert alert-danger" id="picture-wrong-size" role="alert" hidden>
			  ${t("errors-title-single")} : ${t("picture-wrong-size")} <b>5</b> ${t("picture-wrong-size-title")}
			</div>
			<div class="alert alert-danger" id="picture-wrong-ext" role="alert" hidden>
			  ${t("errors-title-single")} : ${t("picture-wrong-ext")} <b>.jpg</b> & <b>.png</b> & <b>.tif</b>
			</div>
	      </div>
	      <div class="alert alert-danger w-75" id="picture-wrong-names" role="alert" hidden>
	      	<div class="row">
	      		${t("picture-wrong-names")}
	      	</div>
	      	<div class="row ml-1" style="margin-top: -2.3em; margin-bottom: -1em;">
	      	    <ul class="mt-4 ml-5" id="errNamesList"></ul>
	      	</div>
	      </div>
	      <div class="row">
	        <div class="col-md-6 col-sm-12">
	          
	          <!-- Our markup, the important part here! -->
	          <form method="POST" action="AddServlet" enctype="multipart/form-data" id="drag-and-drop-zone" class="dm-uploader p-5">
	            <h3 class="mb-5 mt-5 text-muted">${t("dragndrop-label")}</h3>
	
                <label for="pictures" id="fileLabel" class="btn btn-primary">${t("dragndrop-btn")}</label>
                <input type="file" name="pictures[]" id="pictures" title='Click to add Files' multiple/>
	          </form><!-- /uploader -->
	
	        </div>
	        <div class="col-md-6 col-sm-12">
	          <div class="card h-100">
	            <div class="card-header">
	              ${t("dragndrop-list-title")}
	            </div>
	
	            <ul class="list-unstyled p-2 d-flex flex-column col" id="files">
	              <li class="text-muted text-center empty">${t("dragndrop-list-subtitle")}</li>
	            </ul>
	          </div>
	        </div>
	      </div>
    	</main>
	</div>
`;

export const findPage = `
	<div id="gallery" class="d-none container">
		<br />
		<div class="row">
			<h1>Images similaires</h1>
		</div>
	</div>
	
	<!-- PAGING PART -->
	
	<div id="cards" class="d-none container mt-3">
        <i><p id="pageNumber"></p></i>

        <div class="card-deck" id="row_1">
        </div>
        <div class="card-deck mt-3" id="row_2">
        </div>
        <div class="card-deck mt-3" id="row_3">
        </div>
    </div>
    <div id="pagination" class="d-none container mt-3">
        <div class="row">
            <div id="pagination-wrapper"></div>
        </div>
    </div>
    
    <!-- END PAGING PART -->
	
	<div class="container d-none" id="backBtn">
		<div class="row">
			<a class="btn btn-outline-info" href="/EquiFinder/rechercher" role="button">${t("find-back-btn")}</a>
		</div>
	</div>
	
	<div class="container" id="dragndrop">
		<br />
		<div class="row">
			<h1>${t("find-title")}</h1>
		</div>
		<div class="row">
			<i>${t("find-subtitle")}</i>
		</div>
		<br />
		<!-- HERE -->
		<main role="main" class="container">
		  <div class="row">
			<div class="alert alert-danger" id="picture-not-found" role="alert" hidden>
			  ${t("errors-title-single")} : ${t("picture-not-found")}
			</div>
	      </div>
	      <div class="row">
	        <div class="col-md-6 col-sm-12">
	          
	          <!-- Our markup, the important part here! -->
	          <form method="POST" action="FindServlet" enctype="multipart/form-data" id="drag-and-drop-zone" class="dm-uploader p-5">
	            <h3 class="mb-5 mt-5 text-muted">${t("dragndrop-label")}</h3>
	
            	<label for="pictures" id="fileLabel" class="btn btn-primary">${t("dragndrop-btn")}</label>
               	<input type="file" name="pictures[]" id="pictures" title='Click to add Files' multiple/>
	          </form><!-- /uploader -->
	
	        </div>
	        <div class="col-md-6 col-sm-12">
	          <div class="card h-100">
	            <div class="card-header">
	              ${t("dragndrop-list-title")}
	            </div>
	            
	            <ul class="list-unstyled p-2 d-flex flex-column col" id="files">
	              <li class="text-muted text-center empty">${t("dragndrop-list-subtitle")}</li>
	            </ul>
	          </div>
	        </div>
	      </div>
    	</main>
	</div>
	<br />
	<br />
`;

// min-width: 10rem; max-width: 15rem
export const cards = `
  <div id="hoverCard" class="card hover-card-container">
	<div class="cards-picture mt-2">
		<a href="%%webserviceFullPicture%%%%picId%%" data-download-url="%%webserviceDownload%%%%picNameAndExt%%">
			<img id="hoverPicture" class="card-img-top rounded mx-auto d-block" src="%%webserviceThumbnail%%%%picId%%" height="150em" alt="%%pictureAlt%%">
		</a>
	</div>
    <div class="card-body">
        <div class="card-text"><b>${t("card-name")}</b> %%name%%</div>
        <p class="card-text"><b>${t("card-extension")}</b> %%extension%%</p>
      	<small class="text-muted">${t("card-date")} %%creationDate%%</small>
    </div>
    <!-- Example single danger button -->
	<div class="btn-group w-100">
	  <button type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	    Options
	  </button>
	  <div class="dropdown-menu">
	  	<!-- more btn trigger modal -->
	    <a class="dropdown-item" type="button" href="#" onclick="morePictureInfo(%%idForInfo%%)" data-toggle="modal" data-target="#pictureInfoModal">
	    	${t("card-footer-more")}
	    </a>
	    <div class="dropdown-divider"></div>
	    <!-- delete btn trigger modal -->
	    <a class="dropdown-item" type="button" href="#" onclick="sendDataForDelete(%%idForModal%%)" data-toggle="modal" data-target="#deletePictureModal">
	    	${t("card-footer-delete")}
	    </a>
	  </div>
	</div>
  </div>
  
  <!-- delete modal -->
  <div class="modal fade" id="deletePictureModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
      <div class="modal-content">
          <div class="modal-header">
          	<div id="idForModalLabel" hidden></div>
            <h5 class="modal-title">${t("delete-modal-title")}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ${t("delete-modal-content")}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">${t("delete-modal-btn-cancel")}</button>
            <button id="deletePictureBtn" type="button" class="btn btn-primary" data-dismiss="modal">${t("delete-modal-btn-ok")}</button>
          </div>
        </div>
      </div>
	</div>
	
	<!-- more modal -->
	<div class="modal fade" id="pictureInfoModal" tabindex="-1" role="dialog" aria-labelledby="infoModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">${t("more-modal-title")}</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">${t("more-modal-fullname")}</th>
                            <td id="modalPicName"></td>
                        </tr>
                        <tr>
                            <th scope="row">${t("more-modal-size")}</th>
                            <td id="modalPicSize"></td>
                        </tr>
                        <tr>
                            <th scope="row">${t("more-modal-creationdate")}</th>
                            <td id="modalPicDate"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                	<button type="button" class="btn btn-light" data-dismiss="modal">${t("more-modal-btn-close")}</button>
	          	</div>
            </div>
        </div>
    </div>
`;

export const filesTemplate = `
  <li class="media">
    <div class="media-body mb-1">
      <p class="mb-2">
        <strong>%%filename%%</strong> - ${t("dragndrop-content-title")} <span class="text-muted">${t("dragndrop-content-waiting")}</span>
      </p>
      <div class="progress mb-2">
        <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" 
          role="progressbar"
          style="width: 0%" 
          aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
        </div>
      </div>
      <hr class="mt-1 mb-1" />
    </div>
  </li>
`;

export const pictureGalleryScript = `
	<script>
		$(".cards-picture").lightGallery({
			counter: false
		});

		var deletePicture = document.getElementById("deletePictureBtn");
		var idForModalLabel = document.getElementById("idForModalLabel");

		function sendDataForDelete(idForModal) {
			idForModalLabel.innerHTML = idForModal;
		}
		
		function morePictureInfo(idForModal) {
			// recupérer les informations via une requête XHR
			var xhr = new XMLHttpRequest();

			xhr.open("GET", webservice.info + idForModal);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.responseType = "json";
			
			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					console.log(xhr.response);
					
					document.getElementById("modalPicName").innerHTML = xhr.response.name;
					document.getElementById("modalPicSize").innerHTML = xhr.response.sizeKiloBytes + " " + "${t("field-size-kilobytes")}";
					
					var creationDateLang;
	            	// Associate the good date in function of the language chosen
	            	if (website.lang == "en") {
	            		creationDateLang = xhr.response.creationDateEn;
	            	} else if (website.lang == "fr") {
	            		creationDateLang = xhr.response.creationDateFr;
	            	}
	            	
	            	creationDateLang = creationDateLang.split("_")[0] + " - " + creationDateLang.split("_")[1];
					document.getElementById("modalPicDate").innerHTML = creationDateLang;
				}
			}
			
			xhr.send();
		}
		
		deletePicture.onclick = function() {
			var currentPicId = idForModalLabel.innerHTML;
			
			let xhr = new XMLHttpRequest();

			xhr.open("GET", webservice.deletePic + currentPicId);
			xhr.send();

			setTimeout(function(){ window.location.href = "/EquiFinder/"; }, 10);
		}
	</script>
`;
