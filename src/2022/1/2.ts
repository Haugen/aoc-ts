import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

let currentCount = 0;
const totals: number[] = [];

inputArray.forEach((line) => {
	if (line == '') {
		totals.push(currentCount);
		currentCount = 0;
	} else {
		currentCount += Number(line);
	}
});

const total = totals
	.sort((a, b) => a - b)
	.slice(-3)
	.reduce((a, b) => a + b);

console.log(total);
