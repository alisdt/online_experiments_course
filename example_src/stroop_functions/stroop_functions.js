var jsPsych = initJsPsych({
    on_finish: function() {
        jsPsych.data.displayData('csv');
    }
});


// the colours are also the words ....
var colours = ['red', 'green', 'blue', 'yellow'];

var n_trials = 30;

// returns a JavaScript object with { text: ...., colour: .... }
// using a random colour (text is the same as colour)
function congruent() {
    // pick a colour ....
    // (when we're only picking one, with/without replacement doesn't matter)
    var colour_list = jsPsych.randomization.sampleWithReplacement(colours,1);
    // this returns a list with one item, so we select the first (only) item
    return { text: colour_list[0], colour: colour_list[0], condition: 'congruent' };
}

// returns a JavaScript object with { text: ...., colour: .... }
// using a random colour (text is different to colour)
function incongruent() {
    // pick two colours without replacement (i.e. they will be different)
    var colour_list = jsPsych.randomization.sampleWithoutReplacement(colours,2);
    // this returns a list with two item, we select these out
    return { text: colour_list[0], colour: colour_list[1], condition: 'incongruent' };
}

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
// repeat this code n_trials times
for (var i=0; i<n_trials; i++) {
    var values;
    // Math.random returns a random number between 0 and 1. Use this to decide
    // whether the current trial is congruent or incongruent.
    if (Math.random() < 0.5) {
        values = congruent();
    } else {
        values = incongruent();
    }
    var trial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<p style="color: '+values.colour+'">'+values.text+'</p>',
        // 'choices' restricts the available responses for the participant
        choices: ['r','g','b','y'],
        data: values
    };
    trials.push(iti);
    trials.push(fixation);
    trials.push(trial);
}

jsPsych.run(trials);
