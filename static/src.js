(function () {
    'use strict';

    var documentAlias = document;
    var windowAlias = window;

    var knownProperties = [
        ["trackerUrl", "string", "the trackerUrl property must be a string"],
        ["accountId", "string", "the accountId property must be a string"],
        ["url", "string", "the url property must be a string"],
        ["referrer", "string", "the referrer property must be a string"],
        ["visitorId", "string", "the visitorId property must be a string"],
        ["deviceType", "string", "the deviceType property must be a string"],
        ["gaClientId", "string", "the gaClientId property must be a string"],
        ["screenResolution", "string", "the screenResolution property must be a string"],
        ["userAgent", "string", "the userAgent property must be a string"],
        ["cpuClass", "string", "the cpuClass property must be a string"],
        ["date", "date", "the date property must be a valid date, with YYYY-MM-DD hh:mm:ss format"],
        ["eventType", "eventType", "the eventType property must be event or pageView"],
        ["eventCategory", "string", "the eventCategory property must be a string"],
        ["eventAction", "string", "the eventAction property must be a string"],
        ["eventLabel", "string", "the eventLabel property must be a string"],
        ["eventValue", "string", "the eventValue property must be a string"],
        ["userId", "string", "the userId property must be a string"],
        ["conversionId", "string", "the conversionId property must be a string"],
        ["conversionValue", "string", "the conversionValue property must be a string, and must be a float with a dot or a comma as decimal separator"],
        ["conversionType", "string", "the conversionType property must be a string"],
        ["consent", "string", "the consent property must be a string"],
    ];

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
        checkDatas(d);
        var i = new XMLHttpRequest;
        i.open("POST", getValueFromKey("trackerUrl"), !0), i.setRequestHeader("Content-Type", "text/plain"), i.send(JSON.stringify({ d })), i.onreadystatechange = function () {
            if ((i.readyState === 4 && i.responseText !== '"processed2"') || (i.status !== 200 && i.status !== 201)) {
                console.warn("QUANTI : request failed", { status: i.status, responseText: i.responseText });
                if (ff) ff();
            }
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
        arr.push(["screenResolution", screen.height > screen.width ? `${screen.height}x${screen.width}` : `${screen.width}x${screen.height}`]);
        arr.push(["userAgent", navigator.userAgent]);
        arr.push(["eventType", et]);
        var cpu = navigator.cpuClass;
        if (cpu) arr.push(["cpuClass", cpu]);
        if (gaClientId) arr.push(["gaClientId", gaClientId]);
    }

    function checkDatas(d) {
        for (var i = 0; i < d.length; i++) {
            var found = false;
            for (var j = 0; j < knownProperties.length; j++) {
                if (d[i][0] === knownProperties[j][0]) {
                    found = true;
                    var specificTypes = ["eventType", "event", "date", "conversionValue"];
                    var isSpecificType = false;

                    for (var k = 0; k < specificTypes.length; k++) if (d[i][0] === specificTypes[k]) isSpecificType = true;

                    if (!isSpecificType && typeof d[i][1] !== knownProperties[j][1]) {
                        if (knownProperties[i][1] === "string" && typeof d[i][1] !== "string") console.warn(`QUANTI : ${knownProperties[j][2]}`, { property: d[i][0], value: d[i][1] })
                        else if (knownProperties[i][1] === "integer" || knownProperties[i][1] === "float" && typeof d[i][1] !== "number") console.warn(`QUANTI : ${knownProperties[j][2]}`, { property: d[i][0], value: d[i][1] })
                        else if (knownProperties[i][1] === "boolean" && typeof d[i][1] !== "boolean") console.warn(`QUANTI : ${knownProperties[j][2]}`, { property: d[i][0], value: d[i][1] })
                    } else {
                        switch (d[i][0]) {
                            case "conversionValue":
                                try {
                                    var v = d[i][1];
                                    if (typeof v !== "string") console.warn(`QUANTI : ${knownProperties[j][2]}`, { property: d[i][0], value: d[i][1] })
                                    else if (isNaN(parseFloat(v))) console.warn(`QUANTI : ${knownProperties[j][2]}`, { property: d[i][0], value: d[i][1] })
                                } catch { console.warn(`QUANTI : ${knownProperties[j][2]}`, { property: d[i][0], value: d[i][1] }) }
                                break;
                            case "eventType":
                                if (d[i][1] !== "event" && d[i][1] !== "pageView") console.warn(`QUANTI : ${knownProperties[j][2]}`, { property: d[i][0], value: d[i][1] })
                                break;
                            case "event":
                                for (let k = 1; k < d[i].length; k++) if (typeof d[i][k] !== "string") console.warn(`QUANTI : ${knownProperties[j][2]}`, { property: d[i][0], value: d[i][1] })
                                break;
                            case "date":
                                var date = new Date(d[i][1]);
                                if (date.toString() === "Invalid Date") console.warn(`QUANTI : ${knownProperties[j][2]}`, { property: d[i][0], value: d[i][1] })
                                break;
                        }
                    }
                }
            }
            if (!found && typeof d[i][1] !== "string") console.warn(`QUANTI : the property ${d[i][0]} isn't a default property and must be a string`, { property: d[i][0], value: d[i][1] })

        }
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
            for (var i = 0; i < _quantiDataLayer.length; i++) {
                if (_quantiDataLayer[i][0] !== "event") {
                    var a = []; // array avec clé et valeur stringifié
                    a.push(_quantiDataLayer[i][0], "".concat(_quantiDataLayer[i][1]))
                    dts.push(a);
                }
            }

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
                for (var i = 0; i < _quantiDataLayer.length; i++) {
                    if (_quantiDataLayer[i][0] !== "event") {
                        var a = []; // array avec clé et valeur stringifié
                        a.push(_quantiDataLayer[i][0], "".concat(_quantiDataLayer[i][1]))
                        dts.push(a);
                    }
                }
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

