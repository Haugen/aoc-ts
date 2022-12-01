import fs from 'fs';
import path from 'path';
import axios from 'axios';

import { AOC_SESSION, YEAR } from './constants';

let day;

// Grab day and task
try {
	day = process.argv[2].split('=')[1];
} catch (error) {
	throw new Error('Missing param: "day"');
}

try {
	(async () => {
		if (!AOC_SESSION) {
			return console.error('Session token from adventofcode.com missing.');
		}

		if (!day || !YEAR) {
			return console.error('Missing day or year');
		}

		// If day folder already exists, abort. Otherwise, create the folder.
		const folderPath = path.resolve(__dirname, `${YEAR}/${day}`);
		if (fs.existsSync(folderPath)) {
			return console.warn(
				'Folder already exists. To start over, remove the folder you are trying to generate.'
			);
		}
		fs.mkdirSync(folderPath, { recursive: true });

		// Fetch input data and write it to an input.txt file.
		const inputData = await axios.get(
			`https://adventofcode.com/${YEAR}/day/${day}/input`,
			{ headers: { cookie: `session=${AOC_SESSION}` } }
		);
		fs.writeFileSync(path.resolve(folderPath, 'input.txt'), inputData.data);

		// Copy template file.
		fs.copyFileSync(
			path.resolve(__dirname, 'template.ts'),
			path.resolve(folderPath, '1.ts')
		);

		console.log(`Generated folder for year ${YEAR}, day ${day}. Good luck!`);
	})();
} catch (error) {
	throw new Error('Failed to generate template folder.');
}

export {};
