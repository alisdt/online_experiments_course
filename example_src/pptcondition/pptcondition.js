var jsPsych = initJsPsych({
    on_finish: function() {
        var experiment_data = jsPsych.data.get();
        saveData(participant_id+"_data.csv", experiment_data.csv());
    }
});

// e.g. with three conditions
var participant_id = jsPsych.data.getURLVariable('participant');
var condition_number = participant_id % 3;
if (condition_number == 0) {
    condition_number = 3;
}
jsPsych.data.addProperties({
    participant: participant_id,
    condition: condition_number
});

var factors = {
    image: ['Dog1.jpg', 'Dog2.jpg', 'Dog3.jpg'],
    duration: [400, 800, 1200]
};

var factorial_values = jsPsych.randomization.factorial(factors);

var trial = {
    type: jsPsychImageKeyboardResponse,
    prompt: '<p>Press a key!</p>',
    stimulus: jsPsych.timelineVariable('image'),
    trial_duration: jsPsych.timelineVariable('duration')
};

var trials_with_variables = {
    timeline: [trial],
    timeline_variables: factorial_values
};

function saveData(name, data_in){
    var url = 'save_data.php';
    var data_in = {filename: name, filedata: data_to_send};
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data_in),
        headers: new Headers({
                'Content-Type': 'application/json'
        })
    });
}

jsPsych.run([trials_with_variables]);
