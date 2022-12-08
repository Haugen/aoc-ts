import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const rows = input.split('\n');

let bestView = 0;

for (const [rowNumber, row] of rows.entries()) {
	const trees = row.split('').map((x) => +x);

	for (const [colNumber, tree] of trees.entries()) {
		if (
			colNumber === 0 ||
			rowNumber === 0 ||
			colNumber === trees.length - 1 ||
			rowNumber === rows.length - 1
		) {
			continue;
		} else {
			const scores: number[] = [];

			const rowFirst = trees.slice(0, colNumber).reverse();
			const rowSecond = trees.slice(colNumber + 1, trees.length);

			const colArray: number[] = [];
			for (const row of rows) {
				colArray.push(+row[colNumber]);
			}

			const colFirst = colArray.slice(0, rowNumber).reverse();
			const colSecond = colArray.slice(rowNumber + 1, colArray.length);

			const arrsToCheck = [rowFirst, rowSecond, colFirst, colSecond];

			for (const arr of arrsToCheck) {
				for (const [i, x] of arr.entries()) {
					if (x >= tree || i === arr.length - 1) {
						scores.push(i + 1);
						break;
					}
				}
			}

			const sum = scores.reduce((a, b) => a * b, 1);
			if (sum > bestView) bestView = sum;
		}
	}
}

console.log(bestView);
