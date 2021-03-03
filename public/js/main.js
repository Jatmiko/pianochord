let sleep = (ms) => { return new Promise(resolve => setTimeout(resolve, ms))};

var main = {
  root : MIDI.keyToNote.C4,
  notes : [MIDI.keyToNote.C4],
  currentLayout : 2,
  basses : [],
  bass : 0,


  playNote(note)
  {
    let velocity = 127;
    let delay = 0;
    MIDI.noteOn(0, note, velocity, delay);
    $(`#key-${MIDI.noteToKey[note]}`).addClass('virtual-down');
  },

  stopNote(note)
  {
    let delay = 0;
    MIDI.noteOff(0, note, delay);
    if(main.currentLayout != 2)
      $(`#key-${MIDI.noteToKey[note]}`).removeClass('virtual-down');
  },

  keyboardPress(note)
  {
    // console.log()
    if(main.currentLayout == 1)
    {
      main.root = note;
      main.notes = [note];
      main.play(false);       
    }
    else if(main.currentLayout == 2)
    {
      main.root = note;
      main.notes = [];

      for(let i in menu2.pitchClasses)
        main.notes.push(menu2.pitchClasses[i]+main.root);
        
      for(let i=0; i<menu2.inversion; i++)
      {
        main.notes.push(main.notes[0]+12);
        main.notes.shift();
      }
      
      main.play(true);  
    }
    else if(main.currentLayout == 3)
    {
      main.root = note;
      main.notes = [note];
      main.play(false);       
      if(menu3.isRecording)
        menu3.buttonFn.addNote(note);
    }

  },

  keyboardUnpress(note)
  {
    main.stopNote(note);
  },

  

  getLeftByNote(note)
  {
    let width = 55;
    let left = -width;

    for(let i=MIDI.keyToNote.A0-1; i<=note; i++)
    {
      if(i%12 == 0) left += width;
      else if(i%12 == 1) left += width/2;
      else if(i%12 == 2) left += width/2;
      else if(i%12 == 3) left += width/2;
      else if(i%12 == 4) left += width/2;
      else if(i%12 == 5) left += width;
      else if(i%12 == 6) left += width/2;
      else if(i%12 == 7) left += width/2;
      else if(i%12 == 8) left += width/2;
      else if(i%12 == 9) left += width/2;
      else if(i%12 == 10) left += width/2;
      else if(i%12 == 11) left += width/2;
    }
    return left;
  },

  createKey(note)
  {

    //♯♭
    let noteName = MIDI.noteToKey[note];
    noteName = noteName.replace('b', '♭');
    noteName = noteName.replace('#', '♯');

    let key = $(`<div class="key" id="key-${MIDI.noteToKey[note]}"><div class="note-label">${noteName}</div></div>`);
    $(key).css('left', main.getLeftByNote(note));

    let isAccidental = function(note)
    {
      let mod = note % 12;
      let accidentals = [1, 3, 6, 8, 10];
      return accidentals.indexOf(mod) != -1;
    };
    if(isAccidental(note))
      $(key).addClass('black');
    else
      $(key).addClass('white');
    
    $(key).mousedown(function(){
      $(key).trigger('startPress');
    });
    $(key).mouseup(function(){
      $(key).trigger('endPress');
    });
    $(key).mouseout(function(){
      $(key).trigger('endPress');
    });
    $(key).on('startPress', function(){
      $(key).addClass('down');
      main.keyboardPress(note);
    });
    $(key).on('endPress', function(){
      $(key).removeClass('down');
      main.keyboardUnpress(note);
    });
    return key;
  },

  updateInfo()
  {
    let noteNames = [];
    let bassNames = [];
    for(let i in main.notes)
    {
      noteNames.push(MIDI.noteToKey[main.notes[i]]);
    }
    for(let i in main.basses)
    {
      bassNames.push(MIDI.noteToKey[main.notes[i]]);
    }
    $('#info').children('span:eq(0)').text(MIDI.noteToKey[main.root]);
    $('#info').children('span:eq(1)').text(bassNames.join(' '));
    $('#info').children('span:eq(2)').text(noteNames.join(' '));
  },
  addBass()
  {
    main.basses = [];
    if(main.bass > 0 && main.notes.length > 1)
    {
      let tonic = main.notes[0];
      let noteName = MIDI.noteToKey[tonic];
      let keyName = noteName.substr(0, noteName.length-1);

      if(tonic > MIDI.keyToNote[keyName+"3"] && (main.bass == 1 || main.bass == 3))
        main.basses.push(MIDI.keyToNote[keyName+"3"]);
      if(tonic > MIDI.keyToNote[keyName+"2"] && (main.bass == 2 || main.bass == 3))
        main.basses.push(MIDI.keyToNote[keyName+"2"]);
    }
  },
  stopAllNote : function()
  {
    let arr = [];
    for(let i = MIDI.keyToNote.A0; i<= MIDI.keyToNote.C7; i++)
      arr.push(i);
    MIDI.chordOff(0, arr, 0);
    $(".key").removeClass('virtual-down');
  },
  async play (mutePreviousNote = true)
  {
    if(mutePreviousNote)
    {
      main.stopAllNote();
    }
    main.addBass();
    
    for(let i in main.basses)
    {
      main.playNote(main.basses[i]);
    }
    for(let i in main.notes)
    {

        main.playNote(main.notes[i]);
        // await sleep(200);
    }

    main.updateInfo();
  },

  buttonFn : {
    toggleBass : function()
    {
      let label = {
        0 : 'off',
        1 : 'low',
        2 : 'lower',
        3 : 'double',
      }
      main.bass = main.bass+1;
      if(main.bass>3)
        main.bass = 0;
      $(".bassButton").children("span").text(label[main.bass]);
    },
    showHelp : function()
    {
      $('#modal-help-'+main.currentLayout).modal();
      var instance = M.Modal.getInstance($("#modal-help-"+main.currentLayout));
      instance.open();
    },
    switchLayout : function()
    {
      main.currentLayout++;
      if(main.currentLayout > 3)
        main.currentLayout = 1;
      

        $(".button-container").hide();
        $("#button-container-"+main.currentLayout).show();
        $("#main-menu").show();
    }
  },




};




window.onload = function () {
  MIDI.loadPlugin({
    soundfontUrl: "./public/soundfont/",
    instrument: "acoustic_grand_piano",
    onprogress: function(state, progress) {
      // console.log(state, progress);
      $("#loading-layer").children("span").text(parseInt(progress*100));
    },
    onsuccess: function() {
      console.log("READY TO PLAY");
      // play the note
      MIDI.setVolume(0, 127);
      main.root = MIDI.keyToNote.C4;
      main.notes = [MIDI.keyToNote.C4];
      
      main.updateInfo();
      // $("#loading-layer").html('<button class="btn green" ontouchend="startPlaying(true)" onmouseup="startPlaying()">Start</button>');
      $("#loading-layer").fadeOut(500);
      main.buttonFn.switchLayout();
      main.buttonFn.switchLayout();
      // toggleFullScreen();
        // MIDI.noteOn(0, note, velocity, delay);
      // MIDI.noteOff(0, note, delay + 0.75);
      
      // MIDI.noteOn(0, 54, velocity, delay);
      // MIDI.noteOff(0, 54, delay + 0.75);
    },
    onerror: function() {
      console.log("ASD")
    }
  });
};
function startPlaying(z) {
  // if(z) alert(213)
  MIDI.noteOn(0, 60, 1, 0);
  $("#loading-layer").fadeOut(500);
}

function toggleFullScreen() {
  if (
     (document.fullScreenElement && document.fullScreenElement !== null) ||
     (!document.mozFullScreen && !document.webkitIsFullScreen)
  ) {
     if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
     } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
     } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
     }else if (document.documentElement.msRequestFullscreen) {
        if (document.msFullscreenElement) {
           document.msExitFullscreen();
        } else {
         document.documentElement.msRequestFullscreen(); 
        }
     }
  } else {
     if (document.cancelFullScreen) {
        document.cancelFullScreen();
     } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
     } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
     }
  }
}