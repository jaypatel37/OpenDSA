/*global Complex */
// Written by Irena Shaffere
$(document).ready(function() {
  "use strict";
  var av_name = "FFTprocedureCON";

  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object

  var av = new JSAV(av_name);

  var pseudo = av.code(code[0]);

  av.umsg("This slideshow shows a visualization of the Fast Fourier Transform.");
  var polynomial = [0, 1, 2, 3];

  av.displayInit();

  av.umsg("New polynomial.");

  var poly2 = fft(polynomial, 4);

  av.ds.array(poly2, {left: 750 - 40 * 4 / 2});

  av.recorded();

  function fft(poly, n) {
    var even = [];
    var odd = [];
    var list1 = [];
    var list2 = [];
    var newPoly = [];
    var height = 0;

    av.umsg(interpret("sc1"));
    var polyArr = av.ds.array(poly, {left: 750 - 40 * n / 2});
    height = height + 50;
    pseudo.highlight("fft");
    av.step();

    pseudo.unhighlight("fft");

    if (n === 1) {
      var list = [poly[0]];
      av.umsg(interpret("sc2"));
      pseudo.highlight("if");
      av.step();
      pseudo.unhighlight("if");
      polyArr.hide();
      return list;
    }

    var i;
    for (i = 0; i <= n / 2 - 1; i++) {
      even[i] = poly[2 * i];
      polyArr.css(2 * i, {"background-color": "#ffffb3"});
      odd[i] = poly[2 * i + 1];
      polyArr.css(2 * i + 1, {"background-color": "#b3ecff"});
    }
    pseudo.highlight("split");

    av.umsg(interpret("sc3"));
    var evenArr = av.ds.array(even, {left: 625 - 40 * n / 4, top: height});
    var evenLab = av.label("even:", {left: 575 - 40 * n / 4, top: height});
    var oddArr = av.ds.array(odd, {left: 875 - 40 * n / 4, top: height});
    var oddLab = av.label("odd:", {left: 825 - 40 * n / 4, top: height});

    for (i = 0; i <= n / 2 - 1; i++) {
      evenArr.css(i, {"background-color": "#ffffb3"});
      oddArr.css(i, {"background-color": "#b3ecff"});
    }
    height = height + 50;
    av.step();

    for (i = 0; i <= n / 2 - 1; i++) {
      polyArr.css(2 * i, {"background-color": "#ffffff"});
      polyArr.css(2 * i + 1, {"background-color": "#ffffff"});
      evenArr.css(i, {"background-color": "#ffffff"});
      oddArr.css(i, {"background-color": "#ffffff"});
    }
    pseudo.unhighlight("split");
    av.umsg(interpret("sc4"));
    pseudo.highlight("list1");
    av.step();

    pseudo.unhighlight("list1");

    polyArr.hide();
    evenArr.hide();
    evenLab.hide();
    oddArr.hide();
    oddLab.hide();
    list1 = fft(even, n / 2);
    pseudo.highlight("list1");
    polyArr.show();
    evenArr.show();
    evenLab.show();
    oddArr.show();
    oddLab.show();
    var list1Arr = av.ds.array(list1, {left: 625 - 40 * n / 4, top: height});
    var list1Lab = av.label("List 1:", {left: 575 - 40 * n / 4, top: height});
    av.step();
    pseudo.unhighlight("list1");
    av.umsg(interpret("sc5"));
    pseudo.highlight("list2");
    av.step();

    pseudo.unhighlight("list2");
    polyArr.hide();
    evenArr.hide();
    evenLab.hide();
    oddArr.hide();
    oddLab.hide();
    list1Arr.hide();
    list1Lab.hide();
    list2 = fft(odd, n / 2);
    pseudo.highlight("list2");
    polyArr.show();
    evenArr.show();
    evenLab.show();
    oddArr.show();
    oddLab.show();
    list1Arr.show();
    list1Lab.show();
    var list2Arr = av.ds.array(list2, {left: 875 - 40 * n / 4, top: height});
    var list2Lab = av.label("List 2:", {left: 825 - 40 * n / 4, top: height});
    height = height + 50;
    av.step();
    pseudo.unhighlight("list2");

    av.umsg(interpret("sc6"));

    pseudo.highlight("loop");

    var j;
    for (j = 0; j <= (n - 1); j++) {
      var exponent = new Complex(0, 2 * Math.PI * j / n);
      var z = exponent.exp().round();
      var k = j % (n / 2);
      var l1 = new Complex(list1[k], 0);
      var l2 = new Complex(list2[k], 0);
      var out = l1.add(z.mul(l2));
      newPoly[j] = out;
    }

    var newArr = av.ds.array(newPoly, {left: 750 - 40 * n / 2, top: height});

    av.step();

    pseudo.unhighlight("loop");
    av.umsg(interpret("sc7"));

    polyArr.hide();
    evenArr.hide();
    evenLab.hide();
    oddArr.hide();
    oddLab.hide();
    list1Arr.hide();
    list1Lab.hide();
    list2Arr.hide();
    list2Lab.hide();
    newArr.hide();
    return newPoly;
  }
});
