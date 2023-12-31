// A constant array containing all avaible roads
// roads: Array = [ "from-to" ]
const roads = [
	"Alice's House-Bob's House",   	"Alice's House-Cabin",
  	"Alice's House-Post Office",   	"Bob's House-Town Hall",
  	"Daria's House-Ernie's House", 	"Daria's House-Town Hall",
  	"Ernie's House-Grete's House", 	"Grete's House-Farm",
  	"Grete's House-Shop",          	"Marketplace-Farm",
  	"Marketplace-Post Office",     	"Marketplace-Shop",
  	"Marketplace-Town Hall",       	"Shop-Town Hall",
]

function createRoadGraph(edges) {
	let graph = new Object(null);
	
	function addEdge(from, to) {
		if (graph[from] == null) {
			graph[from] = [ to ];
		} else {
			graph[from].push(to);
		}
	}

	for (let [from, to] of edges.map(e => e.split("-"))) {
		addEdge(from, to);
		addEdge(to, from);
	}
	return graph;
}

// roadGraph: Map = { "": [] }
const roadGraph = createRoadGraph(roads);

class VillageState {

	constructor(place, parcels) {
		this.place = place
		this.parcels = parcels
	}

	move(destination) {
		if (!roadGraph[this.place].includes(destination)) {
			return this;
		} else {
			let parcels = this.parcels.map(p => {
				if (p.place != this.place) return p;
				return { place: destination, address: p.address };
			}).filter(p => p.place != p.address);
			return new VillageState(destination, parcels);
		}
	}

}

VillageState.random = function(parcelCount = 5){
	let parcels = [];
	for (let i = 0; i < parcelCount; i++) {
		let place = pickRandom(Object.keys(roadGraph));
		let address;
		do {
			address = pickRandom(Object.keys(roadGraph));
		} while (address == place)
		parcels.push({ place, address });
	}
	return new VillageState("Post Office", parcels);
}

// state: VillageState
// robot: Function
// memory: Array
function runRobot(state, robot, memory) {
	for (let turn = 0; turn < turnLimit; turn++) {
		if (state.parcels.length == 0) {
			console.log(`All deliveries done in ${turn} Turns.`);
			return turn
		}
		
		// action: { direction: String, memory: [] }
		let action = robot(state, memory); 		
		state = state.move(action.direction);
		memory = action.memory;
		console.log(`Moved to ${action.direction}`);
	}
}


function pickRandom(array) {
	return array[Math.floor(Math.random() * array.length)]
}


/*
	Example Robot Function

	function robotName( state: VillageState, memory: Array ) -> { direction: String, memory: Array }
*/

// Random Robot
function randomRobot(state, memory) {
	return { direction: pickRandom(roadGraph[state.place]) }
}

// Mail Robot
const mailRoute = [
	"Alice's House", 	"Cabin", 			"Alice's House", 	"Bob's House",
	"Town Hall", 		"Daria's House", 	"Ernie's House",	"Grete's House",
	"Shop", 			"Grete's House", 	"Farm", 			"Marketplace", 		
	"Post Office"
];

function mailRobot(state, memory) {
	if (memory.length == 0) {
		memory = mailRoute;		
	}
	return { direction: memory[0], memory: memory.slice(1) };
}

// Guided Robot
function findRoute(graph, from, to) {
	let work = [{at: from, route: []}];
	for (let i = 0; i < work.length; i++) {
		let {at, route} = work[i];
		for (let place of graph[at]) {
			if (place == to) return route.concat(place);
			if (!work.some(w => w.at == place)) {
				work.push({at: place, route: route.concat(place)});
			}
		}
	}
}

function guidedRobot({place, parcels}, route) {
	if (route.length == 0) {
		let parcel = parcels[0];
		if (parcel.place != place) {
			route = findRoute(roadGraph, place, parcel.place);
		} else {
			route = findRoute(roadGraph, place, parcel.address);
		}
	}
	return {direction: route[0], memory: route.slice(1)};
}

// Sorted Guided Robot

function sortGuidedRobot({place, parcels}, route) {
	parcels.sort((a, b) => { 
		return mailRoute.indexOf(a.place) - mailRoute.indexOf(b.place) 
	})
	if (route.length == 0) {
		let parcel = parcels[0];
		if (parcel.place != place) {
			route = findRoute(roadGraph, place, parcel.place);
		} else {
			route = findRoute(roadGraph, place, parcel.address);
		}
	}
	return {direction: route[0], memory: route.slice(1)};
}

//
// SETUP ZONE
//

let first = new VillageState(
	"Post Office", 
	[
		{ place: "Post Office", address: "Alice's House" },
		{ place: "Post Office", address: "Shop" },
		{ place: "Alice's House", address: "Post Office" }
	]
);


const turnLimit = 1000;

// ...robots : Array = [ { brain: Function, memory: Array } ]
function compareRobots(...robots) {
	var results = []
	for (let scene = 0; scene < 100; scene++) {
		let village = VillageState.random()
		let result = robots.map(r => runRobot(village, r, []))
		console.log(
			`Scene ${scene + 1} completed! ${result}`
		);
		for (let i = 0; i < robots.length; i++) {
			if (results[i] == null) results.push(0)
			results[i] += result[i]
		}
	}
	console.log(
		`All scenes done!\n`+
		`Results: ${results.map(r => r / 100)}`

	);
}

compareRobots(randomRobot, mailRobot, guidedRobot, sortGuidedRobot)

class PersistentGroup {
	constructor() {
		this.content = [];
	}

	static from(array) {
		let group = new PersistentGroup();
		group.content = array;
		return group;
	}

	add(value) {
		if (this.has(value)) return this;
		return PersistentGroup.from(this.content.concat(value));
	}

	delete(value) {
		if (!this.has(value)) return this;
		return PersistentGroup.from([].concat(this.content).splice(this.content.indexOf(this.content), 1));
	}

	has(value) {
		for (let element of this.content) {
			if (element === value) return true;
		}
		return false;
	}

	static get empty() {
		return new PersistentGroup();
	}

	[Symbol.iterator]() {
		return new GroupIterator(this);
	}
}

let a = PersistentGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false