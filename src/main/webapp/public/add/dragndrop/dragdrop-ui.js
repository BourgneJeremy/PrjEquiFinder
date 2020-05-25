import { filesTemplate } from "../../../views/templates/templates.js"; 

/*
   * Some helper functions to work with our UI and keep our code cleaner
   */

// Creates a new file and add it to our list
export function multi_add_file(id, file)
{
  var template = filesTemplate;
  template = template.replace('%%filename%%', file.name);

  template = $(template);
  template.prop('id', 'uploaderFile' + id);
  template.data('file-id', id);

  $('#files').find('li.empty').fadeOut(); // remove the 'no files yet'
  $('#files').prepend(template);
}

// Changes the status messages on our list
export function multi_update_file_status(id, status, message)
{
  $('#uploaderFile' + id).find('span').html(message).prop('class', 'status text-' + status);
}

// Updates a file progress, depending on the parameters it may animate it or change the color.
export function multi_update_file_progress(id, percent, color, active)
{
  color = (typeof color === 'undefined' ? false : color);
  active = (typeof active === 'undefined' ? true : active);

  var bar = $('#uploaderFile' + id).find('div.progress-bar');
  
  bar.width(percent + '%').attr('aria-valuenow', percent);
  bar.toggleClass('progress-bar-striped progress-bar-animated', active);

  if (percent === 0){
    bar.html('');
  } else {
    bar.html(percent + '%');
	// bar.html("Échec du téléchargement");
  }

  if (color !== false){
    bar.removeClass('bg-success bg-info bg-warning bg-danger');
    bar.addClass('bg-' + color);
  }
}

// Filtering
export function filterFiles(files) {
	var isSizeOkay = sizeFiltering(files.size);
	var isExtensionOkay = extensionFiltering(files.name);
	var errorMessage;

	if (isSizeOkay && isExtensionOkay) {
		return true;
	} else if (isSizeOkay && !isExtensionOkay) {
		errorMessage = 'Format non supporté. Les extensions supportés sont : ".png", ".jpg" et ".tif"';
		return errorMessage;
	} else if (isExtensionOkay && !isSizeOkay) {
		errorMessage = 'La taille doit être comprise entre 10 octets et 3 mégabits.';
		return errorMessage;
	} else {
		errorMessage = 'L\'extension et la taille ne sont pas supportés.';
		return errorMessage;
	}
}

export function sizeFiltering(size) {
	//3 000 000
	// between 10 octets and 3mb here
	if (size < 3000000 && size > 10) {
		return true
	} else {
		return false;
	}
}

export function extensionFiltering(name) {
	var fileExtension = (name.slice((name.lastIndexOf('.') - 1 >>> 0) + 2)).toLowerCase();
	
	if (name.includes("jpg") || name.includes("png") || name.includes("tif")) {
		return true;
	} else {
		return false;
	}
}