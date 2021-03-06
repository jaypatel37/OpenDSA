

var av = new JSAV($("#container"));
av.recorded();
var testNum = 1;
var codeCoverage = [];
for (var i = 0; i < 14; i++) {
    codeCoverage[i] = false;
}

function initialize(){
    var testCaseHistory = document.getElementById("testHistory").innerHTML = "";
    document.getElementById("side1").value = "";
    document.getElementById("side1").value = "";
    document.getElementById("side1").value = "";
    var testsrunText = document.getElementById("testsrun");
    testsrunText.innerHTML = "Number of tests run: " + 0;
    testNum = 1;
}

function modelSolution(modeljsav){
    modeljsav.displayInit();
    for(int i = 0; i < 14; i++){
        var s1 = document.getElementById("side1").value;
        var s2 = document.getElementById("side2").value;
        var s3 = document.getElementById("side3").value; 
        var triangleTypeNum = getTriangleTypeNumber(side1, side2, side3);
        if (triangleTypeNum == 1 || triangleTypeNum == 2 || triangleTypeNum == 3){
            modeljsav.gradeableStep();
        }
    }
    return modeljsav;
}

/**
 * Calculates the type of triangle
 * 0 = not a triangle
 * 1 = equilateral
 * 2 = isoceles
 * 3 = scalene
 */
function getTriangleTypeNumber(s1, s2, s3) {
    if (isNaN(s1) || isNaN(s2) || isNaN(s3)) {
        codeCoverage[12] = true;
        return 0; 
    } else if (s1 < 0 || s2 < 0 || s3 < 0) {
        codeCoverage[0] = true;
        return 0;
    } else if (s1 == 0) {
        codeCoverage[1] = true;
        return 0;    
    } else if (s2 == 0) {
        codeCoverage[2] = true;
        return 0;
    } else if (s3 == 0) {
        codeCoverage[3] = true;
        return 0;
    } else if (s1 - s2 == s3) {
        codeCoverage[4] = true;
        return 0;
    } else if (s2 - s1 == s3) {
        codeCoverage[5] = true;
        return 0;
    } else if (s3 - s2 == s1) {
        codeCoverage[6] = true;
        return 0;
    } else if (s1 - s2 > s3) {
        codeCoverage[7] = true;
        return 0;
    } else if (s2 - s1 > s3) {
        codeCoverage[8] = true;
        return 0;
    } else if (s3 - s2 > s1) {
        codeCoverage[9] = true;
        return 0;
    } else if (s1 == s2 && s1 == s3 && s2 == s3) {
        codeCoverage[10] = true;
        return 1;
    } else if (s1 != s2 && s1 != s3 && s2 != s3) {
        codeCoverage[11] = true;
        return 3;   
    } else {
        codeCoverage[13] = true;
        return 2;
    }
}

function getTriangleTypeText(triangleTypeNum) {
    var triangleType = "";
    if (triangleTypeNum == 0) {
        triangleType = "Not a Triangle";
    }
    else if (triangleTypeNum == 1) {
        triangleType = "Equilateral Triangle";
    }
    else if (triangleTypeNum == 2) {
        triangleType = "Isoceles Triangle";
    }
    else if (triangleTypeNum == 3) {
        triangleType = "Scalene Triangle";
    }
    return triangleType;
}

/**
 * calculates code coverage percentage
 */
function calculateCoverage() {
    var numTrue = 0;
    for (var i in codeCoverage) {
        if (codeCoverage[i]) {
            numTrue++;
        }
    }
    return numTrue * 100 / codeCoverage.length;
}


function logTestCase(s1, s2, s3, triangleName) {
    var testCaseHistory = document.getElementById("testHistory");
    testCaseHistory.innerHTML = "Test " + testNum + ": " + "Sides: " + s1 + ", " + s2 + ", " + s3 + " "
                                 + triangleName + "\n" + testCaseHistory.innerHTML;
    setPerformanceDetails();
}

function setPerformanceDetails() {
    var testsrunText = document.getElementById("testsrun");
    testsrunText.innerHTML = "Number of tests run: " + testNum;
    testNum++;
}

function classifyTriangle() {
    var side1 = document.getElementById("side1").value;
    var side2 = document.getElementById("side2").value;
    var side3 = document.getElementById("side3").value;  
    var triangleTypeNum = getTriangleTypeNumber(side1, side2, side3);
    var triangleType = getTriangleTypeText(triangleTypeNum);
    logTestCase(side1, side2, side3, triangleType);
}

var exercise = av.exercise(modelSolution, initialize);
exercise.reset():

