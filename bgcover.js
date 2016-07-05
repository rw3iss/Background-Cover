/* Background-Cover
 * fills the contained media to its parents height and width, 
 * using CSS for basic video centering and sizing, but a bit of JS to make 
 * the media wider if the oarent container is too tall. This works in any 
 * container because it uses a parent container's percentage and doesn't 
 * rely on a static 100vh viewport height/width thing, which has to find 
 * the (possibly) dynamic size of a parent.
 * Author: Ryan Weiss <rw3iss@gmail.com> 
 */

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

	console.log("bgcover", el)
	
	var self = this;
	// on init and resize:
	// get size of $(this), and make its inner container's width one that will cover parent's height
	//todo: check if jquery element, retrieve basic html element. assuming html element for now.
	self.el = el;
	self.containerWidth = el.offsetWidth;
	self.containerHeight = el.offsetHeight;
	self.innerChild = el.children[0]; // assumed to be div, iframe, or video element
	self.innerChild.className += 'content';


	el.innerHTML = '<div class="wrapper">' + el.innerHTML + '</div>';
	self.wrapper = el.getElementsByClassName('wrapper')[0];

	self.resizeSelf = function() {
	  // these are the dimensions we're trying to cover
	  self.containerWidth = self.el.offsetWidth;
	  self.containerHeight = self.el.offsetHeight;

	  // make sure the width fits first
	  if(self.innerChild.offsetWidth < self.containerWidth) {
	    self.wrapper.style.width = self.containerWidth + 'px';
	  }

	  // if height of container is smaller than the defined aspect ratio, 
	  // resize the width so the height covers, and then recenter:
	  if(self.innerChild.offsetHeight < self.containerHeight) {
	    self.wrapper.style.height = self.containerHeight + 'px';

	    // find new width
	    var w = (self.containerHeight / 9) * 16;
	    self.wrapper.style.width = w + 'px';

	    // recenter
	    var translateX = (w - self.containerWidth) / 2;
	    var translateY = (self.innerChild.offsetHeight - self.containerHeight) / 2;
	    self.innerChild.style.left = '-' + translateX + 'px';


	    //self.innerChild.style.top = '-' + translateY + 'px';

	    console.log("Y", translateY);
	  }

	  return self;
	}

	// these may already have fired, but just in case
	addEvent(window, 'onload', this.resizeSelf);
	addEvent(window, 'ondomcontentready', this.resizeSelf);
	addEvent(window, 'resize', this.resizeSelf);

	return self.resizeSelf();
}