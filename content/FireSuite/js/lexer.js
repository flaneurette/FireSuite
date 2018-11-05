// Terminal lexer
//--------------------------------------------------------------------------------------
var lexer = {

	termsession: [],

	capture: function (e) {

		var press = false;

		switch (e.keyCode) {
		case e.DOM_VK_ENTER:
		case e.DOM_VK_RETURN:
			this.terminal();
			break;

		case e.DOM_VK_UP:
			this.getlastcmd();
			break;

		case e.DOM_VK_LEFT_CONTROL:
		case e.DOM_VK_RIGHT_CONTROL:
		case e.DOM_VK_CONTROL:
		case 17:
			// capture ctrl & store.
			this.press = 1;
			break;

		case e.DOM_VK_BACK_SPACE:

			break;

		case e.DOM_VK_ALT:
		case e.DOM_VK_LEFT_ALT:
		case e.DOM_VK_RIGHT_ALT:
			// capture alt & store.
			this.press = 1;
			break;
		case 90:
			if (this.press) {
				this.press = false;
				} else {
				// wtf...
			}
			break;
		}
	},

	getlastcmd: function () {
		// triggered on arrow up: DOM_VK_UP, imitate console last entry.
		len = this.termsession.length;
		if (len > 0) {
			gui.append('term', "\r\n" + this.termsession[len - 1]);
			this.termsession.pop();
		} else {
			return true;
		}
	},

	tocaret: function (loc) {
		return document.getElementById(loc).scrollTop = document.getElementById(loc).scrollHeight;
	},

	terminal: function () {

		var cursor = '$'.SPACE;
		var struct = document.getElementById('term').value;
		var ticked = document.getElementById('tick');
		var instruct = struct.split("\n");
		len = parseInt(instruct.length);

		if (ticked.checked == false) {
			if (len >= 18) {
				var st = '';
				for (k = 1; k < len - 2; k++) {
					st += instruct[k] + "\n";
				}
				gui.set('term', st);
			}
		}

		var arg = instruct[len - 2].split(SPACE);
		this.termsession.push(instruct[len - 2]);

		switch (arg[0]) {

		case '':
			__msg = false;
			break;
		case 'Invalid':
			__msg = false;
			break;
		default:
			__msg = CONSOLEMSG[0];
			break;
		case 'help':
		case '[help]':
			__msg = CONSOLEMSG[2];
			break;
		case 'history':
			if (arg[1] == '-c') {
				gui.set('term', '');
				__msg = false;
			} else {
				__msg = "command: [history] [flags] -c clear history\r\n";
			}
			break;
		case 'run':
			if (arg[1]) {
				try {
					var file = globals.classes('file/local;1').createInstance(Components.interfaces.nsILocalFile);
					file.initWithPath(arg[1]);
					if (arg[2].indexOf(",") != -1) {
						var args = arg[2].split(",");
						var process = globals.classes('process/util;1').createInstance(Components.interfaces.nsIProcess);
						process.init(file);
						process.run(false, args, args.length);
					} else {
						file.launch(false);
					}
				} catch (e) {
					__msg = "Error: " + e.message + "\r\n";
				}
				__msg = "process initiated";
			}

		break;
		
		case '':
		break;
		
		case 'wget ':
		break;
		
		case 'js ':

			if (arg[1] != 'exit') {
				js = arg.join(SPACE);
				js = js.substring(3, js.length);
				if (js != null) {
					if (gui.get('term')) {
						function private_compiler() {
							// reserverd words, they may not be instantiated.
							if (js.search(/PFID/gim) == -1) {
								try {
									var compiler = globals.sandbox(js); // create private function.
									try {
										if (compiler) {
											__msg = "js:> " + compiler.toString() + "\r\njs: ";
										} else {
											__msg = "js:> \r\njs: ";
										}
									} catch (e) {
										__msg = "js:> error running javascript command: " + e.message + "\r\njs: ";
									}
								} catch (ex) {
									__msg = "js:> error compiling javascript command: " + ex.message + "\r\njs: ";
								}
							} else {
								__msg = "js:> security error: command not allowed.\r\njs: ";
							}
						}
						private_compiler(); // run private function
					}
				}
			} else {
				__msg = "\r\n"; // we got an exit
			}

			break;
		}
		if (__msg) {
			try {
				gui.append('term', __msg);
				this.tocaret('term');
			} catch (e) {
				// window.alert(e.message);
			}
		}
	}
};