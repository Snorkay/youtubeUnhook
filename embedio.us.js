// ==UserScript==
// @names	Embedio.us
// @namespace	Snork
// @description Replace embedded youtube frames with invidio.us frames. Additionally redirect youtube URLS to invidio.us.
// @include	*
// @version	0.2
// ==/UserScript==


//Autoplay Configs
var autoplayLoad = 0;	//Default 0 - Set to 1 to enable autoplay on page load

//URL Replacement
var url = window.location.toString();

function replacer(yturl){
	window.location = url.replace(yturl, 'invidio.us');
}

if (url.indexOf('www.youtube.com') !== -1){
	replacer(/youtube.com/);
} else if (url.indexOf('www.youtu.be') !== -1){
	replacer(/youtu.be/);
}

//iFrame Replacement
var watcher = new MutationObserver(interaction);
watcher.observe(document,{childList:true,attributes:true,subtree:true});

function interaction(){
	auto(autoplayLoad);
}

function auto(autoplay){
	var filter = Array.filter || Benchmark.filter;
	var frames = document.getElementsByTagName("iframe");
	frames = filter(frames, ytiFrames);

	for(var i=0; i<frames.length; i++){
		var frame = frames[i];
		var src = frame.getAttribute('src');
		var ht = src.replace('youtube.com', 'invidio.us');
		if(ht.indexOf('?') === -1){
			ht += '?autoplay=' + autoplay;
		} else{
			ht += '&autoplay=' + autoplay;
		}
		frame.setAttribute('src', ht);
	}
}

function ytiFrames(el){
	if(el.hasAttribute('src')){
		return el.getAttribute('src').indexOf('youtube') !== -1;
	}
	return false;
}





