# fetch jspsych, unzip, copy into relevant examples

wget https://github.com/jspsych/jsPsych/releases/download/v6.3.1/jspsych-6.3.1.zip
unzip jspsych-6.3.1.zip
for example in s02 s04 s05 datasaving;
do
  ln -s ../jspsych-6.3.1 ${example}/jspsych-6.3.1;
done

wget https://softdev.ppls.ed.ac.uk/online_experiments/images.zip
unzip images.zip
for example in datasaving;
do
  cp images/* ${example};
done
