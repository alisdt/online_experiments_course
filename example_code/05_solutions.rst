.. _solutions05:

Solution: make the loop count down from 5 to 1
==============================================

.. code:: javascript

  for (var i=5; i>0; i--) {
      window.alert("The number is "+i);
  }

Solution: an experiment which loops through an array of strings
===============================================================

.. code:: javascript

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

You may have spotted that you could also do this using timeline variables!

Solution: greetings
===================

.. code:: javascript

  function greeting(person) {
      window.alert("hello "+person+"!");
  }

  var names = ['Hendrick', 'Arran', 'Kalvyn', 'Priyangi', 'Ted'];

  for (var name of names) {
      greeting(name);
  }
