import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

type aChoice = 'A' | 'B' | 'C';
type bChoice = 'X' | 'Y' | 'Z';
type gameScore = 0 | 3 | 6;
type myScore = 1 | 2 | 3;
type outCome = {
	shape: bChoice;
	score: gameScore;
};

const gameMapper: Record<aChoice, Record<bChoice, outCome>> = {
	A: {
		X: { shape: 'Z', score: 0 },
		Y: { shape: 'X', score: 3 },
		Z: { shape: 'Y', score: 6 },
	},
	B: {
		X: { shape: 'X', score: 0 },
		Y: { shape: 'Y', score: 3 },
		Z: { shape: 'Z', score: 6 },
	},
	C: {
		X: { shape: 'Y', score: 0 },
		Y: { shape: 'Z', score: 3 },
		Z: { shape: 'X', score: 6 },
	},
};

const myScoreMapper: Record<bChoice, myScore> = { X: 1, Y: 2, Z: 3 };

let totalScore = 0;

inputArray.forEach((line) => {
	const [elvChoice, myChoice] = line.split(' ') as [aChoice, bChoice];
	const score = gameMapper[elvChoice][myChoice];
	totalScore += score.score + myScoreMapper[score.shape];
});

console.log(totalScore);
