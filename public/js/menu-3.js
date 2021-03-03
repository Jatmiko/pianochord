var menu3 = {
  isPlaying : false,
  isRecording : false,
  bpm : 120,
  index:0,
  transpose:0,
  activeTranspose:0,
  buttonFn : {
    togglePlay : async function()
    {
      menu3.isPlaying = ! menu3.isPlaying;
      $("#button-menu-3-play").html(`<i class="fas ${menu3.isPlaying ? "fa-stop" : "fa-play"} fa-lg"></i>`);

      while(menu3.isPlaying && $("#melody-button-container").children().length > 0)
      {
        for(let i=0; i<$("#melody-button-container").children().length; i++)
        {
          let button = $("#melody-button-container").children()[i];
          let text = $(button).text();
          let note = MIDI.keyToNote[$(button).text()];
          $(button).addClass('active');
          if(note)
          {
            main.stopAllNote();

            menu3.lastNotePlayed = note;
            main.playNote(note+menu3.transpose);
          }
          else if(text == "TRANSPOSE")
          {
            menu3.transpose += menu3.activeTranspose;
            main.stopAllNote();

            main.playNote(menu3.lastNotePlayed+menu3.transpose);
          }
          await sleep(60*1000/(2*menu3.bpm));
          $(button).removeClass('active');

          if( ! menu3.isPlaying)
          {
            break;
          }
        }
      }

    },
    toggleRecord : function()
    {
      menu3.isRecording = ! menu3.isRecording;
      $("#button-menu-3-record").html(`<i class="fas ${menu3.isRecording ? "fa-stop-circle" : "fa-record-vinyl"} fa-lg"></i>`);
    },
    changeBpm : function(val)
    {
      menu3.bpm = val;
      $("#menu-3-bpm").text(menu3.bpm);
    },
    addBpm : function(val)
    {
      menu3.bpm += val;
      if(menu3.bpm < 10)
        menu3.bpm = 10;
      $("#menu-3-bpm").text(menu3.bpm);
    },
    activeTranspose : function(transpose, button)
    {
      menu3.activeTranspose = transpose;
      $('.menu-3-button-transpose').removeClass('active');
      $(button).addClass('active');
    },
    addNote : function(note)
    {
      let specials = ['HOLD', 'TRANSPOSE'];
      let text = '';
      if(specials.indexOf(note) == -1)
      {
        text = MIDI.noteToKey[note];
      }
      else
        text = note;
      let noteButton = $(`<div class="button s8-16" onclick="">${text}</div>`);
      $("#melody-button-container").append(noteButton);

    },
    eraseLast : function()
    {
      $("#melody-button-container").children().last().remove();
    },
    eraseAll : function()
    {
      $("#melody-button-container").empty();
    },
    preset : function(no)
    {
      menu3.buttonFn.eraseAll();
      let presets = [
        function()
        {
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote(MIDI.keyToNote.D4);
          menu3.buttonFn.addNote(MIDI.keyToNote.E4);
          menu3.buttonFn.addNote(MIDI.keyToNote.F4);
          menu3.buttonFn.addNote(MIDI.keyToNote.G4);
          menu3.buttonFn.addNote(MIDI.keyToNote.F4);
          menu3.buttonFn.addNote(MIDI.keyToNote.E4);
          menu3.buttonFn.addNote(MIDI.keyToNote.D4);
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('TRANSPOSE');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.changeBpm(120);
        },
        function()
        {
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote(MIDI.keyToNote.D4);
          menu3.buttonFn.addNote(MIDI.keyToNote.E4);
          menu3.buttonFn.addNote(MIDI.keyToNote.F4);
          menu3.buttonFn.addNote(MIDI.keyToNote.G4);
          menu3.buttonFn.addNote(MIDI.keyToNote.A4);
          menu3.buttonFn.addNote(MIDI.keyToNote.B4);
          menu3.buttonFn.addNote(MIDI.keyToNote.C5);
          menu3.buttonFn.addNote(MIDI.keyToNote.D5);
          menu3.buttonFn.addNote(MIDI.keyToNote.C5);
          menu3.buttonFn.addNote(MIDI.keyToNote.B4);
          menu3.buttonFn.addNote(MIDI.keyToNote.A4);
          menu3.buttonFn.addNote(MIDI.keyToNote.G4);
          menu3.buttonFn.addNote(MIDI.keyToNote.F4);
          menu3.buttonFn.addNote(MIDI.keyToNote.E4);
          menu3.buttonFn.addNote(MIDI.keyToNote.D4);
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('TRANSPOSE');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.changeBpm(120);
        },
        function()
        {
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote(MIDI.keyToNote.E4);
          menu3.buttonFn.addNote(MIDI.keyToNote.G4);
          menu3.buttonFn.addNote(MIDI.keyToNote.C5);
          menu3.buttonFn.addNote(MIDI.keyToNote.G4);
          menu3.buttonFn.addNote(MIDI.keyToNote.E4);
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote(MIDI.keyToNote.E4);
          menu3.buttonFn.addNote(MIDI.keyToNote.G4);
          menu3.buttonFn.addNote(MIDI.keyToNote.C5);
          menu3.buttonFn.addNote(MIDI.keyToNote.G4);
          menu3.buttonFn.addNote(MIDI.keyToNote.E4);
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('TRANSPOSE');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.changeBpm(120);
        },
        function()
        {
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote(MIDI.keyToNote.E4);
          menu3.buttonFn.addNote(MIDI.keyToNote.D4);
          menu3.buttonFn.addNote(MIDI.keyToNote.F4);
          menu3.buttonFn.addNote(MIDI.keyToNote.E4);
          menu3.buttonFn.addNote(MIDI.keyToNote.G4);
          menu3.buttonFn.addNote(MIDI.keyToNote.F4);
          menu3.buttonFn.addNote(MIDI.keyToNote.D4);
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('TRANSPOSE');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.changeBpm(120);
        },
        function()
        {
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote(MIDI.keyToNote.C5);
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote(MIDI.keyToNote.B4);
          menu3.buttonFn.addNote(MIDI.keyToNote.C5);
          menu3.buttonFn.addNote(MIDI.keyToNote.D5);
          menu3.buttonFn.addNote(MIDI.keyToNote.C5);
          menu3.buttonFn.addNote(MIDI.keyToNote.B4);
          menu3.buttonFn.addNote(MIDI.keyToNote.A4);
          menu3.buttonFn.addNote(MIDI.keyToNote.G4);
          menu3.buttonFn.addNote(MIDI.keyToNote.F4);
          menu3.buttonFn.addNote(MIDI.keyToNote.E4);
          menu3.buttonFn.addNote(MIDI.keyToNote.D4);
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('TRANSPOSE');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.changeBpm(120);
        },
        function()
        {
          menu3.buttonFn.addNote(MIDI.keyToNote.G4);
          menu3.buttonFn.addNote(MIDI.keyToNote.F4);
          menu3.buttonFn.addNote(MIDI.keyToNote.E4);
          menu3.buttonFn.addNote(MIDI.keyToNote.D4);
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('TRANSPOSE');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.changeBpm(60);
        },
        function()
        {
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote(MIDI.keyToNote.D4);
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote(MIDI.keyToNote.D4);
          menu3.buttonFn.addNote(MIDI.keyToNote.E4);
          menu3.buttonFn.addNote(MIDI.keyToNote.D4);
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote(MIDI.keyToNote.D4);
          menu3.buttonFn.addNote(MIDI.keyToNote.E4);
          menu3.buttonFn.addNote(MIDI.keyToNote.F4);
          menu3.buttonFn.addNote(MIDI.keyToNote.G4);
          menu3.buttonFn.addNote(MIDI.keyToNote.F4);
          menu3.buttonFn.addNote(MIDI.keyToNote.E4);
          menu3.buttonFn.addNote(MIDI.keyToNote.D4);
          menu3.buttonFn.addNote(MIDI.keyToNote.C4);
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('TRANSPOSE');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.addNote('HOLD');
          menu3.buttonFn.changeBpm(120);
        }
      ];

      presets[+no-1]();
    }
  },
  


}