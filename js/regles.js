function reglesDeDepart(){
	// nombre de joueur
	this.nbJoueur=2,
	// nombre de cartes distribuées par joueur
	this.nbCarteJoueur=7,
	this.distributeur=0, // joueur distributeur en début de partie
	this.joueur=1, // joueur au tour
	this.endTour=0; // nombre de jeu avant la fin du tour
}

// après la distribution et à chaque fin de tour
function tirage(sabot){
	// on sort une carte du sabot
	var tirage=sabot.shift();
	var carte=new tradCarte(tirage);
	// on définit l'atout
	if(!reglesDeDepart.atout){
		reglesDeDepart.atout=tirage.enseigne;
	}
	// on l'ajoute au tapis
	$("#defausse").append('<div data-figure="'+tirage.figure+'" data-enseigne="'+tirage.enseigne+'">'+carte.tradCardFigure+' '+carte.tradCardEnseigne+'</div>');

}

function tour(regles,clickedCard){
		// si la carte vient de la main du joueur en cours
		if(parseInt($(clickedCard).parents(".joueur").data("joueur"))==regles.joueur){
			// on récupère l'objet de la carte chez le joueur concerné
			var carteIndex=parseInt($(clickedCard).data("index"));
			var carte=joueurArray[regles.joueur].main[carteIndex];
			console.log(carte,joueurArray[regles.joueur].main[carteIndex]);
			
			carte=new tradCarte(carte);
			// on l'ajoute au tapis
			$("#tapis .joueur[data-joueur="+regles.joueur+"]").append('<div>'+carte.tradCardFigure+' '+carte.tradCardEnseigne+'</div>');
			
			// on retire la carte de la main du joueur
			joueurArray[regles.joueur].main.splice(carteIndex,1);
			$(clickedCard).css("background","red");
			// $(this).remove();
			
			// on compte le tour comme joué
			regles.endTour+=1;
			console.log(joueurArray[regles.joueur].main);
			// si on a pas fini le tour
			if(regles.endTour!=regles.nbJoueur){
				// si on arrive à la fin du tableau des joueurs
				if(regles.joueur==joueurArray[joueurArray.length-1].numJoueur){
					
					regles.joueur=0; // on revient au début du tableau
				}else{
				// sinon on joue le prochain joueur du tableau
					regles.joueur+=1;
				}
				$("#playerboard .nomjoueur").removeAttr("style");
				$("#playerboard .joueur[data-joueur="+regles.joueur+"] .nomjoueur").css("background","green");
			}else {
				//si le tour est terminé
				
				//résolution();
			}
		}
	
}