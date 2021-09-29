// <!-- Original:  Ramandeep Singh (ramandeepji@yahoo.com) -->
// <!-- Web Site:  http://hard-drive.hypermart.net -->
{// ----------------- globals, defaults
var clkID ="clock24"
   ,ctyp  ='fnt'
   ,fnt   ={sz:28,lh:28,fg:'#4169E1',fam:'Digital'}
   ,pic   ={h:21,w:16,path:'pics.num/',pref:'c',ext:'.gif'} // c - cyan on black pics
// ,pic   ={h:24,w: 0,path:'pics.num/',pref:'w',ext:'.gif'} // w - white on black pics
   ,colon =':'
   ,rms   =1*1000 
   ,showsc=!true
}// ---  
var pics  =[]  // [0..9,b,c]=Image.src; b - blank, c - colon :
function clock_set(ctyp_,p_,f_,showsc_,rms_){ // -- #0 set
  showsc=showsc_; rms=rms_;
  if(ctyp_=='pic'){ ctyp=ctyp_
    pic=p_
    for(var i=0; i<=11; i++){  var k=i;
       pics[i]=new Image();  
       if(i==10) k='b'; if(i==11) k='c'; // blank ' ', colon ':'
       pics[i].src=pic.path+pic.pref+k+pic.ext;
       if(dbg>0) out(log_,'2.'+pics[i].src+eol+br)
    } 
  } else { ctyp='fnt'; fnt=f_; 
  }
}// ---
function clock_place(){                       // -- #1 make a place, show 00:00:00
  var sz='',s='';  
  if(ctyp=='pic'){
    if(typeof(pic.h)!='undefined' && pic.h>0) {
      sz=' height="'+pic.h+'"' // 
      if(pic.w>0) sz+=' width="'+pic.w+'"' // 8,14
    }
	  s ='<span id="'+clkID+'"'
      s+='<img src="'+pics[ 0].src+'" name="a"'+sz+'>'
      s+='<img src="'+pics[ 0].src+'" name="b"'+sz+'>'
      s+='<img src="'+pics[11].src+'" name="c"'+sz+'>' // :
      s+='<img src="'+pics[ 0].src+'" name="d"'+sz+'>'
      s+='<img src="'+pics[ 0].src+'" name="e"'+sz+'>'
    if (showsc){                
      s+='<img src="'+pics[11].src+'" name="f"'+sz+'>' // :
      s+='<img src="'+pics[ 0].src+'" name="g"'+sz+'>'
      s+='<img src="'+pics[ 0].src+'" name="h"'+sz+'>'
    }
	  s+='</span>'
  } else if(ctyp=='fnt'){
    s='<span id="'+clkID+'"'
     +' style="'
     +'font-family:'+fnt.fam+';'
   //  font-face:?
     +'font-size:'  +fnt.sz+'pt;' 
     +'line-height:'+fnt.lh+'pt;'
   //  font-weight:bold;
     +'color:'+fnt.fg+';'
     +'padding:0; margin:0;'
  //   background-color:#202020; color:yellow; text-ALIGN:center;
     +'">'+'00:00:00'+'</span>'
  }
  return s
}// ---
function clock_show(){                        // -- #2 <body onLoad="
  function clock_newHMS(h,m,s) { 
    if(ctyp=='pic'){
      if (!document.images) return;
      function m0_9pic(d){ var n=[0,0]
        if (d <= 9) {
          n[0] = "pics["+0+"].src";
          n[1] = "pics["+d+"].src";
        } else {
          n[0] = "pics["+Math.floor(d/10)+"].src"; 
          n[1] = "pics["+(d%10)+"].src";
        }
        return n // [0..9,0..9]
      }
        var src_=m0_9pic(h);
        document.images.a.src = eval(src_[0])
        document.images.b.src = eval(src_[1])
        var src_=m0_9pic(m);
        document.images.d.src = eval(src_[0])
        document.images.e.src = eval(src_[1])
      if (showsc){      
        var src_=m0_9pic(s);
        document.images.g.src = eval(src_[0])
        document.images.h.src = eval(src_[1])
      }
    } else if(ctyp=='fnt'){
      function m0_9(d){ var n='99'
        if (d <= 9) {
          n ='0';
          n+= d;
        } else {
          n = ''+Math.floor(d/10)
          n+= d%10
        }
        return n // [0..9,0..9]
      }
      var   clk=m0_9(h)+colon+m0_9(m)
      if (showsc) clk+=colon+m0_9(s)
      document.getElementById(clkID).innerHTML=clk;
    }
  }// ---
  if (!document.images) return;
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  clock_newHMS(h,m,s);
  setTimeout("clock_show()", rms);      // -- #3 self call 
}// ---
