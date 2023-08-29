(function () {
    'use strict';

    var documentAlias = document;
    var windowAlias = window;

    function getVistorCookieId() {

        var u;

        let name = "qtvtru=";
        let decodedCookie = decodeURIComponent(documentAlias.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                u = c.substring(name.length, c.length);
            }
        }

        if (!u || u.length == 0) {
            //u = Date.now() + Math.random().toString(16).substring(2, 15) + Math.random().toString(16).substring(2, 15);
            u = Date.now().toString(32) + Math.random().toString(16);
            var co = `qtvtru=${u}; expires=${new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365).toGMTString()}; path=/;`;
            documentAlias.cookie = co;

        }

        return u;
    }


    function getGaClientId() {

        var u;

        let name = "_ga=";
        let decodedCookie = decodeURIComponent(documentAlias.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                u = c.substring(name.length, c.length);
            }
        }

        return u;

    }

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


    function getDeviceType() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "tablet";
        if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "mobile";
        return "desktop";
    };

    var visitorId = getVistorCookieId();

    var gaClientId = getGaClientId();

    function addOtherValuesToArray(arr, et) {
        arr.push(["url", window.location.href]);
        arr.push(["referrer", getReferrer()]);
        arr.push(["visitorId", visitorId]);
        arr.push(["deviceType", getDeviceType()]);
        arr.push(["gaClientId", gaClientId]);
        arr.push(['screenResolution', screen.height > screen.width ? `${screen.height}x${screen.width}` : `${screen.width}x${screen.height}`]);
        arr.push(['userAgent', navigator.userAgent]);
        arr.push(['cpuClass', navigator.cpuClass]);
        arr.push(['event', et]);
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

