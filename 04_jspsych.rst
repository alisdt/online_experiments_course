The structure of a jsPsych experiment
=====================================

A jsPsych experiment is a series of nodes.
Usually one node corresponds to one presentation to the
participant. So far in our test experiment, we've only
got one node which says hello (or shows an image, if you
changed it to do that). Let's add some more!

Putting the code in its own file
--------------------------------

First, we're going to give our experiment code its own file. We'll
create a new file just for the JavaScript code, and copy the code into
that file.

Open a new file in the same folder as ``experiment.html``. This will be
called ``experiment.js``. Now in ``experiment.html``, put the following
between ``<head>`` and ``</head>``, *after* all the other lines starting
with ``<script>``:

.. code:: html

    <script src="experiment.js"></script>

This tells the web browser to load code from the file ``experiment.js``.

Now cut all the code you wrote in ``experiment.html`` file between
``<script>`` and ``</script>``, and paste it into ``experiment.js``.
You can now delete the empty ``<script></script>`` in ``experiment.html``.

Assuming that you followed on from the exercise in 02, when you've finished
your files should look :ref:`like this <separatefile04>`.

Adding more images
------------------

Let's add another node to your experiment.
You'll add it just the same way, with another bit of code something
like this:

.. code:: javascript

    var image2_trial = {
        type: jsPsychImageKeyboardResponse,
        stimulus: 'image2.jpg'
    }

Of course for this you need another image to upload to the server!
There's a test set
of images `linked here <images.zip>`_ (cats, dogs and horses), or of
course you can choose another image for yourself.

Make sure that the name after ``stimulus:`` matches the exact name of
the image on the server.

You can then add this image to the timeline by changing the line at the
end of the code to:

.. code:: javascript

    jsPsych.run([trial, image2_trial]);

Your code might not look exactly like this -- the two names between the
``[]`` should match the names you used earlier in the code.

Test this by reloading the experiment page in your web browser.
You should see two images displayed, and each time you can press a key
to move on. Remember
you might need to do a "hard reload", here's a reminder:

| Firefox: ⌘-shift-R on Mac, ctrl-shift-R on Windows or Linux
| Chrome: ⌘-shift-R on Mac, ctrl-F5 on Windows or Linux
| Edge: ctrl-F5

Results
-------

In a future session we'll look at how to store results on the server.
For now, we'll display them on the screen at the end of the experiment.

You can do this by changing the call to ``initJsPsych`` at the start
of the code to:

.. code:: javascript


    var jsPsych = initJsPsych({
        on_finish: function() {
            jsPsych.data.displayData();
        }
    });

Again, test this by reloading the page in your browser.

This time, you should see the two images, then at the end the results.

They look something like this:

.. code:: javascript

    [
        {
            "rt": 1239,
            "stimulus": "Dog1.jpg",
            "response": " ",
            "trial_type": "image-keyboard-response",
            "trial_index": 0,
            "time_elapsed": 1241,
            "internal_node_id": "0.0-0.0"
        },
        ....

We'll go through this in more detail later on, but you can already see
a couple of familiar features there. Firstly, the information in the node
(the type and stimulus) are there. Secondly, the reaction time (``rt``) is
there. Finally, ``response`` tells you what key was pressed. In this case it's
the space bar. Here the Space bar has been pressed, in the output:

.. code::

            "response": " ",

there's a space between the second pair of quotes.

Before you move on ....
-----------------------

If your code still isn't working, you could compare with
:ref:`this example code <multipleimagessimple04>`. (If your code does what
it needs to, don't worry!)

Timeline variables
------------------

Writing jsPsych nodes out like this is fine when we only have two, but experiments can have tens or even hundreds of trials. Fortunately jsPsych gives us a way to loop through different values for things like ``stimulus``, called "timeline variables".

Make a copy of your code—the easiest way to do this is to just copy your whole experiment folder.

We'll start by just varying the ``stimulus``. At the start of your code, just after ``initJsPsych(...);``, write the names of your images in a list of objects like this:

.. code:: javascript

    var variables = [
        { image: "Dog1.jpg" },
        { image: "Dog2.jpg" }
    ];

Make sure that the image filenames match the image filenames on the server.
Now, using one of your image nodes as a template, replace the value for ``stimulus`` with ``jsPsych.timelineVariable("image")``. So it should look a bit like this:

.. code:: javascript

    var trial = {
        type: jsPsychImageKeyboardResponse,
        stimulus: jsPsych.timelineVariable("image")
    }

You can delete your other trial. Now all that's needed is to connect this to the list of values above:

.. code:: javascript

    var trials_with_variables = {
        timeline: [trial],
        timeline_variables: variables
    };

Then change ``jsPsych.run`` to run this:

.. code:: javascript

    jsPsych.run([trials_with_variables]);

This approach makes it much easier to add new trials, e.g.

.. code:: javascript

    var variables = [
        { image: "Dog1.jpg" },
        { image: "Dog2.jpg" },
        { image: "Cat1.jpg" },
        { image: "Cat2.jpg" }
    ];

This adds two new trials with only two more lines of code!

Repetition
----------

What if you want to repeat a set of trials several times? jsPsych allows
you to do this without having to type out all the repetitions. After your
timeline variable definitions (``var variables = { ....``) add a line:

.. code:: javascript

    var repeated_variables = jsPsych.randomization.repeat(variables, 5);

This repeats the list ``variables`` five times, randomises it, and puts the
result in a new list called ``repeated_variables``.

Change your timeline node (`var trials_with_variables = { ....`) to use this:

.. code:: javascript

    var trials_with_variables = {
        timeline: [trial],
        timeline_variables: repeated_variables
    };

Now reload and run your experiment again. You should see ten trials in total,
with five of each image.

Once you've finished, your code should look like :ref:`this <repetition>`. (Don't look at
this until you've taken a look at the console errors and tried to fix it, though!)

This example uses timeline variables, but you can also give the `jsPsych.randomization.repeat(...)` function a list of nodes, and it will randomise and repeat them in the same way.

Factorial design
----------------

jsPsych also has a function which will create a full-factorial design for you. A
full-factorial design is one which
tests all possible combinations of a set of parameters.

Create a new experiment by copying the "hello" folder and its contents. Rename this
new folder ``factorial``.

This means that your new experiment will appear in a different place. Take the link
for the first experiment and replace ``hello`` with ``factorial``.

Let's create a factorial design over a set of images and a set of trial durations. (In a real experiment we'd use this to give the participant a limited amount of time to respond).

Look at the
`documentation for the image-keyboard-response plugin <https://www.jspsych.org/7.3/plugins/image-keyboard-response/>`_.
There is a ``trial_duration`` parameter which controls the duration of the trial.

Start off by editing the copy of ``experiment.js`` in your new folder.

Delete everything except ``initJsPsych(...)`` and add:

.. code:: javascript

    var factors = {
        image: ['Dog1.jpg', 'Dog2.jpg', 'Dog3.jpg'],
        duration: [400, 800, 1200]
    };

    var factorial_values = jsPsych.randomization.factorial(factors);
    console.log(JSON.stringify(factorial_values));

This won't show anything in the main window of the browser. Instead,
``console.log`` sends text to the console that we saw earlier.
Open up the console in Developer Tools and reload the page.
You can see that it's generated all possible combinations of stimulus and duration, as we wanted.
These are not fully-formed jsPsych nodes though, as they need some extra information. At the
very least they need a ``type``. Usually there's also a ``prompt`` parameter, giving some
explanatory text telling the participant what they need to do. We can use timeline variables to
use the ``stimulus`` and ``duration`` values that we generated.

As a table, ``factorial_values`` would look like this:

======== ========
stimulus duration
======== ========
Dog2.jpg 400
Dog1.jpg 1200
Dog1.jpg 800
Dog3.jpg 800
etc.     etc.
======== ========

Let's write a node which uses these variables.

.. code:: javascript

    var trial = {
        type: jsPsychImageKeyboardResponse,
        prompt: '<p>Press a key!</p>',
        stimulus: jsPsych.timelineVariable('image'),
        trial_duration: jsPsych.timelineVariable('duration')
    };

Now we can link the table up to this using the ``timeline_variables`` property:

.. code:: javascript

    var trials_with_variables = {
        timeline: [trial],
        timeline_variables: factorial_values
    };

Just a reminder, as in the previous experiment this bit says to jsPsych, "please use a timeline with just the node ``trial``, and use ``factorial_values``
to supply the values".

Finally, as before, we must use ``jsPsych.run`` to start the experiment:

.. code:: javascript

    jsPsych.run([trials_with_variables]);

Once you've finished the code should look like :ref:`this <factorial>`. As before,
try your best to finish this on your own first, solving any problems by asking for help,
looking at the code, or using Developer Tools.

As always, things like variable names and
filenames can be different, and don't worry about differences with the example
if your code is working well.

Exercise: Instructions
----------------------

Add a node to the start of the experiment which shows some instructions.
This should go in the main timeline (in jsPsych.run).

You can use the ``html-keyboard-response`` plugin, which you saw in the "Hello World!"
example right at the start, or you can use the ``instructions`` plugin
(`documented here <https://www.jspsych.org/7.3/plugins/instructions/>`_). Remember that
when you add a plugin to an experiment, there must be a corresponding ``<script src="...."></script>``
in ``experiment.html``.

Exercise: Fixation cross
------------------------

Add a fixation cross before each trial. This should go in the timeline in ``trials_with_variables``.

So that code will change to look like this:

.. code:: javascript

    var trials_with_variables = {
        timeline: [fixation, trial],
        timeline_variables: factorial_values
    };

You then need to define a new node, ``fixation``, somewhere above that in the code.

Extra exercise: variable fixation duration
------------------------------------------

Add a new variable to the factorial design, giving two different fixation durations.

Change the definition of your fixation node to use this new variable.

Here's :ref:`example code <factorial_with_fixation>` with all of these exercises completed: instructions,
and a fixation cross of variable duration.
