//homebaner
var homebanner = {
    activate: () => {
	$("ul.homenavbar li span:not(.active)").addClass("home-item");
	for (let l of links.keys()) {
	    $("."+l+".home-item").click(() => {
		location.href=links.get(l);
	    });
	}
    },
};

var links = new Map([
    ["raseliarison", "https://raseliarison.mg"],
    ["nirina", "/"], //'https://nirina.raseliarison.mg'],
    ["adrien", "https://raseliarison.mg/adrien"],
    ["blog", "https://raseliarison.mg/blog"], //'https://raseliarison.blogspot.com/
    ["artisanat", "https://raseliarison.mg/artisanat"],
    ["code", "https://raseliarison.mg/code"], //'https://github.com/nirinA'],
    ["FAQ", "https://raseliarison.mg/faq"], //"http://raseliarison.chez.com/FAQ.html"
]);

// footer
var footerbox = {
    lastUpdate: () => {
        let foot = $("<div>");
        foot.appendTo($("footer"));
	//foot.insertAfter('#maindisplay');
	let date = new Date();
	foot.attr({'id': 'lastUpdate'});
	foot.html("last update: "+date.toDateString());
    }
};

$( document ).ready( homebanner.activate );
/*
$( () => {
    homebanner.activate();
    footerbox.lastUpdate();
});


$( document ).ready( footer.lastUpdate);
*/
/*
$( () => {
    //footer
    $("<div></div>").insertAfter('#maindisplay').html('last update');
});
*/
