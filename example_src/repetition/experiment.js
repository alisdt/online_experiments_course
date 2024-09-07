var jsPsych = initJsPsych();

var variables = [
    { image: "Dog1.jpg" },
    { image: "Dog2.jpg" }
];

var trial = {
    type: jsPsychImageKeyboardResponse,
    stimulus: jsPsych.timelineVariable("image")
};

var repeated_variables = jsPsych.randomization.repeat(variables, 5);

var trials_with_variables = {
    timeline: [trial],
    timeline_variables: repeated_variables
};

jsPsych.run([trials_with_variables]);