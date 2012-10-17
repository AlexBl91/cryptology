// Task #1
// Function calculates greatest common divisor by the Euclid algorithm.
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
// Function calculates greatest common divisor by the extended Euclid algorithm.
// Accepts 2 arguments of type integer.
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
  document.getElementById('result').innerHTML = "Bezout's identity:  " +  a + ' * ' + arrX[i-2] + ' + ' + b + ' * ' + v + ' = ' + arrR[i-2];
  
  print1(arrR, arrQ, arrX);
}

// Function print of result of EuclidAlgorithmEx function.
// Accepts 3 arguments of type array.
function print1(arrR, arrQ, arrX) {
  for (var i = 2; i<=arrR.length; i++)
  {
    var newElem = document.createElement('div');
    newElem.innerHTML = arrR[i-2] + '\t' + arrQ[i-2] + '\t' + arrX[i-2];
    newElem.className = 'tmpResult';
    document.getElementById('results').appendChild(newElem);
  }
  var newElem = document.createElement('button');
  newElem.className = 'btn tmp';
  newElem.id = 'tmpBtnClean';
  newElem.onClick = "clean()";
  newElem.innerHTML = 'clean';
  newElem.style.position = 'relative';
  newElem.style.left = '100px';
  document.getElementById('results').appendChild(newElem);
}

function clean() {
  document.getElementByClassName('results').removeChild(getElementById('tmpBtnClean'));
  while (true) {
    if (!document.getElementByClassName('results').removeChild(getElementByClassName('tmpResult'))) {
      break;
    }
  }
}

// Function check of input data. Called without arguments.
// Returns 0 (false in boolean) if even one text box is 
// empty or input data contain letter or special symbols.
// Returns 1 (true in boolean) in correct input data case.
function filterInput() {
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
// Defenition constructor of class 'PrimeNums' without by default
/*function PrimeNums() {
  this.val = null;
  this.count = 0; 
}*/
// Defenition constructor of class 'PrimeNums' with parameter
function PrimeNums(parameter) {
  this.val = parameter;
  this.count = 0; 
}
// Function canonical representation of the number of primes
function CanonicalRepresentations(a) {
  var primeNums = new Array;
  primeNums[0] = new PrimeNums(2);
  var flag = true;
  var i = 0;
  while (flag == true) {
    while (a % primeNums[i].val == 0) {  // пока исходное делится на найденное простое
      a = a / primeNums[i].val;          // получаем колество вхождения текущего 
      primeNums[i].count++;              // простого множителя в исходное число
    }
    if (a == primeNums[i].val) {         // если исходное равно найденному простому множителю, 
      break;                             // то он является последним. Выходим из цикла. 
      flag = false;
    } else {                             // Иначе ищем следующий простой множитель
      primeNums[++i] = new PrimeNums(getNextPrimeNum(primeNums[i-1].val));
    }
  }
  printResTask2(primeNums);
}

function printResTask2 (arrObj) {
  var strResult = "";
  for (var i in arrObj) {
    strResult = arrObj[i].val + '^' + arrObj[i].count + '*';
  }
  /*var newElem = createElement('div');
  newElem.className = 'tmpResult';
  newElem.innerHTML = strResult;
  document.getElementById('result1').appendChild(newElem);*/
  document.getElementById('result1').innerHTML = strResult;
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
    if (filterInput(varAValue, varBValue)) {
      EuclidAlgorithmEx(varAValue, varBValue);      
    }
  });
  $("#btnSubmit2").click(function(){
    var varCValue = document.getElementById('varC').value;
    if (filterInput(varCValue)) {
      CanonicalRepresentations(varCValue);      
    }
  });
  $("#tmpBtnClean").click(function(){
    alert('udifghifdugb;fdl');
    clean();
  });
});

