// ==UserScript==
// @name            Rosie Addons Suite
// @namespace       http://ryah.org/
// @match           https://retailers.rosieapp.com/*
// @version         1.5
// @description     Addons for Rosie Retailers because the site needs improvement
// @author          Ryan Adame
// ==/UserScript==

/*---
===========================================================================================================================
------------------------------------------------TO-DO----------------------------------------------------------------------
===========================================================================================================================
 *
 *
 *
 */

//===========================================================================================================================
//------------------------------------------------Setup----------------------------------------------------------------------
//===========================================================================================================================
//Calls tag section to add tag to footer once visible
//jQuery(document).ready(checkContainer);

ouMsg = false;
//Checks and store if you're on Dashboard or Order Page and stores in a boolean named "dash" every second (yeah it's unoptimized but it's the best I got so deal with it)
//UPDATE: It's no longer the best I got but I'm too lazy to update that spaghetti
setInterval(function () {
    if (window.location.href.indexOf("dashboard") > -1) {
        dash = true;
        changed = false;
        //console.log("dash = " + dash);
        if (ouMsg == true) {
            ouMsg = false;
        }
    } else if (window.location.href.indexOf("orders") > -1) {
        dash = false;
        //console.log("dash = " + dash);
    } else {
        //alert("Something went wrong finding what page you're on. Error Code 8262.");
        console.log("Something went wrong finding what page you're on. Error Code 8262.");
    };
}, 1000);

//waitForKeyElements() by BrockA on Github https://gist.github.com/BrockA/2625891

//===========================================================================================================================
//------------------------------------------------24 hour to 12 hour conversion button---------------------------------------
//===========================================================================================================================

waitForKeyElements(".orders-table-container", timeConvert);
changed = false; //Set variable to mark replacement since I can't think of another way to detect if the time has changed or not :)
//function ButtonClickAction(zEvent) {
function timeConvert() {
    if (changed === false) {
        //If on Dashboard, counts the header-content classes for amount of orders.
        //If not on Dashboard, then sets default order count to 1.
        if (dash === true) {
            console.log("On Dashboard, Counting orders.");
            var orders = document.querySelectorAll('#main-content-region .header-content').length;
        } else if (dash === false) {
            console.log("On Order Page, Setting order var to 1.");
            var orders = 1;
        } else {
            alert("Something went wrong grabbing orders. Error code 3625 in 24/12 Button Script.");
            console.log("Something went wrong grabbing orders. Error code 3625 in 24/12 Button Script.");
        }

        //for loop wouldn't work ¯\_(ツ)_/¯
        //jk now it does pog
        msg = false;
        for (i = 0; i < orders; i++) {

            //Grabs and trims time using grabTime function. Also formats it with AM/PM at the end.
            var timeString = grabTime(i);
            var hourEnd = timeString.indexOf(":");
            var H = +timeString.substr(0, hourEnd)
                var h = H % 12 || 12;
            var ampm = (H < 12 || H === 24) ? " AM" : " PM";
            timeString = h + timeString.substr(hourEnd, 3) + ampm;

            //Checks if on Dashboard or on Order Page
            //If on Dashboard, add the times to the header-content class.
            //If on Order Page, create an alert showing the time.
            //Else, show error with error code.
            if (dash === true) {
                if (msg === false) {
                    console.log("On Dashboard, adding times to Dashboard.");
                    msg = true;
                }
                $(document.querySelectorAll('.header-content')[i]).contents().filter(function () {
                    return this.nodeType == 3;
                }).first().replaceWith("<b>" + timeString + " " + "|" + " " + "</b>");
                changed = true; //Mark the time as converted to prevent the script converting a random string. It's a duct tape fix but it works 99% of the time so I'm not going to touch it.
            } else if (dash === false) {
                if (msg === false) {
                    console.log("On order page. Showing timeString alert");
                    msg = true;
                }
                alert("Order is due at " + timeString);
                //Creates alert with time if on order page
            } else {
                alert("Something went wrong replacing the time. Error Code 2124 in 24/12 Button Script.");
                console.log("Something went wrong replacing the time. Error Code 2124 in 24/12 Button Script.");
            }

        }
        msg = false;

        //Grab time innerHTML and trim to just time
        function grabTime(j) {
            //console.log(j); //Debugging
            if (dash === true) {
                var timeString2 = document.querySelectorAll('.header-content')[j].innerHTML;
                var timeStart = timeString2.indexOf("|") + 12;
                var timeEnd = timeString2.indexOf(":") + 2;
                var T = timeString2.substr(timeStart, timeEnd);
                return T;
                console.log("On Dashboard, Grabbing time from header-content.");
            } else if (dash === false) {
                //Add time to order page if on order page
                var timeString2 = document.querySelectorAll("div:nth-child(4) > div:nth-child(3)")[2].innerHTML
                    var timeStart = timeString2.indexOf(",") + 1;
                var timeEnd = timeString2.indexOf(":") + 2;
                var T = timeString2.substr(timeStart, timeEnd);
                //console.log(timeString2); //Debugging
                return T;
            } else {
                alert("Something went wrong grabbing the time. Error Code 1735 in 24/12 Button Script.");
                console.log("Something went wrong grabbing the time. Error Code 1735 in 24/12 Button Script.");
            }
        }
    }
}

//===========================================================================================================================
//------------------------------------------------Order Page Improvements----------------------------------------------------
//===========================================================================================================================
//Waits for loyality number to load before passing it to the formatNum function.
waitForKeyElements("#main-content-region > div > div.order-details-container > div > div.order-details > div:nth-child(4) > div.loyalty-info > div:nth-child(2) > div", formatNum);

function formatNum(jNode) {
    //Add line breaks for better kerning.
    $(document.querySelector("#main-content-region > div > div.order-details-container > div > div.order-details > div:nth-child(4) > div.loyalty-info")).append(`<br>`);

    //Use regex to format the number and store it in propNum.
    //This took way too long to figure out. Why hasn't anyone made a simpler version of regex yet? I wrote the thing yet if you ask me how it works I will be just as confused as you are.
    //It shouldn't be the norm to have multiple generators out there for something that people use very often and have pretty much no viable substitute for.
    //Sure it's EXTREMELY versatile but the learning curve is like running into a brick wall. I've never heard someone go "Oh thank God I can use RegEx! I've been waiting for this moment! I'm so happy!"
    //Everyone hates it but for some reason as far as I know no one has sucessfully attempted to make an alternative for it. It makes me so sad.
    //Anyways that's my rant.
    num = document.querySelector("#main-content-region > div > div.order-details-container > div > div.order-details > div:nth-child(4) > div.loyalty-info > div:nth-child(2) > div").innerHTML;
    propNum = num.replace(/(\d{3})(\d{3})(\d{4})/, "\($1\) $2-$3")
        //console.log(propNum); //Debugging

        //Replace phone number with propNum.
        console.log('Formatting Celebrate Number')
        $(document.querySelector("#main-content-region > div > div.order-details-container > div > div.order-details > div:nth-child(4) > div.loyalty-info > div:nth-child(2) > div")).contents().filter(function () {
        return this.nodeType == 3;
    }).last().replaceWith(propNum);

    //Rename "Loyalty Number" to "Celebrate Number" for consistancy.
    console.log('Renaming "Loyalty Number" to "Celebrate Number"')
    $(document.querySelector("#main-content-region > div > div.order-details-container > div > div.order-details > div:nth-child(4) > div.loyalty-info > div:nth-child(1) > div")).contents().filter(function () {
        return this.nodeType == 3;
    }).last().replaceWith("Celebrate Number");

    //Remove "Cutoff Time" as it just causes confusion with pickup time.
    console.log('Removing "Cutoff Time"')
    $(document.querySelector("#main-content-region > div > div.order-details-container > div > div.order-details > div:nth-child(4) > div:nth-child(5) > div")).remove();
    $(document.querySelector("#main-content-region > div > div.order-details-container > div > div.order-details > div:nth-child(4) > div:nth-child(6) > div")).remove();

    //If Alternate Phone Number isn't present, remove it.
    if (document.querySelector("#main-content-region > div > div.order-details-container > div > div.order-details > div:nth-child(3) > div:nth-child(5) > div").innerHTML.length === 7) {
        console.log('No Alternate Phone Number found, removing')
        document.querySelector("#main-content-region > div > div.order-details-container > div > div.order-details > div:nth-child(3) > div:nth-child(4) > div").remove();
        document.querySelector("#main-content-region > div > div.order-details-container > div > div.order-details > div:nth-child(3) > div:nth-child(5) > div").remove();
    } else {
        console.log("Alt Phone Number Found. Keeping ");
    };
}

//===========================================================================================================================
//-----------------------------------------------Customer Order History------------------------------------------------------
//===========================================================================================================================
waitForKeyElements("#main-content-region > div > div.order-details-container > div.order-details-card.card > div.order-details > div:nth-child(2) > div:nth-child(5) > div", orderHistory)
orderHist = GM_getResourceText("orderHistBut");
function orderHistory() {
    $(document.querySelector('#page-cap-region > div > div > div.buttons-container > div')).append(orderHist);
}

//===========================================================================================================================
//------------------------------------------------Payment Calculator---------------------------------------------------------
//===========================================================================================================================

//External Script

//===========================================================================================================================
//------------------------------------------------Reload Dashboard upon Order Ready===---------------------------------------
//===========================================================================================================================
//This is to fix a bug in Rosie where when you mark an order as ready, it will stay in working.
//Current solution is to force reload the page when the banner saying it's complete pops up.
//Will work on a more complete solution at a later date.
waitForKeyElements('#main-toaster-region > div > div > div > div > span', forceReload);

function forceReload() {
    if (document.querySelector("#main-toaster-region > div > div > div > div > span").innerHTML.length >= 45) {
        location.reload();
    }
}

//===========================================================================================================================
//------------------------------------------------Credit in Footer-----------------------------------------------------------
//===========================================================================================================================
function checkContainer() {
    if ($('.footer-content').is(':visible')) {
        console.log("Loading Rosie Addons");
        $(document.querySelectorAll('.copyright')).contents().filter(function () {
            return this.nodeType == 3;
        }).last().replaceWith("© 2012-2020 Rosie Applications Inc." + " " + "|" + " " + "Rosie Addons");
    } else {
        setTimeout(checkContainer, 50);
    }
}

$(document.querySelectorAll('.copyright')).contents().filter(function () {
    return this.nodeType == 3;
}).last().replaceWith("© 2012-2020 Rosie Applications Inc." + " " + "|" + " " + "Rosie Addons");
//===========================================================================================================================
//------------------------------------------------Custom CSS ----------------------------------------------------------------
//===========================================================================================================================
//Went for a Material Design look with Pure CSS since injecting ANY form of stylesheet into the header breaks the site's fonts.
//Thanks, Rosie. Please start using !important.

var customCSS = GM_getResourceText("customCSS");
GM_addStyle(customCSS);