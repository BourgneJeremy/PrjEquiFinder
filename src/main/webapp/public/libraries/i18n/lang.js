function chooseLang() {
	if (website.lang == "fr") {
		const t = i18n.create({
		  values:{
			  "nav-title": "EquiFinder",
			  "nav-home": "Accueil",
			  "nav-add": "Ajouter",
			  "nav-find": "Rechercher",
			  
			  "home-title": "Base de données d'images",
			  
			  "home-error-nopictures": "Vous n'avez aucune image dans votre base de données",
			  
			  "home-paging-first": "Première page",
			  "home-paging-last": "Dernière page",
			  "paging-page": "Page ",
			  
			  "home-btn-add": "Ajouter une image",
			  
			  "card-name": "Nom :",
			  "card-extension": "Extension :",
			  "card-size": "Taille :",
			  "card-size-bytes": "octets",
			  "card-date": "Date de création :",
			  
			  "card-footer-more": "Plus d'informations",
			  "card-footer-delete": "Supprimer cette image",
			  
			  "add-title": "Ajouter une ou plusieurs images",
			  "add-subtitle": "Envoyez vos images ci-dessous",
			  
			  "find-title": "Rechercher une image",
			  "find-subtitle": "Envoyez l'image que vous voulez chercher ci-dessous",
			  "find-back-btn": "Retour",
			  
			  "dragndrop-label": "Glissez & déposez les fichiers ici",
			  "dragndrop-btn": "Ouvrir le navigateur de fichiers",
			  "dragndrop-list-title": "Liste de fichiers ajoutés",
			  "dragndrop-list-subtitle": "Aucun fichier ajouté",
			  
			  "dragndrop-content-title": "Statut :",
			  
			  "dragndrop-content-waiting": "En attente de téléchargement",
			  "dragndrop-content-downloading": "Téléchargement...",
			  "dragndrop-content-cancel": "Annulé par l\'utilisateur",
			  "dragndrop-content-success": "Téléchargement effectué",
			  "dragndrop-content-error": "Échec du téléchargement",
			 
			  "errors-title-single": "Erreur",
			  "errors-title-plural": "Erreurs",
			  
			  "picture-wrong-size": "La taille de l'image ne doit pas dépasser",
			  "picture-wrong-size-title": "mégaoctets",
			  "picture-wrong-ext": "Les formats d\'image acceptés sont",
			  "picture-wrong-names": "Fichiers non téléchargés :",
			  "picture-not-found": "Aucune image correspondante n'a été trouvée. Veuillez Réessayer",
			  
			  "footer-title": "EquiFinder -- @studec",
				  
		      "more-modal-title": "Plus d'informations",
		      "more-modal-fullname": "Nom complet",
		      "more-modal-size": "Taille",
		      "more-modal-creationdate": "Date de création",
		      "more-modal-btn-close": "Fermer",
		      
		      "field-size-kilobytes": "kilo octets",
		      
		      "delete-modal-title": "Êtes-vous sûr ?",
		      "delete-modal-content": "Voulez-vous vraiment supprimer cette image ?",
		      "delete-modal-btn-cancel": "Annuler",
		      "delete-modal-btn-ok": "Oui"
		  }
		});
		return t;
		
	} else if (website.lang == "en") {
		const t = i18n.create({
		  values:{
			  "nav-title": "EquiFinder",
			  "nav-home": "Home",
			  "nav-add": "Add",
			  "nav-find": "Find",
			  
			  "home-title": "Database pictures",
			  "home-page": "Page ",
			  
			  "home-error-nopictures": "You don't have any pictures in your database",
			  
			  "home-paging-first": "First page",
			  "home-paging-last": "Last page",
			  "paging-page": "Page ",
			  
			  "home-btn-add": "Add an image",
			  
			  "card-name": "Name :",
			  "card-extension": "Extension :",
			  "card-size": "Size :",
			  "card-size-bytes": "bytes",
			  "card-date": "Creation date :",
			  
			  "card-footer-more": "More information",
			  "card-footer-delete": "Delete this picture",
			  
			  "add-title": "Add one or more images",
			  "add-subtitle": "Send your pictures below",
			  
			  "find-title": "Search for an image",
			  "find-subtitle": "Send the image you want to search below",
			  "find-back-btn": "Go back",
			  
			  "dragndrop-label": "Drag & drop files here",
			  "dragndrop-btn": "Open the file browser",
			  "dragndrop-list-title": "List of added files",
			  "dragndrop-list-subtitle": "No files added",
			  
			  "dragndrop-content-title": "Status :",
			  
			  "dragndrop-content-downloading": "Downloading...",
			  "dragndrop-content-cancel": "Cancelled by the user",
			  "dragndrop-content-waiting": "Waiting for download",
			  "dragndrop-content-success": "Download completed",
			  "dragndrop-content-error": "Download failed",
			 
			  "errors-title-single": "Error",
			  "errors-title-plural": "Errors",
			  
			  "picture-wrong-size": "The size of the image must not exceed",
			  "picture-wrong-size-title": "megabytes",
			  "picture-wrong-ext": "The accepted image formats are",
			  "picture-wrong-names": "Files not downloaded :",
			  "picture-not-found": "No matching images were found. Please try again",
			  
			  "footer-title": "EquiFinder -- @studec",
			  
			  "more-modal-title": "More information",
		      "more-modal-fullname": "Full name",
		      "more-modal-size": "Size",
		      "more-modal-creationdate": "Creation date",
		      "more-modal-btn-close": "Close",
		      
		      "field-size-kilobytes": "kilobytes",
		      
		      "delete-modal-title": "Are you sure ?",
		      "delete-modal-content": "Do you really want to delete this picture ? ",
		      "delete-modal-btn-cancel": "Cancel",
		      "delete-modal-btn-ok": "Yes"
		  }
		});
		return t;
	}
}

export const t = chooseLang();

// Header
document.getElementById("nav-title").innerHTML = t("nav-title")

document.getElementById("nav-home").innerHTML = t("nav-home")
document.getElementById("nav-add").innerHTML = t("nav-add")
document.getElementById("nav-find").innerHTML = t("nav-find")

// Footer
document.getElementById("footer-text").innerHTML = t("footer-title");

