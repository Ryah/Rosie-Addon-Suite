// ==UserScript==
// @name            [Dev] Rosie Addons - Payment Calculator
// @namespace       http://ryah.org/
// @match           https://retailers.rosieapp.com/*
// @version         1.4
// @description     Addons for Rosie Retailers because the site needs improvement
// @author          Ryan Adame
// @require         https://raw.githubusercontent.com/Ryah/Rosie-Addon-Suite/main/js/waitForKeyElements_offline.js?token=ADSLCWNO4EKWE5GKXMDXQMC74UTFG
// @require         https://raw.githubusercontent.com/Ryah/Rosie-Addon-Suite/main/js/jquery.min.js?token=ADSLCWK4K5GQYLWDDKSELKS74UTLI
// @resource        payCalcHTML https://raw.githubusercontent.com/Ryah/Rosie-Addon-Suite/main/html/paymentCalculator.html?token=ADSLCWL7MXMCSKXBEX35OEK74UTSW
// @resource        customCSS https://raw.githubusercontent.com/Ryah/Rosie-Addon-Suite/main/css/styles.css?token=ADSLCWMBPA5QCOOABJR2XQS74UTUM
// @grant           GM_addStyle

// ==/UserScript==

//waitForKeyElements() by BrockA on Github https://gist.github.com/BrockA/2625891

//Payment Calculator HTML loaded from C:/Users/rosie0048/Desktop/RAS/html/paymentCalculator.html
var pcHTML = GM_getResourceText("payCalcHTML");

setInterval(function () {
    if (window.location.href.indexOf("dashboard") > -1) {
        //do nothing i guess?
    } else {
        load = document.getElementById("payCalc");
    }
}, 500);

load = document.getElementById("payCalc");
waitForKeyElements("#main-content-region > div > div.order-details-container > div > div.order-details > div:nth-child(4) > div.loyalty-info > div:nth-child(2) > div", paymentCalc);

function paymentCalc() {
    if (window.location.href.indexOf("orders") > -1) {
        if (typeof(load) != 'undefined' && load === null) {
            $(document.querySelector("#main-content-region > div > div.order-details-container")).append(pcHTML);
            load = true;
        }
    }
}
//===========================================================================================================================
//------------------------------------------------Custom CSS ----------------------------------------------------------------
//===========================================================================================================================

var customCSS = GM_getResourceText("customCSS");
GM_addStyle(customCSS);