import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

// A: rock
// B: paper
// C: scissors

// X: rock - 1
// Y: paper - 2
// Z: scissors - 3

// 0 loose. 3 draw. 6 win

type aChoice = 'A' | 'B' | 'C';
type bChoice = 'X' | 'Y' | 'Z';
type outCome = 0 | 3 | 6;
type myScore = 1 | 2 | 3;

const getOutcome = (a: aChoice, b: bChoice): outCome => {
	switch (a) {
		case 'A':
			if (b == 'X') return 3;
			if (b == 'Y') return 6;
			if (b == 'Z') return 0;
			break;
		case 'B':
			if (b == 'X') return 0;
			if (b == 'Y') return 3;
			if (b == 'Z') return 6;
			break;
		case 'C':
			if (b == 'X') return 6;
			if (b == 'Y') return 0;
			if (b == 'Z') return 3;
			break;
	}
	return 0;
};

const getMyScore = (b: bChoice): myScore => {
	switch (b) {
		case 'X':
			return 1;
			break;
		case 'Y':
			return 2;
			break;
		case 'Z':
			return 3;
			break;
		default:
			break;
	}
	return 1;
};

let totalScore = 0;

inputArray.forEach((line) => {
	const [elvChoice, myChoice] = line.split(' ') as [aChoice, bChoice];

	totalScore += getOutcome(elvChoice, myChoice);
	totalScore += getMyScore(myChoice);
});

console.log(totalScore);
