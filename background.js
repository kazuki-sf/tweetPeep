"use strict";

console.log("connected...");
const onInstallURL = "https://www.notion.so/Tweet-Peep-809e1c498f8a4e0889d2a82baf4dfcb1";

// On Chrome Install
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        chrome.tabs.create({ url: onInstallURL });
    }
});

// Runtime Message Listener
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action && request.action == "tweet_peep") {
        peepTweets();
        sendResponse();
    } else if (request.action && request.action == "search_on_twitter") {
        searchOnTwitter(request.data);
        sendResponse();
    }
});

// Context Menu Listeners
chrome.contextMenus.removeAll(function () {
    chrome.contextMenus.create({ id: 'search', title: "Search on Twitter", contexts: ["selection"] });
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == "search") {
        info.linkUrl ? peepTweets(info.linkUrl) : searchOnTwitter(info.selectionText);
    }
});

// Functions
function peepTweets(url_context) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const url = (url_context !== undefined) ? new URL(url_context) : new URL(tabs[0].url);
        const openURL = `https://twitter.com/search?q=${url.href}&src=typed_query`;
        chrome.tabs.create({ url: openURL });
    });
}

function searchOnTwitter(searchTerm) {
    const openURL = `https://twitter.com/search?q=${searchTerm}&src=typed_query`;
    chrome.tabs.create({ url: openURL });
}