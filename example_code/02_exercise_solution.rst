.. _exercise02:

Solution 02
===========

`experiment.html` should contain something like this:

.. code:: html

    <html>
        <head>
            <title>My experiment</title>
            <script src="jspsych-6.3.1/jspsych.js"></script>
            <script src="jspsych-6.3.1/plugins/jspsych-image-keyboard-response.js"></script>
            <link href="jspsych-6.3.1/css/jspsych.css" rel="stylesheet" type="text/css">
        </head>
        <body></body>
        <script>

        var trial = {
            type: 'image-keyboard-response',
            stimulus: 'nasa_proxima.png'
        }

        jsPsych.init({
            timeline: [trial]
        })

        </script>
    </html>

In this example, the image (`nasa_proxima.png`) should be in the same folder as
`experiment.html`.

Your code may be different depending on where you have uploaded jsPsych and
what your image is called, so if your code doesn't work check these first.
