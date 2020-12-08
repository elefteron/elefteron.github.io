/* ах, чудна българска земьо, полюшвай цъфтящи жита! */
  test_gui=true
  
  function tbl(t,tx) { return '<table '+tx+'>'+crlf+t+'</table>'+crlf;}
  function row(r,rx) { return '<tr '+rx+'>'+crlf+r+'</tr>'+crlf;}
  function col(c,cx) { var cx_=''; if(cx!=undefined) cx_=cx; return '<td '+cx_+'>'+c+'</td>'+crlf; }
  function ht2(t,s)  { return '<'+t+'>'+s+'</'+t+'>'};
  function ht_out(s) { var i,l=s.length,b=''
	for(i=0;i<l;i++){ c=s.substr(i,1);
	  if(c=='<') b+='&lt;' 
	  else if(c=='>') b+='&gt;'//+'</br>'+crlf
	  else b+=c
	}
	return b
  }
  function url(url_)    { var n=url_.split('\\'); if (n.length<=1) n=url_.split('/'); // todo: activex: explorer path
    return '<a title="'+url_+'" href="file:///'+url_+'" target="self_">url</a>'; 
  }

// ---------------------------------------------------------------------
  function r(f,s){ var k=Math.pow(10,s); return Math.round(f*k)/k; }

  function set_val(id,t,v){ var id_=document.getElementById(id)
    if(undef(id_) || undef(t) || undef(v) ) { 
      msg(ht2('e','set_val() input "undefined par(s)"::'+' id:'+id+' type:'+t+' val:'+v+' ')); return;
    } else switch (t) {
      case 'val': id_.value       =v; if(test_gui && v!=id_.value       ) msg('set_val():: id:'+id+ht2('e',' value    : '+v+'!='+id_.value    )); break;
      case 'chk': id_.checked     =v; if(test_gui && v!=id_.checked     ) msg('set_val():: id:'+id+ht2('e',' checked  : '+v+'!='+id_.checked  )); break;
      case 'htm': id_.innerHTML   =v; if(test_gui && v!=id_.innerHTML   ) msg('set_val():: id:'+id+ht2('e',' innerHTML: '+v+'!='+id_.innerHTML)); break;
      case 'w'  : id_.width       =v; if(test_gui && v!=id_.width       ) msg('set_val():: id:'+id+ht2('e',' width    : '+v+'!='+id_.width    )); break;
      case 'h'  : id_.height      =v; if(test_gui && v!=id_.height      ) msg('set_val():: id:'+id+ht2('e',' height   : '+v+'!='+id_.height   )); break;
      case 'tit': id_.title       =v; if(test_gui && v!=id_.title       ) msg('set_val():: id:'+id+ht2('e',' title    : '+v+'!='+id_.title    )); break;
      case 'sz' : id_.size        =v; if(test_gui && v!=id_.size        ) msg('set_val():: id:'+id+ht2('e',' size     : '+v+'!='+id_.size     )); break;
      case 'chg': id_.onchange    =v; if(test_gui && v!=id_.onchange    ) msg('set_val():: id:'+id+ht2('e',' onchange : '+v+'!='+id_.onchange )); break;
      case 's_w': id_.style.width =v; if(test_gui && v!=id_.style.width ) msg('set_val():: id:'+id+ht2('e',' width    : '+v+'!='+id_.width    )); break;
      case 's_h': id_.style.height=v; if(test_gui && v!=id_.style.height) msg('set_val():: id:'+id+ht2('e',' height   : '+v+'!='+id_.height   )); break;
//    case 'stl': id_.style    =v; if(test_gui && v!==) msg('set_val:: id:'+id+' style    ='+id_.style    ); break;
//    set_val:: id:xprs style =[object MSStyleCSSProperties] 
 	  default:    msg(ht2('e','set_val():: unsupported type:'+t));
    }
  }

  function reloadPage(){ window.location.reload();} 
  function msg(s) { 
    if (typeof(s)===undefined || s==='') return;
    else if(typeof(msg_)===undefined){ alert('msg_:'+s); return}
    if (msg_===null) msg_.innerHTML =s+crlf+'<br>'; // new content
    else             msg_.innerHTML+=s+crlf+'<br>'; // append

  }
// --------------------------------------------------------
  function chk_par(){var mes='', br='<br/>'// check par and chk_par
	 par_ok=true
     if(undef(par[p].order) || has_char(par[p].order,['?','*',':','<','?','>','|']) ) {par_ok=false; mes+='! невалиден символ в order'+br}
     if(undef(par[p].id)    || has_char(par[p].id   ,['?','*',':','<','?','>','|']) ) {par_ok=false; mes+='! невалиден символ в id'+br} 
     if(undef(par[p].pr)    || has_char(par[p].pr   ,['?','*',':','<','?','>','|']) ) {par_ok=false; mes+='! невалиден символ в pr'+br} 
     if(undef(par[p].sc)    || has_char(par[p].sc   ,['?','*',':','<','?','>','|']) ) {par_ok=false; mes+='! невалиден символ в sc'+br} 
     if(undef(par[p].bcn)   || !(par[p].bcn==13 || par[p].bcn==20 || par[p].bcn==0) ) {par_ok=false; mes+='! невалидна стойност на bcn'+br} 
  
     var k=par[p].k, fr=par[p].fr, v=par[p].v, to=par[p].to, dg=par[p].dg, r=v/k // (to-fr+1)/k;  // rows calculated
	 par[p].r=r; 
     
	 // check params to be defined, integer and consistent:
	 if(undef(fr) || undef(to) || undef(dg) || undef(k))       {par_ok=false; mes+='! невалидни стойности на някое от числата fr,to,dg,k'+br}
	 if(to<fr || fr<0 || to<0 || (to-fr+1)<1 || dg<to.length)  {par_ok=false; mes+='! противоречиви стойности за числата fr,to,dg,k'+br}
	 if(Math.floor(r)!==r)                                     {par_ok=false; mes+='! броят редове r не е цяло число r=v/k'+br}
     
     if(!par_ok) msg('chk_par:<font style="color:red;">'+mes+'</font>')
  }
  
  function new_par(){ 
	 chk_par(); 
	 set_val("SET_v", "val", par[p].v)
	 set_val("SET_k", "val", par[p].k)
	 set_val("SET_r", "htm", par[p].r)
	 set_val("SET_to","htm", par[p].to)
	 name(); barcodetype=par[p].bcn 
     xfil_.innerHTML=name() + ' ' + par[p].id
  // xpar_.innerHTML=par_tbl(); // xhlp_.innerHTML=par_hlp();
  } 
//  0         1     2      3    4    5     6   7
// ["order" ,"id" ,"bcn" ,"pr","sc","dg","fr",'val']
  function copy_pers(n){ var t=0// копирай тези параметри в табл. за редактиране 
    par[p].order = pers_[n][++t];
    par[p].id    = pers_[n][++t];
    par[p].bcn   = pers_[n][++t];
    par[p].pr    = pers_[n][++t];
    par[p].sc    = pers_[n][++t];
    par[p].dg    = pers_[n][++t];
    par[p].fr    = pers_[n][++t];
    par[p].v     = pers_[n][++t];
    par[p].k     = pers_[n][++t];

    par[p].to    = par[p].fr + par[p].v -1;
//  par[p].r=par[p].v/par[p].k;

    set_val("SET_order", 'val', par[p].order )
    set_val("SET_id"   , 'val', par[p].id    )
//  set_val("SET_bcn"  , 'val', par[p].bcn   )  
    set_val("bc_list"  , 'val', par[p].bcn   )  
//  set_val("SET_isF"  , 'chk', par[p].isFile)
    
    set_val("SET_pr"   , 'val', par[p].pr    )
    set_val("SET_sc"   , 'val', par[p].sc    )
    set_val("SET_dg"   , 'val', par[p].dg    )
    set_val("SET_fr"   , 'val', par[p].fr    )
    set_val("SET_to"   , 'val', par[p].to    )
    set_val("SET_k"    , 'val', par[p].k     )
    set_val("SET_r"    , 'val', par[p].r     )
    set_val("SET_v"    , 'val', par[p].v     )
    new_par()
  }
  function pers_tbl(){  // табл. параметри за генериране на серия; групи, дата ,url ,бр.ел.;  
	var buf='',rbuf,i,j,l=pers_.length, fr,to,r,k,v,nopar=0,chk='', t,bcn,si_l,si_num=0, si_total=0,si_nm,si,si_sum,si_membr,k,list,slist,pnum=0,stl,grp=false,si,e;
//  todo: filter btn(fold[y/n]) select[all/none] btn(invert) seq:[...] ord:[...] id:[...] date:[...] -- [] as dropdown list from existing data
    for(i=0; i<=l-1; i++){ if(i>0 && pers_[i][0]!='>' && pers_[i].length!=0) pnum++; }
	for(i=0; i<=l-1; i++){ rbuf=''
      if(i>0 && pers_[i][0]==">"){ grp=true; t=-1// group: [,"seq/imp","order","id","date","user-url"] => val-sum, show/hide
		si=pers_[i][++t]; si_l=pers_[i][++t]; si_num++; si_nm='si.'+si_num;si_sum=0
		si_sum=0; si_membr=0; list=[]; k=0;
        for(j=i+1; j<=i+si_l; j++) {si_sum+=pers_[j][8]; k++; list[k-1]= si_nm+'.'+k;}; 
		si_total+=si_sum;
        slist='["'+list.join('","')+'"]';  // msg(slist)
        rbuf =col(''+si_num+'.['+si_l+']',' title="'+si_nm+'" class="legend"'
		+' onclick=\'vizIDs("t",'+slist+');\' style="color:black; background-color:orange;"') // "seq/imp"
        rbuf+=col(pers_[i][++t],' ') // ord
        rbuf+=col(pers_[i][++t],' ') // id
        rbuf+=col(pers_[i][++t],' ') // date
        rbuf+=col(url(pers_[i][++t]),''); rbuf+=col('','');rbuf+=col('','');rbuf+=col('','');rbuf+=col('','');rbuf+=col('',''); // url colspan="6"  
        rbuf+=col(si_sum,' id="'+si_nm+'" title="values in group:'+si_sum+'"') // val-sum
        buf+=row(rbuf,' ');  
		++nopar; 
	  } 
      else if(i>0 && (pers_[i].length==0 || pers_[i][0]=="]") ){ grp=false; // group end 
        buf+=row(col(' ',' colspan="13" height=6 style="background-color:#200000;"')); ++nopar; 
	  }
	  else if(i==0) { t=1// hdr names [2..11]
	    rbuf =col('_.['+pnum+']',' style="background-color:#200000;"'); pnum=0;
	    rbuf+=col(pers_[i][++t] ,' style="background-color:#200000;"') // order,
	    rbuf+=col(pers_[i][++t] ,' style="background-color:#200000;"') // id,   
	    rbuf+=col(pers_[i][++t] ,' style="background-color:#200000;"') // bcn,      
	    rbuf+=col(pers_[i][++t] ,' style="background-color:#400000;"') // pr,   
	    rbuf+=col(pers_[i][++t] ,' style="background-color:#400000;"') // sc,   
	    rbuf+=col(pers_[i][++t] ,' style="background-color:#400000;"') // dg,   
	    rbuf+=col(pers_[i][++t] ,' style="background-color:#400000;"') // fr,   
	    rbuf+=col(pers_[i][++t] ,' style="background-color:#400000;"') // val,
        rbuf+=col(pers_[i][++t] ,' style="background-color:#200000;"') // kol,
//      rbuf+=col('r'  ,' style="color:yellow"');
		rbuf+=col(pers_[i][++t] ,' style="background-color:#200000;color:yellow"'); // to / val-sum
        buf+=row(rbuf,'')
	  }  
      else { t=-1; si_membr++; pnum++; si=pers_[i][++t]; // seq/imp
	    var g=''; if(grp) g='&nbsp;»' // « » 
	    rbuf =col(g+'<button onclick="copy_pers('+(i)+');"  class="bRun"'+' style="font-size:7pt;text-align:right;"'
          +' title="copy \r копирай">'+(pnum)+'</button>'+si,' ') // i-nopar
	    rbuf+=col(pers_[i][++t],' ') // order,
	    rbuf+=col(pers_[i][++t],' ') // id,
        bcn=pers_[i][++t]   
	    rbuf+=col(bcn+':'+bcn_id(bcn),' ') // bcn,
        e=pers_[i][++t]; if(e=='' || e==' ') e='&nbsp;' 
	    rbuf+=col(e,' style="background-color:#400000;width: 6ch;"') // pr,   
	    rbuf+=col(pers_[i][++t],' style="background-color:#400000;width: 6ch;"') // sc,   
	    rbuf+=col(pers_[i][++t],' style="background-color:#400000;width: 3ch;text-align:right;"') // dg,   
	    rbuf+=col(pers_[i][++t],' style="background-color:#400000;width:11ch;text-align:right;"') // fr,   
	    rbuf+=col(pers_[i][++t],' style="background-color:#400000;width:11ch;text-align:right;"') // val,
        rbuf+=col(pers_[i][++t],' style="width:4ch;text-align:right"')  // k ,  
        fr=pers_[i][7]; v=pers_[i][8];  to=fr+v-1;  // k=pers_[i][9]; r=v/k;
//      rbuf+=col(r    ,' style="color:yellow"');
        rbuf+=col(to   ,' style="color:yellow; width:11ch;text-align:right" title="values to"'); // col(pers_[i][7],xbg) // to, 
        var hid=''; if(grp) hid=' style="display:none;"';
//      if(grp) msg_.innerText=row(rbuf,hid+' ID="'+si_nm+'.'+si_membr+'"') // dbg
        buf+=row(rbuf,hid+' ID="'+si_nm+'.'+si_membr+'"') // none 
	  }
    //if(i==3) msg(ht_out(buf))
	}
    buf=tbl(buf,' ') // width="780px"
//  msg(ht_out(buf))
    msg('total parameters '+i+' values:'+si_total)
	return  buf
  }
  function bcn_sel(){   // табл. за избор на баркод
    var bdy='<select  ID="bc_list" onchange="par[p].bcn=this.value;'
	// +' set_val(\'SET_bcn\',\'val\',par[p].bcn);'
	   +' set_val(\'bc_list\',\'val\',par[p].bcn);'
	   +'new_par();"'
	   +' style="width:8em;" class="e" title="barcode number by Zint symbology id">' // 20em->8em
	var bcnum,bcid,bcnm, l=bcn_.length
	for(i=0; i<=l-1;i++){ bcnum=bcn_[i].bcnum; bcid=bcn_[i].bcid; bcnm=bcn_[i].bcnm
	// msg(l+' ['+i+']:'+bcnum+':'+':'+bcid+':'+bcnm)
	// if( isin(bcnum,[0,9,13,14,20,58,60,69,72]) ) 
	     bdy+='<option value="'+bcnum+'" title="'+bcnm+'">'+bcnum+':'+bcid+'</option>' // +':'+bcnm
	}
    bdy+='</select>'
  // msg(' _ean13:'+_ean13+' _ean14:'+_ean14+'_code128:'+_code128+'_ISBN:'+_ISBN)     
	return bdy
  }
  function par_tbl(){   // параметри за правене на серия
    var i,l,hdr,bdy,rbuf, rx='',cx='' // ex,step,back 
    {   i=0; rbuf=''// --- hdr
	    rbuf+=col(par[i].pr,    ' title="predecessor \r преди числото"  style="background-color:#400000;"')
	    rbuf+=col(par[i].sc,    ' title="successor \r след числото"     style="background-color:#400000;"')
		
	    rbuf+=col(par[i].dg,    ' title="digits length (leading zeroes) \r дължина на числото (с водещи нули)" style="background-color:#400000;"')
	    rbuf+=col(par[i].fr,    ' title="digits from \r начално число"  style="background-color:#400000;"')
	    rbuf+=col(par[i].v ,    ' title="values=\r стойности"  style="background-color:#400000;"')	
	    rbuf+=col(par[i].to,    ' title="digits to=fr+v-1 \r крайно число"    style="color:yellow;"')
    hdr=row(rbuf,''); //msg(hdr)
	    i=1; rbuf=''// --- par	align
        rbuf+=col("<input type='text' ID='SET_pr'  class='e' value='-' style='width:6ch'  maxlength=4 "
			+" onchange='par[p].pr =this.value;   new_par();'>")
        rbuf+=col("<input type='text' ID='SET_sc'  class='e' value='-' style='width:6ch'  maxlength=4 " 
			+" onchange='par[p].sc =this.value;   new_par();'>")
			
        rbuf+=col("<input type='text' ID='SET_dg'  class='e' value='-' style='width:3ch'  maxlength=2 " 
			+" onchange='par[p].dg =this.value;   new_par();'>")
        rbuf+=col("<input type='text' ID='SET_fr'  class='e' value='-' style='width:11ch' maxlength=9 " 
			+" onchange='par[p].fr =this.value;   new_par();'>")
	    rbuf+=col("<input type='text' ID='SET_v'   class='e' value='-' style='width:11ch' maxlength=9 " 
			+" onchange='par[p].v  =this.value;   new_par();'>")
        rbuf+=col("<div               ID='SET_to'  style='background-color:black; color:gold; width:11ch;font-size:10pt;'>.</div>") // to=fr+v-1
	if(par_ok) rx=' style="background-color:black; color:yellow;"'
	else       rx=' style="background-color:black; color:red;"'
  }
	bdy=row(rbuf,rx); // msg(bdy)
	var par_ui=tbl(hdr+bdy,' width="350px"') // 780px
    // msg(ht_out(par_ui)) 
	 
	return par_ui
  }
// --- align-content: stretch|center|flex-start|flex-end|space-between|space-around|initial|inherit;
// --- align-items: stretch|center|flex-start|flex-end|baseline|initial|inherit;
// --- text-align: left|right|center|justify|initial|inherit;
// --- 
  function ser_tbl(){   // параметри за запис на серия
    var i,l,hdr,bdy,rbuf, rx='',cx='' // step?,back? xval_.innerHTML=a;
    {   i=0; rbuf=''// --- hdr
	    rbuf+=col(par[i].order, ' title="order \r поръчка"')
	    rbuf+=col(par[i].id,    ' title="identity \r идентификатор: клиент_изделие_размер/вид"')
	    rbuf+=col(par[i].bcn,   ' title="barcode symbology id in Zint \r номер на вида баркод в Zint"')
	    rbuf+=col(par[i].v ,    ' title="values=\r стойности"  style="background-color:#400000;"')
        rbuf+=col(par[i].k ,    ' title="columns \r колони" style="background-color:orange;color:black;"')
        rbuf+=col(par[i].r ,    ' title="rows=values/k \r редове (r=v/k)" style="color:yellow;" ')
    hdr=row(rbuf,''); //msg(hdr)
	}
    {   i=1; rbuf=''// --- par	
        rbuf+=col("<input type='text'   ID='SET_order' class='e' value='?' style='width:18ch;' maxlength=16"
			+" onchange='par[p].order=this.value; new_par();xpth_.innerHTML=workpath;set_paths();'>")
        rbuf+=col("<input type='text'   ID='SET_id'    class='e' value='-' style='width:36ch;' maxlength=32"
			+" onchange='par[p].id=this.value;   new_par();xpth_.innerHTML=workpath;set_paths();'>")
        rbuf+=col(bcn_sel(),'')
	    rbuf+=col("<input type='text'   ID='xval'      class='e' value='-' style='width:11ch; text-align:right;' maxlength=9 " 
			+" onchange='par[p].v =this.value;   new_par();'>")
        rbuf+=col("<input type='text'   ID='SET_k'     class='e' value='-' style='background-color:orange;color:black; width:4ch; text-align:right;'  maxlength=3 "
    		+" onchange='par[p].k =this.value; par[p].r=par[p].v/par[p].k; new_par();'>") // 
        rbuf+=col("<div                 ID='SET_r'     style='background-color:black; color:gold;width:11ch;text-align:right;'>.</div>") 
	   if(par_ok) rx=' style="color:yellow;"'
	   else       rx=' style="color:red;"'
       bdy=row(rbuf,rx); // msg(bdy)
    }
	var par_ui=tbl(hdr+bdy,' width="670px"')
    // msg(ht_out(par_ui)) 
	 
	return par_ui
  }
// ---
  function gui_init() { 
   { // html pointers  
    xpth_=document.getElementById("xpth");   xpth_.innerHTML='?'; // workpath  alert(wp)
    xusr_=document.getElementById("user");   xusr_.innerHTML='?';
    xos_ =document.getElementById("os" );     xos_.innerHTML='?';
    xcmp_=document.getElementById("comp");   xcmp_.innerHTML='?';
    xfil_=document.getElementById("xfil");   xfil_.innerHTML=''; // generated fn

    xhdr_=document.getElementById("hdr");    xhdr_.innerHTML='';
	
     msg_=document.getElementById("msg");     msg_.innerHTML='';
     hlp_=document.getElementById("hlp");     hlp_.innerHTML='';
	 
    xprs_=document.getElementById("lib" );   xprs_.innerHTML=pers_tbl();
//  xbcn_=document.getElementById("xbcn");// xbcn_.innerHTML=bcn_sel(); -- later reload ui - bc_list
    xpar_=document.getElementById("xpar");// xpar_.innerHTML=par_tbl(); -- later reload ui
    xser_=document.getElementById("ser" );// xpar_.innerHTML=ser_tbl(); -- later reload ui

   } // ---
   if(xhdr_!=null && xhdr_!=undefined) xhdr_.innerHTML= thisID; else msg('"xhdr" miss')

   {// --- initial data to view - from par[p] to form; - ?! onchange event 
//   document.getElementById("SET_pr" ).value=par[p].pr     
     set_val("xfil"     , 'htm', name()       ) 
   }
   
   outhlp(help_bcn,1); 	// tolang

   { if(xpar_!=null) xpar_.innerHTML=par_tbl(); else msg('miss id: xpar')// ui replace 
     if(xser_!=null) xser_.innerHTML=ser_tbl(); else msg('miss id: xser')// ui replace 
                     xval_=document.getElementById("xval");  if(xval_==null) msg('miss id: xval')
//   if(xbcn_!=null) xbcn_.innerHTML=bcn_sel(); else msg('miss id: xbcn')// ui replace - bc_list
     set_val("SET_order", 'val', par[p].order )
     set_val("SET_id"   , 'val', par[p].id    )
//   set_val("SET_bcn"  , 'val', par[p].bcn   )  
     set_val("bc_list"  , 'val', par[p].bcn   )  
//   set_val("SET_isF"  , 'chk', par[p].isFile)
	 
     set_val("SET_pr"   , 'val', par[p].pr    )
     set_val("SET_sc"   , 'val', par[p].sc    )
	 
     set_val("SET_dg"   , 'val', par[p].dg    )
     set_val("SET_fr"   , 'val', par[p].fr    )
     set_val("SET_v"    , 'val', par[p].v     )
	 
     set_val("SET_k"    , 'val', par[p].k     )
	 
     set_val("SET_r"    , 'htm', par[p].r     )
     set_val("SET_to"   , 'htm', par[p].to    )
   } 

// csv_imp='?'; set_val('fimp','val',csv_imp); // not work !?
// set_val('xprs','s_w','797px'); set_val('xprs','s_h','265px'); //  work as style only
// set_val('xprs','stl','overflow: auto;font-family:Arial;font-size:10pt;'); 
// set err:      set_val:: id:xprs style =[object MSStyleCSSProperties] 

   new_par(); // new_par call chk_par() -- onchange view to data: form to par[p].*
  }