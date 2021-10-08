/*
    This is a simple example of using functions to
    build up trials.
   
    We'll use it to demo some debugging, and remind
    you how functions work!

    There are some deliberately introduced bugs here ....

*/

function word_trial(word) {
    var trial = 
        stimulus: word
    };
}

// O wild West Wind, thou breath of Autumn’s being
var sentence = ["O","wild","West","Wind,","thou","breath","of","Autumn’s","being"];

var trials = [];
for (var word in sentence) {
    var trial = wordtrial(word);
    trials.push(trial);
}

jsPsych.init({
    timeline: trials
});