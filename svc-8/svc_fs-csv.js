load_new('scr/_fs-csv.js');
/* ах, чудна българска земьо, полюшвай цъфтящи жита! */
  function putCSVzint() { var mes,f,rec, bcn=bcn_id(par[p].bcn) // global ,filetype,ar
	if(bcn==bcn_[0].bcid) bcn='' 
	if(ar.length<=0) return 

    var filename=par[p].order+'_'+bcn+'.zint.csv'
	if(!undef(ActiveX) && workpath!= null){ mes='... zint csv save:'+filename
            msg(mes) // if(dbg) 
	   log_apnd(mes) 
	   try{ f = fso.OpenTextFile(workpath+'#data/'+filename, fsiomode.write, true/*create*/,fsformat.ASCII); 
	     // msg(' opened')
       }catch(err){ msg('... zint csv save open "'+filename+'" \n  ::<e>'+err+'</e>');
	       if(err=='Error: Permission denied') msg('   may be this file is opened from another apl.')
	   }
	 }
	 if(!undef(f)) { var k=par[p].k
	   // msg('write '+(ar.length-1)+' values')
	   // try{ f.WriteLine(ar[0])}  catch(err){ msg('--putCSV_hdr("'+ar[0]+'")\n  err:'+err);}	 
       var buf=''	   
	   for (i=1; i<=ar.length-1; i++) { rec=ar[i]; buf+=rec+'<br/>'
	      try{ f.WriteLine(rec)}catch(err){ msg('... zint csv save ['+i,']="'+rec+'"\n   ::<e>'+err+'</e>');}
       }
       msg('<div ID="zint.csv" class="info" style="width:750px; height:400px;">'+buf+'</div>')	   
	 }  
	 if(!undef(f)){ f.close(); } // msg('close csv')
	  mes='... csv seria (barcode:'+par[p].bcn+') for zint saved '
      msg(mes)
  }  
  
  function putCSVindd() { var mes,f,rec,bcn=bcn_id(par[p].bcn) // global ,filetype,ar
	 if(bcn==bcn_[0].bcid) bcn=''
	 if(ar.length<=0) return
	 // ---
	   var filename=par[p].order+'_'+bcn+'.indd.csv'
	   if(!undef(ActiveX) && workpath!= null){ mes='... indd csv save:'+filename
	          msg(mes) // if(dbg) 
	     log_apnd(mes) 
	     try{ f = fso.OpenTextFile(workpath+'#data/'+filename, fsiomode.write, true/*create*/,fsformat.ASCII); 
	     // msg(' opened')
         }catch(err){ msg('... indd csv save open "'+filename+'" \n <e>'+err+'</e>');
	        if(err=='Error: Permission denied') msg('... may be this file is opened from another apl.')
	     }
	   }
	   if(undef(f)) return

      var r=par[p].r ,k=par[p].k, pr=par[p].pr, sc=par[p].sc, fr=par[p].fr, v=par[p].v, to=par[p].to, dg=par[p].dg
	     ,isFile=isf()=='f'//par[p].isFile
	  var kolName='kol_'; if(isFile) kolName='@file_'; csvhdr=''
      for (var i=1; i<=par[p].k; i++) { csvhdr+=kolName+i; if(i<par[p].k) csvhdr+=','}
      // --- , between values but not at end
//    msg(csvhdr)//+newline;
	   msg(csvhdr)
	   try{ f.WriteLine(csvhdr)}  catch(err){ msg('... indd csv save hdr("'+ar[0]+'")\n  ::<e>'+err+'</e>');}	     
	 
       var i=0,j,ki,ri ,frm=1-1//fr-1
//     for (i=1; i<=ar.length-1; i+k) { rec=''
//       for (j=1; j<=k; j++) { rec+= ar[i]+'.eps'; i++; if(j<k) rec+=','}
       var buf=''	
       for (ri=1; ri<=r; ri++) { rec=''
         for (ki=1; ki<=k; ki++) { 
           i++; j=frm+Number(r*(ki-1)+ri+ki-(ki-1)*1-1);  
		 //msg( ['i,j,frm,r,k,ri,ki:']+[i,j,frm,r,k,ri,ki] ) // !!!
		   if(isFile) {rec+=ar[j]+'.eps'} else {rec+=ar[j]} // '('+bcn+')'+ar[j]+'.eps'
		   if(ki<k) rec+=','
         }
	     buf+=rec+'<br/>'
         try{ f.WriteLine(rec)}catch(err){ msg('... indd csv save ['+i,'] k:'+k+'="'+rec+'"\n  ::<e>'+err+'</e>');}
	   }
	   msg('<div ID="ind.csv" class="info" style="width:750px; height:400px;">'+buf+'</div>')
	   if(!undef(f)){ f.close(); }  // msg('close csv')
	  // ---
	  mes='... csv seria (barcode:'+par[p].bcn+') for ind saved '
      msg(mes)
	  log_apnd(mes) // ? %date% %time%
  }
// ---
  function get_csv(srcpath,fname,hdr){ var fn=srcpath+fname ,file_inp ,mes ,k,i ,b,r,buf
	   if(undef(ActiveX)) return 0
	   if(fn== null || fn=='') {
	      mes='... csv inp: empty/null file name.'
		  msg(mes); log_apnd(mes); 
		  return 0
	   }
	// -- open file
	   mes='... get_csv:'+fn
	   msg(mes); log_apnd(mes); 
	   try{ file_inp = fso.OpenTextFile(fn, fsiomode.read, false/*create*/,fsformat.ASCII); 
       }catch(err){ mes='-- csv inp open err:'+fn+' ::<e>'+err+'</e>';
	     if(err=='Error: Permission denied') mes+='   may be this file is opened from another apl.'
	     msg(mes); log_apnd(mes);
	     return -1
	   }
	// -- read all to eof
	   var line; // buf = file.ReadAll();

       r=0; k=1; csvhdr=''
	   while(!file_inp.AtEndOfStream){ 
		   try{ line=file_inp.ReadLine(); ++r;} catch(err){ msg('-- csv inp read ::<e>'+err+'</e>');} 
         if(r==1){
           if(hdr) {csvhdr=line.split(','); k=csvhdr.length; csvhdr=csvhdr.join(',');}
		 } 
	   } // count r,k
	   if(!undef(file_inp)) file_inp.close();
	   if(hdr) --r;
       msg('r:'+r+' k:'+k+' hdr:'+csvhdr)
	   
	   file_inp = fso.OpenTextFile(fn, fsiomode.read, false/*create*/,fsformat.ASCII);
	   a=-1;j=0;
       while(!file_inp.AtEndOfStream){ 
	     try{ line=file_inp.ReadLine()} catch(err){ msg('-- csv inp read ::<e>'+err+'</e>');} 
         if(a==-1 && hdr && j==0){ j++; 
		 } else { ++a; j++; b=line.split(','); ar[a]=b[0]; msg('ar['+a+']='+ar[a]);
             if (k>1) { for (i=1; i<=k-1; i++) ar[a+i*r]=b[i]; // by kol, r=rows err+-1
           }
         }
	   }

	   if(!undef(file_inp)) file_inp.close();
       a=k*r
	   mes='... get_csv: values='+ (a) //+' lines:'+j
	   msg(mes); log_apnd(mes); 

	   for (i=0; i<=a-1; i++) msg(i+':'+ar[i])
	   xval_.innerHTML=a; par[p].v=a;
	   return a
  }
/* get_csv() *-/
   function get_csv(csv_imp){var f // <-C:\Tery\+\barcode_gen\input.csv
   if( isFunc(typeof(window.ActiveXObject)) ){
     msg('open to import file:'+csv_imp) // if(dbg) 
     if(csv_imp=='' || undef(csv_imp)) {msg('undefined/empty file name'); return}
     try{ f = fso.OpenTextFile(csv_imp, fsiomode.read, false,fsformat.ASCII); 
     //msg('opened')
       }catch(err){ msg('--getcsv open("'+csv_imp+'")\n  err:'+err);
        if(err=='Error: Permission denied') msg(' may be this file is opened from another apl.')
     }
   }
   
   if(!undef(f)) { var l=-1, Rin=-1, Kin=-1, buf='', row_in=[]
     val_imp=[]
     while(!f.AtEndOfStream) { 
       try{ buf=f.ReadLine();l++;} catch(err){ msg('--getCSV_'+l,' ("'+buf+'")\n  err:'+err);}
       row_in=buf.split(',');
       if(l==0){ Rin=-1; Kin=row_in.length-1; }
   	if(par[p].has_hdr && l==0){ 
   	  msg('hdr:'+row_in.join(','))
   	  continue;
   	} else {
   	  Rin++; val_imp[Rin]=row_in; // msg(l+':'+row_in.join(','))
   	  msg('['+(Rin+1)+']:'+val_imp[Rin].join(','))
   	}
       }
     }
     if(!undef(f)){	msg('get '+csv_imp+' '+l+' lines'); f.close(); msg('close '+csv_imp) }
     Rin++; Kin++;
   par[p].Rin=Rin; par[p].Kin=Kin; msg(' Rin:'+(Rin)+' Kin:'+(Kin))
   par[p].Rcv=Rin; par[p].Kcv=Kin; 
   //par[p].byKcv=true; // default true mean kols to rows else rows to kols
   // set_val("Rin"    , 'htm', par[p].Rin   )
   // set_val("Kin"    , 'htm', par[p].Kin   )
   // set_val("Rcv"    , 'val', par[p].Rcv   )
   // set_val("Kcv"    , 'val', par[p].Kcv   )
   // set_val("byKcv"  , 'val', par[p].byKcv )
   // set_val("byKcv"  , 'chk', par[p].byKcv )
    set_val("xval"   , 'htm', Rin*Kin ) // or Rin*Kin or (par[p].to-par[p].fr+1) 
/* */
/*  swap_cv() conv_csv()*-/
  function swap_cv(){ var swap=par[p].Kcv; par[p].Kcv=par[p].Rcv; par[p].Rcv=swap; par[p].byKcv=!par[p].byKcv; //?
    set_val("Rcv"    , 'val', par[p].Rcv   )
    set_val("Kcv"    , 'val', par[p].Kcv   )
    set_val("byKcv"  , 'val', par[p].byKcv )
  }
  
  function conv_csv(){ var Rin=par[p].Rin, Kin=par[p].Kin, v
    a=0; seq[a]=''// ! hdr
    if(par[p].byKcv){ // --- todo:: submatrix
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
	
    msg('convert imported csv kol to rows='+par[p].byKcv+' and export by Rex:'+par[p].Rex+' Kex:'+par[p].Kex) // hdr!
    var k=par[p].Kex, buf='',l=0
	for (i=1; i<=seq.length-1; i+k) { l++; buf='['+l+']:'
	  for (j=1; j<=k; j++) { buf+= seq[i]; i++; if(j<k) buf+=','}
	  msg(buf)
	}
  }
/* */
load_end();