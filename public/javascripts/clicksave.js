/**
 *
 *
 *save the selected words to the database
 *
 *copywrite pierr.chen@gmail.com
 *
 *
 */

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
	//debug only
	document.aform.selectedtext.value =  txt;
	return txt
}

function saveSelText()
{
	var selText = getSelText()
	if (selText != "")
	{
	 	var url = "http://localhost:3000/auto_create?content="+getSelText();
    	$.get(url,{},false);
	}
}

$(document).ready(function(){
	$(document).mouseup(function(){
		//alert('Handler for .mouseup called.');
		saveSelText()
	})

})
