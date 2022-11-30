import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n').filter(Boolean);

inputArray.forEach((line) => {
	// Do your magic here with each line.
});
