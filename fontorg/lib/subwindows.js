load_new('lib/subwindows.js'); //_load._new('../lib/subwindows.js')
// -----------------------------------------------// new: setwin,newwin,endwin,outwin
function setwin_(wh,w,h,x,y){wh.resizeTo(w,h); wh.moveTo(x,y)}
function       setw(w,h,x,y){window.resizeTo(w,h); window.moveTo(x,y)}
// window.screenTop .screenLeft window.screenX
// screen.availWidth .availHeight
// -----------------------------------------------
function newwin_(pid,title,name,w,h,x,y,ifile,canwrite) {
  wh=window.open(title,name,sFeatures(w,h));
  setwin_(wh,w,h,x,y)
  if (canwrite) outwin(wh,htmhdr(pid+' '+title+' '+name,ifile,'black','white'))
  return wh; // window handler
}// -----------------------------------------------
function endwin_(wh,fext){s=''
  if (fext=='htm') s='</pre></body></html>'+ln;  
  if (wh!=null) {outwin_(wh,s); wh.close(); wh=null }
}// -----------------------------------------------
function outwin_(wh,s){// wh.document.write(s)}
  if      (wh==wscr_){   document.write(s)} 
  else if (wh!=null) {wh.document.write(s)}
}// -----------------------------------------------
/**-/
window.open([URL], [Window Name], [Feature List], [Replace]);
Feature List:
Property	Default value	Description
width		auto	specifies width of the new window in pixels
height		auto	height of the window in pixels
top			auto	specifies window position
left		auto	specifies window position
directories	no		should the directories bar be shown? (Links bar)
location	no		specifies the presence of the location bar
resizable	no		specifies whether the window can be resized.
menubar		no		specifies the presence of the menu bar
toolbar		no		specifies the presence of the toolbar
scrollbars	no		specifies the presence of the scrollbars
status		no		specifies the presence of the statusbar
/**/
function sFeatures(){
//window.open('WebForm.aspx','Popup', 'height=400,width=400,status=no, toolbar=no,menubar=no,location=no')
//window.open('','MRTG','resizable=1,scrollbars=0,width=500,height=250')
   return('fullscreen=no,status=yes,location=no'// directories=yes,
   +',toolbar=no,resizable=yes,menubar=no,scrollbars=yes') // fullscreen=yes
// - (not IE) copyhistory hotkeys innerHeight z-lock
// - innerWidth outerHeight screenX screenY titlebar 
// + dependent fullscreen left location status top width
// window.open(title,name,sFeatures(w,h));
// parent.opener.childOpened(self);
}// ------------------------------------------

function openwin_wlog(w,h,x,y,pid,title,ifile,ico){
// openscr(600,600,60,150-30)
// x2=10;y2=120;w2=1000;h=2575 
/* javascript-array.com/scripts */

   wlog_=window.open('','log','width='+w+',height='+h+','+sFeatures());// iex yes, kml not, saf not, opr yes  
// wlog_=document.open('','log','width='+w+',height='+h+','+sFeatures());// iex not, kml not, saf not, opr yes  
// if (window.focus) {wlog_.focus()}
// wlog_.window.moveTo(x,y);  // iex yes, opr not, kml not
// wlog_.document.moveTo(x,y);// iex not, opr not, kml not
// wlog_.moveTo(x,y);         // iex yes, opr yes, kml not 
   wlog_.document.write(htmhdr(pid+' '+title,ifile,'gray','black')+'<pre>')// ico
// wlog_.document.write('--- '+id+' ---')
}// -----------------------------------------------
// wlog_=null
// function outwin_wlog(s)   {
//   if(!undef(wlog_) && wlog_!=null) wlog_.document.write(s);
//   else out(log_,'err: Cannot write to "wlog_" \n<br>')
// } 
// function closewin_logw()  {if(!undef(wlog_) && wlog_!=null) wlog_.close()} 
// ? wlog_.document.close();  this.window.close(); wlog_.close();
// -----------------------------------------------

 frep_=null
 csvhdr='NO____;d;lvl;RHSA;YYYY-MM-DD_HH:MM;BYTES;NAME.EXT;'// FILESinDIR;CRC32;  
// ------------------------------------------
function make_frep(pid,pfr,repdir,repname,repext,ifile,htminclude){var s=s2=''
// old: makerep(repdir,repname,repext)
//     !make_frep(name,ext,pfr,id)
  var d1=getdate2(1,false)// getymd() // date&time begin - end, format yyyy-mm-dd hh-mm
  var report=repname+'.'+repext
  if(dbg>0)out(log_,'make_frep: path='+pfr+' report='+report+eol)
xmlhdr='?'
  frep_=openrep(repdir+report,repext) // overwritereport! ?how to append reports
  s='// == '+pid+' == '+d1+' path: '+pfr+ln+' report: '+report+ln
  if      (repext=='csv') {s2=csvhdr+s+ln}
  else if (repext=='htm') {s2=htmhdr(pid+' '+repname,ifile,'black','white')+ln
    if (htminclude!=undefined)s2+=htminclude+ln // if sended as parameter 
//      htminclude='<'+'script'+' src="dump-dir.see3.js">'+'<'+'/script>'
                          s2+='<font color="lime">'+s+'</font>'+'<br>'+ln 
                             +'<b><pre><code>'}
  else if (repext=='js')  {s2=s+ln}
  else if (repext=='xml') {s2=xmlhdr+ln}
  
  out(log_,s2);  
  return s
}// ------------------------------------------ 
function open_frep(fname) {ln='\n'
  var rwflag=2 // 1=read 2=write 
  var makeifnotexist=true 
  if(dbg>0)out(log_,'openwin_rep: fname='+fname+'(')
  frep_= fs.ax.fso.OpenTextFile  (fname, rwflag, makeifnotexist); // on err?
//f   = fso.CreateTextFile(fname, true)
  if(dbg>0)out(log_,')openwin_rep'+eol)
  return(frep_);
}// -------------------------------------------
// !endrep(ext,dn,fn,sz,d1,dur)
//d2=getdate2(2,false); dur=duration()
//out(log_,sumrep(ext,dn,fn,sz,dur)) 
function sum_frep(ext,dn,fn,sz,dur){s=s2=''
   if (ext=='js') s2='// '
   s+=s2+'-- dirs:'+dn+' files:'+fn+' size:'+sz+' B -- duration:'+dur+ln 
   return s  
} // ------------------------------------------
function out_frep(str){
  if(dbg>0)out(log_,'outrep(')
  if (frep_!=null) frep_.write(str)
  else alert('cannot write to report - not opened!')
  if(dbg>0)out(log_,')'+eol)
} // -- crash on bad char encoding
function close_frep(fext) {var s=''// -- only if not closed!?
  if      (fext=='htm') s='<\/pre><\/body><\/html>'
  else if (fext=='xml') s=''
  if (frep_!=null) {out(log_,s); frep_.Close()}
}// --------------------------------------------

/**-/ 
   scr=window; sys=window; //sys=parent.sys; 
   log=parent.log
/**-/ 
   sys = document.getElementById("sys").contentWindow; 
   log = document.getElementById("log").contentWindow; 
/**-/ 
   sys = document.getElementById("sys").contentDocument; // DOM2 HTML Standard.
   log = document.getElementById("log").contentDocument; // DOM2 HTML Standard.
/**-/ 
   sys = document.sys.contentWindow; 
   log = document.log.contentWindow; 
/**-/ 
   sys = document.sys.contentDocument; // DOM2 HTML Standard.
   log = document.log.contentDocument; // DOM2 HTML Standard.
/**/ 
// sys=parent.sys
// sys=parent.frames.sys//.document
// log=window
// log=parent.log
// log=parent.frames.log//.document

// log=       frames.window.document.getElementById('log') // sm=ok       hta=x
// obj=parent.frames.window.log.document                   // sm=und      hta=
// obj=parent.frames.window.document.getElementById(log)   // sm=und/nul  hta=
// obj=              window.document.getElementById(log)   // sm=ok       hta=
// log=              window.log.document 
//out=''; scr=window; 
//function outwin(wh,s){ 
// if(wh==scr) scr.document.write(s) 
// else wh.innerHTML=s
// else if (wh!=null) { wh.document.write(s)}// +ie8,-google, +sm ~hta(no err,no res)
// else if (wh==sys ) {sys.document.write(s)}// +ie8,-google, +sm -hta
// else if (wh==log ) {log.document.write(s)}// +ie8,-google, +sm -hta
// var fwin = self.frames[0]; // or:
// var fwin = self.frames["iframeName"];
//-- from the IFRAME or FRAME element:
// var iframeEl = document.getElementById("myFrame");
// var fwin = iframeEl.contentWindow; // Nonstandard, but widely supported.
// var fdoc = iframeEl.contentDocument; // DOM2 HTML Standard.
//}
// function newwin(name,title,w,h,x,y) {
//    var winpar = 'width='+w+',height='+h+',directories=no'
//          +',toolbar=no,resizable=yes,menubar=no,scrollbars=yes'
//          +',fullscreen=no'; // fullscreen=yes
//    wh=window.open(title,name,winpar);
//    //setwin(wh,w,h,x,y)
//      outwin(wh,htm,?hdr_(title)+title+'   '+']o_o['+ln)
//      return wh; // window handler
// }// ---
// function endwin(wh){s='</pre></body></html>'+ln; 
//      outwin(wh,s); 
//      if (wh!=null) wh.close()
// }// ---
function iframe(r,n,w,h,c,s){ // constructor
// iframe={"src":r,"name":m,"width":w,"height":h,"class":c,"style":s}
  this.src=r;    this.name=n; this.width=w; 
  this.height=h; this.clas=c; this.style=s; 
}// ---  
function iframe_htm(ifr,v){
var s=' src="'   +ifr.src   +'"'
     +' name="'  +ifr.name  +'"'+' id="'    +ifr.name  +'"'
     +' width="' +ifr.width +'"'+' height="'+ifr.height+'"' 
  if(ifr.clas !='')s+=' class="'+ifr.clas  +'"'
  if(ifr.style!='')s+=' style="'+ifr.style +'"'
  return '<'+'iframe'+s+'>'+eol+v+eol+'<\/'+'iframe>'+eol;
}// --- 
// -------------------------------------------------
// <iframe src="http://www.hunlock.com/examples/notajax.html" name="serverData" 
// width=200 height=50 style='background-color: #DDDDDD'></iframe>
//<div ID='feedback'>Hello</div>
/**-/
   fr1=new iframe("","if1",600,30,'','background-color: #500000;');
   id1='d1';div='a<div id="'+id1+'">b<\/div>c'
   outwin(scr,('x'+iframe_htm(fr1,div)+'y'))
// outwin(scr,'x<iframe src="" name="if1" width="200" height="50"'
// +' style="background-color: #500000;">a<div id="d1">b<\/div>c<\/iframe>y')
//
   ifr_cont=parent.frames.log.document.getElementById(id1)   // +sm
   ifr_cont=fr1.document.getElementById(id1) // -sm(fr1=undef)
   if     (ifr_cont===null)       outwin(scr,'null') //--?
   else if(ifr_cont===undefined)  outwin(scr,'undef')
   else                           outwin(scr,ifr_cont.innerHTML)
   id2='feedback2';outwin(log,('<pre id="'+id2+'"><code>content2</code><\/pre>'))
   alert(parent.frames.log.document.getElementById(id2))  // ->[object HTMLPreElement]
// -------------------------------------------------
   parent.frames.log.if1.document.innerHTML='123'
/**/


function htmhdr(title,ifile,bg,fg){ // ifile: mozilla=ok, IE=!?
var s='<html><head><title>'+title+'</title>'+ln
     +'<meta http-equiv="Content-Type" content="text/html; charset=windows-1251">'+ln
   if(ifile!='')s+='<link rel="SHORTCUT ICON" href="'+ifile+'" type="image/x-icon">'+ln
    s+='<style>'
     +"body {font-family:'Lucida Console','Segoe UI',Tahoma,Verdana,Arial,'Arial Cyr'"
     +"	   ,Hebar,Helvetica,'Sans Serif','MS Sans Serif',Geneva;"+ln
     +"     font-size:11pt; line-height:12pt; text-decoration:none;"+ln
     +"	   text-align:left;font-style:normal;font-weight:normal;" +ln
     +"	   background-color:"+bg+";color:"+fg+";}"+ln
	 +'<\/style>'+ln +'</head>'+ln
	 +'<body vLink="red" hlink="blue" link="cyan" topmargin="2" leftmargin="2">'+ln
//<link rel="SHORTCUT ICON" href="/favicon.ico" type="image/x-icon">
  return s
}// ------------------------------------------
//function undef(n){return(typeof(n)=='undefined')} 
load_end(); // _load._end()