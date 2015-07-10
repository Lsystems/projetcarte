// traduction string des valeurs intégrale des cartes
var tradFigure=["valet","dame","roi","as"];
var tradEnseigne=["Coeur","Carreau","Pique","Trèfle"];

function tradCarte(card){
	// traduction figure
	this.tradCardFigure=function(){
		var figure = card.figure;
	// si on dépasse le 10, on passe sur la traduction de figure, -11 pour retrouver l'index du tableau de traduction de figure	
		if(figure>10){
			figure=tradFigure[card.figure-11];
		}
		return figure;
	}(card); // closure pour attendre la boucle
	
	// traduction enseigne
	this.tradCardEnseigne=function(){
		// -1 pour retrouver l'index du tableau de traduction d'enseigne
		var enseigne = tradEnseigne[card.enseigne-1];
		return enseigne;
	}(card);// closure pour attendre la boucle
	

}

// objet carte
function carte(){
	this.figure,
	this.enseigne
}

//constitution du sabot
function sabot(){
	// tableau des figure possibles
	this.possibleFigure=[2,3,4,5,6,7,8,9,10,11,12,13,14],
	// tableau des enseignes possibles
	this.possibleEnseigne=[1,2,3,4],
	// on constitue le sabot
	this.pile=function(){
		// tableau contenant toutes les cartes
		var cardArray=[];
		for(var figure=0, enseigne=0; figure<this.possibleFigure.length, enseigne<this.possibleEnseigne.length; figure++){
			// si on a passé la série, on change d'enseigne et on réinitialise les figures
			if(figure>=this.possibleFigure.length){enseigne++; figure=0};
			
			// si on a pas encore toute les enseignes (évite de générer une carte vide)
			if(enseigne<this.possibleEnseigne.length){
				// on créer un nouvelle carte
				var tempCard=new carte();
				// on remplit la carte avec sa figure
				tempCard.figure=this.possibleFigure[figure];
				// on remplit la carte avec son enseigne
				tempCard.enseigne=this.possibleEnseigne[enseigne];
				cardArray.push(tempCard);
			}
			
		}
		
		// on mélange le sabot (4 fois)
		for(var melange=0; melange<4; melange++){
			shuffle(cardArray);
		}
		return cardArray;
	}
}

// fonction de mélange
function shuffle(array){
	var m = array.length, t, i;
	// Tant qu'il reste des carte à mélanger
	while (m) {
		
		// on désigne quelle carte va etre swapper dans le tableau
		i = Math.floor(Math.random() * m--);
		
		// et on la swap avec la dernière carte puis l'avant dernière etc...
		t = array[m]; //assignation de la carte depuis la fin avant le swap
		// inversion des cartes entre elle dans le meme tableau
		array[m] = array[i];
		array[i] = t;
	}
}

// fonction de distribution
function distribution(){
	// on appel les règles de départ
	var regles=new reglesDeDepart();
	
	// on appel le sabot
	var distrib=new sabot();
	
	// on créer une variable contenant les 52 cartes, pour la traiter, sinon le nombre de carte reste celui de l'objet sabot
	this.donne=distrib.pile();
	
	// on créer les joueurs
	for (var lenombredecarteadistribuer=0;lenombredecarteadistribuer<regles.nbJoueur;i++){
		// et on les rentre dans le tableau des joueurs
		joueurArray.push(new player(i,"Joueur "+i));
	}
	

	// on distribue
	var nbCarte=regles.nbCarteJoueur*regles.nbJoueur; // nombre total de carte à donner
	var nbjoueur=regles.nbJoueur; // nombre de joueur
	var carteToPlayer=0;// a quelle joueur on donne la carte
	
	// tant qu'il reste des cartes à distribuer
	while(nbCarte){
		// on pousse la premiere carte de la pioche dans la main du joueur
		joueurArray[carteToPlayer].main.push(this.donne.shift());
		// on change de joueur
		carteToPlayer++;
		// si on a distribué le dernier joueur au tour, on réinitialise
		if(carteToPlayer>=joueurArray.length){
			carteToPlayer=0;
		}
		nbCarte--;
	}
	

	

}