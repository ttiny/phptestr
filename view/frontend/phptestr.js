"use strict";if(HTMLElement.prototype.matches===undefined){Object.defineProperty(HTMLElement.prototype,"matches",{value:HTMLElement.prototype.webkitMatchesSelector||HTMLElement.prototype.msMatchesSelector||HTMLElement.prototype.mozMatchesSelector})
}if(document.documentMode!==undefined){if(document.documentMode===10||document.documentMode===9){(function(){var a=CustomEvent.prototype.preventDefault;
Object.defineProperty(CustomEvent.prototype,"preventDefault",{value:function(){a.call(this);
this._ie_defaultPrevented=true}});Object.defineProperty(CustomEvent.prototype,"defaultPrevented",{get:function(){return this._ie_defaultPrevented===true?true:false
}})})();(function(){function a(c,d){d=d||{bubbles:false,cancelable:false,detail:undefined};
var b=document.createEvent("CustomEvent");b.initCustomEvent(c,d.bubbles,d.cancelable,d.detail);
return b}a.prototype=window.CustomEvent.prototype;window.CustomEvent=a})();if(document.documentMode===9){(function(){function e(f){this._element=f
}function a(g,f){var i=g.indexOf(f);if(i<0){return -1}if(i>0&&g.charAt(i-1)!=" "){return -1
}var h=f.length;if(i<g.length-h-1&&g.charAt(i+h)!=" "){return -1}return i}var c={contains:function(f){return a(this._element.className,f)>=0
},add:function(f){var g=this._element.className;if(a(g,f)<0){g=(g.length?g+" ":"")+f;
this._element.className=g}},remove:function(f){var g=this._element.className;var h=a(g,f);
if(h>=0){g=g.substr(0,h)+g.substr(h+f.length+1);this._element.className=g}}};var d=e.prototype;
for(var b in c){Object.defineProperty(d,b,{value:c[b]})}Object.defineProperty(HTMLElement.prototype,"classList",{get:function(){return new e(this)
}})})()}}}"use strict";Object.defineProperty(Object.prototype,"merge",{value:function(a){for(var b in a){this[b]=a[b]
}return this},writable:true});Object.defineProperty(Object.prototype,"duplicate",{value:function(){var a=Object.create(Object.getPrototypeOf(this));
for(var b in this){var c=this[b];if(c instanceof Object&&c.duplicate instanceof Function){a[b]=c.duplicate()
}else{a[b]=c}}return a},writable:true});Object.defineProperty(Object,"isObject",{value:function(a){return a instanceof Object&&Object.getPrototypeOf(a)===Object.prototype
},writable:true});Object.defineProperty(Object.prototype,"filter",{value:function(f,a){var e=Object.keys(this);
for(var c=0,d=e.length;c<d;++c){var b=e[c];if(f.call(a,this[b],b,this)!==true){delete this[b]
}}return this},writable:true});"use strict";Object.defineProperty(Array.prototype,"duplicate",{value:function(){var a=[].concat(this);
for(var b=a.length-1;b>=0;--b){var c=a[b];if(c instanceof Object&&c.duplicate instanceof Function){a[b]=c.duplicate()
}}return a},writable:true});Object.defineProperty(Array.prototype,"merge",{value:Array.prototype.concat,writable:true});
"use strict";Object.defineProperty(String,"isString",{value:function(a){return typeof a=="string"||a instanceof String
},writable:true});Object.defineProperty(String.prototype,"splitFirst",{value:function(b){if(String.isString(b)){var a=this.indexOf(b);
if(a>=0){return{left:this.substr(0,a),right:this.substr(a+b.length)}}}else{var c=b.exec(this);
if(c!==null){return{left:this.substr(0,c.index),right:this.substr(c.index+c[0].length)}
}}return{left:this}},writable:true});Object.defineProperty(String.prototype,"splitLast",{value:function(c){if(String.isString(c)){var b=this.lastIndexOf(c);
if(b>=0){return{left:this.substr(0,b),right:this.substr(b+c.length)}}}else{var d,a;
if(!c.global){c=new RegExp(c.source,(c.ignoreCase?"i":"")+(c.multiline?"m":"")+"g")
}while(a=c.exec(this)){d=a}if(d!==null){return{left:this.substr(0,d.index),right:this.substr(d.index+d[0].length)}
}}return{left:this}},writable:true});if(String.prototype.startsWith===undefined){Object.defineProperty(String.prototype,"startsWith",{enumerable:false,configurable:false,writable:false,value:function(b,a){a=a||0;
if(this.length<a+b.length){return false}return this.indexOf(b,a)===a}})}Object.defineProperty(String.prototype,"count",{value:function(c){var a=0;
for(var b=0;(b=this.indexOf(c,b))>=0;b+=c.length){++a}return a;return{left:this}},writable:true});
"use strict";Object.defineProperty(Function.prototype,"define",{value:function(a){var c=this.prototype;
for(var b in a){Object.defineProperty(c,b,{value:a[b],writable:true})}return this
},writable:true});Object.defineProperty(Function.prototype,"defineStatic",{value:function(a){for(var b in a){Object.defineProperty(this,b,{value:a[b],writable:true})
}return this},writable:true});Object.defineProperty(Function.prototype,"extend",{value:function(b,a){this.prototype=Object.create(b.prototype);
this.define(a);return this},writable:true});function ResolveMixins(a){if(!(this instanceof ResolveMixins)){return new ResolveMixins(a)
}this.merge(a)}Object.defineProperty(Function.prototype,"mixin",{value:function(){var e=arguments.length-1;
var g;if(e>0&&arguments[e] instanceof ResolveMixins){g=arguments[e]}else{++e}for(var d=0;
d<e;++d){var a=arguments[d];var b=a.prototype||a;for(var c in b){var f=undefined;
if(this.prototype[c]!==undefined){if(g&&g[c]!==undefined){var h=g[c];f=h.prototype?h.prototype[c]:h[c]
}if(!f){throw new Error('Unable to mixin property "'+c+'", it is already defined')
}}else{f=b[c]}Object.defineProperty(this.prototype,c,{value:f,writable:true})}}return this
},writable:true});Object.defineProperty(Function.prototype,"bind",{value:function(b){var a=this;
return function(){return a.apply(b,arguments)}},writable:true});Object.defineProperty(Function.prototype,"bindArgsAfter",{value:function(){var b=this;
var d=Array.prototype.slice;var c=Array.prototype.concat;var a=d.call(arguments);
return function(){return b.apply(this,arguments.length?c.call(d.call(arguments,0),a):a)
}},writable:true});Object.defineProperty(Function.prototype,"bindArgsBefore",{value:function(){var b=this;
var d=Array.prototype.slice;var c=Array.prototype.concat;var a=d.call(arguments);
return function(){return b.apply(this,arguments.length?c.call(a,d.call(arguments,0)):a)
}},writable:true});"use strict";function EventListener(b,c,a){this._event=b;this._callback=c;
this._phase=(a=="capture"?true:(a=="bubble"?false:a))}EventListener.define({add:function(a){a.addEventListener(this._event,this._callback,this._phase);
return this},once:function(b){var c=this;var a=function(){b.removeEventListener(c._event,a,c._phase);
return c._callback.apply(this,arguments)};b.addEventListener(this._event,a,this._phase);
return this},remove:function(a){a.removeEventListener(this._event,this._callback,this._phase);
return this},getEvent:function(){return this._event},getCallback:function(){return this._callback
},getPhase:function(){return this._phase}});"use strict";function ManagedListener(b,c,a){this._subjects=[];
EventListener.call(this,b,c,a)}ManagedListener.extend(EventListener,{add:function(a){a.addEventListener(this._event,this._callback,this._phase);
this._subjects.push(a);return this},remove:function(a){a.removeEventListener(this._event,this._callback,this._phase);
this._subjects.splice(this._subjects.lastIndexOf(a),1);return this},removeLast:function(){var a=this._subjects.pop();
if(a){a.removeEventListener(this._event,this._callback,this._phase)}return a},removeAll:function(){var a=this._subjects;
for(var b=a.length-1;b>=0;--b){a[b].removeEventListener(this._event,this._callback,this._phase)
}this._subjects=[];return this}});"use strict";function TEventDispatcher(){this._events={}
}TEventDispatcher.prototype={addEventListener:function(c,d,a){var b;if((b=this._events[c])===undefined){b=[];
this._events[c]=b}b.push([d,a])},removeEventListener:function(e,g,a){var c=this._events[e];
if(c instanceof Array){for(var b=0,d=c.length;b<d;++b){var f=c[b];if(f!==null&&f[0]===g&&f[1]===a){c[b]=null;
break}}}},dispatchEvent:function(a){var c=this._events[a.type];if(c instanceof Array){for(var b=0,d=c.length;
b<d;++b){var e=c[b];if(e!==null){e[0].call(this,a);if(a.defaultPrevented){break}}}return !a.defaultPrevented
}return true}};"use strict";var TEventDispatcher2={on:function(){return this.addEventListener.apply(this,arguments)
},off:function(){return this.removeEventListener.apply(this,arguments)},notify:function(){return this.dispatchEvent.apply(this,arguments)
},once:function(b,c,a){return new EventListener(b,c,a).once(this)}};"use strict";
(function(b){function c(){TEventDispatcher.call(this);this._state=undefined}c.defineStatic({StateChanged:function(e,d){return new CustomEvent("State.Changed",{bubbles:false,cancelable:false,detail:{State:e,LastState:d}})
}});var a=TEventDispatcher.prototype.addEventListener;c.define({addEventListener:function(e,g){var d=a.apply(this,arguments);
if(e=="State.Changed"){var f=this.getState();g(new c.StateChanged(f,f))}return d},setState:function(e){if(this._state==e){return false
}var d=this._state;this.dispatchEvent(new c.StateChanged(this._state=e,d));return true
},getState:function(){return this._state},onState:function(e,d){return new EventListener("State.Changed",function(f){if(f.detail.State==e){return d(f)
}}).add(this)}}).mixin(TEventDispatcher,TEventDispatcher2,ResolveMixins({addEventListener:c}));
b.Promise=c})(this);"use strict";(function(a){function d(){Promise.call(this)}d.defineStatic({TaskFinished:function(e){return new CustomEvent("Task.Finished",{bubbles:false,cancelable:false,detail:{State:e}})
}});var c=Promise.prototype.addEventListener;var b=Promise.prototype.setState;d.extend(Promise,{setState:function(e){if(this.isFinished()){return false
}return b.call(this,e)},start:function(){return this.setState("started")},resolve:function(){if(this.setState("success")){this.dispatchEvent(new d.TaskFinished("success"));
return true}return false},onSuccess:function(e){return this.onState("success",e)},reject:function(){if(this.setState("error")){this.dispatchEvent(new d.TaskFinished("error"));
return true}return false},onError:function(e){return this.onState("error",e)},cancel:function(){if(this.setState("cancelled")){this.dispatchEvent(new d.TaskFinished("cancelled"));
return true}return false},onCancelled:function(e){return this.onState("cancelled",e)
},onFinished:function(e){return new EventListener("Task.Finished",e).add(this)},isFinished:function(){var e=this.getState();
return(e=="success"||e=="error"||e=="cancelled")},addEventListener:function(f,g){var e=c.apply(this,arguments);
if(f=="Task.Finished"&&this.isFinished()){g(new d.TaskFinished(this.getState()))}return e
}});a.Task=d})(this);"use strict";function Callback(b){this._naked=b;var a=this;this._callback=function(){if(a._enabled){return b.apply(this,arguments)
}};this._enabled=true}Callback.define({enable:function(){this._enabled=true;return this
},disable:function(){this._enabled=false;return this},isEnabled:function(){return this._enabled
},getNaked:function(){return this._naked},getCallback:function(){return this._callback
}});"use strict";function Semaphore(a,b){TEventDispatcher.call(this);this._nLocks=a;
this._callback=b}Semaphore.defineStatic({SemaphoreNotify:function(){return new CustomEvent("Semaphore.Notify",{bubbles:false,cancelable:false})
},SemaphoreReleased:function(){return new CustomEvent("Semaphore.Released",{bubbles:false,cancelable:false})
}});Semaphore.define({notify:function(){--this._nLocks;if(this._nLocks<0){throw new Error("Unable to notify lock, all locks are released")
}this.dispatchEvent(new Semaphore.SemaphoreNotify());if(this._nLocks===0){this._callback();
this.dispatchEvent(new Semaphore.SemaphoreReleased())}},lock:function(){++this._nLocks
}}).mixin(TEventDispatcher,TEventDispatcher2,ResolveMixins({notify:Semaphore}));"use strict";
function View(a){var a=(a instanceof HTMLElement)?a:document.createElement(a||"div");
Object.defineProperty(a,"_view",{value:this});a.classList.add("View");this._element=a;
this._layout=null;this._behaviors=null;this._events={}}View.defineStatic({Data:function(a){var b=++View.Data._lastId;
View.Data._bindings[b]=a;return b}});View.Data.defineStatic({_lastId:0,_bindings:{}});
var $bind=View.Data;Object.defineProperty(HTMLElement.prototype,"getView",{value:function(){return this._view
},writable:true});View.define({setData:function(a){this._data=View.Data._bindings[a];
delete View.Data._bindings[a];return this},getData:function(){return this._data},setLayout:function(a){if(a===null){if(this._layout){this._layout.detach()
}}else{if(!(a instanceof Layout)){a=Layout.findByName(a);if(a===null){return this.setLayout(a)
}else{a=new a(this)}}}this._layout=a;return this},addBehavior:function(a){if(!(a instanceof Behavior)){a=Behavior.findByName(a);
if(a!==null){a=new a(this)}}if(a instanceof Behavior){(this._behaviors||(this._behaviors=[])).push(a);
return true}return false},getBehaviors:function(){return this._behaviors},getElement:function(){return this._element
},findView:function(a){var b=this._element.querySelector(a);return b?b._view:null
},findParentView:function(a){var b=this._element;while(b=b.parentNode){if(b._view&&b.matches(a)){return b._view
}}return null},addView:function(b,a){var d=this._element;if(b instanceof Array){if(a=="first"&&d.firstChild){for(var c=b.length-1;
c>=0;--c){d.insertBefore(b[c]._element,d.firstChild)}return true}for(var c=0,e=b.length;
c<e;++c){d.appendChild(b[c]._element)}return true}if(a=="first"&&d.firstChild){d.insertBefore(b._element,d.firstChild);
return true}d.appendChild(b._element);return true},moveView:function(b,a){var d=this._element;
var c=b._element;if(a=="first"){if(d.firstChild!==c){d.insertBefore(c,d.firstChild);
return true}return false}else{if(a=="last"){if(d.lastChild!==c){d.insertBefore(c,null);
return true}return false}}return false},removeView:function(a){this._element.removeChild(a._element);
return true},addEventListener:function(d,f,a){var c=this;var e=function(){return f.apply(c,arguments)
};var b;if((b=this._events[d])===undefined){b=[];this._events[d]=b}b.push([e,f,a]);
return this._element.addEventListener(d,e,a)},removeEventListener:function(f,g,a){var c=this._events[f];
if(c instanceof Array){for(var b=0,d=c.length;b<d;++b){var e=c[b];if(e!==null&&e[1]===g&&e[2]===a){c[b]=null;
return this._element.removeEventListener(f,e[0],a)}}}},dispatchEvent:function(a){return this._element.dispatchEvent(a)
},setText:function(a){this._element.textContent=a;return this},getText:function(){return this._element.textContent
},setId:function(a){this._element.id=a;return this},setClass:function(a){var c=this._element.classList;
if(a.indexOf(" ")>0){a=a.split(" ");for(var b=a.length-1;b>=0;--b){c.add(a[b])}}else{c.add(a)
}return this},setBehavior:function(a){return this.addBehavior(a)},hasState:function(a){return this._element.classList.contains(a)
},setState:function(b,d){d=d===false?"remove":"add";var c=this._element.classList;
if(b.indexOf(" ")>0){b=b.split(" ");for(var a=b.length-1;a>=0;--a){c[d](b[a])}}else{c[d](b)
}return this}}).mixin(TEventDispatcher2);"use strict";(function(g,b){var e={"'":"\\'","\\":"\\\\","\r":"\\r","\n":"\\n","\t":"\\t"};
var f=/[\\'\r\n\t]/g;function k(m){return m.replace(f,"\\$&")}function d(m,n){return new a({cache:true,source:m,id:n})
}function a(u,p,n){var s={}.merge(a.DefaultSettings);p=p instanceof Object?s.merge(p):s;
var o=0;var m="";if(u instanceof Object&&u.cache===true){o=1;m=u.source;n=u.id}else{var t=new RegExp(p.escape+"|"+p.interpolate+"|"+p.evaluate,"g");
var q=0;u.replace(t,function(w,x,v,z,y){++o;m+="__p += '"+k(u.slice(q,y))+"';\n";
if(x){m+="__p += TextTemplate.escapeHtml( "+x+"\n);\n"}else{if(v){m+="__p += ( "+v+"\n);\n"
}else{if(z){m+=""+z.trim()+"\n"}}}q=y+w.length;return w})}if(o>0){if(q<u.length-1){m+="__p += '"+k(u.slice(q))+"';\n"
}m="var __p = '';\n"+(p.print?"function "+p.print+" ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n":"")+(b.DEBUG?"try {\n":"")+m+"return __p;\n"+(b.DEBUG?"}\ncatch ( e ) {\nconsole.error( '(TextTemplate"+(n?" "+n:"")+") Error in template', source );\nthrow e;\n}\n":"");
try{this._template=new Function(p.variable,"source",m)}catch(r){if(b.DEBUG){console.error("(TextTemplate"+(n?" "+n:"")+") Error compiling template",m)
}r.source=m;throw r}}else{m="return '"+k(u)+"';";this._template=function(){return u
}}this._settings=p;this._source=m}a.DefaultSettings={variable:"data",evaluate:"<%([\\s\\S]+?)%>",interpolate:"<%=([\\s\\S]+?)%>",escape:"<%!([\\s\\S]+?)%>",print:"prn"};
var h={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#27;"};var i=/[&<>"']/g;
function j(m){return h[m]}a.escapeHtml=function(m){if(!String.isString(m)){m=String(m)
}return m.replace(i,j)};a.define({getSource:function(){return this._source},render:function(m){return this._template(m,this._source)
}});a.Cache={};var c={};function l(q,p){var m=c[q];if(m!==undefined){return p!==undefined?m.render(p):m
}var n=a.Cache[q];if(n!==undefined){m=d(n,q);c[q]=m;return p!==undefined?m.render(p):m
}var o=document.getElementById(q);if(o){m=new a(o.innerHTML,undefined,q);c[q]=m;return p!==undefined?m.render(p):m
}throw new Error("TEXTTEMPLATE_ID_NOT_FOUND")}g.$TT=l;g.TextTemplate=a})(this,typeof global!="undefined"?global:window);
"use strict";(function(a){function b(d){this._template=d}b.loadString=function(e){var g=b._parser||(b._parser=new DOMParser());
var f=g.parseFromString(e,"text/xml");var d=f.getElementsByTagName("parsererror");
if(d.length>0){throw new SyntaxError(d[0].textContent)}return new b(f)};b.loadInline=function(d){var e=document.getElementById(d);
if(e){return b.loadString(e.innerHTML)}throw new Error("VIEWTEMPLATE_ID_NOT_FOUND")
};b.classFromTemplate=function(d,f){var e=new d();b.setupViewFromAttributes(e,f);
b.addViewsFromChildren(e,f);return e};b.createViewFromElement=function(h){var k=h.tagName;
var d=window[k]||View[k];if(d===undefined){if(k.indexOf(".")>=0){var g=k.split(".");
d=window[g[0]];for(var f=1,j=g.length;f<j&&d!==undefined;++f){d=d[g[f]]}}if(d===undefined){throw new Error('Undefined view "'+k+'"')
}}var e=null;if(d.fromTemplate instanceof Function){e=d.fromTemplate(h)}else{e=b.classFromTemplate(d,h)
}return e};b.setupViewFromAttributes=function(m,f){for(var g=0,n=f.attributes.length;
g<n;++g){var h=f.attributes[g];var d=h.name;if(d.indexOf("-")>0){var k=d.split("-");
for(var e=k.length-1;e>=0;--e){d=k[e];k[e]=d.charAt(0).toUpperCase()+d.substr(1)}d="set"+k.join("")
}else{d="set"+d.charAt(0).toUpperCase()+d.substr(1)}var l=m[d];if(l instanceof Function){l.call(m,h.value)
}}};b.setupViewFromProperties=function(d,h){for(var g in h){var f=g;if(f.indexOf("-")>0){var k=f.split("-");
for(var e=k.length-1;e>=0;--e){f=k[e];k[e]=f.charAt(0).toUpperCase()+f.substr(1)}f="set"+k.join("")
}else{f="set"+f.charAt(0).toUpperCase()+f.substr(1)}var i=d[f];if(i instanceof Function){i.call(d,h[g])
}}};b.addViewsFromChildren=function(d,e){var f=e.firstChild;while(f){if(f.nodeType==Node.ELEMENT_NODE){d.addView(b.createViewFromElement(f))
}f=f.nextSibling}};b.define({getDocument:function(){return this._template},createView:function(){var f=this._template.documentElement;
if(f.tagName=="Template"){var e=[];f=f.firstChild;while(f){if(f.nodeType==f.ELEMENT_NODE){var d=b.createViewFromElement(f);
if(d instanceof View){e.push(d)}}f=f.nextSibling}return e.length>0?e:null}else{return b.createViewFromElement(f)
}}});function c(f,e){var d=f instanceof TextTemplate?f:$TT(f);return b.loadString(d.render(e)).createView()
}a.$T=c;a.ViewTemplate=b})(this);"use strict";View.TActiveView=function(){this._active=null
};View.TActiveView.defineStatic({fromTemplate:function(a,b){var c=a._element.firstChild;
while(c){if(c._view.hasState("active")){a.setActive(c._view);break}c=c.nextSibling
}}});View.TActiveView.prototype={setActive:function(b){var d=this._active;if(b===d){return false
}var f=new CustomEvent("ActiveView.Changing",{bubbles:true,cancelable:true,detail:{Active:b,Inactive:d,Parent:this}});
if(this.dispatchEvent(f)===true){if(d){d.setState("active",false)}this._active=b;
if(b){b.setState("active",true)}var e=new CustomEvent("ActiveView.Changed",{bubbles:true,cancelable:false,detail:{Active:b,Inactive:d}});
this.dispatchEvent(e);if(d){var c=new CustomEvent("ActiveView.Deactivated",{bubbles:true,cancelable:false,detail:{Active:b,Parent:this}});
d.dispatchEvent(c)}if(b){var a=new CustomEvent("ActiveView.Activated",{bubbles:true,cancelable:true,detail:{Inactive:d,Parent:this}});
b.dispatchEvent(a)}return true}return false},getActive:function(){return this._active
}};"use strict";View.TLabel=function(){this._image=null;this._text=null;this._order="ltr"
};View.TLabel.prototype={setOrder:function(a){if(this._order!==a){this._order=a;if(a!==null&&this._image&&this._text){this.moveView(this._text,a=="ltr"?"last":"first")
}}return this._order},setText:function(c){if(c===null){var b=this._text;if(b){this.removeView(b)
}return b}if(this._text===null){var a=this._order=="ltr"?"last":(this._order=="rtl"?"first":undefined);
this.addView(this._text=new View.Txt(),a)}this._text.setText(c);return this._text
},setTitle:function(b){var a=this._image;if(a===null){return null}a.setText(b);return a
},setImage:function(c,d){if(c===null){var b=this._image;if(b){this.removeView(b);
return b}}if(!(this._image instanceof View.Img)){if(this._image!==null){this.removeView(this._image)
}var a=this._order=="ltr"?"first":(this._order=="rtl"?"last":undefined);this.addView(this._image=new View.Img(),a)
}this._image.setImage(c,d);return this._image},setStockImage:function(c,d){if(c===null){var b=this._image;
if(b){this.removeView(b);return b}}if(!(this._image instanceof View.StockImg)){if(this._image!==null){this.removeView(this._image)
}var a=this._order=="ltr"?"first":(this._order=="rtl"?"last":undefined);this.addView(this._image=new View.StockImg(),a)
}this._image.setImage(c,d);return this._image}};"use strict";View.AppView=function(){View.call(this);
this._element.classList.add("AppView");this._lastDeviceClass=null;if(window.DocviewjsTheme!==undefined){this._onResize=new EventListener("resize",this.updateDeviceClass.bind(this),"capture").add(window);
this.updateDeviceClass()}else{this._onResize=null}document.body.appendChild(this._element)
};View.AppView.defineStatic({DeviceSizeChanged:function(b,a){return new CustomEvent("AppView.DeviceSize.Changed",{bubbles:true,cancelable:false,detail:{Device:b,LastDevice:a}})
}});View.AppView.extend(View,{updateDeviceClass:function(){var e=window.DocviewjsTheme?window.DocviewjsTheme.DeviceSizes:undefined;
if(!(e instanceof Object)){return false}var b=null;var g=window.innerWidth;for(var d in e){var j=e[d];
var c=j[0];var f=j[1];if((c==-1||g>=c)&&(f==-1||g<=f)){b=d;break}}if(b===null){return false
}var a=this._element.classList;if(b!==this._lastDeviceClass){if(this._lastDeviceClass!==null){a.remove(this._lastDeviceClass)
}var h=new View.AppView.DeviceSizeChanged(b,this._lastDeviceClass);a.add(this._lastDeviceClass=b);
this.dispatchEvent(h);return true}return false},setText:function(a){return document.title=(typeof R!="undefined"?R.render(a)||a:a)
},getText:function(){return document.title}});"use strict";View.CodeBlock=function(a){View.call(this,"code");
var b=this._element;b.classList.add("CodeBlock");if(a){this.setHtml(a)}};View.CodeBlock.defineStatic({fromTemplate:function(d){var c="";
var a=View.CodeBlock._serializer||(View.CodeBlock._serializer=new XMLSerializer());
var e=d.firstChild;while(e){c+=a.serializeToString(e);e=e.nextSibling}var b=new View.CodeBlock(d.textContent);
ViewTemplate.setupViewFromAttributes(b,d);return b}});View.CodeBlock.extend(View,{setHtml:function(a){this._element.innerHTML=a;
return this},getHtml:function(a){return this._element.innerHTML}});"use strict";View.Panel=function(){View.call(this);
this._element.classList.add("Panel")};View.Panel.extend(View);View.PanelTitle=function(){View.call(this);
this._element.classList.add("PanelTitle")};View.PanelTitle.extend(View);View.PanelFooter=function(){View.call(this);
this._element.classList.add("PanelFooter")};View.PanelFooter.extend(View);"use strict";
(function(){View.HtmlArea=function(d){View.call(this);var e=this._element;e.classList.add("HtmlArea");
if(d){this.setHtml(d)}};View.HtmlArea.defineStatic({fromTemplate:function(g){var f="";
var d=View.HtmlArea._serializer||(View.HtmlArea._serializer=new XMLSerializer());
var h=g.firstChild;while(h){f+=d.serializeToString(h);h=h.nextSibling}var e=new View.HtmlArea(f);
ViewTemplate.setupViewFromAttributes(e,g);return e}});var c=/(<\/?)view:([a-z\-]+)/gi;
function b(e,g,d){if(d.indexOf("-")>0){var f=d.split("-");for(var j=f.length-1;j>=0;
--j){var h=f[j];f[j]=h.charAt(0).toUpperCase()+h.substr(1)}return g+f.join("")}else{return g+d.charAt(0).toUpperCase()+d.substr(1)
}}function a(e){var f=e.firstElementChild;while(f){if(f.localName.startsWith("view:")){var d=f.outerHTML.replace(c,b);
var g=ViewTemplate.loadString(d).createView().getElement();f.parentNode.replaceChild(g,f);
f=g}else{a(f)}f=f.nextElementSibling}}View.HtmlArea.extend(View,{setHtml:function(d){this._element.innerHTML=d;
a(this._element);return this},getHtml:function(d){return this._element.innerHTML}})
})(this);"use strict";View.Button=function(b){View.call(this,"button");View.TLabel.call(this);
var a=this._element.classList;a.add("TLabel");a.add("Button");if(b){ViewTemplate.setupViewFromProperties(this,b)
}};View.Button.extend(View,{setState:function(a,b){if(a=="disabled"){if(b===false){this._element.removeAttribute("disabled")
}else{this._element.setAttribute("disabled","disabled")}}return View.prototype.setState.call(this,a,b)
}}).mixin(View.TLabel,ResolveMixins({setText:View.TLabel}));"use strict";View.Link=function(b){View.call(this,"button");
View.TLabel.call(this);var a=this._element.classList;a.add("TLabel");a.add("Link");
if(b){ViewTemplate.setupViewFromProperties(this,b)}};View.Link.defineStatic({fromTemplate:function(b){var a=ViewTemplate.classFromTemplate(View.Link,b);
if(b.getAttribute("behavior")===null){a.setBehavior("auto")}return a}});View.Link.extend(View,{setUrl:function(a){this._url=a;
return this},getUrl:function(){return this._url},setTarget:function(a){this._target=a;
return this},getTarget:function(){return this._target},setState:function(a,b){if(a=="disabled"){if(b===false){this._element.removeAttribute("disabled")
}else{this._element.setAttribute("disabled","disabled")}}return View.prototype.setState.call(this,a,b)
}}).mixin(View.TLabel,ResolveMixins({setText:View.TLabel}));"use strict";(function(a){function b(){View.call(this);
View.TActiveView.call(this);this._element.classList.add("TabStrip");this.setLayout("Horizontal")
}b.extend(View).mixin(View.TActiveView);b.fromTemplate=function(d){var c=ViewTemplate.classFromTemplate(b,d);
if(d.getAttribute("behavior")===null){c.setBehavior("auto")}View.TActiveView.fromTemplate(c,d);
return c};a.TabStrip=b})(this.View);"use strict";View.Tab=function(b){View.call(this);
View.TLabel.call(this);var a=this._element.classList;a.add("Label");a.add("Tab");
if(b){ViewTemplate.setupViewFromProperties(this,b)}};View.Tab.extend(View).mixin(View.TLabel,ResolveMixins({setText:View.TLabel}));
"use strict";View.ViewSwitch=function(){View.call(this);View.TActiveView.call(this);
this._element.classList.add("ViewSwitch");this.setBehavior("auto")};View.ViewSwitch.fromTemplate=function(b){var a=ViewTemplate.classFromTemplate(View.ViewSwitch,b);
View.TActiveView.fromTemplate(a,b);return a};View.ViewSwitch.extend(View).mixin(View.TActiveView);
"use strict";View.TabView=function(b,a){View.call(this);var c=this._element.classList;
c.add("TabView");this._strip=null;this._switch=null;if(b!==false){if(!(b instanceof View.TabStrip)){b=new View.TabStrip()
}this.addView(b)}if(a!==false){if(!(a instanceof View.ViewSwitch)){a=new View.ViewSwitch()
}this.addView(a)}};View.TabView.fromTemplate=function(b){var a=new View.TabView(false,false);
ViewTemplate.setupViewFromAttributes(a,b);ViewTemplate.addViewsFromChildren(a,b);
if(a.getStrip()===null){var c=new View.TabStrip();c.setBehavior("auto");a.addView(c)
}if(a.getSwitch()===null){a.addView(new View.TabSwitch())}if(b.getAttribute("behavior")===null){a.setBehavior("auto")
}return a};View.TabView.extend(View,{setStrip:function(a){var b=this._strip;this._strip=a;
return b},getStrip:function(){return this._strip},setSwitch:function(a){var b=this._switch;
this._switch=a;return b},getSwitch:function(){return this._switch},addView:function(b,a){if(b instanceof View.TabStrip){this.setStrip(b)
}else{if(b instanceof View.ViewSwitch){this.setSwitch(b)}else{return false}}return View.prototype.addView.call(this,b,a)
},removeView:function(a){if(a===this._strip){this.setStrip(null)}else{if(a===this._switch){this.setSwitch(null)
}else{return false}}return View.prototype.removeView.call(this,a)}});"use strict";
View.Txt=function(a){View.call(this,"span");this._element.classList.add("Txt");if(a){this.setText(a)
}};View.Txt.fromTemplate=function(b){var c=b.getAttribute("text");var a=new View.Txt();
ViewTemplate.setupViewFromAttributes(a,b);if(c===null){a.setText(b.textContent)}return a
};View.Txt.extend(View,{setText:function(a){if(a!==null){a=(typeof R!="undefined"?R.render(a)||a:a)
}return View.prototype.setText.call(this,a)}});"use strict";View.Img=function(a,b){View.call(this,"img");
this._element.classList.add("Img");if(a){this.setImage(a)}if(b){this.setText(b)}};
View.Img.extend(View,{setImage:function(a){return this._element.src=(typeof R!="undefined"?R.render(a)||a:a)
},setText:function(a){if(a===null){this._element.removeAttribute("title");return null
}else{a=(typeof R!="undefined"?R.render(a)||a:a);this._element.setAttribute("title",a);
return a}}});"use strict";View.StockImg=function(a,b){View.call(this,"span");this._element.classList.add("StockImg");
this._lastImage=null;if(a){this.setImage(a)}if(b){this.setText(b)}};View.StockImg.extend(View,{setImage:function(b){var a=this._lastImage;
if(b==a){return this}var c=this._element.classList;if(a!==null){c.remove(a)}this._lastImage=b;
if(b!==null){c.add(b)}return b},setText:function(a){if(a===null){this._element.removeAttribute("title");
return null}else{a=(typeof R!="undefined"?R.render(a)||a:a);this._element.setAttribute("title",a);
return a}}});"use strict";View.Label=function(a){View.call(this);View.TLabel.call(this);
this._element.classList.add("Label");if(a){ViewTemplate.setupViewFromProperties(this,a)
}};View.Label.extend(View).mixin(View.TLabel,ResolveMixins({setText:View.TLabel}));
"use strict";View.Accordion=function(){View.call(this);View.TActiveView.call(this);
this._element.classList.add("Accordion")};View.Accordion.defineStatic({fromTemplate:function(b){var a=ViewTemplate.classFromTemplate(View.Accordion,b);
if(b.getAttribute("behavior")===null){a.setBehavior("auto")}View.TActiveView.fromTemplate(a,b);
return a}});View.Accordion.extend(View).mixin(View.TActiveView);"use strict";View.AccordionItem=function(){View.call(this);
this._element.classList.add("AccordionItem")};View.AccordionItem.extend(View);"use strict";
View.Spinner=function(){View.call(this);this._element.classList.add("Spinner")};View.Spinner.extend(View);
"use stict";function Behavior(){}Behavior.findByName=function(e){if(String.isString(e)&&e){var b=window[e]||Behavior[e];
if(b===undefined){if(e.indexOf(".")>=0){var a=e.split(".");b=window[a[0]];for(var c=1,d=a.length;
c<d&&b!==undefined;++c){b=b[a[c]]}}}return b||null}return null};Behavior.define({detach:function(){}});
"use strict";(function(c){var a=null;function b(){return(a||(a=new EventListener("click",function(e){var f=this.getTarget();
if(f){window.open(this.getUrl(),f)}else{window.location.href=this.getUrl()}},"bubble")))
}function d(e){this._link=e;this._onClick=b().add(e)}d.extend(Behavior,{detach:function(){this._onClick.remove(this._link);
this._onClick=null;this._link=null}});View.Link.prototype.AutoBehavior=d;c.AutoLink=d
})(this.Behavior);"use strict";(function(a){function b(d){var e=d;while(d&&!(d._view instanceof View.Accordion)){if(d.classList.contains("AccordionItem")){if(e.classList.contains("AccordionItemTitle")){return d._view
}else{break}}else{e=d;d=d.parentNode}}return false}function c(d){this._accordion=d;
this._onClick=new EventListener("click",function(e){var f=b(e.target);if(f!==false){d.setActive(d.getActive()!==f&&!f.hasState("disabled")?f:null);
e.preventDefault()}},"bubble").add(d)}c.extend(Behavior,{detach:function(){this._onClick().remove(this._accordion);
this._onClick=null;this._accordion=null}});View.Accordion.prototype.AutoBehavior=c;
a.AutoAccordion=c})(this.Behavior);"use strict";(function(c){function e(g){var f=-1;
while(g){g=g.previousSibling;++f}return f}var a=null;function b(){return(a||(a=new EventListener("ActiveView.Activated",function(h){var g=this;
if(g&&h.detail.Parent===g.getStrip()){var f=g.getSwitch();if(f){var i=e(h.target);
var j=f.getElement().children[i];var g=j?j._view:null;f.setActive(g)}}},"bubble")))
}function d(f){this._tabview=f;this._onActivated=b().add(f)}d.extend(Behavior,{detach:function(){this._onActivated.remove(this._tabview);
this._onActivated=null;this._tabview=null}});View.TabView.prototype.AutoBehavior=d;
c.AutoTabView=d})(this.Behavior);"use strict";(function(a){function b(f,d){var e=d;
var d=d.parentNode;while(d){if(d._view===f){if(e.classList.contains("Tab")){return e._view
}else{break}}else{e=d;d=d.parentNode}}return false}function c(d){this._strip=d;this._onClick=new EventListener("click",function(e){var f=b(d,e.target);
if(f&&f!==d.getActive()&&!f.hasState("disabled")){d.setActive(f);e.preventDefault()
}},"bubble").add(d)}c.extend(Behavior,{detach:function(){this._onClick.remove(this._strip);
this._onClick=null;this._strip=null}});View.TabStrip.prototype.AutoBehavior=c;a.AutoTabStrip=c
})(this.Behavior);"use strict";Behavior.auto=function(a){if(a.AutoBehavior instanceof Function){return new a.AutoBehavior(a)
}else{return null}};"use strict";function Layout(a){this._view=a;a.getElement().classList.add("Layout")
}Layout.findByName=function(a){if(typeof a=="string"||a instanceof String){return Layout[a]||null
}return null};Layout.define({detach:function(){this._view.getElement().classList.remove("Layout");
this._view=null}});"use strict";Layout.Horizontal=function(a){Layout.call(this,a);
a.getElement().classList.add("Layout-Horizontal")};Layout.Horizontal.extend(Layout,{detach:function(){this._view.getElement().classList.remove("Layout-Horizontal");
Layout.prototype.detach.call(this)}});"use strict";Layout.Vertical=function(a){Layout.call(this,a);
a.getElement().classList.add("Layout-Vertical")};Layout.Vertical.extend(Layout,{detach:function(){this._view.getElement().classList.remove("Layout-Vertical");
Layout.prototype.detach.call(this)}});"use strict";(function(e){function d(m,n){var o=this;
var k=function(){};k.prototype=n||this;var l=new k;if(n){l.parent=n}if(m){l.merge(m)
}return l}var h={};var b=/[\?\.\+\[\]\(\)\{\}\$\^\\\|]/g;var a=/\*\*/g;var j=/\*(?!\?)/g;
var f=/{([\s\S]+?)}/g;function i(m,p,o,l){for(var k in m){var n=m[k];if(Object.isObject(n)){i(n,p,o,l?l+k+".":k+".")
}p(o,l?l+k:k,n)}if(l===undefined&&m.parent){o.config=m.parent;i(m.parent,p,o)}}function g(o,l,n){var k=l.match(o.regex);
if(k&&o.ret[l]===undefined){o.ret[l]=new d.Match(o.config,l,n,k.slice(0))}}function c(k){return !(k instanceof Object)
}d.defineStatic({Match:function(l,k,n,m){this.config=l;this.name=k;this.value=n;this.matches=m
}});d.define({match:function(l){var k=h[l];if(k===undefined){l="^"+l.replace(b,"\\$&").replace(a,"(.*?)").replace(j,"([^.]*?)")+"$";
k=new RegExp(l);h[l]=k}var m={regex:k,ret:{},config:this};i(this,g,m);return m.ret
},get:function(r){if(r.indexOf("*")>0){var k=this.match(r);for(var m in k){var q=k[m].value;
arguments[0]=q;k[m]=this.render.apply(this,arguments)}return k.filter(c)}else{var p;
if(r.indexOf(".")>0){var o=r.split(".");p=this;for(var l=0,n=o.length;p!==undefined&&l<n;
++l){p=p[o[l]]}}else{p=this[r]}if(p===undefined&&this.parent){return this.parent.get.apply(this.parent,arguments)
}arguments[0]=p;return this.render.apply(this,arguments)}},render:function(m){if(m instanceof Function){return m.apply(Array.prototype.slice.call(arguments,1))
}else{if(String.isString(m)&&m.indexOf("{")>=0){var l=this;var k=arguments;return m.replace(f,function(o,r){var q=parseInt(r);
var p=l.get(r)||(q>0&&k.length>q?k[q]:undefined);return p!==undefined?l.render(p):o
})}else{return m}}}});e.Config=d})(this);"use strict";(function(e){function b(){var m=this._request;
var l=true;var n=null;var k=null;if(m.status<200||m.status>=400){k=m.status;l=false
}else{var j=this._options.responseType;if(j!==undefined&&j!=m.getResponseHeader("Content-Type")){k="UNEXPECTED_RESPONSE_TYPE";
l=false}}var q;if(l){var p=this._options.forceResponseEncoding;if(p=="json"||m.getResponseHeader("Content-Type")=="application/json"){try{n=(m.responseType=="json"?m.response:JSON.parse(m.responseText))
}catch(o){console.error("(HttpRequest) Error parsing JSON",o.message);if(p){k="UNEXPECTED_RESPONSE_TYPE";
l=false}else{n=m.response||m.responseText}}}else{n=m.response||m.responseText}}if(l){q={Success:true,Data:n,Cancelled:false,Request:m};
if(this._callback instanceof Function){this._callback(q)}this.dispatchEvent(new CustomEvent("Request.Success",{bubbles:false,cancelable:false,detail:{Request:m}}));
this.resolve()}else{q={Success:false,Error:k,Cancelled:false,Request:m};if(this._callback instanceof Function){this._callback(q)
}this.dispatchEvent(new CustomEvent("Request.Error",{bubbles:false,cancelable:false,detail:{Request:m}}));
this.reject()}this.dispatchEvent(new CustomEvent("Request.Finished",{bubbles:false,cancelable:false,detail:q}))
}function d(){var k=this._request;var j=null;if(k.status<200||k.status>=400){j=k.status
}else{j=k.statusText||j}var l={Success:false,Error:j,Cancelled:false,Request:k};if(this._callback instanceof Function){this._callback(l)
}this.dispatchEvent(new CustomEvent("Request.Error",{bubbles:false,cancelable:false,detail:{Request:k}}));
this.reject();this.dispatchEvent(new CustomEvent("Request.Finished",{bubbles:false,cancelable:false,detail:l}))
}function a(){var k=this._request;var j=null;if(k.status<200||k.status>=400){j=k.status
}else{j=k.statusText||j}var l={Success:false,Error:j,Cancelled:true,Request:k};if(this._callback instanceof Function){this._callback(l)
}this.dispatchEvent(new CustomEvent("Request.Cancelled",{bubbles:false,cancelable:false,detail:{Request:k}}));
Task.prototype.cancel.call(this);this.dispatchEvent(new CustomEvent("Request.Finished",{bubbles:false,cancelable:false,detail:l}))
}function h(){var j=this._request;if(j.readyState===j.HEADERS_RECEIVED){this.dispatchEvent(new CustomEvent("Request.Headers",{bubbles:false,cancelable:false,detail:{Request:j}}))
}}function i(k,o){Task.call(this);if(typeof k=="string"||k instanceof String){k={}.merge(i.DefaultOptions).merge({url:k})
}else{k={}.merge(i.DefaultOptions).merge(k)}var m=new XMLHttpRequest;this._callback=o;
this._request=m;m.onreadystatechange=h.bind(this);m.addEventListener("load",this._onLoad=b.bind(this));
m.addEventListener("error",this._onError=d.bind(this));m.addEventListener("abort",this._onAbort=a.bind(this));
var n={};var j=k.dataEncoding;if(j=="url"){n["Content-Type"]="application/x-www-form-urlencoded"
}else{if(j=="json"){n["Content-Type"]="application/json"}}if(k.headers instanceof Object){n.merge(k.headers)
}this._options=k;m.open(k.method,k.url);this._headers=n;for(var l in n){m.setRequestHeader(l,n[l])
}}i.DefaultOptions={method:"get",dataEncoding:"url"};function f(j){if(typeof j=="number"||j instanceof Number){j=String(j)
}return encodeURIComponent(j)}function c(p,o){var k="";for(var l=0,m=p.length;l<m;
++l){var j=o+"["+l+"]";var n=p[l];if(n instanceof Array){n=c(n,j);k+=(k.length>0?"&":"")+n
}else{if(n instanceof Object){n=g(n,j);k+=(k.length>0?"&":"")+n}else{n=f(n);k+=(k.length>0?"&":"")+j+"="+n
}}}return k}function g(l,o){var k="";for(var m in l){var j=o?o+"["+encodeURIComponent(m)+"]":encodeURIComponent(m);
var n=l[m];if(n instanceof Array){n=c(n,j);k+=(k.length>0?"&":"")+n}else{if(n instanceof Object){n=g(n,j);
k+=(k.length>0?"&":"")+n}else{n=f(n);k+=(k.length>0?"&":"")+j+"="+n}}}return k}i.urlEncode=function(j){if(!(j instanceof Object)){return null
}return g(j)};i.extend(Task,{send:function(l){if(l instanceof Object){var j=this._options.dataEncoding;
if(j=="url"){l=i.urlEncode(l)}else{if(j=="json"){l=JSON.stringify(l)}}}var k=this._request;
if(k.readyState===k.OPENED){this.dispatchEvent(new CustomEvent("Request.Started",{bubbles:false,cancelable:false,detail:{Request:k,data:l}}));
this.start();if(k.readyState===k.OPENED){k.send(l)}}return this},abort:function(){var j=this._request;
j.removeEventListener("load",this._onLoad);j.abort();return this},cancel:function(){return this.abort()
},addEventListener:function(j,k){this._request.addEventListener(j,k);return this},removeEventListener:function(j,k){this._request.removeEventListener(j,k);
return this},dispatchEvent:function(j){this._request.dispatchEvent(j);return this
}});e.HttpRequest=i})(this);"use strict";(function(a){function e(g){this._request=null;
this.dispatchEvent(new CustomEvent("RequestGroup.Finished",{bubbles:false,cancelable:false}))
}function b(g,h){TEventDispatcher.call(this);this._name=g;this._policy=h||"ignore";
this._request=null;this._onRequestFinished=new EventListener("Request.Finished",e.bind(this))
}b.define({addRequest:function(g,i){if(this._request){if(this._policy=="abort"){this._onRequestFinished.remove(this._request);
this._request.abort()}else{if(this._policy=="ignore"){return false}}}else{this.dispatchEvent(new CustomEvent("RequestGroup.Started",{bubbles:false,cancelable:false}))
}var h=new HttpRequest(g,i);this._request=h;this._onRequestFinished.add(h);return h
},abort:function(){if(this._request){this._request.abort();return true}else{return false
}}}).mixin(TEventDispatcher,TEventDispatcher2);function d(){if(++this._activeRequests==1){this.dispatchEvent(new CustomEvent("RequestManager.Started",{bubbles:false,cancelable:false}))
}}function f(){if(--this._activeRequests==0){this.dispatchEvent(new CustomEvent("RequestManager.Finished",{bubbles:false,cancelable:false}))
}if(this._activeRequests<0){throw new Error("_activeRequests < 0")}}function c(){TEventDispatcher.call(this);
this._groups=[];this._activeRequests=0;this._onRequestGroupStarted=null;this._onRequestGroupFinished=null;
this._onRequestGroupStarted=new EventListener("RequestGroup.Started",d.bind(this));
this._onRequestGroupFinished=new EventListener("RequestGroup.Finished",f.bind(this))
}c.define({defineGroup:function(g,i){var h=new b(g,i);this._onRequestGroupStarted.add(h);
this._onRequestGroupFinished.add(h);this._groups[g]=h;return this},addRequest:function(h,g,i){return this._groups[h].addRequest(g,i)
},abortGroup:function(g){return this._groups[g].abort()}}).mixin(TEventDispatcher,TEventDispatcher2);
a.RequestManager=c})(this);"use strict";var R=new Config();function App(b){var a=this;
this._onReady=new EventListener("DOMContentLoaded",function(){if(b instanceof Function){b(a)
}},"bubble").add(document)}App.include=function(c,l,g){if(!(c instanceof Array)){c=[c]
}var j=0;var n=c.length;if(l instanceof Function){g=l;l=null}function e(){if(++j==n&&g instanceof Function){g.call(this,j==n)
}}var m=document.getElementsByTagName("head")[0];for(var h=0,d=c.length;h<d;++h){var k=c[h];
var a=l||k.splitLast(".").right;if(a=="js"){var b=document.createElement("script");
b.type="text/javascript";b.src=k;b.addEventListener("load",e);m.appendChild(b)}else{if(a=="css"){var b=document.createElement("link");
b.rel="stylesheet";b.href=k;b.addEventListener("load",e);m.appendChild(b)}}}};"use strict";
var DocviewjsTheme={DeviceSizes:{"device-large":[1200,-1],"device-desktop":[992,1999],"device-tablet":[768,991],"device-phone":[-1,767]}};
"use strict";