load_new('scr/makeTbl.js')
// makeTbl->(val,bg,fg,aln)->OrdRowFmt('bdy',order_body)->
// ->j=order_body[i]->col_(t ,bg[j],fg[j],aln[j])->tbl[tblrows]
// global: var val=[],bg=[],fg=[],aln=[]; //, sz=[]
//  val[col]=DriveList[drv][col][0];
//   bg[col]=DriveList[drv][col][1];
//   fg[col]=DriveList[drv][col][2];
//  aln[col]=DriveList[drv][col][3];
function OrdRowFmt(hbf,order){ 
// hdr=[0],data[...],ftr[Drives]
// order: order_body or order_hdr
// drv_no ,free   ,max    ,used   ,vol_n  ,vol_id ,f_sys  ,drv_type
   var s='',t=''
//'<LABEL FOR="get" ACCESSKEY="'+x.DriveLetter+'"></LABEL>' ?
   bg[0]=bg[1]; fg[0]=fg[1]; aln[0]=aln[1]; // sz[0]=sz[1];
   var ishdr=(hbf=='hdr'), isftr=(hbf=='ftr'), isbdy=(hbf=='bdy');
   var onmouseover=' onmouseover="'
                  +'this.style.border=\'2px inset gold \';'// border-width *-style *-color
                  +'this.style.padding=\'1px\';return true"' 
   var onmouseout =' onmouseout="'
                  +'this.style.border=\'0px\';'
                  +'this.style.padding=\'1px\';return true"' 
   for (var i=0; i<=order.length-1; i++) { 
     var j=order[i]; var k=order_hdr[i];
     var toShow='',toTip ='';
     if(isbdy){       
       if (j==2 || j==3 || j==4){ // val[j]=[MB,GB]
               toShow=val[j][1]; toTip =val[j][1]+' GiB\n'
                                 toTip+=val[j][0]+' MiB';
       }else { toShow=val[j];    toTip =val[j];           }
       if(i==0) 
            t='<a href="file:///'+val[1]+'\\"'
             // file:///*.*, file://localserver/*.*, path?
             +' title="open '+val[1]+'\\"'  
             +' target="self_"'+ '>'+val[1]+'</a>'; 
       else t='<a title="'+hdrName[k]+'\n'+toTip+'" '+onmouseover+onmouseout+'>'+toShow+'</a>'
     } else if(ishdr){
       toShow=val[j];
       t='<a title="'+hdrName[k]+'" '+onmouseover+onmouseout+'>'+toShow+'</a>'
     } else if(isftr){
       if(j==2 || j==3 || j==4){ 
               toShow=val[j][1]; toTip =val[j][1]+' GiB\n'
                                 toTip+=val[j][0]+' MiB';
       } else {toShow=val[j]; toTip =val[j];}
       t='<a class="text" title="'+hdrName[k]+'\n'+toTip+'" '+onmouseover+onmouseout+'>'+toShow+'</a>'
     }
     s+=col_(t ,bg[j],fg[j],aln[j])// sz
   } 
   if(dbg>2) out(log_,'OrdRowFmt('+hbf+'):'+'<xmp>'+s+'</xmp>')
   return s
}// --------------------------------------------------
function makeTbl(DriveList,Drives){    
  var tbl=[];  // var c1=btn//"no" | btn
  //   -- add header
  if (voll_<17) voll_=17 // max:32
  var zp=''; for (var i=(voll_-11);i<voll_; i=i+2) zp+=nsp // 2chars unbreaked space
  for (var i=1; i<=8; i++){ 
    val[i]=hdrName[i]; 
     bg[i]=bgh; 
     fg[i]=fgh;
  } 
  if(dbg>1) out(log_,'makeTbl() hdr: val:'+val +br+' bg:'+bg+br+' fg:'+fg+br+' aln:'+aln+br)
  
	var tblrows=0; tbl[tblrows]=OrdRowFmt('hdr',order_hdr) // \+z[2]+"Mb"
  //  -- add DriveList: DriveList=[]; Drives=-1;
  for (var i=0;i<=Drives; i++){ 
    // alert('DriveList['+i+']:'+DriveList[i])
    for (var j=1;j<=8; j++){
      val[j]=DriveList[i][j][0];
       bg[j]=DriveList[i][j][1];
       fg[j]=DriveList[i][j][2];
      aln[j]=DriveList[i][j][3];
      // b_grp3(a,f) where (f in [b2kb,b2mb,b2gb])
      // b.substring(0,b.length-3) // cut last 3 chars
      if (j==2 || j==3 || j==4){ 
        val[j]=[b_grp3(val[j],b2mb),b_grp3(val[j],b2gb)]
    // else if(j==6){ val[j]=hex8Vol(volID)
      }else if(j==7){ val[j]='('+val[j]+')'
      }
    }
    if(dbg>1) out(log_,'makeTbl() ['+i+']: val:'+val +br+' bg:'+bg+br+' fg:'+fg+br+' aln:'+aln+br)
	  tblrows++; tbl[tblrows]=OrdRowFmt('bdy',order_body)
  }
  //  -- add foother
  var freeb =tfu_sum[0]//.toString()
  var  maxb =tfu_sum[1]//.toString()
  var usedb =tfu_sum[2]//.toString()
  var freeb_=[b_grp3(freeb,b2mb),b_grp3(freeb,b2gb)]
  var  maxb_=[b_grp3(maxb ,b2mb),b_grp3(maxb ,b2gb)]
  var usedb_=[b_grp3(usedb,b2mb),b_grp3(usedb,b2gb)]

  val[1]=Drives+1; bg[1]=bgh;  fg[1]=fgh;  aln[1]='right'; // 1 drvn   : E:
  val[2]=freeb_;   bg[2]=bgh;  fg[2]=fgh;  aln[2]='right'; // 2 free   : 87.77
  val[3]=maxb_ ;   bg[3]=bgh;  fg[3]=fgh;  aln[3]='right'; // 3 max    : 4 102.50
  val[4]=usedb_;   bg[4]=bgh;  fg[4]=fgh;  aln[4]='right'; // 4 used   : 4 014.73
  val[5]=' ';      bg[5]=bgh;  fg[5]=fgh;  aln[5]='';      // 5 voln   : [
  val[6]=' ';      bg[6]=bgh;  fg[6]=fgh;  aln[6]='';      // 6 volid  : 1029-CB0D
  val[7]=' ';      bg[7]=bgh;  fg[7]=fgh;  aln[7]='';      // 7 fsys   : (NTFS)
  val[8]=' ';      bg[8]=bgh;  fg[8]=fgh;  aln[8]='';      // 8 drvt   : Fixed
  if(dbg>1) out(log_,'makeTbl() ftr: val:'+val +br+' bg:'+bg+br+' fg:'+fg+br+' aln:'+aln+br)
  tblrows++; tbl[tblrows]=OrdRowFmt('ftr',order_hdr)
  //   -- count chars in order_body
  chars=0;
  for (var i=0; i<=order_body.length-1; i++) {j=order_body[i]
    if (j==0 | j==1) chars+=2            // 1 drv_no "E:"
    else if (j==2)   chars+=freeb.length // 2 free
    else if (j==3)   chars+= maxb.length // 3 max
    else if (j==4)   chars+=usedb.length // 4 used
    else if (j==5)   chars+=voll_        // 5 vol_n
    else if (j==6)   chars+=9            // 6 vol_id
    else if (j==7)   chars+=7            // 7 f_sys
    else if (j==8)   chars+=10           // 8 drv_type
  }
  return tbl; // tblrows=drv+2 // hdr+ftr
}// ----------------------------------
function a2(tx,b,bg_,fg_){ var clr='' // -> html: <a ...> tx </a>
  // a:hover for msie !? 
  var onmouseover=' onmouseover="'
                 +'this.style.border=\'2px inset gold \';'
                 +'this.style.padding=\'0px\';return true"' 
  var onmouseout =' onmouseout="'
                 +'this.style.border=\'0px\';'
                 +'this.style.padding=\'2px\';return true"' 
  if(typeof(bg_)!=undefined && typeof(fg_)!=undefined)
    clr=' style="background-color:'+bg_+'; color:'+fg_+'"'
  else if(typeof(bg_)!=undefined) clr=' style="background-color:'+bg_+'"'
  else if(typeof(fg_)!=undefined) clr=' style="color:'+fg_+'"'
  return '<a title="'+b+'"'+clr+onmouseover+onmouseout+'>'+tx+'</a>'
}
function col_(tx  ,bg,fg,al,cs){// ->html: <td ...> tx </td>
  var al_=''; if (al!=null && al!='') al_=  ' align="'+al+'"'
  var cs_=''; if (cs!=null && cs!='') cs_=' colspan="'+cs+'"'
  var clr=' style="background-color:'+bg+'; color:'+fg+'"'
  return '<td class="text"'+al_+cs_+clr+'>'+tx+'</td>'; // td or th
} 
function usr_info(eb){
// 0=WindowsFolder 1=SystemFolder 2=TemporaryFolder
  var tn=date_a2x(timescan,'num') ,ta=date_a2x(timescan)
	var row=col_(
         a2(eb                  ,'expand/colapse'                            ,bg1b,fg1a) 
        +a2(nsp+ta          +nsp,'scaned: yyyy.mm.dd hh:mm' +eol+tn          ,bg1b,fg1b)
        +a2(nsp+UserName    +nsp,'user'                     +eol+UserName    ,bg1b,fg1a)
        +a2(nsp+ComputerName+nsp,'computer'                 +eol+ComputerName,bg1b,fg1b)
      //+a2(nsp+root        +nsp,'root'                     +eol+root        ,bg1b,fg1a)
        +a2(nsp+os          +nsp,'OS'                       +eol+os          ,bg1b,fg1b)
      ,bg1a ,fg1a,'left') // ,8
	return row
}// ---
load_end()