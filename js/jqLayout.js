/* *******************************
* ********************************/
;(function ($) {
	var jqLayout = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, privateMembers.defaults, options);
		let $this = this;
		$(this.$element).addClass('jqLayout');
		this.rootClass = ' .jqLayout ';
		if (this.options.className) {
			this.rootClass += '.' + this.options.className + ' ';
			$(this.$element).addClass(this.options.className);
		}
		// 初始化
		privateMembers.init(this);
		// 注册事件
		// left control bar
		this.$element.find('.ui-jqLayout-controlBar-left,.ui-jqLayout-controlBar-left > .ui-jqLayout-controlBut').on('click', function () {
			if ($(this).hasClass('ui-jqLayout-controlBar-left')) {
				if($this.options.west.drag){
					$this.options.west.drag = false;
					return false;
				}
				$this.options.west.auto = true;
			}else {
				$this.options.west.auto =false;
			}
			privateMembers.toggleWest($this);
			return false;
		});
		this.$element.find('.ui-jqLayout-controlBar-right,' +
			'.ui-jqLayout-controlBar-right > .ui-jqLayout-controlBut').on('click', function () {
			if ($(this).hasClass('ui-jqLayout-controlBar-right')) {
				if($this.options.east.drag){
					$this.options.east.drag = false;
					return false;
				}
				$this.options.east.auto = true;
			}else {
				$this.options.east.auto = false;
			}
			privateMembers.toggleEast($this);
			return false;
		});
		this.$element.on('mouseenter', '.ui-jqLayout-east', function () {
			if ($this.options.east.auto) {
				if (!$this.options.east.open) {
					let east = $this.$element.find('.ui-jqLayout-east');
					let bar = $this.$element.find('.ui-jqLayout-controlBar-right');
					let center = $this.$element.find('.ui-jqLayout-center');
					east.animate({width: $this.options.east.size}, 1000);
					bar.animate({right: $this.options.east.size}, 1000);
					center.animate({
						"padding-right": $this.options.east.size +
							$this.options.east.barSize
					}, 1000);
					$this.options.east.open = true;
				}
			}
			return false;
		});
		this.$element.on('mouseleave', '.ui-jqLayout-east', function () {
			if ($this.options.east.auto) {
				if ($this.options.east.open) {
					let east = $this.$element.find('.ui-jqLayout-east');
					let bar = $this.$element.find('.ui-jqLayout-controlBar-right');
					let center = $this.$element.find('.ui-jqLayout-center');
					east.animate({width: $this.options.east.minSize}, 1000);
					bar.animate({right: $this.options.east.minSize}, 1000);
					center.animate({
						"padding-right": $this.options.east.minSize +
							$this.options.east.barSize
					}, 1000);
					$this.options.east.open = false;
				}
			}
			return false;
		});
		this.$element.on('mouseenter', '.ui-jqLayout-west', function () {
			if ($this.options.west.auto) {
				let west = $this.$element.find('.ui-jqLayout-west');
				let bar = $this.$element.find('.ui-jqLayout-controlBar-left');
				let center = $this.$element.find('.ui-jqLayout-center');
				if (!$this.options.west.open) {
					west.animate({width: $this.options.west.size}, 1000);
					bar.animate({left: $this.options.west.size}, 1000);
					center.animate({
						"padding-left": $this.options.west.size +
							$this.options.west.barSize
					}, 1000);
					$this.options.west.open = true;
				}
			}
			return false;
		});
		this.$element.on('mouseleave', '.ui-jqLayout-west', function () {
			if ($this.options.west.auto) {
				let west = $this.$element.find('.ui-jqLayout-west');
				let bar = $this.$element.find('.ui-jqLayout-controlBar-left');
				let center = $this.$element.find('.ui-jqLayout-center');
				if ($this.options.west.open) { // 收缩
					west.animate({width: $this.options.west.minSize}, 1000);
					bar.animate({left: $this.options.west.minSize}, 1000);
					center.animate({
						"padding-left": $this.options.west.minSize +
							$this.options.west.barSize
					}, 1000);
					$this.options.west.open = false;
				}
			}
			return false;
		});
		$(this.rootClass).tooltip({
			show: {effect: "blind", duration: 100, delay: $this.options.toolTipDelay},
			track: true
		});

		this.$element.find('.ui-jqLayout-controlBar-left').draggable({
			distance: 10, cursor: "w-resize", axis: "x",
			containment: "document",
			cancel:".ui-jqLayout-controlBut",
			start: function (event, ui) {
				$this.options.west.drag = true;
			},
			drag: function (event, ui) {
				if (ui.offset.left <= $this.options.west.minSize) {
					return false;
				}
				let center = $this.$element.find('.ui-jqLayout-center');
				let rightBar = $this.$element.find('.ui-jqLayout-controlBar-right');
				if(ui.offset.left >= rightBar.offset().left - rightBar.width()){
					return false;
				}
				let west = $this.$element.find('.ui-jqLayout-west');
				let leftBar = $this.$element.find('.ui-jqLayout-controlBar-left');
				west.css('width', ui.offset.left + 'px');
				leftBar.css("left", ui.offset.left + 'px');
				center.css('padding-left', ui.offset.left + $this.options.west.barSize + 'px');
				$this.options.west.size = ui.offset.left;
			}
		});
		this.$element.find('.ui-jqLayout-controlBar-right').draggable({
			distance: 10, cursor: "move", axis: "x",
			containment: "document",
			cancel:".ui-jqLayout-controlBut",
			start: function (event, ui) {
				$this.options.east.drag = true;
			},
			drag: function (event, ui) {
				// 左边限制
				if (ui.offset.left < $this.options.west.size + $this.options.west.barSize) {
					return false;
				}
				let east = $this.$element.find('.ui-jqLayout-east');
				let val = east.offset().left -ui.offset.left - $this.options.east.barSize;
				// 最小限制
				if ($this.options.east.size + val <= $this.options.east.minSize) {
					return false;
				}
				$this.options.east.size += val;//screen - ui.offset.left - $this.options.east.barSize;
				let bar = $this.$element.find('.ui-jqLayout-controlBar-right');
				let center = $this.$element.find('.ui-jqLayout-center');
				east.css('width', $this.options.east.size + 'px');
				bar.css("right", $this.options.east.size + 'px');
				center.css('padding-right', $this.options.east.size + $this.options.east.barSize + 'px');
			}
		});
	};
	jqLayout.prototype = {
		// 切换面板的开启闭合
		togglePanel: function (panel) {
			switch (panel) {
				case "west":
					return privateMembers.toggleWest(this);
				case "east":
					return privateMembers.toggleEast(this);
				default:
					break;
			}
		}
	};
	const privateMembers = {
		defaults: {
			northStyle: "ui-widget-header",
			southStyle: "ui-widget-header",
			westStyle: "ui-widget-content",
			eastStyle: "ui-widget-content",
			centerStyle: "ui-widget-content",
			activeItemStyle: "ui-state-active",
			contextStyle: "ui-widget-content",
			hoverStyle: "ui-state-hover",
			toolTipDelay: 3000,
			className: "",
			north: {
				style: "ui-widget-header",
				size: 50
			},
			south: {
				style: "ui-widget-header",
				size: 30
			},
			west: {
				style: "ui-widget-content",
				minSize: 0,
				enableBar: true, // 是否添加drag bar
				barSize: 8,
				barButHeight: 50,
				barOpenContent: "",
				barClosedContent: "",
				barTooltip: "拖拉改变面板大小", // 拖拉bar 提示
				shrinkBtTip: "折叠/打开面板",   // 收缩按钮提示
				initClose: false,              // 初始化状态->是否关闭
				auto: false,                    // 自动收缩 以下是随时可变状态
				open: true,                    // panel 开启状态
				size: 220                     // panel大小
			},
			east: {
				style: "ui-widget-content", // panel相关
				minSize: 0,
				enableBar: true,           // bar相关
				barSize: 8,
				barButHeight: 50,
				barOpenContent: "",
				barClosedContent: "",
				barTooltip: "拖拉改变面板大小", // 拖拉bar 提示
				shrinkBtTip: "折叠/打开面板",   // 收缩按钮提示
				initClose: true,               // 初始化状态->是否关闭
				auto: false,                     // 自动收缩 以下是随时可变状态
				open: true,                     // panel 开启状态
				size: 150                      // panel 大小
			},
			center: {
				style: "ui-widget-content"
			}
		},
		init: function (element) {
			let north = $(element.rootClass + '.ui-jqLayout-north');
			let south = $(element.rootClass + '.ui-jqLayout-south');
			let west = $(element.rootClass + '.ui-jqLayout-west');
			let east = $(element.rootClass + '.ui-jqLayout-east');
			let center = $(element.rootClass + '.ui-jqLayout-center');
			// 添加 style
			north.addClass(element.options.north.style);
			south.addClass(element.options.south.style);
			west.addClass(element.options.west.style);
			east.addClass(element.options.east.style);
			center.addClass(element.options.center.style);
			// 重新定位
			north.css('height', element.options.north.size || 50 + 'px');
			south.css('height', element.options.south.size || 30 + 'px');
			let top = 0, bottom = 0;
			if (north.length > 0) {
				top = north.css('height');
			}
			if (south.length > 0) {
				bottom = south.css('height');
			}
			// top bottom
			west.css('top', top);
			west.css('bottom', bottom);
			east.css('top', top);
			east.css('bottom', bottom);
			center.css('top', top);
			center.css('bottom', bottom);
			center.css('padding-top', 0);
			center.css('padding-bottom', 0);
			if (element.options.west.initClose) {
				element.options.west.open = false;
				west.css('width', 0);
			}
			if (element.options.east.initClose) {
				element.options.east.open = false;
				east.css('width', 0);
			}
			// 添加bar
			if (element.options.west.enableBar) {
				let leftBar =
					'<div title="' + element.options.west.barTooltip +
						'" class="ui-state-default ui-jqLayout-controlBar-left" style="position: absolute;z-index: 668;cursor: e-resize;box-sizing: border-box;top:'
						+ top + ';bottom: ' + bottom + ';width: ' + element.options.west.barSize + 'px;left:' + element.options.west.size + 'px">\
						<div title="' + element.options.west.shrinkBtTip +
							'" class="ui-state-hover ui-jqLayout-controlBut" style="position: absolute;cursor: pointer;z-index: 888;left:-2px;right:0;top:0;bottom: 0;width:'+ (element.options.west.barSize + 2) + 'px; box-sizing: border-box;height:' +
							element.options.west.barButHeight + 'px;">' +
							(element.options.west.closed ? element.options.west.barClosedContent : element.options.west.barOpenContent) +
						'</div>\
					</div>';
				element.$element.append(leftBar);
			}
			if (element.options.east.enableBar) {
				let rightBar =
					'<div title="' + element.options.east.barTooltip +
					'" class="ui-state-default ui-jqLayout-controlBar-right" style="position: absolute;z-index: 668;cursor: e-resize;box-sizing: border-box;top:' + top + ';bottom:'
					+ bottom + ';width: ' + element.options.east.barSize + 'px;right:' +
					(element.options.east.open ? element.options.east.size : element.options.east.minSize) + 'px;">\
						<div title="' + element.options.east.shrinkBtTip +
					'" class="ui-state-hover ui-jqLayout-controlBut" style="position: absolute;cursor: pointer;z-index: 888;left:-1px;right: -1px;top:0;bottom: 0; width: ' + (element.options.east.barSize + 2) + 'px; box-sizing: border-box;height:' +
					element.options.east.barButHeight + 'px;">' +
					(element.options.east.closed ? element.options.east.barClosedContent : element.options.east.barOpenContent) +
					'</div>\
					</div>';
				element.$element.append(rightBar);
			}
			center.css('padding-left', element.options.west.barSize +  (element.options.west.initClose?0:element.options.west.size));
			center.css('padding-right', element.options.east.barSize + (element.options.east?0:element.options.east.size));
		},
		toggleWest: function (element) {
			let west = element.$element.find('.ui-jqLayout-west');
			let bar = element.$element.find('.ui-jqLayout-controlBar-left');
			let center = element.$element.find('.ui-jqLayout-center');
			if (element.options.west.open) { // 收缩
				west.animate({width: element.options.west.minSize}, 1000);
				bar.animate({left: element.options.west.minSize}, 1000);
				center.animate({
					"padding-left": element.options.west.minSize +
						element.options.west.barSize
				}, 1000);
				element.options.west.open = false;
			} else { // 打开
				west.animate({width: element.options.west.size}, 1000);
				bar.animate({left: element.options.west.size}, 1000);
				center.animate({
					"padding-left": element.options.west.barSize +
						element.options.west.size
				}, 1000);
				element.options.west.open = true;
			}
			return element.options.west.open;
		},
		toggleEast: function (element) {
			let east = element.$element.find('.ui-jqLayout-east');
			let bar = element.$element.find('.ui-jqLayout-controlBar-right');
			let center = element.$element.find('.ui-jqLayout-center');
			bar.css("left", "auto");
			if (element.options.east.open) {
				east.animate({width: element.options.east.minSize}, 1000);
				bar.animate({right: element.options.east.minSize}, 1000);
				center.animate({
					"padding-right": element.options.east.minSize +
						element.options.east.barSize
				}, 1000);
				element.options.east.open = false;
			} else {
				east.animate({width: element.options.east.size}, 1000);
				bar.animate({right: element.options.east.size}, 1000);
				center.animate({
					"padding-right": element.options.east.size +
						element.options.east.barSize
				}, 1000);
				element.options.east.open = true;
			}
			return element.options.east.open;
		}
	};
	$.fn.jqLayout = function (option) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.each(function () {
			var $this = $(this);
			var data = $this.data('cc.jqLayout');
			var options = typeof option == 'object' && option;
			// 如果没有初始化过, 就初始化它
			// 如果该元素没有初始化过(可能是新添加的元素), 就初始化它.
			if (!data) $this.data('cc.jqLayout', (data = new jqLayout(this, options)));
			// 调用方法
			if (typeof option === "string" && typeof data[option] == "function") {
				// 执行插件的方法
				data[option].apply(data, args);
			}
		});
	};
	$.fn.jqLayout.Constructor = jqLayout;
})(jQuery);