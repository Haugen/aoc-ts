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

totals.sort((a, b) => a - b).reverse();
const total = totals[0] + totals[1] + totals[2];

console.log(total);
