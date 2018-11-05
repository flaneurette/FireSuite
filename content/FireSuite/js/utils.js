// Utilities
//--------------------------------------------------------------------------------------
var util = {

	launch: function () {
		var adapter = gui.get('adapter');
		conv = this.convert(gui.get('decoder'), adapter);
		gui.set('adapted', conv);
	},
	clear: function (loc) {
		gui.set(loc, '');
	},
	copy: function (loc) {
		const gClipboardHelper = globals.classes('widget/clipboardhelper;1').getService(Components.interfaces.nsIClipboardHelper);
		gClipboardHelper.copyString(gui.get(loc));
	},
	convert: function (type, str) {
		var res = [];
		var blank = '';
		var clen = str.length;
		var hexchars = '0123456789abcdef';

		switch (type) {
		default:
			return 'Please select adapter for conversion.';
			break;
			case '0':
				var needle = gui.get('txt.find');
				var replacement = gui.get('txt.replace');
				if (needle == '' || replacement == '') {
					return 'Nothing to replace!';
				} else {
					var match = new RegExp(needle, "ig");
					var replaced = "";
					if (replacement.length > 0) {
						replaced = source.replace(match, replacement);
						return replaced;
					} else {
						return 'Nothing found.';
					}
				}

				break;
			case '1':
				// number lines
				var s = str.split("\n");
				result = [];
				for (var i = 0; i < s.length; i++) {
					result[i] = (i + 1) + ': ' + s[i];
				}
				return result.join('\n');
				break;
			case '2':
				replaced = str.toLowerCase();
				return replaced;
				break;
			case '3':
				replaced = str.toUpperCase();
				return replaced;
				break;
			case '4':
				replaced = str.replace(REGEXP[14].reg, '');
				return replaced;
				break;
			case '5':
				replaced = str.replace(REGEXP[15].reg, SPACE);
				return replaced;
				break;
			case '6':
				replaced = str.replace(REGEXP[16].reg, '');
				return replaced;
				break;
			case '7':
				result = str.split(REGEXP[15].reg);
				return result.length;
				break;
			case '8':
				var result = str.split(SPACE).sort();
				return result.length;
				break;
			case '9':
				return str.length;
				break;
			case '10':
				var s = str.split(SPACE);
				temp = [];
				for (var i = 0; i < s.length; i++) {
					temp[i] = s[i].charAt(0).toUpperCase() + s[i].substring(1);
				}
				return temp.join(SPACE);
			break;
						
		case 'urlencode':
			return encodeURIComponent(str);
			break;
		case '2utf8':
			return unescape(encodeURIComponent(str));
			break;
		case 'tohex':
			return ("0" + str.toString(16)).slice(-2);
			break;
		case 'base642':
			return atob(str);
			break;
		case 'urldecode':
			return decodeURIComponent(str);
			break;
		case 'utf82':
			return decodeURIComponent(escape(str));
			break;
		case 'tohex2':
			str.split('');
			for (i = 0; i < clen; ++i) {
				blank += ('0' + str[i].toString(16)).slice(-2) + SPACE;
			}
			return blank;
			break;
		case 'dec2hex':
			str.split('');
			for (i = 0; i < clen; ++i) {
				res.push('0x' + Number(str[i]).toString(16).toUpperCase());
			}
			return res.join('');
			break;
		case 'dec2ent':
			return entity_table[str];
		case 'dec2oct':
			str.split('');
			for (i = 0; i < clen; ++i) {
				res.push('0' + Number(this).toString(8));
			}
			return res.join('');
			break;
		case '2base64':
			return btoa(str);
			break;
		case 'dec2bin':
			for (i = 7; i >= 0; i--) {
				blank += (str >> i) & 1;
			}
			return blank;
			break;
		case 'ip2dec':
			var octets = str.split('.');
			return (16777216 * octets[0]) + (65536 * octets[1]) + (256 * octets[2]) + Number(octets[3]);
			break;
		case 'ip2dword':
			var dword = 0;
			var pi = str.split('.');
			for (i = 3; i >= 0; i--) {
				dword += (pi[(3 - i)] * (Math.pow(256, i)));
			}
			return dword;
			break;
		case '2usascii':
			for (i = 0; i < clen; i++) {
				blank += String.fromCharCode(str.charCodeAt(i) + 128);
			}
			return blank;
			break;
		case '2charcode':
			str.split('');
			for (i = 0; i < clen; ++i) {
				blank += String.charCodeAt(str[i]) + ',';
			}
			return blank;
			break;
		case 's2u':
			str.split('');
			for (i = 0; i < clen; ++i) {
				blank += '&#' + String.charCodeAt(str[i]) + ';';
			}
			return blank;
			break;
		case 'pack':
			var clean = new Function(str).toSource(2);
			str = str.replace(REGEXP[50].reg, '');
			str = str.replace(REGEXP[51].reg, ' return ');
			str = str.replace(REGEXP[52].reg, ' var ');
			str = str.replace(REGEXP[53].reg, ' if(');
			str = str.replace(REGEXP[54].reg, ' while(');
			str = str.replace(REGEXP[55].reg, ' function ');
			return str;
			break;
		case 'shellcodetojs':
			var str = new String(str);
			s = str.replace(REGEXP[56].reg, '');
			var shellcode = '';
			for (var idx = 0; idx < s.length; idx += 4) {
				shellcode += "%u" + s.substr(idx + 2, 2) + s.substr(idx + 0, 2);
			}
			return shellcode;
			break;
		case 'bin2dec':
			return parseInt(str, 2);
			break;
		case 'usascii2':
			for (i = 0; i < str.length; i++) {
				blank += String.fromCharCode(str.charCodeAt(i) - 128);
			}
			return blank;
			break;
		case 'dec2ip':
			return Math.floor(str / 16777216) % 256 + '.' + Math.floor(str / 65536) % 256 + '.' + Math.floor(str / 256) % 256 + '.' + Math.floor(str) % 256;
			break;
		case 'bin2hex':
			var hex = new Array(clen * 2);
			for (var i = 0; i < clen; ++i) {
				hex[i * 2] = hexchars.charAt((str.charCodeAt(i) >> 4) & 15);
				hex[i * 2 + 1] = hexchars.charAt(str.charCodeAt(i) & 15);
			}
			return hex.join('');
			break;
		case 'hex2string':
			for (i = 0; i < clen; i += 2) {
				res.push(String.fromCharCode(parseInt(str.substring(i, i + 2), 16)));
			}
			return res.join('');
			break;
		case 'string2hex':
			for (i = 0; i < clen; i++) {
				res.push((256 + str.charCodeAt(i)).toString(16).substring(1));
			}
			return res.join('');
			break;
		case 'hex2bytes':
			for (i = 0; i < clen; i += 2) {
				res.push(parseInt(str.substring(i, i + 2), 16));
			}
			return res.join('');
			break;
		case 'string2bytes':
			for (i = 0; i < len; i++) {
				res[i] = str.charCodeAt(i);
			}
			return res.join('');
			break;
		case 'deobfus':
			var clean = new Function(str).toSource(2);
			clean = clean.replace('function anonymous() {', '');
			return clean.substring(0, (clean.length - 1));
			break;
		case 'rgb2hex':
			str = str.replace(REGEXP[57].reg, '').split(',');
			str[0] = parseInt(str[0], 10).toString(16);
			str[1] = parseInt(str[1], 10).toString(16);
			str[2] = parseInt(str[2], 10).toString(16);
			str[0] = (str[0].length == 1) ? '0' + str[0].toUpperCase() : str[0].toUpperCase();
			str[1] = (str[1].length == 1) ? '0' + str[1].toUpperCase() : str[1].toUpperCase();
			str[2] = (str[2].length == 1) ? '0' + str[2].toUpperCase() : str[2].toUpperCase();
			return ('#' + str.join(''));
			break;
		}
	},

	extracthyperlinks: function (source, url) {
		
		var links = [];
		var matches = source.match(REGEXP[13].reg);
		for (i in matches) 
		{
			t = matches[i].replace('href=', '');
			if (t.match(REGEXP[0].reg) == null) 
			{
				links.push(t);
			}
		}
		return links;
	},

	hashvalue: function (el) {
		gui.set('cryptography', globals.util.pfhash(el, gui.get('hashact')));
	},

	pfhash: function (str, method) {

		var converter = globals.classes('intl/scriptableunicodeconverter').createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
		converter.charset = "UTF-8";
		var nocrc = true;
		var result = {};
		var data = converter.convertToByteArray(str, result);
		var hash_engine = globals.classes('security/hash;1').createInstance().QueryInterface(Components.interfaces.nsICryptoHash);

		switch (method) {
		case 'MD2':
			hash_engine.init(hash_engine.MD2);
			break;
		case 'MD5':
			hash_engine.init(hash_engine.MD5);
			break;
		case 'SHA1':
			hash_engine.init(hash_engine.SHA1);
			break;
		case 'SHA256':
			hash_engine.init(hash_engine.SHA256);
			break;
		case 'SHA384':
			hash_engine.init(hash_engine.SHA384);
			break;
		case 'SHA512':
			hash_engine.init(hash_engine.SHA512);
			break;
		}
		hash_engine.update(data, result.value);
		return globals.util.convert('bin2hex', hash_engine.finish(false));
	},

	computehash: function (method) {
		const nsIFilePicker = Components.interfaces.nsIFilePicker;
		var fp = globals.classes('filepicker;1').createInstance(nsIFilePicker);
		fp.init(window, "Browse file to compute checksum", nsIFilePicker.modeOpen);
		fp.appendFilters(nsIFilePicker.filterAll | nsIFilePicker.filterText);
		var rv = fp.show();
		if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace) {
			var file = fp.file;
			var path = fp.file.path;
			gui.set('cryptography', globals.util.gethash(path, gui.get('hashact')));
		}
	},

	gethash: function (path, method) {

		var f = globals.classes('file/local;1').createInstance(Components.interfaces.nsILocalFile);
		f.initWithPath(path);
		var istream = globals.classes('network/file-input-stream;1').createInstance(Components.interfaces.nsIFileInputStream);
		istream.init(f, 0x01, 0444, 0);
		var ch1 = globals.classes('security/hash;1').createInstance(Components.interfaces.nsICryptoHash);

		switch (method) {
		case 'MD2':
			ch1.init(ch1.MD2);
			break;
		case 'MD5':
			ch1.init(ch1.MD5);
			break;
		case 'SHA1':
			ch1.init(ch1.SHA1);
			break;
		case 'SHA256':
			ch1.init(ch1.SHA256);
			break;
		case 'SHA384':
			ch1.init(ch1.SHA384);
			break;
		case 'SHA512':
			ch1.init(ch1.SHA512);
			break;
		}
		try {
			ch1.updateFromStream(istream, PR_UINT32_MAX);
			var hash1 = ch1.finish(false);
			return [this.convert('tohex', hash1.charCodeAt(i)) for (i in hash1)].join("");
		} finally {
			istream.close();
		}
	},

	getsize: function (url) {
		try {
			bytes = io.readbytes(url);
			if (bytes) {
				var kbSize = bytes.length / 1024;
				return Math.round(kbSize * 100) / 100;
			}
		} catch (e) {
			return 'unknown';
		}
	},

	newtab: function (data) {
		var newTabB = globals.browser().getBrowserForTab(globals.browser().addTab("about:blank"));
		newTabB.addEventListener("load", function () {
			newTabBrowser.contentDocument.body.innerHTML = data;
		}, true);
	},

	clipboard: function (str) {
		var clipboard = globals.classes('widget/clipboardhelper;1').getService(Components.interfaces.nsIClipboardHelper);
		clipboard.copyString(val);
	},

	striptags: function (str) {
		return str.replace(REGEXP[58].reg, SPACE);
	},

	rspace: function (str) {
		str = str.replace(REGEXP[59].reg, SPACE);
		str = str.replace(REGEXP[60].reg, "\r\n");
		return str;
	},

	tighten: function (str) {
		str.replace(REGEXP[61].reg, SPACE);
		str.replace(REGEXP[62].reg, SPACE);
		str.replace(REGEXP[63].reg, SPACE);
		return str;
	},

	generatepass: function (cipher, m, bytesource) {

		var bytesource = 'mozillaprng';
		var pass = '';
		var multi = true;

		if (!cipher) cipher = 10;

		switch (m) {

		default:
			chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
			break;
		case '0':
			chars = "1234506789";
			break;
		case '1':
			chars = "~!@#$%^&*()_+=-`|}{\][:';?.,<>0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
			break;
		case '2':
			chars = "0123456789abcdef";
			break;
		case '3':
			chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
			break;
		case '4':
			chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			break;
		case '5':
			var multi = false;
			var buffer = '';
			var PRNG = Components.classes['security/random-generator;1'];
			var rg = PRNG.getService(Components.interfaces.nsIRandomGenerator);
			pass = rg.generateRandomBytes(cipher, buffer);
			break;
		case '6':
			multi = false;
			var bytebucket = [];
			// get random bytes here from radioactive decay at fourmilab.
			var hotbyte = "https://www.fourmilab.ch/cgi-bin/Hotbits?nbytes=" + cipher + "&fmt=xml&npass=1&lpass=" + cipher + "&pwtype=3";
			var xml = io.xhr("GET", hotbyte, false);

			if (xml.status == 200) {
				var doc = io.xml(xml.responseText);
				// strip all markup, if any.
				pass = globals.util.tighten(globals.util.striptags(doc.getElementsByTagName("random-data").item(0).textContent));
				res = [];
				strtmp = pass.replace(/\s/ig, '');
				for (i = 0; i < strtmp.length; i += 2) {
					res.push(parseInt(strtmp.substring(i, i + 2), 16));
				}
				pass = res.join(',');

			}
			break;
		case '7':
			multi = false;
			var bytebucket = [];
			// get random bytes here from random.org.
			var hotbyte = "https://www.random.org/cgi-bin/randbyte?nbytes=" + cipher + "&format=h";
			var xml = io.xhr("GET", hotbyte, false);

			if (xml.status == 200) {
				// strip all markup, if any.
				var doc = globals.util.tighten(globals.util.striptags(xml.responseText));
				res = [];
				strtmp = doc.replace(/\s/ig, '');
				for (i = 0; i < strtmp.length; i += 2) {
					res.push(parseInt(strtmp.substring(i, i + 2), 16));
				}
				pass = res.join(',');
			}
			break;
		case '8':
			multi = false;
			var bytebucket = [];
			for (var i = 0; i < cipher; i++) {
				bytebucket[i] = Math.floor(Math.random() * (Math.floor(Math.random() * 1000)));
			}
			pass = bytebucket.join(',');
			break;
		}

		if (multi) {
			for (x = 0; x < cipher; x++) {
				rand = Math.random() * chars.length;
				genn = Math.round(rand);
				while (genn <= 0) {
					genn++;
				}
				pass += chars.charAt(genn);
			}
		}
		return pass;
	},
	genpass: function () {
		gui.set('cryptography', this.generatepass(gui.get('Pass'), gui.get('Method')));
	},

	prng: function () {
		gui.set('cryptography', this.generatepass(gui.get('pprng'), gui.get('Method2')));
	}
};
