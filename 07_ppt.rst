Allocating participant and condition numbers
============================================

How can participant IDs be allocated to participants in an online experiment?
Sequential participant IDs are the best to deal with,
as these will allow us to counterbalance between a number of conditions.

All of the code we've written for the experiment so far will only run on the
participant's computer. The participant's computer *can't* allocate a sequential
ID, as it doesn't know anything about the other participants. For that, we need
the server, as it can keep track of IDs that have already been allocated.

Back to GET
-----------

Remember that last week we talked about the HTTP GET method, which allows us to
pass parameters along to web pages. The example given was:

.. code::

    http://example.com/page?colour=red&size=3


What if it looked like this:

.. code::

    http://example.com/experiment.html?participant=12

We can use this method to pass a participant number to jsPsych, and it has a very
convenient way of receiving it.

Make another copy of the latest version of your experiment and call it ``allocator``.

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
will already be an ID in the URL.

We can also create our own small program on the server which forwards participants
to the experiment, with an ID. Open a new file called ``participant_id_allocator.php``
and copy this code into it:

.. include:: site_specific/allocator.rst

This code will:

* Try to read a file in ``server_data`` called ``participant_id.txt``
* If the file doesn't exist, set the variable ``$id`` to zero
* If the file does exist, open it and interpret the contents as a whole number
* Add one to ``$id``
* Write ``$id`` to ``participant_id.txt``
* Redirect to a given location (in this case ``experiment.html``) with the participant ID
  added as a GET parameter.

The file ``participant_id.txt`` should always contain the last ID that was used. Every
time this is accessed (and the program runs), it will increase the ID by 1, and forward
to the experiment with the new ID.

You should be able to go to

.. include:: site_specific/allocator_link.rst

and be redirected to your experiment with a participant ID of 1 allocated. If you go
back there again, the ID will be 2.

Because of the change we made to ``experiment.js``, these participant IDs will be present in the data file.

Finally, since ``participant_id.txt`` always contains the next participant number,
you can edit it to change the next participant ID, or delete it to start again at 1.

Better data filenames
---------------------

At the moment the data are still being written to a file called "test.csv". Let's fix that!

In the part of the code where we save the data, we can add the participant number to the filename.

Look for code like this:

.. code:: javascript

    on_finish: function(){
        var experiment_data = jsPsych.data.get();
        saveData("test.csv", experiment_data.csv());
    }

and change it to this:

.. code:: javascript

    on_finish: function(){
        var experiment_data = jsPsych.data.get();
        saveData(participant_id+"_data.csv", experiment_data.csv());
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

(As usual you should change ``UUN`` into your username on the server).

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

Let's add this to the experiment. At the top of ``experiment.js``, after the
participant ID code, add this:

.. code:: javascript

    var condition_number = participant_id % 3;
    if (condition_number == 0) {
        condition_number = 3;
    }

We'll also want to record this in our results, so after that add:

.. code:: javascript

    jsPsych.data.addProperties({condition: condition_number});

Run your experiment and check that the condition number appears in the output.

Example
-------

See :ref:`this example <pptcondition>` of gathering a participant number
from the URL, calculating a condition number, and changing the data filename.
