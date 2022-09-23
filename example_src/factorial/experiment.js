var jsPsych = initJsPsych({
    on_finish: function() {
      jsPsych.data.displayData();
    }
});

var factors = {
    image: ['Dog1.jpg', 'Dog2.jpg', 'Dog3.jpg'],
    duration: [400, 800, 1200]
};

var factorial_values = jsPsych.randomization.factorial(factors);

var trial = {
    type: jsPsychImageKeyboardResponse,
    prompt: '<p>Press a key!</p>',
    stimulus: jsPsych.timelineVariable('image'),
    trial_duration: jsPsych.timelineVariable('duration')
};

var trials_with_variables = {
    timeline: [trial],
    timeline_variables: factorial_values
};

jsPsych.run([trials_with_variables]);
