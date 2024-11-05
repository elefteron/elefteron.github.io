load+='ActiveX-IE '
// .WScript .WshNetwork .WshController .WshShell .WshEnvironment .WshScriptExec
// .WshArguments .WshNamed .WshUnnamed .WshSpecialfolders
// .WshRemote .WshRemote Error .WshShortcut .WshURLShortcut
    os='';     root=""; ComputerName=""; UserName="";     
    if(browserID()=='IE'){ /* activex, @if, Enumerator works under windows and Internet Explorer*/
      var fso       = new ActiveXObject("Scripting.FileSystemObject");
      var WshShell  = new ActiveXObject("WScript.Shell")
      var WSHShell  = new ActiveXObject("WScript.Shell");
      var WSHNetwork= new ActiveXObject("WScript.Network")
      root        =fso.GetSpecialFolder(0)
      ComputerName=WSHNetwork.ComputerName
      UserName    =WSHNetwork.UserName
      os=WshShell.Environment("System")("OS")// System, User, Volatile, or Process
  //  os=sys()
    }
// ----------------------------------
function sys(){ var os=''
  if(browserID()=='IE'){/* activex & @if works under windows and Internet Explorer*/
    @if(@_win32)   os+="win32 "   @end
    @if(@_win16)   os+="win16 "   @end
    @if(@_mac)     os+="mac   "   @end
    @if(@_alpha)   os+="alpha "   @end
    @if(@_x86)     os+="x86   "   @end
    @if(@_mc680x0) os+="mc680x0 " @end
    @if(@_PowerPC) os+="PowerPC " @end
  }
  return os
}// ----------------------------------   
function ShowDriveStatus(drv_){ var s = "";
  if (fso.DriveExists(drv_)) s="exist"; else s="not exist";
  return s
}// --------------------------------------
function ShowDriveInfo(drvPath){ // ,fs
  drv=fso.GetDrive(fso.GetDriveName(drvPath))   
  
  
  tfu[0]=drv.TotalSize;
  tfu[1]=drv.FreeSpace
  tfu[2]=tfu[0]-tfu[1]
//if (fs=='CDFS') { u=total; total=680*1024*1024; free=total-u; }
// dvd?
  return tfu
}// --------------------------------------
shownotreadydrv=f_
function DrivesReady(){var drv=0
  if(browserID()=='IE'){/* activex, @if, Enumerator works under windows and Internet Explorer*/
    e = new Enumerator(fso.Drives);
    for (; !e.atEnd(); e.moveNext()){// existed drives
      x = e.item();
      if (!shownotreadydrv && !x.IsReady) continue // skip if not ready
      drv++;
    }
  } else {}
  return drv
}// ------------------------
function ShowDriveList(){
  var e  ,s,t, fs,fs_,drvtype,n,x,vol,ser
  sp='&nbsp;'; sp2=sp+sp; sp4=sp2+sp2
  vollng=0 // global
  tfu=[0,0,0] // total,free,used
  tfu_sum=[0,0,0]
  if(browserID()!='IE')return/* activex, @if, Enumerator works under windows and Internet Explorer*/
  e = new Enumerator(fso.Drives);
  s = ""; drv=0
  for (; !e.atEnd(); e.moveNext()){// existed drives
    x = e.item(); 
    d=x.DriveLetter // +':'
    if (!shownotreadydrv && !x.IsReady) continue // skip if not ready
    drv++;
    if (x.IsReady){
      fs=fso.GetDrive(d+':').FileSystem
      tfu=ShowDriveInfo(d+':')// ,fs
      fs_=fs
      vol=x.VolumeName;
      if (x.VolumeName.length>vollng)vollng=x.VolumeName.length
      ser=x.SerialNumber
    //share=x.ShareName
    } else{
      tfu=[0,0,0]; vol=ser=drvtype=fs_=''
      vol=ShowDriveStatus(d)+';not ready'
    }
    switch (x.DriveType){
    //case 0:  drvtype = "Unknown";   break;//?
      case 1:  drvtype = "Removable"; break;
      case 2:  drvtype = "Fixed";     break;
      case 3:  drvtype = "Network";   break;// mapped
      case 4:  drvtype = "CD/DVD/BD"; // emulated/r/rw/...?
      break;
      case 5:  drvtype = "RAM Disk";  break;
      default: drvtype = x.DriveType        //?
    }
    addDrv(drv, tfu[1], tfu[0], tfu[2], vol, ser, fs_, drvtype) 
  }
}// --------------------------------------------------
