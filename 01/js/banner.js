function Banner(){
	
	var keyword = "COOL!";
	var canvas;
	var context;
	
	var bgCanvas;
	var bgContext;
	
	var denseness = 10;
	
	//Each particle/icon
	var parts = [];
	var colours = ['#F53D00', '#7094FF', '#FFD83D']
	
	var mouse = {x:-100,y:-100};
	var mouseOnScreen = false;
	
	this.initialize = function(canvas_id){
		canvas = document.getElementById(canvas_id);
		context = canvas.getContext('2d');
		
		canvas.width = window.innerWidth;
		canvas.height = 360;
		
		bgCanvas = document.createElement('canvas');
		bgContext = bgCanvas.getContext('2d');
		
		bgCanvas.width = window.innerWidth;
		bgCanvas.height = 360;
	
		canvas.addEventListener('mousemove', MouseMove, false);
		canvas.addEventListener('mouseout', MouseOut, false);
			
		test();
	}
	
	var test = function(){
			
		bgContext.fillStyle = "#123321";
		bgContext.font = '300px impact';
		bgContext.fillText(keyword, (canvas.width/2 - 400), 300);
		
		clear();	
		getCoords();
	}
	
	var getCoords = function(){
		var imageData, pixel, height, width;
		
		imageData = bgContext.getImageData(0, 0, canvas.width, canvas.height);
		
		// quickly iterate over all pixels - leaving density gaps
	    for(height = 0; height < bgCanvas.height; height += denseness){
            for(width = 0; width < bgCanvas.width; width += denseness){   
               pixel = imageData.data[((width + (height * bgCanvas.width)) * 4) - 1];
                  //Pixel is black from being drawn on. 
                  if(pixel == 255) {
                    drawCircle(width, height);
                  }
            }
        }    
        setInterval( update, 40 );
	}
	
	var drawCircle = function(x, y){
		parts.push(
			{c: colours[Math.floor(Math.random() * colours.length)],
			 x: x,
			 y: y,
			 x2: x,
			 y2: y,
			 r: false, //Released (to fly free!)
			 v:{x:(Math.random() * 6) * 2 - 6 , y:(Math.random() * 6) * 2 - 6},
			}
		)
	}
	
	var update = function(){
		var i, dx, dy, sqrDist, scale;
		
		clear();
		for (i = 0; i < parts.length; i++){
			
			//Look into using svg, so there is no mouse tracking.
			//Find distance from mouse/draw!
			dx = parts[i].x - mouse.x;
	        dy = parts[i].y - mouse.y;
	        sqrDist =  Math.sqrt(dx*dx + dy*dy);
			scale = Math.max( Math.min( 6 - ( sqrDist / 10 ), 10 ), 1 );			

			//Draw the circle
			context.fillStyle = parts[i].c;
			context.beginPath();
			context.arc(parts[i].x, parts[i].y, 4 * scale ,0 , Math.PI*2, true);
			context.closePath();
	    	context.fill();	
				
		}	
	}
	
	var MouseMove = function(e) {
	    if (e.layerX || e.layerX == 0) {
	    	//Reset particle positions
	    	mouseOnScreen = true;    	
	        mouse.x = e.layerX - canvas.offsetLeft;
	        mouse.y = e.layerY - canvas.offsetTop;
	    }
	}
	
	var MouseOut = function(e) {
		mouseOnScreen = false;
		mouse.x = -100;
		mouse.y = -100;
		
	}
	
	//Clear the on screen canvas
	var clear = function(){
		context.fillStyle = '#333';
		context.beginPath();
  		context.rect(0, 0, canvas.width, canvas.height);
 		context.closePath();
 		context.fill();
	}
}
