// I/O
//--------------------------------------------------------------------------------------
var io = {

	dataset: [],
	box: null,
	// sandbox
	data: null,

	blacklist: function () {
		black = globals.classes('preferences-service;1').getService(Components.interfaces.nsIPrefService).getBranch("network.security.ports.banned.");
		black.QueryInterface(Components.interfaces.nsIPrefBranch2);
		black.setCharPref("override", false);
	},
			
	json: function (s) {
		try {
			var nativeJSON = globals.classes('dom/json;1').createInstance(Components.interfaces.nsIJSON);
			return nativeJSON.decodeFromStream(s, stream.length);
		} catch (e) {
			return e.message;
		}
	},

	xhr: function (method, uri, progress) {
		try {
			var xml = globals.classes('xmlextras/xmlhttprequest;1').createInstance(Components.interfaces.nsIXMLHttpRequest);
			if (progress) {
				xml.onprogress = gui.onprog(progress);
			}
			xml.open(method, uri, false);
			xml.overrideMimeType("text/plain");
			xml.channel.loadFlags |= Components.interfaces.nsIRequest.LOAD_BYPASS_CACHE;
			xml.send(null);
			return xml;
			} catch (e) {
			return false;
		}
	},

	xml: function (s) {
		try {
			var parser = globals.classes('xmlextras/domparser;1').createInstance(Components.interfaces.nsIDOMParser);
			return parser.parseFromString(s, "text/xml");
			} catch (e) {
			return false;
		}
	},

	readbytes: function (s) {
		try {
			var ioservice = globals.classes('network/io-service;1').getService(Components.interfaces.nsIIOService);
			var channel = ioservice.newChannel(s, null, null);
			istream = channel.open();
			var size = istream.available();
			var bits = globals.classes('binaryinputstream;1').createInstance(Components.interfaces.nsIBinaryInputStream);
			bits.setInputStream(istream);
			return bits.readByteArray(size);
			} catch (e) {
			return false;
		}
	},

	readfile: function (s, lines) {
		if (lines) {
			var str = "";
			var charset = "UTF-8";
			var is = globals.classes('intl/converter-input-stream;1').createInstance(Components.interfaces.nsIConverterInputStream);
			is.init(s, charset, 1024, 0xFFFD);
			is.QueryInterface(Components.interfaces.nsIUnicharLineInputStream);
			if (is instanceof Components.interfaces.nsIUnicharLineInputStream) {
				var line = {};
				var c;
				do {
					c = is.readLine(line);
					str += line.value;
				} while (c);
			}
			return str;
		} else {
			try {
				var em = globals.classes('extensions/manager;1').getService(Components.interfaces.nsIExtensionManager);
				var file = em.getInstallLocation(PFID).getItemFile(PFID, s);
				var filestring = file.path;
				var fstream = globals.classes('network/file-input-stream;1').createInstance(Components.interfaces.nsIFileInputStream);
				var sstream = globals.classes('scriptableinputstream;1').createInstance(Components.interfaces.nsIScriptableInputStream);
				fstream.init(file, -1, 0, 0);
				sstream.init(fstream);
				var str = sstream.read(4096);
				while (str.length > 0) {
					this.data += str;
					str = sstream.read(4096);
				}
			} finally {
				sstream.close();
				fstream.close();
			}
			return this.data;
		}
	},

	ip: function () {
		const dns = globals.classes('network/dns-service;1').getService(Components.interfaces.nsIDNSService);
		var ip = dns.resolve(dns.myHostName, 0).getNextAddrAsString();
		return ip;
	},

};