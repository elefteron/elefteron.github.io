/* ах, чудна българска земьо, полюшвай цъфтящи жита! */
id={
  "id": "SVC",
  "name": "Seria values collect & Barcodes",
//"aplURL": "",
  "iconURL": "R19G00001.ico",
  "author": "eleter@abv.bg",
  "updateURL": "",
  "version": "8.e (2020-08-04)"
}
thisID='<font class="id">'+'<a href="mailto:'+id.author+'?Subject=SVC_usr_msg:" title="'+id.name+' '+id.version+' \r  by '+id.author+'">'+id.id+'</a></font>'

// -- cfg global get/save/check
    crlf='\r\n'; newline='<br/>';
    _ISBN=69; _ean14=72; _ean13=13; _code128=20;  barcodetype=_code128; 
    if (undef(bcn_)) msg('barcode table undefined')
    if (undef(par)){ // bcn_[_code128].bcnum - default
      var par=[],p=-1
      par[++p]={order:'order',id:'id', bcn:'bcn', pr:'pr', sc:'sc', dg:'dg',fr:'fr',v:'val', k:'kol', r:'row', to:'to'} // [0]=hdr
      par[++p]={order:''  , id:'', bcn:0,  pr:'', sc:'',  dg:5,fr: 0, v: 1, k:1,r:1,to:1   } 
      par[p].r =par[p].v/par[p].k;      // rows calculate
      par[p].to=(par[p].fr+par[p].v-1); // to calculate
    }
	par_ok=false; //chk_par()
	
    filename='',epsext='.eps' 
	eps_gen_bat  ='#eps-make.bat' // '+'.'+name()+'
//  eps_gray_bat ='#eps-gray.bat'
	pers_init_bat='#pers-init.bat'
	// -- fs:
    user='?'; desk='?'; pers='?' // fsn.UserName;
    deskpath=''// ='C:\\Users\\'+user+'\\Desktop\\'
    workpath=''// ='C:\\Users\\'+user+'\\Desktop\\#pers\\'
//  userpath=''// ='C:\\Users\\'+user+'\\'
//  tmp =workpath+'\\data\\tmp\\'  
    

	zint_paths=['"F:\\elefter.dev\\my-dev+\\SVC\\+zint 2.6.2.port\\App\\Zint\\Zint.exe"'
               // F:\elefter.dev\my-dev+\SVC\+zint 2.6.0.port
	          ,'"\\\\192.168.1.215\\User\\+Tery\\barcodes\\zint 2.6.0.portable\\Zint.exe"' //...215 user, ...239 Order
	]
	zint=zint_paths[1];   // --- try with local     

// --- _fs.js
//   user=fsn.UserName;
//   if(user=='elefter') zint=zint_paths[0]
//   fn_log       =$svc_ '#pers_'+user+'.log' // par[p].order+

    ar=[],a=-1,csvhdr='';
// ---
  function lz_num(num,dg){ var lzv=''+num; for (var n=1; n<=dg; n++) if ((lzv.length)<dg) lzv='0'+lzv; return lzv} // leading zeroes value
  function undef(s)  { return (typeof(s)== "undefined" || s==null)	}	
  function isFunc(s) { return (s=='function') }	
// ---
  function name(){ var new_name='', sp=' '; // chk_par(); +par[p].id+sp
    return par[p].order+sp+'('+bcn_id(par[p].bcn)+'_'+par[p].pr+lz_num(par[p].fr,par[p].dg)+')'
  } // +'.csv'
  function name_ser(){ var new_name='', sp=' '; // chk_par(); +par[p].id+sp
    return par[p].order+sp+'('+bcn_id(par[p].bcn)+'_'+par[p].pr+lz_num(par[p].fr,par[p].dg)+'_K'+par[p].k+'xR'+par[p].r+')'
  } // +'.csv'
//function isf(){if (par[p].isFile) return 'f'; return 'v'}
  function isf(){if (par[p].bcn>0)  return 'f'; return 'v'}
  function has_char(par,val_ar){ 
    var par_l=par.length, val_l=val_ar.length, has=false, cnt=0;
  //msg('has_char('+par+','+val_ar+'):'+par_l+','+val_l)
	for (var i=0; i<par_l; i++) {
	  for (var j=0; j<=val_l; j++) {
	    if(par.substr(i,1)==val_ar[j]) {has=true; cnt++; // msg('has_char:'+i+','+j)
		}
	  }
	}
	return has
  }
  function isin(code,ar){ var fnd=false, l=ar.length,i
  //msg('isin('+code+'['+ar.join(',')+']):')
    for(i=0; i<=l-1;i++){ // msg('... i:'+i)
	  if(code==ar[i]) {fnd=true; break;}
	}
	return fnd
  }
// ---