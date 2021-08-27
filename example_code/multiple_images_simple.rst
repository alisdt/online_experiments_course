.. _multipleimagessimple04:

Multiple images
===============

This code uses ``jspsych-html-keyboard-response``, so make sure it's included in your
``experiment.html``.

.. code:: javascript

  var trial1 = {
      type: 'image-keyboard-response',
      prompt: '<p>Press a key!</p>',
      stimulus: 'Cat1.jpg'
  };
  var trial2 = {
      type: 'image-keyboard-response',
      prompt: '<p>Press a key!</p>',
      stimulus: 'Cat2.jpg'
  };

  // add a list of all images, these will be loaded right at the start
  // to avoid delays
  jsPsych.init({
      timeline: [trial1, trial2],
      on_finish: function() {
          jsPsych.data.displayData();
      }
  });
