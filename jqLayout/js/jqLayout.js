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
		// left control bar clicked
		this.$element.find('.ui-jqLayout-controlBar-left,.ui-jqLayout-controlBar-left > .ui-jqLayout-controlBut').
		on('click', function () {
			privateMembers.toggleWest($this,!$(this).hasClass('ui-jqLayout-controlBar-left'));
			return false;
		});
		this.$element.find('.ui-jqLayout-controlBar-right,' +
			'.ui-jqLayout-controlBar-right > .ui-jqLayout-controlBut').on('click', function () {
			privateMembers.toggleEast($this,!$(this).hasClass('ui-jqLayout-controlBar-right'));
			return false;
		});
		this.$element.on('mouseenter','.ui-jqLayout-east', function () {
			if($this.options.east.automaticShrinkage){
				if (!$this.options.east.isOpen){
					let east = $this.$element.find('.ui-jqLayout-east');
					let bar = $this.$element.find('.ui-jqLayout-controlBar-right');
					let center = $this.$element.find('.ui-jqLayout-center');
					east.animate( {width:$this.options.east.size}, 1000 );
					bar.animate( {right:$this.options.east.size}, 1000 );
					center.animate( {"padding-right": $this.options.east.size +
							$this.options.east.barWidth}, 1000 );
					$this.options.east.isOpen =true;
				}
			}
			return false;
		});
		this.$element.on('mouseleave','.ui-jqLayout-east', function () {
			if($this.options.east.automaticShrinkage){
				if ($this.options.east.isOpen){
					let east = $this.$element.find('.ui-jqLayout-east');
					let bar = $this.$element.find('.ui-jqLayout-controlBar-right');
					let center = $this.$element.find('.ui-jqLayout-center');
					east.animate( {width:$this.options.east.closedWidth}, 1000 );
					bar.animate( {right:$this.options.east.closedWidth}, 1000 );
					center.animate( {"padding-right": $this.options.east.closedWidth +
							$this.options.east.barWidth}, 1000 );
					$this.options.east.isOpen =false;
				}
			}
			return false;
		});
		this.$element.on('mouseenter','.ui-jqLayout-west', function () {
			if($this.options.west.automaticShrinkage){
				let west = $this.$element.find('.ui-jqLayout-west');
				let bar = $this.$element.find('.ui-jqLayout-controlBar-left');
				let center = $this.$element.find('.ui-jqLayout-center');
				if (!$this.options.west.isOpen) {
					west.animate( {width:$this.options.west.size}, 1000 );
					bar.animate({left:$this.options.west.size},1000);
					center.animate({"padding-left":$this.options.west.size +
							$this.options.west.barWidth},1000);
					$this.options.west.isOpen =true;
				}
			}
			return false;
		});
		this.$element.on('mouseleave','.ui-jqLayout-west', function () {
			if($this.options.west.automaticShrinkage) {
				let west = $this.$element.find('.ui-jqLayout-west');
				let bar = $this.$element.find('.ui-jqLayout-controlBar-left');
				let center = $this.$element.find('.ui-jqLayout-center');
				if ($this.options.west.isOpen) { // 收缩
					west.animate({width: $this.options.west.closedWidth}, 1000);
					bar.animate({left: $this.options.west.closedWidth}, 1000);
					center.animate({
						"padding-left": $this.options.west.closedWidth +
							$this.options.west.barWidth
					}, 1000);
					$this.options.west.isOpen = false;
				}
			}
			return false;
		});
		$(this.rootClass).tooltip({ show: { effect: "blind", duration: 100,delay:$this.options.toolTipDelay },track: true});
	};
	jqLayout.prototype = {
		// 切换面板的开启闭合
		togglePanel: function (panel,automaticShrinkage) {
			switch (panel) {
				case "west":
					return privateMembers.toggleWest($(this),automaticShrinkage);
				case "east":
					return privateMembers.toggleEast($(this),automaticShrinkage);
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
			toolTipDelay: 2000,
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
				size: 220,
				enableBar: true,
				barWidth: 8,
				barButHeight: 50,
				isOpen: true,
				barOpenContent: "",
				barClosedContent: "",
				barTooltip:"打开/隐藏面板",
				closedWidth: 50,
				automaticShrinkage: false
			},
			east: {
				style: "ui-widget-content",
				size: 150,
				enableBar: true,
				barWidth: 8,
				barButHeight: 50,
				isOpen: false,
				barOpenContent: "",
				barClosedContent: "",
				barTooltip:"打开/隐藏面板",
				closedWidth: 0,
				automaticShrinkage: false
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
			north.addClass(element.options.northStyle);
			south.addClass(element.options.southStyle);
			west.addClass(element.options.westStyle);
			east.addClass(element.options.eastStyle);
			center.addClass(element.options.centerStyle);
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
			let paddingLeft = element.options.west.isOpen ? element.options.west.size : 0,
				paddingRight = element.options.east.isOpen ? element.options.east.size : 0;
			if (element.options.west.enableBar) {
				paddingLeft += element.options.west.barWidth;
				// 添加controlBar
				let leftBar = '<div title="' + element.options.west.barTooltip +
					'" class="ui-state-default ui-jqLayout-controlBar-left" style="box-sizing: border-box;top:' + top + ';bottom: ' +
					bottom + ';width: ' + element.options.west.barWidth + 'px;left:' +
					(element.options.west.isOpen?element.options.west.size:element.options.west.closedWidth) + 'px">\
				<div title="'+ element.options.west.barTooltip +
					'" class="ui-state-hover ui-jqLayout-controlBut" style="box-sizing: border-box;height:' +
					element.options.west.barButHeight + 'px;width: ' +
					element.options.west.barWidth + 'px;">' +
					(element.options.west.isOpen ? element.options.west.barOpenContent : element.options.west.barClosedContent) + '</div>\
				</div>';
				element.$element.append(leftBar);
			}
			if (element.options.east.enableBar) {
				paddingRight += element.options.east.barWidth;
				let rightBar = '<div title="' + element.options.east.barTooltip +
					'" class="ui-state-default ui-jqLayout-controlBar-right" style="box-sizing: border-box;top:' + top + ';bottom:'
					+ bottom + ';width: ' + element.options.east.barWidth + 'px;right:' +
					(element.options.east.isOpen?element.options.east.size:element.options.east.closedWidth) + 'px;">\
				<div title="' + element.options.east.barTooltip +
					'" class="ui-state-hover ui-jqLayout-controlBut" style="box-sizing: border-box;height:' +
					element.options.east.barButHeight + ';width: ' + element.options.east.barWidth + 'px;">' +
					(element.options.east.isOpen ? element.options.east.barOpenContent : element.options.east.barClosedContent) + '</div>\
				</div>';
				element.$element.append(rightBar);
			}
			west.css('width', paddingLeft - element.options.west.barWidth + 'px');
			east.css('width', paddingRight - element.options.east.barWidth  + 'px');
			center.css('padding-left', paddingLeft);
			center.css('padding-right', paddingRight);
		},
		toggleWest:function (element,automaticShrinkage) {
			let west = element.$element.find('.ui-jqLayout-west');
			let bar = element.$element.find('.ui-jqLayout-controlBar-left');
			let center = element.$element.find('.ui-jqLayout-center');
			if (element.options.west.isOpen) { // 收缩
				west.animate( {width:element.options.west.closedWidth}, 1000 );
				bar.animate({left:element.options.west.closedWidth},1000);
				center.animate({"padding-left":element.options.west.closedWidth +
						element.options.west.barWidth},1000);
				element.options.west.isOpen =false;
			} else { // 打开
				west.animate( {width:element.options.west.size}, 1000 );
				bar.animate({left:element.options.west.size},1000);
				center.animate({"padding-left":element.options.west.size +
						element.options.west.barWidth},1000);
				element.options.west.isOpen =true;
			}
			element.options.west.automaticShrinkage = automaticShrinkage;
			return element.options.west.isOpen;
		},
		toggleEast:function (element,automaticShrinkage) {
			let east = element.$element.find('.ui-jqLayout-east');
			let bar = element.$element.find('.ui-jqLayout-controlBar-right');
			let center = element.$element.find('.ui-jqLayout-center');
			if (element.options.east.isOpen){
				east.animate( {width:element.options.east.closedWidth}, 1000 );
				bar.animate( {right:element.options.east.closedWidth}, 1000 );
				center.animate( {"padding-right": element.options.east.closedWidth +
						element.options.east.barWidth}, 1000 );
				element.options.east.isOpen =false;
			}else{
				east.animate( {width:element.options.east.size}, 1000 );
				bar.animate( {right:element.options.east.size}, 1000 );
				center.animate( {"padding-right": element.options.east.size +
						element.options.east.barWidth}, 1000 );
				element.options.east.isOpen =true;
			}
			element.options.east.automaticShrinkage = automaticShrinkage;
			return element.options.east.isOpen;
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