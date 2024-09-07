var jsPsych = initJsPsych({
    on_finish: function() {
        var experiment_data = jsPsych.data.get();
        save_data("test.csv", experiment_data.csv());
    }
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

function save_data(name, data_in){
    var url = 'save_data.php';
    var data_to_send = {filename: name, filedata: data_in};
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data_to_send),
        headers: new Headers({
                'Content-Type': 'application/json'
        })
    });
}

jsPsych.run([trials_with_variables]);
