import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

type Group = string[];

const priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const groups: Group[] = [];
let score = 0;
let currentGroup: string[] = [];

inputArray.forEach((line, i) => {
	currentGroup.push(line);

	if ((i > 0 && !((i + 1) % 3)) || i == inputArray.length - 1) {
		groups.push(currentGroup);
		currentGroup = [];
	}
});

groups.forEach((group: string[]) => {
	const [line1, line2, line3] = group;

	for (const l of line1) {
		if (line2.includes(l) && line3.includes(l)) {
			score += priorities.indexOf(l) + 1;
			break;
		}
	}
});

console.log(score);
