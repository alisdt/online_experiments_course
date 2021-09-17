# fetch jspsych, unzip, copy into relevant examples

for example in s02 s04;
do
  cp nasa_proxima.png ${example};
done

for example in datasaving linebyline save_data;
do
  cp save_data.php ${example};
done

wget https://github.com/jspsych/jsPsych/releases/download/v6.3.1/jspsych-6.3.1.zip
unzip -o jspsych-6.3.1.zip
for example in s02 s04 s05 datasaving factorial_with_fixation factorial linebyline;
do
  ln -s ../jspsych-6.3.1 ${example}/jspsych-6.3.1;
done

wget https://softdev.ppls.ed.ac.uk/online_experiments/images.zip
unzip -o images.zip
for example in datasaving factorial_with_fixation factorial linebyline;
do
  cp images/* ${example};
done
