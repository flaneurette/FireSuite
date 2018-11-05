// GUI XUL I/O.
//--------------------------------------------------------------------------------------
var gui = {

	get: function (id) {
		return document.getElementById(id).value;
	},

	set: function (id, s) {
		document.getElementById(id).value = s;
	},

	append: function (id, s, lb) {
		if (lb) {
			document.getElementById(id).value += "\r\n" + s;
			} else {
			document.getElementById(id).value += s;
		}
	},

	notify: function (t) {
		document.getElementById(t).removeAttribute("style", 0);
	},

	onprog: function (t, heartbeat) {
		if (heartbeat) {
			document.getElementById(t).setAttribute("style", "background-image:url(chrome://FireSuite/skin/66.gif);background-position:right bottom;background-repeat:no-repeat;");
			} else {
			document.getElementById(t).setAttribute("style", "background-image:url(chrome://FireSuite/skin/ajax-loader.gif);background-position:-10px;background-repeat:no-repeat;");
		}
	},
	
	tree: function (treeid, cells) {

		var items = document.createElement('treeitem');
		var row = document.createElement('treerow');

		for (var i = 0; i < cells.length; i++) {
			var cell = document.createElement('treecell');
			cell.setAttribute('label', cells[i]);
			cell.setAttribute('value', true);
			cell.setAttribute('editable', true);
			row.appendChild(cell);
		}

		items.appendChild(row);
		document.getElementById(treeid).appendChild(items);
	}
};