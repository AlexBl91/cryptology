//#import 'tasks.js'


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

$(document).ready(function(){
  $("#btnSubmit0").click(function(){
    var varAValue = document.getElementById('varATask0').value;
    var varBValue = document.getElementById('varBTask0').value;
    if (FilterInput(varAValue, varBValue)) {
      printTask1(EuclidAlgorithm(varAValue, varBValue));      
    }
  });

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
  
  $("#btnSubmit5").click(function(){
    var a = document.getElementById('varTask5').value;
    var b = document.getElementById('varTask5-1').value;
    EuclidAlgorithmExForPolin(ParsingInput(a, b));
  });

  $("#btnSubmit5-1").click(function(){
    var a = "0 1 3 4,3 1 5 4";
    var b = "0 1 2 3,1 2 3 1";
    EuclidAlgorithmExForPolin(ParsingInput(a, b));
  });

  $("#btnSubmit6").click(function(){
    var a = document.getElementById('varTask6').value;
    if (FilterInput(a)) {
      PrintResTask6(a, EulerFunction(a));
    }
  });

  $("#btnSubmit7").click(function(){
    var a = document.getElementById('varTask7').value;
    var b = document.getElementById('varTask7-1').value;
    if (FilterInput(a, b)) {
      PrintResTask7(a, b, GetInverseElem(a, b));
    }
  });
});

