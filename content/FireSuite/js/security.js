// Security 
//--------------------------------------------------------------------------------------
var security = {

	run: function () {
		switch (gui.get('application.security.menu')) {
		case '0':
			break;
		case '1':
			break;
		case '2':
			break;
		case '3':
			this.sqli();
			break;
		case '4':
			break;
		case '5':
			break;
		}
	},

	traverse: function () {

		var etc = ["sbin/sh", "bin/bash", "usr/bin", "bin/csh"];
		var url = gui.get('securl');
		var results = gui.get('secresult');
		gui.onprog('secresult');
		if (url.indexOf("=") == -1) {
			gui.set('secresult', "Error! the url has to be in this form: \r\n\r\nhttp://www.example.com/file.xxx?yyy=");
		} else {
			len = trav.length;
			for (i = 0; i < len; i++) {

			}
		}
	},
	sourcecode: function () {
				var xml = io.xhr("GET", gui.get('httpurl'), 'httpresult');
				if (xml.status == 200) {
					sourceresult = xml.responseText;
					gui.notify('httpresult');
					} else {
					sourceresult = "Error loading page\n";
					gui.notify('httpresult');
				}
				gui.set('httpresult', sourceresult);
			},

			head: function () {
				var xml = io.xhr("HEAD", gui.get('httpurl'), 'httpresult');
				if (xml.status == 200) {
					headresult = globals.util.tighten(globals.util.striptags(xml.getAllResponseHeaders()));
					gui.notify('httpresult');
				} else {
					headresult = "Error loading page\n";
					gui.notify('httpresult');
				}
				try {
					var iok = globals.classes('network/io-service;1').getService(Components.interfaces.nsIIOService);
					var uri = iok.newURI(url, null, null);
					var cookieSvc = globals.classes('cookieService;1').getService(Components.interfaces.nsICookieService);
					var cookies = "Cookies:\r\n\r\n" + cookieSvc.getCookieString(uri, null).replace(/;/gi, ";\r\n");
				} catch (e) {
					cookies = "";
				}
				gui.set('httpresult', headresult + "\r\n" + cookies);
			},

			mine: function () {
				var url = gui.get('httpurl');
				var len = directories.length;
				for (i = 0; i < len; i++) {
					var xml = io.xhr("GET", url + '/' + directories[i], 'httpresult');
					if (xml.status == 200) {
						gui.append('httpresult', "\r\n" + url + '/' + directories[i]);
						gui.notify('httpresult');
					}
				}

				for (k = 0; k < ex.length; k++) {
					var lenfiles = files.length;
					for (j = 0; j < lenfiles; j++) {
						var xml = io.xhr("GET", url + '/' + files[j] + ex[k], false);
						if (xml.status == 200) {
							gui.append('httpresult', "\r\n" + url + '/' + files[j] + ex[k]);
						}
					}
				}
			},
			
				sqli: function () {

		//var vectors = ["bar' --","bar' #","bar'/*"," ' or 1=1--"," ' or 1=1#"," ' or 1=1/*"," ') 
		//or '1'='1--"," ') or ('1'='1--"," ' or 1=1/0"," ' UNION SELECT 1,1--"]; 
		var url = gui.get('appsec.url');
		sUrl = url.replace(REGEXP[12].reg, '');
		var xml = io.xhr("GET", url);
		if (xml.status == 200) {
			var getArr = [];
			var paramArr = [];
			var hyperlinks = globals.util.extracthyperlinks(xml.responseText);
			j = 0;
			for (var i = 0; i < hyperlinks.length; i++) {
				if (hyperlinks[i].indexOf('=') != -1) {
					vecttortype = 'param injection';
				} else {
					vecttortype = 'basic';
				}
				if (hyperlinks[i].indexOf('http') != -1 || hyperlinks[i].indexOf('./') != -1 || hyperlinks[i].indexOf('"/') != -1) {
					if (hyperlinks[i].indexOf(sUrl) != -1 && hyperlinks[i] != '') {
						paramArr[j] = hyperlinks[i].replace(/"|'/g, '');

						gui.tree('tree-children-appsec', [hyperlinks[i].replace(/"/g, ''), vecttortype, 3, 4, 5], 1);

					} else {
						if (hyperlinks[i].indexOf('http') != -1) {} else {
							// we got another domain?
							paramArr[j] = 'http://' + sUrl + hyperlinks[i].split('=');
							gui.tree('tree-children-appsec', ['http://' + sUrl + hyperlinks[i].replace(/"|'/g, ''), vecttortype, 3, 4, 5], 1);
						}
					}
				} else {}
				j++;
			}
			//window.alert(paramArr.toSource());
		}
	},

	rmcheckboxes: function () {
		var tree = document.getElementById('appsec.tree');
		for (var i = 0; i < tree.view.rowCount; i++) {
			if (tree.view.getCellValue(i, tree.columns.getColumnAt(4)) == 'true') {
				tree.view.setCellValue(i, tree.columns.getColumnAt(4), false);
			}
		}
	},

	cleartree: function(tree) {
		
	}
	/*
	var tree = document.getElementById('myTodoListTree');
	  for (var i = 0; i < tree.view.rowCount; i++) {
	  if (tree.view.getCellValue(i, tree.columns.getColumnAt(0)) == 'true') {
	
	alert(
	tree.view.getCellText(i, tree.columns.getNamedColumn("name"))+"\n"+
	tree.view.getCellText(i, tree.columns.getNamedColumn("lastname"))+"\n"+
	);
	var firstName= tree.view.getCellText(i, tree.columns.getNamedColumn("name"));
	var menu = document.getElementById("firstname");
	  menu.appendItem(firstName);
		}
	  }
	  */

};