import * as vscode from 'vscode';

let fs = require("fs");
let open = require("open")

function copyFile(source, target, cb) {
  var cbCalled = false;

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
  
  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

}

function remindAddToPath() {
    return vscode.window.showInformationMessage("Remember to add Processing to your path!", "Learn More").then((item) => {
        if (item === "Learn More") {
            //Open a URL using the npm module "open"
            open("https://github.com/TobiahZ/processing-vscode#add-processing-to-path")
        }
    })
}

export function activate(context: vscode.ExtensionContext) {

    console.log('Processing language extension is now active!')

    var create_task_file = vscode.commands.registerCommand('extension.processingCreateTaskFile', () => {

        var pdeTaskFile = context.extensionPath + "/ProcessingTasks.json"

        if (vscode.workspace.rootPath == undefined) {
            vscode.window.showErrorMessage("Open project folder first")
        }
        else {
            var taskPath = vscode.workspace.rootPath + "/.vscode/tasks.json"
            fs.stat(taskPath, (err, stats) => {
                if (err && err.code === 'ENOENT') {
                    // Task file doesn't exist, creating it
                    copyFile(pdeTaskFile, taskPath, function(err) {
                        if (err) {
                            return console.log(err)
                        }
                        remindAddToPath()
                    })
                } else if (err) {
                    vscode.window.showErrorMessage("When checking if tasks.json exists: " + err)
                } else if (stats.isFile()) {
                    return vscode.window.showErrorMessage("tasks.json already exists. Overwrite it?", "Yes").then((item) => {
                        if (item === "Yes") {
                            copyFile(pdeTaskFile, taskPath, function(err) {
                                if (err) {
                                    return console.log(err)
                                }
                                remindAddToPath()
                            })
                        }
                    })
                }
            });
        }
    });
    context.subscriptions.push(create_task_file);

    var run_task_file = vscode.commands.registerCommand('extension.processingRunTaskFile', () => {
        if (vscode.workspace.rootPath == undefined) {
            vscode.window.showErrorMessage("Open project folder first")
        }
        else {
            var taskPath = vscode.workspace.rootPath + "/.vscode/tasks.json"
            fs.stat(taskPath, (err, stats) => {
                if (err && err.code === 'ENOENT') {
                    return vscode.window.showErrorMessage("Create task file first!", "Create").then((item) => {
                        if (item === "Create") {
                            copyFile(context.extensionPath + "/ProcessingTasks.json", taskPath, function(err) {
                                if (err) {
                                    return console.log(err)
                                }
                                remindAddToPath()
                            });
                        }
                    })
                } else if (err) {
                    vscode.window.showErrorMessage("When checking if tasks.json exists: " + err)
                } else if (stats.isFile()) {
                    vscode.commands.executeCommand("workbench.action.tasks.build")
                }
            });
        }
    });
    context.subscriptions.push(run_task_file);

    var open_documentation = vscode.commands.registerCommand('extension.processingOpenDocumentation', () => {
        open("https://github.com/TobiahZ/processing-vscode#processing-for-visual-studio-code")
    });
    context.subscriptions.push(open_documentation);
}

// this method is called when your extension is deactivated
export function deactivate() {
}