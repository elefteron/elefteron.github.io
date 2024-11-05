_load._new('drv-info.js')
  { // ---global,cfg:
    var rsz=0; 
    var dbg=1;
    var refreshms=5*60*1000; /* min*sec*ms */
    //  bfrwid=2; bfntsz='8pt'; bfntsp='4pt';// ->setbtn() from windows.js
    var nsp='&nbsp;'; // to avoid cell wrap on table resize - wrap on - sp
    var z=[];
    for(var i=1; i<=20; i++){ z[i]=''; 
      for(var j=1; j<=i; j++){z[i]+=nsp;}
    }    
// --- window parameters:
    var winpos=['B','R']; var winofs=[0,0]; /* x,y=-5,-5 */  
    var scrbarsz=20, frm=3, captsz=23; // <-theme CaptionButtons and TitleBar
    var h1=200, w1=400, wcol=200, wexp=510; 
    var caption=1, scrbar=1;
	  var maxx    =screen.availWidth;  
    var maxy    =screen.availHeight;
	  var taskbarH=screen.height-maxy; var taskbarup=0;
	  var taskbarW=screen.width-maxx;  var taskbarleft=0; 
// --- colors:
    // line:1/2-bg grays; col:a/b-fg:yellow/orange
    var bg0 ="#606060"; var fg0 ="#b0b0b0"; // out of tbl
    var bg1a="#404040"; var bg1b="#202020";
    var fg1a="#f0f0f0"; var fg1b="#f0b000";
    var bgh ="#808080"; var fgh ="black"  ; // tbl header/footer color
    var fclr='gold';
//-------------------------- expand/colapse win
    var btnexp='';
    var expand_status=true, expbtn=true; 
    var expsgn=['^','v','<','>']// for:?top,?bot,left,right    start expanded!
    var colsgn=['v','^','>','<']// for:?top,?bot,left,right
    var exppos='3'              //     ?top,?bot,left,right    0..3
// --- color buttons: 
    var bbgPG   ='black'; 
    var bbgRUN  ='maroon'; 
    var bbgCTRL ='gray';
    var bfrMISS ='black';  // notexist|unknown  'dimgray'
    var bfrFREE ='white';  // exist+unused      'yellow' 
    var bfrUsed ='yellow'; // exist+used        'red'    
    var bfg     ='white', bfrwid=2, bfntsz='7pt', bfntsp='4pt';
// --- rows order:
    var order_built=[0,1,2,3,4,5,6,7,8]// <- dont change, see hdrName[i]
//  [drvname,drvno,free,max,used ,vol_n,vol_id ,f_sys,drv_type]
    var order_body =[0,2,3,5,4,6,7,8]; // <- set this for body rows order
    var order_hdr  =[1,2,3,5,4,6,7,8]; // <- set this for ftr&hdr
    var tfu    =[0,0,0], tfu_sum=[0,0,0]; // totalmax,free,used 
    var val=[], bg=[], fg=[],aln=[];  
    var hdrName=[''
                ,"#"         // 1 drv_no
                ,"free"      // 2 free
                ,"size"      // 3 max
                ,"used"      // 4 used
                ,"vol_name"  // 5 vol_n
                ,"vol_id"    // 6 vol_id
                ,"file_sys"  // 7 f_sys
                ,"disk_type" // 8 drv_type
                ]
    var aln    =[''
                ,'right'     // 1 drv_no
                ,'right'     // 2 free
                ,'right'     // 3 max
                ,'right'     // 4 used
                ,'left'      // 5 vol_n
                ,'left'      // 6 vol_id
                ,''          // 7 f_sys
                ,'center'    // 8 drv_type
                ]
// --------------------------------------- char size
    var kw=11/*font-size :10pt;*/, kh=11.2     /*line-height:12pt;*/
    var chW=kw*0.66              , chH=kh*1.59 // points*pixel_size=char_pixels  
// --- chars calc:
    var voll_=17,gibl_=7;// mibl_=11
    var order_chrs=[2,gibl_,gibl_,gibl_,voll_,9,2,7,10] //  -- chars by columns .. later
    var tblW=order_body.length*2         // cols*pix
    var chars=0; for(i=0; i<=order_chrs.length-1; i++) chars+=order_chrs[i] // <- if used in body!?
// --------------------------------------------------
  }// --- 
  function drv2tbl(drvN,btnexp){// ->html
    var tblbeg='<table border="0" cellspacing="1" cellpading="1"'
              +' bgcolor="dimgray" wrap="no">'+eol; 
    var tblend='</table>'+eol;
    var tbl=makeTbl(DriveList,Drives);  
    var rows=1+(drvN-1)+1; // hdr+drives+ftr
    var buf=tblbeg+eol;
    for(var i=1; i<=rows-1; i++) 
      buf+='<tr>'+tbl[i]+'</tr>'+eol; // data 
    if(dbg>0) buf+='<tr>'+tbl[rows]+'</tr>'+eol; // data foother
  //if(dbg>0) buf+='<tr>'+tbl[0]   +'</tr>'+eol; // data header
    buf+=tblend+eol;
    buf+=tblbeg+'<tr>'+usr_info(btnexp)+eol+'</tr>'+eol+tblend;
    return buf;
  }//  ---     
  function drv_load(){// drv2tbl()->html->.getElementById(wrkID).innerHTML
    if(fs.ax._activexON){
    //DriveList=[]; 
      Drives=-1; 
      drvN=fs.ax.DrivesReady();  //=>drv        ; ->fs.ax.drv
      fs.ax.GetDriveList()//->fs.ax.drv, fs.ax.vol[0..drv]
      if(undef(fs.ax.vol)) out(log_,'drv-info: fs.ax.GetDriveList()->undef.'+br);
      if(dbg>1){ 
        out(log_,'drv-info: _activexON:'+fs.ax._activexON
                ,' DrivesReady() '+drvN+' - '+fs.ax.drv+','+(fs.ax.vol.length-1),br)
      } 
      tfu_sum=[0,0,0]
      for(var i=1; i<fs.ax.vol.length; i++){
        if(undef(fs.ax.vol[i])) {
          out(log_,'drv-info: fs.ax.GetDriveList()->undef.<br>\n'); break;
        }
      //obj_list(fs.ax.vol[i],'fs.ax.vol['+i+']') // -- ok
        addDrv(fs.ax.vol[i])//->tfu_sum=[free,max,used],DriveList[Drives]
      }
      var tymd=getymd(), thms=gethms()
      timescan=[tymd.yr,tymd.mo,tymd.dy, thms.hr,thms.mi];
      
      if     (drvN==-1) alert('missing?activeX-ie:' +drvN)
      else if(drvN==-2) alert('missing DrivesReady:'+drvN)
      else if(drvN<  0) alert('missing drives:'+drvN)
      else PutDriveListToFile(_fd,drvN);
    }
    if(dbg>1){ 
      out(log_,'scan:'+date_a2x(timescan)+' drv:'+DriveList.length+br);
      for(var i=0; i<=Drives; i++) {
        for(var j=1; j<=8; j++) out(log_,DriveList[i][j][0]+' ');
        out(log_,eol+br)
      }
    }
    if(Drives>=0) drvN=Drives+1; else drvN=0; // !!!  
    {// --- ->size,btn
      maxx=screen.width;           maxy=screen.height; 
      if (screen.availHeight<maxy) maxy=screen.availHeight; 
      if (screen.availWidth <maxx) maxx=screen.availWidth;
      var elem=document.documentElement
         ,body=document.getElementsByTagName('body')[0];
      //  body=document.body   
      var wi= window.innerWidth   ||elem.clientWidth  ||body.clientWidth;
      var hi= window.innerHeight  ||elem.clientHeight ||body.clientHeight;
      var wo= window.offsetWidth  ||elem.offsetWidth  ||body.offsetWidth;
      var ho= window.offsetHeight ||elem.offsetHeight ||body.offsetHeight;

      h=180; w=150; wexp=430; btnexp_='';
      if(_iex) rsz=1; 
      if(fs.ax._activexON && rsz==1){ 
        capsz=26; scrsz=20; // depend on theme
        txtH=15             // css: .text > line-height
        var h=4*2/*win frame*/ +capsz +scrsz +4/* before tbl */
             +((Drives+1)+2)*(txtH+2) +6/* bottom line+ */  
        winpos=['B','R']; 
        /*x*/ L=0; R=maxx-w; /*y*/ T=0; B=maxy-h;
        window.resizeTo(w,h); setw(w,h,winpos); 
        // resizeTo(w,h); moveTo(x=L|R, y=T|B)
        btnexp_=setbtn({fntsz:bfntsz,fntsp:bfntsp, fg:bfg,bg:bbgCTRL, frclr:bfrFREE,frwid:bfrwid})
        if (expbtn) btnexp=cbtn(btnexp_,expsign(),'expand();');// &nbsp;
      }
      if(dbg>1) 
        out(log_,'w='+w+' h='+h+' wi='+wi+' hi='+hi+' wo='+wo+' ho='+ho
        +' winpos:'+winpos+br//+' btnexp_='+btnexp_
        +br) // w=150 h=183 wi=140 hi=155 winpos:T,R
    }
    wrk_.innerHTML=drv2tbl(drvN,btnexp); 
//  #1.run:       drv_load() 
//  #2.self call: setTimeout("drv_load()", refreshms)
    setTimeout("drv_load()", refreshms); // ----- #2 self call 
    if(dbg>1){ // ?' chars:'+chars  +
      var tststr='drv-info.htm: drvs:'+Drives +' refresh='+(refreshms/1000)+'s'
        // +' chW:'+chW  +' w1:'+w1+' chH:'+chH  +' h1:'+h1+' tblW:' +tblW +'<br>'
        // +' scrbar:'+scrbar +' scrSz:'+scrbarsz
        // +' vol:'  +vollng + ' cols:'+order_body.length
      out(log_,eol+br+tststr);
    }
  }// ---    
/*
// for(i=0;i<frames.length;i++){window.open(frames[i].location);}eval();
// for(i=0;i<frames.length;i++){log('frame='+i+' location='+frames[i].location+eol+br);}
*/  
_load._end()