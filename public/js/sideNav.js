var sideNav = {
  openSideNav : function ()
  {
    let instance = M.Sidenav.getInstance($('.sidenav'));
		instance.open();
  },
  closeSideNav : function ()
  {
    let instance = M.Sidenav.getInstance($('.sidenav'));
		instance.close();
  },
  showAbout : function()
  {
    sideNav.closeSideNav();
    $('#modal-about').modal();
    var instance = M.Modal.getInstance($("#modal-about"));
    instance.open();
  },
  showCredit : function()
  {
    sideNav.closeSideNav();
    $('#modal-credit').modal();
    var instance = M.Modal.getInstance($("#modal-credit"));
    instance.open();
  }

}