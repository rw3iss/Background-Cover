# Background-Cover
A small module which will allow a piece of background media (be it image, video, iframe), to cover the entire background. Even if the width is too small, it will resize the media to at least fit the height, so their is never any blank space around the media. Essentially this is background-size: cover for any arbitrary media or element.

**Usage:**

With jQuery:

      $(document).ready(function() {
        var bgs = $('.bg-cover');
        bgs.each(function() {
          new FullVid($(this)[0]));
        });
      });
    
Without jQuery:

    	window.onload = function() {
    		var bgs = document.getElementsByClassName('bg-cover');
    		for(var i = 0; i < bgs.length; i++) {
    			new BackgroundCover(bgs[i]);
    		}
    	}
    	
** How it Works **
* Wraps the content, and then modifies the dimensions of the wrapper, keeping its content centered through CSS. 
* After that, a small piece of javascript ensures the width and height cover the parent's dimensions, and otherwise resizes the wrapper to a size that will cover both dimensions, ensuring the wrapper remains centered relative to its parent. This resizing operation takes place on every window resize as well.
    	
**Roadmap:**
* add preloadable poster images for any content type. There will be two attributes: actual posted image (full-res), and a tiny thumbnail of it (which will render first with a CSS blur, fading in the full-res poster when it is downloaded).
* for images, add an attribute to default to background-size: cover for the image, which should take care of all cases naturally.
* integrate aspect ratio attribute. right now the standard aspect ratio is 16:9, but this may differ and the background fill operation will take this into account to maintain the ratio while covering the entire background.
