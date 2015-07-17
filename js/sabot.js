
// objet carte
function carte(figure,enseigne){
	this.figure=figure,
	this.enseigne=enseigne
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
				// on créer un nouvelle carte avec sa figure et son enseigne
				var tempCard=new carte(this.possibleFigure[figure],this.possibleEnseigne[enseigne]);
				// et on la pousse dans la pile
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
	this.regles=new reglesDeDepart();
	
	// on appel le sabot
	var createSabot=new sabot();
	
	// on créer une variable contenant les 52 cartes, pour la traiter, sinon le nombre de carte reste celui de l'objet sabot
	this.pioche=createSabot.pile();
	// si il y a 3 joueurs, on enlève une carte
	if(regles.nbJoueur==3){
		// alert(sabot.length);
		var out=this.pioche.splice(Math.floor(Math.random() * sabot.length),1);
	}	
	this.premierTour=function(){
		// on créer les joueurs
		for (var i=0;i<this.regles.nbJoueur;i++){
			// et on les rentre dans le tableau des joueurs
			joueurArray.push(new player(i,"Joueur "+i));
		}

		// on distribue
		var nbCarte=this.regles.nbCarteJoueur*this.regles.nbJoueur; // nombre total de carte à donner
		
		var carteToPlayer=0;// a quelle joueur on donne la carte
		
		// tant qu'il reste des cartes à distribuer
		while(nbCarte){
			// on pousse la premiere carte de la pioche dans la main du joueur
			joueurArray[carteToPlayer].main.push(this.pioche.shift());
			// on change de joueur
			carteToPlayer++;
			// si on a distribué le dernier joueur au tour, on réinitialise
			if(carteToPlayer>=joueurArray.length){
				carteToPlayer=0;
			}
			nbCarte--;
		}

	}
	
	// fonction qui donne une carte à un joueur donné.
	this.giveCard=function(carteToPlayer){
		joueurArray[carteToPlayer].main.push(this.pioche.shift());
		
	}
	
	this.tri=function(flag){
	
		if(flag=="all"){
		
			for(var i=0;i<joueurArray.length;i++){
			
				compare(joueurArray[i].main);
			}
		}
		if(typeof flag=="number"){
			compare(joueurArray[flag].main);
		}
	}
	
	
}// end distribution

// fonctions de tri des mains des joueurs
function compare(main){
	function compareEnseigne(a,b) {
		if (a.enseigne < b.enseigne)
			return -1;
		if (a.enseigne > b.enseigne)
			return 1;
		return 0;
	}
	function compareFigure(a,b) {
		if (a.enseigne==b.enseigne && a.figure < b.figure){
			return -1;
		}
		else if (a.enseigne==b.enseigne && a.figure > b.figure){
			return 1;
		}
		else{
			return 0;
		}
	}
	main.sort(compareEnseigne);
	main.sort(compareFigure);
}
