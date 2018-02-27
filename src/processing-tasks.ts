import * as path from 'path';  

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
	"version": "2.0.0",
	"tasks": [
		{
			"label": "Run Sketch",
			"type": "shell",
			"group": {
				"kind": "build",
				"isDefault": true,
			},
			"command": "processing-java",
			"presentation": {
				"echo": true,
				"reveal": "always",
				"focus": true,
				"panel": "dedicated"
			},
			"args": buildProcessingArgs("${workspaceRoot}"),
		}
	]
}

// Also export a pretty string for file writing
export const processingTasksString: string = JSON.stringify(processingTasks, null, 4);