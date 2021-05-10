/**
 * skylark-domx-plugins-panels - The skylark panel plugins library for dom api extension
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-domx-plugins-panels/
 * @license MIT
 */
!function(t,e){var s=e.define,require=e.require,i="function"==typeof s&&s.amd,n=!i&&"undefined"!=typeof exports;if(!i&&!s){var a={};s=e.define=function(t,e,s){"function"==typeof s?(a[t]={factory:s,deps:e.map(function(e){return function(t,e){if("."!==t[0])return t;var s=e.split("/"),i=t.split("/");s.pop();for(var n=0;n<i.length;n++)"."!=i[n]&&(".."==i[n]?s.pop():s.push(i[n]));return s.join("/")}(e,t)}),resolved:!1,exports:null},require(t)):a[t]={factory:null,resolved:!0,exports:s}},require=e.require=function(t){if(!a.hasOwnProperty(t))throw new Error("Module "+t+" has not been defined");var module=a[t];if(!module.resolved){var s=[];module.deps.forEach(function(t){s.push(require(t))}),module.exports=module.factory.apply(e,s)||null,module.resolved=!0}return module.exports}}if(!s)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(t,require){t("skylark-domx-plugins-panels/panels",["skylark-langx/skylark","skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query"],function(t,e,s,i,n,a,o){var r={},l={BACKSPACE_KEYCODE:8,COMMA_KEYCODE:188,DELETE_KEYCODE:46,DOWN_ARROW_KEYCODE:40,ENTER_KEYCODE:13,TAB_KEYCODE:9,UP_ARROW_KEYCODE:38},p=function(t){return function(e){return e.keyCode===t}},d=p(l.BACKSPACE_KEYCODE),h=p(l.DELETE_KEYCODE),c=p(l.TAB_KEYCODE),u=p(l.UP_ARROW_KEYCODE),m=p(l.DOWN_ARROW_KEYCODE),f=/&[^\s]*;/;return e.mixin(r,{CONST:l,cleanInput:function(t){for(;f.test(t);)t=o("<i>").html(t).text();return o("<i>").text(t).html()},isBackspaceKey:d,isDeleteKey:h,isShiftHeld:function(t){return!0===t.shiftKey},isTabKey:c,isUpArrow:u,isDownArrow:m}),t.attach("domx.plugins.panels",r)}),t("skylark-domx-plugins-panels/panel",["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query","skylark-domx-plugins-base","skylark-domx-plugins-interact/resizable","./panels"],function(t,e,s,i,n,a,o,r,l){var p=o.Plugin.inherit({klassName:"Panel",pluginName:"domx.panels.panel",options:{resizable:{minWidth:320,minHeight:320,border:{classes:{all:"resizable-handle",top:"resizable-handle-n",left:"resizable-handle-w",right:"resizable-handle-e",bottom:"resizable-handle-s",topLeft:"resizable-handle-nw",topRight:"resizable-handle-ne",bottomLeft:"resizable-handle-sw",bottomRight:"resizable-handle-se"}}}},_construct:function(t,e){this.overrided(t,e),this._velm=this.elmx(),this.options.resizable&&(this._resizable=new r(t,{handle:{border:{directions:{top:!0,left:!0,right:!0,bottom:!0,topLeft:!0,topRight:!0,bottomLeft:!0,bottomRight:!0},classes:{all:this.options.resizable.border.classes.all,top:this.options.resizable.border.classes.top,left:this.options.resizable.border.classes.left,right:this.options.resizable.border.classes.right,bottom:this.options.resizable.border.classes.bottom,topLeft:this.options.resizable.border.classes.topLeft,topRight:this.options.resizable.border.classes.topRight,bottomLeft:this.options.resizable.border.classes.bottomLeft,bottomRight:this.options.resizable.border.classes.bottomRight}}},constraints:{minWidth:this.options.resizable.minWidth,minHeight:this.options.resizable.minHeight},started:()=>{this.isResizing=!0},moving:function(t){},stopped:()=>{this.isResizing=!1}}))}});return o.register(p),p}),t("skylark-domx-plugins-panels/collapsible",["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query","skylark-domx-plugins-base","skylark-domx-plugins-toggles/collapse","./panels","./panel"],function(t,e,s,i,n,a,o,r,l,p){var d=o.Plugin.inherit({klassName:"Collapsible",pluginName:"domx.panels.collapsible",options:{toggler:{selector:'.panel-heading [data-toggle="collapse"]'},body:{selector:".panel-panel"}},_construct:function(t,e){p.prototype._construct.call(this,t,e),this._expanded=!1,this.$toggle=this._velm.find(this.options.toggler.selector),this.$body=this._velm.find(this.options.body.selector),this.$toggle.on("click.panel",t=>{this.toggle()})},expand:function(){this.emit("expanding"),this.$body.plugin(r.prototype.pluginName).show(),this._expanded=!0,this.emit("expanded")},collapse:function(){this.emit("collapsing"),this.$body.plugin(r.prototype.pluginName).hide(),this._expanded=!1,this.emit("collapsed")},toggle:function(){this._expanded?this.collapse():this.expand()},full:function(){},unfull:function(){},toogleFull:function(){},close:function(){}});return o.register(d),l.Collapsible=d}),t("skylark-domx-plugins-panels/accordion",["skylark-langx/langx","skylark-domx-query","skylark-domx-velm","skylark-domx-plugins-base","./panels","./panel","./collapsible"],function(t,e,s,i,n,a,o){var r=a.inherit({klassName:"Accordion",pluginName:"domx.panels.accordion",options:{panel:{selector:"> .panel",template:null}},_construct:function(t,e){a.prototype._construct.call(this,t,e);var s=[];this._velm.$(this.options.panel.selector).forEach(t=>{var e=new r.Pane(t,{group:this});s.push(e)}),this._panels=s},panels:{get:function(){}},addPanel:function(){},remove:function(){},expand:function(){},expandAll:function(){},collapse:function(){},collapseAll:function(){}});return r.Pane=o.inherit({klassName:"AccordionPane",expand:function(){this.options.group.active&&this.options.group.active.collapse(),this.overrided(),this.options.group.active=this},collapse:function(){this.overrided(),this.options.group.active=null},toggle:function(){this.overrided()},remove:function(){this.overrided()}}),i.register(r),n.Accordion=r}),t("skylark-domx-plugins-panels/floating",["skylark-domx/noder","skylark-domx/eventer","skylark-domx/query","skylark-domx-plugins-base","skylark-domx-plugins-interact/movable","./panels","./panel"],function(t,e,s,i,n,a,o){"use strict";var r=[],l=o.inherit({klassName:"Floating",pluginName:"domx.panels.floating",options:{selectors:{headerPane:"",contentPane:"",footerPane:"",titlebar:"",buttons:{fullscreen:".button-fullscreen",maximize:".button-maximize",minimize:".button-minimize",close:".button-close"}},classes:{maximize:"maximize"},fixedContent:!0,initMaximized:!1,movable:{dragHandle:!1,dragCancel:null}},_construct:function(t,e){o.prototype._construct.call(this,t,e),this.$pane=s(this._elm),this.isOpened=!1,this.isMaximized=!1,this.options.movable&&(this._movable=new n(t,{handle:this.options.movable.dragHandle,starting:t=>{const e=this.options.movable.dragCancel,i=s(t.target).closest(e);return!i.length&&(!this.isResizing&&!this.isMaximized)}})),this.$close=this._velm.$(this.options.selectors.buttons.close),this.$maximize=this._velm.$(this.options.selectors.buttons.maximize),this.$minimize=this._velm.$(this.options.selectors.buttons.minimize),this.$fullscreen=this._velm.$(this.options.selectors.buttons.fullscreen),this.$close.off("click.window").on("click.window",t=>{this.close()}),this.$fullscreen.off("click.window").on("click.window",()=>{this.fullscreen()}),this.$maximize.off("click.window").on("click.window",()=>{this.maximize()}),this.$pane.off("keydown.window").on("keydown.window",t=>{this._keydown(t)}),r.push(this)},close:function(){this.trigger("closing",this),this.$pane.remove(),this.isOpened=!1,this.isMaximized=!1;var t=r.indexOf(this);t>-1&&r.splice(t,1),this.trigger("closed",this)},maximize:function(){if(this.$pane.get(0).focus(),this.isMaximized){let t=s(window),e=s(document);this.$pane.removeClass(this.options.classes.maximize);const i=(t.width()-this.options.modalWidth)/2+e.scrollLeft(),n=(t.height()-this.options.modalHeight)/2+e.scrollTop();this.$pane.css({width:this.modalData.width?this.modalData.width:this.options.modalWidth,height:this.modalData.height?this.modalData.height:this.options.modalHeight,left:this.modalData.left?this.modalData.left:i,top:this.modalData.top?this.modalData.top:n}),this.isMaximized=!1}else this.modalData={width:this.$pane.width(),height:this.$pane.height(),left:this.$pane.offset().left,top:this.$pane.offset().top},this.$pane.addClass(this.options.classes.maximize),this.$pane.css({width:"100%",height:"100%",left:0,top:0}),this.isMaximized=!0;e.resized(this._elm)},fullscreen:function(){this.$pane.get(0).focus(),t.fullscreen(this.$pane[0])},_keydown:function(t){if(!this.options.keyboard)return!1;const e=t.keyCode||t.which||t.charCode;t.ctrlKey||t.metaKey,t.altKey||t.metaKey;switch(e){case 81:this.close()}}});return e.on(window,"resize.window",()=>{for(let t=0;t<r.length;t++)e.resized(r[t]._elm)}),a.Floating=l}),t("skylark-domx-plugins-panels/pagination",["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query","skylark-domx-plugins-base","./panels","./panel"],function(t,e,s,i,n,a,o,r,l){"use strict";var p=l.inherit({klassName:"Pagination",pluginName:"domx.panels.pagination",options:{tagName:"ul",css:"",selectors:{firstNavi:"li[aria-label='first']",prevNavi:"li[aria-label='prev']",nextNavi:"li[aria-label='next']",lastNavi:"li[aria-label='last']",numericNavi:"li:not([aria-label])",numericTxt:"a"},totalPages:7,maxButtonsVisible:5,currentPage:1},state:{totalPages:Number,currentPage:Number},_construct:function(t,e){l.prototype._construct.call(this,t,e),this.$first=this._velm.$(this.options.selectors.firstNavi),this.$prev=this._velm.$(this.options.selectors.prevNavi),this.$last=this._velm.$(this.options.selectors.lastNavi),this.$next=this._velm.$(this.options.selectors.nextNavi),this.$numeric=this._velm.$(this.options.selectors.numericNavi);var s=this;function i(t){var e=a(t);return!e.is(".disabled,.active")&&e}this.$first.click(function(){i(this)&&s.currentPage(1)}),this.$prev.click(function(){i(this)&&s.currentPage(s.currentPage()-1)}),this.$last.click(function(){i(this)&&s.currentPage(s.totalPages())}),this.$next.click(function(){i(this)&&s.currentPage(s.currentPage()+1)}),this.$numeric.click(function(){var t=i(this);if(t){var e=t.find(s.options.selectors.numericTxt).text(),n=parseInt(e);s.currentPage(n)}}),this._currentPage=this.options.currentPage,this._totalPages=this.options.totalPages,this._refresh({currentPage:!0,totalPages:!0})},_refresh:function(t){var e=this;if(t.currentPage||t.totalPages){var s=e.currentPage(),i=e.totalPages();!function(t,s){var i=Math.min(s,e.options.maxButtonsVisible),n=1,a=n+i-1;for(;t<n||t>a;)t>a?(n+=i,(a+=i)>s&&(n-=a-s,a=s)):(a-=i,(n-=i)<0&&(a+=n+i,n=1));t===a&&1!=s&&(a=(n=t-1)+i-1)>=s&&(n-=a-s,a=s);n===t&&1!=s&&1!=t&&(n=(a=t+1)-(i-1));var o=e.$numeric.size(),r=a-n+1,l=0;e.$numeric.filter(".active").removeClass("active");for(;l<r;){var p=l+n,d=e.$numeric.eq(l);d.find(e.options.selectors.numericTxt).text(l+n).show(),p==t&&d.addClass("active"),l++}for(;l<o;)e.$numeric.eq(l).find(e.options.selectors.numericTxt).text(l+n).hide(),l++}(s,i),function(t,s){if(t<1)throw"Page can't be less than 1";if(t>s)throw"Page is bigger than total pages";if(s<1)throw"Total Pages can't be less than 1";1==t?(e.$first.addClass("disabled"),e.$prev.addClass("disabled")):(e.$first.removeClass("disabled"),e.$prev.removeClass("disabled"));t==s?(e.$last.addClass("disabled"),e.$next.addClass("disabled")):(e.$last.removeClass("disabled"),e.$next.removeClass("disabled"))}(s,i)}},currentPage:function(t){return void 0!==t?(this._currentPage=t,this._refresh({currentPage:!0}),this):this._currentPage},totalPages:function(t){return void 0!==t?(this._totalPages=t,this._refresh({totalPages:!0}),this):this._totalPages}});return o.register(p),r.Pagination=p}),t("skylark-domx-plugins-panels/tabstrip",["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query","skylark-domx-plugins-base","skylark-domx-plugins-popups/Dropdown","skylark-domx-plugins-toggles/tab","./panels","./panel"],function(t,e,s,i,n,a,o,r,l,p,d){var h=d.inherit({klassName:"TabStrip",pluginName:"domx.panels.tabstrip",options:{selectors:{header:".nav-tabs",tab:'[data-toggle="tab"]',content:".tab-content",tabpane:".tab-pane"},droptabs:{selectors:{dropdown:"li.droptabs",dropdownMenu:"ul.dropdown-menu",dropdownTabs:"li",dropdownCaret:"b.caret",visibleTabs:">li:not(.dropdown)"},auto:!0,pullDropdownRight:!0}},_construct:function(t,e){d.prototype._construct.call(this,t,e),this.$header=this._velm.$(this.options.selectors.header),this.$tabs=this.$header.find(this.options.selectors.tab),this.$content=this._velm.$(this.options.selectors.content),this.$tabpanes=this.$content.find(this.options.selectors.tabpane),this.$header.find('[data-toggle="dropdown"]').plugin(r.prototype.pluginName);var s=this;this.$tabs.each(function(t,e){a(e).plugin(l.prototype.pluginName,{target:s.$tabpanes[t]})})},arrange:function(){var t=this.options.droptabs.selectors.dropdownTabs,e=this.options.droptabs.selectors.visibleTabs;$container=this.$header;var s=$container.find(this.options.droptabs.selectors.dropdown),i=s.find(this.options.droptabs.selectors.dropdownMenu),n=a(">a",s).clone();a(this.options.droptabs.selectors.dropdownCaret,s);a(this.options.droptabs.selectors.dropdownCaret,n).remove(),this.options.droptabs.pullDropdownRight&&a(s).addClass("pull-right");var o=function(){return a(t,i)},r=function(){return a(e,$container)};var l,p,d=function(){return $container.outerWidth()-function(){var t=0;return a(r()).each(function(e){t+=parseInt(a(this).outerWidth(),10)}),t+=parseInt(a(s).outerWidth(),10)}()};if(d()<0){var h=d();a(r().get().reverse()).each(function(t){if(a(this).hasClass("always-visible")||(a(this).prependTo(i),h+=a(this).outerWidth()),h>=0)return!1})}if(d()>(l=o().first().clone().appendTo($container).css("position","fixed"),p=a(l).outerWidth(),a(l).remove(),p)){var h=d();a(o()).each(function(t){if(e=a(this).clone().appendTo($container).css("position","fixed"),s=a(e).outerWidth(),a(e).remove(),!(s<h)||a(this).hasClass("always-dropdown"))return!1;var e,s;a(this).appendTo($container),h-=a(this).outerWidth()}),this.options.droptabs.pullDropdownRight||a(s).is(":last-child")||a(s).detach().insertAfter($container.find("li:last-child"))}o().length<=0?s.hide():s.show()},add:function(){},remove:function(){}});return o.register(h),p.TabStrip=h}),t("skylark-domx-plugins-panels/toolbar",["skylark-langx/langx","skylark-domx-query","skylark-domx-plugins-base","./panels","./panel"],function(t,e,s,i,n){var a=n.inherit({klassName:"Toolbar",pluginName:"domx.panels.toolbar",options:{toolbarFloat:!0,toolbarHidden:!1,toolbarFloatOffset:0,template:'<div class="domx-toolbar"><ul></ul></div>',separator:{template:'<li><span class="separator"></span></li>'}},_construct:function(t,s){var i,a;n.prototype._construct.call(this,t,s),this.opts=this.options,this.wrapper=e(this._elm),this.list=this.wrapper.find("ul"),this.list.on("click",function(t){return!1}),this.wrapper.on("mousedown",(a=this,function(t){return a.list.find(".menu-on").removeClass(".menu-on")})),e(document).on("mousedown.toolbar",function(t){return function(e){return t.list.find(".menu-on").removeClass("menu-on")}}(this)),!this.opts.toolbarHidden&&this.opts.toolbarFloat&&(this.wrapper.css("top",this.opts.toolbarFloatOffset),i=0,function(t){return function(){return t.wrapper.css("position","static"),t.wrapper.width("auto"),t.editor.editable.util.reflow(t.wrapper),t.wrapper.width(t.wrapper.outerWidth()),t.wrapper.css("left",t.editor.editable.util.os.mobile?t.wrapper.position().left:t.wrapper.offset().left),t.wrapper.css("position",""),i=t.wrapper.outerHeight(),t.editor.placeholderEl.css("top",i),!0}}(this))},addToolItem:function(t){return e(t._elm).appendTo(this.list),this},addSeparator:function(){return e(this.options.separator.template).appendTo(this.list),this}});return s.register(a),i.Toolbar=a}),t("skylark-domx-plugins-panels/wizard",["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query","skylark-domx-plugins-base","./panels","./panel"],function(t,e,s,i,n,a,o,r,l){var p=l.inherit({klassName:"Wizard",pluginName:"domx.panels.wizard",options:{disablePreviousStep:!1,selectedItem:{step:-1}},_construct:function(e,s){l.prototype._construct.call(this,e,s),this.$element=this.$(),this.options.disablePreviousStep="previous"===this.$element.attr("data-restrict")||this.options.disablePreviousStep,this.currentStep=this.options.selectedItem.step,this.numSteps=this.$element.find(".steps li").length,this.$prevBtn=this.$element.find("button.btn-prev"),this.$nextBtn=this.$element.find("button.btn-next");var i=this.$nextBtn.children().detach();this.nextText=t.trim(this.$nextBtn.text()),this.$nextBtn.append(i);var n=this.$element.children(".steps-container");0===n.length&&(n=this.$element,this.$element.addClass("no-steps-container"),window&&window.console&&window.console.warn&&window.console.warn('please update your wizard markup to include ".steps-container" as seen in http://getfuelux.com/javascript.html#wizard-usage-markup')),n=n.find(".steps"),this.$prevBtn.on("click.fu.wizard",t.proxy(this.previous,this)),this.$nextBtn.on("click.fu.wizard",t.proxy(this.next,this)),n.on("click.fu.wizard","li.complete",t.proxy(this.stepclicked,this)),this.selectedItem(this.options.selectedItem),this.options.disablePreviousStep&&(this.$prevBtn.attr("disabled",!0),this.$element.find(".steps").addClass("previous-disabled"))},destroy:function(){return this.$element.remove(),this.$element[0].outerHTML},addSteps:function(t){var e,s,i,n,o,r,l=[].slice.call(arguments).slice(1),p=this.$element.find(".steps"),d=this.$element.find(".step-content");for(t=-1===t||t>this.numSteps+1?this.numSteps+1:t,l[0]instanceof Array&&(l=l[0]),o=p.find("li:nth-child("+t+")"),n=d.find(".step-pane:nth-child("+t+")"),o.length<1&&(o=null),e=0,s=l.length;e<s;e++)(r=a('<li data-step="'+t+'"><span class="badge badge-info"></span></li>')).append(l[e].label||"").append('<span class="chevron"></span>'),r.find(".badge").append(l[e].badge||t),(i=a('<div class="step-pane" data-step="'+t+'"></div>')).append(l[e].pane||""),o?(o.before(r),n.before(i)):(p.append(r),d.append(i)),t++;this.syncSteps(),this.numSteps=p.find("li").length,this.setState()},removeSteps:function(t,e){var s,i="nextAll",n=0,o=this.$element.find(".steps"),r=this.$element.find(".step-content");e=void 0!==e?e:1,t>o.find("li").length?s=o.find("li:last"):(s=o.find("li:nth-child("+t+")").prev()).length<1&&(i="children",s=o),s[i]().each(function(){var t=a(this),s=t.attr("data-step");if(!(n<e))return!1;t.remove(),r.find('.step-pane[data-step="'+s+'"]:first').remove(),n++}),this.syncSteps(),this.numSteps=o.find("li").length,this.setState()},setState:function(){var t=this.currentStep>1,e=1===this.currentStep,i=this.currentStep===this.numSteps;this.options.disablePreviousStep||this.$prevBtn.attr("disabled",!0===e||!1===t);var n=this.$nextBtn.attr("data-last");if(n){this.lastText=n;var o=this.nextText;!0===i?(o=this.lastText,this.$element.addClass("complete")):this.$element.removeClass("complete");var r=this.$nextBtn.children().detach();this.$nextBtn.text(o).append(r)}var l=this.$element.find(".steps li");l.removeClass("active").removeClass("complete"),l.find("span.badge").removeClass("badge-info").removeClass("badge-success");var p=".steps li:lt("+(this.currentStep-1)+")",d=this.$element.find(p);d.addClass("complete"),d.find("span.badge").addClass("badge-success");var h=".steps li:eq("+(this.currentStep-1)+")",c=this.$element.find(h);c.addClass("active"),c.find("span.badge").addClass("badge-info");var u=this.$element.find(".step-content"),m=c.attr("data-step");u.find(".step-pane").removeClass("active"),u.find('.step-pane[data-step="'+m+'"]:first').addClass("active"),this.$element.find(".steps").first().attr("style","margin-left: 0");var f=0;this.$element.find(".steps > li").each(function(){f+=a(this).outerWidth()});var g=0;if(g=this.$element.find(".actions").length?this.$element.width()-this.$element.find(".actions").first().outerWidth():this.$element.width(),f>g){var v=f-g;this.$element.find(".steps").first().attr("style","margin-left: -"+v+"px"),this.$element.find("li.active").first().position().left<200&&((v+=this.$element.find("li.active").first().position().left-200)<1?this.$element.find(".steps").first().attr("style","margin-left: 0"):this.$element.find(".steps").first().attr("style","margin-left: -"+v+"px"))}if(void 0!==this.initialized){var b=s.create("changed.fu.wizard");this.$element.trigger(b,{step:this.currentStep})}this.initialized=!0},stepclicked:function(t){var e=a(t.currentTarget),i=this.$element.find(".steps li").index(e);if(!(i<this.currentStep&&this.options.disablePreviousStep)){var n=s.create("stepclicked.fu.wizard");this.$element.trigger(n,{step:i+1}),n.isDefaultPrevented()||(this.currentStep=i+1,this.setState())}},syncSteps:function(){var t=1,e=this.$element.find(".steps"),s=this.$element.find(".step-content");e.children().each(function(){var e=a(this),i=e.find(".badge"),n=e.attr("data-step");isNaN(parseInt(i.html(),10))||i.html(t),e.attr("data-step",t),s.find('.step-pane[data-step="'+n+'"]:last').attr("data-step",t),t++})},previous:function(){if(!this.options.disablePreviousStep&&1!==this.currentStep){var t=s.create("actionclicked.fu.wizard");if(this.$element.trigger(t,{step:this.currentStep,direction:"previous"}),!t.isDefaultPrevented()&&(this.currentStep-=1,this.setState(),this.$prevBtn.is(":focus"))){var e=this.$element.find(".active").find("input, select, textarea")[0];void 0!==e?a(e).focus():0===this.$element.find(".active input:first").length&&this.$prevBtn.is(":disabled")&&this.$nextBtn.focus()}}},next:function(){var t=s.create("actionclicked.fu.wizard");if(this.$element.trigger(t,{step:this.currentStep,direction:"next"}),!t.isDefaultPrevented()&&(this.currentStep<this.numSteps?(this.currentStep+=1,this.setState()):this.$element.trigger("finished.fu.wizard"),this.$nextBtn.is(":focus"))){var e=this.$element.find(".active").find("input, select, textarea")[0];void 0!==e?a(e).focus():0===this.$element.find(".active input:first").length&&this.$nextBtn.is(":disabled")&&this.$prevBtn.focus()}},selectedItem:function(t){var e,s;return t?(s=t.step||-1,1<=(s=Number(this.$element.find('.steps li[data-name="'+s+'"]').first().attr("data-step"))||Number(s))&&s<=this.numSteps?(this.currentStep=s,this.setState()):(s=this.$element.find(".steps li.active:first").attr("data-step"),isNaN(s)||(this.currentStep=parseInt(s,10),this.setState())),e=this):(e={step:this.currentStep},this.$element.find(".steps li.active:first[data-name]").length&&(e.stepname=this.$element.find(".steps li.active:first").attr("data-name"))),e}});return o.register(p),r.Wizard=p}),t("skylark-domx-plugins-panels/main",["./panels","./accordion","./collapsible","./floating","./pagination","./panel","./tabstrip","./toolbar","./wizard"],function(t){return t}),t("skylark-domx-plugins-panels",["skylark-domx-plugins-panels/main"],function(t){return t})}(s),!i){var o=require("skylark-langx-ns");n?module.exports=o:e.skylarkjs=o}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-domx-plugins-panels.js.map
