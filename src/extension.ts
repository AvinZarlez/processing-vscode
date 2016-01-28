import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	//Tell the user the extension has been activated.
	console.log('Processing language extension is now active!'); 
    
var fs = require('fs');

fs.writeFile(context.rootPath+"/test.txt", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
	
}

// this method is called when your extension is deactivated
export function deactivate() {
}