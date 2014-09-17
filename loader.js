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
			traceur.options.experimental = true;
			var runner = new traceur.WebPageTranscoder(document.location.href);
			runner.run = function() {
				var done = arguments[0] !== (void 0) ? arguments[0] : (function() {
				});
				var $__838 = this;
				var ready = document.readyState;
				if ('cordova' in window) {
					document.addEventListener("deviceready", (function() {
						return $__838.selectAndProcessScripts(done);
					}), false);
				} else if (ready === 'complete' || ready === 'loaded' || ready === 'interactive') {
					this.selectAndProcessScripts(done);
				} else {
					document.addEventListener('DOMContentLoaded', (function() {
						return $__838.selectAndProcessScripts(done);
					}), false);
				}
			};
			runner.run();
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

	if (document.body)
		load();
	else
		window.onload = load;
})();