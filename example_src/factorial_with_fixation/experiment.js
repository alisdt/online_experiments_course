  var jsPsych = initJsPsych({
      on_finish: function() {
        jsPsych.data.displayData();
      }
  });

  var factors = {
      image: ['Dog1.jpg', 'Dog2.jpg', 'Dog3.jpg'],
      duration: [400, 800, 1200],
      fixation_duration: [250, 500, 750]
  };

  var factorial_values = jsPsych.randomization.factorial(factors);

  var fixation = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '+',
      trial_duration: jsPsych.timelineVariable('fixation_duration'),
      response_ends_trial: false
  };

  var trial = {
      type: jsPsychImageKeyboardResponse,
      prompt: '<p>Press a key!</p>',
      stimulus: jsPsych.timelineVariable('image'),
      trial_duration: jsPsych.timelineVariable('duration')
  };

  var trials_with_variables = {
      timeline: [fixation, trial],
      timeline_variables: factorial_values
  };

  var instructions = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: 'Welcome to the experiment!<br>When you see an image press any key you like.'
  }

  jsPsych.run([instructions, trials_with_variables]);
