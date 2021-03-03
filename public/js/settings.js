var menu = {
  openMenu : function ()
  {
    let instance = M.Sidenav.getInstance($('.sidenav'));
		instance.open();
  },
  closeMenu : function ()
  {
    let instance = M.Sidenav.getInstance($('.sidenav'));
		instance.close();
  }


}