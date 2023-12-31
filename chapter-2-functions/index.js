function printTriangle(size) {
	let text = "";
	for (let level = 0; level < size; level++) {
		text += "#";
		console.log(text);
	}
}

printTriangle(3);
console.log("");
printTriangle(5);
console.log("");
printTriangle(7);
console.log("");

function fizzBuzz() {
	for (let n = 1; n <= 100; n++) {
		let divBy3 = n % 3 == 0;
		let divBy5 = n % 5 == 0;
		if (divBy3 && divBy5) {
			console.log("FizzBuzz");
		} else if (divBy3) {
			console.log("Fizz");
		} else if (divBy5) {
			console.log("Buzz");
		} else {
			console.log(n);
		}
	}
}

fizzBuzz();
console.log("");

function printChessboard(size) {
	let board = "";
	for (let i = 0; i < size; i++) {
		let line = "";
		let isEven = i % 2 == 0;
		for (let j = 0; j < size; j++) {
			if (isEven) {
				if (j % 2 == 0) {
					line += "#";
				} else {
					line += " ";
				}
			} else {
				if (j % 2 == 0) {
					line += " ";
				} else {
					line += "#";
				}
			}
		}
		line += "\n";
		board += line;
	}
	console.log(board);
}

printChessboard(8);