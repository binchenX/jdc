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
// @version       0.0.4
// ==/UserScript==


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

function saveSelText()
{
	var selText = getSelText()
	console.log("seletct");
	if (selText != "")
	{
	 	//var url = "http://localhost:3000/auto_create?content="+getSelText();
	 	var url = "http://localhost:3000/auto_create";
         	//this will generate a 1002 error due to cross domain
		//$.get(url,{},false);
		$.ajax({
		type: 'GET',
		url:	url, 
		data: { 'content': getSelText()},
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
