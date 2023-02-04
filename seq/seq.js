load_new('seq.js');
/* ах, чудна българска земьо, полюшвай цъфтящи жита! */
/* -- functions */
    function find_ua(what)   {return navigator.userAgent.indexOf(what) >= 0}
    function find(where,what){return               where.indexOf(what) >= 0}
// ---
    function browserID(){ 
/*
 https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser/9851769
 https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
 
 Firefox dev: Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:100.0) Gecko/20100101 Firefox/100.0
 Firefox:     Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0
 K-Meleon:    Mozilla/5.0 (Windows NT 6.1; WOW64; rv:52.9) Gecko/20100101 Goanna/3.5 Firefox/52.9 K-Meleon/76.4.6
 Chrome:      Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36
 Opera:       Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 OPR/86.0.4363.32
 Ie:          Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.1; Zoom 3.6.0; rv:11.0) like Gecko
 Hta:         Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.1; Zoom 3.6.0)
 Safari:      ?
 Edge:        Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36 Edg/101.0.1210.32
 PaleMoon:    Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:68.0) Gecko/20100101 Goanna/5.0 Firefox/68.0 PaleMoon/30.0.1
 Iron:        Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.5050.0 Iron Safari/537.36
 qtWeb:       Mozilla/4.0 (compatible; MSIE 8.0; Windows NT based; Trident/4.0)
 brave:       ?
 netscape:    Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.8.1.12) Gecko/20080219 Firefox/2.0.0.12 Navigator/9.0.0.6
 Falkon:      Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Falkon/3.1.0 Chrome/69.0.3497.128 Safari/537.36
*/
      var isFirefox  = find_ua(' Firefox'  ) // typeof InstallTrigger !== 'undefined' &&
      var isKMeleon  = find_ua(' K-Meleon' ) 
      var isChrome   = find_ua(' Chrome'   ) //!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
      var isOpera    = find_ua(' OPR/'     ) && (!!window.opr && !!opr.addons) || !!window.opera 
      var isIE       = find_ua(' Trident'  ) && /*@cc_on!@*/false || !!document.documentMode;
      var isHta      = find_ua(' MSIE'     ) 
      var isEdge     = find_ua(' Edg'      ) // ?: !isIE && !!window.StyleMedia; /
      var isPaleMoon = find_ua(' PaleMoon' )
	  
	  var isKonqueror= find_ua(' Konqueror') // ?
	  var isNetscape = find_ua(' Navigator') 
	  var isSeamonkey= find_ua(' Seamonkey') // ?
	  var isFalkon   = find_ua(' Falkon/'  ) // ?
	  
      var isIron     = find_ua(' AppleWebKit') && find_ua(' Iron')
	  var isSafari   = find_ua(' isSafari' ) // ?
//    var isSafari   = /constructor/i.test(window.HTMLElement) 
//       || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] 
//       || (typeof safari !== 'undefined' && safari.pushNotification));
      
      var isBlink    = (isChrome || isOpera) && !!window.CSS; // Blink engine detection

	  var isWindows  = find_ua('Windows ');
	  if (isWindows) {
	    var ua=navigator.userAgent, i=ua.indexOf('Windows ');
	    var winVers=ua.substr(i+8,8);
	    var j=winVers.indexOf(';'); winVers=winVers.substr(0,j);
      }
	  var br,br_=''
      br={ 'isFirefox'  :isFirefox   ,'isKMeleon' :isKMeleon   ,'isChrome'   :isChrome    
          ,'isOpera'    :isOpera     ,'isIE'      :isIE        ,'isHta'      :isHta       
          ,'isEdge'     :isEdge      ,'isPaleMoon':isPaleMoon  ,'isIron'     :isIron      
          ,'isKonqueror':isKonqueror ,'isNetscape':isNetscape  ,'isSeamonkey':isSeamonkey
		  ,'isFalkon'   :isFalkon      
		  ,'isWindows'  :isWindows   ,'winVers'   :winVers }  
      if(br.isFirefox  ) br_+=' Firefox ' ; if(br.isKMeleon  ) br_+=' KMeleon ' ; 
      if(br.isChrome   ) br_+=' Chrome '  ; if(br.isOpera    ) br_+=' Opera '   ; 
      if(br.isIE       ) br_+=' IE '      ; if(br.isHta      ) br_+=' Hta '     ; 
      if(br.isEdge     ) br_+=' Edge '    ; if(br.isPaleMoon ) br_+=' PaleMoon '; 
	  if(br.isFalkon   ) br_+=' Falkon '  ;
      if(br.isKonqueror) br_+=' Konqueror'; if(br.isSeamonkey) br_+=' Seamonkey '; // ?
	  if(br.isNetscape ) br_+=' Netscape '; if(br.isSafari   ) br_+=' Safari '   ; // ?
      if(br.isEdge     ) br_+=' Edge '    ; if(br.isPaleMoon ) br_+=' PaleMoon '; 
      if(br.isIron     ) br_+=' Iron '    ; if(br.isBlink    ) br_+=' Blink '   ; // Opera Chrome Iron
      return br_
    }
// ---
    function box(p){ var htkey='td',w,buf=''// -- box({w:[],t:[a,b,c,...]})
	  for(var i=0; i<=p.t.length-1; i++){ w=''; 
	    if( !(typeof(p.w)==='undefined') 
		&& (p.w[i]>0) ) w=' width:'+p.w[i]+'px;'
	    buf+='<'+htkey+' style="text-align:left; background-color:#000000; margin:2px 2px 2px 2px;'+w+'">'+p.t[i]+'</'+htkey+'>'+eol
	  }
	  buf= '<tr>'+buf+'</tr>'+eol
	  return buf
	}
// ---
    function togbul(id1,id2){ 
	   var id1_=setById(id1), id2_=setById(id2)
       togID(id1_)
       var stl=id1_.style.display; 
    // if(dbg) msg(' bullet: '+id1+'.style.display='+stl+eoln)
    // if(typeof id_ === undefined) msg(' bullet: undef='+id+eoln)
       id2_.innerHTML='●'; if(stl=="none") id2_.innerHTML='◎';
	   if(id1=='xpar' || id1=='xval' || id1=='xind' || id1=='xmsg') resize_hta()
    } // ● &#9679; ◎ &#9678; 
// ---
    function togID(id_){ // var id_=document.getElementById(id) 
	  var id=id_; // if(dbg) msg('togID:'+id_+eoln)
	  if(typeof(id)==='string')   { id=document.getElementById(id_); 
	  // msg(' new ID:'+id+eoln)
	  }
	  if(typeof(id)==='undefined') return
	  var stl=id.style.display; // msg('stl:'+stl+' lng:'+stl.length+eoln)
      if (stl=="none") { id.style.display = "block";// "block"; inline-block
	  } else           { id.style.display = "none";}
	  if(id_=='csvimp' || id_=='seq-lib' || id_=='seq-err') resize_hta()
	}
// --- 
    function resize_hta() { var w=750+2, w2=40, h2=50; // w=670 +2
	  id_=setById('seq-ui')
	  info=id_.getBoundingClientRect() // rnd(info.height,2) , rnd(info.width,2) 
	  window.resizeTo(w+w2,rnd(info.height,2)+h2)
	}
// ---    
    function show_ind(){ // rows,cols, seq.val[i]
	  if (!chk_seq()) return

      var isFile=seq.bcn>0, csvhdr=''
	  var kolName='col_'; if(isFile) kolName='@file_'; 
      for (var i=1; i<=seq.col; i++) { csvhdr+=kolName+i; if(i<seq.col) csvhdr+=','}
	  
	  var i=-1,j,v, buf='';
	  for (var ri=1; ri<=seq.row; ri++) { 
	    for (var ki=1; ki<=seq.col; ki++) { i++; 
        // j= (seq.frm)-1 +(seq.row)*(ki-1) +ri +ki -(ki-1)*1-1;
           j=          -1 +(seq.row)*(ki-1) +ri +ki -(ki-1)*1-1; // ok
		   if(typeof(j)==='undefined'){ msg('- []:'+j+eoln); return }
		   v=seq.val[j]
		   if(typeof(v)==='undefined'){ msg('- seq['+j+']:'+v+eoln); return }// seq[2001]:undefined
		   buf+=''+v     // output new values 
           if(isFile) buf+='.pdf'
		   if(ki<seq.col) buf+=',';// , between values, not at end
		}; 
		buf+='\n'            // output newline at every row end  \n\r
	  }
      return csvhdr+'\n' + buf
/*
@file_1,@file_2,@file_3,@file_4
A19H00001.eps,A19H01001.eps,A19H02001.eps,A19H03001.eps
A19H00002.eps,A19H01002.eps,A19H02002.eps,A19H03002.eps
...
A19H01000.eps,A19H02000.eps,A19H03000.eps,A19H04000.eps
*/  
	}	
// ---
    function make_seq_val(){ // rows,cols, predecessor,succesor, from,to, leading zeroes
	  var fill=seq.val.length, mes=''
	  if(fill>0){mes='-- make_seq_val: already fill with '+fill+eoln;}
	  if(!chk_seq() || mes!='') return
	  
      with(seq){ val=[]
        var j=-1
	    for (var i=frm; i<=to; i++) { j++; // --  (i=1; i<=col*row; i+stp) j=Number(i+fr-1); lz=''+j;
		    if(i>frm) i=Number(i)-1+Number(stp); if(i>to) continue
            var lz=''+i; 
            for (var n=2; n<=dig; n++){if (lz.length<dig) lz='0'+lz;} // leading zeroes value
		    val[j]=bef+lz+aft;  
         // if(dbg) msg('i:'+i+' seq.val['+j+']:'+seq.val[j]+eoln)
	    }
      } 
	  msg(eoln+sysinfo()+eoln+seqinfo()+eoln) 
	  log_apnd('{ '+seqinfo()+' }') 
   // if(dbg) msg('seq.val=['+seq.val.length+']'+eoln)
      var id_=setById("seq_mak"); id_.innerHTML='<v>●</v>';// ◎ ●
      return seq.val.join('\n') // --- output values <br/>\n| \r | <br/>
	}	
// ---
//  out(plc_,msg), undef(s), set_theme(t), set_lang(), dict[], set_par(typ,job_,seq_), chk_seq(), seq_chg()
    function msg(mes){out(msg_,mes)}
    function out(plc_,msg){ if (typeof(msg)===undefined) return;
      if (plc_===undefined || plc_===null) {
        try{               document.write('»msg:'+msg+eol+br); 
        }catch(Exception){ alert('»»msg:'+msg);}
        return
      }
	  
	  if (msg==null) plc_.innerHTML=''; else plc_.innerHTML+=msg
	}
// ---
    function undef(s)  { return (typeof(s)== "undefined" || s==null)	}
// ---    
    function set_lang(sel_lang){ var sl=-1; // dict[indx][sl] 
      if(sel_lang=='eng'){sl=en} else if(sel_lang=='bul'){sl=bg} else return;

      var l,indx,i,j,k,fnd; 
      var spans=document.getElementsByTagName("span")
      function nv(o,n){ // only if(o.name==n) return o.value;
	    if(    (typeof(o)===undefined) || (       o == null     )
	        || (typeof(n)===undefined) || (       n == null     ) ) return null; // skip
	    if(o.name==n) return o.value;
	    return null
	  }
    
      // --- за всички <span dict = "#"> се подменя съдържанието/текста според dict[#,lang]-->
      k=0
      for(i in spans){ ++k; 
         for(l in spans[i].attributes){ 
            indx=nv(spans[i].attributes[l],"dict") // -> #|null
            if(indx === null ) continue; // break iteration of loop l
            // if(dbg) msg( '-- span#: '+(k)+' name: '+i+' ['+l+']'+' indx: '+indx+' ') // 4 3 [0] lang 
            
            fnd=-1
            for(j in dict){
              if(dict[j][0]==indx) { fnd=j;
              // if(dbg) msg(' -- dict['+j+'][0]'+eoln)
                break; // break loop j
              }
            }

            if(fnd<0) { msg('set_lang: '+indx+' -- miss in dict[]'+eoln)
            } else    { 
			    spans[i].innerHTML=dict[fnd][0+sl]; 
              if(!typeof(dict[fnd][3+sl])==='indefined' && !dict[fnd][3+sl]=='')
			  { spans[i].tooltip    =dict[fnd][3+sl];
			   // if(dbg) msg(' -- dict['+j+']['+(3+sl)+']='+dict[fnd][3+sl]+eoln)
			  }
            }
         };
        
       }
     }
// ---
    function set_par(partype,seq_,job_){ //var mes='// --- new seq.'; // typ=nul/def/usr/    
          job={ord:'',   isu:'' , clt:'',  dat:'' }; 
          seq={typ:'ord',bef:'' , aft:'',  dig:1, frm:0, to:0 , col:1, stp:1, bcn:0, row:1 , tot:null,val:[]};
      switch (partype) {
        case 'def':
          job={ord:'193408_4', isu:'Karti_200lv', clt:'Technopolis', dat:'2019-06-07' } 
          seq={typ:'ord', bef:'A19H', aft:'', dig:5, frm:2001, to:4000, col:4, row:0, stp:1, bcn:20, tot:0 ,val:[]}
          // msg(mes+eoln); log_apnd(mes);
          break;        
        case 'usr': // typeof(seq_):object
          if(typeof(job_)!='undefined' && job_!='') 
		    with (job){ 
			  ord=job_.ord; isu=job_.isu; clt=job_.clt;  dat=job_.dat; 
			}
          if(typeof(seq_)!='undefined' && seq_!='') 
            with (seq){
              typ=seq_.typ; bef=seq_.bef; aft=seq_.aft; dig=seq_.dig; row=seq_.row;
              frm=seq_.frm; to =seq_.to;  col=seq_.col; stp=seq_.stp; bcn=seq_.bcn; 
            }
          // msg(mes+eoln); log_apnd(mes);
          break;
        case 'nul': default:  break;
      }
     
      // -- fill form: domptr.value=... 
      with (seq) { 
        if(partype!='nul') row=Number((to-frm+1)/col*stp); // for step=1
      //if(partype!='nul') tot=Number (to-frm+1);     // for step=1 rows calculate
        if(col<1) col='?'
        if(stp<1) stp='?'
        if(typ!='ord' && typ!='imp') {typ+='?'}
        seq_frm.value=frm; seq_to.value=to;   seq_col.value=col; seq_row.value=row; 
        seq_tot.value=tot; seq_stp.value=stp; seq_bef.value=bef; seq_aft.value=aft 
        seq_dig.value=dig; seq_bcn.value=bcn; seq_typ.value=typ;
      }
      with (job) { job_ord.value=ord; job_isu.value=isu; job_clt.value=clt;  job_dat.value=dat;}
      var id_=setById("seq_mak"); id_.innerHTML='<e>◎</e>';// ◎ ●
    }
// --- old ?
    function chk_seq(){var wrn='',mes=''// check par and chk_seq
	// if(dbg) msg(seqinfo()+eoln)
	   par_ok=true; bad_chr=['?','*',':','<','?','>','|']
	   with(job) { 
         if(has_char(ord ,bad_chr) || undef(ord ) ) { mes+='! невалиден символ в ord'+eoln}
         if(has_char(isu ,bad_chr) || undef(isu ) ) { mes+='! невалиден символ в isu'+eoln} 
         if(has_char(clt ,bad_chr) || undef(clt ) ) { mes+='! невалиден символ в clt'+eoln} 
       //if(has_char(dat ,bad_chr) || undef(dat ) ) { mes+='! невалиден символ в dat'+eoln} 
	   }
	   with(seq) { if(typeof(fil)==='undefined') fil='col'// default
         if(typ!='ord' && typ!='val')  { wrn+='! невалиден тип seq[ord | val]='+typ +eoln; typ='ord'}	     
         if(fil!='col' && fil!='row')  { wrn+='! невалиден тип fil[col | row]='+fil +eoln; fil='col'}	     
         if(has_char(bef ,bad_chr) || undef(bef ) ) { wrn+='! невалиден символ в bef'+eoln} 
         if(has_char(aft ,bad_chr) || undef(aft ) ) { wrn+='! невалиден символ в aft'+eoln} 
         if(bcn<0 || bcn>145 || undef(bcn) ||  bcn_id(bcn)==null) 
		   { wrn+='! невалидна стойност на barcode='+bcn+eoln; } 
		 // --
	     frm=Number(frm)||0;    to=Number(to)||0;    dig=Number(dig)||1; 
	     stp=Number(stp)||'?'; col=Number(col)||'?'; 
		 bcn=Number(bcn)||0; 
		 // --
		 tot=(to-frm+1)/stp; // if(val.length>0) tot=val.length
	     row=tot/col; 
		 // -- if(dbg) msg(['tot:',seq.tot,'val[]:',seq.val.length,'t-f:',(to-frm+1)/stp].join()+eoln)
	     // check params to be defined, integer and consistent:
	     var nerr=''
	     if(typeof(row)!='number' || row<1          ) nerr+=' row='+row
	     if(typeof(col)!='number' || col<1          ) nerr+=' col='+col
	     if(typeof(frm)!='number' || frm<0          ) nerr+=' frm='+frm
	     if(typeof( to)!='number' ||  to<1 || frm>to) nerr+= ' to='+ to
	     if(typeof(stp)!='number' || stp<1          ) nerr+=' stp='+stp
	     if(typeof(dig)!='number' || dig<1          ) nerr+=' dig='+dig
	     if(typeof(tot)!='number' || tot<0          ) nerr+=' tot='+tot
	     if(nerr!='')  mes+='! невалидно число:'+nerr+eoln; 	
 	     if(to<frm || frm<0 || to<0 || (to-frm+1)<1 || dig<to.length || stp<1 || col<1|| col*row<tot) 
		   {mes+='! противоречиви стойности [frm,to,dig,stp,col,row]'+eoln}
	     if(Math.floor(row)!==row) 
		   {mes+='! броят редове не е цяло число [rows]'+eoln}
		   
            seq_frm.value=frm; seq_to.value=to;   seq_col.value=col; seq_row.value=row; 
            seq_tot.value=tot; seq_stp.value=stp; seq_bef.value=bef; seq_aft.value=aft 
            seq_dig.value=dig; seq_bcn.value=bcn; seq_typ.value=typ;
       }
	   
	   out(seqerr_,null); // seqerr_.style.display = "block";
       if(!wrn=='')       { out(seqerr_,'wrn:'+eoln+'<font style="color:orange;">'+wrn+'</font>') 
       } else if(!mes==''){ out(seqerr_,'err:'+eoln+'<font style="color:red;">'+mes+'</font>') 
	   } else {  out(seqerr_,null) // seqerr_.style.display = "none"; 
	   }
	   return mes==''
    }
// ---
    function has_char(par,arr){ var mes,err=!true
    // msg('has_char('+par+','+arr+')'+eoln)
	   mes='has_char() undef par:'+par; if(undef(par)) {err=true; msg(mes+eoln)}
	   mes='has_char() undef arr:'+arr; if(undef(arr)) {err=true; msg(mes+eoln)}
	   if(err) return
       var arr_lng=arr.length,par_lng=par.length
	   for (var i=0; i<par_lng; i++) {
	     for (var j=0; j<=arr_lng; j++) {
	       if(par.substr(i,1)==arr[j]) return true // {has=true; cnt++;} // msg('has_char:'+i+','+j)
	     }
	   }
	   return !true
    }
// ---
    function isin(code,ar){ var fnd=false, l=ar.length,i
    //msg('isin('+code+'['+ar.join(',')+']):')
      for(i=0; i<=l-1;i++){ // msg('... i:'+i)
	    if(code==ar[i]) {fnd=true; break;}
	  }
	  return fnd
    }
// ---
    function rnd(f,s){ var k=Math.pow(10,s); return Math.round(f*k)/k; }
// --- 
    function setById(id){ return document.getElementById(id) } 
// --- 
    function sysinfo(){ var buf=''
      buf+=('{'+[ '"comp":"'+comp+'"', '"os":"'+ os+'"'
	            , '"user":"'+user+'"', '"log":"'+log+'"'
				, '"jobs":"'+jobs+'"', '"zintdir":"'+zintdir+'"'
	            ].join(',')+eoln+'}')
	  return buf
    }
// --- 
    function seqinfo(){ var buf=''
	  with(seq) buf+=' lib.seq+={' 
        +[' "typ":"'+typ+'"'
		 ,' "bef":"'+bef+'"',' "aft":"'+aft+'"'
		 ,' "frm": '+frm    ,'  "to": '+ to  
         ,' "dig": '+dig    ,' "stp": '+stp      // bcn_[bcn_id(bcn)].bcid
		 ,' "bcn": '+bcn +' /* '+bcn_id(bcn)+' */'
		 ,' "col": '+col   ,' "row": '+row    
		 ,' "fil":"'+fil+'"',' "tot": '+tot   
		 ].join(',')+' }; '+eol;
	  
      with(job) buf+=' lib.job+={'
	    +[' "isu":"'+isu+'"',' "ord":"'+ord+'"'
		 ,' "clt":"'+clt+'"',' "dat":"'+dat+'"'
		 ].join(',')+' }; '; 
		 
      // buf+='// '+seq.val.length+' '+eol // seq.val[]=?=seq.tot
	  return buf
    }
// --- 
    function wininfo(){ var buf=''
    //for (var i=0; i<=win.length-1; i++) {
    //   with(win[i]) { buf+=dominfo(id,id); if(subid!='') buf+=dominfo(subid,subid); }
    //}
	  buf+=dominfo('seq-ui','total gui:')
	  return buf
    }
// ---  
    function dominfo(id,note){ 
      var buf='',info='',id_=null; // msg('id:'+id+' note:'+note+eoln);
	  id_=setById(id)
      if(typeof(id_)==='undefined') {return 'undefined:'+id+eoln; }
	  info=id_.getBoundingClientRect(); 
//    developer.mozilla.org/en-US/docs/Web/API/DOMRect
//    var where_; if(where==null || where=='') where_=xmsg_; else where_=setById(where)
      buf=(note+' <u>h:'+rnd(info.height,2) +' w:'+rnd(info.width,2) +'</u>'+eoln); 
//    console.log(info); // digitalocean.com/community/tutorials/js-getboundingclientrect
	  return buf
    }
// ---  
    function bcn_sel(bcn_sel_id){   // табл. за избор на баркод
      var bdy='<select  ID="'+bcn_sel_id+'" '
  	// +' onchange="seq.bcn=this.value;bc_list.value=seq.bcn;' // +'new_par();"'
   +' onchange="seq.bcn=this.value; chk_seq();"' // seq_bcn.value=seq.bcn;  class="select" or d
 	   +' style="width:130px;" class="select" title="barcode number by Zint symbology id">\n' // 20em->8em
 	 var bcnum,bcid,bcnm, l=bcn_.length
 	 for(i=0; i<=l-1;i++){ bcnum=bcn_[i].bcnum; bcid=bcn_[i].bcid; bcnm=bcn_[i].bcnm
 	 // msg(l+' ['+i+']:'+bcnum+':'+':'+bcid+':'+bcnm)
 	 // if( isin(bcnum,[0,9,13,14,20,58,60,69,72]) ) 
 	 // ,{bcnum:  #,bcid:''      ,bcnm:}
 	      bdy+='<option class="d" value="'+bcnum+'" title="'+bcnm+'">'+bcnum+':'+bcid+'</option>\n' // +':'+bcnm
 	 }
      bdy+='</select>\n'
	  msg()
    // msg(' _ean13:'+_ean13+' _ean14:'+_ean14+'_code128:'+_code128+'_ISBN:'+_ISBN)     
 	 return bdy
    }
// --------------------------------- 
    function tbl(t,tx) { return '<table '+tx+'>'+eol+t+'</table>'+eol;}
    function row(r,rx) { return '<tr '+rx+'>'+eol+r+eol+'</tr>'+eol;}
    function col(c,cx) { var cx_=''; if(cx!=undefined) cx_=cx; return '<td '+cx_+'>'+c+'</td>'+eol; }
    function ht2(t,s)  { return '<'+t+'>'+s+'</'+t+'>'};
	function stl(s)    { return ' style="'+s+'"'}
    function xmp(s)    { var i,l=s.length,b='' // like <xmp>...</xmp>
      for(i=0;i<l;i++){ c=s.substr(i,1);
        if(c=='<') b+='&lt;' 
        else if(c=='>') b+='&gt;'//+'</br>'+crlf
        else b+=c
      }
      return b
    }
    function url(url_) { var n=url_.split('\\'); if (n.length<=1) n=url_.split('/'); // todo: activex: explorer path n.join('/')
      return '<a title="'+url_+'" href="file:///'+url_+'" target="self_" style="font-size:8pt;">url</a>'; 
    }
/* *-/ // --- old ?
    function conv_csv(){ var Rin=seq..Rin, Kin=seq..Kin, v
      a=0; seq[a]=''// ! hdr
      if(seq..byKcv){ // --- todo:: submatrix
   	// default true mean kols to rows else rows to kols
   	  for (var k=0; k<=Kcv-1; k++) { 
   	    for (var r=0; r<=Rcv-1; r++) { 
   	      v=val_imp[r][k]; seq[++a]=v; // msg(v+' ')
   	    }
   	  }
      } else { // --- todo:: submatrix
        for (var r=0; r<=Rcv-1; r++) { 
          for (var k=0; k<=Kcv-1; k++) { 
            seq[++a]=val_imp[r][k]; 
          }
        }
      }
   	
      msg('convert imported csv kol to rows='+seq..byKcv+' and export by Rex:'+seq..Rex+' Kex:'+seq..Kex) // hdr!
      var k=seq..Kex, buf='',l=0
   	for (i=1; i<=seq.length-1; i+k) { l++; buf='['+l+']:'
   	  for (j=1; j<=k; j++) { buf+= seq[i]; i++; if(j<k) buf+=','}
   	  msg(buf)
   	}
    }
/* */
// ---
    function vizIDs(a,ids){ // (act:s/h/t/i,ids['xxx',...])
	   var i,j,idname,id,e,stl,h, act=a // console.log('vizIDs:',act,ids); 
	   // if find sended ids[] in _win[] then save state
	   // set action hide/show/toggle
       for(i=0; i<=ids.length-1; i++){ idname=ids[i]; id=null; 
         if(idname==undefined || idname=='' || idname==null) continue; // skip
		 // console.log('vizIDs:[',i,']',idname)
		 //// id= id_def_no(idname)
    //  if(id==null)     { msg('... vizIDs:'+act+' id:'+idname+' <e>undefined</e>'); } // no skip
	       e=document.getElementById(idname); 
         if(e==undefined) { msg('... vizIDs:'+act+' id:'+idname+' <e>html miss</e>'); continue} // skip
		    stl=e.style.display
		    switch (act) { // actions: show/hide/toggle/info
            case 'h':      e.style.display = "none"; 
		              if(id!=null) _win[id].st=_min;  
		    break;
            case 's':      e.style.display = "inline-block"; 
		              if(id!=null) _win[id].st=_max;  
		    break;
            case 't': if (stl=="none") { e.style.display = "inline-block"; 
		                if(id!=null) _win[id].st=_max;
                      } else           {e.style.display = "none";
		                if(id!=null) _win[id].st=_min;
			 		  }
		    break;
            case 'i': info=e.getBoundingClientRect(); 
//                    msg('Info: id='+ids[i]+' h='+r(info.offsetHeight,2)+' w='+r(info.offsetWidth,2) ); // ie8 - undef
                      msg('... vizIDs:i id:'+ids[i]+' <u>h:'+r(info.height,2)      +' w:'+r(info.width,2)+'</u>'); // rnd
		    break;
         // default:  ;
		    }// switch
       }// for
    }// func
// ---
    function copy_lib(n){ var t=0// копирай тези параметри в табл. за редактиране 
// ["grp","cnt","order" ,"id" ,"bcn / date", "pr"  ,"sc" , "dg", "fr",'val',"kol","to / sum"] 
// ,["sq","190413_1"  ,"Praktiker Karti 20lv"          , 20  , "R19E",""   ,  5 ,    1, 6000,   4 ] 
      seq.typ = lib_[n][ 1]; seq_typ.value = seq.typ; // .trim()?
      job.ord = lib_[n][ 2]; job_ord.value = job.ord; 
      job.clt = lib_[n][ 3]; job_clt.value = job.clt; 
      job.isu = lib_[n][ 4]; job_isu.value = job.isu; 
      job.dat  =lib_[n][12]; job_dat.value = job.dat; // from group hdr  
      seq.bar = lib_[n][ 5]; seq_bcn.value = seq.bar; 
													  
      seq.bef = lib_[n][ 6]; seq_bef.value = seq.bef; 
      seq.aft = lib_[n][ 7]; seq_aft.value = seq.aft;   
      seq.dig = lib_[n][ 8]; seq_dig.value = seq.dig; 
      seq.stp = 1;           seq_stp.value = seq.stp; 
      seq.frm = lib_[n][ 9]; seq_frm.value = seq.frm; 
      seq.tot = lib_[n][10]; seq_tot.value = seq.tot; 	  
      seq.col = lib_[n][11]; seq_col.value = seq.col;
	  
	  seq.fil = 'col';       seq_fil.value = seq.fil;
	  
      seq.to  = seq.frm + seq.tot -1; seq_to.value  = seq.to  
      seq.row =seq.tot/seq.col;       seq_row.value = seq.row 
//    new_par()
    }// --------------------------------- old »
    function seqlib(){  // lib_ табл. параметри за генериране на серия; групи, дата ,url ,бр.ел.;  
      var grp,cnt,typ, ord,clt,isu,dat,bcn ,ur_,bef,aft,frm,to,stp,dig, cols,sum,rows, tot
	     ,buf='',rbuf,i,j,k,seqnum=0,l=lib_.length, k
	     ,si_l,grp_num=0, si_total=0,si_nm,si_sum,si_membr,list,slist,pnum=0, group
	     ,hdr1='background-color:#200000; font-size:9pt;'
		 ,hdr2='background-color:#400000; font-size:9pt;'
		 ,hdr3='background-color:#000000; font-size:9pt;'
	     ,bdy1='background-color:#222222; font-size:9pt;'
		 
  	  for(var i=0; i<=lib_.length-1; i++){ grp=lib_[i][ 0]; stp=1; rows=0; sum=0; rbuf=''
  	    if(i==0) {  pnum=0; // hdr [2..11]
  	      typ=lib_[i][ 1]; ord=lib_[i][ 2]; clt=lib_[i][ 3]; isu=lib_[i][ 4]; bcn=lib_[i][ 5]; 
  		  bef=lib_[i][ 6]; aft=lib_[i][ 7]; dig=lib_[i][ 8]; frm=lib_[i][ 9]; tot=lib_[i][10];
  		  cols=lib_[i][11]; sum=lib_[i][12]; // sum/rows

  	      rbuf =col( typ  ,stl(hdr1)) +col( ord  ,stl(hdr1)) +col( clt  ,stl(hdr1))
		       +col( isu  ,stl(hdr1)) +col( bcn  ,stl(hdr1)) +col( bef  ,stl(hdr2))
               +col( aft  ,stl(hdr2)) +col( dig  ,stl(hdr2)) +col( frm  ,stl(hdr2))
			   +col( tot  ,stl(hdr2)) +col( cols ,stl(hdr1)) 
               +col( sum  ,stl('background-color:#200000;color:yellow;')) // sum/rows
          buf+=row(rbuf,' ');  
  		//console.log('hdr:',i,grp,typ, ord,clt,isu,bcn ,bef,aft,frm,to,stp,dig, sum, tot,buf); 
  	    } 
		else if(grp==">")       { group=!true; // group end 
          buf+=row(col(' ',' height="6px"'+stl('background-color:#200000;font-size:4pt;')),' colspan=11');
       // console.log('>',i,buf); 
        } 
		else if(grp=="<" && i>0){ group=true; 
  	      cnt=lib_[i][ 1]; ord=lib_[i][ 2]; clt=lib_[i][ 3]; isu=lib_[i][ 4]; dat=lib_[i][ 5]; 
  		  ur_=lib_[i][ 6]; 
  	  
  	      // group: [,"seq/imp","order","id","date","user-url"] => val-sum, show/hide
  		  si_l=cnt; grp_num++; si_nm='si.'+grp_num; 
  		  si_sum=0; si_membr=0; list=[]; k=0;
          for(j=i+1; j<=i+cnt; j++) {si_sum+=lib_[j][10]/* tot*/; k++; list[k-1]= si_nm+'.'+k;}; 
  		  si_total+=si_sum;
          slist='"'+list.join('","')+'"';   if(dbg) out(init_,slist+eoln)

  		  var tt='"t"'
          rbuf =col(grp_num+'['+si_l+']',' class="bFil"'
	               +' onclick=\'vizIDs("t",['+slist+']);\''
  		  	       +stl('font-size:8pt;')) // "seq/imp"
               +col(ord,stl(hdr3))+col(clt,stl(hdr3))+col(isu,stl(hdr3))+col(dat,stl(hdr3))
			   +col(url(ur_),stl(hdr3)+' colspan=6')
               +col(si_sum,stl(hdr3+'text-align:right;')+' id="'+si_nm+'"'
			       +' title="values in group:'+si_sum+'"') 
  		  
          buf+=row(rbuf,' ');  
  		//console.log('<',i,grp,cnt,typ, ord,clt,isu,dat,ur_,si_sum,buf); 		  
  	    } 
		else                    { si_membr++; pnum++;  // seq/imp
  	      typ=lib_[i][ 1]; ord=lib_[i][ 2]; clt=lib_[i][ 3]; isu=lib_[i][ 4]; bcn=lib_[i][ 5]; 
  		  bef=lib_[i][ 6]; aft=lib_[i][ 7]; dig=lib_[i][ 8]; frm=lib_[i][ 9]; tot=lib_[i][10];
		 cols=lib_[i][11];     
		      lib_[i][12]=dat; // from group hdr
  		  rows=tot/cols; // si=typ 
          if(bef=='' || bef==' ') bef='&nbsp;'; if(aft=='' || aft==' ') aft='&nbsp;' 
  	      var g=''; //if(group) g='»' // « » 
		  seqnum++
  	      rbuf =col('<button onclick="copy_lib('+(i)+');" class="bMak"' 
  		               +stl('font-size:8pt;text-align:right;')
                       +' title="copy '+pnum+'">' +g+typ+'.'+pnum
					+'</button>'
			       ,stl('font-size:8pt;background-color:#222222;color:#d96c00;') )
  	           +col(ord ,stl(bdy1))+col(clt,stl(bdy1))+col(isu,stl(bdy1))//+lib_[i][++t]+
               +col(bcn+':'+bcn_id(bcn),stl(bdy1)) // bcn+':'+bcn_id(bcn)
  	           +col(bef ,stl(hdr2+'width: 6ch;'))  
  	           +col(aft ,stl(hdr2+'width: 6ch;'))   
  	           +col(dig ,stl(hdr2+'width: 3ch;text-align:right;'))   
  	           +col(frm ,stl(hdr2+'width:11ch;text-align:right;'))   
  	           +col(tot ,stl(hdr2+'width:11ch;text-align:right;'))
               +col(cols,stl(bdy1+'width: 4ch;text-align:right;' ))  
               +col(rows,stl(bdy1+'width: 6ch;text-align:right;color:yellow;')) // col(lib_[i][7],xbg) // 
          var hid=''; // if(group) hid=' style="display:none;"';
		  var id=' ID="'+si_nm+'.'+si_membr+'"'+hid;
          buf+=row(rbuf,id) 
  		//console.log(':',i,grp,typ, ord,clt,isu,bcn ,bef,aft,frm,to,stp,dig, cols,rows, tot) 
        }
      //if(i==3) msg(xmp(buf))
      }
      buf=tbl(buf,' class="bMak"') // width="780px"
//    msg(xmp(buf))
      out(init_,'job-seq lib:'+(lib_.length-1-2*grp_num)+' grp:'+grp_num+eoln)//+' seq:'+seqnum
      return  buf
    }
// ---   
load_end();