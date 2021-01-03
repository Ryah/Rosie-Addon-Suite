// ==UserScript==
// @name            Rosie Addons Suite
// @namespace       http://ryah.org/
// @match           https://retailers.rosieapp.com/*
// @version         1.53
// @description     Addons for Rosie Retailers because the site needs improvement
// @author          Ryan Adame
// @require         https://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require         https://raw.githubusercontent.com/Ryah/Rosie-Addon-Suite/main/js/waitForKeyElements_offline.js
// @require         https://raw.githubusercontent.com/Ryah/Rosie-Addon-Suite/main/js/Rosie%20Addon%20Suite.js
// @resource        payCalcHTML https://raw.githubusercontent.com/Ryah/Rosie-Addon-Suite/main/html/paymentCalculator.html
// @resource        customCSS https://raw.githubusercontent.com/Ryah/Rosie-Addon-Suite/main/css/styles.css
// @resource        orderHistBut https://raw.githubusercontent.com/Ryah/Rosie-Addon-Suite/main/html/orderHist.html
// @grant           GM_addStyle
// @grant           GM_getResourceText
// ==/UserScript==

/*Changelog
    * 1.53
    *   • Added Changelog
    *   • Added color changing functionality to Payment Calculator Results Sidebar
    *   • Flipped Rosie and POS price displays in Payment Calculator for better formatting
    *   • Made calculate button look better ig