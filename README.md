# Forked Project

Only difference from the original is a few extra lines in the ProcessingTask.json as a work around for a known bug in vscode when using git-bash on windows. The work around specifies that the vscode task should be run in cmd on windows.

If you're having the same problem feel free to use. To install,
1. Clone repo
2. run `npm i`
3. run `npm i -g vsce`
4. run `vsce`
5. Bring up command pallet in vs code (cnrl + shift + P) and run `Extensions: Install from VSIX...` then navigate to cloned repo and .vsix should be there.

# Processing for Visual Studio Code

[![Build Status](https://travis-ci.org/TobiahZ/processing-vscode.svg?branch=master)](https://travis-ci.org/TobiahZ/processing-vscode) [![Dependency Status](https://dependencyci.com/github/TobiahZ/processing-vscode/badge)](https://dependencyci.com/github/TobiahZ/processing-vscode)

[![Marketplace Version](https://vsmarketplacebadge.apphb.com/version/Tobiah.language-pde.svg)](https://marketplace.visualstudio.com/items?itemName=Tobiah.language-pde)
[![Installs](https://vsmarketplacebadge.apphb.com/installs/Tobiah.language-pde.svg)](https://marketplace.visualstudio.com/items?itemName=Tobiah.language-pde)
[![Rating](https://vsmarketplacebadge.apphb.com/rating/Tobiah.language-pde.svg)](https://marketplace.visualstudio.com/items?itemName=Tobiah.language-pde)

## What this extension is

This is a Visual Studio Code extension created by Tobiah Zarlez to add Processing language support.

## What this extension isn't

This extension does not allow you to debug Java or Processing projects.

### Can you add XZY feature?

Possibly! [Let us know](https://github.com/TobiahZ/processing-vscode/issues), we'd love to hear your suggestions.

## Installation Instructions

1. Open [Visual Studio Code](https://code.visualstudio.com/)
1. Open the Command Pallet (`CTRL+SHIFT+P` for Windows/Linux or `CMD+SHIFT+P` on Mac) enter the command “Install Extension”
1. Search for “Processing Language” and click on this extension.
1. Restart Visual Studio Code

## Feature list

### Syntax highlighting

Open any .pde file, or simply choose "Processing" from the drop down menu in the bottom right corner.

### Snippets

Once the language has been set, you will see code snippets pop up automatically as you type!

### Command: Create Task File

Adds a `.vscode/tasks.json` file to your project folder, that has the contents of the `ProcessingTasks.json` located in the root folder of this project.

When you run this task (Keyboard shortcut: `Ctrl+Shift+B`), it will compile and run your project!

If you would like to see output from the compiler, simply comment out the line `"showOutput": "never",`

**NOTE:** Processing must be added to your path, or you must set the "processing.path" setting!

Follow [these instructions](#add-processing-to-path) to add Processing to your path, or these [alternate instructions](#alternate-method) instead to modify the path setting.

See "[Requirements](#requirements)" for full details.

### Command: Run Processing Project

This is just a shortcut for running the `.vscode/tasks.json` file. Same as pressing `Ctrl+Shift+B`

**Note: Must have ran the "Create Processing Task File" command first, [see above](#command-create-task-file)!**

### Command: Open Extension Documentation

Opens this documentation.

### Command: Open Documentation for Selection

Use the pallet command "Processing: Open Documentation for Selection" to open the processing documentation for the current selection.

### Command: Search Processing Website

Use the pallet command "Processing: Search Processing Website" to quickly search whatever you want on the processing website.


## Requirements

Installing the extension will give you instant access to [syntax highlighting](#syntax-highlighting) and [snippets](#snippets).

However, in order to compile and run your processing project from Visual Studio Code, you will need to do three things:

1. Set up your `.vscode/tasks.json` file. (See: "[Command: Create Task File](#command-create-task-file)")
1. Add Processing to your path **OR** Modify your `.vscode/tasks.json` file. (See: "[Add Processing to path](#add-processing-to-path)" or "[alternate method](#alternate-method)")
1. Have a `<File>.pde` whose filename matches the name of the project's folder (General Processing Requirement). Your file cannot contain any spaces or it will not run correctly.

## Add Processing to path

In order to automatically compile and open from Visual Studio Code, I recommend adding Processing to your path.

### What does that mean?

That means you should be able to type the `processing` from anywhere on your machine, and it will open Processing.

### How do I do that?

It's easier than you might think!

#### Windows

* Open the "Advanced System Settings" by running sysdm.cpl
* In the "System Properties" window, click on the Advanced tab.
* In the "Advanced" section, click the Environment Variables button.
* Edit the "Path" variable. Append the processing path (Example: `;C:\Program Files\Processing-3.0.1\`) to the variable value. Each entry is separated with a semicolon.

#### Mac

Open Processing, and click the `Tools` -> `Install "processing-java"` menu item.

**Note:** You will have to install processing-java for all users for this to work

#### Linux

Set your `PATH` to where your processing application is located.

Example: `export PATH=$PATH:/opt/processing/processing-2.0b4`

You also need to create an alias for `processing-java` in `/bin/` instead of `/usr/bin/`.

Example: `sudo ln -s /opt/processing/processing-java /bin/processing-java`

### Then what?

Once you've installed Processing to your path, you just need to add the appropriate `.vscode/tasks.json` file to every Processing project.

See the command "[Create Task File](#command-create-task-file)"

### Alternate Method

What if you cannot, or do not want to add Processing to your path?

Simply modify the `processing.path` setting to follow the path to wherever processing is installed on your machine. Be sure to remember to keep the `processing-java` at the end of the path!

To change settings in VSCode, here is a link to the [official documentation](https://code.visualstudio.com/docs/getstarted/settings).

(Remember, for Windows be sure to turn any "`\`" into "`\\`"!)

Example:

```json
    "processing.path": "C:\\Program Files\\processing-3.0.1\\processing-java",
```

**NOTE:** This is untested on Mac and Linux

## To Do List

* `[Research Needed]` Debugging support
* `[Medium Priority]` Take nice looking (Animated?) screen shots for README/Instructions
* `[Low Priority]` Create proper Mocha tests

## Credits

Syntax highlighting and snippets code based on the [Processing Sublime Text plugin](https://github.com/b-g/processing-sublime).

## Other resources

Here are some other resources I recommend:

* [Processing's official site](https://processing.org/)
* [Tobiah Zarlez Blog](http://www.TobiahZ.com)
