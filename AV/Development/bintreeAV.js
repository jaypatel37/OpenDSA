"use strict";
/*global alert: true, ODSA */
/*global sweep */
(function ($) {
  var comp = function(a, b) {
    return a - b;
  };
  
    function Bintree(jsav, xrange, yrange) {

    var tree;
    var root;
    
    tree = jsav.ds.bintree({nodegap: 10});
    root = tree.root('');
    root.leaf = true;
    root.level = 0;
    //tree.root(root);


    var newL1  = tree.newNode('');
    var newR1 = tree.newNode('');
    newL1.leaf = newR1.leaf = true;
    newR1.empty = newL1.empty = true;
    root.left(newL1);
    root.right(newR1);

    // DON't FORGET THIS!!!
    tree.layout();
    
    this.isEmpty = function () {
      console.log("Bintree isEmpty test: ", !root.left() && !root.right());
      return (!root.left() && !root.right());
    }
      
    // returns a node!
    this.insert = function(rt, INx, INy, INrec, Bx, By, Bwid, Bhgt, level) {

      jsav.step();
      tree.layout();
      console.log("Bintree insert: ", INrec);
      
      if (rt.leaf == true && rt.empty == true) {
        console.log("insert: encountered empty leaf node: insert data and return")
        jsav.umsg("Insert: Encountered an empty leaf node: Now insert data and return!");
        var temp = tree.newNode(INRec);
        temp.x = INx;
        temp.y = INy;
        
        jsav.step();
        return temp;
      }
        
      if (rt.leaf == true) {
        var temp = tree.newNode('');
        var newLeft  = tree.newNode('');
        var newRight = tree.newNode('');
        newLeft.leaf = newRight.leaf = true;
        newRight.empty = newLeft.empty = true;
        temp.setLeftNode(newLeft);
        temp.setRightNode(newRight);
        rt = insert(temp, rt.x, rt.y, rt.value(), Bx, By, Bwid, Bhgt, level);

        // NO Return: Rolls through to next if statement
      }

      // If here, we have an internal node to insert into
    if (level % 2 == 0) // Branch on X
    {
      if (rt.x < (Bx + Bwid/2)) // Insert left
      {
        rt.left(insert(rt.left(), INx, INy, INrec, Bx, By, Bwid/2, Bhgt, level+1));
      }
      else
      {
        rt.right(insert(rt.right(), INx, INy, INrec, Bx + Bwid/2, By, Bwid/2, Bhgt, level+1));
      }
    }

    else // Branch on Y
    {
      if (rt.y < (By + Bhgt/2)) // Insert left
      {
        rt.left(insert(rt.left(), INx, INy, INrec, Bx, By, Bwid, Bhgt/2, level+1));
      }
      else
      {
        rt.right(insert(rt.right(), INx, INy, INrec, Bx, By + Bhgt/2, Bwid, Bhgt/2, level+1));
      }
    }

    tree.layout();
    return rt;



    } // insert


  } // bintree
  
  var arr;

  // check query parameters from URL
  var params = JSAV.utils.getQueryParameter();
  if ("increments" in params) { // set value of increments if it is a param
    $('#increments').val(params.increments).prop("disabled", true);
  }

  // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings"));
  // add the layout setting preference
  var arrayLayout = settings.add("layout",
    {"type": "select", "options": {"bar": "Bar", "array": "Array"},
     "label": "Array layout: ", "value": "bar"});

  // Initialize the arraysize dropdown list
  ODSA.AV.initArraySize(5, 16, 8);
  
  // Process help button: Give a full help page for this activity
  // We might give them another HTML page to look at.
  function help() {
    window.open("bintreeHelpAV.html", 'helpwindow');
  }

  // Process About button: Pop up a message with an Alert
  function about() {
    alert("Bintree Visualization\nWritten by Anthony Rinaldi and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
  }

  // Execute the "Run" button function
  function runIt() {
    
    ODSA.AV.reset(true);

    var jsav = new JSAV($('.avcontainer'));

    jsav.umsg("Let's get started");
    var bint = new Bintree(jsav);
    bint.isEmpty();
    jsav.displayInit();

  jsav.step();
  
    // Setup the tree
    jsav.umsg("Step 1: insert node with value \"A\" @ 10, 10");
  // rt, INx, INy, INrec, Bx, By, Bwid, Bhgt, level
    bint.insert(bint.root, 10, 10, "A", 100, 100, 200, 200, 0);
    bint.isEmpty();
  
    jsav.step();

  
  // Done
    jsav.umsg("All Done!");

    jsav.recorded(); // mark the end

  }

  // Connect action callbacks to the HTML entities
  $('#help').click(help);
  $('#about').click(about);
  $('#run').click(runIt);
  $('#reset').click(ODSA.AV.reset);

}(jQuery));