import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

let X = 1;
let cycle = 1;
const checkCycles = [20, 60, 100, 140, 180, 220];
const signals: number[] = [];

inputArray.forEach((line) => {
	const [cmd, nr] = line.split(' ');

	const cycleTime = cmd === 'noop' ? 1 : 2;

	for (let i = 0; i < cycleTime; i++) {
		if (cmd === 'addx' && i === 1) {
			X += +nr;
		}
		cycle++;
		if (checkCycles.includes(cycle)) {
			signals.push(X * cycle);
		}
	}
});

console.log(signals.reduce((a, b) => a + b, 0));
