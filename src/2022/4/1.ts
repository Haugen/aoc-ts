import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

let count = 0;

inputArray.forEach((line) => {
	const [first, second] = line.split(',');

	const [firstLow, firstHigh] = first.split('-');
	const [secondLow, secondHigh] = second.split('-');

	if (+secondLow >= +firstLow && +secondHigh <= +firstHigh) {
		count++;
	} else if (+firstLow >= +secondLow && +firstHigh <= +secondHigh) {
		count++;
	}
});

console.log(count);
