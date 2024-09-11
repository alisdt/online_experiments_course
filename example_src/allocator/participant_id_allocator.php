<?php
    $username = explode("/", dirname(__FILE__))[2];
    $server_data = '/home/'.$username.'/server_data';
    $partid_file = $server_data.'/participant_id.txt';
    if (!file_exists($partid_file)) {
        $partid = 0;
    } else {
        $partid = (int)file_get_contents($partid_file);
    }
    $partid += 1;
    if (substr(realpath(dirname($partid_file)), 0, strlen($server_data))!=$server_data) {
        error_log("attempt to write to bad path: ".$partid_file);
    } else {
        file_put_contents($partid_file, (string)$partid);
    }
    printf('%d', $partid); // send ID!
?>