'use strict';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as child_process from 'child_process';
import {
    processingCommand,
    buildProcessingArgs,
    processingTaskFilename
} from './processing-tasks';
import * as search from './search';


function remindAddToPath() {
    return vscode.window.showInformationMessage('Remember to add Processing to your path!', 'Learn More').then((item) => {
        if (item === 'Learn More') {
            // Open a URL using the npm module "open"
            search.openURL('https://github.com/TobiahZ/processing-vscode#add-processing-to-path');
        }
    });
}

function copyFile(source: fs.PathLike, target: fs.PathLike, cb: Function) {
    let cbCalled = false;

    function done(err?: Error) {
        if (!cbCalled) {
            cb(err);
            cbCalled = true;
        }
    }

    let rd = fs.createReadStream(source);
    rd.on('error', function (err) {
        done(err);
    });
    let wr = fs.createWriteStream(target);
    wr.on('error', function (err) {
        done(err);
    });
    wr.on('close', function () {
        done();
    });
    rd.pipe(wr);

}

function checkIfProjectOpen(callback: Function) {
    vscode.window.showWorkspaceFolderPick().then((root: vscode.WorkspaceFolder | undefined) => {
        if (root === undefined) {
            vscode.window.showErrorMessage('Open project folder first');
        }
        else {
            fs.stat(root.uri.fsPath + '/' + root.name + '.pde', (err, stats) => {
                if (err && err.code === 'ENOENT') {
                    // Named file doesn't exist.
                    vscode.window.showErrorMessage('Create a ' + root.name + '.pde file first!');
                } else if (err) {
                    vscode.window.showErrorMessage('When checking if ' + root.name + '.pde exists: ' + err);
                } else if (stats.isFile()) {
                    callback(root);
                }
            });
        }
    });
}

function openDocErrorMessage(str: string) {
	return vscode.window.showErrorMessage('Error: ' + str, 'Open Docs').then((item: string | undefined) => {
		if (item === 'Open Docs') {
			search.openURL('docs');
		}
	});
}

export function activate(context: vscode.ExtensionContext) {

    console.log('Processing language extension is now active!');

    let create_task_file = vscode.commands.registerCommand('processing.CreateTaskFile', () => {

        const pdeTaskFile = path.join(context.extensionPath, processingTaskFilename);

        checkIfProjectOpen((root: vscode.WorkspaceFolder) => {
            let taskPath = path.join(root.uri.fsPath, '.vscode');

            function copyTaskFile(destination: string) {
                copyFile(pdeTaskFile, destination, function (err: Error) {
                    if (err) {
                        return console.log(err);
                    }
                    remindAddToPath();
                });
            }

            fs.stat(taskPath, (err, stats) => {
                if (err && err.code === 'ENOENT') {
                    // .vscode doesn't exist, creating it
                    try {
                        fs.mkdirSync(taskPath);
                    } catch (e) {
                        if (e.code !== 'EEXIST') throw e;
                    }
                    copyTaskFile(path.join(taskPath, 'tasks.json'));
                } else if (err) {
                    vscode.window.showErrorMessage('When checking if .vscode/ exists: ' + err);
                } else if (stats.isDirectory()) {

                    taskPath = path.join(taskPath, 'tasks.json');

                    fs.stat(taskPath, (err, stats) => {
                        if (err && err.code === 'ENOENT') {
                            // Task file doesn't exist, creating it
                            copyTaskFile(taskPath);
                        } else if (err) {
                            vscode.window.showErrorMessage('When checking if tasks.json exists: ' + err);
                        } else if (stats.isFile()) {
                            return vscode.window.showErrorMessage('tasks.json already exists. Overwrite it?', 'Yes').then((item) => {
                                if (item === 'Yes') {
                                    copyTaskFile(taskPath);
                                }
                            });
                        }
                    });
                }
            });
        });
    });
    context.subscriptions.push(create_task_file);

    let run_task_file = vscode.commands.registerCommand('processing.RunTaskFile', () => {
        checkIfProjectOpen((root: vscode.WorkspaceFolder) => {
            const cmd = `${processingCommand} ${buildProcessingArgs(root.uri.fsPath).join(' ')}`;
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

    let open_documentation = vscode.commands.registerCommand('processing.OpenExtensionDocumentation', () => {
        search.openURL('https://github.com/TobiahZ/processing-vscode#processing-for-visual-studio-code');
    });
    context.subscriptions.push(open_documentation);


    // Open Processing Documentation, when you already have something you want to search selected
    let open_docs = vscode.commands.registerTextEditorCommand('processing.OpenDocs',
        (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {

            // selection[0] is the start, and selection[1] is the end
            let selection = textEditor.selection;
            if (!selection.isSingleLine) {
                openDocErrorMessage('Multiple lines selected, please just select a class or function.');
                return;
            }

            let range = undefined;
            if (!selection.isEmpty) {
                // selection is not empty, get text from it
                range = new vscode.Range(selection.start, selection.end);
            } else {
                // selection is empty, get any word at cursor
                range = textEditor.document.getWordRangeAtPosition(selection.active);
            }

            if (range === undefined) {
                openDocErrorMessage('Nothing is selected. Please select a class, or use \"Search Documentation\" instead!');
                return;
            }

            search.openProcessingDocs(textEditor.document.lineAt(range.start.line).text, range.start.character, range.end.character);
        });
    context.subscriptions.push(open_docs);

    let searchUnityDocs = vscode.commands.registerCommand('processing.SearchWebsite', () => {
        vscode.window.showInputBox({
            prompt: 'Search Processing Website:'
        }).then((result: string | undefined) => {
            if (result !== undefined) {
                // Use the node module "open" to open a web browser
                search.openURL('docs', result);
            }
        });
    });
    context.subscriptions.push(searchUnityDocs);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
