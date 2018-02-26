import * as path from 'path';  

// Build paths dynamically
const sketchPath = "${workspaceRoot}";
const outputPath = path.join("${workspaceRoot}", "out");

export const processingCommand = "processing-java";

export const processingArgs: string[] = [
    "--force",
    `--sketch=${sketchPath}`,
    `--output=${outputPath}`,
    "--run"
];

export const processingTasks = {
	"version": "0.1.0",
	"command": "processing-java",
	"isShellCommand": true,
	"showOutput": "never",
	"args": processingArgs,
}

// Also export a pretty string for file writing
export const processingTasksString: string = JSON.stringify(processingTasks, null, 4);