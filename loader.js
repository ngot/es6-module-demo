(function() {
	var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
	var js = ["traceur.js", "app.js"];
	var script_id = 0;

	function load() {
		if (script_id < js.length) {
			append(js[script_id], js[script_id].indexOf("traceur") === -1, function() {
				script_id++;
				load();
			});
		} else {
			document.onreadystatechange = function () {
				if (document.readyState == "complete")
					bootstrap();
			}
		}
	}

	function append(src, is_module, fn) {
		var c = document.createElement("script");
		c.type = "module";
		if (!is_module) {
			c.type = "text/javascript";
			if (c.readyState)
				c.onreadystatechange = function() {
					if (this.readyState === 'loaded')
						setTimeout(fn, 0);
				};
			else
				c.onload = fn;
		}
		c.src = src;
		head.appendChild(c);
		if (is_module) fn();
	}

	function bootstrap() {
		traceur.options.experimental = true;
		new traceur.WebPageTranscoder(document.location.href).run();
	}

	if (document.body)
		load();
	else
		window.onload = load;
})();