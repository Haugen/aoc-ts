import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

let count = 0;

const createRangedArray = (s: number, e: number): number[] => {
	return [...Array(e - s + 1).keys()].map((x) => x + s);
};

inputArray.forEach((line) => {
	const [first, second] = line.split(',');

	const [fl, fh] = first.split('-');
	const [sl, sh] = second.split('-');

	const firstArr = createRangedArray(+fl, +fh);
	const secondArr = createRangedArray(+sl, +sh);

	for (const x of firstArr) {
		if (secondArr.includes(x)) {
			count++;
			break;
		}
	}
});

console.log(count);
