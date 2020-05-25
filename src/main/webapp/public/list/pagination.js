import { cards, pictureGalleryScript } from "../../views/templates/templates.js";
import { t } from "../../public/libraries/i18n/lang.js";

const xhr = new XMLHttpRequest();
const url = 'lister';
xhr.open("POST", url);
xhr.responseType = "json";

xhr.send();

var state = {
    "querySet": [],
    "page": 1,
    "rows": 9,
    "window": 5
}

xhr.onreadystatechange = (e) => {
  state.querySet = xhr.response;
  var url = window.location.pathname;
  
  if (url == "/EquiFinder/") {
	buildTable();
  }
}

function buildTable() {
    var row_1 = $('#row_1');
    var row_2 = $('#row_2');
    var row_3 = $('#row_3');

    var data = pagination(state.querySet, state.page, state.rows)
    
    if (data !== null) {

        var myList = data.querySet;
     
        if (myList.length == 0) {
        	var errPaging = document.getElementById("error-paging");
        	errPaging.innerHTML += `<div class='alert alert-info' role='alert'>
        								${t('home-error-nopictures')}
        							</div>`;
        } else {
            for (var i = myList.length - 1; i >= 0; i--) {
            	var name = myList[i].name;
            	
            	if (name.includes("\\")) {
            		name = name.substring(name.lastIndexOf("\\") + 1);
            	} else if (name.includes("/")) {
            		name = name.substring(name.lastIndexOf("/") + 1);
            	}
            	
            	var cardsTemplate = cards;
            	var picFullName = myList[i].name + "." + myList[i].extension;
            	
            	// href url
            	cardsTemplate = cardsTemplate.replace('%%webserviceFullPicture%%', webservice.show);
            	cardsTemplate = cardsTemplate.replace('%%picId%%', myList[i].picId);
            	
            	// download url
            	cardsTemplate = cardsTemplate.replace('%%webserviceDownload%%', webservice.download);
            	cardsTemplate = cardsTemplate.replace('%%picNameAndExt%%', picFullName);
            	
            	// thumbnail url
            	cardsTemplate = cardsTemplate.replace('%%webserviceThumbnail%%', webservice.showThumbnail);
            	cardsTemplate = cardsTemplate.replace('%%picId%%', myList[i].picId);
            	
            	cardsTemplate = cardsTemplate.replace('%%name%%', myList[i].name);
            	cardsTemplate = cardsTemplate.replace('%%extension%%', myList[i].extension);
            	cardsTemplate = cardsTemplate.replace('%%size%%', myList[i].size);
            	
            	var creationDateLang;
            	// Associate the good date in function of the language chosen
            	if (website.lang == "en") {
            		creationDateLang = myList[i].enDate;
            	} else if (website.lang == "fr") {
            		creationDateLang = myList[i].frDate;
            	}
            	
            	cardsTemplate = cardsTemplate.replace('%%creationDate%%', creationDateLang);
            	cardsTemplate = cardsTemplate.replace('%%pictureAlt%%', picFullName);

            	// modal
            	cardsTemplate = cardsTemplate.replace('%%idForModal%%', myList[i].picId);
            	cardsTemplate = cardsTemplate.replace('%%idForInfo%%', myList[i].picId);
            	
                var maxRowOne = 2;
                var minRowTwo = 2;
                var maxRowTwo = 5;

                if (i <= maxRowOne) {
                	row_1.prepend(cardsTemplate);
                } else if (i > minRowTwo && i <= maxRowTwo) {
                	row_2.prepend(cardsTemplate);
                } else {
                    row_3.prepend(cardsTemplate);
                }
                
                // Display the number of the page
                $("#pageNumber").text(t("paging-page") + state.page);
            }
            pageButtons(data.pages);
            
            var pictureGallery = pictureGalleryScript;
            $("#homePage").prepend(pictureGallery);
        }
    }
}

function pageButtons(pages) {
    var wrapper = document.getElementById('pagination-wrapper')

    wrapper.innerHTML = ``;

    var maxLeft = (state.page - Math.floor(state.window / 2))
    var maxRight = (state.page + Math.floor(state.window / 2))

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.window
    }

    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1)
        
        if (maxLeft < 1){
            maxLeft = 1
        }
        maxRight = pages
    }

    for (var page = maxLeft; page <= maxRight; page++) {
        wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info">${page}</button>`
    }

    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; ${t("home-paging-first")}</button>` + wrapper.innerHTML
    }

    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">${t("home-paging-last")} &#187;</button>`
    }

    $('.page').on('click', function() {
        $('#row_1').empty()
        $('#row_2').empty()
        $('#row_3').empty()

        state.page = Number($(this).val())

        buildTable()
    })

}

function pagination(querySet, page, rows) {

    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows
    
    if (trimEnd != 0) {
    	// Stopped here
    }
    
    
    if (querySet !== null) {
    	var trimmedData = querySet.slice(trimStart, trimEnd)
        var pages = Math.ceil(querySet.length / rows);

        return {
            'querySet': trimmedData,
            'pages': pages,
        }
    } else {
    	return null;
    }
}