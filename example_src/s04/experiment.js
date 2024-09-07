var jsPsych = initJsPsych();

var trial = {
    type: jsPsychImageKeyboardResponse,
    stimulus: 'nasa_proxima.png'
};

jsPsych.run([trial]);
