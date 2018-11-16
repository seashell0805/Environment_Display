//Make a red rectangle to be the background
var canvasWidth = document.body.clientWidth;
var canvasHeight = document.body.clientHeight;
var width = canvasWidth/2;
var height = canvasHeight/2;
var recLeftTop = new Shape.Rectangle(0, 0, width, height);
var recLeftBottom = new Shape.Rectangle(0, 0+height, width,height);
var recRightTop = new Shape.Rectangle(0+width, 0, width,height);
var recRightBottom = new Shape.Rectangle(0+width, 0+height, width,height);

recRightTop.fillColor = 'red';
recLeftTop.fillColor = 'yellow';
recRightBottom.fillColor = 'green';
recLeftBottom.fillColor = 'blue';

//Get the io object from the main window to use to get serial data
var socket = window.io();

//Here's our lame visualization
var ball = new Shape.Circle(view.bounds.center, 20);
//ball.strokeColor = 'black';
ball.fillColor = 'black';


//Whenever we get the photon_data event, run a function
socket.on('photon_data', function(data)
	{
		//Log the data
		console.log(data);

		//Split the data on a comma, make a new Point (which can take an
		// array), and set the ball position to this data.
		var pair = data.split(',');
        ball.position = new Point(pair[1]/500*canvasWidth, canvasHeight-pair[0]/100*canvasHeight);
	}
);
