# Processing for Visual Studio Code
[![Build Status](https://travis-ci.org/TobiahZ/processing-vscode.svg?branch=master)](https://travis-ci.org/TobiahZ/processing-vscode)
## What this extension is

This is a Visual Studio Code extension created by Tobiah Zarlez to add Processing language support.

## What this extension isn't

This extension does not allow you to debug Java or Processing projects.

### Can you add XZY feature?

Possibly! Let me know, I'd love to hear your suggestions.

## Feature list:
### Syntax highlighting

Open any .pde file, or simply choose "Processing" from the drop down menu in the bottom right corner.

### Snippets

Once the language has been set, you will see code snippets pop up automatically as you type!

### Command: Create Processing Task File

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

When you run this task (Keyboard shortcut: `Ctrl+Shift+B`), it will compile and run your project! (Make sure to follow all the [other requirements](#Requirements)

If you would like to see output from the compiler, simply comment out the line `"showOutput": "never",`

### Command: Run Processing Project

Same as pressing `Ctrl+Shift+B`

**Note: Must have ran the "Create Processing Task File" command first, [see above](#Command-Run-Processing-Project)!**

## Requirements

Installing the extension will give you instant access to [syntax highlighting](#Syntax-highlighting) and [snippets](#snippets).

However, in order to compile and run your processing project from Visual Studio Code, you will need to do three things:

1. Set up your `.vscode/tasks.json` file. (See: "[Command: Create Processing Task File](#Command-Run-Processing-Project)")
1. Add Processing to your PATH. (See: "[Add Processing to path](#Add-Processing-to-path)")
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
* Edit the "Path" variable. Append the processing path (e.g. ;C:\Program Files\Processing-3.0.1\) to the variable value. Each entry is separated with a semicolon.

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

See the command "[Create Processing Task File](#Command-Run-Processing-Project)"

## Credits

Syntax highlighting and snippets code based on the [Processing Sublime Text plugin](https://github.com/b-g/processing-sublime).

## Other resources

Here are some other resources I recommend:

* [Processing's official site](https://processing.org/)
* [Tobiah Zarlez Blog](http://www.TobiahZ.com)
