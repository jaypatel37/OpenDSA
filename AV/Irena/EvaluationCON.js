// Written by Irena Shaffer
$(document).ready(function() {
  "use strict";
  var av_name = "EvaluationCON";

  var av = new JSAV(av_name);

  av.umsg("However, if we evaluate both polynomials (at the same points), we can simply multiply " +
    "the corresponding pairs of values to get the corresponding values for polynomial AB.");

  av.displayInit();

  av.umsg("We will demonstrate this using the following polynomials.");

  var polyA = av.label("Polynomial A: $x^2 + 1$");
  var polyB = av.label("Polynomial B: $2x^2 - x + 1$");
  var polyAB = av.label("Polynomial AB: $AB = A*B = (x^2 + 1)*(2x^2 - x + 1) = 2x^4 - x^3 + 3x^2 - x + 1$");

  av.step();

  av.umsg("At x = -1:");
  var line = av.label("---------------------------------------------------------------------------------------------------");
  var A = av.label("$A(-1) = (-1)^2 + 1 = 2$");
  var B = av.label("$B(-1) = 2(-1)^2 - (-1) + 1 = 4$");
  var ab = av.label("$A(-1)*B(-1) = 2*4 = 8$");
  var AB = av.label("$AB(-1) = 2(-1)^4 - (-1)^3 + 3(-1)^2 - (-1) + 1 = 8$");

  av.step();

  av.umsg("At x = 0:");

  A.text("$A(0) = (0)^2 + 1 = 1$");
  B.text("$B(0) = 2(0)^2 - (0) + 1 = 1$");
  ab.text("$A(0)*B(0) = 1*1 = 1$");
  AB.text("$AB(0) = 2(0)^4 - (0)^3 + 3(0)^2 - (0) + 1 = 1$");

  av.step();

  av.umsg("At x = 1:");

  A.text("$A(1) = (1)^2 + 1 = 2$");
  B.text("$B(1) = 2(1)^2 - (1) + 1 = 2$");
  ab.text("$A(1)*B(1) = 2*2 = 4$");
  AB.text("$AB(1) = 2(1)^4 - (1)^3 + 3(1)^2 - (1) + 1 = 4$");

  av.step();

  av.umsg("So the results are the same when we evaluate polynomial AB at a point or when we evaluate " +
    "polynomial A and polynomial B at the same point and then multiply the result.");

  polyA.hide();
  polyB.hide();
  polyAB.hide();
  A.hide();
  B.hide();
  ab.hide();
  AB.hide();
  line.hide();

  av.recorded();
});
