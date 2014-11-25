"use strict"


document.getElementById("profile").style.display = 'none';

function showFeedOrProfile(id) {
	if (id == "profile") {
		document.getElementById("profile").style.display = 'block';
		document.getElementById("feed").style.display = 'none';
    } else {
		document.getElementById("profile").style.display = 'none';
		document.getElementById("feed").style.display = 'block';
	}
}


function Feed (id, date) {
	this.id = id;
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
	this.date = new Date();
}

function TextFeed (text) {
	this.text = text;
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

URLFeed.prototype  =  Object.create(Feed.prototype);
TextFeed.prototype = Object.create(Feed.prototype);

var feedService = (function() {

    var feeds = [];
	
	return {
	  insertFeed : function(feed) {
	  	feed.id = "feed" + feeds.length; 
		feeds.push(feed);
		renderFeed(feeds);
	  }, 
	  deleteFeed : function(feedId) {
	     for (var i = 0, length = feeds.length; i < length; i++) {
	     	if (feeds[i].getId() == feedId) {
				feeds.splice(i, 1);
				break;
			}
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
  if (feedValue.value.toUpperCase().indexOf("HTTP") == 0) {
	feed = new URLFeed(feedValue.value);
  } else {
	feed = new TextFeed(feedValue.value);
  }
  feedService.insertFeed(feed);
  feedValue.value = "";
}

function removeFeed(id) {
	
	feedService.deleteFeed(id);
}

function renderFeed(feeds) {
	
	var fragment = document.createDocumentFragment();
	document.getElementById("feeds").innerHTML = "";
	var innerHTML = "";
	for (var i = 0; i < feeds.length; i++) {

		feeds[i].id = "feed" + i;	  	
	  	innerHTML += "<div id=\"feed" + i +"\""  + " class=\"feed\">" +
	  				"<div class=\"feedinline userImage\">" +
	  				"\t<img src=\"../style/resources/user.jpg\" width=\"70px\">\n</div>" +
	  				"<div class=\"feedinline feedContent\">";
	
	  if (feeds[i] instanceof TextFeed) {
	  		innerHTML += "\t<p align=\"justify\">" + feeds[i].text + "</p>";

      } else if(feeds[i] instanceof URLFeed){
			innerHTML += "\t<a href=\"" + feeds[i].url + "\" target=\"_blank\">" + feeds[i].url + "</a>"
	  }
	  innerHTML += 	"\n</div><div class=\"feedinline feedDate\">" + getMyDateFormat(feeds[i].getDate()) + "</div>" +
	  				"<div class=\"feedinline feedDelete\">" +
	  				"<button class=\"feedButton\" id=\"feed" + i +"\"" + " type=\"button\" onClick=\"removeFeed(this.id)\">Delete</button>" +
	  				"</div>\n</div>\n";	 

	}
	document.getElementById("feeds").innerHTML = innerHTML;

}


function signout() {
	window.open ('../index.html','_self',false);
}

function profileFieldChanged() {
	
	var name = document.myForm.name.value;
	var age = document.myForm.age.value;
	var phone = document.myForm.phone.value;
	var email = document.myForm.email.value;

	if (name != "" && age !="" && phone !="" && email !="") {
		 document.getElementById("saveProfileButton").disabled = false;
	} else {
		 document.getElementById("saveProfileButton").disabled = true;
	}
}

function saveProfile() {
	var name = document.myForm.name.value;
	var age = document.myForm.age.value;
	var phone = document.myForm.phone.value;
	var email = document.myForm.email.value;

	if(name.length > 50) {
		alert("Invalid Name, Max 50 chars allowed");
	}  else if(isNaN(age) || (age <= 0 || age > 100)) {
		alert("Invalid Age, Max age is 100");
	} else if(isNaN(phone)) {
		alert("Invalid Phone Number, Numbers only allowed");
	} else if(!validateEmail(email)) {
		alert("Invalid Email");
	} else {
		alert("Profile save successfully.");
	}
}

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

function chooseImage(obj) {
	
	try {
		var fileReader  = new FileReader();
		var fileName    = obj.files[0];
		
		fileReader.onloadend = function () {
			document.getElementById("profileImage").src = fileReader.result;
		}
		
		if (fileName) {
			fileReader.readAsDataURL(fileName);
		} else {
			preview.src = "";
		}
	} catch(error) {
		alert(err.message);
	}
}


function getMyDateFormat(d) {
    var dt = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("/"),
        tm = [d.getHours(), d.getMinutes()].join(":");
    return dt + " " + tm;
}