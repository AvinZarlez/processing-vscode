let processingDocs = 'https://processing.org/reference/';
let processingSearch = 'https://www.google.com/search?as_sitesearch=processing.org&as_q=';

// Open a URL using the npm module "opn"
let opn = require('opn');

export function openURL(search_base?: string, s?: string) {
	if (search_base === 'open') { opn(s); } else {
		if (!s) { s = processingDocs; }
		else { s = processingSearch + s; }

		opn(s);
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
