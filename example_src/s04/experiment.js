const jsPsych = initJsPsych();

const trial = {
    type: jsPsychImageKeyboardResponse,
    stimulus: 'nasa_proxima.png'
};

jsPsych.run([trial]);
