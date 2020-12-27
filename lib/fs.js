load_new('../lib/fs.js')
var fs=fs || {}; 
ax=function(){  // constructor
// (function(){})('ppp') -- run self with param.
//-- this.a - public, var a - internal
  this._activexON  =null;// true|false <- fs.ax._activexInit()
  this.ComputerName='?'; // fs.ax [3] .ComputerName "string" :RESET4
  this.UserName    ='?'; // fs.ax [4] .UserName     "string" :elefter
  this.OSenv       ='?'; // fs.ax [5] .OSenv        "string" :Windows_NT
  this.root        ='?'; // fs.ax [6] .root         "object" :D:\WINDOWS
  
  this.drv         =0   // fs.ax [2] .drv          "number" :5
// xxx_:seq # inside ,_xxx: seq # outside
  this.disk=[{ord_:'#' ,diskID:'serno'}] // units:"bytes"
  this.vol =[{_disk:'<-',ord_:'#',drv:'?:' ,volID:'name' ,volSER:'hex' ,fs:'volfs' ,free:'free' ,size:'total' ,drvtype:'drvtype' ,upDate:'date'} ]
//{drvnum:'' drvname:'?:' freebytes:'' totalbytes:'' volname:'',volserhex:'',volfs:'' ,drvtype:''} -- old, DriveList
  this.tree=[{_disk:'<-' ,_vol:'<-' ,ord_:'#' ,parent:'[]' ,name:'' ,ext:'.ext' , used:'used' ,descr:'descr' ,upDate:'date'} ]
  this.file=[{_tree:'<-' ,ord_:'#' ,name:'' ,ext:'.ext' , used:'used' ,attr:'rwhac' ,descr:'descr' ,upDate:'date'} ]
//this.vollink=[]; vollink[0]={_disk:'<-' ,_vol:'<-' ,_tree:'<-' ,_file:'<-'} 
//this.weblink=[]; weblink[0]={adr:{protocol:'http:' ,ss:'//' ,subdomain:'www.' ,domain:'domain' ,tld:'.tld' ,path:'[/]' ,params:'?' ,anchor:'#'} ,name:'name'  ,descr:'descr' ,upDate:'date'}// ip?
  this.shownotreadydrv=false;
  this.wsh         =null
  this.fso         =null
  this.WshShell    =null
  this.WshNet      =null
  this.fget        =null
  this.fput        =null 
  //-> fget.readline(str); fput.writeline(str); fget.close(); fput.close() 
  this._activexInit    = function () {//-> _activexON -- 
  // activex, @if, Enumerator works under windows and Internet Explorer 
    var msg='Invalid work condition: need "ActiveX" access. '
        // +' Try to use Trident engine with [msIE/HTA/SlimBrowzer/sleipnir].'
    try{ 
      this.wsh     = new    ActiveXObject("WScript.Shell") // .js 
      this.fso     = new    ActiveXObject("Scripting.FileSystemObject")
      this.WshShell= new    ActiveXObject("WScript.Shell")
      this.WshNet  = new    ActiveXObject("WScript.Network")
  // .WScript .WshNet .WshController .WshShell .WshEnvironment .WshScriptExec
  // .WshArguments .WshNamed .WshUnnamed .WshSpecialfolders
  // .WshRemote .WshRemote Error .WshShortcut .WshURLShortcut
      this.root        =fs.ax.fso.GetSpecialFolder(0) // \ -> / !!!
      this.ComputerName=fs.ax.WshNet.ComputerName
      this.UserName    =fs.ax.WshNet.UserName
      this.OSenv       =fs.ax.WshShell.Environment("System")("OS")// System, User, Volatile, or Process
      this._activexON=true
      if(dbg>0) out(log_,br+'"ActiveX" access:  OK. '+br)
    }catch(Exception){
      this._activexON=false
      if(dbg>0) out(log_,br+'"ActiveX" access: NOT! '+msg+br);
    }
  }
  this.openfile_to_get = function(fdir,fname){// -> fget
     var iomode,fmt,io='r';
     if(io=='r'){iomode=1; createNewIfUnexist=false;}// iomode=1:read
     if(io=='w'){iomode=2; createNewIfUnexist=true ;}// iomode=2:write
     if(io=='a'){iomode=8; createNewIfUnexist=false;}// iomode=8:append
     fmt=0 // 0:ASCII, -1:Unicode, -2:use the system default. // Unicode=false ?
     fget=this.fso.OpenTextFile  (fdir+fname,iomode ,createNewIfUnexist,fmt);
     return fget
  }
  this.openfile_to_put = function(fdir,fname){ // -> fput
     var iomode,fmt,io='w';
     if(io=='r'){iomode=1; createNewIfUnexist=false;}// iomode=1:read
     if(io=='w'){iomode=2; createNewIfUnexist=true ;}// iomode=2:write
     if(io=='a'){iomode=8; createNewIfUnexist=false;}// iomode=8:append
     fmt=false // 0:ASCII, -1:Unicode, -2:use the system default. // Unicode=false ?
     fput=this.fso.OpenTextFile  (fdir+fname,iomode ,createNewIfUnexist,fmt);
     // w:path not exist
     // w:Bad file name or number?
     return fput
  }
  this.GetDriveStatus  = function(drv_){ 
    if (this.fso.DriveExists(drv_)) return "exist"; else return "not exist";
  } 
  this.DrivesReady     = function(){
    var drv=0
    var e = new Enumerator(this.fso.Drives);
    for (; !e.atEnd(); e.moveNext()){// existed drives
      x = e.item();
      if (!this.shownotreadydrv && !x.IsReady) continue // skip if not ready
      drv++;
    }
    this.drv=drv
    return drv
  } 
/* */
  function hex8Vol(ni){// internal
    n=ni; maxn=4294967295;// ffff-ffff = 4294967295
    var nh,nhex,l,m,i,h=['0','0','0','0'   ,'0','0','0','0'];
    if      (n<0)    {n=maxn+n+1;} 
  //else if (n>maxn) {}// cut only last 8 hex digits       !?
    nh=n.toString(16).toUpperCase();
    l=nh.length; m=8-l;
    for (i=m+1; i<=8; i++) h[i-1]=nh.charAt(i-m-1); // align to right 8 pos
    nh=''; for (i=1; i<=8; i++) {nh+=h[i-1]; if(i==4) nh+='-';}
    return nh;
  }// ---
//function addDrive(r){ vol[r.drvnum]=r; }// internal
  this.GetDriveList    = function(){//=>drv, vol[0..drv]
    if(dbg>1){ // obj_list(fs.ax,'fs.ax')
      out(log_,'fs.ax.GetDriveList(): activex=', this._activexON,br);
    }
    if(!this._activexON || this._activexON==null)  return -1;
    // var drv=DrivesReady(); if(drv<0) return -2;
    
    var fs,drvtype,x,d,vol,ser,serH,free,total;
    var e = new Enumerator(this.fso.Drives);
    var drv=0
    for (; !e.atEnd(); e.moveNext()){// existed drives
      x = e.item(); 
      d=x.DriveLetter // +':' 
      if (!this.shownotreadydrv && !x.IsReady) continue // skip if not ready
      drv++;
      if (x.IsReady){
        fs=this.fso.GetDrive(d+':').FileSystem
        drv_=this.fso.GetDrive(this.fso.GetDriveName(d+':'))
        // str_to_int: a=a.toNumber(); a=a.valueOf(); a=parseInt(a,10); a=Number(a);
        total=Number(drv_.TotalSize);
        free =Number(drv_.FreeSpace);
        vol=x.VolumeName;
  //    if (x.VolumeName.length>vollng) vollng=x.VolumeName.length
        ser=x.SerialNumber
        serH=hex8Vol(ser)
      //share=x.ShareName
      } else{
        free=0;total=0;  vol=ser=drvtype=fs=''
        vol=this.GetDriveStatus(d)+';not ready'
      }
      switch (x.DriveType){
      //case 0:  drvtype = "Unknown";   break;//?
        case 1:  drvtype = "removable"; break;
        case 2:  drvtype = "fixed";     break;
        case 3:  drvtype = "network";   break;// mapped
        case 4:  drvtype = "cd/dvd/?";  break;// cd/dvd/ ?bd/zip/tape/MO/emulated 
        case 5:  drvtype = "RAM disk";  break;
        default: drvtype = x.DriveType        //?
      }; //  if (d.IsReady)
      this.vol[drv]={'_disk':null,'ord_':drv,'drv':d ,'volID':vol ,'volSER':serH 
      ,'fs':fs ,'free':free ,'size':total ,'drvtype':drvtype ,'upDate':null} 
    }
    this.drv=drv
    return this.vol;
  }// -------------------------------------------------- 
// var WshShell = new ActiveXObject("WScript.Shell"); 
// winstyle=1;// 0,[1],2,3,4,5,6,7,8,9,10
// waitonret=false; // [false] true
// r = WshShell.Run("C:/WIN98/CALC.EXE",winstyle,waitonret);
// ? windir
// 'lib/fs-io-ax');
// Find full path of target within shortcut, how this works: 
// http://www.devguru.com/Technologies/wsh/quickref/wshshell_CreateShortcut.html
//-----------------------------
var fullname  ,shortcut ,hdr ,extension ,i ,fattr ,fdate ,ftime ,fsize 
var tdirs ,tdirsz ,tlnk ,tlnksz ,turl ,turlsz, tetc,tetcsz, dt=['',''] // date,time
var sTargetPath, sWorkingDir, sDescription, sWindowStyle, sHotkey, sIconPath, sArg
hdr = "DF;attr;date;time;size;Path;File.Ext;Ext;TargetPath;WinOpnSt;HotKey;icoPath;Arg;WorkDir;Descr;" 
// savefil: a = all files, Lnk only, Url only , [l = only links (.lnk, .url)] 
// savedir: d = only dirs, b = both dirs&files, [f = only files]
this.fs_get=function(logdir,logfile,scandir ,savefil,savedir){
  folder_   = fso.GetFolder(scandir) // desktop, startmenu, ...
  if (confirm('run fs_get() ?')) {         
      // --- open file variant 1
      objfile=fso.CreateTextFile(logdir+'/'+logfile) 
/*  // --- open file variant 2
      iomode=2 // iomode=1:read, 2:write 8:append
      createNewIfUnexist=true; Unicode=true // if omitted, the file is opened as ASCII. 
      objfile=fso.OpenTextFile(logdir+'/'+logfile,iomode,createNewIfUnexist,Unicode);  
*/     
      objfile.writeline(hdr)
      var t1=getdate_(1,true)  
        ShowFolderRoot(folder_,savedir,savefil)
      var t2=getdate_(2,true)
      var t3=daysDiff() 
      var st1=[tlnk,turl,tetc,(tlnk+turl+tetc),tdirs] 
      var st2=[mb2(tlnksz+turlsz+tetcsz)] // mb2(tdirsz) // rejected as false
                    out(log_,'stat:['+st1+'],'+st2+',['+t3+'] l&uSZ='+(tlnksz+turlsz)+eol
                       +clr('magenta','time:')+t1+' - '+t2+eol)
      objfile.writeline('stat:['+st1+'],'+st2+',['+t3+'] l&uSZ='+kb2(tlnksz+turlsz)+'kb ')
      objfile.close()
  }      
}// ============================= 
var f ,ff ,s
this.ShowFolderRoot=function(folder_,savedir,savefil){ // "<<< -------------- tree (level 0)"
    tdirs = tdirsz = tlnk = tlnksz = turl = turlsz = tetc = tetcsz = 0 
    ff = fso.GetFolder(folder_)
        fname = ff.name // fso.GetBaseName(ff);
        ext   = fso.GetExtensionName(ff);
        fdate = ff.DateLastModified // objFile.DateLastAccessed objFile.DateCreated
        dt    = FdatT(fdate)
        fattr = FileAttr(ff)      
//      fsize = ff.Size                            // rejected as false
        fsize = 0
//      tdirsz= tdirsz + fsize                     // rejected as false
        tdirs++ 
// savedir:'fda' savefil:'lubea'
   if((savedir=='d')||(savedir=='a')) 
      objfile.writeline("d;" + fattr + ";" + dt[0] + ";" + dt[1] + ";" + fsize + ";" 
                       + folder_ + ";"  + ";" + ext + ";") 
    if(savedir=='f' || savedir=='a')
      ShowFiles(folder_,savefil) 
    ShowFolderList(folder_,savedir,savefil) 
}//-----------------------------
this.ShowFolderList=function(folder_,savedir,savefil){ // maxdlvl++; // maxdlvl-- ?
    var f = fso.GetFolder(folder_)                    // "<<< -------------- tree (level 1,...)"
    var foldList = new Enumerator(f.SubFolders);  i=0;
    for (; !foldList.atEnd(); foldList.moveNext()) {i++; tdirs++  
    var fn    = foldList.item(); 
    var ff    = fso.GetFolder(fn); 
        fname = fn.name // fso.GetBaseName(ff);
        ext   = fso.GetExtensionName(ff);
        fdate = ff.DateLastModified // objFile.DateLastAccessed objFile.DateCreated
        dt    = FdatT(fdate)
        fattr = FileAttr(ff)      
//      fsize = ff.Size                            // rejected as false
        fsize = 0
//      tdirsz= tdirsz + fsize                     // rejected as false
        s     = folder_ + "/" + fname
// savedir:'fda' savefil:'luba'
        if((savedir=='d')||(savedir=='a')) // err: bad chars cannot writed
          objfile.writeline("d;" + fattr + ";" + dt[0] + ";" + dt[1] + ";" + fsize + ";" 
                           + s + ";" + ";" + ext + ";") 
        if(savedir=='f' || savedir=='a')
          ShowFiles(s,savefil) 
        ShowFolderList(s,savedir,savefil)    // !recursive call
    }
}//-----------------------------
this.ShowFiles=function(folder_,savefil){
    f = fso.GetFolder(folder_)
    fileList = new Enumerator(f.Files); i=0;
    for (; !fileList.atEnd(); fileList.moveNext()) {i++; // (i in f.Files) 
    var fn    = fileList.item(); 
    var ff    = fso.GetFile(fn); 
        fname = fn.name // fso.GetBaseName(ff);
        ext   = fso.GetExtensionName(ff);
     // fullname = fso.GetAbsolutePathName(ff) //Find full path of shortcut
        fdate = ff.DateLastModified // objFile.DateLastAccessed objFile.DateCreated
        dt    = FdatT(fdate)
        fattr = FileAttr(ff)      
        fsize = ff.Size
// savedir:'fda' savefil:'luba' // no-l-u
        
      if(ext.toLowerCase() == "lnk"){ tlnk++ ;
        tlnksz= tlnksz + fsize 
        shortcut  = wsh.CreateShortcut(ff) // fullname | ff
        sTargetPath   = shortcut.TargetPath
        sWorkingDir   = shortcut.WorkingDirectory 
        sDescription  = shortcut.Description 
        sWindowStyle  = shortcut.WindowStyle // 1=normal,7=min,3=max
        sHotkey       = shortcut.Hotkey
        sIconPath     = shortcut.IconLocation // ,IconIndex 
        // undeftonull(x)=null if x is undefined, but  err: obj expected
        sArg          = shortcut.Arguments //
        //shortcut.Save ' !save this link   
        if(savefil=='l' || savefil=='b' || savefil=='a') 
          objfile.writeline
            ("l;" + fattr + ";" + dt[0] + ";" + dt[1] + ";" + fsize + ";" 
            + folder_ + ";" + fname  + ";" + ext + ";"
            + sTargetPath + ";" 
            + sWindowStyle + ";"+ sHotkey + ";" + sIconPath + ";" 
            + sArg + ";"  + sWorkingDir + ";" + sDescription + ";")
      }else if(ext.toLowerCase() == "url"){ turl++ ;
        turlsz= turlsz + fsize
        shortcut  = wsh.CreateShortcut(ff) // open file - fullname | ff
                                            // [InternetShortcut]
        sTargetPath   = shortcut.TargetPath // URL=http://www.weather.com/ 
                                            // URL=file:///c:/temp/xuprav.exe
        sWorkingDir   = "" // shortcut.WorkingDirectory 
        sDescription  = "" // shortcut.Description 
        sWindowStyle  = "" // shortcut.WindowStyle ' 1=normal,7=min,3=max
        sArg          = "" // shortcut.Arguments 
        sHotkey       = "" //  HotKey=0
        sIconPath     = "" //  IconFile=C:\Temp\XUprav.exe
                           //  IconFile=E:\Tedy\~my-dev\Bible-BG\pictograms\Bible-bg.ico
                           //  IconIndex=0  
                           // --- BASEURL=http://www.weather.com/
                           // --- Modified=00BA14AD567AC50111
                           // --- IDList=
      //shortcut.Save ' !save this url 
        if(savefil=='u' || savefil=='b' || savefil=='a') // err: bad chars cannot writed
          objfile.writeline
            ("u;" + fattr + ";" + dt[0] + ";" + dt[1] + ";" + fsize + ";"  
            + folder_ + ";" + fname + ";" + ext + ";"
            + sTargetPath + ";" 
            + sWindowStyle + ";"+ sHotkey + ";" + sIconPath + ";"         // !!
            + sArg + ";"  + sWorkingDir + ";" + sDescription + ";") // !!
      }else { tetc++ ; tetcsz= tetcsz + fsize 
        if(savefil=='a') 
          objfile.writeline("f;" + fattr + ";" + dt[0] + ";" + dt[1] + ";" + fsize + ";" 
                           + folder_ + ";"  + fname + ";" + ext + ";") 
      }
    }
}//-----------------------------
this.FdatT=function(fd){   
var dt=['','']; 
// Fri Jun 9 02:12:25 UTC+0300 2006
// Tue Jun  8 22:48:22 UTC+0300 2004    - must be
// 0123456789-123456789-123456789-12
// ^   ^   !! ^  ^  ^           ^
  var s='', moeng=new Array ('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec')
  var dat=new Date(fd); 
  var d2=dat.toString()+' ' // "Tue Jun 8 22:48:22 UTC+0300 2004"
  d=d2;
  if (d.charAt(9)==' ') {d=d2.substring(0,7+1)+'0'+d2.substring(8,31+1)} // insert "0" at pos 8
// substring(from,to+1)  //pos+lng=to+1   c="0123456789"; c.substring(2,2+1) -> 2
  p=29; l=4; yr=d.substring(p,p+l)
  p= 4; l=3; mo=d.substring(p,p+l)
  p= 8; l=2; da=d.substring(p,p+l)
  p=11; l=2; th=d.substring(p,p+l)
  p=14; l=2; tm=d.substring(p,p+l)
  p=17; l=2; ts=d.substring(p,p+l)
  for (var i=1; i<=12; i++) { if(mo==moeng[i-1]) {mo=i; if(i<10) mo='0'+mo; i=13} }
//s=da+t'+mo+t+yr+t+tm
  dt[0]=yr+'-'+mo+'-'+da
  dt[1]=th+":"+tm  // +":"+ts
  if (fd=='?') {dr[0]="    -  -  "; dt[1]="  :  "}  // +":  "
  return (dt);
}// -------------------------------------------------
this.FileAttr=function(f){//"12345678"
	var S=''; c='-';s0="--------"
	if (f.attributes==0 || f==null)          {S= s0}
    else {// rhsa attributes are read/write.            // 012345678 bits              
	    if (f.attributes &   1) {S+= "r"} else {S+=c}   // FA_ReadOnly =   1
	    if (f.attributes &   2) {S+= "h"} else {S+=c}   // FA_Hidden   =   2
	    if (f.attributes &   4) {S+= "s"} else {S+=c}   // FA_System   =   4
	    if (f.attributes &  32) {S+= "a"} else {S+=c}   // FA_Archive  =  32
	          // ldvc attributes are read only 
	    if (f.attributes &   8) {S+= "V"} else {S+=c}   // FA_Volume   =   8
	    if (f.attributes &  16) {S+= "D"} else {S+=c}   // FA_Dir      =  16
	    if (f.attributes &  64) {S+= "L"} else {S+=c}   // FA_Alias    =  64 (schortcut,.lnk)
	    if (f.attributes & 128) {S+= "C"} else {S+=c}   // FA_Compr    = 128
// ?    if (f.Attributes & 2048) fattr = fattr + "C" // "Compressed file."
    }
	return(S);
/* object.Attributes [= newattributes]
   ex: f = fso.GetFile(filespec) 
       f.attributes = f.attributes - 32; s = "Archive bit is cleared.";
       f.attributes = f.attributes + 32; s = "Archive bit is set.";
*/
}// -----------------------------------

this.openfile=function(fm,fdir,fname,io/*r,w,a*/){ // ->fm:  fm.readline(str);|fm.writeline(str); fm.close()
//var fso   = new    ActiveXObject("Scripting.FileSystemObject") 
/**-/// --- open file variant 1
   objfile=fso.CreateTextFile(fdir+'/'+fname) 
   objfile.writeline(hdr)
   objfile.close()
/**/// --- open file variant 2
   if(io=='r'){iomode=1; createNewIfUnexist=false}// iomode=1:read  
   if(io=='w'){iomode=2; createNewIfUnexist=true }// iomode=2:write 
   if(io=='a'){iomode=8; createNewIfUnexist=false}// iomode=8:append
   fmt=0 // 0:ASCII, -1:Unicode, -2:use the system default.
   
// fsod:FileSystemObject or Folder object; fso :FileSystemObject                  
// fso = new ActiveXObject("Scripting.FileSystemObject") -- js
// fso = CreateObject("Scripting.FileSystemObject")     -- vbs
// iomode=1:read, 2:write ,8:append
// overwrite=true|false &if omitted
// unicode  =true|false &if omitted
// fm= fso.OpenTextFile    (filename[,iomode[,createNewIfUnexist[,format] ] ])
// fm=fsod.CreateTextFile  (filename ,iomode ,overwrite,unicode);
 
// fmt=0 // 0:ASCII, -1:Unicode, -2:use the system default.
// fm=f.OpenAsTextStream   ([iomode, [format]])
 //fso = new ActiveXObject("Scripting.FileSystemObject") 
 //fso.CreateTextFile("test1.txt" );           // Create a file.
 //f = fso.GetFile("test1.txt");
 //fm = f.OpenAsTextStream(iomode, TristateUseDefault);
 //tm = f.OpenAsTextStream(iomode, TristateUseDefault);
//?file:File object.                                                                                          
 
   fm=fso.OpenTextFile  (fdir+'/'+fname,iomode ,createNewIfUnexist,fmt);  
/* */ 
    
return fm  
}//------------------------
// ar[ 0.. 7]  "DF","attr","date","time","size","Path","File.Ext","Ext" 
// ar[ 8,11..16] ,"targPath"       ,"WinOpnSt","HotKey","icoPath","Arg","WorkDir","Descr"]
// ar[ 9..10] ,"tE","tT" -----^    targExist,targType

this.fs_csv2js=function (logd,logf,scand){ getcsv=null; putjs=null;
if (confirm('run fs_csv2js() ?')){        
   getcsv=openfile(getcsv,logd,logf      ,'r'/*r,w,a*/) // ->fm:  fm.readline(str); 
   putjs =openfile( putjs,logd,logf+'.js','w'/*r,w,a*/) // ->fm:  fm.writeline(str);
// ar=[]; i=0; ar[i]='"ab"cd"'
//   +'     length='+ar[i].length       // 7
//   +' indexOf(")='+ar[i].indexOf('"') // 0
//   +'  charAt(3)='+ar[i].charAt(3)    // "
   ln=-1; pn=-1; 
   lastarg=16; 
// stat15=0
   while (!getcsv.AtEndOfStream){ ln++ // from 0 = hdr
//   if(ln>8) break
     buf= getcsv.readline(); 
     s='';
     for (var j=0; j<=buf.length-1; j++) {
       if(buf.charAt(j)=='\\') s+='/'; else s+=buf.charAt(j)
     };buf=s
     ar=buf.split(';',lastarg)
     if(ar[0]=='f') continue
     pn++
//   ---
     for (var i=0;      i<=lastarg;  i++) 
       if(typeof(ar[i])=='undefined')    {ar[i]='';} // add empty inside
//   ---
//   for (var i=0; i<=lastarg; i++) {
//     if (i in [5,6,8,11,12,13]) { //   \ -> /
//       k2=ar[i].indexOf('\\');
//       if(k2>=0){ s='';
//         for (var j=0; j<=ar[i].length-1; j++) {
//           if(ar[i].charAt(j)=='\\') s+='/'; 
//           else                      s+=ar[i].charAt(j)
//         }
//       } 
//     }; ar[i]=s
//   }
//   --- Target is dir?, is exist?, insert 2 col's
     targExist='-';  Targtype='?' // for all
     if(ar[0]=='l'){
       if     (fso.FolderExists(ar[8])){targExist='+';  Targtype='d'}
       else if(  fso.FileExists(ar[8])){targExist='+';  Targtype='f'}
     }
     // insert in ar[9],[10]
     ar[lastarg-1]='.'; ar[lastarg]='.';          // add   2 at end
     for (var i=lastarg; i>=9; i--) ar[i]=ar[i-2] // shift 2 rigth from 9 to lastarg
     if(ln==0) {ar[9]='tE'; ar[10]='tT';} else {ar[9]=targExist; ar[10]=Targtype}
//   ---
     buf='mnu['+pn+']=[';  
//   ---------------------------
     for (var i=0; i<=lastarg; i++) {
//     if(i==15 && ar[i]!='') stat15++
       s=ar[i]
       //path .ico exist->col
       
       //--
       if (ln==0){s='"'+s+'"'}
       else if (i!=4 && i!=11) { // numcols "size","WinOpnSt" without ""
         var k1=ar[i].indexOf('"');  
         if(k1>=0){ s=''; // make valid js string 
           for (var j=0; j<=ar[i].length-1; j++) { // zero bazed adr: charAt(),indexOf()
             if     (ar[i].charAt(j)=='"')  s+='\\"'; 
             else s+=ar[i].charAt(j)
           }
         }
         s='"'+s+'"'
       }else{s=0}
       buf+=s
       if(i<lastarg) buf+=','
     }; buf+=']'
   
//   ---
     putjs.writeline(buf)
   }  
   putjs.close()
   getcsv.close()
// out(log_,'15th col stat:'+stat15)
   out(log_,'get rec:'+ln+' put rec:'+pn+eol)
}
}//-----------------------------
  this.dExist=function(dir){
  // fso = new ActiveXObject("Scripting.FileSystemObject");
     ex=fso.FolderExists(dir) 
     return ex
  }// --- 
  this.fdExist=function(dir,fil){
  // fso = new ActiveXObject("Scripting.FileSystemObject");
     if (fil!='') {ex=fso.FileExists  (dir+fil)}
     else         {ex=fso.FolderExists(dir)    }
     return ex
  }// --- 
  this.fExist=function(df){
  // fso = new ActiveXObject("Scripting.FileSystemObject");
     ex=fso.FileExists  (df)
     return ex
  }// --- 
  this.DriveExist=function(drv){ res='?'//false
    // res=xxx?(drv)
    return res
  }//------------------------
  this.NetworkMapDrive=function(){ // err!?-- WMI method to find the network drive mapping
  var oDrives ,DrivesStr
  //var WSHNetwork= new    ActiveXObject("WScript.Network") // hta
  //var WshNetwork= WScript.CreateObject("WScript.Network") // js
      oDrives    = WshNet.EnumNetworkDrives 
      DrivesStr = "Network drive Mappings:" + Chr(13) 
      for (var i = 0; oDrives.Count - 1; i=i+2){  // Step 2===i=i+2
          DrivesStr = DrivesStr + "Drive " + oDrives.Item(i) + " = " + oDrives.Item(i + 1) + Chr(13) 
      } 
      objfile.writeline(DrivesStr) 
  }//--

  this.test=function(){ // fs.ax._activexON;fs.ax.DrivesReady(); fs.ax.GetDriveList()
    var buf=''
    out(log_,obj_list(fs.ax,'fs.ax')+br)
    if(fs.ax._activexON){ 
      var drv=fs.ax.DrivesReady(); 
      var vol=fs.ax.GetDriveList()//vol[[0]..[drv]]
      out(log_,'_activexON:'+fs.ax._activexON
              ,' DrivesReady() '+drv+' - '+fs.ax.drv+','+vol.length,br)
      for(var i=0; i<vol.length; i++){
        with(vol[i]) 
          buf+='>vol['+i+'] ={_disk:'+_disk+', ord_:'+ord_+', drv:'+drv
          +':, volID:'+volID+', volSER:'+volSER+', fs:'+fs+', drvtype:'+drvtype
          +', free:'+free+', size:'+size+', upDate:'+upDate+'}'+br
      }
      out(log_,buf)
    }else out(log_,'!_activexON:'+fs.ax._activexON,br)
// _activexON:true DrivesReady() 5 - 5,6
// >vol[0] ={_disk:<-  , ord_:#,drv:?:, volID:name,     volSER:hex, fs:volfs, drvtype:drvtype, free:free, size:total, upDate:date}
// >vol[1] ={_disk:null, ord_:1, drv:D, volID:HDS82-p1.rst4, volSER:B4CD-076F, fs:NTFS, drvtype:fixed, free:14287294464, size:41940668416, upDate:null}
// >vol[2] ={_disk:null, ord_:2, drv:E, volID:HDS82-p2, volSER:B4D3-F445, fs:NTFS, drvtype:fixed, free:2010181632, size:30038265856, upDate:null}
// >vol[3] ={_disk:null, ord_:3, drv:F, volID:HDS82-P3, volSER:9870-2A5D, fs:FAT32, drvtype:fixed, free:1412759552, size:10345472000, upDate:null}
// >vol[4] ={_disk:null, ord_:4, drv:G, volID:ST20-p1,  volSER:D450-6214, fs:NTFS, drvtype:fixed, free:620257280, size:5239468032, upDate:null}
// >vol[5] ={_disk:null, ord_:5, drv:H, volID:ST20-p2,  volSER:8094-B598, fs:NTFS, drvtype:fixed, free:5254832128, size:14780792832, upDate:null}
/* */
  }
}
  fs.ax=new ax() // 'new' construct instance with 'ax' constructor
  fs.ax._activexInit()
load_end();