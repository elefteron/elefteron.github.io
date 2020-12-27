load_new('../lib/windows.js')
{/** **/ // set defaults; user can redefine, but not here 
// ===  window parameters
    scrbarsz=20; frm=3; captsz=23; // <-theme CaptionButtons and TitleBar
    winpos=['T','L']; winofs=[0,0]; // x,y=-5,-5  
    h1=200; w1=400; wcol=200; wexp=510; 
    caption=1; scrbar=1;
	  maxx    =screen.availWidth;  
    maxy    =screen.availHeight;
	  taskbarH=screen.height-maxy; taskbarup=0;
	  taskbarW=screen.width-maxx;  taskbarleft=0; 
// --------------------------------------- char size
    kw=11;        // font-size  :10pt; 
    kh=11.2       // line-height:12pt;
    chW=kw*0.66;               
    chH=kh*1.59   // points*pixel_size=char_pixels  
//  taskbarleft=1; taskbarup=0; set manually if up or left; how to get?
//  tblextralines=3; // hdr,ftr,stat,stathdr
// === user redefine --- color buttons: 
    bbgPG   ='black'; 
    bbgRUN  ='maroon'; 
    bbgCTRL ='gray';
    bfrMISS ='black';  // notexist|unknown  'dimgray'
    bfrFREE ='white';  // exist+unused      'yellow' 
    bfrUsed ='yellow'; // exist+used        'red'    
    bfg     ='white'; bfrwid=2; bfntsz='8pt'; bfntsp='4pt';
//-------------------------- expand/colapse win
    var expand_status=true, expbtn=true; 
    expsgn=['^','v','<','>']// for:?top,?bot,left,right    start expanded!
    colsgn=['v','^','>','<']// for:?top,?bot,left,right
    exppos='3'              //     ?top,?bot,left,right    0..3
/** **/}// ---
  {/** --  open_win(URL,tagetID, par) -> win_ **/
    // https://developer.mozilla.org/en/docs/DOM/window.open
    // <a id="a.id" href="javascript:popUp('','testid', 625, 850)" taget="testid">
    //-- usage:
    //   open_win({url:'',id:'test',title:'* test *',x:10,y:10,width:300,height:200                              
    //           ,'location':'no' ,resizable:'yes',status:    'yes'// yes | 1, no | 0
    //           ,menubar   :'no' ,toolbar:  'no' ,scrollbars:'yes'}) // -> win_
    //   win_.document.write(log_.innerHTML) 
    //--
    var win_ = null;//  id=_blank; id without spaces
    function undef(v){return typeof(v)=='undefined'}
    function open_win(p_) {// ? innerWidth, innerHeight
      var bodyp1=' vLink="#f0f000" hlink="magenta" link="#f0b000"' 
                +' bgColor="#000000" text="#f0b000" topmargin="2" leftmargin="2"'
         ,bodyp2='<font size=3 face="Arial Cyr,Arial,Verdana,Tahoma,Hebar,'
                +'Bitstream Vera Sans Mono,Lucida Console">'
      { var p={url:'',id:"noid",title:"?",width:100,height:100   // -- default values
              ,'location':'yes',resizable:'yes',status:    'yes'
              ,menubar   :'yes',toolbar:  'yes',scrollbars:'yes'}// yes | 1
        var n={width:'width',height:'height'                     // -- names
              ,'location':'location',resizable:'resizable',status:    'status'
              ,menubar   :'menubar' ,toolbar:  'toolbar'  ,scrollbars:'scrollbars'}
        if(!undef(p_.url       )) p.url       =     p_.url       
        if(!undef(p_.id        )) p.id        =     p_.id        
        if(!undef(p_.title     )) p.title     =     p_.title  
        if(!undef(p_.x         )) p.x         =     p_.x         
        if(!undef(p_.y         )) p.y         =     p_.y         
        //--
        if(!undef(p_.width     )) p.width     =eval(p_.width)    
        if(!undef(p_.height    )) p.height    =eval(p_.height)   
        if(!undef(p_.location  )) p.location  =     p_.location  
        if(!undef(p_.resizable )) p.resizable =     p_.resizable 
        if(!undef(p_.status    )) p.status    =     p_.status    
        if(!undef(p_.menubar   )) p.menubar   =     p_.menubar   
        if(!undef(p_.toolbar   )) p.toolbar   =     p_.toolbar   
        if(!undef(p_.scrollbars)) p.scrollbars=     p_.scrollbars
        var win_f = '' // strWindowFeatures
        win_f+=' ,'+n.width     +'='+p.width     
        win_f+=' ,'+n.height    +'='+p.height    
        win_f+=' ,'+n.location  +'='+p.location  
        win_f+=' ,'+n.resizable +'='+p.resizable 
        win_f+=' ,'+n.status    +'='+p.status    
        win_f+=' ,'+n.menubar   +'='+p.menubar   
        win_f+=' ,'+n.toolbar   +'='+p.toolbar   
        win_f+=' ,'+n.scrollbars+'='+p.scrollbars
        //-- if(dbg>0) out(log_,'url:'+p.url+' id:'+p.id+' title:'+p.title+br+win_f+br)
      }
      if ((win_ != null) && (! win_.closed)){
        win_.location.replace(p.url);
      }else{
      // if (protocol,port,host) are same as previous 
      // then it is same origin -> reload content; else open new window
        win_=window.open(p.url,p.id,win_f);
        if (undef(win_) || win_== null){ alert('cannot open'); return}
        win_.document.write('<html><head><title>'+p.title+'</title></head><body'
                           +bodyp1+'>'+bodyp2)// </body></html>
      //win_.document.write('some body data')
      }
      win_.resizeTo(p.width,p.height);
      win_.moveTo(p.x,p.y);
    //window.resizeTo(w,h); window.moveTo(x,y)
      win_.focus();
    }
  }/** -- **/
/* *-/
function winw(){ var w1
  w1=chars*chW+tblW                   +scrbar*scrbarsz 
  if (expbtn &&  expand_status) w1=wexp;// w1+-wexp
  if (expbtn && !expand_status) w1=wcol;
  return w1               
}// ---
function winh(){ var h1
  h1=((Drives+1)+2+tblextralines)*chH +8 +scrbar*scrbarsz +caption*captsz 
  return h1
}// ---
/* */
function setw(w,h,winpos_){ var x=0,y=0; w1=w; h1=h; winpos=winpos_; 
  if (winpos[0]=='T') y=0;
  if (winpos[0]=='B') y= maxy-h       //+taskbarup*taskbarH   +frm*2;
  if (winpos[0]=='C') y=(maxy-h )/2   //+taskbarup*taskbarH   +frm*2;
  if (winpos[1]=='L') x=0;
  if (winpos[1]=='R') x= maxx-w       //+taskbarleft*taskbarW +frm*2;
  if (winpos[1]=='C') x=(maxx-w )/2   //+taskbarleft*taskbarW +frm*2;
  if(dbg>1) out(log_,'setw(): w='+w+' h='+h+' x='+x+' y='+y+' winpos[]='+winpos+eol)
  window.resizeTo(w,h);
  window.moveTo(x+winofs[0],y+winofs[1])
}// ---
function setbtn(arg){//--- color buttons --
// setbtn({fntsz:bfntsz,fntsp:bfntsp, fg:bfg,bg:bbgCTRL, frclr:bfrFREE,frwid:bfrwid})
   var bfntsz_=bfg_=bbg_=bfrclr_=bfrwid_=''
     if(!(typeof(arg.fntsz)=='undefined')) bfntsz_=       'font-size:'+arg.fntsz+';';
     if(!(typeof(arg.fntsp)=='undefined')) bfntsp_=     'line-height:'+arg.fntsp+';';
     if(!(typeof(arg.fg   )=='undefined')) bfg_   =           'color:'+arg.fg   +';';
     if(!(typeof(arg.bg   )=='undefined')) bbg_   ='background-color:'+arg.bg   +';';
     if(!(typeof(arg.frclr)=='undefined')) bfrclr_=    'border-color:'+arg.frclr+';';
     if(!(typeof(arg.frwid)=='undefined') && (arg.frwid)>0)            
                                        bfrwid_=    '  border-width:'+arg.frwid+';';
// font-weight: normal; font-weight:' +bfwght - 300?
// font-style: normal;   font-size:10pt; line-height:10pt;
// font-family: tahoma, arial, Helvetica, sans-serif;
   return (bfntsz_+bfg_+bbg_+bfrclr_+bfrwid_);
}//---
function cbtn (stl,val,evt){var stl_=val_=evt_='';
  if(!(typeof(stl_)=='undefined')) stl_=  ' style="'+stl+'"';
  if(!(typeof(val_)=='undefined')) val_=  ' value="'+val+'"';
  if(!(typeof(evt_)=='undefined')) evt_=' onclick=\'javascript: '+evt+'\'';
  return ('<input type=button '+val_+stl_+evt_+'>')
}// ---
function expand(){// toggle
  expand_status= !expand_status
  if(expand_status){w1=wcol} else{w1=wexp}
  setw(w1,h1,winpos)
}//---
function expsign(){ var es=expsgn[exppos]
  if (expand_status)    es=colsgn[exppos]
  return es
}//--------------------------
load_end()
/*--> line:" 52 " error:" Object expected " */