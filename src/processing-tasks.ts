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

export const processingTaskFilename = "ProcessingTasks.json";