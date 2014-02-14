'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();

/*
	$(".project").click(function(e) {
	var projectID = $(this).closest('.project').attr('id');

	$.get("/project/projectID", addProjectDetails);
	})*/
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);

	$.get("/project/" + idNumber, loadResult);
	console.log("getting /project/" + idNumber);
}

function loadResult(e) {
	console.log(e);
	console.log("e id number = " + e['id']);
	var temp = "#project" + e['id'] + " .details"
	console.log(temp);

	var content = '<img src="' + e['image'] + '" class="detailsImage">' + 
			' <h3>' + e['date'] + '</h3>' + e['summary'];

	$(temp).html(content);

}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	//var colors = e['colors'];
	$.get("/palette", getColors);
}

function getColors(e) {
	console.log("in get colors method");
	var colors = e['hex'];
	console.log(colors[0]);
	
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}