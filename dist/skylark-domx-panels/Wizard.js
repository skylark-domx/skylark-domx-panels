/**
 * skylark-domx-panels - The skylark panel plugins library for dom api extension
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-domx-panels/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query","skylark-domx-plugins","./panels"],function(t,e,i,s,n,a,r,d){var l=r.Plugin.inherit({klassName:"Wizard",pluginName:"domx.wizard",options:{disablePreviousStep:!1,selectedItem:{step:-1}},_construct:function(e,i){this.overrided(e,i),this.$element=this.$(),this.options.disablePreviousStep="previous"===this.$element.attr("data-restrict")||this.options.disablePreviousStep,this.currentStep=this.options.selectedItem.step,this.numSteps=this.$element.find(".steps li").length,this.$prevBtn=this.$element.find("button.btn-prev"),this.$nextBtn=this.$element.find("button.btn-next");var s=this.$nextBtn.children().detach();this.nextText=t.trim(this.$nextBtn.text()),this.$nextBtn.append(s);var n=this.$element.children(".steps-container");0===n.length&&(n=this.$element,this.$element.addClass("no-steps-container"),window&&window.console&&window.console.warn&&window.console.warn('please update your wizard markup to include ".steps-container" as seen in http://getfuelux.com/javascript.html#wizard-usage-markup')),n=n.find(".steps"),this.$prevBtn.on("click.fu.wizard",t.proxy(this.previous,this)),this.$nextBtn.on("click.fu.wizard",t.proxy(this.next,this)),n.on("click.fu.wizard","li.complete",t.proxy(this.stepclicked,this)),this.selectedItem(this.options.selectedItem),this.options.disablePreviousStep&&(this.$prevBtn.attr("disabled",!0),this.$element.find(".steps").addClass("previous-disabled"))},destroy:function(){return this.$element.remove(),this.$element[0].outerHTML},addSteps:function(t){var e,i,s,n,r,d,l=[].slice.call(arguments).slice(1),p=this.$element.find(".steps"),h=this.$element.find(".step-content");for(t=-1===t||t>this.numSteps+1?this.numSteps+1:t,l[0]instanceof Array&&(l=l[0]),r=p.find("li:nth-child("+t+")"),n=h.find(".step-pane:nth-child("+t+")"),r.length<1&&(r=null),e=0,i=l.length;e<i;e++)(d=a('<li data-step="'+t+'"><span class="badge badge-info"></span></li>')).append(l[e].label||"").append('<span class="chevron"></span>'),d.find(".badge").append(l[e].badge||t),(s=a('<div class="step-pane" data-step="'+t+'"></div>')).append(l[e].pane||""),r?(r.before(d),n.before(s)):(p.append(d),h.append(s)),t++;this.syncSteps(),this.numSteps=p.find("li").length,this.setState()},removeSteps:function(t,e){var i,s="nextAll",n=0,r=this.$element.find(".steps"),d=this.$element.find(".step-content");e=void 0!==e?e:1,t>r.find("li").length?i=r.find("li:last"):(i=r.find("li:nth-child("+t+")").prev()).length<1&&(s="children",i=r),i[s]().each(function(){var t=a(this),i=t.attr("data-step");if(!(n<e))return!1;t.remove(),d.find('.step-pane[data-step="'+i+'"]:first').remove(),n++}),this.syncSteps(),this.numSteps=r.find("li").length,this.setState()},setState:function(){var t=this.currentStep>1,e=1===this.currentStep,s=this.currentStep===this.numSteps;this.options.disablePreviousStep||this.$prevBtn.attr("disabled",!0===e||!1===t);var n=this.$nextBtn.attr("data-last");if(n){this.lastText=n;var r=this.nextText;!0===s?(r=this.lastText,this.$element.addClass("complete")):this.$element.removeClass("complete");var d=this.$nextBtn.children().detach();this.$nextBtn.text(r).append(d)}var l=this.$element.find(".steps li");l.removeClass("active").removeClass("complete"),l.find("span.badge").removeClass("badge-info").removeClass("badge-success");var p=".steps li:lt("+(this.currentStep-1)+")",h=this.$element.find(p);h.addClass("complete"),h.find("span.badge").addClass("badge-success");var c=".steps li:eq("+(this.currentStep-1)+")",o=this.$element.find(c);o.addClass("active"),o.find("span.badge").addClass("badge-info");var f=this.$element.find(".step-content"),m=o.attr("data-step");f.find(".step-pane").removeClass("active"),f.find('.step-pane[data-step="'+m+'"]:first').addClass("active"),this.$element.find(".steps").first().attr("style","margin-left: 0");var u=0;this.$element.find(".steps > li").each(function(){u+=a(this).outerWidth()});var v=0;if(v=this.$element.find(".actions").length?this.$element.width()-this.$element.find(".actions").first().outerWidth():this.$element.width(),u>v){var $=u-v;this.$element.find(".steps").first().attr("style","margin-left: -"+$+"px"),this.$element.find("li.active").first().position().left<200&&(($+=this.$element.find("li.active").first().position().left-200)<1?this.$element.find(".steps").first().attr("style","margin-left: 0"):this.$element.find(".steps").first().attr("style","margin-left: -"+$+"px"))}if(void 0!==this.initialized){var g=i.create("changed.fu.wizard");this.$element.trigger(g,{step:this.currentStep})}this.initialized=!0},stepclicked:function(t){var e=a(t.currentTarget),s=this.$element.find(".steps li").index(e);if(!(s<this.currentStep&&this.options.disablePreviousStep)){var n=i.create("stepclicked.fu.wizard");this.$element.trigger(n,{step:s+1}),n.isDefaultPrevented()||(this.currentStep=s+1,this.setState())}},syncSteps:function(){var t=1,e=this.$element.find(".steps"),i=this.$element.find(".step-content");e.children().each(function(){var e=a(this),s=e.find(".badge"),n=e.attr("data-step");isNaN(parseInt(s.html(),10))||s.html(t),e.attr("data-step",t),i.find('.step-pane[data-step="'+n+'"]:last').attr("data-step",t),t++})},previous:function(){if(!this.options.disablePreviousStep&&1!==this.currentStep){var t=i.create("actionclicked.fu.wizard");if(this.$element.trigger(t,{step:this.currentStep,direction:"previous"}),!t.isDefaultPrevented()&&(this.currentStep-=1,this.setState(),this.$prevBtn.is(":focus"))){var e=this.$element.find(".active").find("input, select, textarea")[0];void 0!==e?a(e).focus():0===this.$element.find(".active input:first").length&&this.$prevBtn.is(":disabled")&&this.$nextBtn.focus()}}},next:function(){var t=i.create("actionclicked.fu.wizard");if(this.$element.trigger(t,{step:this.currentStep,direction:"next"}),!t.isDefaultPrevented()&&(this.currentStep<this.numSteps?(this.currentStep+=1,this.setState()):this.$element.trigger("finished.fu.wizard"),this.$nextBtn.is(":focus"))){var e=this.$element.find(".active").find("input, select, textarea")[0];void 0!==e?a(e).focus():0===this.$element.find(".active input:first").length&&this.$nextBtn.is(":disabled")&&this.$prevBtn.focus()}},selectedItem:function(t){var e,i;return t?(i=t.step||-1,1<=(i=Number(this.$element.find('.steps li[data-name="'+i+'"]').first().attr("data-step"))||Number(i))&&i<=this.numSteps?(this.currentStep=i,this.setState()):(i=this.$element.find(".steps li.active:first").attr("data-step"),isNaN(i)||(this.currentStep=parseInt(i,10),this.setState())),e=this):(e={step:this.currentStep},this.$element.find(".steps li.active:first[data-name]").length&&(e.stepname=this.$element.find(".steps li.active:first").attr("data-name"))),e}});return r.register(l),d.Wizard=l});
//# sourceMappingURL=sourcemaps/Wizard.js.map
