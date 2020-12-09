_load._new('scr/clock.js')
// liveclock - thanks to "JavaScript Vault" - at http://www.davidpye.com/
// ... the largest off-line archive of javascript source code
// --- global var's - config here: -------------------------------------------
  var clocktest=false; /* *-/ clocktest =true /* */
  var fontface='Verdana' ,fontcolor='darkgray' ,fontbold=true  
  var fontsize=3 // 1..7; // css:' font-size:11pt;' ?
  var clockpos=''; // 'position:absolute;right:10;top:0;'
  var ymdpos  ='';
  // css:      <style> body {background-color: #000000;} </style>
  // fontface: installed fonts work only 
// --- calculate some vars outside loops/funcs:
// ... which DOM 
  var d_=''// show_ymdhms() cannot work
  if(document.layers)         d_=d_+'.lay' // ns-old
  if(document.all)            d_=d_+'.all' // ie,ns
  if(document.getElementById) d_=d_+'.get' // mz,sm,ff,ns ,ie,op
  if(clocktest) alert('clock DOM='+d_)
  //-- place: 
  // var livehms='<span id="livehms" style="'+clockpos+'"></span>'
  // var liveymd='<span id="liveymd" style="'  +ymdpos+'"></span>'
  // write(liveymd+' '+livehms)
  var myymd ='', myhms='';
function browserID(){
var brw='?'
var brAgent=navigator.userAgent.toLowerCase();// ? gecko mozilla
  if(brAgent.indexOf('netscape' )>-1) brw='NS';
  if(brAgent.indexOf('msie'     )>-1) brw='IE';
  if(brAgent.indexOf('seamonkey')>-1) brw='SM';//& k-meleon
  if(brAgent.indexOf('firefox'  )>-1) brw='FF';
  if(brAgent.indexOf('opera'    )>-1) brw='OP';
  if(brAgent.indexOf('safari'   )>-1) brw='SF';//?
  if(brAgent.indexOf('konqueror')>-1) brw='KQ';
  if(brAgent.indexOf('google'   )>-1) brw='GO';//?
  return brw
}// ---
  function show_ymdhms(){
  var v=':', w='-', ms=10*1000;
  // all code in show_ymdhms() & used var's are copied from "JavaScript Vault"
  // get time,write by DOM manipulation, loop by ms  
    if (!document.layers&&!document.all&&!document.getElementById) return
    var clockbeg='<font' 
    var clockend='</font>'; if (fontbold) clockend='</b>'+clockend
    var clockmid='>';       if (fontbold) clockmid+='<b>'
    var clockmid=' size="' +fontsize +'"'+' face="'+fontface+'"'
                +' color="'+fontcolor+'"'+clockmid
    var t=new Date()
    var h=t.getHours();   if (h<=9)h="0"+h
    var m=t.getMinutes(); if (m<=9)m="0"+m
    var s=t.getSeconds(); if (s<=9)s="0"+s
    var tdow =t.getDay  ()// this day day of week
    var tdd  =t.getDate ()// this day dd-mm-yyyy
    var tmm  =t.getMonth() +1; if (tmm<=9)tmm="0"+tmm
    var tyy  =t.getFullYear () 
//  if(tyy<1900) tyy+=1900
//  var brw=browserID()
//  if     (brw=='SM' || brw=='NS' || brw=='FF' || brw=='KQ'){tyy+=1900}
//  else if(brw=='IE' || brw=='OP'){}// SF?  safari, GO? google 
    var myymd=clockbeg+clockmid  +tyy+w+tmm+w+tdd  +clockend
    var myhms=clockbeg+clockmid  +h+v+m+v+s        +clockend
    // ... write by DOM manipulation:
      if      (document.layers)         {// ns
        document.layers.livehms.document.write(myhms)
        document.layers.livehms.document.close()              
        document.layers.liveymd.document.write(myymd)
        document.layers.liveymd.document.close()              
      }else if (document.getElementById){// mz
        document.getElementById("livehms").innerHTML=myhms  
        document.getElementById("liveymd").innerHTML=myymd  
      }else if (document.all)           {// ie
        livehms.innerHTML=myhms;
        liveymd.innerHTML=myymd;
      }
    setTimeout("show_ymdhms()",ms) // ... loop by ms
  //return (myhms)
  }
// ---
_load._end()
