// 	VECTOR CLASS

class Vec {
	x = 0
	y = 0

	constructor(x = 0, y = 0) {
		this.x = x
		this.y = y
	}

	plus(other) {
		return new Vec(this.x + other.x, this.y + other.y)
	}

	minus(other) {
		return new Vec(this.x - other.x, this.y - other.y)
	}

	get length() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
	}

}


console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vector2{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vector2{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5

// 	GROUP CLASS

class Group {
	constructor() {
		this.content = [];
	}

	static from(array) {
		let group = new Group();
		group.content = array;
		return group;
	}

	add(value) {
		if (this.has(value)) return;
		this.content.push(value);
	}

	delete(value) {
		if (!this.has(value)) return;
		this.content.splice(this.content.indexOf(value), 1);
	}

	has(value) {
		for (let element of this.content) {
			if (element === value) return true;
		}
		return false;
	}

	[Symbol.iterator]() {
		return new GroupIterator(this);
	}
}

class GroupIterator {
	constructor(group) {
		this.index = 0;
		this.group = group;
	}

	next() {
		if (this.index == this.group.content.length) return { value: undefined, done: true };

		let value = this.group.content[this.index];
		this.index++;
		return { value, done: false };
	}
}
  
let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

for (let value of Group.from(["a", "b", "c"])) {
	console.log(value);
}
// → a
// → b
// → c


let map = {one: true, two: true, hasOwnProperty: true};

// Fix this call
console.log(Object.keys(map).includes("one"));
// → true