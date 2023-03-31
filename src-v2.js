! function (e, t) {
    "undefined" != typeof module && module.exports ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Fingerprint = t()
}(this, function () {
    "use strict";

    function e(e) {
        var a = Array.prototype.forEach,
            t = Array.prototype.map;
        this.each = function (e, t, n) {
            if (null !== e)
                if (a && e.forEach === a) e.forEach(t, n);
                else if (e.length === +e.length) {
                    for (var i = 0, r = e.length; i < r; i++)
                        if (t.call(n, e[i], i, e) === {}) return
                } else
                    for (var o in e)
                        if (e.hasOwnProperty(o) && t.call(n, e[o], o, e) === {}) return
        }, this.map = function (e, i, r) {
            var o = [];
            return null == e ? o : t && e.map === t ? e.map(i, r) : (this.each(e, function (e, t, n) {
                o[o.length] = i.call(r, e, t, n)
            }), o)
        }, "object" == typeof e ? (this.hasher = e.hasher, this.screen_resolution = e.screen_resolution, this.screen_orientation = e.screen_orientation, this.canvas = e.canvas, this.ie_activex = e.ie_activex) : "function" == typeof e && (this.hasher = e)
    }
    return e.prototype = {
        get: function () {
            var e = [];
            return e.push(navigator.userAgent), e.push(navigator.language), e.push(screen.colorDepth), this.screen_resolution && void 0 !== this.getScreenResolution() && e.push(this.getScreenResolution().join("x")), e.push((new Date).getTimezoneOffset()), e.push(this.hasSessionStorage()), e.push(this.hasLocalStorage()), e.push(!!window.indexedDB), document.body ? e.push(typeof document.body.addBehavior) : e.push("undefined"), e.push(typeof window.openDatabase), e.push(navigator.cpuClass), e.push(navigator.platform), e.push(navigator.doNotTrack), e.push(this.getPluginsString()), this.canvas && this.isCanvasSupported() && e.push(this.getCanvasFingerprint()), this.hasher ? this.hasher(e.join("###"), 31) : this.murmurhash3_32_gc(e.join("###"), 31)
        },
        murmurhash3_32_gc: function (e, t) {
            for (var n, i, r = 3 & e.length, o = e.length - r, a = t, s = 3432918353, u = 461845907, c = 0; c < o;) i = 255 & e.charCodeAt(c) | (255 & e.charCodeAt(++c)) << 8 | (255 & e.charCodeAt(++c)) << 16 | (255 & e.charCodeAt(++c)) << 24, ++c, a = 27492 + (65535 & (n = 5 * (65535 & (a = (a ^= i = (65535 & (i = (i = (65535 & i) * s + (((i >>> 16) * s & 65535) << 16) & 4294967295) << 15 | i >>> 17)) * u + (((i >>> 16) * u & 65535) << 16) & 4294967295) << 13 | a >>> 19)) + ((5 * (a >>> 16) & 65535) << 16) & 4294967295)) + ((58964 + (n >>> 16) & 65535) << 16);
            switch (i = 0, r) {
                case 3:
                    i ^= (255 & e.charCodeAt(c + 2)) << 16;
                case 2:
                    i ^= (255 & e.charCodeAt(c + 1)) << 8;
                case 1:
                    a ^= i = (65535 & (i = (i = (65535 & (i ^= 255 & e.charCodeAt(c))) * s + (((i >>> 16) * s & 65535) << 16) & 4294967295) << 15 | i >>> 17)) * u + (((i >>> 16) * u & 65535) << 16) & 4294967295
            }
            return a ^= e.length, a = 2246822507 * (65535 & (a ^= a >>> 16)) + ((2246822507 * (a >>> 16) & 65535) << 16) & 4294967295, a = 3266489909 * (65535 & (a ^= a >>> 13)) + ((3266489909 * (a >>> 16) & 65535) << 16) & 4294967295, (a ^= a >>> 16) >>> 0
        },
        hasLocalStorage: function () {
            try {
                return !!window.localStorage
            } catch (e) {
                return !0
            }
        },
        hasSessionStorage: function () {
            try {
                return !!window.sessionStorage
            } catch (e) {
                return !0
            }
        },
        isCanvasSupported: function () {
            var e = document.createElement("canvas");
            return !(!e.getContext || !e.getContext("2d"))
        },
        isIE: function () {
            return "Microsoft Internet Explorer" === navigator.appName || !("Netscape" !== navigator.appName || !/Trident/.test(navigator.userAgent))
        },
        getPluginsString: function () {
            return this.isIE() && this.ie_activex ? this.getIEPluginsString() : this.getRegularPluginsString()
        },
        getRegularPluginsString: function () {
            return this.map(navigator.plugins, function (e) {
                var t = this.map(e, function (e) {
                    return [e.type, e.suffixes].join("~")
                }).join(",");
                return [e.name, e.description, t].join("::")
            }, this).join(";")
        },
        getIEPluginsString: function () {
            if (window.ActiveXObject) return this.map(["ShockwaveFlash.ShockwaveFlash", "AcroPDF.PDF", "PDF.PdfCtrl", "QuickTime.QuickTime", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "RealPlayer", "SWCtl.SWCtl", "WMPlayer.OCX", "AgControl.AgControl", "Skype.Detection"], function (e) {
                try {
                    return new ActiveXObject(e), e
                } catch (e) {
                    return null
                }
            }).join(";");
            return ""
        },
        getScreenResolution: function () {
            var e = !this.screen_orientation || screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height];
            return e
        },
        getCanvasFingerprint: function () {
            var e = document.createElement("canvas"),
                t = e.getContext("2d"),
                n = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-={}|[]:"<>?;,.';
            return t.textBaseline = "top", t.font = "14px 'Arial'", t.textBaseline = "alphabetic", t.fillStyle = "#f60", t.fillRect(125, 1, 62, 20), t.fillStyle = "#069", t.fillText(n, 2, 15), t.fillStyle = "rgba(102, 204, 0, 0.7)", t.fillText(n, 4, 17), e.toDataURL()
        }
    }, e
});

(function () {
    'use strict';

    var documentAlias = document;
    var windowAlias = window;

    function getValueFromKey(key) {
        for (var n = 0; n < _quantiDataLayer.length; n++)
            if (_quantiDataLayer[n][0] == key) return _quantiDataLayer[n][1];
        return "(not set)"
    }

    function getReferrer() {
        var referrer = '';

        try {
            referrer = windowAlias.top.document.referrer;
        } catch (e) {
            if (windowAlias.parent) {
                try {
                    referrer = windowAlias.parent.document.referrer;
                } catch (e2) {
                    referrer = '';
                }
            }
        }

        if (referrer === '') {
            referrer = documentAlias.referrer;
        }

        return referrer;
    }

    function s(d, ff) {
        var i = new XMLHttpRequest;
        i.open("POST", getValueFromKey("trackerUrl"), !0), i.setRequestHeader("Content-Type", "text/plain"), i.send(JSON.stringify({ d })), i.onreadystatechange = function () {
            if (ff !== undefined && i.readyState === 4 && i.status !== 200 && i.status !== 201) ff();
        }
    }

    var fp = new Fingerprint({
        canvas: !0,
        ie_activex: !0,
        screen_resolution: !0
    });

    function getDeviceType() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "tablet";
        if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "mobile";
        return "desktop";
    };

    // écraser la fonction _quantiTag
    _quantiTag = function () {
        // passer les arguments sous l'objet Array au lieu de l'objet Arguments (pour supporter le JSON.stringify)
        if (arguments.length !== 0) {
            var d = [];
            for (var i = 0; i < arguments.length; i++) d.push(arguments[i]);
            _quantiDataLayer.push(d);
        }

        // v[0] = index de eventType dans _quantiDataLayer OU undefined
        var v = [];
        for (var i = 0; i < _quantiDataLayer.length; i++) if (_quantiDataLayer[i][0] === "eventType") v.push(i);

        // si eventType n'est pas défini, on le défini avec la valeur "pageView" pour le premier appel du send (s)
        // signifie que c'est la première fois que le nouveau _quantiTag est appelé
        if (v[0] === undefined) {
            var ol = _quantiDataLayer;
            _quantiDataLayer = [];

            // on déplace les valeurs trackerUrl et accountId dans _quantiDataLayer
            var etd = [];
            for (var i = 0; i < ol.length; i++) {
                if (ol[i][0] === "trackerUrl" || ol[i][0] === "accountId") {
                    etd.push(i);
                    // passage des données sous forme de tableau, étant des arguments importés via l'ancienne fonction _quantiTag
                    var dta = [];
                    for (var j = 0; j < ol[i].length; j++) dta.push(ol[i][j]);
                    _quantiDataLayer.push(dta);
                }
            }
            // on supprime les valeurs trackerUrl et accountId de ol (oldLayer)
            for (var i = etd.length - 1; i >= 0; i--) ol.splice(etd[i], 1);

            // on ajoute les valeurs par défaut, dont l'eventType configuré pour le premier envoi
            _quantiDataLayer.push(["url", window.location.href]);
            _quantiDataLayer.push(["referrer", getReferrer()]);
            _quantiDataLayer.push(["visiorId", fp.get().toString()]);
            _quantiDataLayer.push(["deviceType", getDeviceType()]);
            _quantiDataLayer.push(['eventType', "pageView"]);
            // on ajoute l'index de eventType
            v.push(_quantiDataLayer.length - 1);

            // on ajoute les valeurs restantes de ol à _quantiDataLayer
            for (var i = 0; i < ol.length; i++) {
                var a = [];
                for (var j = 0; j < ol[i].length; j++) a.push(ol[i][j]);
                _quantiDataLayer.push(a);
            }
        }

        // si il s'agit de l'event pageView, on envoie les données pour la première fois 
        if (_quantiDataLayer[v[0]][1] === "pageView") {
            // on envoie les données sans celles après l'event pageView (données non encore traités)
            s(_quantiDataLayer.slice(0, v[0] + 1));
            // on change l'eventType pour éviter de renvoyer les données pageView, et si il reste des données elles sont forcément de type event
            _quantiDataLayer[v[0]][1] = "event";
        }

        // si il reste des données de type event non traités, on les envoient
        if (_quantiDataLayer.length > v[0] + 1) {
            // on récupère les données après la clé eventType pour traiter leur envoi un par un (newEventArray)
            var nea = _quantiDataLayer.slice(v[0] + 1);

            for (let i = 0; i < nea.length; i++) {
                // on supprime l'event en question du tableau _quantiDataLayer pour qu'il ne soit pas envoyé en double si la fonction est rappelée
                _quantiDataLayer.splice(v[0] + 1, 1);

                // récupère les données jusqu'à l'eventType et ajoute l'event en cours (elementToPush)
                var etp = _quantiDataLayer.slice(0, v[0] + 1);
                etp.push(nea[i]);

                // envoie les données
                s(etp, function () {
                    // /!\ Si l'envoi échoue, on ajoute à nouveau l'event (cas requêtes infinies ?)
                    // _quantiTag(nea[i])
                });
            }
        }
    }

    // on appelle la fonction sans argument pour envoyer au minimum les données de l'eventType pageView, et celles de l'eventType event (si il y en a eu avant que le script soit chargé)
    _quantiTag();
})();
