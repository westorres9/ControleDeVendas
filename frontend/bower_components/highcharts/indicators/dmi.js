/*
 Highstock JS v10.3.3 (2023-01-20)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/dmi",["highcharts","highcharts/modules/stock"],function(k){a(k);a.Highcharts=k;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function k(a,h,g,k){a.hasOwnProperty(h)||(a[h]=k.apply(null,g),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:h,module:a[h]}})))}
a=a?a._modules:{};k(a,"Stock/Indicators/MultipleLinesComposition.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,h){var g=a.seriesTypes.sma.prototype,k=h.defined,u=h.error,m=h.merge,l;(function(a){function h(c){return"plot"+c.charAt(0).toUpperCase()+c.slice(1)}function z(c,b){var w=[];(c.pointArrayMap||[]).forEach(function(c){c!==b&&w.push(h(c))});return w}function f(){var c=this,b=c.linesApiNames,d=c.areaLinesNames,e=c.points,a=c.options,x=c.graph,f={options:{gapSize:a.gapSize}},
r=[],t=z(c,c.pointValKey),v=e.length,l;t.forEach(function(c,b){for(r[b]=[];v--;)l=e[v],r[b].push({x:l.x,plotX:l.plotX,plotY:l[c],isNull:!k(l[c])});v=e.length});if(c.userOptions.fillColor&&d.length){var y=t.indexOf(h(d[0]));y=r[y];d=1===d.length?e:r[t.indexOf(h(d[1]))];t=c.color;c.points=d;c.nextPoints=y;c.color=c.userOptions.fillColor;c.options=m(e,f);c.graph=c.area;c.fillGraph=!0;g.drawGraph.call(c);c.area=c.graph;delete c.nextPoints;delete c.fillGraph;c.color=t}b.forEach(function(b,d){r[d]?(c.points=
r[d],a[b]?c.options=m(a[b].styles,f):u('Error: "There is no '+b+' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names."'),c.graph=c["graph"+b],g.drawGraph.call(c),c["graph"+b]=c.graph):u('Error: "'+b+" doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")});c.points=e;c.options=a;c.graph=x;g.drawGraph.call(c)}function b(c){var b,d=[];c=c||this.points;if(this.fillGraph&&this.nextPoints){if((b=g.getGraphPath.call(this,
this.nextPoints))&&b.length){b[0][0]="L";d=g.getGraphPath.call(this,c);b=b.slice(0,d.length);for(var e=b.length-1;0<=e;e--)d.push(b[e])}}else d=g.getGraphPath.apply(this,arguments);return d}function d(b){var c=[];(this.pointArrayMap||[]).forEach(function(d){c.push(b[d])});return c}function x(){var b=this,d=this.pointArrayMap,a=[],e;a=z(this);g.translate.apply(this,arguments);this.points.forEach(function(c){d.forEach(function(d,w){e=c[d];b.dataModify&&(e=b.dataModify.modifyValue(e));null!==e&&(c[a[w]]=
b.yAxis.toPixels(e,!0))})})}var r=[],t=["bottomLine"],v=["top","bottom"],l=["top"];a.compose=function(c){if(-1===r.indexOf(c)){r.push(c);var a=c.prototype;a.linesApiNames=a.linesApiNames||t.slice();a.pointArrayMap=a.pointArrayMap||v.slice();a.pointValKey=a.pointValKey||"top";a.areaLinesNames=a.areaLinesNames||l.slice();a.drawGraph=f;a.getGraphPath=b;a.toYData=d;a.translate=x}return c}})(l||(l={}));return l});k(a,"Stock/Indicators/DMI/DMIIndicator.js",[a["Stock/Indicators/MultipleLinesComposition.js"],
a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,h,g){var k=this&&this.__extends||function(){var a=function(f,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(b,a){b.__proto__=a}||function(b,a){for(var d in a)a.hasOwnProperty(d)&&(b[d]=a[d])};return a(f,b)};return function(f,b){function d(){this.constructor=f}a(f,b);f.prototype=null===b?Object.create(b):(d.prototype=b.prototype,new d)}}(),u=h.seriesTypes.sma,m=g.correctFloat,l=g.extend,A=g.isArray,B=g.merge;
g=function(a){function f(){var b=null!==a&&a.apply(this,arguments)||this;b.options=void 0;return b}k(f,a);f.prototype.calculateDM=function(b,a,f){var d=b[a][1],g=b[a][2],h=b[a-1][1];b=b[a-1][2];return m(d-h>b-g?f?Math.max(d-h,0):0:f?0:Math.max(b-g,0))};f.prototype.calculateDI=function(b,a){return b/a*100};f.prototype.calculateDX=function(b,a){return m(Math.abs(b-a)/Math.abs(b+a)*100)};f.prototype.smoothValues=function(b,a,f){return m(b-b/f+a)};f.prototype.getTR=function(b,a){return m(Math.max(b[1]-
b[2],a?Math.abs(b[1]-a[3]):0,a?Math.abs(b[2]-a[3]):0))};f.prototype.getValues=function(a,d){d=d.period;var b=a.xData,f=(a=a.yData)?a.length:0,g=[],h=[],l=[];if(!(b.length<=d)&&A(a[0])&&4===a[0].length){var c=0,k=0,m=0,e;for(e=1;e<f;e++)if(e<=d){var n=this.calculateDM(a,e,!0);var p=this.calculateDM(a,e);var q=this.getTR(a[e],a[e-1]);c+=n;k+=p;m+=q;e===d&&(q=this.calculateDI(c,m),p=this.calculateDI(k,m),n=this.calculateDX(c,k),g.push([b[e],n,q,p]),h.push(b[e]),l.push([n,q,p]))}else n=this.calculateDM(a,
e,!0),p=this.calculateDM(a,e),q=this.getTR(a[e],a[e-1]),c=this.smoothValues(c,n,d),k=this.smoothValues(k,p,d),m=this.smoothValues(m,q,d),q=this.calculateDI(c,m),p=this.calculateDI(k,m),n=this.calculateDX(c,k),g.push([b[e],n,q,p]),h.push(b[e]),l.push([n,q,p]);return{values:g,xData:h,yData:l}}};f.defaultOptions=B(u.defaultOptions,{params:{index:void 0},marker:{enabled:!1},tooltip:{pointFormat:'<span style="color: {point.color}">\u25cf</span><b> {series.name}</b><br/><span style="color: {point.color}">DX</span>: {point.y}<br/><span style="color: {point.series.options.plusDILine.styles.lineColor}">+DI</span>: {point.plusDI}<br/><span style="color: {point.series.options.minusDILine.styles.lineColor}">-DI</span>: {point.minusDI}<br/>'},
plusDILine:{styles:{lineWidth:1,lineColor:"#06b535"}},minusDILine:{styles:{lineWidth:1,lineColor:"#f21313"}},dataGrouping:{approximation:"averages"}});return f}(u);l(g.prototype,{areaLinesNames:[],nameBase:"DMI",linesApiNames:["plusDILine","minusDILine"],pointArrayMap:["y","plusDI","minusDI"],parallelArrays:["x","y","plusDI","minusDI"],pointValKey:"y"});a.compose(g);h.registerSeriesType("dmi",g);"";return g});k(a,"masters/indicators/dmi.src.js",[],function(){})});
//# sourceMappingURL=dmi.js.map