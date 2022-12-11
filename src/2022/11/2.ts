// Part 2 was intense. Started off with BigNumber JS, but yeah, that was not
// going to help. The numbers get huge. I consulted ChatGPT who tought be about
// LCM, the Least Common Multiple. The LCM in our case is the product of the
// test case from every monkey. Once we have that, we can keep dividing the
// numbers when they get too big.

import fs from 'fs';
import BigNumber from 'bignumber.js';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n\n');

type Monkey = {
	items: BigNumber[];
	operation: string;
	test: number;
	monkeyTrue: number;
	monkeyFalse: number;
	inspectedCount: number;
};

const monkeys: Monkey[] = [];

inputArray.forEach((monkey) => {
	const line = monkey.split('\n');

	const startingItems = line[1]
		.split(':')[1]
		.split(',')
		.map((x) => BigNumber(x));
	const operation = line[2].split(':')[1].split('=')[1].trim();
	const test = Number(line[3].split(':')[1].split(' ')[3]);
	const monkeyTrue = Number(line[4].split(' ').at(-1));
	const monkeyFalse = Number(line[5].split(' ').at(-1));

	monkeys.push({
		items: startingItems,
		operation,
		test,
		monkeyTrue,
		monkeyFalse,
		inspectedCount: 0,
	});
});

const lcm = monkeys.reduce((val, monkey) => val * monkey.test, 1);

const operate = (worryLevel: BigNumber, operation): BigNumber => {
	const [, op, by] = operation.split(' ');

	switch (op) {
		case '+':
			return worryLevel.plus(by === 'old' ? worryLevel : BigNumber(by));
		case '-':
			return worryLevel.minus(by === 'old' ? worryLevel : BigNumber(by));
		case '*':
			return worryLevel.multipliedBy(by === 'old' ? worryLevel : BigNumber(by));
	}
	return BigNumber(0);
};

for (let j = 0; j < 10000; j++) {
	for (const monkey of monkeys) {
		while (monkey.items.length > 0) {
			const item = BigNumber(monkey.items.shift() || 0);
			let worryLevel = operate(item, monkey.operation);
			// My final key to part 2. Use worryLevel % lcm for all items.
			worryLevel = worryLevel.mod(lcm);
			monkey.inspectedCount++;

			const testPassed = worryLevel.mod(monkey.test).toFixed() === '0';
			if (testPassed) {
				monkeys[monkey.monkeyTrue].items.push(worryLevel);
			} else {
				monkeys[monkey.monkeyFalse].items.push(worryLevel);
			}
		}
	}
}

monkeys.sort((a, b) => a.inspectedCount - b.inspectedCount).reverse();
console.log(monkeys[0].inspectedCount * monkeys[1].inspectedCount);
