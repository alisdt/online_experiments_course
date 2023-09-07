    // create a list of all images so we can tell jsPsych to
    // preload them for speed (see initJsPsych below)
    // (Note: jsPsych will usually work out what to preload for
    // itself, but I've left this example to show how to do it)
    var cats = ['Cat1.jpg', 'Cat2.jpg', 'Cat3.jpg'];
    var dogs = ['Dog1.jpg', 'Dog2.jpg', 'Dog3.jpg'];
    var all_images = cats.concat(dogs);

    var initJsPsych({
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
        duration: [750, 1500],
        fixation_duration: [250, 500]
    };

    var factorial_values = jsPsych.randomization.factorial(factors);

    var fixation = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '+',
        trial_duration: jsPsych.timelineVariable('fixation_duration'),
        response_ends_trial: false
    };

    // add all of the relevant variables to the data field so they
    // will appear in the results
    var trial = {
        type: jsPsychHtmlKeyboardResponse,
        prompt: '<p>Press a key!</p>',
        stimulus: function () {
            // note: the outer parentheses are only here so we can break the line
            return (
               '<img src="'+jsPsych.timelineVariable("image1")+'">'
               +'<img src="'+jsPsych.timelineVariable("image2")+'">'
            );
        },
        trial_duration: jsPsych.timelineVariable('duration'),
        data: {
          fixation_duration: jsPsych.timelineVariable('fixation_duration'),
          trial_duration: jsPsych.timelineVariable('duration'),
          image1: jsPsych.timelineVariable('image1'),
          image2: jsPsych.timelineVariable('image2')
        }
    };

    var trials_with_variables = {
        timeline: [fixation, trial],
        timeline_variables: factorial_values
    };

    jsPsych.run([trials_with_variables]);
