//#import 'scripts.js'

// Definition a constants

var MAX_POSSIBLE_ORDER = 1000;


////////////////////////////////////


// Task #1
// The function calculates greatest common divisor by the Euclid algorithm.
// Accepts 2 arguments of type integer.
function EuclidAlgorithm (a,b) {
  var arrR = [];
  arrR[0] = a;
  arrR[1] = b;
  var i = 1;

  while (arrR[i++] != 0) {
    arrR[i] = arrR[i-2]%arrR[i-1];
  }

  document.getElementById('result0').innerHTML = "(" + a + ", " + b + ") = " + arrR[i-2];
}

// Task #1
// The function calculates greatest common divisor by the extended Euclid's algorithm.
// Accepts 2 arguments of type integer. Returns array of 5 elements.
function EuclidAlgorithmEx (a, b) {
  var arrR = [];
  var arrQ = [];
  var arrX = [];
  arrR[0] = a;
  arrR[1] = b;
  arrQ[0] = '*';
  arrQ[1] = '*';
  arrX[0] = 1;
  arrX[1] = 0;
  var i = 1;

  while (arrR[i++] != 0) {
    arrR[i] = arrR[i-2]%arrR[i-1];
    arrQ[i] = (arrR[i-2] - arrR[i]) / arrR[i-1];
    arrX[i] = arrX[i-2] - arrX[i-1] * arrQ[i];
  }
  var v = (arrR[i-2] - a * arrX[i-2]) / b; 
  var result = [a, b, v, arrR, arrQ, arrX];
  return result;
}

// The function finds inverse element to A in set Zm,, where
// m is set factor.
function GetInverseElem(element, setFactor) {
  var arr = new Array();
  arr = EuclidAlgorithmEx(element, setFactor);
  if (arr[3][arr[3].length - 2] == 1) {
    var inverse =  arr[5][arr[5].length - 2];
    if (inverse < 0) {
      return Math.abs(Number(inverse) + Number(setFactor))
    } else {
      return inverse;
    }
  } else if (arr[3][arr[3].length - 2] > 1) {
    return Infinity;
  } else {
    return -Infinity;
  }

}

function PrintResTask7() {
  if (arguments[2] == Infinity) {
    document.getElementById('result7').innerHTML = "The inverse element to " + arguments[0] + " in set Zm, m = " + arguments[1] + " isn't exist.";
  } else if (arguments[2] == -Infinity) {
    document.getElementById('result7').innerHTML = "Application error";
  } else {
    document.getElementById('result7').innerHTML = "The inverse element to " + arguments[0] + " in set Zm, m = " + arguments[1] + " is " + arguments[2];
  }
}

// The function prints result of EuclidAlgorithmEx funtion. Accepts array
function printTask1(ARGV) {
  var a = ARGV[0];
  var b = ARGV[1];
  var v = ARGV[2];
  var arrR = ARGV[3];
  var arrQ = ARGV[4];
  var arrX = ARGV[5];
  document.getElementById('result').innerHTML = "Bezout's identity:  " +  a + ' * ' + arrX[arrX.length-2] + ' + ' + b + ' * ' + v + ' = ' + arrR[arrR.length-2];
  print1(arrR, arrQ, arrX);
}

// The function print of result of EuclidAlgorithmEx function.
// Accepts 3 arguments of type array.
function print1(arrR, arrQ, arrX) {
  for (var i = 2; i<=arrR.length; i++)
  {
    var newElem = document.createElement('div');
    newElem.innerHTML = arrR[i-2] + ' --- ' + arrQ[i-2] + ' --- ' + arrX[i-2];
    newElem.id = 'tmpResult';
    newElem.style.margin = '5px';
    document.getElementById('results').appendChild(newElem);
  }
  var newElem = document.createElement('button');
  newElem.className = 'btn tmp';
  newElem.id = 'tmpBtnClean';
  newElem.setAttribute('onClick', 'clean()');
  newElem.innerHTML = 'clean';
  document.getElementById('results').appendChild(newElem);
}

function clean() {
  var a = document.getElementById('results');
  var b = document.getElementById('tmpBtnClean');
  a.removeChild(b);
  while (true) {
    var c = document.getElementById('results');
    var d = document.getElementById('tmpResult');
    if (d == null) {
      break;
    } else {
      c.removeChild(d);
    }
  }
  document.getElementById('result').innerHTML = "";
}




// The function creats same value array elements.
// @param count - size of array
// @param value - value of array elements
// Function returns array.
function CreateArray(count, value) {
  var arr = [];
  for (var i = 0; i < count; i++) {
    arr[i] = value;
  }
  return arr;
}

// The function calculates the prime numbers up to a specified. Implementation
// of the sieve of Eratosthenes algorithm. The function accepts number and
// reterns array.
function EratosthenesSieve(testNum) {
  var primeNums = CreateArray(Number(testNum) + 1, Boolean(true));

  for (var i = 2; i * i <= testNum; i++) {
    if (primeNums[i] == true) {
      for (var j = i * i; j <= testNum; j += i) {
        if (primeNums[j] == true) {
          primeNums[j] = false;
        }
      }
    }
  }
  
  var arr = [];
  var j = 0;
  for ( var i = 2; i <= testNum; i++) {
    if (primeNums[i] == true)
      arr[j++] = i;
  }

  return arr;
}

function BruteForce(testNum) {
  var n = 2;
  var primeNums = [];
  primeNums[0] = new PrimeNums(n);
  var i = 0;
  while (true) {
    while (testNum % n == 0) {
      testNum /= n;
      if (primeNums[i] == undefined) {
        primeNums[i] = new PrimeNums(n);
        primeNums[i].count++;
      } else {
        primeNums[i].count++;
      }
    }
    if (testNum == 1) {
      break;
    } else {
      n++;
      i++;
    }
  }
  return primeNums;
}
// The function initializes an array of objects PrimeNums. Accepts
// array and returns an array of objects PrimeNums.
function InitArrayOfPrimeNumsObj(arr) {
  var primeNums = [];

  for ( var i = 0; i < arr.length; i++) {
    primeNums[i] = new PrimeNums(arr[i]);
  }
  return primeNums;
}
// Defenition of the constructor of a class 'PrimeNums' with a parameter
function PrimeNums(parameter) {
  this.val = parameter;
  this.count = 0; 
}
// The function canonical representation of the number of primes
function CanonicalRepresentations(a) {
  var primeNums = [];
  primeNums = InitArrayOfPrimeNumsObj(EratosthenesSieve(a));       
  var i = 0;

  while(true) {
    while (a % primeNums[i].val == 0) {
      a /= primeNums[i].val;
      primeNums[i].count++; 
    }
    if (a == 1) {
      break;
    } else {
      if (primeNums[++i] == undefined) {
        break;        
      }
    }
  }
  return primeNums;
}

// The function 
function GetPrimeNums() {
	// TODO: write body =)
}

function printResTask2(arrObj) {
  var strResult = "";
  var number = 1;
  for (var i in arrObj) {
    if (arrObj[i].count > 0) {
      strResult += arrObj[i].val + '^' + arrObj[i].count + '*';
      number *= Math.pow(arrObj[i].val, arrObj[i].count); 
    }
  }

  document.getElementById('result1').innerHTML = number + ' = ' + strResult.slice(0, strResult.length - 1);
}

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
	while(true) {
	var rand = GetRandomInt(0, Number(arr.length) - Number(1));
	if(arr[rand].use == false)
		arr[rand].use = true;
		break;
	}
	return arr[rand].val;
}

function Factorization(arr) {
	var result = 1;
	for (var i = 0; i < arr.length; i++) {
		result *= Math.pow(arr[i].val, arr[i].count);
	}
	return result;
}

function GetGeneratingElem(m) {
	var group = InitArrayOfGroupElemObj(GetElements(m));
	var primes = [];
	var n = group.length;
	primes = CanonicalRepresentations(n);
	var a;
	var b;

	while(true) {
		var flag = true
		a = GetRandElem(group);
		for (var i = 0; i < primes.length; i++) {
			b = Math.pow(a, n / primes[i].val);
			if (b % m == 1) {
				flag = false;
				break;
			}
		}
		if (flag == true) {
		return a;			
		}
	}
}

function PrintResTask3() {
	var elem = document.getElementById("result3");
	elem.innerHTML = "Generating element is " + arguments[0];
}

function EulerFunction(m) {
	var primeNums = CanonicalRepresentations(m);
	var count = m;
	for (var i = 0; i < primeNums.length; i++) {
		if (primeNums[i].count > 0) {
			count *= 1 - 1 / primeNums[i].val;
		}
	}
	return Math.round(count);
}

function PrintResTask6() {
	var elem = document.getElementById("result6");
	elem.innerHTML = "Φ(" + arguments[0] + ") = " + arguments[1];
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
		var order = 1;
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

function Member() {
	this.degree = arguments[0];
	this.coefficient = arguments[1];
	this.check = false;
}


// Constructor of the Polynomial object.
function Polynomial() {
	this.members = InitOfPolynomial(arguments[0], arguments[1]);
	this.GetMaxDegree = function() {
		return this.members[this.members.length - 1].degree;
	}
	//this.SetDegree = function() {
	//	this.members[]; 
	//}
	this.members.Sort = function() {
		// TODO: write body of function Sort
		this.sort(SortPolinomial)
	}
	this.SetToNoChckd = function() {
		for (var i in this.members) {
			this.members[i].check = false;
		}
	}
	this.Print = function() {
		var elem = document.createElement('div');
		var str = "";
		elem.className = "polynomial";
		for (var i = this.members.length - 1; i >= 0; i--) {
			if (this.members[i].coefficient == 1) {
				coef = "";
			} else {
				coef = this.members[i].coefficient;
			}

			if (this.members[i].degree > 1) {
				str += 	coef + 'x^' + this.members[i].degree + ' + ';
			} 
			else if (this.members[i].degree == 1) {
				str += 	coef + 'x' + ' + ';
			} else {
				str += this.members[i].coefficient;
			}
		}
		var regExp = new RegExp(/\+\s$/);
		if (regExp.test(str)) {
			str = str.substr(0, str.length - 2);
		}
		elem.innerHTML = arguments[0] + str;
		document.getElementById('result5').appendChild(elem);
	}

	this.AddMbr = function() {
		var member = new Member(arguments[0], arguments[1]);
		this.members.unshift(member);
	}
}

function SortPolinomial(i, j) {
	if (this[i].degree < this[j].degree) return 1;
	if (this[i].degree > this[j].degree) return -1;
	else return 0;
}

//  The function initializes array of members of the Polynomial object.
function InitOfPolynomial(arrDeg, arrCoef) {
	var arr = new Array();
	if (arrDeg == undefined || arrCoef == undefined) {
		return arr;
	} else {
		arr.length = arrDeg.length;
		for (var i = 0; i < arr.length; i++) {
			arr[i] = new Member(arrDeg[i], arrCoef[i]);
			//if (arr[i-1] == undefined) {
			//	if (arr[i-1].degree > arr[i].degree ) {
			//		arr = Swap
			//	}
			//}
		}
		//arr.Sort();
		return arr;
	}
}

// The function calculates greatest common dividor by the extended Euclid's
// algorithm for polynomials. 
function EuclidAlgorithmExForPolin(arrDegsDvdnd, arrCoefsDvdnd, arrDegsDvdr, arrCoefsDvdr) {
	//arrDegsDvdnd = ;
	//arrCoefsDvdnd = arguments[0][1];

	var dividend = new Polynomial(arguments[0][0], arguments[0][1]);
	var dividor = new Polynomial(arguments[0][2], arguments[0][3]);

	dividend.Print("1 polynomial: ");
	dividor.Print("2 polynomial: ");
	var elem = SubsPolynomial(dividend, dividor);
	elem.Print("subtitution relult: ");
	var arr = PolynomialyDivision(dividend, dividor);
	arr[0].Print("quotient: ");
	arr[1].Print("residue: ");
}

// The function of division two polynomials.
// Accepts two polynomial type objects - dividend and dividor.
// Returns an array consisting of two polynomial type objects - quotient and residue. 
function PolynomialyDivision(dividend, dividor) {
	var tmpPolynomial = new Polynomial();
	var quotient = new Polynomial();
	var residue = new Polynomial();
	residue = dividend;

	while(residue.members[residue.members.length - 1].degree >= dividor.members[dividor.members.length - 1].degree) {
		var tmpDegree = residue.members[residue.members.length - 1].degree - dividor.members[dividor.members.length - 1].degree;
		var tmpCoef = Math.floor(residue.members[residue.members.length - 1].coefficient / dividor.members[dividor.members.length - 1].coefficient);
		
		quotient.AddMbr(tmpDegree, tmpCoef);
		
		for (var i = dividor.members.length - 1; i >= 0; i--) {
			tmpPolynomial.AddMbr(Number(dividor.members[i].degree) + Number(tmpDegree), dividor.members[i].coefficient * tmpCoef);
		}

		var tmp = new Polynomial();
		tmp = SubsPolynomial(residue, tmpPolynomial);
		residue = new Polynomial;
		residue = tmp;

	}
	return result = [quotient, residue];
}	


function Split(str, separator) {
	return arr = str.split(separator);
}

function ParsingInput(dividend, dividor) {
	var resultParsing = new Array();

	for (var i in arguments) {
		var arrDegsAndCoefs = Split(arguments[i], ',');
		var arrDegs = Split(arrDegsAndCoefs[0], ' ');
		var arrCoefs = Split(arrDegsAndCoefs[1], ' ');
		resultParsing.push(arrDegs, arrCoefs);
	}
	return resultParsing;
}


function SubsPolynomial(polynom1, polynom2) {
	var residue = new Polynomial();

	polynom1.SetToNoChckd();
	polynom2.SetToNoChckd();

	for (var i = polynom2.members.length - 1; i >= 0; i--) {
		for (var j = polynom1.members.length - 1; j >=0; j--) {
			if (polynom1.members[j].check == false) {
				if (polynom1.members[j].degree > polynom2.members[i].degree) {
					polynom1.members[j].check = true;
					residue.AddMbr(polynom1.members[j].degree, polynom1.members[j].coefficient);
				}
				else if (polynom1.members[j].degree == polynom2.members[i].degree) {
					polynom1.members[j].check = true;

					var coef = polynom1.members[j].coefficient - polynom2.members[i].coefficient;
					coef = Math.abs(coef);

					if (coef != 0) {
						residue.AddMbr(polynom2.members[i].degree, coef);
					}
					break; 
				} 
				else {
					residue.AddMbr(polynom2.members[i].degree, polynom2.members[i].coefficient);
					break;
				}
			}
		}
	}

	for (var i = polynom1.members.length - 1; i >=0; i--) {
		if (polynom1.members[i].check == false) {
			residue.AddMbr(polynom1.members[i].degree, polynom1.members[i].coefficient);
		}
	}
	return residue;
}