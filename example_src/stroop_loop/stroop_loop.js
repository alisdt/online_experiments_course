var jsPsych = initJsPsych({
    on_finish: function() {
        jsPsych.data.displayData('csv');
    }
});

var stroop_variables = [
  { colour: "blue", text: "blue", condition: "congruent" },
  { colour: "red", text: "red", condition: "congruent" },
  { colour: "yellow", text: "yellow", condition: "congruent" },
  { colour: "green", text: "green", condition: "congruent" },
  { colour: "blue", text: "yellow", condition: "incongruent" },
  { colour: "red", text: "green", condition: "incongruent" },
  { colour: "yellow", text: "blue", condition: "incongruent" },
  { colour: "green", text: "red", condition: "incongruent" }
];

// these are in HTML, so <br> means "line break"
var instructions = {
    type: jsPsychInstructions,
    pages: [
      "Welcome to the experiment.<br>Press Space to continue.",
      "In this experiment you will be presented with the words blue, red, yellow and green.<br>Press Space to continue.",
      "As soon as you see a new word, press its first letter.<br>For example, press the B key for blue.<br>Press Space to continue.",
      "Try to answer as quickly as you can!<br>Press Space to start the experiment.",
    ],
    key_forward: ' '
}

var fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '+',
    trial_duration: 500,
    response_ends_trial: false
};

// blank (ITI stands for "inter trial interval")
var iti = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  trial_duration: 250,
  response_ends_trial: false
}

var trials = [instructions];
for (var values of stroop_variables) {
    // these two are always the same ....
    trials.push(iti);
    trials.push(fixation);
    // .... but the trial node will vary
    var trial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<p style="color: '+values.colour+'">'+values.text+'</p>',
        // 'choices' restricts the available responses for the participant
        choices: ['r','g','b','y'],
        data: values
    };
    trials.push(trial);
}

jsPsych.run(trials);
