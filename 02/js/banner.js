function Banner(){
	
	var keyword = "FREAKY";
	var canvas;
	var context;
	
	var bgCanvas;
	var bgContext;
	
	var denseness = 10;
	
	//Each particle/icon
	var parts = [];
	
	var mouse = {x:0,y:0};
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
			{c: '#' + (Math.random() * 0x949494 + 0xaaaaaa | 0).toString(16),
			 x: x, //Original position
			 y: y, 
			 x2: x, //Movable position
			 y2: y,
			 v:{x:(Math.random() * 3) * 2 - 3 , y:(Math.random() * 3) * 2 - 3},
			}
		)
	}
	
	var update = function(){
		var i, dx, dy, sqrDist, scale;
		
		clear();
		for (i = 0; i < parts.length; i++){
			
			if (mouseOnScreen == true){
				
				parts[i].x2 += parts[i].v.x;
		        parts[i].y2 += parts[i].v.y;
		
		        if (parts[i].x2 > canvas.width || parts[i].x2 < 0) {
		            parts[i].v.x = -parts[i].v.x;
		        }
		
		        if (parts[i].y2 > canvas.height || parts[i].y2 < 0) {
		            parts[i].v.y = -parts[i].v.y;
		        }		
			} else {
				parts[i].x2 = parts[i].x;
				parts[i].y2 = parts[i].y;
			}
			
	
			//Look into using svg, so there is no mouse tracking.
			//Find distance from mouse/draw!
			dx = parts[i].x2 - mouse.x;
	        dy = parts[i].y2 - mouse.y;
	        sqrDist =  Math.sqrt(dx*dx + dy*dy);
			scale = Math.max( Math.min( 6 - ( sqrDist / 10 ), 10 ), 1 );
// 			
			//Draw the circle
			context.fillStyle = parts[i].c;
			context.beginPath();
			context.arc(parts[i].x2, parts[i].y2, 4 * scale ,0 , Math.PI*2, true);
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
