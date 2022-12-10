import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

let X = 1;
let cycle = 0;
let rowsDrawn = 0;

let row = '';
const rows: string[] = [];

inputArray.forEach((line) => {
	const [cmd, nr] = line.split(' ');
	const cycleTime = cmd === 'noop' ? 1 : 2;

	for (let i = 0; i < cycleTime; i++) {
		const xSprite = [X - 1, X, X + 1];
		xSprite.includes(cycle - rowsDrawn * 40) ? (row += '#') : (row += '.');

		if (row.length === 40) {
			rows.push(row);
			row = '';
			rowsDrawn++;
		}

		if (cmd === 'addx' && i === 1) X += +nr;

		cycle++;
	}
});

console.log(rows);
