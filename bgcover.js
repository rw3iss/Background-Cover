/* Background-Cover
 * fills the contained media to its parents height and width, 
 * using CSS for basic video centering and sizing, but a bit of JS to make 
 * the media wider if the oarent container is too tall. This works in any 
 * container because it uses a parent container's percentage and doesn't 
 * rely on a static 100vh viewport height/width thing, which has to find 
 * the (possibly) dynamic size of a parent.
 * Author: Ryan Weiss <rw3iss@gmail.com> 
 */

var RATIO_A = 16;
var RATIO_B = 9;

var addEvent = function(object, type, callback) {
  if (object == null || typeof(object) == 'undefined') return;
  if (object.addEventListener) {
      object.addEventListener(type, callback, false);
  } else if (object.attachEvent) {
      object.attachEvent("on" + type, callback);
  } else {
      object["on"+type] = callback;
  }
};

function BackgroundCover(el) {
	var self = this;

	console.log("BG", el);

	// on init and resize:
	// get size of $(this), and make its inner container's width one that will cover parent's height
	//todo: check if jquery element, retrieve basic html element. assuming html element for now.
	self.el = el;
	self.containerWidth = el.offsetWidth;
	self.containerHeight = el.offsetHeight;
	self.content = el.children[0]; // assumed to be div, iframe, or video element
	self.content.className += 'content';

	el.innerHTML = '<div class="wrapper">' + el.innerHTML + '</div>';
	self.wrapper = el.getElementsByClassName('wrapper')[0];

	console.log('wrapper', self.wrapper);

	self.resizeSelf = function() {
	  // these are the dimensions we're trying to cover
	  self.containerWidth = self.el.offsetWidth;
	  self.containerHeight = self.el.offsetHeight;

	  // make sure the width fits first
	  if(self.wrapper.offsetWidth < self.containerWidth) {
	    self.wrapper.style.width = self.containerWidth + 'px';
	  }

	  // make sure content fills height:
	  if(self.wrapper.offsetHeight < self.containerHeight) {
	    self.wrapper.style.height = self.containerHeight + 'px';

	    // find new width
	    var w = (self.containerHeight / RATIO_B) * RATIO_A;
	    self.wrapper.style.width = w + 'px';

	    // recenter
	    var translateX = (w - self.containerWidth) / 2;
	    var translateY = (self.content.offsetHeight - self.containerHeight) / 2;
	    self.content.style.left = '-' + translateX + 'px';
	  }

    // check aspect ratio
    var ratio = self.wrapper.offsetWidth / self.wrapper.offsetHeight;
    if(ratio != RATIO_A/RATIO_B) {
    	console.log("Ratio", ratio, RATIO_A/RATIO_B);
    	//aspect ratio off, so calculate and change width to fit into height of container
    	var w = (self.containerHeight / RATIO_B) * RATIO_A;
    	console.log("new width", self.containerHeight, w);
    	self.wrapper.style.width = w + 'px';
    }			

	  return self;
	}

	// these may already have fired, but just in case
	addEvent(window, 'onload', self.resizeSelf);
	addEvent(window, 'ondomcontentready', self.resizeSelf);
	addEvent(window, 'resize', self.resizeSelf);

	return self.resizeSelf();
}