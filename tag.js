!function (e, t) { "undefined" != typeof module && module.exports ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Fingerprint = t() }(this, function () { "use strict"; function e(e) { var a = Array.prototype.forEach, t = Array.prototype.map; this.each = function (e, t, n) { if (null !== e) if (a && e.forEach === a) e.forEach(t, n); else if (e.length === +e.length) { for (var i = 0, r = e.length; i < r; i++)if (t.call(n, e[i], i, e) === {}) return } else for (var o in e) if (e.hasOwnProperty(o) && t.call(n, e[o], o, e) === {}) return }, this.map = function (e, i, r) { var o = []; return null == e ? o : t && e.map === t ? e.map(i, r) : (this.each(e, function (e, t, n) { o[o.length] = i.call(r, e, t, n) }), o) }, "object" == typeof e ? (this.hasher = e.hasher, this.screen_resolution = e.screen_resolution, this.screen_orientation = e.screen_orientation, this.canvas = e.canvas, this.ie_activex = e.ie_activex) : "function" == typeof e && (this.hasher = e) } return e.prototype = { get: function () { var e = []; return e.push(navigator.userAgent), e.push(navigator.language), e.push(screen.colorDepth), this.screen_resolution && void 0 !== this.getScreenResolution() && e.push(this.getScreenResolution().join("x")), e.push((new Date).getTimezoneOffset()), e.push(this.hasSessionStorage()), e.push(this.hasLocalStorage()), e.push(!!window.indexedDB), document.body ? e.push(typeof document.body.addBehavior) : e.push("undefined"), e.push(typeof window.openDatabase), e.push(navigator.cpuClass), e.push(navigator.platform), e.push(navigator.doNotTrack), e.push(this.getPluginsString()), this.canvas && this.isCanvasSupported() && e.push(this.getCanvasFingerprint()), this.hasher ? this.hasher(e.join("###"), 31) : this.murmurhash3_32_gc(e.join("###"), 31) }, murmurhash3_32_gc: function (e, t) { for (var n, i, r = 3 & e.length, o = e.length - r, a = t, s = 3432918353, c = 461845907, u = 0; u < o;)i = 255 & e.charCodeAt(u) | (255 & e.charCodeAt(++u)) << 8 | (255 & e.charCodeAt(++u)) << 16 | (255 & e.charCodeAt(++u)) << 24, ++u, a = 27492 + (65535 & (n = 5 * (65535 & (a = (a ^= i = (65535 & (i = (i = (65535 & i) * s + (((i >>> 16) * s & 65535) << 16) & 4294967295) << 15 | i >>> 17)) * c + (((i >>> 16) * c & 65535) << 16) & 4294967295) << 13 | a >>> 19)) + ((5 * (a >>> 16) & 65535) << 16) & 4294967295)) + ((58964 + (n >>> 16) & 65535) << 16); switch (i = 0, r) { case 3: i ^= (255 & e.charCodeAt(u + 2)) << 16; case 2: i ^= (255 & e.charCodeAt(u + 1)) << 8; case 1: a ^= i = (65535 & (i = (i = (65535 & (i ^= 255 & e.charCodeAt(u))) * s + (((i >>> 16) * s & 65535) << 16) & 4294967295) << 15 | i >>> 17)) * c + (((i >>> 16) * c & 65535) << 16) & 4294967295 }return a ^= e.length, a = 2246822507 * (65535 & (a ^= a >>> 16)) + ((2246822507 * (a >>> 16) & 65535) << 16) & 4294967295, a = 3266489909 * (65535 & (a ^= a >>> 13)) + ((3266489909 * (a >>> 16) & 65535) << 16) & 4294967295, (a ^= a >>> 16) >>> 0 }, hasLocalStorage: function () { try { return !!window.localStorage } catch (e) { return !0 } }, hasSessionStorage: function () { try { return !!window.sessionStorage } catch (e) { return !0 } }, isCanvasSupported: function () { var e = document.createElement("canvas"); return !(!e.getContext || !e.getContext("2d")) }, isIE: function () { return "Microsoft Internet Explorer" === navigator.appName || !("Netscape" !== navigator.appName || !/Trident/.test(navigator.userAgent)) }, getPluginsString: function () { return this.isIE() && this.ie_activex ? this.getIEPluginsString() : this.getRegularPluginsString() }, getRegularPluginsString: function () { return this.map(navigator.plugins, function (e) { var t = this.map(e, function (e) { return [e.type, e.suffixes].join("~") }).join(","); return [e.name, e.description, t].join("::") }, this).join(";") }, getIEPluginsString: function () { return window.ActiveXObject ? this.map(["ShockwaveFlash.ShockwaveFlash", "AcroPDF.PDF", "PDF.PdfCtrl", "QuickTime.QuickTime", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "RealPlayer", "SWCtl.SWCtl", "WMPlayer.OCX", "AgControl.AgControl", "Skype.Detection"], function (e) { try { return new ActiveXObject(e), e } catch (e) { return null } }).join(";") : "" }, getScreenResolution: function () { return !this.screen_orientation || screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height] }, getCanvasFingerprint: function () { var e = document.createElement("canvas"), t = e.getContext("2d"), n = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-={}|[]:"<>?;,.'; return t.textBaseline = "top", t.font = "14px 'Arial'", t.textBaseline = "alphabetic", t.fillStyle = "#f60", t.fillRect(125, 1, 62, 20), t.fillStyle = "#069", t.fillText(n, 2, 15), t.fillStyle = "rgba(102, 204, 0, 0.7)", t.fillText(n, 4, 17), e.toDataURL() } }, e }), function () { "use strict"; var e, t = new Fingerprint({ canvas: !0, ie_activex: !0, screen_resolution: !0 }), n = window._quti || [], i = new Date; n.push(["url", window.location.href]), n.push(["visiorId", t.get().toString()]), n.push(["date", i.getFullYear() + "-" + (i.getMonth() + 1) + "-" + i.getDate() + " " + i.getHours() + ":" + i.getMinutes() + ":" + i.getSeconds()]), n.push(["deviceType", (e = navigator.userAgent, /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(e) ? "tablet" : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(e) ? "mobile" : "desktop")]), t = function (e) { for (var t = 0; t < e.length; t++)if ("trackerUrl" == _quti[t][0]) return _quti[t][1]; return "(not set)" }(n), i = new XMLHttpRequest, n = { d: n }, n = JSON.stringify(n), i.open("POST", t, !0), i.setRequestHeader("Content-Type", "text/plain"), i.send(n), i.onreadystatechange = function () { } }();