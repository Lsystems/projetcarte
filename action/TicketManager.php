<?php
ini_set('display_errors', '1');
ini_set('error_reporting', E_ALL);
setlocale (LC_ALL, 'fr_FR.utf8');
date_default_timezone_set('Europe/Paris');

class TicketManager
{
	private $_db;//Variable contenant la connexion à la bdd
	
	/**
	 * Constructeur de la classe
	* */
	public function TicketManager()
	{
		$this->setDb();
	}

/******************************** TOOLBOX ****************/
	// savoir quelle ont été les dernièrs ID entré
  public function getlastID()
  {
	$item = $this->_db->prepare('SELECT MAX(numero_ticket) AS derniereID FROM ticket');


	$item->execute();

     while( $lastID = $item->fetch(PDO::FETCH_ASSOC))
     {
		return $lastID; // et on retourne l'ID dans le tableau associatif [derniereID=>1]
     }
  }
  
 // CREATION du ticket 
  public function createTicket($numero,$date,$montant,$typereglement,$tvacinq,$discount,$especerecues){
	 $item = $this->_db->prepare('INSERT INTO ticket SET numero_ticket = :numero, date = :date, montant =:montant, type_reglement=:typer, tvacing =:taxe, discount=:remise,	especes_recues=:espece ');
	 $item->bindValue(':numero', $numero);
	 $item->bindValue(':date', $date);
	 $item->bindValue(':montant', $montant);
	 $item->bindValue(':typer', $typereglement);
	 $item->bindValue(':taxe', $tvacinq);
	 $item->bindValue(':remise', $discount);
	 $item->bindValue(':espece', $especerecues);
	 $item->execute();
	 $item->closeCursor();
  } 
 // CREATION des entrées produits relatives au ticket
  public function createRelProduct($numero,$designation,$quantité,$prix,$tva){
	 $item = $this->_db->prepare('INSERT INTO vente SET nom_produit = :name, numero_ticket = :numero, quantite =:qty, prix=:prix, tva =:taxe');
	 $item->bindValue(':numero', $numero);
	 $item->bindValue(':name', $designation);
	 $item->bindValue(':qty', $quantité);
	 $item->bindValue(':prix', $prix);
	 $item->bindValue(':taxe', $tva);
	 $item->execute();
	 $item->closeCursor();
  }
  
 // CREATION d'une facture
  public function createFacture($numero,$nom,$adresse,$cpville){
	 $item = $this->_db->prepare('INSERT INTO facture SET 	numero_ticket = :numero, nom = :nom, adresse =:adresse, zipcode=:zip');
	 $item->bindValue(':numero', $numero);
	 $item->bindValue(':nom', $nom);
	 $item->bindValue(':adresse', $adresse);
	 $item->bindValue(':zip', $cpville);
	 $item->execute();
	 $item->closeCursor();
  }
  
  // AFFICHAGE d'un ticket

  public function getTicket($idTicket){
	$item = $this->_db->prepare('SELECT * FROM ticket JOIN vente ON ticket.numero_ticket=vente.numero_ticket WHERE ticket.numero_ticket=:idti');
	$item->bindParam(':idti', $idTicket, PDO::PARAM_INT);
	$item->execute();

    $ticketArray=array();
	$i=0;
     while( $ticket = $item->fetch(PDO::FETCH_ASSOC))
     {
	 
			// on remplit le tableau
			$ticketArray[$i]=$ticket;
			$i++;
     }
     
     $item->closeCursor();	// on ferme le curseur de lecture
     return $ticketArray; // et on retourne le table

  }
  
  public function getTicketsOfDay($midnight,$today){
	$item = $this->_db->prepare('SELECT * FROM ticket WHERE date >= '.$midnight.' AND date < '.$today);
	$item->execute();

    $ticketArray=array();
	$i=0;
     while( $ticket = $item->fetch(PDO::FETCH_ASSOC))
     {
	 
			// on remplit le tableau
			$ticketArray[$i]=$ticket;
			$i++;
     }
     
     $item->closeCursor();	// on ferme le curseur de lecture
     return $ticketArray; // et on retourne le table

  }
  public function getTicketsSearch($startdate,$enddate){
	$item = $this->_db->prepare('SELECT * FROM ticket WHERE date >= '.$startdate.' AND date < '.$enddate);
	$item->execute();

    $ticketArray=array();
	$i=0;
     while( $ticket = $item->fetch(PDO::FETCH_ASSOC))
     {
	 
			// on remplit le tableau
			$ticketArray[$i]=$ticket;
			$i++;
     }
     
     $item->closeCursor();	// on ferme le curseur de lecture
     return $ticketArray; // et on retourne le table

  }
  
  /**
   * Initialise la connexion à la bdd
   * */
  public function setDb()
  {
	  include 'connexionBdd.php';
    $this->_db = $bdd;
    
    //echo '<br/>Passage dans la fonction de connexion à la bdd.<br/>';
  }
}
?>
