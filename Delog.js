function Delog(file, cb) {
	var t = this;
	t.json = null;

	this.init = function() {
		try {
			t.json = JSON.parse(this.responseText);
		} catch (e) {
			console.log('Error in the Log JSON');
		}

		if (t.json) {
			cb();
		}
	}

	this._overview = function(el, prop, colored) {
		var date = new Date(); // the starting date
		date.setDate(date.getDate() - 60)
		date.setHours(0,0,0,0);

		var log = after(t.json.log, date); // the entries after the starting date

		var days = Object.keys(log).length; // the number of days
		var column_width = (100 / days).toFixed(3);
		for (var time in log) {
			var day = log[time];

			var yp = 0;
			var column = document.createElement('div');
			column.classList = 'column';

			column.style.width = (column_width - 0.4) + '%';
			column.style.margin = '0 ' + 0.2 + '%';
			column.style.position = "relative";
		    column.style.height = "100%";
		    column.style.display = "inline-block";
		    column.style.borderBottom = "1px solid rgba(0,0,0,0)";
			if (prop.empties) column.style.borderColor = prop.color;

			for (var i = 0; i < day.length; i++) {
				var entry = day[i];

				var entry_el = document.createElement('div');

				var height = Number(calcWidth(parse(entry.e), parse(entry.s)).toFixed(2));

				entry_el.classList = "entry";
				entry_el.style.width = "100%";
				entry_el.style.height = height + '%';
				entry_el.style.bottom = yp + '%';
				if (colored) entry_el.style.background = t.json.palette[entry.c] ? t.json.palette[entry.c] : prop.color;
				else entry_el.style.background = prop.color;
				entry_el.style.position = "absolute";

				column.appendChild(entry_el);

				yp += height;
			}

			el.appendChild(column);
		}
	}

	this.overview = function(el, prop) {
		t._overview(el, prop, true);
	}

	this.total = function(el, prop) {
		t._overview(el, prop, false);
	}

	this.sectors = function(el, prop) {
		for (var sect in t.json.palette) {
			var color = t.json.palette[sect];

			var sector_el = document.createElement('div');
			sector_el.classList = 'sector';
			sector_el.style.marginTop = '5px';
			sector_el.style.display = 'inline-block';
			var sector_name = document.createElement('span');
			sector_name.innerHTML = sect;
			sector_name.style.fontSize = prop.fontSize ? prop.fontSize : '14px';
			var color_el = document.createElement('div');
			color_el.style.width = prop.fontSize ? prop.fontSize : '14px';
			color_el.style.height = prop.fontSize ? prop.fontSize : '14px';
			color_el.style.display = prop.block ? 'block' : 'inline-block';
			color_el.style.background = color;
			color_el.style.margin = '0 15px';

			sector_el.appendChild(color_el);
			sector_el.appendChild(sector_name);
			el.appendChild(sector_el);
		}
	}

	function after(log, date) {
		var res = {};

		var from = date.getTime(), now = new Date();
		now.setHours(0,0,0,0);
		now = now.getTime();

		// addDays helper function from joshavanier
		Date.prototype.addDays = function(days) {
	      let date = new Date(this.valueOf())
	      date.setDate(date.getDate() + days)
	      return date
	    }

		var day = new Date(date.getTime());
		day.setHours(0,0,0,0);
		day = day.addDays(1); // tomorrow 00:00

		while (day.getTime() <= now) {
			res[day.getTime().toString()] = [];
			day = day.addDays(1);
		}

		from = parse(to_hex(date)); // simply converting to it doesn't work
		for (var i = 0; i < log.length; i++) {
			var end = parse(log[i].e);
			if (end && end > from) {
				var day = convert(parse(log[i].e));
				day.setHours(0,0,0,0);
				if (res[day.getTime().toString()]) res[day.getTime().toString()].push(log[i]);
			}
		}
		return res;
	}

	// From joshavanier's Log app
	function calcWidth(a, b) {
      return (a - b) / 86400 * 100
    }

	function parse(s) {
      return parseInt(s, 16)
    }


    function to_hex(t) {
      return (new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds()).getTime() / 1E3).toString(16)
    }

	function convert(t) {
      return new Date(t * 1E3)
    }

	// load the file

	var request = new XMLHttpRequest();
	request.addEventListener("load", this.init);
	request.open("GET", file);
	request.send();

	return this;
}
