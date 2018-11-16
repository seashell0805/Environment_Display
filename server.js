//Run this file with "node server.js"
var app        = require('express')();
var http       = require('http').Server(app);
var io         = require('socket.io')(http);
var SerialPort = require('serialport');
var exec       = require('child_process').exec;
var colors     = require('colors');

var serial;


//When a request comes into the server for / give the client the file index.html
app.get('/', function(req, res){res.sendFile(__dirname + '/index.html');});

//Get other files that are requested by name
app.get(/^(.+)$/, function(req, res){res.sendFile(__dirname + req.params[0])});

//Listen for incoming connections
http.listen(3000, function(){console.log("listening on port 3000");});

//Here's what happens when a connection is made from the browser

io.sockets.on('connection',
	function(socket)
	{
		console.log("someone connected");

		//Since the socket is open, we can now accept "to_serial" messages
		// from the browser
		socket.on('to_serial', function(data)
		{
			if(serial && serial.isOpen)
			{
				serial.write(data + '\n');
				console.log("Send '" + data + "' to serial");
			}
			else
				console.log("Serial port not open");
		});
	}
);



//Find out what serial port the Photon is connected to, open it up,
// and read from it. Every time we get a new line, send it to the
// browser.
exec('particle serial list',
	function(error, stdout, stderr)
	{
		var devName = stdout.split('\n')[1].split(' - ')[0];
		if(devName === "")
		{
			console.log("Couldn't find a Photon. Is it plugged in?".red);
			return;
		}
		console.log(colors.green("Detected Photon on " + devName));

		//Hook up the serial port, automatically split on newlines
		serial = new SerialPort(devName);
		var parser = serial.pipe(new SerialPort.parsers.Readline());

		//When we get data, send it to the browser
		parser.on('data', function(data)
		{
			//Uncomment this to see what is coming from the Photon
			console.log("got some data from Photon: ", data);

			//Send to the browser; 'photon_data' is the name of the event
			io.emit('photon_data', data);
		});
	}
);
