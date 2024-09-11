Allocating participant and condition numbers
============================================

How can participant IDs be allocated to participants in an online experiment?

Back to GET - externally allocated IDs
--------------------------------------

Remember that last week we talked about the HTTP GET method, which allows us to
pass parameters along to web pages. The example given was:

.. code::

    http://example.com/page?colour=red&size=3


What if it looked like this:

.. code::

    http://example.com/experiment.html?participant=12

We can use this method to pass a participant number to jsPsych, and it has a very
convenient way of receiving it.

Make another copy of the latest version of your experiment and call it ``id_in_url``.

Now right at the top of ``experiment.js``, add this code:

.. code:: javascript

    var participant_id = jsPsych.data.getURLVariable('participant');
    jsPsych.data.addProperties({participant: participant_id});

In your web browser, load up the new copy of the experiment. In your browser, at the
end of the URL, add a participant number as above. So it will look something like:

.. include:: site_specific/url_with_ppt_number.rst

Complete the experiment. When you look at the data, you should see a new column
called "participant", equal to the number that you entered.

Where should participant numbers come from?
-------------------------------------------

There are two possibilities here. One is that the participant will be sent from some
external service (e.g. Amazon MTurk or Crowdflower, or a Qualtrics survey) and there
will already be an ID in the URL. In this case, you need to record the ID as above.

We can also create our own small program on the server which allocates participant IDs.
Open a new file called ``participant_id_allocator.php`` and copy this code into it:

.. include:: site_specific/allocator.rst

This code will:

* Try to read a file in ``server_data`` called ``participant_id.txt``
* If the file doesn't exist, set the variable ``$id`` to zero
* If the file does exist, open it and interpret the contents as a whole number
* Add one to ``$id``
* Write ``$id`` to ``participant_id.txt``
* Send ``$id`` back -- so this will be sent back to our experiment code where we can record the ID.

The file ``participant_id.txt`` should always contain the last ID that was used. Every
time this is accessed (and the program runs), it will increase the ID by 1, and forward
to the experiment with the new ID.

You should be able to go to

.. include:: example_code/allocator_link.rst

This will send back a participant ID and you'll see it on the page. Every time you load or reload the page, the ID should increase by 1.

Finally, since ``participant_id.txt`` always contains the next participant number,
you can edit it to change the next participant ID, or delete it to start again at 1.

Adding this to an experiment
----------------------------

Make another copy of your experiment (without the ``id_in_url`` changes). We'll modify this to use the PHP ID allocator.

Add the ``call-function`` plugin to your HTML file (see `https://www.jspsych.org/v8/plugins/call-function/ <https://www.jspsych.org/v8/plugins/call-function/>`_).

At the top of the experiment add:

.. code:: javascript

    var participant_id;

Then add a new node to your experiment which will call ``participant_id_allocator.php`` and get a new participant ID.

.. code:: javascript

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
                })
                .then(done())

        }
    }

Better data filenames
---------------------

At the moment the data are still being written to a file called "test.csv". Let's fix that!

In the part of the code where we save the data, we can add the participant number to the filename.

Look for code like this:

.. code:: javascript

    on_finish: function() {
        var experiment_data = jsPsych.data.get();
        save_data("test.csv", experiment_data.csv());
        // show results as well - take this out when doing real testing!
        jsPsych.data.displayData("csv");
    }

and change it to this:

.. code:: javascript

    on_finish: function(){
        var experiment_data = jsPsych.data.get();
        save_data(participant_id+"_data.csv", experiment_data.csv());
        // show results as well - take this out when doing real testing!
        jsPsych.data.displayData("csv");
    }

This adds the participant ID to the filename, so that they will be called ``1_data.csv``, ``2_data.csv``,
and so on.

We could also add the date to the filename. It's better to do this on the server, as the
participant's computer may have the date wrong. In ``save_data.php``, change the line:

.. code:: php

  $path = $server_data."/".$obj["filename"];

to this:

.. code:: php

  $path = $server_data."/".date("Y-m-d")."_".$obj["filename"];

This adds the date (according to the *server* clock) to the start of the filename, plus an underscore
character ``_`` to separate this date from the rest of the name.

Run your experiment again (starting from the ID allocator) and you should see a new file in
``server_data`` with a filename something like this:

.. code::

    2018-02-11_3_data.csv

Condition number
----------------

When running an experiment, it's common to want to counterbalance participants
between several conditions. The usual way to do this is allocate them in order. For example,
for three conditions:

============== =========
Participant ID Condition
============== =========
1              1
2              2
3              3
4              1
5              2
6              3
7              1
etc.           etc.
============== =========

We can easily allocate conditions using JavaScript modulus, ``%``.

The code:

.. code:: javascript

    var x = y % z;

gives the remainder when ``y`` is divided by ``z``.

In our example:

============== ==================
Participant ID Remainder (ID % 3)
============== ==================
1              1
2              2
3              0
4              1
5              2
6              0
7              1
etc.           etc.
============== ==================

Let's add this to the experiment. At the top of ``experiment.js``, add this:

.. code:: javascript

    var condition_number;

Then in the ``call-function`` node where we get the participant number, replace this line:

.. code:: javascript

    .then(function (result) {participant_id = result;})

with this:

.. code:: javascript

    .then(function (result) {
        participant_id = result;
        // condition number is the remainder of participant_id divided by 3
        condition_number = participant_id % 3;
        // if remainder is 0 change to 3 (so the conditions will be 1,2,3)
        if (condition_number == 0) {
            condition_number = 3;
        }
    })

Run your experiment and check that the condition number appears in the output.

Example
-------

See :ref:`this example <allocator>` of getting a participant number from the server, calculating a condition number, and changing the data filename.
