require=function t(r,n,e){function o(i,a){if(!n[i]){if(!r[i]){var f="function"==typeof require&&require;if(!a&&f)return f(i,!0);if(u)return u(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var c=n[i]={exports:{}};r[i][0].call(c.exports,function(t){var n=r[i][1][t];return o(n?n:t)},c,c.exports,t,r,n,e)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<e.length;i++)o(e[i]);return o}({1:[function(t,r,n){function e(t){return!!t&&"object"==typeof t}function o(t,r){for(var n=-1,e=r.length,o=t.length;++n<e;)t[o+n]=r[n];return t}function u(t,r,n,i){i||(i=[]);for(var f=-1,s=t.length;++f<s;){var p=t[f];e(p)&&a(p)&&(n||c(p)||l(p))?r?u(p,r,n,i):o(i,p):n||(i[i.length]=p)}return i}function i(t){return function(r){return null==r?void 0:r[t]}}function a(t){return null!=t&&f(p(t))}function f(t){return"number"==typeof t&&t>-1&&t%1==0&&s>=t}var l=t("lodash.isarguments"),c=t("lodash.isarray"),s=9007199254740991,p=i("length");r.exports=u},{"lodash.isarguments":3,"lodash.isarray":4}],2:[function(t,r,n){function e(t){return function(r){return null==r?void 0:r[t]}}function o(t){return null!=t&&a(s(t))}function u(t,r){return t="number"==typeof t||l.test(t)?+t:-1,r=null==r?c:r,t>-1&&t%1==0&&r>t}function i(t,r,n){if(!f(n))return!1;var e=typeof r;if("number"==e?o(n)&&u(r,n.length):"string"==e&&r in n){var i=n[r];return t===t?t===i:i!==i}return!1}function a(t){return"number"==typeof t&&t>-1&&t%1==0&&c>=t}function f(t){var r=typeof t;return!!t&&("object"==r||"function"==r)}var l=/^\d+$/,c=9007199254740991,s=e("length");r.exports=i},{}],3:[function(t,r,n){function e(t){return!!t&&"object"==typeof t}function o(t){return function(r){return null==r?void 0:r[t]}}function u(t){return null!=t&&i(p(t))}function i(t){return"number"==typeof t&&t>-1&&t%1==0&&s>=t}function a(t){return e(t)&&u(t)&&l.call(t,"callee")&&!c.call(t,"callee")}var f=Object.prototype,l=f.hasOwnProperty,c=f.propertyIsEnumerable,s=9007199254740991,p=o("length");r.exports=a},{}],4:[function(t,r,n){function e(t){return!!t&&"object"==typeof t}function o(t,r){var n=null==t?void 0:t[r];return f(n)?n:void 0}function u(t){return"number"==typeof t&&t>-1&&t%1==0&&d>=t}function i(t){return a(t)&&g.call(t)==c}function a(t){var r=typeof t;return!!t&&("object"==r||"function"==r)}function f(t){return null==t?!1:i(t)?y.test(h.call(t)):e(t)&&s.test(t)}var l="[object Array]",c="[object Function]",s=/^\[object .+?Constructor\]$/,p=Object.prototype,h=Function.prototype.toString,v=p.hasOwnProperty,g=p.toString,y=RegExp("^"+h.call(v).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),b=o(Array,"isArray"),d=9007199254740991,m=b||function(t){return e(t)&&u(t.length)&&g.call(t)==l};r.exports=m},{}],5:[function(t,r,n){r.exports=function(t,r){if(null===t)throw new Error("No coordinates passed");for(var n=0;n<t.length;n++)for(var e=t[n],o=0;o<e[e.length-1].length;o++){if(e.length<4)throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");if(e[e.length-1][o]!==e[0][o])throw new Error("First and last Position are not equivalent.")}var u={type:"Feature",geometry:{type:"Polygon",coordinates:t},properties:r};return u.properties||(u.properties={}),u}},{}],"lodash.flatten":[function(t,r,n){function e(t,r,n){var e=t?t.length:0;return n&&u(t,r,n)&&(r=!1),e?o(t,r):[]}var o=t("lodash._baseflatten"),u=t("lodash._isiterateecall");r.exports=e},{"lodash._baseflatten":1,"lodash._isiterateecall":2}],"tile-cover":[function(t,r,n){function e(t){return{type:"Feature",geometry:p.tileToGeoJSON(t),properties:{}}}function o(t,r){var n,e,o=t.coordinates,a=r.max_zoom,s={},h=[];if("Point"===t.type)return[p.pointToTile(o[0],o[1],a)];if("MultiPoint"===t.type)for(n=0;n<o.length;n++)e=p.pointToTile(o[n][0],o[n][1],a),s[c(e[0],e[1],e[2])]=!0;else if("LineString"===t.type)f(s,o,a);else if("MultiLineString"===t.type)for(n=0;n<o.length;n++)f(s,o[n],a);else if("Polygon"===t.type)i(s,h,o,a);else{if("MultiPolygon"!==t.type)throw new Error("Geometry type not implemented");for(n=0;n<o.length;n++)i(s,h,o[n],a)}if(r.min_zoom!==a){var v=h.length;for(l(s,h),n=0;v>n;n++){var g=h[n];s[c(g[0],g[1],g[2])]=!0}return u(s,h,r)}return l(s,h),h}function u(t,r,n){for(var e=[],o=n.max_zoom;o>n.min_zoom;o--){for(var u={},i=[],a=0;a<r.length;a++){var f=r[a];if(f[0]%2===0&&f[1]%2===0){var l=c(f[0]+1,f[1],o),s=c(f[0],f[1]+1,o),p=c(f[0]+1,f[1]+1,o);if(t[l]&&t[s]&&t[p]){t[c(f[0],f[1],f[2])]=!1,t[l]=!1,t[s]=!1,t[p]=!1;var h=[f[0]/2,f[1]/2,o-1];o-1===n.min_zoom?e.push(h):(u[c(f[0]/2,f[1]/2,o-1)]=!0,i.push(h))}}}for(a=0;a<r.length;a++)f=r[a],t[c(f[0],f[1],f[2])]&&e.push(f);t=u,r=i}return e}function i(t,r,n,e){for(var o=[],u=0;u<n.length;u++){var i=[];f(t,n[u],e,i);for(var l=0,s=i.length,p=s-1;s>l;p=l++){var h=(l+1)%s,v=i[l][1];(v>i[p][1]||v>i[h][1])&&(v<i[p][1]||v<i[h][1])&&v!==i[h][1]&&o.push(i[l])}}for(o.sort(a),u=0;u<o.length;u+=2){v=o[u][1];for(var g=o[u][0]+1;g<o[u+1][0];g++){var y=c(g,v,e);t[y]||r.push([g,v,e])}}}function a(t,r){return t[1]-r[1]||t[0]-r[0]}function f(t,r,n,e){for(var o,u,i=0;i<r.length-1;i++){var a=p.pointToTileFraction(r[i][0],r[i][1],n),f=p.pointToTileFraction(r[i+1][0],r[i+1][1],n),l=a[0],s=a[1],h=f[0],v=f[1],g=h-l,y=v-s;if(0!==y||0!==g){var b=g>0?1:-1,d=y>0?1:-1,m=Math.floor(l),M=Math.floor(s),T=0===g?1/0:Math.abs(((g>0?1:0)+m-l)/g),x=0===y?1/0:Math.abs(((y>0?1:0)+M-s)/y),P=Math.abs(b/g),w=Math.abs(d/y);for((m!==o||M!==u)&&(t[c(m,M,n)]=!0,e&&M!==u&&e.push([m,M]),o=m,u=M);1>T||1>x;)x>T?(T+=P,m+=b):(x+=w,M+=d),t[c(m,M,n)]=!0,e&&M!==u&&e.push([m,M]),o=m,u=M}}e&&M===e[0][1]&&e.pop()}function l(t,r){for(var n=Object.keys(t),e=0;e<n.length;e++)r.push(s(+n[e]))}function c(t,r,n){var e=2*(1<<n);return 32*(e*r+t)+n}function s(t){var r=t%32,n=2*(1<<r),e=(t-r)/32,o=e%n,u=(e-o)/n%n;return[o,u,r]}var p=t("tilebelt");n.geojson=function(t,r){return{type:"FeatureCollection",features:o(t,r).map(e)}},n.tiles=o,n.indexes=function(t,r){return o(t,r).map(p.tileToQuadkey)}},{tilebelt:"tilebelt"}],tilebelt:[function(t,r,n){function e(t){var r=u(t[0]+1,t[2]),n=u(t[0],t[2]),e=i(t[1]+1,t[2]),o=i(t[1],t[2]);return[n,e,r,o]}function o(t){var r=e(t),n={type:"Polygon",coordinates:[[[r[0],r[1]],[r[0],r[3]],[r[2],r[3]],[r[2],r[1]],[r[0],r[1]]]]};return n}function u(t,r){return t/Math.pow(2,r)*360-180}function i(t,r){var n=Math.PI-2*Math.PI*t/Math.pow(2,r);return M*Math.atan(.5*(Math.exp(n)-Math.exp(-n)))}function a(t,r,n){var e=d(t,r,n);return e[0]=Math.floor(e[0]),e[1]=Math.floor(e[1]),e}function f(t){return[[2*t[0],2*t[1],t[2]+1],[2*t[0]+1,2*t[1],t[2]+1],[2*t[0]+1,2*t[1]+1,t[2]+1],[2*t[0],2*t[1]+1,t[2]+1]]}function l(t){return t[0]%2===0&&t[1]%2===0?[t[0]/2,t[1]/2,t[2]-1]:t[0]%2===0&&!t[1]%2===0?[t[0]/2,(t[1]-1)/2,t[2]-1]:!t[0]%2===0&&t[1]%2===0?[(t[0]-1)/2,t[1]/2,t[2]-1]:[(t[0]-1)/2,(t[1]-1)/2,t[2]-1]}function c(t){return f(l(t))}function s(t,r){for(var n=c(t),e=0;e<n.length;e++)if(!p(r,n[e]))return!1;return!0}function p(t,r){for(var n=0;n<t.length;n++)if(h(t[n],r))return!0;return!1}function h(t,r){return t[0]===r[0]&&t[1]===r[1]&&t[2]===r[2]}function v(t){for(var r="",n=t[2];n>0;n--){var e=0,o=1<<n-1;0!==(t[0]&o)&&e++,0!==(t[1]&o)&&(e+=2),r+=e.toString()}return r}function g(t){for(var r=0,n=0,e=t.length,o=e;o>0;o--){var u=1<<o-1;switch(t[e-o]){case"0":break;case"1":r|=u;break;case"2":n|=u;break;case"3":r|=u,n|=u}}return[r,n,e]}function y(t){var r=a(t[0],t[1],32),n=a(t[2],t[3],32),e=[r[0],r[1],n[0],n[1]],o=b(e);if(0===o)return[0,0,0];var u=e[0]>>>32-o,i=e[1]>>>32-o;return[u,i,o]}function b(t){for(var r=28,n=0;r>n;n++){var e=1<<32-(n+1);if((t[0]&e)!=(t[2]&e)||(t[1]&e)!=(t[3]&e))return n}return r}function d(t,r,n){var e=Math.sin(r*m),o=Math.pow(2,n),u=o*(t/360+.5),i=o*(.5-.25*Math.log((1+e)/(1-e))/Math.PI);return[u,i,n]}var m=Math.PI/180,M=180/Math.PI;r.exports={tileToGeoJSON:o,tileToBBOX:e,getChildren:f,getParent:l,getSiblings:c,hasTile:p,hasSiblings:s,tilesEqual:h,tileToQuadkey:v,quadkeyToTile:g,pointToTile:a,bboxToTile:y,pointToTileFraction:d}},{}],"turf-bbox-polygon":[function(t,r,n){var e=t("turf-polygon");r.exports=function(t){var r=[t[0],t[1]],n=[t[0],t[3]],o=[t[2],t[3]],u=[t[2],t[1]],i=e([[r,u,o,n,r]]);return i}},{"turf-polygon":5}]},{},[]);