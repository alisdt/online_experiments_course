// example demonstrating server participant number allocator
var participant_id;

var jsPsych = initJsPsych({
    on_finish: function() {
        jsPsych.data.addProperties({"participant_id": participant_id});
        var experiment_data = jsPsych.data.get();
        save_data(participant_id+"_data.csv", experiment_data.csv());
    }
});

var consent = {
    type: jsPsychHtmlButtonResponse,
    stimulus: (
        "This is where the experiment consent screen would go.<br>"
        +"Click 'OK' to continue, or close the tab if you do not wish to continue."
    ),
    choices: ["OK"]
};

var get_participant_id = {
    type: jsPsychCallFunction,
    async: true,
    func: function (done) {
        fetch("participant_id_allocator.php")
            .then(function (response) {return response.text();})
            .then(function (response_text) {return parseInt(response_text);})
            .then(function (result) {
                participant_id = result;
                // condition number is the remainder of participant_id divided by 3
                condition_number = participant_id % 3;
                // if remainder is 0 change to 3 (so the conditions will be 1,2,3)
                if (condition_number == 0) {
                    condition_number = 3;
                }
                // record this in our results
                jsPsych.data.addProperties({condition: condition_number});
            })            .then(done())
    }
}

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

jsPsych.run([consent, get_participant_id, trials_with_variables]);
