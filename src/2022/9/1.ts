import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

let currentHeadPos = '0#0';
let currentTailPos = '0#0';
const tailPos: string[] = [];

inputArray.forEach((line) => {
	const [cmd, steps] = line.split(' ');

	let [headX, headY] = currentHeadPos.split('#').map((x) => +x);
	let [tailX, tailY] = currentTailPos.split('#').map((x) => +x);

	for (let i = 1; i <= +steps; i++) {
		if (cmd === 'L') headX--;
		else if (cmd === 'R') headX++;
		else if (cmd === 'U') headY++;
		else if (cmd === 'D') headY--;

		let moveX = 0;
		let moveY = 0;

		// move X
		if (
			Math.abs(headX - tailX) > 1 ||
			(Math.abs(headX - tailX) === 1 && Math.abs(headY - tailY) > 1)
		) {
			headX < tailX ? moveX-- : moveX++;
		}

		// move y
		if (
			Math.abs(headY - tailY) > 1 ||
			(Math.abs(headY - tailY) === 1 && Math.abs(headX - tailX) > 1)
		) {
			headY < tailY ? moveY-- : moveY++;
		}

		tailX += moveX;
		tailY += moveY;

		currentHeadPos = [headX, headY].join('#');
		currentTailPos = [tailX, tailY].join('#');
		tailPos.push(currentTailPos);
	}
});

console.log(new Set(tailPos).size);
