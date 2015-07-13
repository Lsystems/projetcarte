function reglesDeDepart(){
	// nombre de joueur
	this.nbJoueur=3,
	// nombre de cartes distribuées par joueur
	this.nbCarteJoueur=7,
	this.distributeur=0, // joueur distributeur en début de partie
	this.joueur=1, // joueur au tour
	this.endTour=0, // nombre de jeu avant la fin du tour
	this.enseigneDemande, // l'enseigne demandée lors du tour
	this.cartejouees=[] // le tableau des cartes qui seront jouée prendant le tour
}

// après la distribution et à chaque fin de tour
function tirage(sabot){
	var regles=new reglesDeDepart();
	// si il y a 3 cartes, on en enlève une
	if(regles.nbJoueur==3){
		// alert(sabot.length);
		var out=sabot.splice(Math.floor(Math.random() * sabot.length),1);
	}
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
			// l'index du tableau=le numéro de joueur !!!
			regles.cartejouees[regles.joueur]=carte;
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
				
				resolution(regles);
			}
		}
	}
} // end tour

function resolution(regles){
	// on analyse les cartes jouées
	for(var i=0;i<regles.cartejouees.length;i++){
		var carte=regles.cartejouees[i];
		// si la carte n'est pas un atout
		if(carte.enseigne!=reglesDeDepart.atout){
			//si la carte n'a pas la couleur demandée
			if(carte.enseigne!=regles.enseigneDemande){
				// on l'enlève du tapis 
				regles.cartejouees[i]="";
			}
			else{
				regles.cartejouees[i].couleurdemandee=true;
			}	
		}
		else{
			
			regles.cartejouees[i].atout=true;
		}
	}
	compare(regles);
}

function compare(regles){
	for(var i=0;i<regles.cartejouees.length;i++){
		var carte=regles.cartejouees[i];
		// si une carte est atout
		if(carte.hasOwnProperty("atout")){
			// on la compare avec toutes les autres cartes jouées
			for(var a=0;a<regles.cartejouees.length;a++){
				// si une des cartes n'est pas atout mais de la couleur demandées, alors elle perd
				if(regles.cartejouees[a].hasOwnProperty("couleurdemandee") && regles.cartejouees[a].couleurdemandee!=reglesDeDepart.atout){
					regles.cartejouees[a]="";
				}
				// si une des cartes est atout alors on la compare
				if(regles.cartejouees[a].hasOwnProperty("atout")){
					// si la carte actuellement comparée est plus petite qu'une de celle qui reste, alors elle perd
					if(carte.figure<regles.cartejouees[a].figure){
						regles.cartejouees[i]="";
						break;
					}
				}
				
			}
		}
		// si une carte à la couleur demandée
		if(carte.hasOwnProperty("couleurdemandee")){
			console.log("regles.cartejouees["+i+"]")
			// on la compare avec toutes les autres cartes jouées
			for(var a=0;a<regles.cartejouees.length;a++){
				// si une des cartes a la couleur demandées
				if(regles.cartejouees[a].hasOwnProperty("couleurdemandee")){
					console.log("vs"+a);
					// si la carte actuellement comparée est plus petite qu'une de celle qui reste, alors elle perd
					if(carte.figure<regles.cartejouees[a].figure){
						console.log("dead card"+i);
						regles.cartejouees[i]="";
						break;
					}
				}				
			}
		}
		
	}
	console.log(regles.cartejouees);
}