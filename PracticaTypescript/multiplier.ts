
// PRIMERA PARTE, PRIMEROS TYPES
const multiplicator = (a: number, b: number, prinText: string) => {
  console.log(prinText, a * b);
}

const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])
multiplicator(a,b, `Multiplied numbers ${a} and ${b}, the result is: `) 