<?php
ini_set('display_errors', '1');
ini_set('error_reporting', E_ALL);
setlocale (LC_ALL, 'fr_FR.utf8');
date_default_timezone_set('Europe/Paris');

class ProduitsManager
{
	private $_db;//Variable contenant la connexion à la bdd
	
	/**
	 * Constructeur de la classe
	* */
	public function ProduitsManager()
	{
		$this->setDb();
	}

// CREATION du produit 
  public function createProduit($designation,$prix,$tva){
	 $item = $this->_db->prepare('INSERT INTO produit SET designation = :nom, prix = :price, tva =:taxe');
	 $item->bindValue(':nom', $designation);
	 $item->bindValue(':price', $prix);
	 $item->bindValue(':taxe', $tva);
	 $item->execute();
	 $item->closeCursor();
  }
  
  // UPDATE  d'un produit  

  public function updateProduit($id,$nom,$prix,$categorie,$tva){
	 $item = $this->_db->prepare('UPDATE produit SET designation = :name, prix = :price, tva =:taxe, id_categorie=:cat WHERE id = :idMod');
	 $item->bindValue(':idMod', $id);
	 $item->bindValue(':name', $nom);
	 $item->bindValue(':price', $prix);
	 $item->bindValue(':taxe', $tva);
	 $item->bindValue(':cat', $categorie);
	 $item->execute();
	 $item->closeCursor();
  }
   // suppression d'un produit
  public function deleteProduit($idSuppr)
  {
	  $del = $this->_db->prepare('DELETE FROM produit WHERE id = :idSu');
	  $del->bindValue(':idSu', $idSuppr, PDO::PARAM_INT);
	  $del->execute();
	  $del->closeCursor();
  } 
// CREATION d'une catégorie 
  public function createCategorie($nom,$couleur){
	 $item = $this->_db->prepare('INSERT INTO categorie_produit SET categorie_nom = :nom, couleur = :color');
	 $item->bindValue(':nom', $nom);
	 $item->bindValue(':color', $couleur);
	 $item->execute();
	 $item->closeCursor();
  }
  
// UPDATE  d'une catégorie 

  public function updateCategorie($id,$nom,$couleur){
	 $item = $this->_db->prepare('UPDATE categorie_produit SET categorie_nom = :name, couleur=:color WHERE id = :idMod');
	 $item->bindValue(':idMod', $id);
	 $item->bindValue(':name', $nom);
	 $item->bindValue(':color', $couleur);
	 $item->execute();
	 $item->closeCursor();
  }
  
// on récupère toutes les catégories 
    public function getSummaryListCategories(){
		$item = $this->_db->prepare('SELECT * FROM categorie_produit WHERE id>0 ORDER BY categorie_nom ASC');
		//$item->bindParam(':limit', $limit, PDO::PARAM_INT);
		$item->execute();

		$categorieArray=array();
		$i=0;
		 while( $produit = $item->fetch(PDO::FETCH_ASSOC))
		 {
		 
				// on remplit le tableau
				$categorieArray[$i]=$produit; 
				$i++;
		 }
		 
		 $item->closeCursor();	// on ferme le curseur de lecture
		 return $categorieArray; // et on retourne le tableau
	} 
	
// on récupère une catégories 
    public function getCategorie($idCat){
		$item = $this->_db->prepare('SELECT * FROM categorie_produit WHERE id=:idSpec');
		$item->bindValue(':idSpec', $idCat);
		$item->execute();
		while( $cat = $item->fetch(PDO::FETCH_ASSOC))
		 {
			$categorie=$cat;

		 }

		$item->closeCursor();
		return $categorie;
		
	} 
  
  
  
  	 // on récupère tous les produits 
    public function getSummaryListProducts()
  {
	  

	$item = $this->_db->prepare('SELECT * FROM produit WHERE id>0 ORDER BY prix ASC');
	//$item->bindParam(':limit', $limit, PDO::PARAM_INT);
	$item->execute();

    $produitArray=array();
	$i=0;
     while( $produit = $item->fetch(PDO::FETCH_ASSOC))
     {
	 
			// on remplit le tableau
			$produitArray[$i]=$produit; // $produit = array
			$i++;
     }
     
     $item->closeCursor();	// on ferme le curseur de lecture
     return $produitArray; // et on retourne le tableau

  }  
  
  // suppression d'une categorie
  public function deleteCategorie($idSuppr)
  {
	  $del = $this->_db->prepare('DELETE FROM categorie_produit WHERE id = :idSu');
	  $del->bindValue(':idSu', $idSuppr, PDO::PARAM_INT);
	  $del->execute();
	  $del->closeCursor();
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
