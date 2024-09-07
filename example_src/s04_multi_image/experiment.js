var jsPsych = initJsPsych({
    on_finish: function() {
        jsPsych.data.displayData();
    }
});

var trial1 = {
    type: jsPsychImageKeyboardResponse,
    prompt: '<p>Press a key!</p>',
    stimulus: 'Cat1.jpg'
};
var trial2 = {
    type: jsPsychImageKeyboardResponse,
    prompt: '<p>Press a key!</p>',
    stimulus: 'Cat2.jpg'
};

jsPsych.run([trial1, trial2]);