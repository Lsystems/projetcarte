function displaypioche(pioche){
	// pour le tableau
	$.each(pioche, function(index,value){

		var carte=new tradCarte(value);
		
		$("#pioche").append("<div>["+(index+1)+"] - "+carte.tradCardFigure+" "+carte.tradCardEnseigne+"</div>");
		
	});
}

$(window).load(function(){
	
	var jeu=new distribution();
		// boucle pour l'affichage joueur

		$.each(joueurArray, function(index,value){
			var main=value.main;
			var numjoueur=value.numJoueur
			// plateau joueur temporaire dev
			$("#playerboard").append('<div data-joueur="'+numjoueur+'" class="joueur"><div class="nomjoueur">'+value.nom+'</div><div class="main"></div></div>');
			// constitution du tapis
			$("#tapis").append('<div data-joueur="'+numjoueur+'" class="joueur"><div class="nomjoueur">'+value.nom+'</div><div class="carte"></div></div>');
			
			$.each(main, function(index,value){
				var carte=new tradCarte(value);
				$("#playerboard .joueur[data-joueur="+numjoueur+"] .main").append('<div data-figure='+value.figure+' data-enseigne='+value.enseigne+'>'+carte.tradCardFigure+' '+carte.tradCardEnseigne+'</div>');
			});
		});
		
		tirage(jeu.donne);
		displaypioche(jeu.donne);
		tour();
});