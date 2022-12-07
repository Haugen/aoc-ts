import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

const structure = {};
const currentPosBuild: string[] = [];
const folderSizes: Record<string, number> = {};

const createNestedObj = (base, names) => {
	for (let i = 0; i < names.length; i++) {
		base = base[names[i]] = base[names[i]] || {};
	}
};

const writeToNestedObj = (base, filename, size) => {
	for (let i = 0; i < currentPosBuild.length; i++) {
		const nestedFolderName = currentPosBuild.slice(0, i + 1).join('-');
		if (folderSizes[nestedFolderName]) {
			folderSizes[nestedFolderName] += size;
		} else {
			folderSizes[nestedFolderName] = size;
		}
		base = base[currentPosBuild[i]] = base[currentPosBuild[i]] || {};
	}
	base[filename] = size;
};

inputArray.forEach((line) => {
	if (line.startsWith('$')) {
		const [, cmd, fold] = line.split(' ');
		if (cmd === 'cd') {
			if (fold === '..') {
				currentPosBuild.pop();
			} else {
				currentPosBuild.push(fold);
				createNestedObj(structure, currentPosBuild);
			}
		}
	} else {
		const [first, second] = line.split(' ');
		if (first !== 'dir') {
			writeToNestedObj(structure, second, +first);
		}
	}
});

const totalDiskSpace = 70000000;
const needAvailable = 30000000;
const currentSize = totalDiskSpace - folderSizes['/'];
const deleteSize = needAvailable - currentSize;

const deleteOptions: number[] = [];

for (const v of Object.values(folderSizes)) {
	if (v >= deleteSize) deleteOptions.push(v);
}

console.log(deleteOptions.sort((a, b) => a - b)[0]);
