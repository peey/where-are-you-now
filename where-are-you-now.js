function whereAreYouNow() {
  $(".where-are-you-now").remove(); // remove elements from last call (if any)
  
  var $root = ((this != window) && $(this)) || $(document);
  
  function getQSFromElement(elm) {
    return elm.tagName.toLowerCase() + (elm.id == ""? "" : "#" + elm.id)  + (elm.className == ""?  "" : "." + elm.className.replace(/ /g, "."))
  }
  
  f = getQSFromElement
  
  if (this != window) {
    var hiddenParentsAndSelf = $root.parents(":hidden").add($root.filter(":hidden"));
    hiddenParentsAndSelf.show();
    var list = $root.find(":hidden:not(head):not(meta):not(title):not(style):not(script):not(link)");
    hiddenParentsAndSelf.hide();
  } else {
    var list = $(":hidden:not(head):not(meta):not(title):not(style):not(script):not(link)");
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
      "left": pos.left += 10, //adjust for border width of pointer
      "top": pos.top -= 15 // so that pointer points to the exact location
    }
    $("body").append($("<span class='where-are-you-now' style='display:none'>I'm faded (" + getQSFromElement(e) + ")</span>").css(pos));
  })
  
  $(".where-are-you-now").fadeIn(800)
  return $(filtered);
}

$.fn.whereAreYouNow = whereAreYouNow;