var jsPsych = initJsPsych();

var factors = {
    image: ['Dog1.jpg', 'Dog2.jpg', 'Dog3.jpg'],
    duration: [400, 800, 1200],
    fixation_duration: [500, 1000, 1500]
};

var factorial_values = jsPsych.randomization.factorial(factors);

// adding a 'data' field gives us extra values which:
// - are saved automatically if we save the whole dataset at the end
// - are accessible in save_data_line if we save line-by-line
var fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '+',
    trial_duration: jsPsych.timelineVariable('fixation_duration'),
    response_ends_trial: false,
    data: {
        type: 'fixation'
    }
};

// fixation_duration is put into the 'data' field for this node as this
// is the one we report at the end -- fixation nodes are filtered out
var trial = {
    type: jsPsychImageKeyboardResponse,
    prompt: '<p>Press a key!</p>',
    stimulus: jsPsych.timelineVariable('image'),
    trial_duration: jsPsych.timelineVariable('duration'),
    data: {
        type: 'trial',
        trial_duration: jsPsych.timelineVariable('duration'),
        fixation_duration: jsPsych.timelineVariable('fixation_duration')
    },
    // this gives jsPsych a function to run every time this trial ends
    // the function is given the data from the trial (with response)
    on_finish: function (data) {
        save_data_line(data);
    }
};

var trials_with_variables = {
    timeline: [fixation, trial],
    timeline_variables: factorial_values
};

function save_data(name, data_in){
    // this is exactly the same as in the previous example
    // (all it does is send data to the server!)
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

function save_data_line(data) {
    // choose the data we want to save
    var data_to_save = [
        data.type, data.stimulus, data.trial_duration, data.fixation_duration, data.rt
    ];
    // join these with commas and add a newline
    var line = data_to_save.join(',')+"\n";
    save_data("test.csv", line);
}

jsPsych.run([trials_with_variables]);
