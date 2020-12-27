load_new('../lib/activex-init.js'); 
fso=wsh=null;
// .WScript .WshNetwork .WshController .WshShell .WshEnvironment .WshScriptExec 
// .WshArguments .WshNamed .WshUnnamed .WshSpecialfolders 
// .WshRemote .WshRemote Error .WshShortcut .WshURLShortcut
function init_cond_ieax(){// iexplorer & activex
  var ieax='?'
  var brAgent=navigator.userAgent.toLowerCase()
  if(brAgent.indexOf('msie')<0){ // ie or netscape as ie
     ieax='no "msIE" & "ActiveX"'
  }else{
     wsh = new    ActiveXObject("WScript.Shell") // .hta
     fso = new    ActiveXObject("Scripting.FileSystemObject")
     ieax='ok'
  }
  return ieax
// usage: ieax=init_cond_ieax(); if(ieax=='ok') f=fso.GetFolder(dir)
}
load_end();