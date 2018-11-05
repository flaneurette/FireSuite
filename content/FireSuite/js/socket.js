// Socket
//--------------------------------------------------------------------------------------
var socket = {
			
		readsocket: function (host, port, outputData, listener, sockettype) {
			
				var transportService = globals.classes('network/socket-transport-service;1').getService(Components.interfaces.nsISocketTransportService);
				var transport = transportService.createTransport(sockettype, 0, host, port, null);
				var outstream = transport.openOutputStream(0, 0, 0);
				outstream.write(outputData, outputData.length);
				var stream = transport.openInputStream(0, 0, 0);
				var instream = globals.classes('scriptableinputstream;1').createInstance(Components.interfaces.nsIScriptableInputStream);
				instream.init(stream);
				
				var dataListener = {
					data: "",
					onStartRequest: function (request, context) {},
					onStopRequest: function (request, context, status) {
						instream.close();
						outstream.close();
						return listener.finished(this.data);
					},
					onDataAvailable: function (request, context, inputStream, offset, count) {
						this.data += instream.read(count);
					},
				};
				var pump = globals.classes('network/input-stream-pump;1').createInstance(Components.interfaces.nsIInputStreamPump);
				pump.init(stream, -1, -1, 0, 0, false);
				pump.asyncRead(dataListener, null);
				return;
			},
			
			connect: function (uri, port, header, treelist, treeid) {
	
				var sockettype = gui.get("socketmethod");
				if (!sockettype) {
					sockettype = "starttls";
				}
				
				var listener = {
					
					finished: function (packet) {
							var portstate = '';
							var packtset = '';
			
							if (packet) {
								packet.split("\r\n");
								packetset = packet[8] + packet[9] + packet[10] + packet[11];
								portstate = 'Open';
							} else {
								portstate = 'Closed';
								packetset = '-';
							}
							if (treelist == true) {
								if (portstate) {
									gui.tree(treeid, [port, portstate, sockettype, packetset, PORTS[port].i], 1);
									return true;
								} else {}
							} else {
								return gui.append('httpresult', "\r\n" + port + "/tcp     " + portstate);
							}
					}
				};
				this.readsocket(uri, port, header, listener, sockettype);
	}
};