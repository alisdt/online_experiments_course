var jsPsych = initJsPsych({
    on_finish: function() {
        jsPsych.data.displayData();
    }
});

var dog1_trial = {
    type: jsPsychImageKeyboardResponse,
    stimulus: 'Dog1.jpg'
};

var dog2_trial = {
    type: jsPsychImageKeyboardResponse,
    stimulus: 'Dog2.jpg'
};

var trials = [dog1_trial, dog2_trial];
var repeated_trials = jsPsych.randomization.repeat(trials,5);

jsPsych.run([repeated_trials]);
