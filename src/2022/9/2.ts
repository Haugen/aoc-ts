import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

const snake = Array(10).fill('0#0');
const tailPos: string[] = [];

const moveSnake = (pos1, pos2, i, cmd) => {
	let [s1x, s1y] = pos1.split('#').map((x) => +x);
	let [s2x, s2y] = pos2.split('#').map((x) => +x);

	if (i === 0) {
		if (cmd === 'L') s1x--;
		else if (cmd === 'R') s1x++;
		else if (cmd === 'U') s1y++;
		else if (cmd === 'D') s1y--;
	}

	let moveX = 0;
	let moveY = 0;

	// move X
	if (
		Math.abs(s1x - s2x) > 1 ||
		(Math.abs(s1x - s2x) === 1 && Math.abs(s1y - s2y) > 1)
	) {
		s1x < s2x ? moveX-- : moveX++;
	}

	// move y
	if (
		Math.abs(s1y - s2y) > 1 ||
		(Math.abs(s1y - s2y) === 1 && Math.abs(s1x - s2x) > 1)
	) {
		s1y < s2y ? moveY-- : moveY++;
	}

	s2x += moveX;
	s2y += moveY;

	snake[i] = [s1x, s1y].join('#');
	snake[i + 1] = [s2x, s2y].join('#');

	if (i === 8) return tailPos.push(snake[i + 1]);

	moveSnake(snake[i + 1], snake[i + 2], i + 1, cmd);
};

inputArray.forEach((line) => {
	const [cmd, steps] = line.split(' ');

	for (let i = 0; i < +steps; i++) {
		moveSnake(snake[0], snake[1], 0, cmd);
	}
});

console.log(new Set(tailPos).size);
