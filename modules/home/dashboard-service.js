
angular.module('portal').factory('dashboardService', ['$resource', '$rootScope', 'messageService', 'dataService',
  function ($resource, $rootScope, messageService, dataService) {
  	var resource = $resource('/data/dashboard.json', {}, {});

  	var foreachColumn = function (l, action) {
  		for (var i = 0; i < l.rows.length; i++) {
  			var r = l.rows[i];
  			for (var j = 0; j < r.columns.length; j++) {
  				var c = r.columns[j];
  				if (action(c))
  					return;
  			}
  		}
  	}

  	return {
  		getDashboardData: function (oncomplete) {
  			return resource.get(null, oncomplete);
  		},
  		selectLayout: function (l) {
  			dataService.store('portal.dashboard.currentLayout', l);
  			messageService.fire('portal.dashboard.layoutChanged', l);
  		},
  		attachWidgetToLayout: function (l, w) {
  			var defaultColumn = null;
  			var added = false;
  			foreachColumn(l, function (c) {
  				if (!c.widgets)
  					c.widgets = [];
  				if (!defaultColumn)
  					defaultColumn = c;
  				if (w.columnId == c.id) {
  					c.widgets.push(w);
  					added = true;
  					return true;
  				}
  			});			
  			if (defaultColumn && ! added)
  				defaultColumn.widgets.push(w)
  		},
  		getNormalizedLayout: function (oncomplete) {
  			var _this = this;
  			this.getDashboardData(function (data) {
  				var layout = dataService.get('portal.dashboard.currentLayout');
  				if (!layout)
  					layout = dataService.find({ id: data.selectedLayoutId }, data.layouts);
  				foreachColumn(layout, function (c) {
  					c.widgets = [];
  				});
  				var wl = data.widgets;
  				for (var i = 0 ; i < wl.length; i++) {
  					var w = wl[i];

  					if (!w.options)
  						w.options = {};
  					if (!w.options.title)
  						w.options.title = 'Loading...';

  					_this.attachWidgetToLayout(layout, w);
  				}
  				if (oncomplete)
  					oncomplete(layout);
  			});
  		},
  		findWidget: function (layout, wid) {
  			var rl = layout.rows;
  			for (var i = 0; i < rl.length; i++) {
  				var r = rl[i];
  				for (var j = 0; j < r.columns.length; j++) {
  					var c = r.columns[j];
  					if (c.widgets) {
  						for (var k = 0; k < c.widgets.length; k++) {
  							var w = c.widgets[k];
  							if (w.id == wid)
  								return w;
  						}
  					}
  				}
  			}
  		}
  	}

  }]);