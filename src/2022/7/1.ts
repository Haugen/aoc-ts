import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

const structure = {};
const currentPos: string[] = [];
const folderSizes: Record<string, number> = {};

const createNestedObj = (base, names) => {
	for (let i = 0; i < names.length; i++) {
		base = base[names[i]] = base[names[i]] || {};
	}
};

const writeToNestedObj = (base, filename, size) => {
	for (let i = 0; i < currentPos.length; i++) {
		const nestedFolderName = currentPos.slice(0, i + 1).join('-');
		if (folderSizes[nestedFolderName]) {
			folderSizes[nestedFolderName] += size;
		} else {
			folderSizes[nestedFolderName] = size;
		}

		base = base[currentPos[i]] = base[currentPos[i]] || {};
	}
	base[filename] = size;
};

inputArray.forEach((line) => {
	if (line.startsWith('$')) {
		const [, cmd, fold] = line.split(' ');
		if (cmd === 'cd') {
			if (fold === '..') {
				currentPos.pop();
			} else {
				currentPos.push(fold);
				createNestedObj(structure, currentPos);
			}
		}
	} else {
		const [first, second] = line.split(' ');
		if (first !== 'dir') {
			writeToNestedObj(structure, second, +first);
		}
	}
});

let sum = 0;

for (const v of Object.values(folderSizes)) {
	if (v <= 100000) sum += v;
}

console.log(sum);
