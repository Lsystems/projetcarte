function reglesDeDepart(){
	// nombre de joueur
	this.nbJoueur=2,
	// nombre de cartes distribuées par joueur
	this.nbCarteJoueur=7,
	this.distributeur=0, // joueur distributeur en début de partie
	this.joueur=1, // joueur au tour
	this.endTour=0, // nombre de jeu avant la fin du tour
	this.enseigneDemande, // l'enseigne demandée lors du tour
	this.cartejouee=[] // le tableau des cartes qui seront jouée prendant le tour
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
		var main=joueurArray[regles.joueur].main;
		var carte=main[carteIndex];
		// on assigne la couleur pour le tour pour la premiere carte jouée du tour
		if(regles.endTour==0){
			regles.enseigneDemande=carte.enseigne;
		}
		
		//vérification du réglementaire de la carte
		var legal=true;
		if(carte.enseigne!=regles.enseigneDemande){
			// on check la main du joueur
			for(var i=0; i<main.length; i++){
				// s'il a la couleur demandée
				if(main[i].enseigne==regles.enseigneDemande){
					alert("Vous devez jouer la couleur demandée !");
					legal=false;
					break;
				}
			}
		}
		// si la carte est réglementaire
		if(legal==true){
			// on rentre la carte dans le tableau des cartes jouées pour ce tour
			regles.cartejouee.push(carte);
			// on traduit la carte pour l'affichage
			displayCard=new tradCarte(carte);
			// on l'ajoute au tapis
			$("#tapis .joueur[data-joueur="+regles.joueur+"]").append('<div>'+displayCard.tradCardFigure+' '+displayCard.tradCardEnseigne+'</div>');
			
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
				
				resolution();
			}
		}
	}
} // end tour

function resolution(){

}