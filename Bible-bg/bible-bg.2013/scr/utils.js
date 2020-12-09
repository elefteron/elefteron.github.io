_load._new('scr/utils.js')
function zbcv2str(zNm,bNo,cNo,vNo1,vNo2){// -> zbcv
  var zbcv=zNm+'.'+bNo2bNm(zNm,bNo)+'.'+cNo+':'+vNo1
  if(!undef(vNo2) && vNo2!='' && vNo2>0) zbcv+='-'+vNo2
  return zbcv 
}
function  bcv2str(zNm,bNo,cNo,vNo1,vNo2){// -> bcv
  var  bcv=        bNo2bNm(zNm,bNo)+'.'+cNo+':'+vNo1
  if(!undef(vNo2) && vNo2!='' && vNo2>0) bcv+='-'+vNo2
  return bcv
}
function bNo2bNm(zNm,bNo){ var bNm=''
err=''; 
  if      (zNm==Zavet.nt.name){
    if(isNaN(bNo)){bNm=bNo// if is valid bkname - nothing todo
      for (j=1; j<=27; j++){ if(bNm.toUpperCase().indexOf(nh_[j].toUpperCase())>=0) return bNm }
    }else if(bNo>=1 && bNo<=27) {bNm=nh_[bNo];return bNm}
    err='bad bNo='+bNo //nh[bNo][0]
  }else if(zNm==Zavet.ot.name){
    if(isNaN(bNo)){bNm=bNo// if is valid bkname - nothing todo
      for (j=1; j<=50; j++){ if(bNm.toUpperCase().indexOf(oh_[j].toUpperCase())>=0) return bNm }
    }else if(bNo>=1 && bNo<=50) {bNm=oh_[bNo];return bNm}
    err='bad bNo='+bNo //oh[bNo][0]
  }else  err='bad zNm='+zNm+br;

  if(err!='') out(log_,'bNo2bNm: '+err+br);
  if(dbg>0)   out(log_,'bNo2bNm: '+zNm+'.'+bNo+' ->'+bNm+br)
  return '?'  
}// ---
function bNm2bNo(zNm,bNm){ var bNo=0,err='', j;// bNm_to_bNo
  if      (zNm==Zavet.nt.name){ 
    for (j=1; j<=27; j++){ if(bNm.toUpperCase().indexOf(nh_[j].toUpperCase())>=0){ bNo=j;break} }
    if(bNo<1) err=' Неразпознато име на книга:' +zNm+'.'+bNm+' ->'+bNo
  }else if(zNm==Zavet.ot.name){ 
    for (j=1; j<=50; j++){ if(bNm.toUpperCase().indexOf(oh_[j].toUpperCase())>=0){ bNo=j;break} }
    if(bNo<1) err=' Неразпознато име на книга:'+zNm+'.'+bNm+' ->'+bNo
  }else       err=' bad zNm='+zNm+' ';

  if(err!='') {out(log_,'bNm2bNo: '+err+br); bNo=0}
  if(dbg>1)    out(log_,'bNm2bNo: книга:'+zNm+'.'+bNm+' ->'+bNo+br)
  return bNo 
}// ---
var err=''
var alerts=10
function parselink(link_){ // 'NT.27|Откр.12:20-23' -> [zNm, bNo, cNo, vNo1, vNo2], err
  err=''; if(undef(link_)){err='undef. link'; 
    if(alerts>0) {alert('parselink:err='+err+eol); alerts--}
    return err
  }
  var parsed={zNm:'', bNo:0, cNo:0, vNo1:0, vNo2:0}
  var link=link_, i
  i=link.indexOf('-'); if(i>=0) link=link.substring(0,i)+'.'+link.substring(i+1,link.length)
  i=link.indexOf(':'); if(i>=0) link=link.substring(0,i)+'.'+link.substring(i+1,link.length)
  i=link.indexOf(' '); if(i>=0) link=link.substring(0,i)+'.'+link.substring(i+1,link.length)
  i=link.indexOf(','); if(i>=0) link=link.substring(0,i)+'.'+link.substring(i+1,link.length)
  var a=link.split('.'); 
  if     (undef(a[0])) err+='липсва име на завет '
  else if(undef(a[1])) err+='липсва име/номер на книга '
  else if(undef(a[2])) err+='липсва име на глава '
  else if(undef(a[3])) err+='липсва име на стих '
  else{ parsed.zNm=a[0];  parsed.bNo=a[1];  parsed.cNo=a[2]; parsed.vNo1=a[3]; 
    if(undef(a[4])) parsed.vNo2=0; else parsed.vNo2=a[4];
  }
  if(parsed.zNm!=Zavet.ot.name && parsed.zNm!=Zavet.nt.name){ 
    err+='невалидно Име на завет:'+parsed.zNm+' ';
  }
  if(err!=''){ out(log_,' parselink:"'+link+'" err:'+err+br); return err}
  //--
  if(isNaN(parsed.bNo)) parsed.bNo=bNm2bNo(parsed.zNm,parsed.bNo); // name to num
  if(err!=''){ out(log_,' parselink:"'+link+'" err:'+err+br); return err}
  if(dbg>1) with(parsed) { // cut lead zeroes, convert to number, check
    bNo=bNo/1; cNo=cNo/1; vNo1=vNo1/1; vNo2=vNo2/1;
    if(bNo <1 || bNo > 50 || isNaN(bNo ) || undef(bNo )){err+='невалидна книга:'  +bNo +eol;}
    if(cNo <1 || cNo >151 || isNaN(cNo ) || undef(cNo )){err+='невалидна глава:'  +cNo +eol;}
    if(vNo1<1 || vNo1>176 || isNaN(vNo1) || undef(vNo1)){err+='невалиден стих-от:'+vNo1+eol;}
    if(vNo2<0 || vNo2>176 || isNaN(vNo2) || undef(vNo2)){err+='невалиден стих-до:'+vNo2+eol;}
    if(err!='') err=' err:'+err
    out(log_,'parselink:"'+link+'"->'+zNm+'.'+bNo+'.'+cNo+'.'+vNo1+'-'+vNo2+err+br)
    if(err!='') return err
  }  
  with(parsed) return [zNm, bNo, cNo, vNo1, vNo2]
}// ---
function check_lnk(lnk){ // 'NT.27.12.20-23' -> [zNm, bNo, cNo, vNo1, vNo2], err
  err=''
  var parsed={zNm:lnk[0], bNo:lnk[1], bNm:lnk[1], cNo:lnk[2], vNo1:lnk[3], vNo2:''}
  if(!undef(lnk[4])) parsed.vNo2=lnk[4]
  if(parsed.zNm!=Zavet.ot.name && parsed.zNm!=Zavet.nt.name){ 
    err+='невалидно Име на завет='+parsed.zNm; fatal=true; 
  }else { 
    with(parsed) {
      if(isNaN(bNm)) bNo=bNm2bNo(zNm,bNm);    
      bNo=bNo/1; cNo=cNo/1; vNo1=vNo1/1; vNo2=vNo2/1;
      if(bNo <1 || bNo > 50 || isNaN(bNo ) || undef(bNo )){err+='невалидна книга='  +bNo +eol; fatal=true;}
      if(cNo <1 || cNo >151 || isNaN(cNo ) || undef(cNo )){err+='невалидна глава='  +cNo +eol; fatal=true;}
      if(vNo1<1 || vNo1>176 || isNaN(vNo1) || undef(vNo1)){err+='невалиден стих-от='+vNo1+eol; fatal=true;}
      if(vNo2<0 || vNo2>176 || isNaN(vNo2) || undef(vNo2)){err+='невалиден стих-до='+vNo2+eol; fatal=true;}
    } 
  }
  if(err!='') {out(log_,' check_lnk:"'+lnk+'" err:'+err+br)}
  if(dbg>1) with(parsed) out(log_,'check_lnk:"'+lnk+'"->'+zNm+'.'+bNo+'.'+cNo+'.'+vNo1+'-'+vNo2+br)
  return err
}// ---
function bib_lnk(lnk,nam,evnt,tt,cm_,fndstr,flg){ // bib_lnk('NT.3.11.2-4','2-4')
      // bib_lnk([lnk],name,evnt,tit,cm_,fndstr,flagbgclr) lnk=Zno+bcv ,cmodel='L', flagbgclr='N'
  err=check_lnk(lnk)
  if(err!='') return err  
  var parsed={zNm:lnk[0], bNo:lnk[1], bNm:lnk[1], cNo:lnk[2], vNo1:lnk[3], vNo2:''}
  parsed.bNm=bNo2bNm(parsed.zNm,parsed.bNo)
  if(err!='') return err
  if(!undef(lnk[4])) parsed.vNo2=lnk[4]

  var sevt='', fnd=''  // href#slnk 
  with(parsed){
    var slnk=zbcv2str(zNm,bNo,cNo,vNo1,vNo2)
    var snam= bcv2str(zNm,bNo,cNo,vNo1,vNo2)
    var stit=snam+' ('+zNm+'.'+bNo+') '; 
  }
  if(!undef(   nam) &&    nam!='') snam=nam    // show nam (in menu) not lnk
  if(!undef(    tt) &&     tt!='') stit=tt     // title
  if(!undef(  evnt) &&   evnt!='') sevt=evnt   // event
  if(!undef(fndstr) && fndstr!='')  fnd=fndstr // fndstr
  var cm='R'
  if(!undef(   cm_) && (cm_=='R')||(cm_=='L')) cm=cm_
  var trg='txt_', r=''; 
  if(cm=='R'){// call method: Run javascript
    with(parsed) // showchap() need of: show.js, outfmt.js
//   sevt+="out(txt_,showchap('"+zNm+"',"+bNo+","+cNo+","+vNo1+","+vNo2+",'"+fnd+"'));"; 
     sevt+="htmCont('txt_',showchap('"+zNm+"',"+bNo+","+cNo+","+vNo1+","+vNo2+",'"+fnd+"'));"; 
    r='href="javascript:'+sevt +'"'+par('title',stit)
    //+par('target',trg)
  }else{            // cm_=='L'  // call method: Load file - default
    var s0=pathpages+'Bible-BG.show.htm'
    r='href="'+s0+'#'+slnk+fnd+'"'+par('target',trg)+par('title',stit)/**/+par('onclick',sevt)/**/ 
  }       
  function spanbgclr(zNm,s,flg){// <- link get color from .css name #NT or # OT
    //var lnkw=/* 4+3+3+1+3 +1*/14*5; // lnkw=par('width',lnkw)
    // +par('style','width:'+lnkw+';') // dont work !?
    if(flg!='N') return '<span '+par('id',zNm)+'>'+s+'</span>';  
    else return s
  }// ---
  if(dbg>1) with(parsed) 
    out(log_," bib_lnk(['"+zbcv2str(zNm,bNo,cNo,vNo1,vNo2)+"])"
       +' fnd:'+fnd+' slnk:'+slnk+' snam:'+snam+' r:'+r+' cm:'+cm+br)
  return spanbgclr(parsed.zNm,'<a '+r+'>'+snam+'</a>',flg)+' '
}// ---
function biblink(link){// biblink('NT.3|'Лука'.11.2-4') ->bib_lnk(['NT',3,11,2,4])
  var parsed=parselink(link)
  if(err!='') return err
  return bib_lnk(parsed)
}

function lnk(nam,adr){t=' target="_blank"' // _blank _self 
  return '<a'+par('href',adr)+par('title',adr)+'>'+nam+'</a>'
}// ---
function lnk_to(ref,newtarget,t1,t2_,evnt){ var t2; 
  t2 =t1;    if(typeof(t2_      )!="undefined" && t2_      !='') t2=t2_;
  trg='txt'; if(typeof(newtarget)!="undefined" && newtarget!='') trg=newtarget; 
  return ('<a '
          +par('title',t2)+par('target',trg)+par('href',ref)+evnt
          +'>'+t1+'</a>'+eol) 
  // class="n" onclick="h(this);"
}// ---                                                 
function icon(p,n,h) {
  var h_=icoh;if(h && h!='')h_=h;h_=par('height',h_) // h=300
//w_=icow;if(w && w!='')w_=w;w_=par('width' ,w_) // w=200 
  var n_='';if(n.length<20)n_='<br>&nbsp;'
  return('<table><tr>'+eol
   +'<td>'+'<a><img src="'+pathicons+p+'"'+h_+' border="2"'
          +par('alt',p+'; икона '+n)+par('title',p+'\nикона '+n)+'></a>'
   +'<\/td></tr><tr>'+eol
   +'<td align="right">икона <b>"'+n+'"<\/b>'+n_
   +'<\/td><\/tr><\/table><br>'+eol)
}// ---
function n2(n){var nn=n; if(nn<10)  nn='0'  +nn; return(nn)} // lead zero 
function n3(n){var nn=n; if(nn<10)  nn='00' +nn; if(nn<100) nn='0'+nn; return(nn)} // lead zero 
function fc(n,xx,ch,ermsg){// fill chars leftward fc(n,999,'0'); 
  ermsg=''
  if (typeof  n=='undefined') {ermsg+='fc 1:  n=undefined|'+eol}
  if (typeof xx=='undefined') {ermsg+='fc 2: xx=undefined|'+eol}
  if (typeof ch=='undefined') {ermsg+='fc 3: ch=undefined|'+eol}
  if (ermsg!=''){alert('fc() err:'+eol+err); return}
   var s=''; c=ch; if(c=='') c=' '; x=xx; if (x<1) x=1
   for (var i=1; i<=x; i++) s+=c; 
   s=s+n; l=s.length; str='';
   for (var i=x; i>=0; i--) str+=s.charAt(l-i)
   return str
}// ---
function par(nam,val)        {
  if(nam!='' && val!=''){return ' '+nam+'="'+val+'"'}else return '';
}
function par_st(nam,val)        {
  if(nam!='' && val!=''){return ' '+nam+':'+val+';'}else return '';
}
//sel('format',event,'.htm',sar,3)// sar=new Array()=('.htm','.xml','.js')
function sellist(n,defNo,sar,vsz_,evnt_){var vsz='' ,evnt='' ,tit='',val='';
  if (vsz_  && parseInt(vsz_)>0) vsz =par('size'    ,vsz_)
  if (evnt_ && evnt_!='')        evnt=evnt_// onchange,onselect,....?
  s='<select'+par('id',n)+vsz+evnt+'>'+eol // name,id
  for (i=0; i<=sar.length-1; i++) { sdef='' // i=0
    if (i==defNo) sdef=' selected '   // sar[i]...
    tit=par('title',sar[i])
    val=par('value',i)
    s+='<option'+sdef+val+tit+'>'+sar[i] +eol
  }//end for
  s+='</select>'
  return s
}// ---
function inText(n,sz,val,t,evnt_)  {
	var evnt=''; if(evnt_)evnt=par('onchange',evnt_)
	return '<input type=text'+par('id',n)+par('size',sz)+par('value',val)
	       +par('title',t)+evnt /*?+par('height',12)/**/+'>'
}
function fnt(sz,aln,clr,fc){ var s='<font'
  if( sz!='') s+=' size="' +sz +'"'; if(aln!='') s+=' align="'+aln+'"';   
  if(clr!='') s+=' color="'+clr+'"'; if( fc!='') s+=' face="' +fc +'"'; s+='>'
	return(s)
}// ---                                                                      
function btn(bname,btnclass,btnstyle,t_,evnt,acskey_){
	t='';      if(typeof(t_)!="undefined" && t_!=null)t=t_
	acskey=''; if(acskey_ && acskey_!='')   acskey=acskey_
	return '<input type=button'+par('class',btnclass)+par('ACCESSKEY',acskey)
	+par('style',btnstyle)// <-'width:17px;font-size:12px;'
	       +par('value',bname)+par('title',t)+par('onclick',evnt)+'>'
}
function intok(ch){
  var tokens=[' ','.',':',',',';','!','?',"'",'"','*','#','=','|'   ,'(',')','[',']','<','>','{','}'] 
  tl=tokens.length // без '-' по-големи и без ударение '`' - Вара`ва
  for (k=0; k<=tl-1; k++){ if(ch==tokens[k]) return true;}
  return false
}// ---
function row2(clr,a,b){ c='';t='<tr valign="top">' 
  if(typeof(clr)!="undefined" && clr!='')  c=par('BGCOLOR',clr); else c=par('BGCOLOR',defrow1clr)
	return t+'<td'+c+'>'+a+'</td>'// +col1wid
	        +'<td'+par('BGCOLOR',defrow2clr)+'>'+b+'</td></tr>'
}// ---
function row1(clr,a){ c='';t='<tr valign="top">'
  if(typeof(clr)!="undefined" && clr!='')  c=par('BGCOLOR',clr); else c=par('BGCOLOR',defrow1clr)
	return t+'<td'+c+'>'+a+'</td></tr>'
}// ---
/* getdate() usage:
  f1=getdate();dt1=dt; ... f2=getdate();dt2=dt;
  out(' dur:'+(f2-f1)+' from:'+dt1+' to:'+dt2+eol)
*/     
var dt,ti
function getdate(){dt='';ti='';
 brw=browserID()
 var date=new Date(); 
  with (date) {
    var y=getFullYear();  var m=getMonth()+1; var d=getDate();
    var h=getHours(); var n=getMinutes(); var s=getSeconds();
  //if(y<1900 && (brw=='SM' || brw=='NS' || brw=='FF' || brw=='KQ')){y+=1900}
    var ti=h*3600+n*60+s
                     if(m<=9)m='0'+m; if(d<=9)d='0'+d;
    if(h<=9)h='0'+h; if(n<=9)n='0'+n; if(s<=9)s='0'+s;
    dt=y+'-'+m+'-'+d+' '+h+':'+n+':'+s;
  }
  return ti
}// --- 
/* highlight js-bookmarklet from: http://www.squarefree.com/bookmarklets/ */
/* usage example:
   if(fndstr && fndstr!=''){
     count=highlight(fndstr,bghi,fghi); // -1:text empty,0..n:count
     if(count>0) out(log_,'маркирани са '+count+' броя на "'+fndstr+'"'+eol)
   }
/* */
function highlight(text,bghi,fghi){
	var count=0, dv;
//var text=prompt("Търсена фраза:", "");
	if(text==null || text.length==0)return -1;
	dv=document.defaultView;
	function searchWithinNode(node, te, len){
		var pos, skip, spannode, middlebit, endbit, middleclone;
		skip=0;
		if( node.nodeType==3 ){
			pos=node.data.toUpperCase().indexOf(te);
			if(pos>=0){
				spannode=document.createElement("SPAN");
				  spannode.style.backgroundColor=bghi; spannode.style.color=fghi;
				middlebit=node.splitText(pos);
				endbit=middlebit.splitText(len);
				middleclone=middlebit.cloneNode(true);
				spannode.appendChild(middleclone);
				middlebit.parentNode.replaceChild(spannode,middlebit);
				++count;
				skip=1;
			}
		}else if( node.nodeType==1&& node.childNodes && node.tagName.toUpperCase()!="SCRIPT" && node.tagName.toUpperCase!="STYLE"){
			for (var child=0; child < node.childNodes.length; ++child){child=child+searchWithinNode(node.childNodes[child], te, len);}
		}
		return skip;
	}
	//window.status="търся...";
	searchWithinNode(document.body, text.toUpperCase(), text.length);
	// window.status="Found "+count+" occurrence"+(count==1?"":"s")+" of '"+text+"'.";
	return count
}// ---
/*
id="T"
<script for="T" event="onmouseover">window.status = this.name; return true;</script>
<script for="T" event="onmousedown">window.status = this.name; return true;</script>
<script for="T" event="onmouseup">window.status = this.name; return true;</script>
<script for="T" event="onfocus">window.status = this.name; return true;</script>
<script for="T" event="onmouseout">window.status = ''; return true;</script>
*/
// <a href="../scr/Bible-BG.show.htm#АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя" title="АБВ">АБВ</a>
// %C0%C1%C2%C3%C4%C5%C6%C7%C8%C9%CA%CB%CC%CD%CE%CF%D0%D1%D2%D3%D4%D5%D6%D7%D8%D9%DA%DB%DC%DD%DE%DF%E0%E1%E2%E3%E4%E5%E6%E7%E8%E9%EA%EB%EC%ED%EE%EF%F0%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FB%FC%FD%FE%FF
// ?<form ENCTYPE="" ? or 'encoding' object model property for attribute
// %C8%E7%F0%E0%E8%EB "ascii":израил "utf8":E`c,?a`e`e"
// url encode="windows-1251"
function unescape_ascii_cyr(s){
	    // unicode? 1byte  
   cht='%C0%C1%C2%C3%C4%C5%C6%C7%C8%C9%CA%CB%CC%CD%CE%CF'
      +'%D0%D1%D2%D3%D4%D5%D6%D7%D8%D9%DA%DB%DC%DD%DE%DF'
      +'%E0%E1%E2%E3%E4%E5%E6%E7%E8%E9%EA%EB%EC%ED%EE%EF'
      +'%F0%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FB%FC%FD%FE%FF%20'
      //1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6
   cha='АБВГДЕЖЗИЙКЛМНОП'+'РСТУФХЦЧШЩЪЫЬЭЮЯ'+'абвгдежзийклмноп'+'рстуфхцчшщъыьэюя'+' ' // ascii cyr
     // 1234567890123456   1234567890123456   1234567890123456   1234567890123456   1
   // %C0..%FF -> 192..223,224..255; Э=alt-0221 (DD)
   chs_=  s.split("%"); ls=chs_.length;  // [0] is empty !
   cht_=cht.split("%"); lt=cht_.length;  // [0] is empty !
// out(log_,'unescape_ascii_cyr:'+eol+ls+' chs_='+chs_+eol/*+lt+' cht_='+cht_+eol*/)
   res=''
   for (var i=1; i<=ls; i++){ fnd=false 
     for (var j=1; j<=lt; j++) {// h=j.toString(16)
       if(chs_[i]==cht_[j]){ res+=cha.charAt(j-1)
//  unicode,ie: String.fromCharCode([code1[, code2[, ...[, codeN]]]])  ?not tested
         fnd=true; break
       } 
     }
     if(!fnd) res+=unescape(chs_[i])
   }
   return res
}// ---
/* dont work correct *-/
function unescape_ascii_cyr2(s){
      // unicode 2bytes - firefox
   cht='%D0%90%D0%91%D0%92%D0%93%D0%94%D0%95%D0%96%D0%97'+'%D0%98%D0%99%D0%9A%D0%9B%D0%9C%D0%9D%D0%9E%D0%9F'
      +'%D0%A0%D0%A1%D0%A2%D0%A3%D0%A4%D0%A5%D0%A6%D0%A7'+'%D0%A8%D0%A9%D0%AA%D0%AB%D0%AC%D0%AD%D0%AE%D0%AF'
      +'%D0%B0%D0%B1%D0%B2%D0%B3%D0%B4%D0%B5%D0%B6%D0%B7'+'%D0%B8%D0%B9%D0%BA%D0%BB%D0%BC%D0%BD%D0%BE%D0%BF'
      +'%D1%80%D1%81%D1%82%D1%83%D1%84%D1%85%D1%86%D1%87'+'%D1%88%D1%89%D1%8A%D1%8B%D1%8C%D1%8D%D1%8E%D1%8F'
   cha='АБВГДЕЖЗИЙКЛМНОП'+'РСТУФХЦЧШЩЪЫЬЭЮЯ'+'абвгдежзийклмноп'+'рстуфхцчшщъыьэюя' // ascii cyr
     // 1234567890123456   1234567890123456   1234567890123456   1234567890123456   1
   chs_=  s.split("%"); ls=chs_.length;  // [0] is empty !
   cht_=cht.split("%"); lt=cht_.length;  // [0] is empty !
   res=''
   for (var i=1; i<=ls; i=i+2){ fnd=false 
     k=0
     for (var j=1; j<=lt; j=j+2) {k++
       if(chs_[i]+chs_[i+1]==cht_[j]+cht_[j+1]){ res+=cha.charAt(k)
//  unicode,ie: String.fromCharCode([code1[, code2[, ...[, codeN]]]])  ?not tested
         fnd=true; break
       } 
     }
     if(!fnd) res+=unescape(chs_[i])
   }
   return res
}// --- /**/
function Tab(t,r1,r2,c1,c2,s,hd,hdclr){ var row,col
  buf='<table'+s+'>'+eol
  for   (row=r1; row<=r2; row++){
        buf+='<tr valign="top">'+eol       
    for (col=c1; col<=c2; col++){                    hc=par('bgcolor','#203040')
      if((col==c1 && hd=='c')||(row==r1 && hd=='r')) hc=par('bgcolor',hdclr)
        buf+='<td'+hc+'>'+eol+t[row][col]+eol+'</td>'+eol}   
        buf+='</tr>'+eol
  }
  buf+='</table>'+eol
  return buf
}//--------------------------------------  
/* TransposeTab test: *-/
var t1=[];t1[0]=[];t1[1]=[];
  t1[0][0]='a';t1[0][1]='b';t1[0][2]='c';
  t1[1][0]='d';t1[1][1]='e';t1[1][2]='f';
  out(Tab(t1,0,1, 0,2,' border="1"','r','maroon')) 
  t2=TransposeTab(t1,1,2)
  out('t1=['+t1[0]+']['+t1[1]+']<br>'+'t2=['+t2[0]+']['+t2[1]+']['+t2[2]+']<br>')
  out(Tab(t2,0,2, 0,1,' border="1"','c','maroon'))
/* :test */
function TransposeTab(t1,r,c){
 var t2=[]; for (var col=0; col<=c; col++) t2[col]=[];
 for (var row=0; row<=r; row++){   
   for (var col=0; col<=c; col++){ t2[col][row]=t1[row][col]
/* test: *-/
     out('<pre>'
        +' r:'+row  +' c:'+col  +' t1[r][c]='+t1[row][col]  +' -> t2[c][r]='+t2[col][row]
        +'</pre>\n')
/* :test */
   }  
 }
 return t2
}// ---
function load_tst(name,isload,toload){ // by findtt.js
  var buf=name+': ';
  if(isload==toload) buf+='modules load ok.'+eol;else buf+='some modules not load!' 
    var isload_=isload.split(';') ,isloadlng=isload_.length-1 
       ,toload_=toload.split(';') ,toloadlng=toload_.length-1; 
	buf+=' isload:0..'+isloadlng+eol +' toload:0..'+toloadlng+eol
    if(dbg>0)buf+=br+' isload:'+isload_+eol+br +' toload:'+toload_+eol
    buf+='<table><tr>'
    for(var i=0; i<=toloadlng; i++){ 
      var status='miss',clr='red';
	  for(var j=0; j<=isloadlng; j++) 
	    if(toload_[i]==isload_[j]) {status='ok';clr='blue'; j=isloadlng;}
	  if(i==7 || i==14) buf+='<\/tr><tr>';	
	  buf+='<td>'+toload_[i]+':<\/td><td>'+'<font'+par('color',clr)+'>'+status+'<\/font>'+'<\/td>';
    }
    buf+='<\/tr><\/table>';
	return buf
}// ---
function repl_1quotes(txt){
  txt_=''; // replace ' -> \\'
  for (j=0; j<=txt.length-1; j++){// err if txt undef 
    ch=txt.substr(j,1)
    if(ch!="'") txt_+=ch; else txt_+="\\'" // result is \' in text
  }
  return txt_
}// ---  
function repl_2quotes(txt){ 
  txt_=''; // replace " -> \'\'   or   \\"
  for (j=0; j<=txt.length-1; j++){ ch=txt.substr(j,1)
    if(ch!='"') txt_+=ch; else txt_+='\'\''
  }
  return txt_
}// --- 
/* // --  write to frames:
  function outfrm(frm,s){
         if(frm==idx) parent.idx.document.write(s); // idx frame 1
    else if(frm==txt) parent.txt.document.write(s); // txt frame 2
    else if(frm==fnd) parent.fnd.document.write(s); // fnd frame 3
    else if(frm==log){ 
	     if(parent.log) parent.log.document.write(s); else document.write(s)
    }
  }// ---
/* *-/
  function opn()  {document.open();}
  function cls()  {document.close();}
//function out(s) {document.write(s)}// current. in htm,out_ver,... 
  
  function opni() {parent.idx.document.open();}
  function clsi() {parent.idx.document.close();}
//function outi(s){parent.idx.document.write(s);} // idx frame 1
  
  function opnt() {parent.txt.document.open();}
  function clst() {parent.txt.document.close();}
//function outt(s){parent.txt.document.write(s);} // txt frame 2
  
  function opnf() {parent.fnd.document.open();}
  function clsf() {parent.fnd.document.close();}
//function outf(s){parent.fnd.document.write(s);} // fnd frame 3
  
  function opnl() {
  //w=300; h=700; x=0;y=0;    log=null
  //winFeatures= "toolbar=no,titlebar=yes,channelmode=no,status=yes,menubar=no,scrollbars=yes"
  //           + ",location=no,directories=no,resizable=yes"
  //           + ',width=' +w+ ',height=' +h+'top='+x+',left='+y
  //log=window.open('','---log---',winFeatures) //window.top.open
    parent.log.document.open();
  }// ---
  function clsl() {parent.log.document.close()}// document.clear() ie
//function out(log_,s){ out(log_,s)
	//if(parent.log)parent.log.document.write(s); else document.write(s)
  } // log.document.write(s) ?
// ---
/* */
function checkBCV_hdr(zNm,tt,th){ var html=''
   if( !(zNm==Zavet.nt.name || zNm==Zavet.ot.name) || undef(tt) || undef(th)){
     out(log_,'checkBCV_hdr: bad parameters.'+eot); 
     return
   }
   out(log_,'checkBCV_hdr:'+zNm+' begin'+eot)
   if(zNm==Zavet.nt.name)maxbooks=27; else maxbooks=50; Ccnt=Vcnt=Vmiss=Vnew=0
   for (var bNo=1;     bNo<=maxbooks;       bNo++){ 
     html+=br+'кн.'+bNo           +': '+tt[bNo][0]
     for (var cNo=1;   cNo<=th[bNo][2];     cNo++){ 
       html+=br+'кн.'+bNo+' гл.'+cNo+': '+tt[bNo][cNo][0]
       v=0; Ccnt++
       for (var vNo=1; vNo<=th[bNo][2+cNo]; vNo++){ 
         // see no if bad range cNo in th[3+] or bad tt[] numeration!!
         if(undef(tt[bNo][cNo][vNo])){
           if(zNm==Zavet.ot.name && ((bNo==22 || bNo==23) && (vNo==1 || vNo==2))){ // skip 66 cases
           } else if(vNo<=th[bNo][2+cNo]) {Vmiss++; 
             msg='липсва стих#:'+bNo+'.'+cNo+'.'+vNo +br
             out(log_,msg)
             html+=br+msg
           }
         } else if(vNo> th[bNo][2+cNo]) {Vnew++;
             msg='добавен стих#:'+bNo+'.'+cNo+'.'+vNo +br
             out(log_,msg)      
             html+=br+msg
         } else {Vcnt++ // skip verses
             // v++;if(v==1) html+=br+'ст.:'+vNo;if(!tt[bNo][cNo][vNo]) html+='? '
             // html+=br+'кн.'+bNo+' гл.'+cNo+' ст.'+vNo+': '+tt[bNo][cNo][vNo]
         }
       }
     }
   }
   html+=br+'в '+zNm+' има '+maxbooks+' книги, '+Ccnt+' глави, '+Vcnt+' стиха.'+eot
   if(Vmiss>0) html+='липсват ' +Vmiss+' стиха.'
   if(Vnew>0)  html+='има нови '+Vnew +' стиха.'
   html+=br
   //clst();
   out(log_,'checkBCV_hdr: end'+br);//clsl();
   return html
}// ---
function gen_arrdef(){// generate js array definitions for "../scr/arrdef.js"
var txt=''
  for (var bNo=1; bNo<=27; bNo++){ 
  	txt+=br+'nt['+bNo+']=[];'                                       
  	for (var cNo=1; cNo<=nh[bNo][2]; cNo++){  
  		txt+='nt['+bNo+']['+cNo+']=[];'
  	}
  } txt+=br
  for (var bNo=1; bNo<=50; bNo++){   
  	txt+=br+'ot['+bNo+']=[];'                                         
  	for (var cNo=1; cNo<=oh[bNo][2]; cNo++){   
  		txt+='ot['+bNo+']['+cNo+']=[];' 
  	}
  } txt+=br;
  return txt
}
function gen_ar(zNm,key,bib_){ // export from already loaded testaments as .js
  if(key=='file' && !fs.ax._activexON){ out(txt_,'unable to run ActiveX!'+eol+br); return}
  var putjs=null,s // bib_='e:/Bible/'// - work dir
     // myroot+proj_+'Bible-bg.09/'+'Bible/' - bad path for activex!
	 // 'file:///e:/tedy/~my-dev/elefter.site/projects/Bible-bg.09/Bible/NT-01.bg.js'
  var txt=''
  if     (zNm==Zavet.nt.name){ 
  	for (var bNo=1; bNo<=27; bNo++){
	    if(key=='file'){ 
        file='NT-'+n2(bNo)+'.bg.js'// NT-01.bg.js 
		    out(txt_,"file:'"+bib_+file+"'")
		    openfile_to_put(bib_,file) 
		  }
		  bNo_=bNo; if(bNo<=9)bNo_=' '+bNo;
  	  s='nt['+bNo_+'][ 0]=\''+nt[bNo][0]+'\''+eol // hdr
		  if(key=='js')   txt+=s+br 
 		  if(key=='file') fput.write(s)
  		for (var cNo=1; cNo<=nh[bNo][2]; cNo++){        
		  //cNo_=n2(cNo); if(cNo>99)cNo_=n3(cNo);
		    cNo_=cNo; if(cNo<=9)cNo_=' '+cNo;
 			  for (var vNo=0; vNo<=nh[bNo][2+cNo]; vNo++){
			  //vNo_=n2(vNo); if(vNo>99)vNo_=n3(vNo);
			    vNo_=vNo; if(vNo<=9)vNo_=' '+vNo;
			    s='nt['+bNo_+']['+cNo_+']['+vNo_+']=\''+nt[bNo][cNo][vNo]+'\''+eol
  		  	if(key=='js')   txt+=s+br
			    if(key=='file') fput.write(s)
  			}    
  		}
      if(key=='file') fput.close()		
  	}
  }else if(zNm==Zavet.ot.name){ 
  	for (var bNo=1; bNo<=50; bNo++){                
	    if(key=='file'){
        file='OT-'+n2(bNo)+'.bg.js' 
		    out(txt_,"file:'"+bib_+file+"'")
		    openfile_to_put(bib_,file)
      }
		  bNo_=bNo; if(bNo<=9)bNo_=' '+bNo;
  	  s='ot['+bNo_+'][ 0]=\''+ot[bNo][0]+'\''+eol //hdr
		  if(key=='js')   txt+=s+br 
 		  if(key=='file'){ fput.write(s)}
  		for (var cNo=1; cNo<=oh[bNo][2]; cNo++){        
		    cNo_=cNo; if(cNo<=9)cNo_=' '+cNo;
  			for (var vNo=0; vNo<=oh[bNo][2+cNo]; vNo++){
			    vNo_=vNo; if(vNo<=9)vNo_=' '+vNo;
			    s='ot['+bNo_+']['+cNo_+']['+vNo_+']=\''+ot[bNo][cNo][vNo]+'\''+eol
  			  if(key=='js')   txt+=s+br
			    if(key=='file') fput.write(s)
 			  }  
  		}
      if(key=='file') fput.close()		
  	}
  }
  if (key=='js') return txt
}// ---
_load._end()