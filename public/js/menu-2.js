var menu2 =
{  
  inversion : 0,
  pitchClasses : [0, 4, 7],
  updateToMain : function()
  {
    
  },
  buttonFn : 
  {
    setInversion : function(button, inversion)
    {
      menu2.inversion = inversion;
      $('.button-inversion').removeClass('active');
      $(button).addClass('active');
      // menu2.updateToMain();
    },
    setPitchClass : function(button, pitchClasses)
    {
      menu2.pitchClasses = pitchClasses;
      $('.button-pitch-class').removeClass('active');
      $(button).addClass('active');
      // menu2.updateToMain();
    }
  }
}