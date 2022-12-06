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
		if (new Set(currentFour).size === 14) {
			break;
		}
	}
}

console.log(index);
