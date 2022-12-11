import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n\n');

type Monkey = {
	items: number[];
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
		.map((x) => +x);
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

const operate = (worryLevel: number, operation): number => {
	const [, op, by] = operation.split(' ');

	switch (op) {
		case '+':
			return worryLevel + (by === 'old' ? worryLevel : +by);
		case '-':
			return worryLevel - (by === 'old' ? worryLevel : +by);
		case '*':
			return worryLevel * (by === 'old' ? worryLevel : +by);
	}
	return worryLevel / (by === 'old' ? worryLevel : +by);
};

// 20 rounds
for (let i = 0; i < 20; i++) {
	for (const monkey of monkeys) {
		while (monkey.items.length > 0) {
			const item = Number(monkey.items.shift());
			let worryLevel = operate(item, monkey.operation);
			worryLevel = Math.floor(worryLevel / 3);
			monkey.inspectedCount++;

			const testPassed = worryLevel % monkey.test === 0;
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
