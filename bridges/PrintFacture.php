<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="UTF-8"/>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title>LOCKI</title>
		<meta name="description" content=""/>
		<meta name="keywords" content=""/>
		<meta name="author" content="" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="shortcut icon" href="favicon.ico">
		<link rel="apple-touch-icon" href="apple-touch-icon-precomposed.png">
		<link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="../design/css.css">
		<link rel="stylesheet" href="design/font-awesome.min.css">
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
			<script src="js/interface.js"></script>
	</head>	

	
	
	<body>	
<?php 
ini_set('display_errors', '1');
ini_set('error_reporting', E_ALL);

require 'TicketBridge.php';

function arrondi($nombre){
	$nombre=substr($nombre,0,strlen($nombre)-2);
	return $nombre;
}


// Affichage du dernier ticket qu'on va tranformer en facture
if(isset($_GET['flag']) && $_GET['flag']=="getticket"){
	$ticket=$TicketManager->getTicket($_GET['ticketnb']);
	// print_r($ticket);
	
	echo '
	<div id="printerticketfacture">
		<div id="printentete">
			<img src="../img/logoprint.jpg" width="150">
			<div>3 route du Dôme,<br>
			69630 Chaponost<br>
			SIRET 1236547896544</div>
		
		</div>
		
		<div id="facturer">FACTURE '.$ticket[0]['numero_ticket'].'</div>
		<div id="client">Client : <br>'.$_GET['nom'].'<br>'.$_GET['adresse'].'<br>'.$_GET['cpville'].'</div>
	';
	

	
	echo '<div id="printdetail">
	<div id="printdetailheader">
		<span class="design">Désignation</span>
		<span class="qte">Qté</span>
		<span class="price">Prix HT</span>
		<span class="tva">Total HT</span>
	</div>
	
	';
	$totalarticle=0;
	$totalHT=0;
	foreach($ticket as $key=>$value){
		if($value['tva']==0){
			$tva=1.2;
		}else{
			$tva=1.055;
		}
		$price=round($value['prix']/($tva),4); // ARRONDI AU 4ème chiffre après la virgule
		$priceqte=$price*$value['quantite'];
		$totalHT+=$priceqte;
		$totalarticle+=$value['quantite'];
		$price=arrondi($price);
		$priceqte=arrondi($priceqte);
		
		echo '
		<div>
			<span class="design">'.$value['nom_produit'].'</span>
			<span class="qte">'.$value['quantite'].'</span>
			<span class="price">'.$price.'€</span>
			<span class="tva">'.$priceqte.'€</span>
		</div>
		';
	
		
		
	}
	echo '</div>
	<div id="printtotal">
	';
	if($ticket[0]['discount']=0){
		echo'<div>Remise '.$ticket[0]['discount'].'%</div>';
	}
	/*
	// Total HT
	echo'<div>'.$totalarticle.' article(s) - Total HT à payer : <span>'.substr($totalHT,0,strlen($totalHT)-2).'€</span></div>
	</div>';*/
	// Total HT
	echo'<div>'.$totalarticle.' article(s) - Total HT à payer : <span>'.arrondi($totalHT).'€</span></div>
	</div>';
	
	echo '<div id="taxedetail">';

	// TVA 20%
	if($ticket[0]['montant']>$ticket[0]['tvacing']){
		$montant_vingt=$ticket[0]['montant']-$ticket[0]['tvacing'];
		$tva_vingt=round($montant_vingt-($montant_vingt/1.2),2);
		echo '<div>TVA 20% : <span>'.$tva_vingt.'€</span></div>';
	}else{
		$montant_vingt=$ticket[0]['tvacing']-$ticket[0]['montant'];
		$tva_vingt=round($montant_vingt-($montant_vingt/1.2),2);
		echo '<div>TVA 20% : <span>'.$tva_vingt.'€</span></div>';	
	}
		
	//tva 5.5
	if($ticket[0]['tvacing']!=0){
		$tva_cinqcinq=round($ticket[0]['tvacing']-($ticket[0]['tvacing']/1.055),2);
		echo '<div>TVA 5.5% : <span>'.$tva_cinqcinq.'€</span></div>';
	}
	
	// TOTAL 
	$totalALL=$totalHT+$tva_cinqcinq+$tva_vingt;
	echo '
	<div id="totalttc"> TOTAL TTC : <span>'.arrondi($totalALL).'€</span></div>
	</div><div id="printreglement">';
	if($ticket[0]['type_reglement']=="Espèces"){
		echo '<div>Règlement - '.$ticket[0]['type_reglement'].' '.$ticket[0]['especes_recues'].'€</div>';
		echo  '<div>Votre monnaie : '.($ticket[0]['especes_recues']-$ticket[0]['montant']).'€</div>';
	}else{
		echo '<div>Règlement - '.$ticket[0]['type_reglement'].' '.$ticket[0]['montant'].'€</div>';
	}
	
	echo '</div><div id="printtime">';
	$date = date_create();
	date_timestamp_set($date, $ticket[0]['date']);
	echo '<div>Ticket numéro '.$ticket[0]['numero_ticket'].'<br>'.date_format($date, 'd/m/Y H:i:s') . '</div></div></div>';

}		
?>
	<script>
	$(window).load(function(){
		window.print();
	});
	</script>
	</body>
</html> 
