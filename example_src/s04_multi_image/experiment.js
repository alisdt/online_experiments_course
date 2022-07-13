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