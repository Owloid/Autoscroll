var isLoadedScript = {
  code: 'var SCROLL = SCROLL; SCROLL !== undefined;'
}

function checkForContent(tab) {
  chrome.tabs.executeScript(tab.id, isLoadedScript, function(res) {
    let loaded = res[0];

    if (loaded) toggle();
    else loadAndToggle();
  });
}

function loadAndToggle(id) {
  chrome.tabs.executeScript(id, {file: 'content.js'}, function(res) {
    toggle();
  });
}

function toggle(id) {
  chrome.tabs.executeScript(id, {code: 'SCROLL.toggle();'});
}

chrome.browserAction.onClicked.addListener(checkForContent);
