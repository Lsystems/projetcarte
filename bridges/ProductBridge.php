
<?php 
ini_set('display_errors', '1');
ini_set('error_reporting', E_ALL);


require '../action/ProductManager.php';
$ProduitsManager = new ProduitsManager();

// écriture d'un nouveau produit
if(isset($_POST['flag']) && $_POST['flag']=="create"){
	$ProduitsManager->createProduit($_POST['designation'],$_POST['prix'],$_POST['tva']);
}

// mise à jour d'un produit
if(isset($_POST['flag']) && $_POST['flag']=="updateproduit"){
	$ProduitsManager->updateProduit($_POST['id'],$_POST['prodname'],$_POST['prodprix'],$_POST['prodcat'],$_POST['prodtva']);
}

// suppression d'un produit
if(isset($_POST['flag']) && $_POST['flag']=="deleteproduit"){
	$ProduitsManager->deleteProduit($_POST['id']);
}

// écriture d'une nouvelle catégorie
if(isset($_POST['flag']) && $_POST['flag']=="writecategorie"){
	$ProduitsManager->createCategorie($_POST['catname'],$_POST['catcolor']);
}

// mise à jour d'une catégorie
if(isset($_POST['flag']) && $_POST['flag']=="updatecategorie"){
	$ProduitsManager->updateCategorie($_POST['id'],$_POST['catname'],$_POST['catcolor']);
}

// suppression d'une catégorie
if(isset($_POST['flag']) && $_POST['flag']=="deletecategorie"){
	$ProduitsManager->deleteCategorie($_POST['id']);
}

// affichage des catégories partie interface
if($_GET['flag']=="listcat"){
	$listeCategorie=$ProduitsManager->getSummaryListCategories();
	foreach($listeCategorie as $key=>$value){
		echo '
			<div class="cat_item" style="background:'.$value['couleur'].'" data-categorie="'.$value['id'].'">'.$value['categorie_nom'].'
				
			</div>
		';
	}
}	
// affichage des catégories partie admin
if($_GET['flag']=="listcatAdmin"){
	$listeCategorie=$ProduitsManager->getSummaryListCategories();
	foreach($listeCategorie as $key=>$value){
		
		echo '
			<div class="admincatitem" data-categorie="'.$value['id'].'">
			<div class="color" data-color="'.$value['couleur'].'" style="background:'.$value['couleur'].'"></div>
				<div class="intitule">'.$value['categorie_nom'].'</div>
				
				<div class="modify">Modifier</div>
				<div class="delete">Supprimer</div>
			</div>
		';
	}
}	
// affichage des catégories partie admin pour un select
if($_GET['flag']=="listcatAdminSelect"){
	$listeCategorie=$ProduitsManager->getSummaryListCategories();
	foreach($listeCategorie as $key=>$value){
		echo '
			<option data-cat="'.$value['id'].'">'.$value['categorie_nom'].'</option>
		';
	}
}	

// affichage des produits	
if($_GET['flag']=="listprod"){
	$listeProduits=$ProduitsManager->getSummaryListProducts();
	foreach($listeProduits as $key=>$value){
		echo '
			<div class="item" data-tva="'.$value['tva'].'" data-categorie="'.$value['id_categorie'].'">
				<div>'.$value['designation'].'</div>
				<div><span>'.$value['prix'].'</span>€</div>
			</div>
		';
	}
}	
						

// affichage des produits partie admin	
if($_GET['flag']=="listprodAdmin"){
	$listeProduits=$ProduitsManager->getSummaryListProducts();
	foreach($listeProduits as $key=>$value){
		$cat_name="indéfinie";
		$cat_color="";
		
		
		if(isset($value['id_categorie']) && !empty($value['id_categorie'])){
			$categorie=$ProduitsManager->getCategorie($value['id_categorie']);
			$cat_name=$categorie['categorie_nom'];
			$cat_color=$categorie['couleur'];
		}
		$tva="20";
		if($value['tva']==1){
			$tva="5,5";
		}
		
		echo '
			<div class="adminproditem" data-tva="'.$value['tva'].'" data-id="'.$value['id'].'">
				<div class="nomprod">'.$value['designation'].'</div>
				<div class="prixprod">'.$value['prix'].'€</div>
				<div class="tvaprod">TVA '.$tva.'%</div>
				<div class="catprod" style="background:'.$cat_color.'">'.$cat_name.'</div>
				<div class="modify">Modifier</div>
				<div class="delete">Supprimer</div>
			</div>
		';
	}
}	


?>

