
$(document).ready(function(){
	$('#searchButton').click(function() {

		//console.log("This search string:" , $('#searchString').val());
		searchWiki();

	});
	
	$('#searchString').keypress(function (e) {
		if(e.which == 13)
		{

			//console.log("This search string:" , $('#searchString').val());
			searchWiki();
			return false;
		}
	});
	
	
	$( document ).ajaxError(function( event, request, settings ) {
		console.log("Error requesting page " + settings.url );
	});	
}); 

function searchWiki()
{
	$.ajax({
		type: "GET",
		url: 'https://en.wikipedia.org/w/api.php',
		data: 
		{
			"action": "query",
			"format": "json",
			"list": "search",
			"continue": "",
			"srsearch": $('#searchString').val(),
			"srwhat": "text",
			"srprop": "snippet"
		},
		dataType: 'jsonp',
		complete: function(){
			console.log("Complete: ", this.url);				 
		},
		success: processResult
	});	
}


function processResult(apiResult)
{
	$('#outerbox').empty();
	//console.log("This is the result ", apiResult);
	for (var i = 0; i < apiResult.query.search.length; i++)
	{
		$('#outerbox').append('<div class="externalWiki" onclick="getWiki(' + apiResult.query.search[i].pageid + ')"><span class="h3 text-right spacer"><i class="fa fa-external-link-square" aria-hidden="true"></i></span><h3>'+apiResult.query.search[i].title + ' </h3></br>' +apiResult.query.search[i].snippet +  '</div>');
	}
	window.scrollTo(0, 0);
} 


function getWiki(pageID) 
{
	//console.log("Div #", pageID, " clicked");
	var linkAddress="http://en.wikipedia.org/?curid=" + pageID;
	window.open(linkAddress,"_blank");
}