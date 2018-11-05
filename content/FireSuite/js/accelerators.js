// Quickstarts
//--------------------------------------------------------------------------------------
var accelerators = {		
	
	perform: function (action,id) {
		
		switch(action) {
			
			case 'all':
			var classIDCACHE = globals.classes('network/cache-service;1');
			var cacheService = classIDCACHE.getService(Components.interfaces.nsICacheService);
			cacheService.evictEntries(Components.interfaces.nsICache.STORE_IN_MEMORY);
			cacheService.evictEntries(Components.interfaces.nsICache.STORE_ON_DISK);
			break;
			
			case 'memory':
			var classIDCACHE = globals.classes('network/cache-service;1');
			var cacheService = classIDCACHE.getService(Components.interfaces.nsICacheService);
			cacheService.evictEntries(Components.interfaces.nsICache.STORE_IN_MEMORY);
			break;
			
			case 'disk':
			var classIDCACHE = globals.classes('network/cache-service;1');
			var cacheService = classIDCACHE.getService(Components.interfaces.nsICacheService);
			cacheService.evictEntries(Components.interfaces.nsICache.STORE_ON_DISK);
			break;
			
			case 'history':
			var classIDHISTORY = Components.classes['browser/global-history;1'];
			var browserHistory = classIDHISTORY.getService(Components.interfaces.nsIBrowserHistory);
			browserHistory.removeAllPages();		
			break;

			case 'profile':
			var directoryService = globals.classes('file/directory_service;1').getService(Components.interfaces.nsIProperties);
			var profileFolder = directoryService.get("ProfD", Components.interfaces.nsIFile);
			var fileLocal = globals.classes('file/local;1').getService(Components.interfaces.nsILocalFile);
			fileLocal.initWithPath(profileFolder.path);
			fileLocal.launch();
			break;
			
			case 'logconsole':
			var consoleService = globals.classes('consoleservice;1')
			.getService(Components.interfaces.nsIConsoleService);
      		consoleService.logStringMessage("FireSuite: " + gui.get(id));			
			break;

			case 'removecookies':
			var c = globals.classes('cookiemanager;1')
			.getService(Components.interfaces.nsICookieManager);
    		c.removeAll();			
			break;
						
			case 'reloadchrome':
			var c = globals.classes('chrome/chrome-registry;1')
			.getService(Components.interfaces.nsIXULChromeRegistry); 
			c.reloadChrome();
			break;

			case 'boot':
			var flash = globals.classes('toolkit/app-startup;1').getService(Components.interfaces.nsIAppStartup);
			flash.quit(Components.interfaces.nsIAppStartup.eForceQuit | Components.interfaces.nsIAppStartup.eRestart);
			break;
									
			case 'vacuum':
			var c = globals.classes('browser/nav-history-service;1')
			.getService(Components.interfaces.nsPIPlacesDatabase).DBConnection.executeSimpleSQL("VACUUM");			
			break;

			case 'closealltabs':
			globals.browser().removeAllTabsBut(globals.browser().addTab("about:blank"));
			break;
			
			case 'reloadtab':
			globals.browser().reload();
			break;
						
			case 'showcookies':
			globals.watcher("chrome://browser/content/preferences/cookies.xul", "Browser:Cookies", "chrome,resizable=yes");
			break;
			
			case 'passwords':
			globals.watcher("chrome://passwordmgr/content/passwordManager.xul", "Toolkit:PasswordManager", "chrome,resizable=yes");
			break;
			
			case 'certificates':
			globals.watcher("chrome://pippki/content/certManager.xul", "mozilla:certmanager", "chrome,resizable=yes,all,width=600,height=400");
			break;
			
			case 'bookmarks':
			globals.watcher("chrome://browser/content/bookmarks/bookmarksPanel.xul", "mozilla:bookmarks", "chrome,resizable=yes,all,width=600,height=400");
			break;			
			
			case 'history':
			globals.watcher("chrome://browser/content/history/history-panel.xul", "mozilla:history", "chrome,resizable=yes,all,width=600,height=400");
			break;	
			
			case 'ext':
			globals.watcher("chrome://mozapps/content/extensions/extensions.xul?type=extensions","mozilla:extensions","chrome,resizable=yes,all,width=600,height=400");
			break;				
			
			case 'console':
			globals.watcher("chrome://global/content/console.xul", "mozilla:console", "chrome,resizable=yes,all,width=600,height=400");
			break;
			
			case 'stopjs':
			if (INITIALJS == true) globals.browser().docShell.allowJavascript = false;
			var reloadtab = true;
			break;
			
			case 'startjs':
			globals.browser().docShell.allowJavascript = true;
			var reloadtab = true;
			break;
			
			case 'stopplugins':
			globals.browser().docShell.allowPlugins = false;
			var reloadtab = true;
			break;
			
			case 'noimages':
			globals.browser().docShell.allowImages = false;
			var reloadtab = true;
			break;	
					
			case 'nosubframes':
			globals.browser().docShell.allowSubframes = false;
			var reloadtab = true;
			break;					 

			case 'noredirects':
			globals.browser().docShell.allowMetaRedirects = false;
			var reloadtab = true;
			break;				
		}
		if(reloadtab == true) {
			globals.browser().reload();
		}
	}
};