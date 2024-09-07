.. _multiple_images_loop:

Multiple images (using a loop)
==============================

This code uses ``jspsych-html-keyboard-response``, so make sure it's included in your
``experiment.html``.

.. code:: javascript

    // create a list of all images so we can tell jsPsych to
    // preload them for speed (see initJsPsych below)
    // (Note: jsPsych will usually work out what to preload for
    // itself, but I've left this example to show how to do it)
    var cats = ['Cat1.jpg', 'Cat2.jpg', 'Cat3.jpg'];
    var dogs = ['Dog1.jpg', 'Dog2.jpg', 'Dog3.jpg'];
    var all_images = cats.concat(dogs);

    var jsPsych = initJsPsych({
        on_finish: function() {
            jsPsych.data.displayData('csv');
        },
        preload_images: all_images
    });

    // this example uses fewer durations (just to make the number
    // of trials sensible).
    var factors = {
        image1: cats,
        image2: dogs,
        trial_duration: [750, 1500],
        fixation_duration: [250, 500]
    };

    var factorial_values = jsPsych.randomization.factorial(factors);

    var trials = [];

    for (values of factorial_values) {
        var fixation = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: '+',
            trial_duration: values.fixation_duration,
            response_ends_trial: false
        };
        trials.push(fixation);
        // note that when using this approach, the 'stimulus' field doesn't
        // need to be in a function
        var trial = {
            type: jsPsychHtmlKeyboardResponse,
            prompt: '<p>Press a key!</p>',
            stimulus: '<img src="'+values.image1+'"> <img src="'+values.image2+'">',
            trial_duration: values.duration,
            data: values
        };
        trials.push(trial);
            /* Note: above we just copy the variable 'values' directly into
               the 'data' field, as it already has the information we need.
               We could copy individual items like this:
               data: {
                   fixation_duration: values.fixation_duration,
                   trial_duration: values.duration,
                   image1: values.image1,
                   image2: values.image2
               }
               but it would have exactly the same effect. */
    }

    jsPsych.run(trials);
