.. code:: php

    <?php
    $username = explode("/", dirname(__FILE__))[2];
    $server_data = '/home/'.$username.'/server_data';
    $id_filename = $server_data.'/participant_id.txt';
    $destination = 'experiment.html?participant=';
    $last_id = file_get_contents($id_filename);
    if ($last_id === FALSE) {
      $id = 0;
    } else {
      $id = (int)$last_id;
    }
    $id += 1;
    file_put_contents($id_filename, $id);
    header('Location: '.$destination.$id);
    ?>
