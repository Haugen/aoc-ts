# Advent of Code template

The repository is an early version of a simple way to participate in Advent of Code in a TypeScript environment. In this iteration, it'll also serve as my own puzzle solving repo. Let's go!

## Usage

To get started, clone the repository and run `npm install` in the root.

Any year folder in `/src` (like `2022`, `2021` etc), are puzzle content and not part of the template.

### Get your session token

First thing you need is your session token from adventofcode.com. This is used to fetch your personalized input data from each puzzle. It can be found under the network tab in your dev tools. [Check this post for assistanse](https://github.com/wimglenn/advent-of-code-wim/issues/1).

Once you have your token, copy `.env.example`, rename it to `.env`, and include your token in the `AOC_SESSION` spot. In your `.env` file you can also adjust what year of Advent of Code you want to work with. Defaults to 2022.

### Generate a puzzle

Use `npm run generate` to generate a folder for a puzzle, and fetch the input data. The script expects an argument for the day you want to work with, for example `npm run generate day=5` will generate the folder and fetch the input data for day 5.

The generated folder includes the following files:

- `input.txt`: The raw input data for the puzzle.
- `index.ts`: The TS file to work with, lightly prepared for reading the input file.

From there, you're on your own. Navigate in to the day folder you want to work in, and run the script with `npx ts-node index.ts`. Good luck with the puzzles
