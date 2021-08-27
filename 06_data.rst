Getting data from your experiment
=================================

Of course, for your experiment to be useful you'll need to record the results!
Here we'll take a look at different ways of getting results out of a jsPsych
experiment.

Testing
-------

As we've seen before, if you're just testing your experiment you can show the
results after the experiment with something like this:

.. code:: javascript

    jsPsych.init({
      timeline: timeline,
      on_finish: function() {
        jsPsych.data.displayData();
      }
    });

The default is to display the data in JSON format, which is not very readable.

You can easily display it in CSV format, though:

.. code:: javascript

    jsPsych.init({
      timeline: timeline,
      on_finish: function() {
        jsPsych.data.displayData('csv');
      }
    });

This produces something which should be easier to read, like this:

.. code::

    "rt","stimulus","key_press","trial_type","trial_index","time_elapsed","internal_node_id"
    "9373","Dog2.jpg","32","image-keyboard-response","0","9377","0.0-0.0-0.0"
    "555","Dog3.jpg","32","image-keyboard-response","1","9940","0.0-0.0-0.1"
    "355","Dog1.jpg","32","image-keyboard-response","2","10305","0.0-0.0-0.2"
    "381","Dog3.jpg","32","image-keyboard-response","3","10690","0.0-0.0-0.3"
    "378","Dog1.jpg","32","image-keyboard-response","4","11071","0.0-0.0-0.4"
    "333","Dog2.jpg","32","image-keyboard-response","5","11407","0.0-0.0-0.5"
    "329","Dog1.jpg","32","image-keyboard-response","6","11741","0.0-0.0-0.6"
    "370","Dog2.jpg","32","image-keyboard-response","7","12113","0.0-0.0-0.7"
    "424","Dog3.jpg","32","image-keyboard-response","8","12539","0.0-0.0-0.8"

Exercise
........

Go back and change the ``factorial`` example to show a CSV table.
(:ref:`Here's how <showcsv06>`, in case you get stuck).

What's missing from the table? [#missing]_ (see footnote for the answer!)

Sending the data to the server
------------------------------

First, we'll write a small program that runs on the server when a particular page is accessed.
This receives the data and saves it to disk.

.. topic:: ``server_data`` and security

    You'll have noticed that on the server there's a folder called ``server_data``. This is where
    the results will be stored.

    For security reasons, it would be bad for your experiment to be
    able to add files to the ``public_html`` area. Anything there could then be seen by the outside
    world, and could then be used to spread viruses or for other malicious purposes. [#ourserver]_

    .. include:: site_specific/uni_security.rst

This small program is in a different programming language called PHP. I won't go into the details
of this -- if you're interested, PHP has a lot in common with Javascript.

Create a file called ``record_result.php``, and add the code found on :doc:`this page <example_code/record_result>`.

Edit the text to replace UUN with your username. Now upload the file to the same place as the ``factorial`` example.

As I said before, this code will receive the data. Now we need to write some code to *send* the data. Remember
that the experiment is running entirely in the participant's web browser. We'll write some code that sends all
of the data from the experiment to the server. This will happen right at the end of the experiment.

In the ``experiment.js`` file, add a new function:

.. code:: javascript

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

.. topic:: fetch

    This uses a function called ``fetch``. Note that this doesn't
    work on Internet Explorer. If you need the experiment
    to be available on IE, you can either use a different method to send the data (see
    `the jsPsych documentation <http://www.jspsych.org/overview/data/#storing-data-permanently-as-a-file>`_ )
    or use the `fetch polyfill <https://github.com/github/fetch>`_ [#polyfills]_ .

Now finally, we need to change the experiment to send the data. Change your call to ``jsPsych.init``
to contain:

.. code:: javascript

        on_finish: function(){
            var experiment_data = jsPsych.data.get();
            saveData("test.csv", experiment_data.csv());
        }

This should replace any previous ``on_finish`` that was in the call.

This calls our new ``saveData`` function with a filename (``test.csv``) and a CSV copy of the data.

Note that the previous code called the ``displayData()`` function, which just shows the data on the screen.
This new code calls ``jsPsych.data.get()`` to get a ``DataCollection`` object. Then we call the ``DataCollection``'s
``csv()`` method, to get that data as CSV. ``DataCollection`` objects are a new feature of jsPsych, which
give you lots of control over your data. We'll take a look at some specific things later -- for now,
`here's a link to the documentation <http://www.jspsych.org/core_library/jspsych-data/#datacollection>`_

How it works
------------

The protocol used for the web, HTTP, has two different ways of getting web pages. [#http]_ These are called GET and POST.

To use GET, a web browser sends a request with a URL [#url]_ and gets back a page. Any extra information
in a GET must be included in the URL. It will look something like this:

.. code::

    http://example.com/page?colour=red&size=3

Here after the location of the page, there are two values -- "colour" is "red" and "size" is "3".

Instead of sending data this way, for larger amounts of data, a POST is used. This might
be used to send data from a web form, for example. The data are not sent in the URL -- instead, the browser sends them
attached to the request, in a way that isn't visible to the user.

The data that we send is:

.. code::

    { filename: "test.csv", filedata: "\"rt\",\"stimulus\",\"key_press\",\"trial_type\",\"trial_index\", .... " }

where ``filedata`` contains the whole contents of the CSV file. The PHP program at the other end receives this data
in the POST.
It opens a file corresponding to the given filename, and saves the data in it.

Solution
--------

Here's an :ref:`example experiment <datasaving>` which demonstrates saving
data at the end of the experiment.

Adding new data fields
----------------------

You will almost certainly want to store more data than jsPsych gives you by default.

Some data will remain the same for the whole test for each participant, such as
participant number or demographics. Other data will change for each trial. Let's look at both of these.

.. _addproperties:

Data that doesn't change
........................

You can add this using ``jspsych.data.addProperties()``. For example, let's add the date and time of the start of
the experiment.

Before your ``jsPsych.init``, add the code:

.. code:: javascript

    jsPsych.data.addProperties({ start_time: (new Date()).toISOString() });

This adds a new column with the time at the start of the experiment. (Of course, you have to be cautious with this
information, as it will give the time on the participant's computer!)

Data that does change
.....................

You can add extra information that varies for each trial. If you haven't already, add a fixation node to your
current copy of the ``factorial`` experiment. (You can see how this is done
:ref:`here <factorial_with_fixation>` ). The fixation uses the ``jspsych-html-keyboard-response`` plugin so
remember to add this to your ``experiment.html`` file.

Now run the experiment again. You'll see that the fixation node also generates a line in the output.

.. code::

    "rt","stimulus","key_press","trial_type","trial_index","time_elapsed","internal_node_id"
    "null","+","null","html-keyboard-response","0","753","0.0-0.0-0.0"
    "1010","Dog1.jpg","32","image-keyboard-response","1","1777","0.0-0.0-1.0"
    "null","+","null","html-keyboard-response","2","2283","0.0-0.0-0.1"

We might want to filter these (or other nodes) out. To add this to the nodes, we use the ``data`` field.

In the ``fixation`` node, add:

.. code::

    data: { type: 'fixation' }

Remember that you'll need to add a comma to the line before, so something like:

.. code::

    var fixation = {
        ....
        response_ends_trial: false,
        data: { type: 'fixation' }
    };

Now do the same for the ``trial`` node, but add:

.. code::

    data: { type: 'trial' }

Run your experiment again. There should be a new column, with "trial" or "fixation". This will make it easier
to filter out fixations.

.. topic:: Filters

    If you want to try this out using jsPsych's built in filters, make sure you have data saving implemented
    as in the previous section.

    Replace ``jsPsych.data.get()`` with

    .. code:: javascript

        jsPsych.data.get().filter({ type: 'trial' });

    That should return just the data from the nodes with "type" equal to "trial".

    While this is good for testing, it's always safer to save *all* the raw data, and filter it in analysis.

    If you get filtering wrong in analysis, you can run it again. If you get filtering wrong when saving the
    data, anything which was filtered out is gone forever!

We can also add new fields which change every time. In the ``trial`` node, change ``data`` part to read:

.. code:: javascript

    data: {
        type: "trial",
        stimulus_duration: jsPsych.timelineVariable('stimulus_duration'),
        fixation_duration: jsPsych.timelineVariable('fixation_duration')
    }

This will tell jsPsych to copy these values into the data. Reload the experiment and you should see two
new columns for these values.

Sending the data line by line
-----------------------------

For some experiments you may want to send each line individually. This requires a little more effort!

Make a copy of your experiment -- we'll adapt this one to send the data for each trial as it's completed.

Delete ``on_finish`` and the associated code from ``jsPsych.init``.

In its place, add:

.. code:: javascript

    on_data_update: saveDataLine

This specifies a new function to be called every time the data are updated.
Now before ``jsPsych.init``, add this new function:

.. code:: javascript

    function saveDataLine(data) {
        // choose the data we want to save
        var data_to_save = [
            data.type, data.stimulus, data.stimulus_duration, data.fixation_duration, data.rt
        ];
        // join these with commas and add a newline
        var line = data_to_save.join(',')+"\n";
        saveData("test.csv", line);
    }

This will work with the existing ``record_result.php``, because it will append to an existing file.

We could also use ``if`` to only save particular trials. For example:

.. code:: javascript

    function saveDataLine(data) {
        if (data.type == 'trial') {
            // choose the data we want to save
            var data_to_save = [
                data.type, data.stimulus, data.stimulus_duration, data.fixation_duration, data.rt
            ];
            // join these with commas and add a newline
            var line = data_to_save.join(',')+"\n";
            saveData("test.csv", line);
        }
    }

Here's an :ref:`example experiment <linebyline>` which demonstrates saving data
line-by-line.

Exercise
--------

In online experiments it's quite common to have the participant type in an ID number,
for example their Crowdflower ID or Amazon MTurk number, that will allow you to
verify their participation and pay them.

Add a node at the beginning of your code which allows the user to input an ID, using
`the survey-text plugin <http://www.jspsych.org/plugins/jspsych-survey-text/>`_ . (Remember you'll also have to add a ``<script>`` tag
to your ``experiment.html`` file to load the plugin). Add this node to your experiment
at the beginning. This works a little differently to the plugins we've seen before,
so be sure to read the documentation before you start.

Before you go any further, run the experiment and check that this new node only appears
once at the beginning of the experiment. Check the console to make sure there are no
errors.

In your new node, add a new item ``on_finish``. This specifies a function to call
when the trial is finished. Create an *anonymous function* (this is a function
without a name -- see :ref:`this section <functions>`), and inside it use
``jsPsych.data.addProperties`` (see :ref:`this section <addproperties>`) to add
a new column to the data which includes the ID. The function you pass to
``on_finish`` receives the data from the trial as an
argument -- take a look at the documentation
`here <http://www.jspsych.org/overview/callbacks/#on_finish-trial>`_ .

**Hint:** to get the response out of the ``survey-text`` trial, use

.. code:: javascript

    data.response.Q0

(If you gave your question a name, you'll need to use this instead of "Q0").

This is quite involved so don't be too worried if you don't get it straight away --
take some time to look in the documentation, use the Developer Tools, and feel free
to ask questions!

.. topic:: Previous versions of jsPsych

    In previous versions of jsPsych the response was called `responses` rather
    than `response` and coded as JSON. So the equivalent of the above in the
    older jsPsych versions would be:

    `JSON.parse(data.responses).Q0`

    It's much better to update to the latest jsPsych, though!


Here's an example :ref:`solution to this exercise <surveytext>` which takes the
result of a ``survey-text`` node and adds it as a new column.

.. rubric:: Footnotes

.. [#ourserver] This doesn't apply to our server, ``jspsychlearning.ppls.ed.ac.uk``, which is
    behind the University firewall -- but most
    real online experiments will be made accessible to the world.

.. [#missing] The ``stimulus_duration`` field is missing -- we'll see how to add this to the output later on.

.. [#polyfills] In JavaScript programming, a *polyfill* is a piece of code which implements a particular function,
    usually for browsers that don't have that function.

.. [#http] .... and a few other methods for things like changing and deleting pages, but these are seldom used.

.. [#url] In case you've ever wondered, **U** niform **R** esource **L** ocator.
