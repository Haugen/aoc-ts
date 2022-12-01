import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

let mostCalories = 0;
let currentCount = 0;

inputArray.forEach((line) => {
	if (line == '') {
		if (currentCount > mostCalories) {
			mostCalories = currentCount;
		}
		currentCount = 0;
	} else {
		currentCount += Number(line);
	}
});

console.log(mostCalories);
