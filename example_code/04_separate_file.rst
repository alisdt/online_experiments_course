.. _separatefile04:

Solution 04 (code in its own file)
==================================

Presuming that you followed on from the exercise in section 02, you should
have a HTML file called `experiment.html` that looks like this:

.. code:: html

  <html>
      <head>
          <title>My experiment</title>
          <script src="jspsych-6.3.1/jspsych.js"></script>
          <script src="jspsych-6.3.1/plugins/jspsych-image-keyboard-response.js"></script>
          <script src="experiment.js"></script>
          <link href="jspsych-6.3.1/css/jspsych.css" rel="stylesheet" type="text/css">
      </head>
      <body></body>
  </html>

and a JavaScript file called `experiment.js` that looks like this:

.. code:: javascript

    var trial = {
        type: 'image-keyboard-response',
        stimulus: 'nasa_proxima.png'
    };

    jsPsych.init({
        timeline: [trial]
    });

As before this may differ in small details like the file paths.

Remember that for this to work the image file must also be in the same folder.
