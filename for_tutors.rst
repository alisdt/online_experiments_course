Information for tutors
======================

How to create user accounts
---------------------------

Log in to the server. On a Mac or Linux open a terminal and use:

``ssh username@jspsychlearning.ppls.ed.ac.uk``

On Windows you can use PuTTY: `https://the.earth.li/~sgtatham/putty/latest/w64/putty.exe <https://the.earth.li/~sgtatham/putty/latest/w64/putty.exe>`_
Once you've logged in successfully you will see a command line prompt e.g. mine is:

``[atullo2@jspsychlearning ~]$``

Type the following:

``sudo newuser_autopass.sh username``

where "username" is the UUN of the person to add.
The password uses English words to make it a bit easier to remember & type. The word list has been filtered to take out problematic words, but if you don't like what has been generated, type:

``su username``
``passwd``

(again where username is the UUN of the new user). You'll be able to choose a password instead. If you did this you are now logged in as the new user, use Ctrl-D to log out.

How to unban IP addresses
-------------------------

If someone fails to log in five times in a row, their IP address will be banned. First log in as above ("how to create user accounts"). Now run the command:

``sudo fail2ban-client status sshd``

This will list all the currently banned IPs.
If there's only one, or you know which one is the blocked user, run:

``sudo fail2ban-client unban 12.34.56.78``

replacing the example above with the real IP address.
As a last resort, you can also run:

``sudo fail2ban-client unban --all``

This will unban all IP addresses and your user should be able to reconnect.
If a user has problems logging in, it might also be worth checking that the user is using the correct username (just their UUN, not UUN@ed.ac.uk). You could also reset their password.

How to reset user passwords
---------------------------

You can safely re-run the user creation process for an existing user, it won't delete any of their files etc., you'll see a message "user .... already exists". It will then reset their password to a new random one, which you can pass on to them.

Sharing passwords with students
-------------------------------

To share a password in person, just write it on a bit of paper. If you have to reset a password when the student isn't present, creating a Word document in OneDrive and share it with just that student. (This system is only available inside the University firewall so we aren't insisting on as much security as we would otherwise).
