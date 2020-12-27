load_new('lib/utils.js')// _load._new('../lib/utils.js')
  tab='\t'      // \011      tab char
  eol='\n' // \x0D \x0A cr+lf for dos text file '\r' ?
//----------------------------------------
  latCap='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  latSma='abcdefghijklmnopqrstuvwxyz'
  cyrCap='ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß'
  cyrSma='àáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ'
// ------------------------------------------------
  others="0123456789';,. `~!@#$%^&-_=+[]{}()"
  oth2="ˆ„…†‡‰‹‘’“”•–—›¤§«¬°±µ¶·»" // ?
  wrn='™©®'// bad for cdfs;
//badchars='"|¦:<>?*'  + every noninstalled in win-FileSysem nonlatin charset
  okchars='. /\\:'+latCap+latSma+cyrCap+cyrSma+others+wrn;
// -------------------------------------------------
function undef(v){return typeof(v)=='undefined';} 
/**/ // by http://www.hunlock.com/blogs/The_Complete_Javascript_Strings_Reference
String.prototype.trim  = function() {return this.replace(/^\s+|\s+$/g,"");}
String.prototype.ltrim = function() {return this.replace(/^\s+/g,"");}
String.prototype.rtrim = function() {return this.replace(/\s+$/g,"");}
/**/
function TrimSP(txt,flag){ //flag:"B"oth,"L"eft,"R"ight spaces
  var i,j,l,t,s='';
  
  if (!(flag=='L' || flag=='B' || flag=='A' || flag=='R')) return;
  if (txt=='') return
  if (undef(txt)) {log('TrimSP 1: txt=undefined!'+eol); return;}
  t=txt;
  l=t.length; j=-1; 
  if(flag=='L' || flag=='B' || flag=='A'){
    for (i=0; i<=l-1; i++)  {
      if (t.charAt(i)!=' '){j=i; break; }
    } // 1-st nonsp forw
    t=delstr(t,0,j); 
  }
  
  l=t.length; j=-1; 
  if(flag=='R' || flag=='B' || flag=='A'){
    for (i=l-1; i>=0; i--){
      if (t.charAt(i)!=' '){j=i+1; break; } // else s+=','+i
    } // 1-st nonsp backw
    //s+=',j='+j+',l-j='+(l-j) 
    t=delstr(t,j,l-j); 
  }
  return t;//+s
}// ------------------------------------------------/* */
function delstr(tx,fr,ln){// // delete (tx,fr,ln) - pascal
 var err=false,ermsg='';
 if (undef(tx)) {ermsg='delstr 1:  tx=undefined!'+eol; err=true;}
 if (undef(fr)) {ermsg='delstr 2:  fr=undefined!'+eol; err=true;}
 if (undef(ln)) {ermsg='delstr 3: lng=undefined!'+eol; err=true;}
 if (err) {log (ermsg); return;}
  l2=tx.length; f2=fr+ln;
  s =tx.substring(0,fr);
  s+=tx.substring(f2,l2+1);
  return s; //+' fr,ln,f2,l2='+fr+','+ln+','+f2+','+l2+';'
}// ------------------------------------------------
function ChRpt(c,n) {// c:char; n:integer var L:integer; s:string;
  var n,l,s='';
  if (c=='') return;
  if (undef(c)) {log('ChRpt 1: c=undefined!'+eol); return;}
  for (l=1; l<=n; l++) s=s+c;  return s;
}// ------------------------------------------------
function FindStr (iMsk,iTrg){
/*compare capital letter in Latin  &&  Cyrillic Windows1251 charset*/
  var err=false,ermsg='';
    if (iTrg=='' || undef(iTrg)) {ermsg='FindStr 2: Trg=undefined!'+eol; err=true;}
    if (iMsk=='' || undef(iMsk)) {ermsg='FindStr 1: Msk=undefined!'+eol; err=true;}
    if (err) {log (ermsg); return;}
  var Msk,Trg;
  Msk=iMsk.toUpperCase(); Trg=iTrg.toUpperCase()
  return  Trg.indexOf(Msk); // pos(Msk,Trg)
}// ------------------------------------------------
hasbadchar=false; // global
function ReplaceBadChars(s,subst){ r='';
     for (k=0; k<=(s.length-1); k++)  {// check that all nm are in okchars
       kch=s.charAt(k); hasbadchar=true;
       for (l=0; l<=(okchars.length-1); l++){
         if (kch==okchars.charAt(l)) {hasbadchar=false; break;}
       }
       if (hasbadchar) {r=r+subst; //outscr('\n badchar="'+kch+'"')
       }   else        {r=r+kch;}
     }
     return(r);
}// -------------------------------------------------
f=0;t=1; test=[f,f,f] // f,t
function tst(i){rez=false;
  if ((i>=0)&&(i<=2)) rez= (test[i]==t); 
  return rez;
}//---------------------------------------
function yn(b) {var r='N'; if (b) r='Y'; return(r); }
// -------------------------------------
function b2kb(b){var kb=Math.round(b/1024); // "xxx xxx xxx" 
  //kb=Math.round(kb*100)/100; .toString(10) Math.ceil((b/1024)/1024)
  return(kb.toFixed(2)); //  numObj.toFixed([fractionDigits])
}// -------------------------------------
function b2mb(b){var mb=Math.round((b/1024)/1024); 
  return(mb.toFixed(2));
}// -------------------------------------
function b2gb(b){var gb=Math.round(((b/1024)/1024)/1024);
  return(gb.toFixed(2));
}// -------------------------------------
function caps(si) {s=''; ch='';
  for (i=0; i<=(si.length-1); i++)
  {ch=si.charAt(i);
        Li=latSma.indexOf(ch);
    if (Li>-1) {ch=latCap.charAt(Li);}
    else {Ci=cyrSma.indexOf(ch); if (Ci>-1) ch=cyrCap.charAt(Ci); }
    s+=ch;
  }
  return s
}//----------------------------------------
function okin(val,min,max){return (val>=min)&&(val<=max);
}//----------------------------------------
function ok2(val,v1,v2){return (val==v1)||(val==v2);
}//----------------------------------------
function divisible(n,by_m){ // for count every by_m; (n%by_m==0)!?
  k=Math.floor(n/by_m) 
  if (n==k*by_m) {return true} else {return false}
}// -------------------------------------------------

function fz(n,l){// fill zeroes leftward
  var s1="", s2="", k=-1; // because n.length=undef work with str, cut first sl-l chars
  c='0';
  for (var i=1;        i<=(l); i++) {s1+=c;} 
  s1+=n; sl=s1.length;
  for (var i=(sl-l+1); i<=l;   i++) {k++; s2=s2+s1.charAt(k);}
  s2=s2+n;
//outscr(' fz: n='+n+' l='+l+' c='+c+' sl='+sl+' s1='+s1+' s2='+s2+';\n')
return (s2); 
}// -------------------------------------------------
function fl(n,xx,ch){// fill chars leftward
 var err=false,ermsg='';
 if (undef( n)) {ermsg='fl 1:  n=undefined!'+eol; err=true;}
 if (undef(xx)) {ermsg='fl 2: xx=undefined!'+eol; err=true;}
 if (undef(ch)) {ermsg='fl 3: ch=undefined!'+eol; err=true;}
 if (err) {log (ermsg); return;}
  var s=''; c=ch; if(c=='') c=' '; x=xx; if (x<1) x=1
  for (var i=1; i<=x; i++)s+=c; s=s+n; l=s.length; 
  str=''; for (var i=x; i>=0; i--) str+=s.charAt(l-i)
  return str;
}// -------------------------------------------------
function fr(n,xx,ch){// fill chars rightward
 var err=false,ermsg='';
 if (undef( n)) {ermsg='fr 1:  n=undefined!'+eol; err=true;}
 if (undef(xx)) {ermsg='fr 2: xx=undefined!'+eol; err=true;}
 if (undef(ch)) {ermsg='fr 3: ch=undefined!'+eol; err=true;}
 if (err) {log (ermsg); return;}
  var s='',c=ch, x=xx; if(c=='') c=' '; if (x<1) x=1
  for (var i=1; i<=x; i++)s=s+c; s=n+s; l=s.length;
  str=''; for (var i=0; i<=x; i++) str+=s.charAt(i)
  return str;
}// -------------------------------------------------
/* old:z4(n) z8(n) n4(n) n8(n) n20(n)  */
function FileAttr(f){
	var S=''; c='_';s0="________";   // "*****_**",  "-----___" "****" : history
	  if (f.attributes==0 || f==null)          {S= s0;}
    else {// rhsa attributes are read/write.          // 012345678 bits              
	    if (f.attributes &   1) {S+= "r";} else {S+=c;}   // FA_ReadOnly =   1
	    if (f.attributes &   2) {S+= "h";} else {S+=c;}   // FA_Hidden   =   2
	    if (f.attributes &   4) {S+= "s";} else {S+=c;}   // FA_System   =   4
	    if (f.attributes &  32) {S+= "a";} else {S+=c;}   // FA_Archive  =  32
	          // ldvc attributes are read only 
	    if (f.attributes &   8) {S+= "V";} else {S+=c;}   // FA_Volume   =   8
	    if (f.attributes &  16) {S+= "D";} else {S+="F";} // FA_Dir      =  16
	    if (f.attributes &  64) {S+= "l";} else {S+=c;}   // FA_Alias    =  64 (schortcut,.lnk)
	    if (f.attributes & 128) {S+= "C";} else {S+=c;}   // FA_Compr    = 128
    }
	return(S);
/* object.Attributes [= newattributes]
   ex: f = fso.GetFile(filespec) 
       f.attributes = f.attributes - 32; s = "Archive bit is cleared.";
       f.attributes = f.attributes + 32; s = "Archive bit is set.";
*/
}// -----------------------------------
  function qs7(p1,p2,p3,p4,p5,p6,p7){s=';'; // csv
    return(p1+s+p2+s+p3+s+p4+s+p5+s+p6+s+p7)
  }// ----------------------------------------------------
  function q2(s){return('"'+s+'"')} 
  function qv2(p1,p2){ q='"';v='","';
    return(q+p1+v+p2+q)
  }// ----------------------------------------------------
  function qv8(p1,p2,p3,p4,p5,p6,p7,p8){ q='"';v='","';
    return(q+p1+v+p2+v+p3+v+p4+v+p5+v+p6+v+p7+v+p8+q)
  }// ----------------------------------------------------
  function qv9(p1,p2,p3,p4,p5,p6,p7,p8,p9){ q='"';v='","';
    return(q+p1+v+p2+v+p3+v+p4+v+p5+v+p6+v+p7+v+p8+v+p9+q)
  }// ----------------------------------------------------
  /* IE only * /
  function sys(){ var s=''
    @if(@_win32)   s+="win32 "   @end
    @if(@_win16)   s+="win16 "   @end
    @if(@_mac)     s+="mac   "   @end
    @if(@_alpha)   s+="alpha "   @end
    @if(@_x86)     s+="x86   "   @end
    @if(@_mc680x0) s+="mc680x0 " @end
    @if(@_PowerPC) s+="PowerPC " @end
    return s
  }// ----------------------------------------------------
  /* IE only */
  
// \xdd     Character with Latin-1 encoding specified by two hexadecimal digits  
// \udddd   Character with Unicode encoding specified by four hexadecimal digits  
  function hex2(n){ var s='00'; // n=0..255  to h=00..ff
    var h=['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
    // out('hex('+n+')=')
    if (n==0) s='00';
    else if (0<n && n<=255) {
        var i=Math.ceil(n/16)-1;
        var j=n%16;
        s=h[i]+h[j];
    } else s='??';
    // out(s+'<br>')
    return s;
  }// ---------------------------------------------------- 
  function hex(n){
    return n.toString(16);  // n.toString(radix_2_36)
  }// ----------------------------------------------------
  function hex8Vol(ni){
    n=ni; maxn=4294967295;/*ffff-ffff*/;
    var nh,nhex,l,m,i,h=['0','0','0','0'   ,'0','0','0','0'];
    if      (n<0)    {n=maxn+n+1;} 
  //else if (n>maxn) {}// cut only last 8 hex digits       !?
    nh=n.toString(16).toUpperCase();
    l=nh.length; m=8-l;
    for (i=m+1; i<=8; i++) h[i-1]=nh.charAt(i-m-1); // align to right 8 pos
    nh=''; for (i=1; i<=8; i++) {nh+=h[i-1];}
    nhex=groupCharsBy(nh,4,1,'-');
    return nhex ;
  }// -------------------------------------------------
  function groupCharsBy(n,by_m,ch){
    var l=n.length;
    var m=''; var j=0; // s=''   
    for (i=l; i>=1; i--) {j++;
      m=n.charAt(i-1)+m;
      if(j<l && divisible(j,by_m)) {m=ch+m;} //  s+=j+' '
    }
    return m;//   +'(lng:'+l+' by:'+by_m+')'+s
  }// -------------------------------------------------
/* test string utils * / 
  out('* delstr("x123456789",0,1):'+   delstr('x123456789',0,1)+eol)
  out('* delstr("012xx56789",3,2):'+   delstr('012xx56789',3,2)+eol)
  out('* delstr("012345678x",9,1):'+   delstr('012345678x',9,1)+eol)
  
  out('* ChRpt ("a",1):'+ChRpt("a",1)+' ChRpt("b",6):'+ChRpt("b",6)+eol)

  out('* FindStr("ab","012345678abe67"):'+FindStr("ab","012345678abe67")+eol)
  out('* FindStr("ab","abe67"):'+FindStr("ab","abe67")+eol)
  
  out('* TrimSP("a c "     ,"B")="'+TrimSP("a c "     ,"B")+'"'+eol)
  out('* TrimSP(" abc   "  ,"B")="'+TrimSP(" abc   "  ,"B")+'"'+eol)
  out('* TrimSP("   a c   ","L")="'+TrimSP("   a c   ","L")+'"'+eol)
  out('* TrimSP("   a c   ","R")="'+TrimSP("   a c   ","R")+'"'+eol)
  out('* TrimSP("   a c   ","B")="'+TrimSP("   a c   ","B")+'"'+eol)
  
  n=4294967295
  out( groupCharsBy(n.toString(16),4,'-')+eol )
  out( groupCharsBy(n.toString(10),3,' ')+eol )
  out( groupCharsBy(n.toString( 8),2,' ')+eol )
  out( groupCharsBy(n.toString( 2),4,' ')+eol )

/* test string utils */ 
/* ---------------------------------------------- Keywords
The following keywords are part of the JavaScript language, 
and have special meaning to the JavaScript interpreter. 
Therefore, they may not be used as identifiers: 

break     do        if         switch  typeof        
case      else      in         this    var   
catch     false     instanceof throw   void  
continue  finally   new        true    while 
default   for       null       try     with
delete    function  return

JavaScript also reserves the following words for possible future extensions. 
You may not use any of these words as identifiers either: 

abstract  enum        int        short
boolean   export      interface  static
byte      extends     long       super
char      final       native     synchronized
class     float       package    throws
const     goto        private    transient
debugger  implements  protected  volatile
double    import      public
/* ---------------------------------------------- */
// s.toString(); toString(radix_2_36) ; toLocaleString( ) - punctuations
// n.toFixed(digits_0_20); n.toExponential(digits_0_20) 
// s.substring(fr0,to+1); s.toUpperCase(); s.toLowerCase()
// s.indexOf(ch); s.indexOf(ch,from_pos);s.lastIndexOf(ch);
// ch=si.charAt(i); s=str.charCodeAt(n - 1); // Return Unicode character code.

//// some Perl 5 regular expressions implrmented in js
//// var str = "johndoe@somedomain.com";
//// var pattern =
//// /^([a-zA-Z0-9])+([\.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)+/;
//// str.search(pattern)// returns 0

//// var str = "yo ho ho and a bottle of gum";
//// str.replace(/gum/gi,"rum") // g:global, i:insensitive case, m:multi-line 
//----------------------------------------
/* ---------------------------------------------- escape sequences: 
\b       Backspace
\f       Form feed
\n       Newline
\r       Carriage return
\t       Tab
\'       Apostrophe or single quote that does not terminate the string
\"       Double-quote that does not terminate the string
\\       Single backslash character
\xdd     Character with Latin-1 encoding specified by two hexadecimal digits dd 
\udddd   Character with Unicode encoding specified by four hexadecimal digits dddd 
/* ---------------------------------------------- */
load_end(); // _load._end()