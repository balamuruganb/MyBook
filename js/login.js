"use strict";

function login() {

	var userName = document.myForm.userName;
	var password = document.myForm.password;

	// Credentials availability validation
	if (userName.value == "") {
     alert( "Please Enter your name!" );
     userName.focus() ;
     return false;
   }
   if (password.value == "") {
     alert( "Please Enter your Password!" );
     password.focus() ;
     return false;
   }

	// Credentials Length validation
   if (userName.value.length > 8) {
     alert( "Invalid UserName, not allowed more than 8 characters" );
	 userName.focus() ;
	 return false;
   }
   
   if (password.value.length > 6) {
     alert( "Invalid Password, not allowed more than 6 characters" );
	 password.focus() ;
	 return false;
   }

	if (userName.value == "bala" && password.value == "bala") {
		return true;
	} else {
	    alert( "Invalid UserName/Password" );
		userName.focus() ;
		password.value = "";
	}
	return false;
}
