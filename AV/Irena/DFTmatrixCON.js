// Written by Irena Shaffer
$(document).ready(function() {
  "use strict";
  var av_name = "DFTmatrixCON";

  var av = new JSAV(av_name);

  // Slide #1
  av.umsg("For an 8 degree polynomial, the matrix is 8x8.");

  var A  = av.ds.matrix([["$A_0$"], ["$A_1$"], ["$A_2$"], ["$A_3$"], ["$A_4$"],
    ["$A_5$"], ["$A_6$"], ["$A_7$"]], {left: 140, top: 30});

  var mat = av.ds.matrix({rows: 8, columns: 8, left: 250, top: 30});

  var a  = av.ds.matrix([["$a_0$"], ["$a_1$"], ["$a_2$"], ["$a_3$"], ["$a_4$"],
    ["$a_5$"], ["$a_6$"], ["$a_7$"]], {left: 665, top: 30});

  av.g.line(210, 222, 225, 222, {"stroke-width": 4});
  av.g.line(210, 229, 225, 229, {"stroke-width": 4});

  av.g.line(632, 221, 642, 231, {"stroke-width": 4});
  av.g.line(632, 231, 642, 221, {"stroke-width": 4});

  var i = 0;
  var j = 0;
  var power = 0;
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      power = i * j;
      mat.value(i, j, "$z$^" + power);
    }
  }

  av.displayInit();

  // Slide #2
  av.umsg("Since n = 8 we have z = $\\sqrt i$, which gives the following matrix.");
  var val = "";
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      power = i * j;
      if ((power % 8) === 0) {
        val = "$1$";
      } else if ((power % 8) === 1) {
        val = "$\\sqrt i$";
      } else if ((power % 8) === 2) {
        val = "$i$";
      } else if ((power % 8) === 3) {
        val = "$i\\sqrt i$";
      } else if ((power % 8) === 4) {
        val = "$-1$";
      } else if ((power % 8) === 5) {
        val = "$-\\sqrt i$";
      } else if ((power % 8) === 6) {
        val = "$-i$";
      } else if ((power % 8) === 7) {
        val = "$-i\\sqrt i$";
      }
      mat.value(i, j, val);
    }
  }

  av.step();


  av.umsg("Each element of the result is equal to the inner product of the" +
    " coresponding row of the matrix with the seed vector.");

  A.css(0, 0, {"background-color": "#ff8080"});//red
  for (i = 0; i < 8; i++) {
    mat.css(0, i, {"background-color": "#ff8080"});
    a.css(i, 0, {"background-color": "#ff8080"});
  }

  av.step();

  av.umsg("So, we are dealing with 8 terms obtained from multiplications.");
  for (i = 0; i < 8; i++) {
    mat.css(0, i, {"background-color": "white"});
    a.css(i, 0, {"background-color": "white"});
  }

  mat.css(0, 0, {"background-color": "#ff8080"});
  a.css(0, 0, {"background-color": "#ff8080"});

  var lab = av.label("$1*a_0$", {left: 250});

  av.step();

  av.umsg("Adding these terms that come from multiplications");

  mat.css(0, 1, {"background-color": "#ff8080"});
  a.css(1, 0, {"background-color": "#ff8080"});

  lab.text("$1*a_0 + 1*a_1$");

  av.step();

  av.umsg("Adding these terms that come from multiplications");

  mat.css(0, 2, {"background-color": "#ff8080"});
  a.css(2, 0, {"background-color": "#ff8080"});

  lab.text("$1*a_0 + 1*a_1 + 1*a_2$");

  av.step();

  av.umsg("...for every pair of elements from the matrix and the vector.");

  mat.css(0, 3, {"background-color": "#ff8080"});
  a.css(3, 0, {"background-color": "#ff8080"});
  mat.css(0, 4, {"background-color": "#ff8080"});
  a.css(4, 0, {"background-color": "#ff8080"});
  mat.css(0, 5, {"background-color": "#ff8080"});
  a.css(5, 0, {"background-color": "#ff8080"});
  mat.css(0, 6, {"background-color": "#ff8080"});
  a.css(6, 0, {"background-color": "#ff8080"});
  mat.css(0, 7, {"background-color": "#ff8080"});
  a.css(7, 0, {"background-color": "#ff8080"});

  lab.text("$1*a_0 + 1*a_1 + 1*a_2 + 1*a_3 + 1*a_4 + 1*a_5 + 1*a_6 + 1*a_7$");

  av.step();

  av.umsg("This has to be done for each row. So the computational cost of this operation is $O(n^2)$.");

  lab.hide();
  a.css(0, 0, {"background-color": "white"});
  A.css(1, 0, {"background-color": "#bfbfbf"});//grey
  A.css(2, 0, {"background-color": "#ffff80"});//yellow
  A.css(3, 0, {"background-color": "#66d9ff"});//blue
  A.css(4, 0, {"background-color": "#ecb3ff"});//pink
  A.css(5, 0, {"background-color": "#4dffd2"});//green
  A.css(6, 0, {"background-color": "#ffaa80"});//orange
  A.css(7, 0, {"background-color": "#b3b3ff"});//purple
  for (i = 0; i < 8; i++) {
    a.css(i, 0, {"background-color": "white"});
    mat.css(1, i, {"background-color": "#bfbfbf"});//grey
    mat.css(2, i, {"background-color": "#ffff80"});//yellow
    mat.css(3, i, {"background-color": "#66d9ff"});//blue
    mat.css(4, i, {"background-color": "#ecb3ff"});//pink
    mat.css(5, i, {"background-color": "#4dffd2"});//green
    mat.css(6, i, {"background-color": "#ffaa80"});//orange
    mat.css(7, i, {"background-color": "#b3b3ff"});//purple
  }
  av.recorded();
});
