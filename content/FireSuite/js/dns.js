// DNS
//--------------------------------------------------------------------------------------

var dns = {
	
	resolvedns: function () {

		gui.onprog('dnsurl', true);
		var url = gui.get('dnsurl');
		var chkitem = url.replace(REGEXP[12].reg, '');
		
		gui.set('progress.dns',1);
		// if(chkitem.indexOf('.') !=-1) {
		// assume IP, do a reverse lookup.
		// this.reverselookup();
		
		// } else {
			records.push('fmsuite');
			zones = records;
			var len = zones.length;
			for (i = 0; i < len; i++) {
				try {
					this.resolve(zones[i] + "." + chkitem, zones[i],i);
				
				} catch (e) {}
			}
		// }
	},

	resolve: function (host, card, c) {
		
		var dnslisten = {
			onLookupComplete: function (aRequest, aRecord, aStatus) {
				if (aRecord != null) {
					gui.tree('tree-children-dns', [host, aRecord.getNextAddrAsString(),(c* records.length / 100) / (records.length  / 100)], 1);
				  	gui.set('progress.dns',(c* records.length / 100) / (records.length  / 100));
				} else {}
			}
		};
		
		const dns = globals.classes('network/dns-service;1').getService(Components.interfaces.nsIDNSService);
		if (globals.classes('event-queue-service;1')) {
			const compDNS = globals.classes('event-queue-service;1').getService(Components.interfaces.nsIEventQueueService);
			queue = compDNS.getSpecialEventQueue(compDNS.CURRENT_THREAD_EVENT_QUEUE);
			} else {
			queue = globals.classes('thread-manager;1').getService().mainThread;
		}
		dns.asyncResolve(host, 0, dnslisten, queue);
	},
	
	reverselookup: function (ip) {

		// under development.
		
		var IPv4dns = gui.get('dnsserver');
		var ipoctets = '';
		var octets = ip.split(".").reverse();
		
		for (var i = 0; i < octets.length; i++) {
			ipoctets += String.fromCharCode(octets[i].length);
			ipoctets += octets[i];
		}
		
		// create udp datagram
		var packet = Math.floor(Math.random() * (90 - 10 + 1) + 10);
		packet += "\x01\x00\x00\x01\x00";
		packet += "\x00\x00\x00\x00\x00";
		packet += ipoctets;
		packet += String.fromCharCode(7);
		packet += 'in-addr';
		packet += String.fromCharCode(4);
		packet += 'arpa'
		packet += "\x00\x00\x0c\x00\x01";
				
		/*
		ANSWER, AUTHORITY, ADDITIONAL FORMAT
		OCTET 1,2,..n NAME 
		OCTET n+1,n+2TYPE
		OCTET n+3,n+4CLASS 
		OCTET n+5,n+6,n+7,n+8TTL 
		OCTET n+9,n+10RDLENGTH
		OCTET n+11,n+12,…..RDATA
		*/
		
		var sts = globals.classes('network/socket-transport-service;1').getService(Components.interfaces.nsISocketTransportService);
		var transport = sts.createTransport(["udp"], 1, IPv4dns, 53, null);
		
		var s1 = transport.openInputStream(Components.interfaces.nsITransport.OPEN_BLOCKING, null, null);
		var s2 = transport.openOutputStream(Components.interfaces.nsITransport.OPEN_BLOCKING, null, null);
		
		var out = globals.classes('binaryoutputstream;1').createInstance(Components.interfaces.nsIBinaryOutputStream);
		out.setOutputStream(s2);
		out.writeBytes(packet, packet.length);
		out.close();
		
		var stream = globals.classes('binaryinputstream;1').createInstance(Components.interfaces.nsIBinaryInputStream);
		var instream = globals.classes('scriptableinputstream;1').createInstance(Components.interfaces.nsIScriptableInputStream);
		stream.setInputStream(s1);
		instream.init(s2);
		stream.read16();
		
		if (instream.available()) {
			var str = stream.readByteArray(instream.available());
			//alert(str);
		}
		
		inStream.close();
	},
};