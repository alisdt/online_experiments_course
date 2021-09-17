var factors = {
    stimulus: ['Dog1.jpg', 'Dog2.jpg', 'Dog3.jpg'],
    stimulus_duration: [400, 800, 1200]
};

var factorial_values = jsPsych.randomization.factorial(factors);

var trial = {
    type: 'image-keyboard-response',
    prompt: '<p>Press a key!</p>',
    stimulus: jsPsych.timelineVariable('stimulus'),
    stimulus_duration: jsPsych.timelineVariable('stimulus_duration')
};

var trials_with_variables = {
    timeline: [trial],
    timeline_variables: factorial_values
};

function saveData(name, data_in){
    var url = 'record_result.php';
    var data_to_send = {filename: name, filedata: data_in};
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data_to_send),
        headers: new Headers({
                'Content-Type': 'application/json'
        })
    });
}

jsPsych.init({
    timeline: [trials_with_variables],
    on_finish: function() {
        var experiment_data = jsPsych.data.get();
        saveData("test.csv", experiment_data.csv());
    }
});
