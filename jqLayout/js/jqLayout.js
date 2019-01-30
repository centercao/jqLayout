/* *******************************
* ********************************/
;(function ($) {
	var jqLayout = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, this.defaults, options);
		let $this = this;
		$(this.$element).addClass('jqLayout');
		this.rootClass = ' .jqLayout ';
		if (this.options.className) {
			this.rootClass += '.' + this.options.className + ' ';
			$(this.$element).addClass(this.options.className);
		}


		// 初始化
		this.init();

		function sizeChange() {

		}

		// 注册事件
		// left control bar clicked
		this.$element.find('.ui-jqLayout-controlBar-left,.ui-jqLayout-controlBar-left > .ui-jqLayout-controlBut').on('click', function () {
			let west = $this.$element.find('.ui-jqLayout-west');
			let bar = $this.$element.find('.ui-jqLayout-controlBar-left');
			let center = $this.$element.find('.ui-jqLayout-center');
			if ($this.options.west.isOpen) { // 收缩
				west.animate( {width:$this.options.west.closedWidth}, 1000 );
				bar.animate({left:$this.options.west.closedWidth},1000);
				center.animate({"padding-left":$this.options.west.closedWidth +
						$this.options.west.barWidth},1000);
				$this.options.west.isOpen =false;
			} else { // 打开
				west.animate( {width:$this.options.west.size}, 1000 );
				bar.animate({left:$this.options.west.size},1000);
				center.animate({"padding-left":$this.options.west.size +
						$this.options.west.barWidth},1000);
				$this.options.west.isOpen =true;
			}
			$this.options.west.automaticShrinkage = !$(this).hasClass('ui-jqLayout-controlBar-left');
			return false;
		});
		this.$element.find('.ui-jqLayout-controlBar-right,' +
			'.ui-jqLayout-controlBar-right > .ui-jqLayout-controlBut').on('click', function () {
			let east = $this.$element.find('.ui-jqLayout-east');
			let bar = $this.$element.find('.ui-jqLayout-controlBar-right');
			let center = $this.$element.find('.ui-jqLayout-center');
			if ($this.options.east.isOpen){
				east.animate( {width:$this.options.east.closedWidth}, 1000 );
				bar.animate( {right:$this.options.east.closedWidth}, 1000 );
				center.animate( {"padding-right": $this.options.east.closedWidth +
						$this.options.east.barWidth}, 1000 );
				$this.options.east.isOpen =false;
			}else{
				east.animate( {width:$this.options.east.size}, 1000 );
				bar.animate( {right:$this.options.east.size}, 1000 );
				center.animate( {"padding-right": $this.options.east.size +
						$this.options.east.barWidth}, 1000 );
				$this.options.east.isOpen =true;
			}
			$this.options.east.automaticShrinkage = !$(this).hasClass('ui-jqLayout-controlBar-right');
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
		// $('.jqLayout').tooltip({ show: { effect: "blind", duration: 100,delay:$this.options.toolTipDelay }});
	};
	jqLayout.prototype = {
		defaults: {
			northStyle:"ui-widget-header",
			southStyle:"ui-widget-header",
			westStyle:"ui-widget-content",
			eastStyle:"ui-widget-content",
			centerStyle:"ui-widget-content",
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
				closedWidth: 50,
				automaticShrinkage:false
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
				closedWidth: 0,
				automaticShrinkage:false
			},
			center: {
				style: "ui-widget-content"
			}
		},
		init: function () {
			let north = $(this.rootClass + '.ui-jqLayout-north');
			let south = $(this.rootClass + '.ui-jqLayout-south');
			let west = $(this.rootClass + '.ui-jqLayout-west');
			let east = $(this.rootClass + '.ui-jqLayout-east');
			let center = $(this.rootClass + '.ui-jqLayout-center');
			north.addClass(this.options.northStyle);
			south.addClass(this.options.southStyle);
			west.addClass(this.options.westStyle);
			east.addClass(this.options.eastStyle);
			center.addClass(this.options.centerStyle);
			north.css('height', this.options.north.size || 50 + 'px');
			south.css('height', this.options.south.size || 30 + 'px');
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
			let paddingLeft = this.options.west.isOpen ? this.options.west.size : 0,
				paddingRight = this.options.east.isOpen ? this.options.east.size : 0;
			if (this.options.west.enableBar) {
				paddingLeft += this.options.west.barWidth;
				// 添加controlBar
				let leftBar = '<div class="ui-state-default ui-jqLayout-controlBar-left" style="box-sizing: border-box;top:' + top + ';bottom: ' +
					bottom + ';width: ' + this.options.west.barWidth + 'px;left:' +
					(this.options.west.isOpen?this.options.west.size:this.options.west.closedWidth) + 'px">\
				<div class="ui-state-hover ui-jqLayout-controlBut" style="box-sizing: border-box;height:' +
					this.options.west.barButHeight + 'px;width: ' +
					this.options.west.barWidth + 'px;">' +
					(this.options.west.isOpen ? this.options.west.barOpenContent : this.options.west.barClosedContent) + '</div>\
				</div>';
				this.$element.append(leftBar);
			}
			if (this.options.east.enableBar) {
				paddingRight += this.options.east.barWidth;
				let rightBar = '<div class="ui-state-default ui-jqLayout-controlBar-right" style="box-sizing: border-box;top:' + top + ';bottom:'
					+ bottom + ';width: ' + this.options.east.barWidth + 'px;right:' +
					(this.options.east.isOpen?this.options.east.size:this.options.east.closedWidth) + 'px;">\
				<div class="ui-state-hover ui-jqLayout-controlBut" style="box-sizing: border-box;height:' +
					this.options.east.barButHeight + ';width: ' + this.options.east.barWidth + 'px;">' +
					(this.options.east.isOpen ? this.options.east.barOpenContent : this.options.east.barClosedContent) + '</div>\
				</div>';
				this.$element.append(rightBar);
			}
			west.css('width', paddingLeft - this.options.west.barWidth + 'px');
			east.css('width', paddingRight - this.options.east.barWidth  + 'px');
			center.css('padding-left', paddingLeft);
			center.css('padding-right', paddingRight);
			// 注册事件
		},
		addTree: function (name, url, id, pId, icon, active) {
		},
		collapseTreeView: function () {
			let el = this.$element.find('.rootView-ul');
			if (el.hasClass('treeView-collapse')) {
				el.removeClass('treeView-collapse');
			} else {
				el.addClass('treeView-collapse');
			}
		}
	};
	var private_methods = {};
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