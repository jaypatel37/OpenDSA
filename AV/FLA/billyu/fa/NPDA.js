// NPDA "class", extending FiniteAutomaton
var NPDA = function(jsav, options) {
	FiniteAutomaton.apply(this, arguments);
	this.transitions = [];
}

JSAV.ext.ds.npda = function (options) {
	var opts = $.extend(true, {visible: true, autoresize: true}, options);
	return new NPDA(this, opts);
};

JSAV.utils.extend(NPDA, JSAV._types.ds.Graph);

NPDA.prototype = Object.create(FiniteAutomaton.prototype, {});
var npda = NPDA.prototype;

npda.showAccept = function(state) {
	state.addClass('accepted');
}

npda.removeAccept = function(state) {
	state.removeClass('accepted');
}

npda.showReject = function(state) {
	state.addClass('rejected');
}

npda.isInitial = function(state) {
	return state == this.initial;
}

npda.isFinal = function(state) {
	return state.hasClass('final');
}

//====================
// tests

// toggles highlighting nondeterministic nodes
npda.toggleND = function() {
	var nodes = this.nodes();
	for(var next = nodes.next(); next; next = nodes.next()) {
		var edges = next.getOutgoing();
		if (edges.length === 0) {continue;}
		var weights = _.map(edges, function(e) {return e.weight().split('<br>')});
		for (var i = 0; i < weights.length; i++) {
			var findLambda = _.find(weights[i], function(e) {return e.split(':')[0] === emptystring});
			if (findLambda) { break; }
		}
		var dup = _.map(_.flatten(weights), function(e) {return _.initial(e.split(':')).join()})
			if (findLambda || _.uniq(dup).length < dup.length) {
				next.toggleClass('testingND');
			}
	}
};

// toggles highlighting lambda transitions
npda.toggleLambda = function() {
	var edges = this.edges();
	for (var next = edges.next(); next; next = edges.next()) {
		var wSplit = next.weight().split('<br>');
		for (var i = 0; i < wSplit.length; i++) {
			if (_.every(wSplit[i].split(':'), function(x) {return x == emptystring})) {
				next.g.element.toggleClass('testingLambda');
				break;
			}
		}
	}
};

//====================
//traversal

npda.play = function(inputString) {
	this.initial.addClass('current');
	var currentStates = [new Configuration(this.initial, ['Z'], inputString, 0)];
	currentStates = this.addLambdaClosure(currentStates);
	var configView = "Configurations: ";
	for (var j = 0; j < currentStates.length; j++) {
		configView += currentStates[j].toString() + ' | ';
	}
	this.jsav.umsg(configView);
	var cur;

	this.jsav.displayInit();
	var counter = 0;
	var stringAccepted = false;
	while (true) {
		this.jsav.step();
		counter++;
		if (counter > 500) {
			break;
		}
		for (var j = 0; j < currentStates.length; j++) {
			currentStates[j].state.removeClass('current');
			currentStates[j].state.removeClass('accepted');
			currentStates[j].state.removeClass('rejected');
		}
		cur = this.traverse(currentStates, inputString[i]);
		if (cur.length === 0) {
			break;
		}
		currentStates = cur;
		configView = "Configurations: ";
		for (var j = 0; j < currentStates.length; j++) {
			if (currentStates[j].curIndex === inputString.length) {
				if (currentStates[j].state.hasClass('final')) {
					currentStates[j].state.addClass('accepted');
					stringAccepted = true;
				} else {
					currentStates[j].state.addClass('rejected');
				}
			}
			configView += cur[j].toString() + ' | ';
		}
		this.jsav.umsg(configView);
	}

	if (stringAccepted) {
		this.jsav.umsg("Accepted");
	} else {
		this.jsav.umsg("Rejected");
	}
	this.jsav.recorded();
};

npda.traverse = function(currentStates) {
	// currentStates is an array of configurations
	var nextStates = [];
	for (var i = 0; i < currentStates.length; i++) {
		var successors = currentStates[i].state.neighbors(),
				curStack = currentStates[i].stack,
				curIndex = currentStates[i].curIndex,
				s = currentStates[i].inputString,
				letter = s[curIndex];
		for (var next = successors.next(); next; next = successors.next()) {
			var w = this.getEdge(currentStates[i].state, next).weight().split('<br>');
			for (var j = 0; j < w.length; j++) {
				var nextIndex = curIndex + 1;
				var t = w[j].split(':');
				if (t[0] !== letter && t[0] !== emptystring) {continue;}
				if (t[0] === emptystring) {nextIndex = curIndex;}
				if (t[1] !== emptystring) {
					var l = [],
							cur;
					for (var k = 0; k < t[1].length; k++) {
						cur = curStack.pop();
						if (cur) {
							l.push(cur);
						} else {
							break;
						}
					}
					if (t[1] === l.join('')) {
						var nextConfig = new Configuration(next, curStack, s, nextIndex);
						if (t[2] !== emptystring){
							for (var h = t[2].length - 1; h >= 0; h--) {
								nextConfig.stack.push(t[2].charAt(h));
							}
						}
						next.addClass('current');
						nextStates.push(nextConfig);
					} 
					l.reverse();
					curStack = curStack.concat(l);
				} else {
					var nextConfig = new Configuration(next, curStack, s, nextIndex);
					if (t[2] !== emptystring){
						for (var h = t[2].length - 1; h >= 0; h--) {
							nextConfig.stack.push(t[2].charAt(h));
						}
					}
					next.addClass('current');
					nextStates.push(nextConfig);
					break;
				}
			}
		}
	}
	nextStates = _.uniq(nextStates, function(x) {return x.toString();});
	nextStates = this.addLambdaClosure(nextStates);
	return nextStates;
};

npda.addLambdaClosure = function(nextStates) {
	lambdaStates = [];
	for (var i = 0; i < nextStates.length; i++) {
		var successors = nextStates[i].state.neighbors();
		for (var next = successors.next(); next; next = successors.next()) {
			var weight = this.getEdge(nextStates[i].state, next).weight().split('<br>');
			for (var j = 0; j < weight.length; j++) {
				if (!next.hasClass('current') && _.every(weight[j].split(':'), function(x) {return x === emptystring})) {
					next.addClass('current');
					var nextConfig = new Configuration(next, nextStates[i].stack, nextStates[i].inputString, nextStates[i].curIndex)
						lambdaStates.push(nextConfig);
				}
			}
		}
	}
	if(lambdaStates.length > 0) {
		lambdaStates = this.addLambdaClosure(lambdaStates);
	}
	for (var k = 0; k < lambdaStates.length; k++) {
		nextStates.push(lambdaStates[k]);
	}
	nextStates = _.uniq(nextStates, function(x) {return x.toString();});
	return nextStates;
};

// Configuration object
var Configuration = function(state, stack, str, index) {
	this.state = state;
	this.inputString = str;
	this.curIndex = index;
	this.stack = stack.slice(0);
	this.toString = function() {
		return this.state.value() + ' ' + this.inputString.substring(0, this.curIndex) + ' ' + this.stack.join();
	}
};

//======================
// Save/Load
// save PDA as XML
npda.serializeToXML = function () {
	var text = '<?xml version="1.0" encoding="UTF-8"?>';
	text = text + "<structure>";
	text = text + "<type>pda</type>"
		text = text + "<automaton>"
		var nodes = this.nodes();
	for (var next = nodes.next(); next; next = nodes.next()) {
		var left = next.position().left;
		var top = next.position().top;
		var i = next.hasClass("start");
		var f = next.hasClass("final");
		var label = next.stateLabel();
		text = text + '<state id="' + next.value().substring(1) + '" name="' + next.value() + '">';
		text = text + '<x>' + left + '</x>';
		text = text + '<y>' + top + '</y>';
		if (label) {
			text = text + '<label>' + label + '</label>';
		}
		if (i) {
			text = text + '<initial/>';
		}
		if (f) {
			text = text + '<final/>';
		}
		text = text + '</state>';
	}
	var edges = this.edges();
	for (var next = edges.next(); next; next = edges.next()) {
		var fromNode = next.start().value().substring(1);
		var toNode = next.end().value().substring(1);
		var w = next.weight().split('<br>');
		for (var i = 0; i < w.length; i++) {
			text = text + '<transition>';
			text = text + '<from>' + fromNode + '</from>';
			text = text + '<to>' + toNode + '</to>';
			var wSplit = w[i].split(":");
			if (wSplit[0] === emptystring) {
				text = text + '<read/>';
			} else {
				text = text + '<read>' + wSplit[0] + '</read>';
			}
			if (wSplit[1] === emptystring) {
				text = text + '<pop/>';
			} else {
				text = text + '<pop>' + wSplit[1] + '</pop>';
			}
			if (wSplit[2] === emptystring) {
				text = text + '<push/>';
			} else {
				text = text + '<push>' + wSplit[2] + '</push>';
			}
			text = text + '</transition>';
		}
	}
	text = text + "</automaton></structure>"
		return text;
};

// load a PDA from a XML file
npda.initFromXML = function(text) {
	var parser,
			xmlDoc;
	if (window.DOMParser) {
			parser=new DOMParser();
			xmlDoc=parser.parseFromString(text,"text/xml");
	} else {
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async=false;
			xmlDoc.loadXML(text);
	}
	if (xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue !== 'pda') {
			alert('File does not contain a pushdown automaton.');
			// clear input
			var loaded = $('#loadbutton');
			loaded.wrap('<form>').closest('form').get(0).reset();
			loaded.unwrap();
			return;
	} else {
		var nodes = this.nodes();
		for (var node = nodes.next(); node; node = nodes.next()) {
			this.removeNode(node);
		}
		$('.jsavgraph').off();
	}
	var nodeMap = {};			// map node IDs to nodes
	var xmlStates = xmlDoc.getElementsByTagName("state");
	xmlStates = _.sortBy(xmlStates, function(x) {return x.id;})
	var xmlTrans = xmlDoc.getElementsByTagName("transition");
	for (var i = 0; i < xmlStates.length; i++) {
		var x = Number(xmlStates[i].getElementsByTagName("x")[0].childNodes[0].nodeValue);
		var y = Number(xmlStates[i].getElementsByTagName("y")[0].childNodes[0].nodeValue);
		var newNode = this.addNode({left: x, top: y});
		var isInitial = xmlStates[i].getElementsByTagName("initial")[0];
		var isFinal = xmlStates[i].getElementsByTagName("final")[0];
		var isLabel = xmlStates[i].getElementsByTagName("label")[0];
		if (isInitial) {
			this.makeInitial(newNode);
		}
		if (isFinal) {
			newNode.addClass('final');
		}
		if (isLabel) {
			newNode.stateLabel(isLabel.childNodes[0].nodeValue);
		}
		nodeMap[xmlStates[i].id] = newNode;
	}
	for (var i = 0; i < xmlTrans.length; i++) {
		var from = xmlTrans[i].getElementsByTagName("from")[0].childNodes[0].nodeValue;
		var to = xmlTrans[i].getElementsByTagName("to")[0].childNodes[0].nodeValue;
		var read = xmlTrans[i].getElementsByTagName("read")[0].childNodes[0];
		var pop = xmlTrans[i].getElementsByTagName("pop")[0].childNodes[0];
		var push = xmlTrans[i].getElementsByTagName("push")[0].childNodes[0];
		if (!read) {
			read = emptystring;
		} else {
			read = read.nodeValue;
		}
		if (!pop) {
			pop = emptystring;
		} else {
			pop = pop.nodeValue;
		}
		if (!push) {
			push = emptystring;
		} else {
			push = push.nodeValue;
		}
		this.addEdge(nodeMap[from], nodeMap[to], {weight: read + ":" + pop + ":" + push});
	}
	this.layout();
};
