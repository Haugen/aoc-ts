import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

type aChoice = 'A' | 'B' | 'C';
type bChoice = 'X' | 'Y' | 'Z';
type gameScore = 0 | 3 | 6;
type myScore = 1 | 2 | 3;

const gameMapper: Record<aChoice, Record<bChoice, bChoice>> = {
	A: { X: 'Z', Y: 'X', Z: 'Y' },
	B: { X: 'X', Y: 'Y', Z: 'Z' },
	C: { X: 'Y', Y: 'Z', Z: 'X' },
};

const myScoreMapper: Record<bChoice, myScore> = { X: 1, Y: 2, Z: 3 };
const gameScoreMapper: Record<bChoice, gameScore> = { X: 0, Y: 3, Z: 6 };

let totalScore = 0;

inputArray.forEach((line) => {
	const [elvChoice, myChoice] = line.split(' ') as [aChoice, bChoice];
	const myShape = gameMapper[elvChoice][myChoice];
	totalScore += gameScoreMapper[myChoice] + myScoreMapper[myShape];
});

console.log(totalScore);
