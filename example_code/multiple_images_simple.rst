.. _multipleimagessimple04:

Multiple images
===============

This code uses ``plugin-image-keyboard-response``, so make sure it's included in your
``experiment.html``.

.. code:: javascript

  const jsPsych = initJsPsych({
      on_finish: function() {
          jsPsych.data.displayData();
      }
  });

  const trial1 = {
      type: jsPsychImageKeyboardResponse,
      prompt: '<p>Press a key!</p>',
      stimulus: 'Cat1.jpg'
  };
  const trial2 = {
      type: jsPsychImageKeyboardResponse,
      prompt: '<p>Press a key!</p>',
      stimulus: 'Cat2.jpg'
  };

  jsPsych.run([trial1, trial2]);

As before the images you use will need to be in the folder alongside your code.

You'll also need `experiment.html` but this will be the same as in the previous
exercise.
