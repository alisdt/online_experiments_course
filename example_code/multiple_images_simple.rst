.. _multipleimagessimple04:

Multiple images
===============

This code uses ``jspsych-image-keyboard-response``, so make sure it's included in your
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

  jsPsych.init({
      timeline: [trial1, trial2],
      on_finish: function() {
          jsPsych.data.displayData();
      }
  });

As before the images you use will need to be in the folder alongside your code.

You'll also need `experiment.html` but this will be the same as in the previous
exercise.
