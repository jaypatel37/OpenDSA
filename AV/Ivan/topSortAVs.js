"use strict";
/*global alert: true, ODSA */

(function ($) {
  var jsav;
  var g;
  var arr;
  var c0, c1, c2, c3, c4, c5, c6, c7, c8;
  var size;
  var numberofnodes;
  var markCount;

function topSort() {
  ODSA.AV.reset(true);
  jsav = new JSAV($('.avcontainer'));
  numberofnodes = 0;
  markCount =0;
  arr = jsav.ds.array(["","","","",""],{left: 600, top: 100, layout: "vertical"});
  size = 4;
  initGraph();
  g.layout();
  jsav.umsg("A topological sort is performed by doing a depth first search on a " +
    "directed acyclic graph. The nodes are are then popped off the stack resulting in a topological sort ");
  jsav.displayInit();
  markIt(g.nodes()[0]);
  dfs(g.nodes()[0]);
  jsav.step();
  jsav.umsg("Possible ordering of nodes:  " + displaySort(numberofnodes));
  jsav.step();
  jsav.recorded();
}

function qTopSort() {
  ODSA.AV.reset(true);
  jsav = new JSAV($('.avcontainer'));
  //g = jsav.ds.graph({width: 500, height: 500, left: 0, top: 50, layout: "manual", directed: true});
  queue = jsav.ds.array(["<b>Queue</b>","","","","",""],  {left: 440, top: 200});
  var data = ["<b>&nbsp;Nodes&nbsp;</b>", "&nbsp;A&nbsp;","&nbsp;B&nbsp;","&nbsp;C&nbsp;","&nbsp;D&nbsp;","&nbsp;E&nbsp;"];
  Courses = new jsav.ds.array(data,{left: 440,top:50});
  Ecount = new jsav.ds.array(["<b>&nbsp;Count&nbsp</b>","","","","",""],{left: 440,top:98});
  Ecount.css(0,{width:52,"background-color":"#CC6633"});
  Courses.css(0,{width:52,"background-color":"#CC6633"});
  queue.css(0,{width:52,"background-color":"#CC6633"});
  oparr = jsav.ds.array(["<b>Output</b>","","","","",""],  {left: 440, top: 300});
  oparr.css(0,{width:52,"background-color":"#CC6633"});
  oparrcnt=1;
  initGraph();
  var v;
  var node;
  var adjNode = new Array();
  for (v=0;v<g.nodeCount();v++)
        Count[v]=0;
  for (v=0;v<g.nodeCount();v++){
        node=g.nodes()[v];
        adjNode=node.neighbors();
        for(var i=0;i<adjNode.length;i++){
		var j=(g.nodes()).indexOf(adjNode[i]);
		if(j>=0)
                	(Count[j])++;
	}
  }
  for(var i=0;i<g.nodeCount();i++){
           Ecount.value(i+1,Count[i]);
  }
  g.layout();
  jsav.umsg("A queue based topological sort is performed on a directed acyclic graph.");
  jsav.step();
  jsav.displayInit();
  topSortBFS(g.nodes()[0]);
  jsav.umsg("Possible ordering of Nodes:  " + displaySort());
  jsav.step();
  jsav.recorded();
}

// Mark the nodes when visited and highlight it to
// show it has been marked
function markIt(node) {
  node.addClass("marked");
  jsav.umsg("Mark node " + node.value());
  node.highlight();
  markCount++;
  jsav.step();
}


function postVisit(node) {
  jsav.umsg("Add " + node.value() + " to the stack ");
  arr.value(size, node.value());
  numberofnodes++;
  size--;
}

// Recursive depth first search algorithmn for searching
// the graph
function dfs(start, prev) {
  var adjacent;
  var next;
  adjacent = start.neighbors();

  for (next = adjacent.next(); next; next = adjacent.next()) {
    jsav.umsg("Process edge between (" + start.value() + " and " + next.value() + ")");
      if(next.hasClass("marked")) {
        jsav.umsg("Node " + next.value() + " already marked");
      }

    jsav.step();
    if (!next.hasClass("marked")) {
      jsav.umsg("Call depth first search on " + next.value());
      jsav.step();
      markIt(next);
      dfs(next, start);
      jsav.step();
    }
  }
  postVisit(start);
}


function about() {
   alert("Top Sort Visualization");
}


// Graph prepartion for initial stage of visualization

function initGraph() {
  g = jsav.ds.graph({
  width: 400,
  height: 400,
  left: 0,
  top: 50,
  layout: "automatic",
  directed: true
    });
  graphUtils.generateGraph(g); // Randomly generate the graph without weights
  return g;
}

function displaySort() {
  var str = "";

  if (markCount == 0) {
    str = "There are no possible traversals on this graph."
    return str;
  }

    for (var j = 5 - markCount; j < 4; j++) {
      str += arr.value(j) + ", ";
    }
    str += arr.value(j);
  return str;
}
function dequeueIt(node,q) {
  node.addClass("dequeued");
  jsav.umsg("Dequeue " + node.value()+", put it into the Output array and discard its outgoing edges.");
  for(var i=0;i<q.length;i++)
  	queue.value(i+1,q[i].value());
  queue.value(i+1,"");
  var i=g.nodes().indexOf(node);
  oparr.value(oparrcnt,node.value());
  oparr.css(oparrcnt,{"background-color":"#66CC99"});
  oparrcnt++;
  Ecount.addClass(i+1,"marked");
  Courses.unhighlight(i+1);
  Ecount.unhighlight(i+1);
  jsav.step();
}

function updateCount(adjnodes){
        var str="";
	var node;
	while(adjnodes.length > 0){
		node=adjnodes.shift();
		str+=" "+node.value()+" ";
	}
	jsav.umsg("Mark "+str+" and update the number of it's incoming edges.");
	for(var i=0;i<g.nodeCount();i++){
		var temp=Ecount[i+1];
		Ecount.value(i+1,Count[i]);
		if(Count[i]==0 && temp!=0)
		    if(!Ecount.hasClass(i+1,"marked")){
			Courses.highlight(i+1);
			Ecount.highlight(i+1);
		    }
	}
	jsav.step();
}

function topSortBFS(stcd Oart) {
  console.log("start : " + start.value());
  var node;
  var adjNode = new Array();
  var q = new Array();
  var v=0;
  var ctr=0;
  var cntZero = new Array();
  jsav.umsg("The \"Nodes\" array lists the courses and the \"Count\" array shows the number of unresolved dependencies of the node directly above it. Dependencies are denoted by incoming edges.");
  jsav.step();
  for(v=0;v<g.nodeCount();v++)
	if(Count[v]==0){
		node=g.nodes()[v];
		if(!node.hasClass("marked")){
			q.push(node);
			Courses.highlight(v+1);
			Ecount.highlight(v+1);
			markIt(node,q);
		}
	}
  while(q.length > 0) {
    node = q.shift();
    dequeueIt(node,q);
    console.log("node " + node.value());
    output.push(node.value());
    adjNode = node.neighbors();
    console.log("adjNode " + adjNode.length);
    ctr=0;
    for(var i=0;i<adjNode.length;i++) {
	var j=(g.nodes()).indexOf(adjNode[i]);
        if(j>=0){
	        (Count[j])--;
		ctr++;
        	if(Count[j]==0) {
                	node=g.nodes()[j];
			cntZero.push(node);
		}
        }
    }
    if(ctr>0)
    	updateCount(adjNode);
    while(cntZero.length > 0){
	node=cntZero.shift();
	q.push(node);
	markIt(node,q);
    }
 }


// Connect action callbacks to the HTML entities
$('#about').click(about);
$('#topSort').click(TopSort);
$('#qTopSort').click(qTopSort);

}(jQuery));
