/*
 * A separate variable is needed to check for the SCROLL namespace because
 * because executeScript returns an empty object for all objects.
 */
var loadName = 'autoscrollLoaded';
var isLoadedScript = (function() {
  let script = 'var ' + loadName + ' = ' + loadName + ' || false; ' +
               loadName + ';';
  return {code: script};
})();
var setLoadedScript = (function() {
  let script = 'var ' + loadName + ' = true; ' +
               loadName + ';';
  return {code: script};
})();

function loadAndToggle(id) {
  chrome.tabs.executeScript(id, {file: 'autoscroll.js'}, function(res) {
    chrome.tabs.executeScript(id, setLoadedScript, function(res) {
      toggle();
    });
  });
}

function toggle(id) {
  chrome.tabs.executeScript(id, {code: 'SCROLL.toggle();'});
}

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, isLoadedScript, function(res) {
    let loaded = res[0] === true;

    if (loaded) toggle();
    else loadAndToggle();
  });
});
