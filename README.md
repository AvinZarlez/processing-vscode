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

## Open project in Processing

To automatically open/build the project in Processing, first you need to be able to access Processing from your path.

* Open the "Advanced System Settings" by running sysdm.cpl
* In the "System Properties" window, click on the Advanced tab.
* In the "Advanced" section, click the Environment Variables button.
* Edit the "Path" variable. Append the processing path (e.g. ;C:\Program Files\Processing-3.0.1\) to the variable value. Each entry is separated with a semicolon.

Then, you will need to add a `.vscode/tasks.json` file to your VSCode working directory.

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

After you have done those two steps, you can press `CTRL+SHIFT+B` to run the task.

Your Processing project will compile and open immidately!

## Credits

Syntax highlighting and snippets code based on the [Processing Sublime Text plugin](https://github.com/b-g/processing-sublime).

## Other resources

Here are some other resources I recommend:

* [Processing's official site](https://processing.org/)
* [Tobiah Zarlez Blog](http://www.TobiahZ.com)
