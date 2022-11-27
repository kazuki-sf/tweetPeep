"use strict";

window.onload = () => window.addEventListener("keydown", (e) => {
    if (e.shiftKey && e.metaKey && e.key == "e") {
        chrome.runtime.sendMessage({ action: 'tweet_peep' });
    }
})
