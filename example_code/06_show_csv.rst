.. _showcsv06:

06 Solution to Exercise (show CSV results)
==========================================

You just need to change:

.. code:: javascript

  on_finish: function() {
      jsPsych.data.displayData();
  }

to:

.. code:: javascript

  on_finish: function() {
      jsPsych.data.displayData("csv");
  }
