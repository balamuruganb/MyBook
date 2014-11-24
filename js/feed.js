"use strict"

function Feed (id, type, date) {
	this.id = id;
	this.type = type;
	this.date = date;
}

Feed.prototype = {
	getId : function() {
		return this.id;
	}, 
	getType : function() {
		return this.type;
	},
	getDate : function() {
		return this.date;
	}
}

function URLFeed (url) {
	this.url = url;
	this.type = "URL";
	this.date = new Date();
}

function TextFeed (text) {
	this.text = text;
	this.type = "TEXT";	
	this.date = new Date();
}

URLFeed.prototype = {
	getFeed : function() {
		return this.text;
	}
}


TextFeed.prototype = {
	getFeed : function() {
		return this.url;
	}
}

URLFeed.prototype = Object.create(Feed.prototype);
TextFeed.prototype = Object.create(Feed.prototype);

var feedService = (function() {

    var feeds = [];
	
	return {
	  insertFeed : function(feed) {
		feeds.push(feed);
	  	feed.id = "feeds" + feedService.length; 
		renderFeed(feeds);
	  }, 
	  deleteFeed : function(feedId) {
	     for (var i = 0, length = feeds.length; i < length; i++) {
			feeds.slice(i, 1);
		 }
		renderFeed(feeds);
	  }
	}
})();


function createFeed() {

  var feedValue = document.getElementById("postFeed");
  if (feedValue.value == "") {
	alert("Invalid Data. Please provide valid info");
	return;
  }
  
  var feed = undefined;
  if (feedValue.value.indexOf("http") == 0) {
	feed = new URLFeed(feedValue.value);
  } else {
	feed = new TextFeed(feedValue.value);
  }
  feedService.insertFeed(feed);
}

function renderFeed(feeds) {
	var id = "feeds";
	document.getElementById(id).innerHTML = "";
	for (var i = 0; i < feeds.length; i++) {
	
	  if (feeds[i].getType() == "TEXT") {
	  	document.getElementById(id).innerHTML += "<div id=\"feed" + i + "\">\n<p>" + feeds[i].text + "</p>" + "</div>";
	  } else {
	  	document.getElementById(id).innerHTML += "<div id=\"feed" + i + "\">\n<p>" + feeds[i].url + "</p>" + "</div>";
	  }
	  id = "feed" + i;
	  feeds[i].id = id;
	}
}

