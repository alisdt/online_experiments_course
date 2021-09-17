.. _record_result:

PHP code to receive data on the server
======================================

Note that:

* You **must** replace ``UUN`` with your username.
* Throughout all the examples, this file is given the name ``save_data.php``.
* The line ``$outfile = fopen($path, "a");`` opens the file in "append" mode, which means results will always be appended to the file. If you want this code to always write a new file (possibly replacing the old one), change the ``"a"`` to ``"w"``.

.. code:: php

{{ save_data_save_data_php }}
