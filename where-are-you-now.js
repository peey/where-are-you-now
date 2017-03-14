;(function ($, window) {

// expose global
whereAreYouNow = function () {
  $(".where-are-you-now").remove(); // remove elements from last call (if any)
  
  var $root = ((this != window) && $(this)) || $(document);
  
  function getQSFromElement(elm) {
    $elm = $(elm);
    return $elm.prop("tagName").toLowerCase() + ($(elm).attr("id")? "#" + $(elm).attr("id") : "")  + ($(elm).attr("class")? "." + $(elm).attr("class").replace(/\s+/g, ".") : "");
  }
  
  var fadedSelector = ":hidden:not(head):not(meta):not(title):not(style):not(script):not(link):not(noscript)";
  if (this != window) {
    var hiddenParentsAndSelf = $root.parents(":hidden").add($root.filter(":hidden"));
    hiddenParentsAndSelf.show();
    var list = $root.find(fadedSelector);
    hiddenParentsAndSelf.hide();
  } else {
    var list = $(fadedSelector);
  }
  
  //filtered is the logic that filters out the children of matched hidden elements
  var filtered = [list[0]] || []
  list.each(function (ix, e) {
    var last = filtered[filtered.length - 1]
    if (last != e && !$.contains(last, e)) {
      filtered.push(e);
    }
  })
  
  $(filtered).each(function (ix, e) {
    var $e = $(e);
    
    //getting position of hidden elements: http://stackoverflow.com/a/5974377/1412255
    var hiddenParents = $e.parents(":hidden");
    hiddenParents.show();
    $e.show();
    var pos = $e.position();
    $e.hide();
    hiddenParents.hide();
    
    pos = {
      "left": pos.left + 10, //adjust for border width of pointer
      "top": Math.max(0, pos.top - 15) // so that pointer points to the exact location
    }
    $("body").append($("<span class='where-are-you-now' style='display:none'>I'm faded (" + getQSFromElement(e) + ")</span>").css(pos));
  })
  
  $(".where-are-you-now").fadeIn(800)
  return $(filtered);
}

$(document).ready(function () {
  var style = `
    .where-are-you-now {
      background: #ffffc1;
      padding: 5px 10px;
      border-radius: 5px;
      position: absolute;
    }
    
    .where-are-you-now:after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-width: 10px;
      border-style: solid;
      border-color: transparent #ffffc1 transparent transparent;
      top: 5px;
      left: -20px;
    }
  `;

  $("body").append(`<style>${style}</style>`);
})

$.fn.whereAreYouNow = whereAreYouNow;

})(jQuery, window);
