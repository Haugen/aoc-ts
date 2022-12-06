import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('');

const currentFour: string[] = [];
let index = 0;

for (const char of inputArray) {
	currentFour.push(char);
	index++;

	if (currentFour.length > 4) {
		currentFour.shift();
		if (new Set(currentFour).size === 4) {
			break;
		}
	}
}

console.log(index);
