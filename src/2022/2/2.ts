import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

// A: rock
// B: paper
// C: scissors

// X: rock - 1
// Y: paper - 2
// Z: scissors - 3

// 2
// X: rock - loose
// Y: paper - draw
// Z: scissors - win

// 0 loose. 3 draw. 6 win

type aChoice = 'A' | 'B' | 'C';
type bChoice = 'X' | 'Y' | 'Z';
type outCome = {
	shape: bChoice;
	score: 0 | 3 | 6;
};
type myScore = 1 | 2 | 3;

const getOutcome = (a: aChoice, b: bChoice): outCome => {
	switch (a) {
		case 'A':
			if (b == 'X') {
				return {
					shape: 'Z',
					score: 0,
				};
			} else if (b == 'Y') {
				return {
					shape: 'X',
					score: 3,
				};
			} else if (b == 'Z') {
				return {
					shape: 'Y',
					score: 6,
				};
			}
			break;
		case 'B':
			if (b == 'X') {
				return {
					shape: 'X',
					score: 0,
				};
			} else if (b == 'Y') {
				return {
					shape: 'Y',
					score: 3,
				};
			} else if (b == 'Z') {
				return {
					shape: 'Z',
					score: 6,
				};
			}
			break;
		case 'C':
			if (b == 'X') {
				return {
					shape: 'Y',
					score: 0,
				};
			} else if (b == 'Y') {
				return {
					shape: 'Z',
					score: 3,
				};
			} else if (b == 'Z') {
				return {
					shape: 'X',
					score: 6,
				};
			}
	}
	return {
		shape: 'X',
		score: 0,
	};
};

const getMyScore = (b: bChoice): myScore => {
	switch (b) {
		case 'X':
			return 1;
		case 'Y':
			return 2;
		case 'Z':
			return 3;
	}
};

let totalScore = 0;

inputArray.forEach((line) => {
	const [elvChoice, myChoice] = line.split(' ') as [aChoice, bChoice];

	const score = getOutcome(elvChoice, myChoice);
	totalScore += score.score;
	totalScore += getMyScore(score.shape);
});

console.log(totalScore);
