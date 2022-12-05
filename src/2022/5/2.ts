import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

const stacks: string[][] = Array.from({ length: 9 })
	.fill(0)
	.map((_) => []);

inputArray.forEach((line, i) => {
	if (i < 10) {
		const arr: string[] = [];
		for (let i = 0; i <= line.length + 1; i += 4) {
			if (i > line.length) break;
			arr.push(line.slice(i, i + 3).slice(1, 2));
		}

		for (let i = 0; i <= stacks.length - 1; i++) {
			if (!arr[i] || arr[i] !== ' ') {
				stacks[i].push(arr[i]);
			}
		}
	} else if (i > 9) {
		const moveArr = line
			.split(' ')
			.map((x) => Number(x))
			.filter((x) => !isNaN(x) && x !== 0);
		const [move, from, to] = moveArr;

		// Only adjustment for Part 2!
		// Move all the crates at ones, instead of one by one.
		if (stacks[from - 1]) {
			const moveCrates = stacks[from - 1].splice(0, move);
			stacks[to - 1].unshift(...moveCrates);
		}
	}
});

let letters = '';

for (let i = 0; i < stacks.length; i++) {
	if (stacks[i][0]) letters += stacks[i][0];
}

console.log(letters);
