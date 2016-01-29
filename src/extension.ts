import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    console.log('Processing language extension is now active!');

    var disposable = vscode.commands.registerCommand('extension.createTaskFile', () => {
        // The code you place here will be executed every time your command is executed
        
        var root = vscode.workspace.rootPath;

        console.log("Root is" + root);
        if (root == undefined) {

            console.log('Writing file...');
            var fs = require('fs');

            fs.writeFile(root + "/test.txt", "Hey there!", function(err) {
                if (err) {
                    return console.log(err);
                }
            });
            console.log("The file was saved!");
        }

      

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);

}

// this method is called when your extension is deactivated
export function deactivate() {
}