
var keys = [];
var keyboard = document.getElementById('keyboard');
var touches = [];


function isKey(key) {
    return keys.indexOf(key) >= 0;
}

function touchStart(evt) {
  // console.log("START");
  evt.preventDefault();
  var changedTouches = evt.changedTouches;   
  for (var i = 0; i < changedTouches.length; i++) {
    var key = changedTouches[i].target;
    touches.push({ id : changedTouches[i].identifier, key: key });
    $(key).trigger('startPress');
  }
      // updateKeys();
}

function touchEnd(evt) {
  // console.log("END");

  evt.preventDefault();
  var changedTouches = evt.changedTouches;
  for (var i = 0; i < changedTouches.length; i++) {
    var index = getTouchIndex(changedTouches[i].identifier);
    if (index >= 0) 
    {
      $(touches[index].key).trigger('endPress');
      touches.splice(index, 1);
    }  
  }
  // updateKeys();
}

function touchMove(evt) {
  console.log("MOVE");
  evt.preventDefault();
  var changedTouches = evt.changedTouches;
  for (var i = 0; i < changedTouches.length; i++) {
    var touch = changedTouches[i];
    var index = getTouchIndex(touch.identifier);
    if (index >= 0) {
      var key = document.elementFromPoint(touch.pageX, touch.pageY);
      console.log(isKey(key))
      if (isKey(key))
      {
        console.log(touches[index].key != key ? "BRUBAH" : "SAMA")
        if(touches[index].key != key)
        {
          $(touches[index].key).trigger('endPress');
          touches[index].key = key;
          $(touches[index].key).trigger('startPress');
        }

      }
    }      
  }
  // updateKeys();
}

function getTouchIndex(id) {
  for (var i = 0; i < touches.length; i++) {
    if (touches[i].id === id) {
      return i;
    }
  }
  return -1;
}