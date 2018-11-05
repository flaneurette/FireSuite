/* ***** BEGIN LICENSE BLOCK *****
 * 
 * Copyright (C) 2011 SUN.IO, Sasha van den Heetkamp.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. This source may not be used in 
 * proprietary software and programs.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 *
 * SUN.IO - Sasha van den Heetkamp.
 * Electronic mail: sasha@sun.io
 *
 * ***** END LICENSE BLOCK ***** */

Components.utils.import("resource://gre/modules/Services.jsm");
Components.utils.import("resource://gre/modules/NetUtil.jsm");  
Components.utils.import("resource://gre/modules/FileUtils.jsm");

var globals = {
	
	include: function(src) {
		Services.scriptloader.loadSubScript(src, this);
	},
	
	browser: function() {
		var glue = Services.wm.getMostRecentWindow("navigator:browser");
		return glue.getBrowser();			
	},
	
	watcher: function(url,name,features) {
		return Services.ww.openWindow(null,url,name,features, null);
	},	
	
	observer: function() {
		return Services.obs;
	},
	
	classes: function(classID) {
		return Components.classes['@mozilla.org/' + classID];
	},
	
	sandbox: function (str) {
		this.box = new Components.utils.Sandbox('about:blank');
		var result = Components.utils.evalInSandbox(str, this.box);
		return result;
	},

	sandboxUrl: function (url) {
		this.box = new Components.utils.Sandbox(url);
		var result = Components.utils.evalInSandbox(str, this.box);
		return result;
	},
	
};


const PATH = 'chrome://FireSuite/content/js/';

globals.include(PATH + 'constants.js');
globals.include(PATH + 'accelerators.js');
globals.include(PATH + 'arrays.js');
globals.include(PATH + 'dns.js');
globals.include(PATH + 'io.js');
globals.include(PATH + 'utils.js');
globals.include(PATH + 'gui.js');
globals.include(PATH + 'lexer.js');
globals.include(PATH + 'security.js');
globals.include(PATH + 'socket.js');
globals.include(PATH + 'portscan.js');
globals.include(PATH + 'tracer.js');
globals.include(PATH + 'regexp.js');
globals.include(PATH + 'calc.js');
globals.include(PATH + 'manpages.js');

globals.io.blacklist();