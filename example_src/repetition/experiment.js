initJsPsych({
    on_finish: function() {
        jsPsych.data.displayData();
    }
});

const dog1_trial = {
    type: jsPsychImageKeyboardResponse,
    stimulus: 'Dog1.jpg'
};

const dog2_trial = {
    type: jsPsychImageKeyboardResponse,
    stimulus: 'Dog2.jpg'
};

const trials = [dog1_trial, dog2_trial];
const repeated_trials = jsPsych.randomization.repeat(trials,5);

jsPsych.run([repeated_trials]);
