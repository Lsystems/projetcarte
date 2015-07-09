<?php

$dbname="locki";
$dblogin="locki";
$dbpass="vv4bKFMxHSmB3Qmy";

if($_SERVER['HTTP_HOST']=='localhost'){
	try
	{
		//$pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
                $bdd = new PDO('mysql:host=localhost;dbname='.$dbname.'', ''.$dblogin.'', ''.$dbpass.'');
                $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // GESTION DES EXCEPTIONS
                $bdd->query('SET NAMES UTF8');
	}
	catch (Exception $e)
	{
			die('Erreur : ' . $e->getMessage());
	}
}
else{
	try
	{
		//$pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;;
                // $bdd = new PDO('mysql:host=localhost;dbname=orbit', 'root', '');
                 $bdd = new PDO('mysql:host=localhost;dbname='.$dbname.'', ''.$dblogin.'', ''.$dbpass.'');
                $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // GESTION DES EXCEPTIONS
                $bdd->query('SET NAMES UTF8');
	}
	catch (Exception $e)
	{
			die('Erreur : ' . $e->getMessage());
	}
}

?>
