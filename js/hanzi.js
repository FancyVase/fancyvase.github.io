var data, charactersRaw, characters, charactersTopicRaw, charactersTopic;
var latoL;
var x = 0;
var y = 0;
var wordsToDisplay = 30;
var minIndex, maxIndex;
var canScroll = true;
var focusCharacter;
var focusIndex;
var viewLesson = true; // true = by lesson, false = by topic
// var viewLesson = false; // true = by lesson, false = by topic
var showInfo = false;


var unitColors = {
	A: "#1F77B4", B: "#AEC7E8", 1: "#E5944E", 2: "#FFBD60", 3: "#5BAD5B", 4: "#ACEA9F",
	5: "#D65353", 6: "#FF9896", 7: "#9467BD", 8: "#C5B0D5", 9: "#8C564B", 10: "#C49C94",
	11: "#E377C2", 12: "#F7B6D2", 13: "#7F7F7F", 14: "#C7C7C7", 15: "#BCBD22", 16: "#DBDB8D",
	17: "#17BECF", 18: "#9EDAE5", 19: "#DADAEB"
}

var topicColors = {
	"actions": "#62AE9E", "animals": "#E5944E", "body": "#FF9896", "building": "#7F7F7F", 
	"clothes": "#1F77B4", "colors": "#E377C2", "conversation": "#8E5572", "counting": "#C3423F", 
	"description": "#63A375", "directions": "#485B6D", "drinks": "#406699", "emotions": "#D65353", 
	"family": "#D19457", "food": "#D65353", "furniture": "#8C564B", "geography": "#00635D",
	"grammar": "#CC9A4B", "interactions": "#7C99B4", "language": "#73877B", "life": "#FFFFFF", 
	"measure word": "#5BAD5B", "measurement": "#C06E52", "misc.": "#FBF2C0", "money": "#E2B52D", 
	"movement": "#59A9B7", "names": "#575761", "nature": "#5BAD5B", "numbers": "#7F7F7F", 
	"paper": "#9CB79C", "people": "#C66D8F", "perception": "#594AAD", "places": "#564D4A", 
	"relationships": "#5B2333", "school": "#E5944E", "senses": "#6677A2", "society": "#9467BD", 
	"things": "#C2948A", "time": "#C5B0D5", "transportation": "#844448", "virtues": "#AAADC4",
	"weather": "#1F77B4", "work": "#C7C7C7",
}

function preload() {
	latoL = loadFont('../assets/Lato-Light.ttf');

	data = loadTable("../assets/characters.csv", "csv", "header");
	charactersRaw = data.getRows();
}

function setup() {
	createCanvas(1280, 800);
	textAlign(CENTER, CENTER);

	// Duplicate characters data to sort by topic
	charactersTopicRaw  = _.cloneDeep(charactersRaw);

	// Add topic headers
	var topicsToAdd = {};
	for (var i = 0; i < charactersTopicRaw.length; i++) {
		var charTopic = charactersTopicRaw[i].obj["Topic"];
		if (!(charTopic in topicsToAdd)) {
			topicsToAdd[charTopic] = true;
		}
	}
	Object.keys(topicsToAdd).forEach(function(topic) {
		var topicHeader = { "obj": {
			"Character": topic,
			"Topic": topic,
			"isHeader": true 
		}};
		charactersTopicRaw.unshift(topicHeader);
	});

	// Sort characters by topic
	charactersTopicRaw  = charactersTopicRaw.sort(function(a,b) {
		if (a.obj["Topic"] < b.obj["Topic"]) return -1;
		if (a.obj["Topic"] > b.obj["Topic"]) return 1;

		if (a.obj["isHeader"]) return -1;
		if (b.obj["isHeader"]) return 1;
		return 0;
	});

	// Prepare characters sorted by topic
	charactersTopic = charactersTopicRaw.map(function(c, i) {
		var characterObj = c.obj;

		// Add x & y coordinate for sequential display
		var charX = 100 + 119*(i%10);
		var charY = 150 + 16*(i);
		characterObj["charX"] = new SoftFloat(charX);
		characterObj["charY"] = new SoftFloat(charY);
		characterObj["originalX"] = charX;
		characterObj["originalY"] = charY;

		// Add dynamic size
		characterObj["size"] = new SoftFloat(80);

		return characterObj;
	});

	// Prepare characters sorted by lesson
	// Add unit headers
	for (var i = charactersRaw.length-1; i >= 0; i-= 24) { // 24 characters per unit
		var unitHeader = { "obj": {
			"Unit": charactersRaw[i].obj["Unit"],
			"Character": charactersRaw[i].obj["Unit"],
			"isHeader": true 
		}};
		charactersRaw.splice(i-23, 0, unitHeader);
	}
	characters = charactersRaw.map(function(c, i) {
		var characterObj = c.obj;

		// Add x & y coordinate for sequential display
		var charX = 100 + 119*(i%10);
		var charY = 150 + 16*(i);
		characterObj["charX"] = new SoftFloat(charX);
		characterObj["charY"] = new SoftFloat(charY);
		characterObj["originalX"] = charX;
		characterObj["originalY"] = charY;

		// Add dynamic size
		characterObj["size"] = new SoftFloat(80);

		return characterObj;
	});

}


function draw() {
	background('#202020');

	noStroke();
	// Only draw characters in view window.
	minIndex = Math.abs(parseInt(y / 16));
	if (viewLesson) {
		maxIndex = min(minIndex + wordsToDisplay, characters.length);
		for (var i = minIndex; i < maxIndex; i++) {
			characters[i]["charX"].update();
			characters[i]["charY"].update();
			characters[i]["size"].update();

			var charX = characters[i]["charX"].value + x;
			var charY = characters[i]["charY"].value + y;
			drawCharacter(characters[i], charX, charY);

		}
	} else {
		maxIndex = min(minIndex + wordsToDisplay, charactersTopic.length);
		for (var i = minIndex; i < maxIndex; i++) {
			charactersTopic[i]["charX"].update();
			charactersTopic[i]["charY"].update();
			charactersTopic[i]["size"].update();

			var charX = charactersTopic[i]["charX"].value + x;
			var charY = charactersTopic[i]["charY"].value + y;
			drawCharacter(charactersTopic[i], charX, charY);

		}
	}
	

	// Draw navbar
	textAlign(CENTER, CENTER);
	fill('#181818')
	rect(0, 0, width, 80);

	fill(255,255,255);
	textFont("Helvetica");
	textSize(24);
	textStyle(NORMAL);
	text('汉字', 63, 42);
	textFont(latoL);
	textSize(22);
	text(' |    hanzi', 136, 37);


	// More info
	fill(255,255,255);
	textSize(18);
	textAlign(CENTER);
	text('what is this?', 450, 38);
	stroke(255);
	line(400, 50, 500, 50);
	noStroke();

	// View selector
	fill(255,255,255);
	textSize(18);
	text('View by:', 730, 37);
	if (viewLesson) {
		fill('#404040');
		rect(771, 0, 59, 80);
		fill(255,255,255);
	}
	text('lesson', 800, 37);
	if (!viewLesson) {
		fill('#404040');
		rect(835, 0, 51, 80);
		fill(255,255,255);
	}
	text('topic', 860, 37);

	text('hiram moncivais', 1180, 38);


	if (!canScroll) {
		fill(255,255,255);
		textAlign(CENTER, CENTER);
		textFont("Helvetica");
		textStyle(NORMAL);
		textSize(200);
		text(focusCharacter["Character"], focusCharacter["charX"].value, focusCharacter["charY"].value + y); // character

		// lesson
		textFont(latoL);
		textAlign(LEFT, CENTER);
		textSize(24);
		text("Lesson:", 700, 210);
		textFont("Helvetica");
		textSize(24);
		textStyle(NORMAL);
		text(focusCharacter["Unit"], 786, 214);

		// definition
		textFont(latoL);
		text("Definition:", 700, 280);
		textFont("Helvetica");
		text(focusCharacter["Definition"], 818, 284);

		// pronunciation
		textFont(latoL);
		text("Pronunciation:", 700, 350);
		textFont("Helvetica");
		text(focusCharacter["Pinyin"], 860, 354);

		// radical
		textFont(latoL);
		text("Radical:", 700, 420);
		textFont("Helvetica");
		text(focusCharacter["Radical"] || focusCharacter["Character"], 788, 424);

		// topic
		textFont(latoL);
		var charTopic = focusCharacter["Topic"];
		text("Topic:", 700, 490); // topic
		textFont("Helvetica");
		text(charTopic, 770, 494);

		if (viewLesson) {
			fill(unitColors[focusCharacter["Unit"]]);
		} else {
			fill(topicColors[focusCharacter["Topic"]]);
		}
		
		rect(70, 600, 200, 50);
		fill("#202020");
		rect(72, 602, 196, 46);
		fill("#ffffff");
		text("Go back", 120, 625)
	}

	// Show info
	if (showInfo) {
		rectMode(CENTER);
		fill('rgba(0,0,0,0.6)');
		rect(windowWidth/2, windowHeight/2, windowWidth, windowHeight);
		fill('#202020');
		rect(windowWidth/2, windowHeight/2, 510, 510);
		fill('#252525');
		rect(windowWidth/2, windowHeight/2, 500, 500);

		fill(255,255,255);
		textFont("Helvetica");
		textSize(24);
		textStyle(NORMAL);
		text('汉字', 480, 165);

		textFont(latoL);
		rectMode(CORNER);
		textAlign(LEFT);
		textSize(18);
		textLeading(30);
		text("hanzi is a Chinese character exploration tool, based on the first 500 characters learned in MIT's Chinese 1-4 classes.", 455, 140, 380, 200);
		text('Characters are composed of "sub-characters" known as radicals, and they usually have a main radical that defines its pronunciation or meaning - while also serving as a learning tool.', 455, 265, 380, 200);
		text("Click on a character to learn more about it or click the top to sort the characters by the lesson they were covered in or their topic. ", 455, 395, 380, 200);
		textAlign(CENTER);
	}
}

function mouseClicked() {
	// info box is active
	if (showInfo) {
		if (mouseX > windowWidth/2+250 || mouseX < windowWidth/2-250 ||
			mouseY > windowHeight/2+250 || mouseY < windowHeight/2-250) {
			showInfo = false;
		}
	}

	// check if clicked on more info
	else if (mouseX > 400 && mouseX < 505 && mouseY > 26 && mouseY < 58) {
		showInfo = true;
	}

	// check if clicked on View by lesson
	else if (mouseX > 771 && mouseX < 830 && mouseY > 0 && mouseY < 80 && !viewLesson) {
		viewLesson = true;
		y = max(-7936, y); // reset view in case user scrolled farther in topic view.
		resetView();
	}

	// check if clicked on View by topic
	else if (mouseX > 835 && mouseX < 886 && mouseY > 0 && mouseY < 80 && viewLesson) {
		viewLesson = false;
		resetView();
	}

	// check if clicked on name
	else if (mouseX > 1115 && mouseX < 1250 && mouseY > 0 && mouseY < 80) {
		window.open(".","_blank")
	}

	// check if clicked on a character
	else if (canScroll && !showInfo) {
		for (var i = minIndex; i < maxIndex; i++) {
			var charX = x + 100 + 119*(i%10);
			var charY = y + 150 + 16*(i);
			if (mouseX > charX - 40 && mouseX < charX + 40 &&
				mouseY > charY - 40 && mouseY < charY + 40) {
				if (viewLesson && !characters[i]["isHeader"])
					highlightCharacter(i);
				if (!viewLesson && !charactersTopic[i]["isHeader"])
					highlightCharacter(i);
			}
		}
	} else {
		if (mouseX > 70 && mouseX < 270 && mouseY > 600 && mouseY < 650) {
			resetView();
		}
	}
}

function resetView() {
	if (viewLesson) {
		for (var i = 0; i < characters.length; i++) {
			characters[i]["charX"].setTarget(characters[i]["originalX"]);
			characters[i]["charY"].setTarget(characters[i]["originalY"]);
			characters[i]["size"].setTarget(80);
		}

		for (var i = 0; i < charactersTopic.length; i++) {
			charactersTopic[i]["charX"].set(charactersTopic[i]["originalX"]);
			charactersTopic[i]["charY"].set(charactersTopic[i]["originalY"]);
			charactersTopic[i]["size"].set(80);
		}

	} else {
		for (var i = 0; i < characters.length; i++) {
			characters[i]["charX"].set(characters[i]["originalX"]);
			characters[i]["charY"].set(characters[i]["originalY"]);
			characters[i]["size"].set(80);
		}

		for (var i = 0; i < charactersTopic.length; i++) {
			charactersTopic[i]["charX"].setTarget(charactersTopic[i]["originalX"]);
			charactersTopic[i]["charY"].setTarget(charactersTopic[i]["originalY"]);
			charactersTopic[i]["size"].setTarget(80);
		}
	}
	canScroll = true;
	
}

function highlightCharacter(i) {
	focusIndex = i;

	if (viewLesson) {
		characters[i]["charX"].set(windowWidth / 2 - x - 200);
		characters[i]["charY"].set(windowHeight / 2 - y);
		characters[i]["size"].set(400);

		for (var ii = 0; ii < characters.length; ii++) {
			if (ii != i) {
				characters[ii]["charX"].set((windowWidth+200) * random([-0.5,1]) - x);
				characters[ii]["charY"].set((windowHeight+200) * random([-0.5,1]) - y);
				characters[ii]["size"].set(80);
			}
		}
		focusCharacter = characters[i];
	} else {
		charactersTopic[i]["charX"].setTarget(windowWidth / 2 - x - 200);
		charactersTopic[i]["charY"].setTarget(windowHeight / 2 - y);
		charactersTopic[i]["size"].setTarget(400);

		for (var ii = 0; ii < charactersTopic.length; ii++) {
			if (ii != i) {
				charactersTopic[ii]["charX"].set((windowWidth+200) * random([-0.5,1]) - x);
				charactersTopic[ii]["charY"].set((windowHeight+200) * random([-0.5,1]) - y);
				charactersTopic[ii]["size"].set(80);
			}
		}
		focusCharacter = charactersTopic[i];
	}

	canScroll = false;
	
}

var drawCharacter = function(character, charX, charY) {
	var charSize = character["size"].value;

	var charColor;
	if (viewLesson) {
		charColor = unitColors[character["Unit"]]
	} else {
		charColor = topicColors[character["Topic"]]
	}

	fill(charColor);

	ellipse(charX, charY, charSize);
	if (!character["isHeader"]) {
		fill('#202020');
		ellipse(charX, charY, charSize - 8);
	} else {
		fill('#202020');
		ellipse(charX, charY, charSize - 8);
		fill(charColor);
		ellipse(charX, charY, charSize - 18);
		fill('#202020');
		ellipse(charX, charY, charSize - 26);
	}


	// exploration view
	if (canScroll) {
		// draw character
		fill(255,255,255);
		textFont("Helvetica");
		textStyle(NORMAL);
		textSize(24); //24
		text(character["Character"], charX, charY);
		// write definition
		if (!character["isHeader"]) {
			textFont(latoL);
			textSize(14);
			text(character["Definition"], charX, charY+50);
		}
		
	}
}

function keyPressed() {
	// back or esc (with info box)
	if (showInfo && (keyCode == 8 || keyCode == 27)) {
		showInfo = false;
	}

	// back or esc (without info box)
	else if (keyCode == 8 || keyCode == 27) { 
		resetView();
	} 

	// right arrow: next character
	else if (keyCode == 39 && !canScroll && focusIndex < characters.length-1) {
		if (focusIndex + 2 > maxIndex)
			y -= 16;
		if ((characters[focusIndex+1]["isHeader"] && viewLesson) || 
			(charactersTopic[focusIndex+1]["isHeader"] && !viewLesson)) {
			highlightCharacter(focusIndex + 2);
		} else {
			highlightCharacter(focusIndex + 1);
		}
	} 

	// left arrow: previous character
	else if (keyCode == 37 && !canScroll && focusIndex > 0) { 
		if (focusIndex -1 < minIndex)
			y += 16;
		if (focusIndex > 1) {
			if ((characters[focusIndex-1]["isHeader"] && viewLesson) ||
				(charactersTopic[focusIndex-1]["isHeader"] && !viewLesson)) {
				y += 16;
				highlightCharacter(focusIndex - 2);
			} else {
				highlightCharacter(focusIndex - 1);
			}
		}

	} 
}

var mouseWheelEvent = function (event) {
	if (canScroll) {
		y -= event.deltaY;
		y = min(0, y);
		if (viewLesson) {
			y = max(-7936, y);
		} else {
			y = max(-8272, y);
		}
		return false;
	}
}

window.onload = function() {
	document.body.addEventListener("mousewheel", mouseWheelEvent);	
}