import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	//Tell the user the extension has been activated.
	console.log('Processing language extension is now active!'); 
    
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	var disposable = vscode.commands.registerCommand('extension.sayHello', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});
	
	context.subscriptions.push(disposable);
	
}

// this method is called when your extension is deactivated
export function deactivate() {
}