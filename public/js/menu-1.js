var menu1 =
{  


  updateInfo()
  {
    let noteNames = [];
    for(let i in main.notes)
    {
      noteNames.push(MIDI.noteToKey[main.notes[i]]);
    }
    $('#info').children('span:first').text(MIDI.noteToKey[main.root]);
    $('#info').children('span:last').text(noteNames.join(' '));
  },
  buttonFn : 
  {
    
    transpose : function(value)
    {
      main.root = main.root+value;

      for(let i in main.notes)
        main.notes[i] = main.notes[i]+value;

      main.play();
    },
    generateChord : function(name, extension, inversion)
    {
      if(name == 'MAJOR')
      {
        main.notes = [main.root];
        main.notes.push(main.root+4);
        main.notes.push(main.root+7);
      }
      else if(name == 'MINOR')
      {
        main.notes = [main.root];
        main.notes.push(main.root+3);
        main.notes.push(main.root+7);
      }
      else if(name == 'DIM')
      {
        main.notes = [main.root];
        main.notes.push(main.root+3);
        main.notes.push(main.root+6);
      }
      else if(name == 'AUG')
      {
        main.notes = [main.root];
        main.notes.push(main.root+4);
        main.notes.push(main.root+8);
      }

      if(extension == 'D7')
      {
        main.notes.push(main.root+10);
      }
      if(extension == 6)
      {
        main.notes.push(main.root+9);
      }
      if(extension == 7 || extension == 9 || extension == 11)
      {
        if(name == 'MAJOR')
          main.notes.push(main.root+11);
        else if(name == 'MINOR')
          main.notes.push(main.root+10);
        else if(name == 'DIM')
          main.notes.push(main.root+9);
      }
      if(extension == 9)
      {
        main.notes.push(main.root+14);
      }
      if(extension == 11)
      {
        main.notes.push(main.root+17);
      }
      
      if(inversion == 1)
      {
        main.notes.push(main.notes[0]+12);
        main.notes.shift();
      }
      else if(inversion == 2)
      {
        main.notes.push(main.notes[0]+12);
        main.notes.shift();
        main.notes.push(main.notes[0]+12);
        main.notes.shift();
      }
      main.play();
    },
    generateChordDegree : function(degree, isMajor, upHalfStep, extension)
    {
      if(degree == 7)
      {
        main.notes = [
          main.root+11,
          main.root+14-12,
          main.root+17-12
        ];

      }
      else
      {
        if(degree == 1) main.notes = [main.root];
        else if(degree == 2) main.notes = [main.root+2];
        else if(degree == 3) main.notes = [main.root+4];
        else if(degree == 4) main.notes = [main.root+5];
        else if(degree == 5) main.notes = [main.root+7];
        else if(degree == 6) main.notes = [main.root+9];
        

        if(isMajor)
          main.notes.push(main.notes[0]+4);
        else
          main.notes.push(main.notes[0]+3);

        main.notes.push(main.notes[0]+7);

        
        if(extension == 'D7')
        {
          main.notes.push(main.notes[0]+10);
        }
      }

      if(upHalfStep)
        for(let i in main.notes)
          main.notes[i] = main.notes[i] +1;
      main.play();

    },
  }
}