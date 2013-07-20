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
View.Data._bindings[b]=a;return b}});View.Data.defineStatic({_lastId:0,_bindings:{},release:function(a){delete View.Data._bindings[a]
}});Object.defineProperty(HTMLElement.prototype,"getView",{value:function(){return this._view
},writable:true});View.define({setData:function(a){this._dataId=a;this._data=View.Data._bindings[a];
return this},getData:function(){return this._data},setLayout:function(a){if(a===null){if(this._layout){this._layout.detach()
}}else{if(!(a instanceof Layout)){a=Layout.findByName(a);if(a===null){return this.setLayout(a)
}else{a=new a(this)}}}this._layout=a;return this},addBehavior:function(e){if(String.isString(e)){if(e.indexOf(" ")>0){e=e.split(" ")
}else{e=[e]}for(var c=0,d=e.length;c<d;++c){var a=Behavior.findByName(e[c]);if(a===null){throw new Error("Unknown behavior "+e[c])
}this.addBehavior(new a(this))}return this}(this._behaviors||(this._behaviors=[])).push(e);
return this},getBehaviors:function(){return this._behaviors},getElement:function(){return this._element
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
}m="var __p = '';\n"+(p.print?"function "+p.print+" ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n":"")+m+"return __p;\n";
try{this._template=new Function(p.variable,m)}catch(r){r.source=m;throw r}}else{m="return '"+k(u)+"';";
this._template=function(){return u}}this._settings=p;this._source=m}a.DefaultSettings={variable:"data",evaluate:"<%([\\s\\S]+?)%>",interpolate:"<%=([\\s\\S]+?)%>",escape:"<%!([\\s\\S]+?)%>",print:"prn"};
var h={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#27;"};var i=/[&<>"']/g;
function j(m){return h[m]}a.escapeHtml=function(m){if(!String.isString(m)){m=String(m)
}return m.replace(i,j)};a.define({getSource:function(){return this._source},render:function(m){return this._template(m)
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
}a.$T=c;a.$bind=View.Data;a.ViewTemplate=b})(this);"use strict";View.TActiveView=function(){this._active=null
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
a.getElement().classList.add("Horizontal")};Layout.Horizontal.extend(Layout,{detach:function(){this._view.getElement().classList.remove("Horizontal");
Layout.prototype.detach.call(this)}});Layout.HorizontalFlex=function(a){Layout.Horizontal.call(this,a);
a.getElement().classList.add("flex")};Layout.HorizontalFlex.extend(Layout.Horizontal,{detach:function(){this._view.getElement().classList.remove("flex");
Layout.Horizontal.prototype.detach.call(this)}});"use strict";Layout.Vertical=function(a){Layout.call(this,a);
a.getElement().classList.add("Vertical")};Layout.Vertical.extend(Layout,{detach:function(){this._view.getElement().classList.remove("Vertical");
Layout.prototype.detach.call(this)}});Layout.VerticalFlex=function(a){Layout.Vertical.call(this,a);
a.getElement().classList.add("flex")};Layout.VerticalFlex.extend(Layout.Vertical,{detach:function(){this._view.getElement().classList.remove("flex");
Layout.Vertical.prototype.detach.call(this)}});"use strict";(function(e){function d(m,n){var o=this;
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
}catch(o){if(p){k="UNEXPECTED_RESPONSE_TYPE";l=false}else{n=m.response||m.responseText
}}}else{n=m.response||m.responseText}}if(l){q={Success:true,Data:n,Cancelled:false,Request:m};
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
}}function c(){TEventDispatcher.call(this);this._groups=[];this._activeRequests=0;
this._onRequestGroupStarted=null;this._onRequestGroupFinished=null;this._onRequestGroupStarted=new EventListener("RequestGroup.Started",d.bind(this));
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
"use strict";function jsdocgen_data(b,a){jsdocgen_data._callbacks[b]({Success:true,Data:a})
}jsdocgen_data._callbacks={};(function(b){function a(c){View.call(this);this._element.classList.add("DocBlockViewer");
this._cfg=c;this._docContext=new a.SymbolContext();this._lastDocContext=null;this._req=new RequestManager();
this._req.defineGroup("index","abort");this._req.defineGroup("content","abort");this._lang=new a.Lang[c.Lang.charAt(0).toUpperCase()+c.Lang.substr(1)];
this.addView($T("Tmpl.DocBlockViewer"));this._vHeader=this.findView("#DocBlockViewer-Header");
this._vHeaderTmpl=this._vHeader.getHtml();this._vSidebar=this.findView("#DocBlockViewer-Sidebar");
this._vTabContents=this.findView("#DocBlockViewer-Tab-Contents");this._vContents=this.findView("#DocBlockViewer-Contents");
this._vContents.setLang(this._lang);this._vTabPackages=this.findView("#DocBlockViewer-Tab-Packages");
this._vPackages=this.findView("#DocBlockViewer-Packages");this._vPackages.setLang(this._lang);
this._vTabNamespaces=this.findView("#DocBlockViewer-Tab-Namespaces");this._vNamespaces=this.findView("#DocBlockViewer-Namespaces");
this._vNamespaces.setLang(this._lang);this._vRenderer=this.findView("#DocBlockViewer-Renderer");
this._vRenderer.setLang(this._lang);var d=this;this._req.addEventListener("RequestManager.Started",function(){var e=new CustomEvent("DocBlockViewer.Loading",{bubbles:false,cancelable:false});
d.dispatchEvent(e)});this._req.addEventListener("RequestManager.Finished",function(){var e=new CustomEvent("DocBlockViewer.Loaded",{bubbles:false,cancelable:false});
d.dispatchEvent(e)});window.addEventListener("hashchange",this._hashChanged.bind(this))
}a.defineStatic({Locale:{},Lang:{}});a.extend(View,{init:function(d,c){this._setHeader(d,c);
this._title=d;this._subtitle=c;this._loadIndex();this._hashChanged()},_setHeader:function(d,c){this._vHeader.setHtml(R.render(this._vHeaderTmpl,d,c))
},_requestDocJson:function(d,c,e){if(location.href.startsWith("file:///")){jsdocgen_data._callbacks[c]=e;
App.include(this._cfg.DocsLocation+c,"js",function(){this.parentNode.removeChild(this);
delete jsdocgen_data._callbacks[c]})}else{this._req.addRequest(d,{url:this._cfg.DocsLocation+c},function(f){if(f.Success){f.Data=JSON.parse(f.Data.substring(f.Data.indexOf("{"),f.Data.lastIndexOf("}")+1));
e(f)}else{}}).send()}},_loadIndex:function(){var c=this;this._requestDocJson("index","index.jsonp",function(d){c._vNamespaces.setIndex(d.Data);
c._vTabNamespaces.setState("disabled",false);c._vPackages.setIndex(d.Data);c._vTabPackages.setState("disabled",false);
if(!c._docContext.HasContents){c._vSidebar.getStrip().setActive(c._vTabPackages)}})
},_showContent:function(c){this._docContext.DocBlock=c;var e,d;if(c.def.type=="page"){e=this._title;
d=this._subtitle}else{e=(this._docContext.IsMember&&this._docContext.ContentsSymbol?'<a href="'+this._lang.makeSymbolUrl(this._docContext.DocBlock.def.type,this._docContext.DocBlock.def)+'">'+this._docContext.ContentsSymbol+"</a>::":"")+(this._docContext.SymbolPretty||this._docContext.Symbol);
d=R.get("str.docblockviewer.header.subtitle."+this._docContext.Type)}this._setHeader(e,d);
if(this._docContext.HasContents){this._vTabContents.setState("disabled",false);if(this._docContext.ContentsSymbol!=this._lastDocContext.ContentsSymbol){this._vSidebar.getStrip().setActive(this._vTabContents);
this._vContents.render(this._docContext)}}else{if(this._vSidebar.getStrip().getActive()===this._vTabContents){this._vSidebar.getStrip().setActive(this._vTabPackages)
}this._vTabContents.setState("disabled",true);this._vContents.setHtml(null)}this._vRenderer.render(this._docContext)
},_hashChanged:function(){var e=window.location.hash;this._lastDocContext=this._docContext;
this._docContext=this._lang.getSymbolContextFromUrl(e);this._vPackages.setCurrentContext(this._docContext);
this._vNamespaces.setCurrentContext(this._docContext);if(this._docContext.HasContents){this._vTabContents.setState("disabled",true)
}var c=false;if(this._docContext.ContentsSymbol){if(this._docContext.ContentsSymbol!=this._lastDocContext.ContentsSymbol){c=true
}else{if(this._lastDocContext.DocBlock===null){c=true}}}else{if(this._docContext.Symbol!=this._lastDocContext.Symbol){c=true
}else{if(this._docContext.Ns!=this._lastDocContext.Ns){c=true}}}if(c){var d=this;
return this._requestDocJson("content",this._docContext.File,function(f){d._showContent(f.Data)
})}else{this._showContent(this._lastDocContext.DocBlock)}}});b.DocBlockViewer=a})(this);
"use strict";(function(a){function b(){this.Type=null;this.File=null;this.HasContents=false;
this.ContentsSymbol=null;this.Ns=null;this.Symbol=null;this.SymbolPretty=null;this.IsMember=false;
this.DocBlock=null}a.DocBlockViewer.SymbolContext=b})(this);"use strict";(function(a){a.DocBlockViewer.Locale.EN={str:{app:{title:"Documentation",subtitle:"Generated by jsdocgen",loading:"Loading..."},docblockviewer:{header:{subtitle:{"class":"Class",trait:"Trait","interface":"Interface","function":"Function",file:"File","const":"Constant","var":"Property",method:"Method"}},sidebar:{symbols:{"class":"Classes",trait:"Traits","interface":"Interfaces","function":"Functions",file:"Files","const":"Constants","var":"Properties",method:"Methods"},contents:"Contents",packages:"Packages",namespaces:"Namespaces"},renderer:{summary:"Summary",attributes:"Attributes",syntax:"Syntax",remarks:"Remarks","inherited-types":"Inherited types","derived-types":"Derived types","const":"{str.docblockviewer.sidebar.symbols.const}","var":"{str.docblockviewer.sidebar.symbols.var}",method:"{str.docblockviewer.sidebar.symbols.method}",name:"Name",seealso:"See also",deprecated:"Deprecated",vartype:"Type",varvalue:"Default",constvalue:"Value","arguments":"Arguments",vaarg:"This {1} accepts variable number of arguments.","throws":"Throws",returns:"Return value",inherited:"inherited",inheritedfrom:"Inherited from {1}",meta:"Meta",autoinheritdoc:"Docs origin",copyright:"Copyright",license:"License",author:"Author","author-inherited":"Author ({1})",namespace:"Namespace",file:"File","package":"Package"}}}}
})(this);"use strict";(function(c){function d(){}var a=/[\/\\]/g;var b=/^(php:)?([^\/]+)\/([^ ]+) ?(.*)$/;
d.define({getName:function(){return"php"},parseSeeTag:function(g){var e=g.match(b);
if(e===null){return g}var j=e[1];var h=e[2];var g=e[3];var i=e[4];if(j){var f="http://www.php.net/";
if(h=="class"||h=="function"){f+=h+"."+g}else{if(h=="var"||h=="method"||h=="const"){f+=g.replace(a,"/")
}}return{url:f,name:i}}else{if(h=="url"){return{url:g,name:i}}else{return{url:"#"+h+"/"+g,name:i}
}}},makeSymbolUrl:function(h,g,f){var e="#"+h+"/"+(f&&g.ns?f.groups.ns[g.ns].replace(a,"/")+"/":"")+(g["class"]?g["class"].replace(a,"/")+"/":"")+g.name.replace(a,"/");
return e},getSymbolContextFromUrl:function(f){var e=new DocBlockViewer.SymbolContext();
var k=f.substr(1);if(k.length==0||k=="intro"){e.HasContents=false;e.ContentsSymbol="page/intro.jsonp";
e.File="intro.jsonp";return e}var g=k.indexOf("/");var j=k.substr(0,g);e.Type=j;function l(m){var i=m.lastIndexOf("\\");
if(i>0){return m.substr(0,i)}else{return"<global>"}}if(j=="class"||j=="interface"||j=="trait"){e.HasContents=true;
e.ContentsSymbol=k.substr(g+1).replace(a,"\\");e.Symbol=e.ContentsSymbol;e.Ns=l(e.Symbol);
j="class"}else{if(j=="method"||j=="var"||j=="const"){var h=k.lastIndexOf("/");e.HasContents=true;
e.ContentsSymbol=k.substring(g+1,h).replace(a,"\\");e.Ns=l(e.ContentsSymbol);e.Symbol=k.substr(h+1);
e.IsMember=true}else{if(j=="file"){e.Symbol=k.substr(g+1)}else{if(j=="function"){e.Symbol=k.substr(g+1).replace(a,"\\");
e.Ns=l(e.Symbol)}}}}if(j=="var"){e.SymbolPretty="$"+e.Symbol}else{if(j=="method"||j=="function"){e.SymbolPretty=e.Symbol+"()"
}}if(j=="method"||j=="var"||j=="const"){e.File="class_"+e.ContentsSymbol.replace(a,".")+".jsonp"
}else{e.File=j+"_"+k.substr(g+1).replace(a,".")+".jsonp"}return e}});c.DocBlockViewer.Lang.Php=d
})(this);"use strict";(function(b){function c(){View.HtmlArea.call(this);this._element.classList.add("DocBlockViewer-Renderer");
this._lang=null}var a=/{@see (.+?)}/g;c.extend(View.HtmlArea,{setLang:function(d){this._lang=d;
return this},render:function(f){var j=this;var q=f.DocBlock;var k=f.DocBlock;if(f.Type=="method"||f.Type=="var"||f.Type=="const"){var t=q.members[f.Type].index[f.Symbol];
if(t!==undefined){q=q.members[f.Type][t]}}function r(y){if(!y){return y}y=y.replace(a,function(z,A){return $TT("Tmpl.DocBlockViewer.Renderer.SeeTag",j._lang.parseSeeTag(A))
});return y}function i(y){if(y.summary===undefined){return""}return $TT("Tmpl.DocBlockViewer.Renderer.Summary",r(y.summary))
}function o(y){if(y.def.declared||y.def.access=="protected"||y.def.access=="private"||y.def["abstract"]||y.def.attr){return $TT("Tmpl.DocBlockViewer.Renderer.SymbolAttrsSection",y.def)
}return""}function s(y){if(y.def.type=="method"||y.def.type=="function"){return $TT("Tmpl.DocBlockViewer.Renderer.Syntax",{def:y.def,parseUrl:j._lang.parseSeeTag})
}return""}function d(y){if(!y.def.args){return""}var C=[];var z=y.def.args;C.length=z.length;
for(var A=z.length-1;A>=0;--A){var B=z[A];C[A]={def:B,parseUrl:j._lang.parseSeeTag};
if(B.description){B.description=r(B.description)}}if(y.def.vaarg){C.push({def:{name:"...",description:y.def.vaarg===true?R.get("str.docblockviewer.renderer.vaarg",y.def.type):r(y.def.vaarg)},parseUrl:j._lang.parseSeeTag})
}return $TT("Tmpl.DocBlockViewer.Renderer.Arguments",C)}function e(y){if(y.tags["throws"]===undefined){return""
}var C=[];var A=y.tags["throws"];C.length=A.length;for(var z=A.length-1;z>=0;--z){var B=A[z];
C[z]={def:B,parseUrl:j._lang.parseSeeTag};if(B.description){B.description=r(B.description)
}}return $TT("Tmpl.DocBlockViewer.Renderer.Throws",C)}function g(y){if(y.def.type!="var"&&y.def.type!="const"){return""
}if(!y.def.description&&!y.def.vartype&&!y.def.value){return""}var z={def:y.def,parseUrl:j._lang.parseSeeTag};
if(z.def.description){z.def.description=r(z.def.description)}return $TT("Tmpl.DocBlockViewer.Renderer.VariableSyntax",z)
}function n(y){if(y.def["return"]===undefined){return""}if(!y.def["return"].description&&!y.def["return"].vartype){return""
}var z={def:y.def["return"],parseUrl:j._lang.parseSeeTag};if(z.def.description){z.def.description=r(z.def.description)
}return $TT("Tmpl.DocBlockViewer.Renderer.Returns",z)}function x(G){var y=G.def;var z=[];
var B={"extends":"class","implements":"interface",uses:"trait"};for(var D in B){if(y[D] instanceof Array&&y[D].length>0){var C=y[D];
for(var A=0,F=C.length;A<F;++A){var E=C[A];z.push({name:E.name,direct:E.direct,url:j._lang.parseSeeTag(E.link).url})
}}}return z.length>0?$TT("Tmpl.DocBlockViewer.Renderer.InheritedTypes",z):""}function w(y){var E=y.def;
if(E.derived===undefined||E.derived.length==0){return""}var D=[];D.length=E.derived.length;
var C=E.derived;for(var z=0,A=C.length;z<A;++z){var B=C[z];D[z]={name:B.name,direct:B.direct,url:j._lang.parseSeeTag(B.link).url}
}return $TT("Tmpl.DocBlockViewer.Renderer.DerivedTypes",D)}function v(y){if(y.members===undefined){return""
}var E=0;var D={"const":[],"var":[],method:[]};for(var B in y.members){var z=y.members[B];
if(z.length>0){++E;for(var A=0,C=z.length;A<C;++A){D[B].push({type:B,name:z[A].def.name,summary:r(z[A].summary),symbol:z[A].def,url:j._lang.makeSymbolUrl(B,z[A].def)})
}}}return E>0?$TT("Tmpl.DocBlockViewer.Renderer.Members",D):""}function h(y){if(y.description===undefined){return""
}return $TT("Tmpl.DocBlockViewer.Renderer.Remarks",{text:r(y.description),context:y.def})
}function u(y){if(y.tags.deprecated===undefined){return""}return $TT("Tmpl.DocBlockViewer.Renderer.Deprecated",y.tags.deprecated.description||null)
}function p(y){var z=y.tags.see;if(z===undefined){return""}var B=[];B.length=z.length;
for(var A=z.length-1;A>=0;--A){B[A]=j._lang.parseSeeTag(z[A])}return $TT("Tmpl.DocBlockViewer.Renderer.SeeSection",B)
}function m(y){var D=[];var z=y.tags["package"]||k.tags["package"];if(z){D.push({name:"package",value:TextTemplate.escapeHtml(z)})
}if(f.Ns){D.push({name:"namespace",value:TextTemplate.escapeHtml(f.Ns)})}var B;if(y.def.type=="file"){B=y.def.name
}else{B=y.tags.file?y.tags.file.name:(k.tags.file?k.tags.file.name:null)}if(B){D.push({name:"file",value:B})
}if(y.tags.autoinheritdoc instanceof Object){D.push({name:"autoinheritdoc",value:'<a href="'+j._lang.parseSeeTag(y.tags.autoinheritdoc.link).url+'">'+y.tags.autoinheritdoc.name+"</a>"})
}["author","license","copyright"].forEach(function(G){if(y.tags[G]!==undefined){var E=y.tags[G];
for(var F=0,H=E.length;F<H;++F){D.push({name:G,value:r(E[F])})}}});if(f.IsMember&&k.tags.author!==undefined){for(var A=0,C=k.tags.author.length;
A<C;++A){D.push({name:"author-inherited",value:r(k.tags.author[A]),parentType:k.def.type})
}}return D.length>0?$TT("Tmpl.DocBlockViewer.Renderer.Meta",D):""}var l="";l+=i(q);
l+=u(q);l+=o(q);l+=s(q);l+=e(q);l+=n(q);l+=d(q);l+=g(q);l+=x(q);l+=w(q);l+=h(q);l+=v(q);
l+=p(q);l+=m(q);this.setHtml(l)}});b.DocBlockViewer.Renderer=c})(this);"use strict";
(function(b){function a(){View.Accordion.call(this);this.setBehavior("auto");this._lang=null;
this._index=null;var f=this;this.once("ActiveView.Activated",function(){var j=new EventListener("ActiveView.Activated",function(){this.findView(".AccordionItemContents").setLang(f._lang).setIndex(f._index).setType(f.accordionType).render()
},"capture");var g=$T("Tmpl.DocBlockViewer.Accordion",f.getTmplData());for(var h=g.length-1;
h>=0;--h){j.once(g[h])}f.addView(g);if(g.length>0){var k=location.hash;if(k){for(var h=g.length-1;
h>=0;--h){if(f.findSymbol(k,h)){f.setActive(g[h]);break}}}}},"capture")}a.extend(View.Accordion,{setCurrentContext:function(f){this._docContext=f
},findSymbol:function(m,l){for(var h in this._index.symbols){var f=this._index.symbols[h];
for(var g=0,j=f.length;g<j;++g){var k=f[g];if(k[this.accordionType]!=l){continue}if(this._lang.makeSymbolUrl(h,k,this._index)==m){return true
}}}return false},setLang:function(f){this._lang=f;return this},setIndex:function(f){this._index=f;
return this},getTmplData:function(){var j=[];var f=this._index.groups[this.accordionType];
j.length=f.length;for(var g=0,h=f.length;g<h;++g){j[g]={name:f[g]}}return j},setType:function(f){this.accordionType=f
}});function d(f){View.HtmlArea.call(this);this._element.classList.add("AccordionItemContents");
this._groupIndex=parseInt(f);this._lang=null;this._index=null}d.extend(View.HtmlArea,{setLang:function(f){this._lang=f;
return this},setGroupIndex:function(f){this._groupIndex=f},setIndex:function(f){this._index=f;
return this},render:function(){var f=/\\/g;var m={};for(var j in this._index.symbols){var g=this._index.symbols[j];
m[j]=[];for(var h=0,k=g.length;h<k;++h){var l=g[h];if(l[this.accordionType]!=this._groupIndex){continue
}m[j].push({url:this._lang.makeSymbolUrl(j,l,this._index),name:l.name})}}this.setHtml($TT("Tmpl.DocBlockViewer.Accordion.Contents",m))
},setType:function(f){this.accordionType=f;return this}});function c(){a.call(this);
this.setType("ns")}c.extend(a);function e(){a.call(this);this.setType("pkg")}e.extend(a);
b.DocBlockViewer.Namespaces=c;b.DocBlockViewer.Packages=e;b.DocBlockViewer.AccordionItemContents=d
})(this);"use strict";(function(a){function b(){View.HtmlArea.call(this);this.setBehavior("auto");
this._lang=null}b.extend(View.HtmlArea,{setLang:function(c){this._lang=c;return this
},render:function(f){for(var e in f.DocBlock.members){var c=f.DocBlock.members[e];
c.index={};for(var d=c.length-1;d>=0;--d){var j=c[d];c.index[j.def.name]=d}}var h={"const":[],"var":[],method:[]};
for(var e in f.DocBlock.members){var c=f.DocBlock.members[e];for(var d=0,g=c.length;
d<g;++d){var j=c[d];h[e].push({url:this._lang.makeSymbolUrl(e,j.def),symbol:j.def})
}}this.setHtml($TT("Tmpl.DocBlockViewer.Contents",h))}});a.DocBlockViewer.Contents=b
})(this);"use strict";"use strict";"use strict";TextTemplate.Cache["Tmpl.DocBlockViewer.Contents"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '';\nfor ( var key in data ) {\r\n\t\tvar list = data[key];\r\n\t\tif ( list.length == 0 ) {\r\n\t\t\tcontinue;\r\n\t\t}\n__p += '\\\r\\\n\\\t\\\t<h6>';\n__p += (  R.get( 'str.docblockviewer.sidebar.symbols.' + key ) \n);\n__p += '</h6>\\\r\\\n\\\t\\\t<ul class=\"unstyled no-margin-bottom\">\\\r\\\n\\\t\\\t';\nfor ( var i = 0, iend = list.length; i < iend; ++i ) {\r\n\t\t\tvar item = list[i];\n__p += '\\\r\\\n\\\t\\\t\\\t<li>';\n__p += (  $TT( 'Tmpl.DocBlockViewer.Renderer.SymbolAttrsShort', item.symbol ) \n);\n__p += ' <a href=\"';\n__p += (  item.url \n);\n__p += '\">';\n__p += (  item.symbol.type == 'var' ? '$' : '' \n);\n__p += '';\n__p += (  item.symbol.name \n);\n__p += '';\n__p += (  item.symbol.type == 'method' ? '()' : '' \n);\n__p += '</a></li>\\\r\\\n\\\t\\\t';\n}\n__p += '\\\r\\\n\\\t\\\t</ul>\\\r\\\n\\\t';\n}\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Accordion"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '<Template>';\ndata.forEach( function ( item, index ) {\n__p += '\\\r\\\n\\\t<View class=\"AccordionItem\">\\\r\\\n\\\t\\\t<Label class=\"AccordionItemTitle\">\\\r\\\n\\\t\\\t\\\t<StockImg image=\"';\n__p += (  item.starred ? 'star' : 'star-empty' \n);\n__p += '\" />\\\r\\\n\\\t\\\t\\\t<Txt text=\"';\n__p += TextTemplate.escapeHtml(  item.name \n);\n__p += '\" />\\\r\\\n\\\t\\\t</Label>\\\r\\\n\\\t\\\t<DocBlockViewer.AccordionItemContents class=\"no-user-select\" group-index=\"';\n__p += (  index \n);\n__p += '\" />\\\r\\\n\\\t</View>\\\r\\\n\\\t';\n} );\n__p += '</Template>';\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Accordion.Contents"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '';\nfor ( var key in data ) {\r\n\t\tvar list = data[key];\r\n\t\tif ( list.length == 0 ) {\r\n\t\t\tcontinue;\r\n\t\t}\n__p += '\\\r\\\n\\\t\\\t\\\t<h6>';\n__p += (  R.get( 'str.docblockviewer.sidebar.symbols.' + key ) \n);\n__p += '</h6>\\\r\\\n\\\t\\\t\\\t<ul class=\"unstyled no-margin-bottom\">\\\r\\\n\\\t\\\t\\\t';\nfor ( var i = 0, iend = list.length; i < iend; ++i ) {\r\n\t\t\t\tvar item = list[i];\n__p += '\\\r\\\n\\\t\\\t\\\t\\\t<li><a href=\"';\n__p += (  item.url \n);\n__p += '\">';\n__p += (  item.name \n);\n__p += '</a></li>\\\r\\\n\\\t\\\t\\\t';\n}\n__p += '\\\r\\\n\\\t\\\t\\\t</ul>\\\r\\\n\\\t\\\t';\n}\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Renderer.SeeTag"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '<a href=\"';\n__p += (  data.url \n);\n__p += '\">';\n__p += TextTemplate.escapeHtml(  data.name \n);\n__p += '</a>';\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Renderer.SeeSection"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '\\\r\\\n<h5>';\n__p += (  R.get( 'str.docblockviewer.renderer.seealso' ) \n);\n__p += '</h5>\\\r\\\n<ul>\\\r\\\n\\\t';\ndata.forEach( function( item ) {\n__p += '\\\r\\\n\\\t\\\t<li><a href=\"';\n__p += (  item.url \n);\n__p += '\">';\n__p += TextTemplate.escapeHtml(  item.name \n);\n__p += '</a></li>\\\r\\\n\\\t';\n} );\n__p += '\\\r\\\n</ul>\\\r\\\n';\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Renderer.Summary"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '\\\r\\\n<div class=\"lead\">';\n__p += (  data \n);\n__p += '</div>\\\r\\\n';\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Renderer.Throws"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '\\\r\\\n<h5>';\n__p += (  R.get( 'str.docblockviewer.renderer.throws' ) \n);\n__p += '</h5>\\\r\\\n';\nfor ( var i = 0; i < data.length; ++i ) {\r\n\tprn( $TT( 'Tmpl.DocBlockViewer.Renderer.Type', data[i] ) );\r\n}\n__p += '\\\r\\\n';\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Renderer.Returns"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '\\\r\\\n<h5>';\n__p += (  R.get( 'str.docblockviewer.renderer.returns' ) \n);\n__p += '</h5>\\\r\\\n';\n__p += (  $TT( 'Tmpl.DocBlockViewer.Renderer.Type', data ) \n);\n__p += '\\\r\\\n';\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Renderer.Type"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '\\\r\\\n';\nvar def = data.def;\r\n\t//todo: this function has no place here\r\n\tvar url = data.parseUrl;\r\n\r\n\tif ( def.vartype !== undefined ) {\r\n\tprn( '<dt>' );\r\n\tfor ( var i = 0; i < def.vartype.length; ++i ) {\r\n\t\tif ( i > 0 ) {\r\n\t\t\tprn( ' | ' );\r\n\t\t}\r\n\t\tif ( def.vartype[i].link ) {\r\n\t\t\tprn( '<a href=\"' );\r\n\t\t\tprn( url( def.vartype[i].link ).url, true );\r\n\t\t\tprn( '\">' );\r\n\t\t\tprn( def.vartype[i].name, true );\r\n\t\t\tprn( '</a>' )\r\n\t\t}\r\n\t\telse {\r\n\t\t\tprn( def.vartype[i].name, true );\r\n\t\t}\r\n\t}\r\n\tprn( '</dt>' );\r\n}\n__p += '\\\r\\\n<dd>\\\r\\\n\\\t';\nif ( def.description ) {\n__p += '\\\r\\\n\\\t<p>';\n__p += (  def.description \n);\n__p += '</p>\\\r\\\n\\\t';\n}\n__p += '\\\r\\\n</dd>\\\r\\\n';\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Renderer.Arguments"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '\\\r\\\n<h5>';\n__p += (  R.get( 'str.docblockviewer.renderer.arguments' ) \n);\n__p += '</h5>\\\r\\\n<dl>\\\r\\\n';\nfor ( var i = 0; i < data.length; ++i ) {\r\n\tprn( $TT( 'Tmpl.DocBlockViewer.Renderer.Variable', data[i] ) );\r\n}\n__p += '\\\r\\\n</dl>\\\r\\\n';\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Renderer.VariableSyntax"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '\\\r\\\n<h5>';\n__p += (  R.get( 'str.docblockviewer.renderer.syntax' ) \n);\n__p += '</h5>\\\r\\\n';\n__p += (  $TT( 'Tmpl.DocBlockViewer.Renderer.Variable', data ) \n);\n__p += '\\\r\\\n';\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Renderer.Variable"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '\\\r\\\n';\nvar def = data.def;\r\n\t//todo: this function has no place here\r\n\tvar url = data.parseUrl;\r\n\tvar isvar = def.name != '...' && def.type != 'const';\r\n\tvar isarg = def.name == '...' || def.type === undefined;\n__p += '\\\r\\\n<dt>';\n__p += (  ( isvar ? '$' : '' ) + def.name \n);\n__p += '</dt>\\\r\\\n<dd>\\\r\\\n\\\t';\nif ( def.vartype || ( isarg && def.name != '...' ) ) {\n__p += '\\\r\\\n\\\t<p>';\n__p += (  R.get( 'str.docblockviewer.renderer.vartype' ) \n);\n__p += ': ';\nif ( !def.vartype ) {\r\n\t\t\tprn( 'mixed' );\r\n\t\t}\r\n\t\telse {\r\n\t\t\tfor ( var i = 0; i < def.vartype.length; ++i ) {\r\n\t\t\t\tif ( i > 0 ) {\r\n\t\t\t\t\tprn( ' | ' );\r\n\t\t\t\t}\r\n\t\t\t\tif ( def.vartype[i].link ) {\r\n\t\t\t\t\tprn( '<a href=\"' );\r\n\t\t\t\t\tprn( url( def.vartype[i].link ).url, true );\r\n\t\t\t\t\tprn( '\">' );\r\n\t\t\t\t\tprn( def.vartype[i].name, true );\r\n\t\t\t\t\tprn( '</a>' )\r\n\t\t\t\t}\r\n\t\t\t\telse {\r\n\t\t\t\t\tprn( def.vartype[i].name, true );\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\n__p += '</p>\\\r\\\n\\\t';\n}\n__p += '\\\r\\\n\\\t';\nif ( def.value ) {\n__p += '\\\r\\\n\\\t<p>';\n__p += (  R.get( 'str.docblockviewer.renderer.'+(def.type=='const'?'const':'var')+'value' ) \n);\n__p += ': ';\nif ( def.value.indexOf( '\\n' ) > 0 ) {\r\n\t\t\tprn( '<code>' );\r\n\t\t\tprn( def.value );\r\n\t\t\tprn( '</code>' );\r\n\t\t}\r\n\t\telse {\r\n\t\t\tprn( '<span class=\"label\">' );\r\n\t\t\tprn( def.value );\r\n\t\t\tprn( '</span>' );\r\n\t\t}\n__p += '</p>\\\r\\\n\\\t';\n}\n__p += '\\\r\\\n\\\t';\nif ( def.description ) {\n__p += '\\\r\\\n\\\t<p>';\n__p += (  def.description \n);\n__p += '</p>\\\r\\\n\\\t';\n}\n__p += '\\\r\\\n</dd>\\\r\\\n';\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Renderer.SymbolAttrsShort"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '\\\r\\\n';\nif ( data.attr ) {\r\n\t\tprn( '<span class=\"label inverse small\" title=\"'+data.attr+'\">'+data.attr.charAt(0)+'</span>' );\r\n\t}\r\n\r\n\tif ( data.access == 'private' ) {\r\n\t\tprn( '<span class=\"label error small\" title=\"private\">p</span>' );\r\n\t}\r\n\telse if ( data.access == 'protected' ) {\r\n\t\tprn( '<span class=\"label warning small\" title=\"protected\">p</span>' );\r\n\t}\r\n\r\n\tif ( data.static ) {\r\n\t\tprn( '<span class=\"label success small\" title=\"static\">s</span>' );\r\n\t}\r\n\r\n\tif ( data.declared ) {\r\n\t\tprn( '<span class=\"label info small\" title=\"'+R.get( 'str.docblockviewer.renderer.inheritedfrom', data.declared )+'\">')\r\n\t\tprn( R.get( 'str.docblockviewer.renderer.inherited' ).charAt(0) );\r\n\t\tprn( '</span>' );\r\n\t}\n__p += '\\\r\\\n';\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Renderer.SymbolAttrsSection"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '\\\r\\\n<h5>';\n__p += (  R.get( 'str.docblockviewer.renderer.attributes' ) \n);\n__p += '</h5>\\\r\\\n';\n__p += (  $TT( 'Tmpl.DocBlockViewer.Renderer.SymbolAttrs', data ) \n);\n__p += '\\\r\\\n';\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Renderer.SymbolAttrs"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '\\\r\\\n';\nif ( data.attr ) {\r\n\t\tprn( '<span class=\"label inverse\">'+data.attr+'</span>' );\r\n\t}\r\n\r\n\tif ( data.access == 'private' ) {\r\n\t\tprn( '<span class=\"label error\">private</span>' );\r\n\t}\r\n\telse if ( data.access == 'protected' ) {\r\n\t\tprn( '<span class=\"label warning\">protected</span>' );\r\n\t}\r\n\r\n\tif ( data.static ) {\r\n\t\tprn( '<span class=\"label success\">static</span>' );\r\n\t}\r\n\r\n\tif ( data.declared ) {\r\n\t\tprn( '<span class=\"label info\" title=\"'+R.get( 'str.docblockviewer.renderer.inheritedfrom', data.declared )+'\">')\r\n\t\tprn( R.get( 'str.docblockviewer.renderer.inherited' ) );\r\n\t\tprn( '</span>' );\r\n\t}\n__p += '\\\r\\\n';\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Renderer.Syntax"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '\\\r\\\n';\nvar def = data.def;\r\n\t//todo: this function has no place here\r\n\tvar url = data.parseUrl;\r\n\r\n\tfunction vartype ( v ) {\r\n\t\tif ( v === undefined || v.length > 1 ) { \r\n\t\t\tprn( 'mixed' );\r\n\t\t}\r\n\t\telse if ( v.length == 1 ) {\r\n\t\t\tif ( v[0].link ) {\r\n\t\t\t\tprn( '<a href=\"' );\r\n\t\t\t\tprn( url( v[0].link ).url, true );\r\n\t\t\t\tprn( '\">' );\r\n\t\t\t\tprn( v[0].name, true );\r\n\t\t\t\tprn( '</a>' )\r\n\t\t\t}\r\n\t\t\telse {\r\n\t\t\t\tprn( v[0].name, true );\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n\tfunction varvalue ( v ) {\r\n\t\tif ( v.startsWith( 'array(' ) ) {\r\n\t\t\t//todo: this is php specific\r\n\t\t\tv = v.slice( 0, 6 ) + ( v.lastIndexOf( ')' ) > 6 ? '...' + v.lastIndexOf( ')' ) : ')' );\r\n\t\t}\r\n\t\telse if ( v.length > 25 ) {\r\n\t\t\tv = '...';\r\n\t\t}\r\n\t\tprn( v );\r\n\t}\n__p += '\\\r\\\n<h5>';\n__p += (  R.get( 'str.docblockviewer.renderer.syntax' ) \n);\n__p += '</h5>\\\r\\\n<code class=\"prettyprinted block gray\">';\n//var attrs = $TT( 'Tmpl.DocBlockViewer.Renderer.SymbolAttrs', def );\r\n\t//if ( attrs.length ) {\r\n\t//\tprn( attrs + ' ' );\r\n\t//}\r\n\r\n\t// return value\r\n\tvartype( def.return ? def.return.vartype : null );\r\n\r\n\t// method name\r\n\tprn( def.byref ? ' &' : ' ' );\r\n\tprn( '<span class=\"keyword\">' );\r\n\tprn( def.name );\r\n\tprn( '</span>' );\r\n\t\r\n\tprn( ' (' );\r\n\t// args\r\n\tif ( def.vaarg || (def.args && def.args.length > 0) ) {\r\n\t\tprn( '<table><tbody>' );\r\n\t\tif ( def.args ) {\r\n\t\t\tfor ( var i = 0, last = def.args.length - 1 + (def.vaarg ? 1 : 0 ); i < def.args.length; ++i ) {\r\n\t\t\t\tvar arg = def.args[i];\r\n\t\t\t\tprn( '<tr><td>    ' );\r\n\t\t\t\tvartype( arg.vartype );\r\n\t\t\t\tprn( '</td><td><strong>' );\r\n\t\t\t\tprn( arg.byref ? ' &$' : ' $' );\r\n\t\t\t\tprn( arg.name );\r\n\t\t\t\tprn( '</strong>' )\r\n\t\t\t\tif ( arg.value ) {\r\n\t\t\t\t\tprn( ' = ' );\r\n\t\t\t\t\tprn( '<span class=\"label\">' );\r\n\t\t\t\t\tvarvalue( arg.value );\r\n\t\t\t\t\tprn( '</span>' );\r\n\t\t\t\t}\r\n\t\t\t\tprn( i < last ? ',' : '' );\r\n\t\t\t\tprn( '</td></tr>' );\r\n\t\t\t}\r\n\t\t}\r\n\t\tif ( def.vaarg ) {\r\n\t\t\tprn( '<tr><td colspan=\"'+(def.args&&def.args.length>0?2:1)+'\">    ...</td></tr>' );\r\n\t\t}\r\n\t\tprn( '<tbody></table>' );\r\n\t}\r\n\tprn( ')' );\n__p += '</code>\\\r\\\n';\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Renderer.Deprecated"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '\\\r\\\n<div class=\"alert error\">\\\r\\\n\\\t<h5>';\n__p += (  R.get( 'str.docblockviewer.renderer.deprecated' ) \n);\n__p += '</h5>\\\r\\\n\\\t';\nif ( data ) {\n__p += '<p>';\n__p += (  data \n);\n__p += '</p>';\n}\n__p += '\\\r\\\n</div>\\\r\\\n';\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Renderer.Remarks"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '\\\r\\\n';\nif ( data.context.type != 'page' ) {\n__p += '<h5>';\n__p += (  R.get( 'str.docblockviewer.renderer.remarks' ) \n);\n__p += '</h5>';\n}\n__p += '\\\r\\\n';\n__p += (  data.text \n);\n__p += '\\\r\\\n';\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Renderer.InheritedTypes"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '\\\r\\\n<h5>';\n__p += (  R.get( 'str.docblockviewer.renderer.inherited-types' ) \n);\n__p += '</h5>\\\r\\\n';\ndata.forEach ( function( item, i ) {\n__p += '';\n__p += (  i > 0 ? ', ' : '' \n);\n__p += '<a href=\"';\n__p += (  item.url \n);\n__p += '\">';\n__p += (  item.direct ? '<strong>' : '' \n);\n__p += '';\n__p += TextTemplate.escapeHtml(  item.name \n);\n__p += '';\n__p += (  item.direct ? '</strong>' : '' \n);\n__p += '</a>';\n} );\n__p += '\\\r\\\n';\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Renderer.DerivedTypes"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '\\\r\\\n<h5>';\n__p += (  R.get( 'str.docblockviewer.renderer.derived-types' ) \n);\n__p += '</h5>\\\r\\\n';\ndata.forEach ( function( item, i ) {\n__p += '';\n__p += (  i > 0 ? ', ' : '' \n);\n__p += '<a href=\"';\n__p += (  item.url \n);\n__p += '\">';\n__p += (  item.direct ? '<strong>' : '' \n);\n__p += '';\n__p += TextTemplate.escapeHtml(  item.name \n);\n__p += '';\n__p += (  item.direct ? '</strong>' : '' \n);\n__p += '</a>';\n} );\n__p += '\\\r\\\n';\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Renderer.Members"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '\\\r\\\n<table class=\"table bordered members\">\\\r\\\n\\\t<tbody>\\\r\\\n\\\t\\\t';\nfor ( var type in data ) {\r\n\t\t\tif ( data[type].length == 0 ) {\r\n\t\t\t\tcontinue;\r\n\t\t\t}\n__p += '\\\r\\\n\\\t\\\t\\\t\\\t<tr class=\"section\"><td colspan=\"3\"><h5>';\n__p += (  R.get( 'str.docblockviewer.renderer.' + type ) \n);\n__p += '</h5></td></tr>\\\r\\\n\\\t\\\t\\\t\\\t<tr class=\"heading\"><td></td><td>';\n__p += (  R.get( 'str.docblockviewer.renderer.name') \n);\n__p += '</td><td>';\n__p += (  R.get( 'str.docblockviewer.renderer.summary') \n);\n__p += '</td></tr>\\\r\\\n\\\t\\\t\\\t\\\t';\ndata[type].forEach ( function( item, i, arr ) {\n__p += '\\\r\\\n\\\t\\\t\\\t\\\t\\\t<tr';\n__p += (  i == arr.length - 1 ? ' class=\"last\"' : '' \n);\n__p += '><td>';\n__p += (  $TT( 'Tmpl.DocBlockViewer.Renderer.SymbolAttrsShort', item.symbol ) \n);\n__p += '</td><td><a href=\"';\n__p += (  item.url \n);\n__p += '\">';\n__p += (  item.type == 'var' ? '$' : '' \n);\n__p += '';\n__p += (  item.name \n);\n__p += '';\n__p += (  item.type == 'method' ? '()' : '' \n);\n__p += '</td><td>';\n__p += (  item.summary || '-' \n);\n__p += '</td></tr>\\\r\\\n\\\t\\\t\\\t\\\t';\n} );\n__p += '\\\r\\\n\\\t\\\t';\n}\n__p += '\\\r\\\n\\\t</tbody>\\\r\\\n</table>\\\r\\\n';\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer.Renderer.Meta"]="var __p = '';\nfunction prn ( t, e ) { __p += e ? TextTemplate.escapeHtml( t ) : t; };\n__p += '\\\r\\\n<h5>';\n__p += (  R.get( 'str.docblockviewer.renderer.meta' ) \n);\n__p += '</h5>\\\r\\\n<table class=\"table\">\\\r\\\n\\\t<tbody>\\\r\\\n\\\t';\ndata.forEach ( function( item ) {\n__p += '\\\r\\\n\\\t\\\t<tr><td><strong>';\n__p += (  R.get( 'str.docblockviewer.renderer.' + item.name, item.parentType ) \n);\n__p += '</strong></td><td>';\n__p += (  item.value \n);\n__p += '</td></tr>\\\r\\\n\\\t';\n} );\n__p += '\\\r\\\n\\\t</tbody>\\\r\\\n</table>\\\r\\\n';\nreturn __p;\n";
TextTemplate.Cache["Tmpl.DocBlockViewer"]='return \'<Template>\\\r\\\n<View class="align-center responsive">\\\r\\\n\\\t<HtmlArea id="DocBlockViewer-Header">\\\r\\\n\\\t\\\t<h2 class="page-header">{1} <small>{2}</small></h2>\\\r\\\n\\\t</HtmlArea>\\\r\\\n</View>\\\r\\\n<View layout="Horizontal" class="align-center some-padding-top medium-padding-bottom responsive">\\\r\\\n\\\t\\\r\\\n\\\r\\\n\\\t<TabView id="DocBlockViewer-Sidebar">\\\r\\\n\\\r\\\n\\\t\\\t<TabStrip>\\\r\\\n\\\t\\\t\\\t<Label state="disabled" class="Tab" id="DocBlockViewer-Tab-Contents">\\\r\\\n\\\t\\\t\\\t\\\t<StockImg image="book" text="{str.docblockviewer.sidebar.contents}" />\\\r\\\n\\\t\\\t\\\t\\\t<Txt text="{str.docblockviewer.sidebar.contents}" />\\\r\\\n\\\t\\\t\\\t</Label>\\\r\\\n\\\t\\\t\\\t<Label state="disabled" class="Tab" id="DocBlockViewer-Tab-Packages">\\\r\\\n\\\t\\\t\\\t\\\t<StockImg image="folder-open" text="{str.docblockviewer.sidebar.packages}" />\\\r\\\n\\\t\\\t\\\t\\\t<Txt text="{str.docblockviewer.sidebar.packages}" />\\\r\\\n\\\t\\\t\\\t</Label>\\\r\\\n\\\t\\\t\\\t<Label state="disabled" class="Tab" id="DocBlockViewer-Tab-Namespaces">\\\r\\\n\\\t\\\t\\\t\\\t<StockImg image="list" text="{str.docblockviewer.sidebar.namespaces}" />\\\r\\\n\\\t\\\t\\\t\\\t<Txt text="{str.docblockviewer.sidebar.namespaces}" />\\\r\\\n\\\t\\\t\\\t</Label>\\\r\\\n\\\t\\\t</TabStrip>\\\r\\\n\\\t\\\t\\\r\\\n\\\t\\\t<ViewSwitch>\\\r\\\n\\\t\\\t\\\t<DocBlockViewer.Contents id="DocBlockViewer-Contents" class="some-padding-top" />\\\r\\\n\\\t\\\t\\\t<DocBlockViewer.Packages id="DocBlockViewer-Packages" class="some-margin-top" />\\\r\\\n\\\t\\\t\\\t<DocBlockViewer.Namespaces id="DocBlockViewer-Namespaces" class="some-margin-top" />\\\r\\\n\\\t\\\t</ViewSwitch>\\\r\\\n\\\t\\\r\\\n\\\t</TabView>\\\r\\\n\\\r\\\n\\\t<DocBlockViewer.Renderer id="DocBlockViewer-Renderer" class="vfill" />\\\r\\\n\\\r\\\n</View>\\\r\\\n<View class="align-center responsive">\\\r\\\n\\\t<HtmlArea id="DocBlockViewer-Footer">\\\r\\\n\\\t\\\t<hr/>\\\r\\\n\\\t\\\t<small>documentation generated by <a href="https://github.com/perennials/jsdocgen">jsdocgen 0.9dev</a></small>\\\r\\\n\\\t</HtmlArea>\\\r\\\n</View>\\\r\\\n</Template>\';';