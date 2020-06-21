/**
 * skylark-domx-panels - The skylark panel plugins library for dom api extension
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-domx-panels/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query","skylark-domx-plugins","skylark-domx-popups/Dropdown","skylark-domx-toggles/TabButton","./panels"],function(t,o,e,s,n,r,i,a,d,p){var l=i.Plugin.inherit({klassName:"TabStrip",pluginName:"domx.panels.tabstrip",options:{selectors:{header:".nav-tabs",tab:'[data-toggle="tab"]',content:".tab-content",tabpane:".tab-pane"},droptabs:{selectors:{dropdown:"li.droptabs",dropdownMenu:"ul.dropdown-menu",dropdownTabs:"li",dropdownCaret:"b.caret",visibleTabs:">li:not(.dropdown)"},auto:!0,pullDropdownRight:!0}},_construct:function(t,o){this.overrided(t,o),this._velm=this.elmx(),this.$header=this._velm.$(this.options.selectors.header),this.$tabs=this.$header.find(this.options.selectors.tab),this.$content=this._velm.$(this.options.selectors.content),this.$tabpanes=this.$content.find(this.options.selectors.tabpane),this.$header.find('[data-toggle="dropdown"]').plugin(a.prototype.pluginName);var e=this;this.$tabs.each(function(t,o){r(o).plugin(d.prototype.pluginName,{target:e.$tabpanes[t]})})},arrange:function(){var t=this.options.droptabs.selectors.dropdownTabs,o=this.options.droptabs.selectors.visibleTabs;$container=this.$header;var e=$container.find(this.options.droptabs.selectors.dropdown),s=e.find(this.options.droptabs.selectors.dropdownMenu),n=r(">a",e).clone();r(this.options.droptabs.selectors.dropdownCaret,e);r(this.options.droptabs.selectors.dropdownCaret,n).remove(),this.options.droptabs.pullDropdownRight&&r(e).addClass("pull-right");var i=function(){return r(t,s)},a=function(){return r(o,$container)};var d,p,l=function(){return $container.outerWidth()-function(){var t=0;return r(a()).each(function(o){t+=parseInt(r(this).outerWidth(),10)}),t+=parseInt(r(e).outerWidth(),10)}()};if(l()<0){var h=l();r(a().get().reverse()).each(function(t){if(r(this).hasClass("always-visible")||(r(this).prependTo(s),h+=r(this).outerWidth()),h>=0)return!1})}if(l()>(d=i().first().clone().appendTo($container).css("position","fixed"),p=r(d).outerWidth(),r(d).remove(),p)){h=l();r(i()).each(function(t){if(o=r(this).clone().appendTo($container).css("position","fixed"),e=r(o).outerWidth(),r(o).remove(),!(e<h)||r(this).hasClass("always-dropdown"))return!1;var o,e;r(this).appendTo($container),h-=r(this).outerWidth()}),this.options.droptabs.pullDropdownRight||r(e).is(":last-child")||r(e).detach().insertAfter($container.find("li:last-child"))}i().length<=0?e.hide():e.show()},add:function(){},remove:function(){}});return i.register(l),p.TabStrip=l});
//# sourceMappingURL=sourcemaps/TabStrip.js.map