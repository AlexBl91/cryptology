//#import 'searchGeneratingElement.js'

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

  document.getElementById('result').innerHTML = "(" + a + ", " + b + ") = " + arrR[i-2];
}

// Task #1
// The function calculates greatest common divisor by the extended Euclid algorithm.
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



// The function check of input data. Called without arguments.
// Returns 0 (false in boolean) if even one text box is 
// empty or input data contain letter or special symbols.
// Returns 1 (true in boolean) in correct input data case.
function FilterInput() {
  var regExp = new RegExp(/[^0-9]/);
  for ( var i in arguments) {
    if (arguments[i] == "") {
      alert('No input data. Check that the data has been entered.');
      return 0;
    } else if (regExp.test(arguments[i])) {
        alert('Wrong input data. Check that entered data is numeric.');
        return 0;        
    } 
  }
  return 1;
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

function printResTask2 (arrObj) {
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

// Function getting next prime number after current.
function getNextPrimeNum (prevPrimeNum) {
  var flag = false;
  var primeNum = 0;
  while (flag == false) {
    primeNum = 2 * (prevPrimeNum++) - 1;   // Getting next odd 
    for (var divider = 2; divider < Math.sqrt(primeNum); divider++) {
      if (primeNum % divider == 0) {
        break;
      } else {
        flag = true;
      }
    }
  }
  return primeNum;
}

$(document).ready(function(){
  $("#btnSubmit").click(function(){
    var varAValue = document.getElementById('varA').value;
    var varBValue = document.getElementById('varB').value;
    if (FilterInput(varAValue, varBValue)) {
      printTask1(EuclidAlgorithmEx(varAValue, varBValue));      
    }
  });
  $("#btnSubmit2").click(function(){
    var varCValue = document.getElementById('varC').value;
    if (FilterInput(varCValue)) {
      if (varCValue.length < 8) {
      printResTask2(CanonicalRepresentations(varCValue)); 
      } else {
        printResTask2(BruteForce(varCValue));     
      }
    }
  });

  $("#mult").click(function(){
    document.getElementById("add").checked = false;
  });
  $("#add").click(function(){
    document.getElementById("mult").checked = false;
  });

  $("#btnSubmit3").click(function(){
    var a = document.getElementById('varTask3').value;
    if (FilterInput(a)) {
      PrintResTask3(GetGeneratingElem(a));
    }
  });

  $("#btnSubmit4").click(function(){
    var a = document.getElementById('varTask4').value;
    if (FilterInput(a)) {
      PrintResTask4(DeterminingOrderOfElem(a));
    }
  });
  
});

