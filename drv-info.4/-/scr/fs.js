_load._new('scr/fs.js');
{// global
    var os=''; var root=""; var ComputerName=""; var UserName="";  
    var timescan=''; 
}
var PutDriveListToFile=function(fname,drv){
  var buf='_load_new("fs-data.js");'+eol+br+eol
//  {'drvnum':drv,'drvname':d, 'freebytes':free, 'totalbytes':total  ,'usedbytes':total-free 
//  ,'volname':vol, 'volserhex':serH, 'volfs':fs, 'drvtype':drvtype }

  buf+='timescan=['+timescan+']; '+'// by drvinfo'+eol+br
      +'UserName="'+UserName+'"; '
      +'ComputerName="'+ComputerName+'"; '+eol+br
      +'root="'+root+'"; '
      +'os="'+os+'"; '+eol+br
+"// addDrv({'drvnum':drv,'drvname':d, 'freebytes':free, 'totalbytes':total "+eol+br
+"//       ,'volname':vol, 'volserhex':serH, 'volfs':fs, 'drvtype':drvtype } )"+eol+br
  for(var i=0; i<=drv-1; i++) { 
    buf+='   addDrv({drvnum:'+i
    buf+=',drvname:"'  +DriveList[i][1][0].charAt(0)+'"' // drvNo    a..z       
    buf+=',freebytes:' +DriveList[i][2][0]+''  // freeB     tfu[1]         
    buf+=',totalbytes:'+DriveList[i][3][0]+''  // maxB      tfu[0]         
    buf+=eol+br+'            '
    buf+=',volname:"'  +DriveList[i][5][0]+'"' // volNam             
    buf+=',volserhex:"'+DriveList[i][6][0]+'"' // hex8Vol(volID)     
    buf+=',volfs:"'    +DriveList[i][7][0]+'"' // '('+volFS+')'      
    buf+=',drvtype:"'  +DriveList[i][8][0]+'"' // drvTyp             
    buf+='})'+eol+br
  }
  buf+='_load_end()'+eol+br
  if(dbg>1) out(log_,buf) // open,write,close?
}// -------------------------------------------------- 
_load._end()