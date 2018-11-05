// Tracer
//--------------------------------------------------------------------------------------
var tracelistener = {
	observe: function (aSubject, aTopic, aData) {
		var httpChannel = aSubject.QueryInterface(Components.interfaces.nsIHttpChannel);
		if (aTopic == "http-on-modify-request") {

			if (httpChannel.requestMethod == "POST" && Init.method() == 'POST' || httpChannel.requestMethod == "POST" && Init.method() == 'ALL') {

				var uploadChannel = httpChannel.QueryInterface(Components.interfaces.nsIUploadChannel);
				var uploadChannelStream = uploadChannel.uploadStream;
				uploadChannelStream.QueryInterface(Components.interfaces.nsISeekableStream).seek(Components.interfaces.nsISeekableStream.NS_SEEK_SET, 0);
				var stream = globals.classes('binaryinputstream;1').createInstance(Components.interfaces.nsIBinaryInputStream);

				stream.setInputStream(uploadChannelStream);
				var postBytes = stream.readByteArray(stream.available());
				var poststr = String.fromCharCode.apply(null, postBytes);

				gui.append('tracer', httpChannel.getRequestHeader("Referer") + "  |query:|" + poststr.substr(0, 139), 1);

				var inputStream = globals.classes('io/string-input-stream;1').createInstance(Components.interfaces.nsIStringInputStream);

				inputStream.data = poststr;
				uploadChannel.setUploadStream(inputStream, "application/x-www-form-urlencoded", -1);
				// order important - setUploadStream resets to PUT
				httpChannel.requestMethod = "POST";

			} else if (httpChannel.requestMethod == "GET" && Init.method() == 'GET' || httpChannel.requestMethod == "GET" && Init.method() == 'ALL') {

				gui.append('tracer', httpChannel.requestMethod + ":  " + httpChannel.name.substr(0, 149), 1);

			} else {}
		} else if (aTopic == "http-on-examine-response") {
			//gui.append('tracer',"GET response :  "+httpChannel.name,1);
		}
	},

	QueryInterface: function (aIID) {
		if (aIID.equals(Components.interfaces.nsISupports) || aIID.equals(Components.interfaces.nsIObserver)) return this;
		throw Components.results.NS_NOINTERFACE;
	}
};

var observerService = null;

var Init = {

	addObserver: function () {
		var caret = gui.get('tracer.cmd');
		if (caret) {
			cmd = caret.split(SPACE);
			for (i = 1; i < cmd.length; i++) {
				switch (cmd[i]) {
				case '-h':
				case '--help':
					gui.append('tracer', man_trace, 1);
					break;
				default:
					observerService = globals.observer();
					observerService.addObserver(tracelistener, "http-on-modify-request", false);
					observerService.addObserver(tracelistener, "http-on-examine-response", false);
					break;
				}
			}
		}
	},

	removeObserver: function () {
		observerService.removeObserver(tracelistener, "http-on-modify-request");
		observerService.removeObserver(tracelistener, "http-on-examine-response");
		gui.append('tracer', TRACERMSG[1]);
	},

	method: function () {
		var caret = gui.get('tracer.cmd');
		var catchRequest = '';
		if (caret) {
			cmd = caret.split(SPACE);
			for (i = 1; i < cmd.length; i++) {

				switch (cmd[i]) {
				default:
					break;
				case 'A':
				case 'ALL':
					catchRequest = 'ALL';
					break;
				case 'G':
				case 'GET':
					catchRequest = 'GET';
					break;
				case 'P':
				case 'POST':
					catchRequest = 'POST';
					break;
				}
			}
		}
		return catchRequest;
	}
};