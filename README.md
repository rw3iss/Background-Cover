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
