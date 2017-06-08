
var checkForContent = (function(chrome) {
  var isLoadedScript = {
    code: 'var SCROLL = SCROLL; SCROLL !== undefined;'
  };

  return function(callback) {
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
})(chrome);

function load(callback) {
  chrome.tabs.executeScript({file: 'content/content.js'}, callback);
}

function toggle(callback) {
  chrome.tabs.executeScript({code: 'SCROLL.toggle();'}, callback);
}

function setScrollRate(scrollRate, callback) {
  checkForContent(function(loaded) {
    if (loaded) {
      let script = 'SCROLL.setScrollRate(' + scrollRate + ');';
      chrome.tabs.executeScript({code: script}, callback);
    }
    else {
      typeof callback === 'function' && callback({});
    }
  });
}

var getScrollRate = (function(chrome) {
  function innerGetScrollRate(callback) {
    let script = 'SCROLL.getScrollRate();';
    chrome.tabs.executeScript({code: script}, function(res) {
      console.assert(res.length === 1);
      let scrollRate = res[0]
      console.assert(!isNaN(scrollRate));
      callback(scrollRate);
    });
  }

  return function(callback) {
    checkForContent(function(loaded) {
      if (loaded) {
        innerGetScrollRate(callback);
      }
      else {
        load(function() {
          innerGetScrollRate(callback);
        });
      }
    });
  }
})(chrome);


function loadAndToggle(callback) {
  checkForContent(function(loaded) {
    if (loaded) {
      toggle(callback);
    }
    else {
      load(function() {
        toggle(callback);
      });
    }
  })
}
