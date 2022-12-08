import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const rows = input.split('\n');

let sum = 0;

for (const [rowNumber, row] of rows.entries()) {
	const trees = row.split('').map((x) => +x);

	for (const [colNumber, tree] of trees.entries()) {
		if (
			colNumber === 0 ||
			rowNumber === 0 ||
			colNumber === trees.length - 1 ||
			rowNumber === rows.length - 1
		) {
			sum++;
			continue;
		} else {
			const rowFirstMax = Math.max(...trees.slice(0, colNumber));
			const rowSecondMax = Math.max(
				...trees.slice(colNumber + 1, trees.length)
			);

			const colArray: number[] = [];
			for (const row of rows) {
				colArray.push(+row[colNumber]);
			}

			const colFirstMax = Math.max(...colArray.slice(0, rowNumber));
			const colSecondMax = Math.max(
				...colArray.slice(rowNumber + 1, colArray.length)
			);

			if (
				tree > rowFirstMax ||
				tree > rowSecondMax ||
				tree > colFirstMax ||
				tree > colSecondMax
			) {
				sum++;
			}
		}
	}
}

console.log(sum);
