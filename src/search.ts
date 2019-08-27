let processingDocs = 'https://p5js.org/reference/#/p5/';
let processingSearch = 'https://p5js.org/reference/#/p5/';

import * as vscode from 'vscode';

export async function openURL(search_base?: string, s?: string) {
	if (search_base === 'open') { await vscode.env.openExternal(vscode.Uri.parse(s as string)); } else {
		if (!s) { s = processingDocs; }
		else { s = processingSearch + s; }

		await vscode.env.openExternal(vscode.Uri.parse(s));
	}
	return true;
}

// Slice and Trim
export function prepareInput(input: string, start: number, end: number) {
	// input is the whole line, part of which is selected by the user (defined by star/end)

	if (start >= end) { return ''; }

	// Slice to just the selection
	input = input.slice(start, end);

	// Trim white space
	input = input.trim();

	// Possible future addition:
	// Check right here if valid variable/function name to search?

	// Everything looks good by this point, so time to open a web browser!
	return input;
}

export function openProcessingDocs(input: string, start: number, end: number) {
	// Use the node module "opn" to open a web browser
	openURL('docs', prepareInput(input, start, end));
}
