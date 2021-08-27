.. _showcsv06:

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
