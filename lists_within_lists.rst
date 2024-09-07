.. _lists_within_lists:

Lists within lists
==================

A common error in jsPsych is to create a list of jsPsych nodes (trials):

.. code:: javascript

    var some_trials = [
        {
            type: jsPsychImageKeyboardResponse,
            stimulus: 'Cat1.jpg'
            prompt: "Press 'd' for dog or 'c' for cat",
            choices: ['d', 'c']
        },
        {
            type: jsPsychImageKeyboardResponse,
            stimulus: 'Dog1.jpg'
            prompt: "Press 'd' for dog or 'c' for cat",
            choices: ['d', 'c']
        }
    ];

Then later on, add it to another list as an item:

.. code:: javascript

    var full_timeline = [
        introduction,
        consent,
        instructions,
        some_trials,
        debrief
    ];

This will fail because jsPsych will try to interpret ``some_trials`` as if it was a single trial, and it's actually a list!

Do I have this problem?
-----------------------

The symptoms are:

1. The trials in the inner list (like our example ``some_trials`` above) won't appear, and
2. if you look in the Developer Tools console, you will see an error 'Trial level node is missing the "type" parameter'
3. .... and if you run through the experiment up to the faulty trial, another error in the Console: "Uncaught TypeError: e.type is not a constructor", and a blank screen.

What's the solution?
--------------------

You can flatten the nested list using the ``.flat()`` method! This will take the items out of the inner list and put them into a single list, in the same place and order.

Here's a simple example, out of the context of jsPsych, that you can try for yourself on the Console (in the Developer Tools of your browser, type at the ``>>`` prompt).

.. code:: javascript

    var my_list = ["a", "b", ["c", "d"], "e"];
    my_list.flat();

This will give the result:

.. code:: javascript

    [ "a", "b", "c", "d", "e" ]

Putting this back into context, you can call ``.flat()`` on your final timeline:

.. code:: javascript

    var full_timeline = [
        introduction,
        consent,
        instructions,
        some_trials,
        debrief
    ].flat();