import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('');

const currentFour: string[] = [];
let index = 0;

// Part 2 identical as part 1 on day 6.
// Just check for 14 chars instead of 4.

for (const char of inputArray) {
	currentFour.push(char);
	index++;

	if (currentFour.length > 14) {
		currentFour.shift();
	}

	if (currentFour.length === 14) {
		const fourSet = [...new Set(currentFour)];

		if (fourSet.length === 14) {
			break;
		}
	}
}

console.log(index);
