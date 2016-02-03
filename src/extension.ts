import * as vscode from 'vscode';

let fs = require("fs");
let open = require("open")

let child_process = require("child_process");

function copyFile(source, target, cb) {
    var cbCalled = false;

    function done(err?) {
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

function checkIfProjectOpen(callback) {
    var root: string = vscode.workspace.rootPath;
    var fileFound: boolean = false;
    if (root == undefined) {
        vscode.window.showErrorMessage("Open project folder first")
    }
    else {
        var name: string = root.replace(/^.*[\\\/]/, '')
        fs.stat(root + "/" + name + ".pde", (err, stats) => {
            if (err && err.code === 'ENOENT') {
                // Named file doesn't exist.
                vscode.window.showErrorMessage("Create a " + name + ".pde file first!")
            } else if (err) {
                vscode.window.showErrorMessage("When checking if " + name + ".pde exists: " + err)
            } else if (stats.isFile()) {
                callback()
            }
        })
    }

}

export function activate(context: vscode.ExtensionContext) {

    console.log('Processing language extension is now active!')

    var create_task_file = vscode.commands.registerCommand('extension.processingCreateTaskFile', () => {

        var pdeTaskFile = context.extensionPath + "/ProcessingTasks.json"

        checkIfProjectOpen(() => {
            var taskPath = vscode.workspace.rootPath + "/.vscode/"

            function copyTaskFile(p: string) {
                copyFile(pdeTaskFile, p, function(err) {
                    if (err) {
                        return console.log(err)
                    }
                    remindAddToPath()
                })
            }

            fs.stat(taskPath, (err, stats) => {
                if (err && err.code === 'ENOENT') {
                    // .vscode doesn't exist, creating it
                    try {
                        fs.mkdirSync(taskPath);
                    } catch (e) {
                        if (e.code != 'EEXIST') throw e;
                    }
                    copyTaskFile(taskPath + "tasks.json")
                } else if (err) {
                    vscode.window.showErrorMessage("When checking if .vscode/ exists: " + err)
                } else if (stats.isDirectory()) {

                    taskPath = taskPath + "tasks.json";

                    fs.stat(taskPath, (err, stats) => {
                        if (err && err.code === 'ENOENT') {
                            // Task file doesn't exist, creating it
                            copyTaskFile(taskPath)
                        } else if (err) {
                            vscode.window.showErrorMessage("When checking if tasks.json exists: " + err)
                        } else if (stats.isFile()) {
                            return vscode.window.showErrorMessage("tasks.json already exists. Overwrite it?", "Yes").then((item) => {
                                if (item === "Yes") {
                                    copyTaskFile(taskPath)
                                }
                            })
                        }
                    });
                }
            });
        });
    });
    context.subscriptions.push(create_task_file);

    var run_task_file = vscode.commands.registerCommand('extension.processingRunTaskFile', () => {
        checkIfProjectOpen(() => {
            var root = vscode.workspace.rootPath;
            var cmd = "\"C:\\Program Files\\processing-3.0.1\\processing-java\" --force --sketch=\"" + root + "\" --output=\"" + root + "\\out\" --run";
            child_process.exec(cmd, (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(stdout);
            });
        });
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