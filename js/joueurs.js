

//tableau des joueurs
var joueurArray=[];

/*
*	@parameters
*	playerNum=int,
*	playerName=string
*
*/
function player(playerNum,playerName){
	this.numJoueur=playerNum,
	this.nom=playerName,
	this.main=[],
	this.pli=[]
}