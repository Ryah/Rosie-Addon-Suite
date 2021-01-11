// ==UserScript==
// @name            Rosie Addons Suite
// @namespace       http://ryah.org/
// @match           https://retailers.rosieapp.com/*
// @version         1.592
// @description     Addons for Rosie Retailers because the site needs improvement
// @author          Ryan Adame
// @require         https://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require         https://raw.githubusercontent.com/Ryah/Rosie-Addon-Suite/main/js/waitForKeyElements_offline.js
// @resource        payCalcHTML https://raw.githubusercontent.com/Ryah/Rosie-Addon-Suite/main/html/paymentCalculator.html
// @resource        customCSS https://raw.githubusercontent.com/Ryah/Rosie-Addon-Suite/main/css/styles.css
// @resource        orderHistBut https://raw.githubusercontent.com/Ryah/Rosie-Addon-Suite/main/html/orderHist.html
// @resource        addItemBut file:///C:/Users/rosie0048/Desktop/RAS/Rosie-Addon-Suite/html/addItem.html
// @grant           GM_addStyle
// @grant           GM_getResourceText
// ==/UserScript==

/* --------------------------------------------------------------------------*/
/*                            Setup                                   */
/* --------------------------------------------------------------------------*/

//Calls tag section to add tag to footer once visible
jQuery(document).ready(checkContainer);

ouMsg = false;
//Checks and store if you're on Dashboard or Order Page and stores in a boolean named "dash" every second
//(yeah it's unoptimized but it's the best I got so deal with it)
//UPDATE: It's no longer the best I got but I'm too lazy to update that spaghetti
setInterval(() => {
    if (window.location.href.indexOf("dashboard") > -1) {
        dash = true;
        changed = false;
        if (ouMsg == true) {
            ouMsg = false;
        }
    } else if (window.location.href.indexOf("orders") > -1) {
        dash = false;
        //console.log("dash = " + dash);
    } else {
        //alert("Something went wrong finding what page you're on. Error Code 8262.");
        console.log("Something went wrong finding what page you're on. Error Code 8262.");
    }
}, 1000);

/* --------------------------------------------------------------------------- */
/*                     24 hour to 12 hour conversion button               */
/* --------------------------------------------------------------------------- */

waitForKeyElements(".orders-table-container", timeConvert);

changed = false; //Set variable to mark replacement since I can't think of another way to detect if the time has changed or not :)

function timeConvert() {
    if (changed === false) {
        //If on Dashboard, counts the header-content classes for amount of orders.
        //If not on Dashboard, then sets default order count to 1.
        if (dash === true) {
            var orders = document.querySelectorAll("#main-content-region .header-content").length;
        } else if (dash === false) {
            var orders = 1;
        } else {
            console.log("Something went wrong grabbing orders. Error code 3625 in Time Conversion Script.");
        }

        //for loop wouldn't work ¯\_(ツ)_/¯
        //jk now it does pog
        msg = false;
        for (i = 0; i < orders; i++) {
            //Grabs and trims time using grabTime function. Also formats it with AM/PM at the end.
            var timeString = grabTime(i);
            var hourEnd = timeString.indexOf(":");
            var H = +timeString.substr(0, hourEnd);
            var h = H % 12 || 12;
            var ampm = H < 12 || H === 24 ? " AM" : " PM";
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
                $(document.querySelectorAll(".header-content")[i])
                    .contents()
                    .filter(function () {
                        return this.nodeType == 3;
                    })
                    .first()
                    .replaceWith("<b>" + timeString + " " + "|" + " " + "</b>");
                changed = true; //Mark the time as converted to prevent the script converting a random string. It's a duct tape fix but it works 99% of the time so I'm not going to touch it.
            } else {
                console.log("Something went wrong replacing the time. Error Code 2124 in 24/12 Button Script.");
            }
        }
        msg = false;
    }
}

function grabTime(j) {
    if (dash === true) {
        var timeString2 = document.querySelectorAll(".header-content")[j].innerHTML;
        var timeStart = timeString2.indexOf("|") + 12;
        var timeEnd = timeString2.indexOf(":") + 2;
        var T = timeString2.substr(timeStart, timeEnd);
        return T;
    } else if (dash === false) {
        //Add time to order page if on order page
        var timeString2 = document.querySelectorAll("div:nth-child(4) > div:nth-child(3)")[2].innerHTML;
        var timeStart = timeString2.indexOf(",") + 1;
        var timeEnd = timeString2.indexOf(":") + 2;
        var T = timeString2.substr(timeStart, timeEnd);
        return T;
    } else {
        // alert("Something went wrong grabbing the time. Error Code 1735 in 24/12 Button Script.");
        console.log("Something went wrong grabbing the time. Error Code 1735 in 24/12 Button Script.");
    }
}

/* -------------------------------------------------------------------------- */
/*                               Order Page Improvements                      */
/* -------------------------------------------------------------------------- */

//Waits for loyality number to load before passing it to the orderImprove function.
waitForKeyElements("#main-content-region > div > div.order-details-container > div.order-details-card.card > div.order-details > div:nth-child(4) > div.loyalty-info > div:nth-child(2) > div", orderImprove);

function orderImprove(jNode) {
    //Add line breaks for better kerning.
    $(document.querySelector("#main-content-region > div > div.order-details-container > div > div.order-details > div:nth-child(4) > div.loyalty-info")).append(`<br>`);

    // Format Loyality Number
    /*Uses regex to format the number and store it in propNum.
    This took way too long to figure out. Why hasn't anyone made a simpler version of regex yet? I wrote the thing yet if you ask me how it works I will be just as confused as you are.
    It shouldn't be the norm to have multiple generators out there for something that people use very often and have pretty much no viable substitute for.
    Sure it's EXTREMELY versatile but the learning curve is like running into a brick wall. I've never heard someone go "Oh thank God I can use RegEx! I've been waiting for this moment! I'm so happy!"
    Everyone hates it but for some reason as far as I know no one has sucessfully attempted to make an alternative for it. It makes me so sad.
    Anyways that's my rant. */
    num = document.querySelector("#main-content-region > div > div.order-details-container > div > div.order-details > div:nth-child(4) > div.loyalty-info > div:nth-child(2) > div").innerHTML;
    propNum = num.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

    // Replace phone number with propNum.
    // console.log("Formatting Celebrate Number");
    $(document.querySelector("#main-content-region > div > div.order-details-container > div > div.order-details > div:nth-child(4) > div.loyalty-info > div:nth-child(2) > div")).contents().filter(function () {
        return this.nodeType == 3;
    }).last().replaceWith(propNum);

    // Rename "Loyalty Number" to "Celebrate Number" for consistancy.
    // console.log('Renaming "Loyalty Number" to "Celebrate Number"');
    $(document.querySelector("#main-content-region > div > div.order-details-container > div > div.order-details > div:nth-child(4) > div.loyalty-info > div:nth-child(1) > div")).contents().filter(function () {
        return this.nodeType == 3;
    }).last().replaceWith("Celebrate Number");

    // Remove "Cutoff Time" as it just causes confusion with pickup time.
    // console.log('Removing "Cutoff Time"');
    $(document.querySelector("#main-content-region > div > div.order-details-container > div > div.order-details > div:nth-child(4) > div:nth-child(5) > div")).remove();
    $(document.querySelector("#main-content-region > div > div.order-details-container > div > div.order-details > div:nth-child(4) > div:nth-child(6) > div")).remove();

    // If Alternate Phone Number isn't present, remove it.
    if (document.querySelector("#main-content-region > div > div.order-details-container > div > div.order-details > div:nth-child(3) > div:nth-child(5) > div").innerHTML.length === 7) {
        document.querySelector("#main-content-region > div > div.order-details-container > div > div.order-details > div:nth-child(3) > div:nth-child(4) > div").remove();
        document.querySelector("#main-content-region > div > div.order-details-container > div > div.order-details > div:nth-child(3) > div:nth-child(5) > div").remove();
    };
}

/* -------------------------------------------------------------------------- */
/*                                Customer Order History                      */
/* -------------------------------------------------------------------------- */

waitForKeyElements(
    "#main-content-region > div > div.order-details-container > div.order-details-card.card > div.order-details > div:nth-child(2) > div:nth-child(5) > div",
    orderHistory
);
orderHist = GM_getResourceText("orderHistBut");
addItem = GM_getResourceText("addItemBut");

function orderHistory() {
    $(document.querySelector("#page-cap-region > div > div > div.buttons-container > div")).append(orderHist);
    $(document.querySelector("#main-content-region > div > div.pick-list-container > div > div.pick-list-title > div.buttons-section")).append(addItem);

}


/* -------------------------------------------------------------------------- */
/*                                  Payment Calculator                        */
/* -------------------------------------------------------------------------- */

//Most of the js is in the HTML file.

var pcHTML = GM_getResourceText("payCalcHTML");

setInterval(() => {
    if (window.location.href.indexOf("dashboard") > -1) {
        //do nothing i guess?
    } else {
        load = document.getElementById("payCalc");
    }
}, 500);

load = document.getElementById("payCalc");

waitForKeyElements(
    "#main-content-region > div > div.order-details-container > div > div.order-details > div.details-column.money > div:nth-child(4) > div.content",
    paymentCalc
);

function paymentCalc() {
    if (window.location.href.indexOf("orders") > -1) {
        if (typeof load != "undefined" && load === null) {
            $(document.querySelector("#main-content-region > div > div.order-details-container")).append(pcHTML);
            load = true;
        }
    }
}

/* -------------------------------------------------------------------------- */
/*                          Reload Dashboard upon Order Ready                 */
/* -------------------------------------------------------------------------- */

//This is to fix a bug in Rosie where when you mark an order as ready, it will stay in working.
//Current solution is to force reload the page when the banner saying it's complete pops up.
//Will work on a more complete solution at a later date.


waitForKeyElements("#main-toaster-region > div > div > div > div > span", forceReload);


function forceReload() {
    if (document.querySelector("#main-toaster-region > div > div > div > div > span").innerText.indexOf("successfully marked as ready") > -1) {
        location.reload();
    }
}

function checkContainer() {
    if ($(".footer-content").is(":visible")) {
        console.log("Loading Rosie Addons");
        $(document.querySelectorAll(".copyright"))
            .contents()
            .filter(function () {
                return this.nodeType == 3;
            })
            .last()
            .replaceWith(
                "© 2012-2020 Rosie Applications Inc. | <a href='https://www.ryah.org/'>Rosie Addons</a> | <a style='text-decoration:none' href='https://github.com/Ryah/Rosie-Addon-Suite'><img height='20' width='20' src='https://cdn.jsdelivr.net/npm/simple-icons@4.5.0/icons/github.svg' /></a>"
            );
    } else {
        setTimeout(checkContainer, 50);
    }
}

//Enter Key Submit on Substitution Modal

// waitForKeyElements(".search-result-description-section", addEnterFunc);

// function addEnterFunc() {
//     function clickTargetButton(jNode) {
//         var clickEvent = document.createEvent("MouseEvents");
//         clickEvent.initEvent("click", true, true);
//         jNode[0].dispatchEvent(clickEvent);
//     }

//     console.log("Adding enter");
//     var quantSubBox = document.querySelector('#modal-manager-region > div > div.modal.modal-visible > div.modal-content-container > div > div.modal-cards.paper > div:nth-child(2) > div.search-results-card-container > div > div.search-item-stickers-container > div > div > div.fill-section > div.fill-input-container > div > input[type=text]');
//     quantSubBox.classList.add('quantSubBox');

//     $('.quantSubBox').focus(function () {
//         document.addEventListener("keyup", function (event) {
//             if (event.keyCode === 13) {
//                 console.log("enter was pressed");
//                 clickTargetButton($('#modal-manager-region > div > div.modal.modal-visible > div.modal-content-container > div > div.modal-cards.paper > div:nth-child(2) > div.search-results-card-container > div > div.search-item-stickers-container > div > div > div.fill-section > div.action-button-container > div > span'));
//             }
//         });
//     });
// };

//Extra Functions




/* -------------------------------------------------------------------------- */
/*                                      Custom CSS                            */
/* -------------------------------------------------------------------------- */

//Went for a Material Design look with Pure CSS since injecting ANY form of stylesheet breaks the site's fonts.

var customCSS = GM_getResourceText("customCSS");
GM_addStyle(customCSS);