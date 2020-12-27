load_new('../lib/out-htm2.js') // _load._new('../lib/out-htm2.js')
var undef=function(v)        { return (typeof(v)=='undefined') } 
var par  =function(name,val) { 
  if (!undef(name) && !undef(val) && !(val==null || val=='')) 
    return (' '+name+'="'+val+'"')
}// -----------------------------------------------
  /* href,  title, alt, src, align, valign, bgcolor,
     name, ID, value, wrap, border, colspan, rowspan,
     size, width, height, cols, rows,
  */ 
/* -- reflist: (root=C:\alert.bg\my-dev\)
  sud-conv\sud-conv.hta
  sys-clr\sys-clr.hta
  dump-dir\2d\dump-dir2.hta, list-all, vol-content
  E+\E+adr.htm, e+url.htm, -activeX.htm, pic catalog.hta
----------------------------------------------------------  */
// http://www.htmlhelp.com/reference/html40/special/a.html
// http://www.irt.org
// -----------------------------------------------
  var top ='top' , middle='middle', bottom='bottom', baseline='baseline'
  var left='left', center='center', right ='right',  justify='justify'
  // -----------------------------------------------
  // s.bold() s.big() s.strike() s.blink() s.fixed() 
  // s.fontsize(2) s.fontcolor('cyan') s.sub(); s.sup() 
  // ----------------------------------------------------
  function clr(c,t){ return ('<font color="'+c+'">'+t+'</font>')}
  // ----------------------------------------------------
  function inText(n,sz,val,stl){// old: inText(n,par)
    var s=''; if(stl!='')  s='style="'+stl+'"'
    return ('<input type=text'+par('id',n)+par('size',sz)+par('value',val)+s+'>');
  }// ----------------------------------------------------
  function style(stl){return ' style="'+stl+'"';}
  function inArea(n,cols,rows,wrap,ext,body){
    var r='';// old=inArea(n,par,body)
    var s=''; if(stl!='')  s=style(stl)
    r='<textarea'+par('name',n)+par('cols',cols)+par('rows',rows)
    +par('wrap',wrap)+ext+s
    +'>'+body+'</textarea>';
  return (r);
/* ACCESSKEY=
   ALIGN=ABSBOTTOM | ABSMIDDLE | BASELINE | BOTTOM | LEFT | MIDDLE | RIGHT | TEXTTOP | TOP
   COLS=long // characters wide the text area 
   ROWS=long // number of rows tall the textarea control 
   WRAP=OFF | PHYSICAL | VIRTUAL  // word-wrapping  
      OFF      : disabled.default
      PHYSICAL : displayed and submitted as word-wrapped. 
      VIRTUAL  : word-wrapped but is submitted as typed.    
   TABINDEX=integer // Sets the tabindex for the object. 
      Tab selection order is determined by the value of tabIndex as follows:
      First all elements with TABINDEX > 0 are selected in increasing tabIndex order, or in source order for duplicate TABINDEX values
      Next all elements with tabIndex = 0, or without tabIndex set, in source order if more than one.
      Elements with tabIndex = -1 are omitted from tab selection. 
*/ 
  }// ----------------------------------------------------
  function btndef(bg,fg,border){//  'font-weight:' +fntw+';'
    return style('background-color:'+bg+';'+'color:'+fg+';'
	      +'border-color:'+border+';');
  }// ----------------------------------------------------
  function btn(name,stl,evnt){var s=[];
    s[1]='<input type=button';s[2]=par('value',name);
	s[3]=par(" style",stl); s[4]=par('onclick',evnt); s[5]='>'
//  alert(s[1]+'\n' +s[2]+'\n' +s[3]+'\n' +s[4]+'\n' +s[5]+'\n')
	return s[1]+s[2]+s[3]+s[4]+s[5];
  }// ----------------------------------------------------
function btnx(bname,btnclass,btnstyle,t_,evnt,acskey_){
	t='';      if(typeof(t_)!="undefined" && t_!=null)t=t_
	acskey=''; if(acskey_ && acskey_!='')   acskey=acskey_
	return '<input type=button'+par('class',btnclass)+par('ACCESSKEY',acskey)
	+par('style',btnstyle)// <-'width:17px;font-size:12px;'
	       +par('value',bname)+par('title',t)+par('onclick',evnt)+'>'
}
  function xbtn(id,btncss,onoutclr,onoverclr,value,onClick,p_) {
    p=''; if(typeof(p_)!="undefined")p=p_ // "window.parent.cmd.focus();"  
    return('<input type=button'+par('value',value)+par('onClick',onClick)
      +par('onMouseOver',"javascript:"+id+".style.color='"+onoverclr+"';") 
      +par('onMouseOut' ,"javascript:"+id+".style.color='"+onoutclr +"';")// this.style.color='white';"
      +par('name',id)+par('id',id)+par('class',btncss)+p+'>')
   // out(?,xbtn("save_btn","btnwr",'white','gold',"Save"     ,"saveDlg()"     ))
  }// ----------------------------------------------------
  function btnReset(name,evnt){
    return ('<input type=reset'+par('value',name)+' onclick="'+evnt+'">')
  }// ----------------------------------------------------
  //sel('format',event,'.htm',sar,3)// sar=new Array()=('.htm','.xml','.js')
  function sel(n,event,def,sar,vsz){var ssz=''; var sevent='';
    if (parseInt(vsz)>0) ssz   =par('size',vsz)
    if (event!='')     sevent=' onChange="'+event+'"'
    s='<select'+par('name',n)+ssz+sevent+'>\n'
    for (i=0; i<=sar.length-1; i++) { sdef='' 
      if (sar[i]==def) sdef=' selected'
      s+='<option'+sdef+par('value',sar[i])+'>'+sar[i]+'\n'
    }//end for
    s+='</select>'
    return (s);
  }// ----------------------------------------------------  
  function img(n,src,h,w,valn,ext){ 
  var s=''; // old: img(n,ext)
    if (n!='')    s+=par('name'  ,n);
    if (src!='')  s+=par('src'   ,src);
    if (h!='')    s+=par('height',h);
    if (w!='')    s+=par('width' ,w);
    if (valn!='') s+=par('valign',valn);
    return '<img'+s+ext+'>';
  }// ----------------------------------------------------
  function lnk(n,r,ext,b){
  var s=''; // lnk(n,ref,Ext,img+body+'txt')
                  s+=par('href'  ,r);
    if (n!='')    s+=par('name'  ,n);
    return '<a '+s+ext+'>'+b+'</a>';     // old: lnk(ref,par,body)
  }// ----------------------------------------------------  
  
  function tbl(par){return ('<table '+par+'>');}// --------
  function tblend(){return ('</table>');}       // --------
  function skipCol(l){
    s=''; for (i=1; i<=l; i++) s+='<td></td>';
    return (s); 
  }// ----------------------------------------------------

  function row(par,body){p=par;
    if (p.length>0 && p.charAt(0)!=' ') p=' '+p;
    return ('<tr'+p+'>\n'+body+'\n  </tr>\n');
  }// ----------------------------------------------------
  function data(par,body){p=par; t=body; 
    if (p   !='' && p.charAt(0)!=' ') p=' '+p;
    if (body=='') t='&nbsp;';
    return '  <td'+p+'>'+t+'</td>\n';
  }// ----------------------------------------------------
  function outrow(pic,name_,date,note,ref){
    var buf=row(par('bgcolor','gray'),
      data(align(center)              // img(n,src,h,w,valn,ext)
          ,lnk('',ref,par('title',date+note),img('',pic,32,32,'',align(left))) ) + 
      data(par('bgcolor',"darkgray")
          ,lnk('',ref,par('title',ref+'\n'+date+'\n'+note),name_))    )
    return buf
  }// ----------------------------------------------------
// <input type="file">  
load_end()// _load._end()