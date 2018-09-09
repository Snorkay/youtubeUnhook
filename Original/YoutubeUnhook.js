// ==UserScript==
// @name        Youtube embed to Hook
// @namespace   Snork
// @description Replaces youtube requests with hooktube requests. For both embbeded and url links. 
// @include     *
// @version     0.1
// ==/UserScript==
 
//var autoplayLoad = 1; //set to 1 to autoplay embedded videos present on initial page load 
var autoplayEvent = 0; //set to 0 to not autoplay embedded videos that appear on page interaction
 
var observer = new MutationObserver(mutate);
observer.observe(document,{childList:true,attributes:true,subtree:true});
 
function mutate(){
  go(autoplayEvent);
}
 
function go(auto){
  var filter = Array.filter || Benchmark.filter;  
  var frames = document.getElementsByTagName("iframe");
  frames = filter(frames, youtubeiFrame);
 
  for(var i=0; i<frames.length; i++){
    var frame = frames[i];
    var src = frame.getAttribute('src');
    var hookTube = src.replace('youtube', 'hooktube');
    if(hookTube.indexOf('?') === -1){
      hookTube += '?autoplay=' + auto;
    }else{
      hookTube += '&autoplay=' + auto;
    }
    frame.setAttribute('src', hookTube);
  }
}
 
function youtubeiFrame(el) {
  if(el.hasAttribute('src')){
    return el.getAttribute('src').indexOf('youtube') !== -1;
  }
  return false;
}

//URL Replacement 
var url = window.location.toString();

function replacer(youtubeurl){
	window.location = url.replace(youtubeurl, 'hooktube.com');
}
if (url.indexOf('www.youtube.com') !== - 1) {
	replacer(/youtube.com/);
} else if (url.indexOf('www.youtu.be') !== - 1) {
	replacer(/youtu.be/);
}

