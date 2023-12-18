var bannerLinks = new Map([
    ["home", "/"],
    ["news", "/newspage"],
    ["wiki", "/wiki"],
    //["antisocial", "https://nirina.raseliarison.mg/ossn"],
    ["login", "/login"],
])

var navbanner = {
    activate: () => {
	$("ul.navbar li span:not(.noaction)").addClass("action");
	for (let l of bannerLinks.keys()) {
	    $("."+l+".action").click(() => {location.href=bannerLinks.get(l);});
	};
	$( "#menu" ).menu();
	/*
	$(".news").on('mouseover', () => {
	    //$("#fortune_text").html("yo");
	    $( ".dropdown-content" ).toggle()
	});
	$(".news").on('mouseout', () => {
	    $( ".dropdown-content" ).toggle()
	    });*/
	//navbanner.login();

    },
    login: () => {
	$(".login")
	    .html('&nbsp;login&nbsp;')
	    /*.css({'float':'right','color': 'red'})*/
	    /*.addClass('action')*/;
    }
    
};

$( document ).ready(navbanner.activate);
/*
$( () => {
    navbanner.activate();
});
*/
