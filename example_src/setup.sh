# fetch jspsych, unzip, copy into relevant examples

for example in s02 s04;
do
  cp nasa_proxima.png ${example};
done

for example in datasaving linebyline save_data survey_text allocator;
do
  cp save_data.php ${example};
done

# Don't need this any more, switch to CDN
# rm -r dist jspsych jspsych.zip
# wget https://www.github.com/jspsych/jspsych/releases/latest/download/jspsych.zip
# unzip -o jspsych.zip dist/*
# mv dist jspsych
# for example in s02 s04 repetition s05 datasaving factorial_with_fixation factorial linebyline debugging;
# do
#   ln -s ../jspsych ${example}/jspsych;
# done

wget https://softdev.ppls.ed.ac.uk/online_experiments/images.zip
unzip -o images.zip
for example in s04_multi_image multiple_images repetition datasaving trials_with_variables factorial_with_fixation factorial linebyline survey_text allocator;
do
  cp images/* ${example};
done
