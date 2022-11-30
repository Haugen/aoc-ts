import fs from 'fs';
import path from 'path';

let day;
let task;

// Grab day and task
try {
	day = process.argv[2].split('=')[1];
	task = process.argv[3]?.split('=')[1] || '1';
} catch (error) {
	throw new Error('Missing param: "day"');
}

// Create the day folder if it do esn't exist
try {
	const folderPath = path.resolve(__dirname, `src/days/${day}`);
} catch (error) {
	throw new Error('failed');
}

export {};
