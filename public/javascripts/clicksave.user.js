// ==UserScript==
// @name          clicksave
// @namespace     http://userscripts.org/users/pierr
// @description   click the words and it will be saved
// @copyright     pierr chen
// @contributor   pierr chen
// @include       http://*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version       0.0.5
// ==/UserScript==


function debug (msg)
{
	alert(msg)
}


function getSelText()
{
    var txt = '';
     if (window.getSelection)
    {
        txt = window.getSelection();
             }
    else if (document.getSelection)
    {
        txt = document.getSelection();
            }
    else if (document.selection)
    {
        txt = document.selection.createRange().text;
            }
    else return;

	return txt
}

function containsOnlyLetters(checkString) {
        var tempString="";
        var pattern = /^[A-Za-z]$/;
        if(checkString != null && checkString != "")
        {
          for(var i = 0; i < checkString.length; i++)
          {
			debug(checkString.charAt(i)); 
            //equals each_char is ruby1.9 , not each_byte
			if (!checkString.charAt(i).match(pattern))
            {
              return false;
            }
          }
        }
        else
        {
          return false;
        }
        return true;
}
function saveSelText()
{

    //getSelText returns an DOM string instead of java script string
	var selText = getSelText().toString();
	//validate the select should only contains a-zA-Z
	if ( !containsOnlyLetters(selText))
	{
		debug("non-english selected ->" + selText);
		return;
	}
	
	if ((selText.length > 20) || (selText.length < 3) )
	{
		debug('unreasonable length ->' + selText.length);
		return;
	}
	
	if (selText != "")
	{
	 	//var url = "http://localhost:3000/auto_create?content="+getSelText();
	 	var domain = "http://jdc.heroku.com"
	 	//var domain = "http://localhost:3000"
		var url = domain + "/auto_create";
       	
		//this will generate a 1002 error due to cross domain
		//$.get(url,{},false);
		$.ajax({
		type: 'GET',
		url:	url, 
		data: { 'content': selText},
		dataType: 'jsonp',
		jsonp:'jsonp_callback',
		success: function(data) {
			alert(data);
		},
	});
	}
}

$(document).ready(function(){
	$(document).mouseup(function(){
		//alert('Handler for .mouseup called.');
		saveSelText()
	})

})
