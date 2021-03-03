var keyboardHandler =
{
  pressedKeyCodes : [],

  keyboardLetterToKey(letter)
  {

    if(letter == 'q')       return 60 //C4
    else if(letter == 'w')  return 62;
    else if(letter == 'e')  return 64;
    else if(letter == 'r')  return 65;
    else if(letter == 't')  return 67;
    else if(letter == 'y')  return 69;
    else if(letter == 'u')  return 71;
    else if(letter == 'i')  return 72;
    else if(letter == 'o')  return 74;
    else if(letter == 'p')  return 76;
    else if(letter == '[')  return 77;
    else if(letter == ']')  return 79;
    else if(letter == '2')  return 61;
    else if(letter == '3')  return 63;
    else if(letter == '5')  return 66;
    else if(letter == '6')  return 68;
    else if(letter == '7')  return 70;
    else if(letter == '9')  return 73;
    else if(letter == '0')  return 75;
    else if(letter == '=')  return 78;

    else if(letter == 'z')  return 72;
    else if(letter == 'x')  return 74;
    else if(letter == 'c')  return 76;
    else if(letter == 'v')  return 77;
    else if(letter == 'b')  return 79;
    else if(letter == 'n')  return 81;
    else if(letter == 'm')  return 83;
    else if(letter == ',')  return 84;
    else if(letter == '.')  return 86;
    else if(letter == '/')  return 88;
    else if(letter == 's')  return 73;
    else if(letter == 'd')  return 75;
    else if(letter == 'g')  return 78;
    else if(letter == 'h')  return 80;
    else if(letter == 'j')  return 82;
    else if(letter == 'l')  return 85;
    else if(letter == ';')  return 87;

  }
};
$('body').keydown(function(e){
  if(keyboardHandler.pressedKeyCodes[e.keyCode])
    return;

  keyboardHandler.pressedKeyCodes[e.keyCode] = true;

  let note = keyboardHandler.keyboardLetterToKey(e.key.toLowerCase());
  if(note)
    main.keyboardPress(keyboardHandler.keyboardLetterToKey(e.key.toLowerCase()));
  
})
$('body').keyup(function(e){
  keyboardHandler.pressedKeyCodes[e.keyCode] = false;
  
  let note = keyboardHandler.keyboardLetterToKey(e.key.toLowerCase());
  if(note)
    main.keyboardUnpress(keyboardHandler.keyboardLetterToKey(e.key.toLowerCase()));
});