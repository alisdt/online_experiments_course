from pathlib import Path
import re

DIR_I_EXPECT_TO_BE_IN = "example_src"

JSPSYCH_VERSION = "7.3.3"

PLUGIN_VERSION = "1.1.2"

SUBDIRS_TO_EXCLUDE = ("images", "s02", "s05", "save_data", "debugging")

PLUGIN_TEMPLATE = """\
        <script src="https://unpkg.com/@jspsych/{plugin_name}@{plugin_version}"></script>"""

HTML_TEMPLATE = """\
<html>
    <head>
        <title>{title}</title>
        <script src="https://unpkg.com/jspsych@{jspsych_version}"></script>
{plugin_script_tags}
        <script src="{js_filename}"></script>
        <link href="https://unpkg.com/jspsych@{jspsych_version}/css/jspsych.css" rel="stylesheet" type="text/css" />
        {extra_css}
        </head>
    <body></body>
</html>
"""

STROOP_CSS_DIRS = ("stroop_functions", "stroop_loop", "stroop_timeline_variables")

STROOP_CSS = """
        <style>
          body {
            background-color: #777777;
          }
          .jspsych-display-element {
             font-size: xx-large;
             font-family: sans;
             font-weight: bold
          }
        </style>
"""



# error if not in example_src dir
assert Path.cwd().parts[-1] == DIR_I_EXPECT_TO_BE_IN, f"Run this in {DIR_I_EXPECT_TO_BE_IN}"

def plugin_js_to_url(plugin_js):
    # e.g. jsPsychImageKeyboardResponse -> plugin-image-keyboard-response
    assert plugin_js[:7] == "jsPsych", f"Plugin name that doesn't start with jsPsych: {plugin_js}"
    plugin_js = plugin_js[7:]
    words = []
    current_word = plugin_js[0]
    for letter in plugin_js[1:]:
        if letter.isupper(): # start a new word
            words.append(current_word)
            current_word = ""
        current_word += letter
    words.append(current_word) # and get the last one
    return "plugin-"+"-".join(w.lower() for w in words) 

dirs_skipped = 0
html_files_written = 0
for item in Path.cwd().iterdir():
    if not item.is_dir():
        continue
    if item.name in SUBDIRS_TO_EXCLUDE:
        dirs_skipped += 1
        continue
    js_file_paths = tuple(item.glob("*.js"))
    assert len(js_file_paths) == 1, f"No or too many JS files: {js_file_paths}"
    js_file_path = js_file_paths[0]
    with open(js_file_path) as js_file:
        js = js_file.read()
        # find all plugin names
        plugin_matches = set(re.findall(r"type:\s+(jsPsych\w+)", js))
        #plugin_str = '\n'.join(plugin_matches)
        #print(f"\n\n{js_file_path}\n{plugin_str}")
        if not plugin_matches:
            print(f"No plugins found for {js_file_path}, html not generated")
            continue
        plugin_str = "\n".join(
            PLUGIN_TEMPLATE.format(
                plugin_name = plugin_js_to_url(plugin_js),
                plugin_version = PLUGIN_VERSION
            )
            for plugin_js in plugin_matches
        )
        css = ""
        if item.name in STROOP_CSS_DIRS:
            css = STROOP_CSS
        html = HTML_TEMPLATE.format(
            title = str(item.name),
            jspsych_version = JSPSYCH_VERSION,
            plugin_script_tags = plugin_str,
            js_filename = js_file_path.name,
            extra_css = css
        )
        with open(js_file_path.with_suffix(".html"),"w") as html_file:
            html_file.write(html)
            html_files_written += 1

print(f"Finished! Skipped {dirs_skipped} dirs and wrote {html_files_written} HTML files.")
