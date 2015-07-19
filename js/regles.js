function reglesDeDepart(){
	// nombre de joueur
	this.nbJoueur=4,
	// nombre de cartes distribuées par joueur
	this.nbCarteJoueur=2,
	this.distributeur=0, // joueur distributeur en début de partie
	this.joueur=1, // joueur au tour
	this.endTour=0 // nombre de jeu avant la fin du tour
}

function roundControl(){
	this.carteEnJeu,
	this.enseigneDemande, // l'enseigne demandée lors du tour
	this.cartejouees=[] // le tableau des cartes qui seront jouées pendant le tour
}

// on créer un nouveau jeu

	var display=new affichage(); // on créer l'interface
	var jeu=new distribution(); // on créer un nouveau jeu
	var regles=jeu.regles; // règles globales
	jeu.premierTour(); // init premier tour
	var round=new roundControl(); //contrôle au tour
	jeu.tri("all"); 
	tirage();
	display.playerSwitcher(regles.joueur);
	
// après la distribution et à chaque fin de tour
function tirage(){
	
	if(regles.nbJoueur<4 && jeu.pioche.length>0){
		var sabot=jeu.pioche;
		// on sort une carte du sabot
		var tirage=sabot.shift();
		// on définit l'atout et la carte mise en jeu pour le tour (à 3 joueurs ou moins)
		if(!reglesDeDepart.atout){
			// definit atout pour la partie
			reglesDeDepart.atout=tirage.enseigne;
			//affiche atout
			display.emplacement("atout",reglesDeDepart.atout);
		}//affiche atout
			display.emplacement("atout",reglesDeDepart.atout);
		// on stock la carte mise en jeu provisoirement jusqu'a la fin du tour
		round.carteEnJeu=tirage;
		
		// on l'ajoute au tapis
		display.emplacement("defausse",tirage);
	}else if(regles.nbJoueur==4 && !reglesDeDepart.atout){
		reglesDeDepart.atout=joueurArray[Math.floor(Math.random() * joueurArray.length)].main[Math.floor(Math.random() * regles.nbCarteJoueur)];
		console.log(reglesDeDepart.atout);
		//affiche atout
		display.emplacement("atout",reglesDeDepart.atout.enseigne);
	}


}

function tour(carteIndex,playerclicker){
	
	// si la carte vient de la main du joueur en cours
	if(playerclicker==regles.joueur){
		
		// on récupère l'objet de la carte chez le joueur concerné
		var main=joueurArray[regles.joueur].main;
		var carte=main[carteIndex];
		// on assigne la couleur pour le tour pour la premiere carte jouée du tour
		if(regles.endTour==0){
			round.enseigneDemande=carte.enseigne;
		}
		
		//vérification du réglementaire de la carte
		var legal=true;
		if(carte.enseigne!=round.enseigneDemande){
			// on check la main du joueur
			for(var i=0; i<main.length; i++){
				// s'il a la couleur demandée
				if(main[i].enseigne==round.enseigneDemande){
					display.fancybox("create",0);
					legal=false;
					break;
				}
			}
		}
		// si la carte est réglementaire
		if(legal==true){
			// on rentre la carte dans le tableau des cartes jouées pour ce tour
			// l'index du tableau=le numéro de joueur !!!
			round.cartejouees[regles.joueur]=carte;
			// on l'ajoute au tapis
			display.emplacement("tapis",carte);

			// on retire la carte de la main du joueur
			joueurArray[regles.joueur].main.splice(carteIndex,1);
			// $(clickedCard).css("background","red");
			display.player("removecard",playerclicker,carteIndex);
			
			// on compte le tour comme joué
			regles.endTour+=1;
			// on décompte du sabot
			reglesDeDepart.sabotLength-=1;
			// si on a pas fini le tour
			if(regles.endTour!=regles.nbJoueur){
				// si on arrive à la fin du tableau des joueurs
				if(regles.joueur==joueurArray[joueurArray.length-1].numJoueur){
					
					regles.joueur=0; // on revient au début du tableau
				}else{
				// sinon on joue le prochain joueur du tableau
					regles.joueur+=1;
				}
				// affichage 
				display.playerSwitcher(regles.joueur);
			}else {
				//si le tour est terminé
				resolution(round);
			}
		}
	}
} // end tour

function resolution(round){
	// tableau constituant le pli qui sera remis au gagnant du tour
	var boitapli=[];
	// on analyse les cartes jouées
	for(var i=0;i<round.cartejouees.length;i++){
		var carte=round.cartejouees[i];
		//on met la carte dans la boitapli
		boitapli.push(carte);
		// si la carte n'est pas un atout
		if(carte.enseigne!=reglesDeDepart.atout){
			//si la carte n'a pas la couleur demandée
			if(carte.enseigne!=round.enseigneDemande){
				
				// on l'enlève du tapis 
				round.cartejouees[i]="";
			}
			else{
				// on la compare avec toutes les autres cartes jouées
				for(var a=0;a<round.cartejouees.length;a++){
					// si une des cartes a la couleur demandées
					if(round.cartejouees[a].enseigne==round.enseigneDemande){					
						// si la carte actuellement comparée est plus petite qu'une de celles qui restent, alors elle perd
						if(carte.figure<round.cartejouees[a].figure){
						
							round.cartejouees[i]="";
							break;
						}
					}				
				}
			}	
		}
		else{//si la carte n'est pas atout
			// on la compare avec toutes les autres cartes jouées
			for(var a=0;a<round.cartejouees.length;a++){
				// si une des cartes n'est pas atout mais de la couleur demandées, alors elle perd
				if(round.cartejouees[a].enseigne==round.enseigneDemande && round.cartejouees[a].enseigne!=reglesDeDepart.atout){
			
					round.cartejouees[a]="";
				}
				// si une des cartes est atout alors on la compare
				if(round.cartejouees[a].enseigne==reglesDeDepart.atout){
					// si la carte actuellement comparée est plus petite qu'une de celles qui restent, alors elle perd
					if(carte.figure<round.cartejouees[a].figure){
					
						round.cartejouees[i]="";
						break;
					}
				}
			}
		}
	}
	// on renvoi un tableau contenant uniquement la derniere carte gagnante, son index est celui du joueur gagnant et un autre tableau contenant toutes les cartes du pli.
	finDeTour(round.cartejouees,boitapli);
}

function finDeTour(result,boitapli){

	var joueurGagnant;
	if(regles.nbJoueur<4){
		// on se base sur le tableau des joueurs pour tout faire
		for(var i=0; i<joueurArray.length; i++){
			if(result[i]!=""){
				joueurGagnant=i; // on définit le joueur gagnant
			}else if(result[i]=="" && jeu.pioche.length>0){
				// sinon on donne de nouvelles cartes aux perdants
				joueurArray[i].main.push(jeu.pioche.shift());
			}
		}
		// on ajoute la carte mise en jeu à la main du gagnant
		if(typeof round.carteEnJeu!="undefined"){
			joueurArray[joueurGagnant].main.push(round.carteEnJeu);
		}
		joueurArray[joueurGagnant].pli.push(boitapli); // on donne le pli au gagnant
		
		
	}else{
		for(var i=0; i<joueurArray.length; i++){
			if(result[i]!="")
				joueurGagnant=i; // on définit le joueur gagnant
		}
		joueurArray[joueurGagnant].pli.push(boitapli); // on donne le pli au gagnant
		
	}
	jeu.tri("all"); // on retri les cartes
	display.player("refreshall"); // on actualise le tableau joueur
	display.emplacement("resetall"); // on vide les emplacements de carte jouées

	regles.joueur=joueurGagnant;//le gagnant commence le prochain tour
	display.playerSwitcher(joueurGagnant);
	
	//si on est arrivé à la fin de la partie
	if(reglesDeDepart.sabotLength<=0){
	alert();
		// on récupère le gagnant, celui qui a le plus de pli gagne
		var score=0,winner,nbpli;
		for(var i=0; i<joueurArray.length; i++){
			if(joueurArray[i].pli.length>score){
				score=joueurArray[i].pli.length;
				winner=i;
			}
		}
		// on affiche le gagnant de la partie avec son nom et son nombre de pli
		display.fancybox("create",4,[joueurArray[winner].nom,score]);
	}else{
		display.fancybox("create",1,joueurArray[joueurGagnant].nom);//on affiche le gagnant
		// sinon on continue la partie
		regles.endTour=0;
		round=new roundControl();// on lance un nouveau round
		tirage();
	}
	display.pioche(jeu.pioche);
}

