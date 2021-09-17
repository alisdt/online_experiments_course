var sentence = ["I", "wandered", "lonely", "as", "a", "cloud"];

var trials = [];

for (var word of sentence) {
  var trial = {
      type: 'html-keyboard-response',
      prompt: '<p>Press a key!</p>',
      stimulus: word
  };
  trials.push(trial);
}

// add a list of all images, these will be loaded right at the start
// to avoid delays
jsPsych.init({
    timeline: trials,
    on_finish: function() {
        jsPsych.data.displayData();
    }
});
