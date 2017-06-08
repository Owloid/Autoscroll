"use strict";

var SCROLL = SCROLL;

if (SCROLL === undefined || SCROLL === null) {
  SCROLL = {};

  var myreq = null;

  var rate = 20;
  var time;
  var expectedY;
  var decimal;

  function start() {
    if (myreq)
      return;

    myreq = window.requestAnimationFrame(init);
  }

  function end() {
    if (myreq === null)
      return;

    window.cancelAnimationFrame(myreq);
    myreq = null;
  }

  function toggle() {
    (myreq == null
      ? start
      : end)();
  }

  // doesn't require blocking since it is only used once in the loop
  function setRate(new_rate) {
    if (!isNaN(new_rate)) {
      rate = new_rate;
    }
  }

  function init(timestamp) {
    time = timestamp;
    expectedY = window.scrollY;
    decimal = 0;

    myreq = window.requestAnimationFrame(loop);
  }

  function loop(timestamp) {
    if (expectedY != window.scrollY) {
      end();
      return;
    }

    var elapsed = (timestamp - time) / 1000;
    var pixels = rate * elapsed + decimal;
    decimal = pixels % 1;
    pixels = parseInt(pixels);

    if (pixels != 0) {
      expectedY += pixels;
      window.scrollBy(0, pixels);
    }

    time = timestamp;
    myreq = window.requestAnimationFrame(loop);
  }

  SCROLL.toggle = toggle;
}

SCROLL.toggle();
