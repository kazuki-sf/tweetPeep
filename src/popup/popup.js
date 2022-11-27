"use strict";

window.onload = () => {
    document.getElementById("search_input").focus();
}

document.getElementById("see_on_twitter").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: 'tweet_peep' });
}, false);

document.getElementById("search_input").addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
        const query = document.getElementById("search_input").value;
        chrome.runtime.sendMessage({ action: 'search_on_twitter', data: query });
    }
}, false);