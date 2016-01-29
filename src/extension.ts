import * as vscode from 'vscode';

var fse = require('fs-extra');

function remindAddToPath() {
    return vscode.window.showInformationMessage("Remember to add Processing to your path!", "Learn More").then((item) => {
        if (item === "Learn More") {
            //Open a URL using the npm module "open"
            let open = require("open");
            open("https://github.com/TobiahZ/processing-vscode#add-processing-to-path")
        }
    });
}

export function activate(context: vscode.ExtensionContext) {

    console.log('Processing language extension is now active!');

    var disposable = vscode.commands.registerCommand('extension.createTaskFile', () => {

        var pdeTaskFile = context.extensionPath + "/ProcessingTasks.json";

        if (vscode.workspace.rootPath == undefined) {
            vscode.window.showErrorMessage("Open project folder first");
        } else {
            var taskPath = vscode.workspace.rootPath + "/.vscode/tasks.json";
            console.log('checking if exists');
            fse.stat(taskPath, (err, stats) => {
                if (err && err.code === 'ENOENT') {
                    // Task file doesn't exist, creating it
                    fse.copy(pdeTaskFile, taskPath, function(err) {
                        if (err) {
                            return console.log(err);
                        }
                        remindAddToPath();
                    });
                } else if (err) {
                    vscode.window.showErrorMessage("When checking if tasks.json exists: " + err);
                } else if (stats.isFile()) {
                    return vscode.window.showErrorMessage("tasks.json already exists. Overwrite it?", "Yes").then((item) => {
                        if (item === "Yes") {
                            fse.copy(pdeTaskFile, taskPath, function(err) {
                                if (err) {
                                    return console.log(err);
                                }
                                remindAddToPath();
                            });
                        }
                    });
                }
            }
        }
    });

    context.subscriptions.push(disposable);

}

// this method is called when your extension is deactivated
export function deactivate() {
}