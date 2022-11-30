const test: string = "a string";

let day, task;

try {
  day = process.argv[2].split("=")[1];
  task = process.argv[3]?.split("=")[1] || "1";
} catch (error) {
  throw new Error('Missing param: "day"');
}

console.log("day", day);
console.log("task", task);

export {};
