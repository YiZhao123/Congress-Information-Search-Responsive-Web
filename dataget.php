<?php
header('Access-Control-Allow-Origin:*');
//$url = "http://congress.api.sunlightfoundation.com/";
$url = "http://104.198.0.197:8080/";
  
if(isset($_GET["operation"]) && ($_GET["operation"] == "showalllegilators")){
    $url .= "legislators?per_page=all";
    //echo $url;
    $content = file_get_contents($url);
    echo $content;
}

if(isset($_GET["operation"]) && ($_GET["operation"] == "showallactivebills")){
    $url .= "bills?history.active=true&last_version.urls.pdf__exists=true&per_page=50";  
    $content = file_get_contents($url);
    echo $content;
}
if(isset($_GET["operation"]) && ($_GET["operation"] == "showallnewbills")){
    $url .= "bills?history.active=false&last_version.urls.pdf__exists=true&per_page=50";  
    $content = file_get_contents($url);
    echo $content;
}

if(isset($_GET["operation"]) && ($_GET["operation"] == "showallcomm")){
    $url .= "committees?per_page=all";  
    $content = file_get_contents($url);
    echo $content;
}
if(isset($_GET["operation"]) && ($_GET["operation"] == "showfivebill")){
    $lastname = $_GET["lastname"];
    $firstname = $_GET["firstname"];
    
    $urlall = $url."bills?sponsor.first_name=".$firstname."&sponsor.last_name=".$lastname."&per_page=5";  
    $content = file_get_contents($urlall);
    echo $content;
}

if(isset($_GET["operation"]) && ($_GET["operation"] == "showfivecomm")){
    $bioguide_id = $_GET["bioguide_id"];
    
    $urlall = $url."committees?member_ids=".$bioguide_id."&per_page=5";  
    $content = file_get_contents($urlall);
    echo $content;
}

?>