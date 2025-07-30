<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require '../db.php';


$lang = isset($_GET['lang']) ? htmlspecialchars($_GET['lang']) : 'en';


$allowed_langs = ['en', 'es', 'zh'];
if (!in_array($lang, $allowed_langs)) {
    $lang = 'en'; 
}


$name_col_specific = "name_" . $lang;
$description_col_specific = "description_" . $lang;

$sql = "SELECT 
            id, 
            prop, 
            vote_yes, 
            vote_no, 
            percent_required, ";

if ($lang === 'en') {
 
    $sql .= "name, description ";
} else {
   
    $sql .= "COALESCE($name_col_specific, name) AS name, ";
    $sql .= "COALESCE($description_col_specific, description) AS description ";
}

$sql .= "FROM props 
        ORDER BY id ASC";

$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    $data = [];
}

echo json_encode($data);
$conn->close();
?>