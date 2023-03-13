.. _record_result:

PHP code to receive data on the server
======================================

Note that:

* Throughout all the examples, this file is given the name ``save_data.php``.
* The line ``$outfile = fopen($path, FILE_APPEND);`` opens the file in "append" mode,
  which means results will always be appended to the file. If you want this code to always
  write a new file, possibly replacing the old one, remove ``FILE_APPEND`` (and the comma before it).

.. code:: php

{{ save_data_save_data_php }}
