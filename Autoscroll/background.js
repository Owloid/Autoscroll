var isLoadedScript = {
  code: 'var SCROLL = SCROLL; ' +
        'SCROLL !== undefined;'
};

function checkForContent(callback) {
    chrome.tabs.executeScript(isLoadedScript, function(res) {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
        return;
      }

      console.assert(res.length === 1);
      let loaded = res[0];
      callback(loaded);
    });
}

function load(callback) {
  chrome.tabs.executeScript({file: 'content.js'}, callback);
}

function toggle(callback) {
  chrome.tabs.executeScript({code: 'SCROLL.toggle();'}, callback);
}

function browserAction(tab) {
  checkForContent(function(loaded) {
    if (loaded) {
      toggle();
    }
    else {
      load(function() {
        toggle();
      });
    }
  })
}

chrome.browserAction.onClicked.addListener(browserAction);
