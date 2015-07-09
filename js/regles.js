function reglesDeDepart(){
	// nombre de joueur
	this.nbJoueur=2,
	// nombre de cartes distribuées par joueur
	this.nbCarteJoueur=7
		
}

// après la distribution et à chaque fin de tour
function tirage(sabot){
	// on sort une carte du sabot
	var tirage=sabot.shift();
	var carte=new tradCarte(tirage);
	// on l'ajoute au tapis
	$("#defausse").append('<div data-figure="'+tirage.figure+'" data-enseigne="'+tirage.enseigne+'">'+carte.tradCardFigure+' '+carte.tradCardEnseigne+'</div>');

}

function tour(){
	$("#playerboard").on("click",".main div",function(){
			
	});
}