# Processing for Visual Studio Code
[![Build Status](https://travis-ci.org/TobiahZ/processing-vscode.svg?branch=master)](https://travis-ci.org/TobiahZ/processing-vscode)
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

## Feature list:
### Syntax highlighting

Open any .pde file, or simply choose "Processing" from the drop down menu in the bottom right corner.

### Snippets

Once the language has been set, you will see code snippets pop up automatically as you type!

### Command: Create Task File

Adds the following `.vscode/tasks.json` file to your project folder:

```json
{
	"version": "0.1.0",
	"command": "processing-java",
	"isShellCommand": true,
	"showOutput": "never",
	"args": [
        "--force",
		"--sketch=${workspaceRoot}",
		"--output=${workspaceRoot}\\out",
		"--run"
    ]
}
```

When you run this task (Keyboard shortcut: `Ctrl+Shift+B`), it will compile and run your project! 

If you would like to see output from the compiler, simply comment out the line `"showOutput": "never",`

**NOTE: Processing must be added to your path**

Follow [these instructions](#add-processing-to-path) to add Processing to your path.

If you do not wish to do so, you could follow these [alternate instructions](#alternate-method) instead to modify this task.

See "[Requirements](#requirements)" for full details.

### Command: Run Processing Project

This is just a shortcut for running the `.vscode/tasks.json` file. Same as pressing `Ctrl+Shift+B`

**Note: Must have ran the "Create Processing Task File" command first, [see above](#command-create-task-file)!**

### Command: Open Extension Documentation

Opens this documentation.

## Requirements

Installing the extension will give you instant access to [syntax highlighting](#syntax-highlighting) and [snippets](#snippets).

However, in order to compile and run your processing project from Visual Studio Code, you will need to do three things:

1. Set up your `.vscode/tasks.json` file. (See: "[Command: Create Task File](#command-create-task-file)")
1. Add Processing to your path **OR** Modify your `.vscode/tasks.json` file. (See: "[Add Processing to path](#add-processing-to-path)" or "[alternate method](#alternate-method)")
1. Have a `<File>.pde` whose filename matches the name of the project's folder. (General Processing Requirement)

## Add Processing to path

In order to automatically compile and open from Visual Studio Code, you will need to be able to access Processing from your path.

### What does that mean?    
That means you should be able to type the `processing` from anywhere on your machine, and it will open Processing.

### How do I do that?

It's easier than you might think!

#### Windows:

* Open the "Advanced System Settings" by running sysdm.cpl
* In the "System Properties" window, click on the Advanced tab.
* In the "Advanced" section, click the Environment Variables button.
* Edit the "Path" variable. Append the processing path (Example: `;C:\Program Files\Processing-3.0.1\`) to the variable value. Each entry is separated with a semicolon.

#### Mac:

Open Processing, and click the `Tools` -> `Install "processing-java"` menu item.

**Note: You will have to install processing-java for all users for this to work**

#### Linux:

Set your `PATH` to where your processing application is located.

Example: `export PATH=$PATH:/opt/processing/processing-2.0b4`

You also need to create an alias for `processing-java` in `/bin/` instead of `/usr/bin/`.

Example: `sudo ln -s /opt/processing/processing-java /bin/processing-java`

### Then what?

Once you've installed Processing to your path, you just need to add the appropiate `.vscode/tasks.json` file to every Processing project.

See the command "[Create Task File](#command-create-task-file)"

### Alternate Method

What if you cannot, or do not want to add Processing to your path?

Simply modify the `.vscode/tasks.json` file to go directly to wherever Processing is installed.

Find the `"command"` entry, and append your installation path to the beginning of `processing-java`. 

(Be sure to turn any "`\`" into "`\\`"!)

Example:
```json
	"command": "C:\\Program Files\\processing-3.0.1\\processing-java",
```

**NOTE: This is untested on Mac and Linux**

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
