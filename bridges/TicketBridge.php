
<?php 
ini_set('display_errors', '1');
ini_set('error_reporting', E_ALL);


require '../action/TicketManager.php';
$TicketManager = new TicketManager();

// récupération du numéro du dernier ticket
if(isset($_GET['flag']) && $_GET['flag']=="lastticket"){
	$lastID=$TicketManager->getlastID();
	// echo time();
	echo $lastID['derniereID'];
}	

if(isset($_POST['flag']) && $_POST['flag']=="writeticket"){
	print_r($_POST);
	
	// enregistrement du ticket
	$TicketManager->createTicket($_POST['numero'],$_POST['date'],$_POST['montant'],$_POST['typeReglement'],$_POST['tvacinq'],$_POST['discountpercent'],$_POST['especesRecues']);
	
	// dépacketage des produits
	if(isset($_POST['produits']) && !empty($_POST['produits'])){
		$produits=$_POST['produits'];
		foreach($produits as $key=>$value){
			$designation= $value[0];
			$quantité= $value[1];
			$prix= $value[2];
			$tva= $value[3];
			$TicketManager->createRelProduct($_POST['numero'],$designation,$quantité,$prix,$tva);
		}
	}
}

if(isset($_POST['flag']) && $_POST['flag']=="facture"){
	$TicketManager->createFacture($_POST['numero'],$_POST['nom'],$_POST['adresse'],$_POST['cpville']);
}
						
// affichage des tickets du jour
if($_GET['flag']=="ticketsday"){
	
	// calcul d'aujourd'hui à minuit
	$midnight=strtotime('today');
	$today=$_GET['date'];

	$listeTickets=$TicketManager->getTicketsOfDay($midnight,$today);
	foreach($listeTickets as $key=>$value){
		$date=date('d-m-Y',$value['date']);
		
		echo '
			<div class="ticketline">
				<div class="ticketnum">'.$value['numero_ticket'].'</div>
				<div class="ticketdate">'.$date.'</div>
				<div class="ticketmontant">'.$value['montant'].'€</div>
				<div class="ticketpayement">'.$value['type_reglement'].'</div>	
			</div>
		';
	}
}							
// affichage des tickets du jour
if($_GET['flag']=="ticketssearch"){
	
$listeTickets=$TicketManager->getTicketsSearch($_GET['startdatedate'],$_GET['enddate']);
	foreach($listeTickets as $key=>$value){
		$date=date('d-m-Y',$value['date']);
		
		echo '
			<div class="ticketline">
				<div class="ticketnum">'.$value['numero_ticket'].'</div>
				<div class="ticketdate">'.$date.'</div>
				<div class="ticketmontant">'.$value['montant'].'€</div>
				<div class="ticketpayement">'.$value['type_reglement'].'</div>	
			</div>
		';
	}
}	



?>

