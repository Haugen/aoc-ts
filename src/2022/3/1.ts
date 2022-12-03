import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

const priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const chars: string[] = [];
let score = 0;

inputArray.forEach((line) => {
	const first = line.slice(0, line.length / 2).split('');
	const second = line.slice(line.length / 2, line.length).split('');

	for (const c of first) {
		if (second.includes(c)) {
			chars.push(c);
			break;
		}
	}
});

chars.forEach((c) => {
	score += priorities.indexOf(c) + 1;
});

console.log(score);
