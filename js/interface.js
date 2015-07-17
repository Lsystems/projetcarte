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

/* affichage de l'interface */
function affichage(){
	this.pioche=function(pioche){
		$("#pioche").html("");
		// pour le tableau
		$.each(pioche, function(index,value){

			var carte=new tradCarte(value);
			
			$("#pioche").append("<div>["+(index+1)+"] - "+carte.tradCardFigure+" "+carte.tradCardEnseigne+"</div>");
			
		});
	}
	//affichage plateau joueurs
	this.board=function(){
		$.each(joueurArray, function(index,value){
			var main=value.main;
			var numjoueur=value.numJoueur;
			// plateau joueur temporaire dev
			$("#playerboard").append('<div data-joueur="'+numjoueur+'" class="joueur"><div class="nomjoueur">'+value.nom+'</div><div class="main emplacement"></div></div>');
			// constitution du tapis
			$("#tapis").append('<div data-joueur="'+numjoueur+'" class="joueur"><div class="nomjoueur">'+value.nom+'</div></div>');
		});
	}
	
	// affichage joueur
	this.player=function(cmd,joueur,carte){
		if(cmd=="refreshall"){
			// boucle pour l'affichage joueur
			$.each(joueurArray, function(index,value){
				var main=value.main
				var numjoueur=value.numJoueur;
				$("#playerboard .joueur[data-joueur="+numjoueur+"] .main").html("");
				// affichage des mains des joueurs
				$.each(main, function(index,value){
					var carte=new tradCarte(value);
					$("#playerboard .joueur[data-joueur="+numjoueur+"] .main").append('<div data-index="'+index+'">'+carte.tradCardFigure+' '+carte.tradCardEnseigne+'</div>');
				});
			});
		}
		if(cmd=="removecard"){
			$("#playerboard .joueur[data-joueur="+joueur+"] .main div[data-index="+carte+"]").remove();
		}
	}
	this.emplacement=function(place,tirage){
	// alert();
		
		if(place=="defausse"){
			var carte=new tradCarte(tirage);
			var carte=new tradCarte(tirage);
			$("#defausse").append('<div>'+carte.tradCardFigure+' '+carte.tradCardEnseigne+'</div>');
		}
		if(place=="tapis"){
			var carte=new tradCarte(tirage);
			$("#tapis .joueur[data-joueur="+regles.joueur+"]").append('<div class="carte">'+carte.tradCardFigure+' '+carte.tradCardEnseigne+'</div>');
		}
		if(place=="resetall")
			$("#defausse div, #tapis .joueur .carte").remove();
		
	}
	
	this.playerSwitcher=function(joueur){
		$("#playerboard .nomjoueur").removeAttr("style");
		$("#playerboard .joueur[data-joueur="+joueur+"] .nomjoueur").css("background","green");
	}
	
	this.fancybox=function(flag,idMess,res){
		if(flag=="create"){
			var message=[
				"Vous devez choisir la couleur demandée !",
				res+" gagne le pli",
				"Nouveau tour !<br/>",
				"A "+res+" de jouer"
			];
			$('body').prepend('<div id="fancybox"><div class="box"><div class="fancyboxmessage">'+message[idMess]+'</div><div class="fancyclose">OK</div></div></div>');
			
			$('.fancyclose').click(function(){
				$("#fancybox").remove();
			});
		
		}
	}
}

$(window).load(function(){
		display.board();
		display.player("refreshall");
		display.pioche(jeu.pioche);
		$("#playerboard .nomjoueur").removeAttr("style");
		$("#playerboard .joueur[data-joueur="+jeu.regles.joueur+"] .nomjoueur").css("background","green");
		$("#playerboard").on("click",".joueur .main div",function(){
			var player=parseInt($(this).parents(".joueur").data("joueur"));
			var cardindex=parseInt($(this).data("index"));
			tour(cardindex,player);
			
		});
});