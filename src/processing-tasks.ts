import * as path from 'path';  
import { format } from 'path';


/**
 * Dyanmically build the args to pass to the `processing-java` command.
 * 
 * @param base the base directory of the sketch
 */
export function buildProcessingArgs(base:string) {
	return [
		"--force",
		`--sketch=${base}`,
		path.join(`--output=${base}`, "out"),
		"--run"
	];
}


export const processingCommand = "processing-java";

export const processingTasks = {
	"version": "0.1.0",
	"command": "processing-java",
	"isShellCommand": true,
	"showOutput": "never",
	"args": buildProcessingArgs("${workspaceRoot}"),
}

// Also export a pretty string for file writing
export const processingTasksString: string = JSON.stringify(processingTasks, null, 4);