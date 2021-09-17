<?php
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$outfile = fopen('/home/atullo2/server_data/'.$obj["filename"], "a");
fwrite(
    $outfile,
    sprintf($obj["filedata"])
);
fclose($outfile);
?>
