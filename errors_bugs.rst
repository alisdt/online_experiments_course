Errors and bugs
===============

Argh, it doesn't work!  **Don't panic**.

Things *not* to worry about
---------------------------

You may see errors in the Developer Tools Console like:

.. code::

    Source map error: ....

    An AudioContext was prevented from starting automatically. ....

    GET http://jspsychlearning.ppls.ed.ac.uk/favicon.ico ....

None of these errors are problems with your program! You can safely ignore these and take a look at the other errors on the Console.

Debugging checklist
-------------------

* Your browser may be holding on to an old copy of the code. Browsers do this to make loading faster, but it's not useful when we're developing code! Get into the habit of using "hard reload" (also known as "hard refresh") when you reload the page. 
   
| Firefox: ⌘-shift-R on Mac, ctrl-F5 on Windows or Linux
| Chrome: ⌘-shift-R on Mac, ctrl-F5 on Windows or Linux
| Edge: ctrl-F5

This tells your browser to load everything straight from the server.

* Take a look in Developer Tools and see if there are any errors on the Console. Even if you find the error message hard to interpret, there will be a line number telling you where the problem is, so you can go back to that part of the code and see if you can spot any problems. Have a look at :ref:`developer_tools` for a full explanation.

* Check your file and folder (directory) names.

* Make sure your plugin versions are right! The plugin version is the number in e.g.:

.. code:: html
    
    <script src="https://unpkg.com/@jspsych/audio-button-response@2.0.1"></script>"""

You can check these at the top of the documentation page for each plugin.

Specific problems
-----------------

If you've started on a complex experiment structure, it could be that your timeline has :ref:`lists_within_lists`