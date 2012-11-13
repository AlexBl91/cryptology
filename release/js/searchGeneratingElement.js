//#import 'scripts.js'

// Definition a constants

var MAX_POSSIBLE_ORDER = 1000;




function Group() {
	this.val = arguments[0];
	this.use = false;
	this.order = undefined;
}

function InitArrayOfGroupElemObj(arr) {
	var group = [];
	for (var i = 0; i < arr.length; i++) {
		group[i] = new Group(arr[i])
	}
	return group;
}

function GetRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GetRandElem(arr) {
	var rand = GetRandomInt(0, Number(arr.length) - Number(1));
	group[rand].use = true;
	return group[rand].val;
}

function Factorization(arr) {
	var result = 1;
	for (var i = 0; i < p.length; i++) {
		result *= Math.pow(p[i].val, p[i].count);
	}
	return result;
}

function GetGeneratingElem(arr, n) {
	var group = InitArrayOfGroupElemObj(arr);
	var primes = [];
	primes = InitArrayOfPrimeNumsObj(EratosthenesSieve(n));
	var a;
	var b;

	while(true) {
		var flag = true
		a = getRandElem(group);
		for (var i = 0; i < primes.length; i++) {
			b = Math.pow(a, n / primes[i].val);
			if (b % n == 1) {
				flag = false;
				break;
			}
		}
		if (flag == true) {
		return a;			
		}
	}
}

function EulerFunction(m) {
	var primeNums = CanonicalRepresentations(m);
	var count = m;
	for (var i = 0; i < primeNums.length; i++) {
		if (primeNums[i].count > 0) {
			count *= 1 - 1 / primeNums[i].val;
		}
	}
	return count;
}

// The function calculates elements of the group by value of factor set.
function GetElements(m) {
	var arr = [];
	arr.length = EulerFunction(m);
	var element = 1;
	arr[0] = element;
	var i = 1;

	while (i < arr.length) {
		if (m % (++element) != 0) {
			arr[i++] = element;
		}
	}
	return arr;
}

// The function of determining a order of the element of group.
// Accepts 2 arguments of number type.
// @param m - value of factor set;
// @param type - type of group;
// 	type = 0 - additive group;
// 	type = 1 - multiplicative group.
// Returns array of objects of the class of Group.
function DeterminingOrderOfElem(m, type) {
	var arrayOfElements = GetElements(m);
	var group = InitArrayOfGroupElemObj(arrayOfElements);

	for (var i = 0; i < group.length; i++) {
		var order = 2;
		while (group[i].order == undefined && order < MAX_POSSIBLE_ORDER) {
			if (Math.pow(group[i].val, order++) % m == 1) {
				group[i].order = order - 1;
			}
			if (order == MAX_POSSIBLE_ORDER) {
				group[i].order = 'infinity';
			}
		}
	}
	return group;
}

function PrintResTask4(arr) {
	for (var i = 0; i < arr.length; i++) {
		var elem = document.createElement('div');
		elem.innerHTML = 'ord ' + arr[i].val + ' = ' + arr[i].order;
		document.getElementById('results4').appendChild(elem);
	}
}