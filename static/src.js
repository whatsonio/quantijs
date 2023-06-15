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
            console.log(navigator)
            e.push(navigator.userAgent);
            e.push(navigator.language);
            e.push(screen.colorDepth);
            if (this.screen_resolution && void 0 !== this.getScreenResolution()) e.push(this.getScreenResolution().join("x"));
            e.push(this.hasSessionStorage());
            e.push((new Date).getTimezoneOffset());
            e.push(this.hasLocalStorage());
            e.push(!!window.indexedDB);
            document.body ? e.push(typeof document.body.addBehavior) : e.push("undefined");
            e.push(typeof window.openDatabase);
            e.push(navigator.cpuClass)
            e.push(navigator.platform);
            e.push(navigator.doNotTrack);
            e.push(this.getPluginsString());
            if (this.canvas && this.isCanvasSupported()) e.push(this.getCanvasFingerprint())

            console.log(e);
            if (this.hasher) {
                console.log("hasher");
                return this.hasher(e.join("###"), 31)

            } else {
                console.log("not hasher");
                console.log(e.join("###"))
                console.log(this.murmurhash3_32_gc(e.join("###"), 31))
                return this.murmurhash3_32_gc(e.join("###"), 31)
            }




        },
        murmurhash3_32_gc: function (key, seed) {
            var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

            remainder = key.length & 3; // key.length % 4
            bytes = key.length - remainder;
            h1 = seed;
            c1 = 0xcc9e2d51;
            c2 = 0x1b873593;
            i = 0;

            while (i < bytes) {
                k1 =
                    ((key.charCodeAt(i) & 0xff)) |
                    ((key.charCodeAt(++i) & 0xff) << 8) |
                    ((key.charCodeAt(++i) & 0xff) << 16) |
                    ((key.charCodeAt(++i) & 0xff) << 24);
                ++i;

                k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
                k1 = (k1 << 15) | (k1 >>> 17);
                k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

                h1 ^= k1;
                h1 = (h1 << 13) | (h1 >>> 19);
                h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
                h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
            }

            k1 = 0;

            switch (remainder) {
                case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
                case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
                case 1: k1 ^= (key.charCodeAt(i) & 0xff);

                    k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
                    k1 = (k1 << 15) | (k1 >>> 17);
                    k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
                    h1 ^= k1;
            }

            h1 ^= key.length;

            h1 ^= h1 >>> 16;
            h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
            h1 ^= h1 >>> 13;
            h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
            h1 ^= h1 >>> 16;

            return h1 >>> 0;
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

    var visitorId = fp.get().toString();
    document.getElementById("visitorId").innerHTML = visitorId;


    function addOtherValuesToArray(arr, et) {
        arr.push(["url", window.location.href]);
        arr.push(["referrer", getReferrer()]);
        arr.push(["visitorId", visitorId]);
        arr.push(["deviceType", getDeviceType()]);
        arr.push(['eventType', et]);
    }

    // écraser la fonction _quantiTag
    _quantiTag = function () {
        if (arguments.length !== 0) { // passer les arguments sous l'objet Array au lieu de l'objet Arguments (pour supporter le JSON.stringify)
            var d = [];
            for (var i = 0; i < arguments.length; i++) d.push(arguments[i]);
            _quantiDataLayer.push(d);
        } else { // la fonction est appelée la première fois, on envoie un pageView
            var dts = [];

            for (var i = 0; i < _quantiDataLayer.length; i++) {
                // passage des données sous forme de tableau, étant des arguments importés via l'ancienne fonction _quantiTag
                var dta = [];
                for (var j = 0; j < _quantiDataLayer[i].length; j++) dta.push(_quantiDataLayer[i][j])
                _quantiDataLayer[i] = dta;
            }

            // on déplace les valeurs qui ne sont pas des events dans dts
            for (var i = 0; i < _quantiDataLayer.length; i++) if (_quantiDataLayer[i][0] !== "event") dts.push(_quantiDataLayer[i]);

            // on envoie les données pageView + valeus supplémentaires obligatoires
            addOtherValuesToArray(dts, "pageView")
            s(dts);
        }

        // e[0] récupérer tout les events du tableau _quantiDataLayer, e[1] contient les index à supprimer du tableau _quantiDataLayer
        var e = [[], []];
        for (var i = 0; i < _quantiDataLayer.length; i++) if (_quantiDataLayer[i][0] === "event") {
            e[0].push(_quantiDataLayer[i]);
            e[1].push(i);
        }

        // si il y a un ou plusieurs events, on les envoie
        if (e.length > 0) {
            // suppression des events du tableau _quantiDataLayer
            for (var i = e[1].length - 1; i >= 0; i--) _quantiDataLayer.splice(e[1][i], 1);

            for (let j = 0; j < e[1].length; j++) { // pour chaque event
                // data to send tout sauf nos events (si jamais d'autres events ont été ajoutés)
                var dts = [];
                for (var i = 0; i < _quantiDataLayer.length; i++) if (_quantiDataLayer[i][0] !== "event") dts.push(_quantiDataLayer[i]);
                // on ajoute l'event à la liste des données à envoyer
                dts.push(e[0][j]);

                // envoie les données de l'event
                addOtherValuesToArray(dts, "event")
                s(dts, function () {
                    // /!\ Si l'envoi échoue, on ajoute à nouveau l'event (cas requêtes infinies ?)
                    // _quantiTag(nea[j])
                });
            }
        }
    }

    // on appelle la fonction sans argument pour envoyer au minimum les données de l'eventType pageView
    // et celles de l'eventType event (si il y en a eu avant que le script soit chargé)
    _quantiTag();
})();
