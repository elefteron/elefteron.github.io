load_new('seq-fs.js');
/* ах, чудна българска земьо, полюшвай цъфтящи жита! */
  fsiomode={read:1, write:2, append:8}
  fsformat={SystemDefault:-2,Unicode:-1, ASCII:0}
  
  _activexON=null, fso=null, fsn=null, fsh=null // ActiveX=null, 
// ---
  eol='\n'; br='<br/>'; eoln=br+eol;
// ---  
  function fs_init(){ var state=''
    _activexON = !true || (     (navigator.userAgent.toLowerCase().indexOf('msie')>=0)
                && !(window.ActiveXObject===undefined) && !(window.ActiveXObject===null) ) 
    if(_activexON){ 
      fso = new ActiveXObject("Scripting.FileSystemObject");
      fsn = new ActiveXObject("WScript.Network"); 
      fsh = new ActiveXObject("WScript.Shell");
      if(user==undefined || user=='') user=fsn.UserName;
    //if(user=='elefter') zint=zint_paths[0]
      fn_log  =log//'seq-'+user+'.log' 
    //fsh.Run( "command.com /K ...")
	       state='ActiveX: <z>defined</z>    inside IE/mshta! can make file i/o.'
    } else state='ActiveX: <e>undefined</e> outside IE/mshta! can`t make file  i/o.' // ff,node? -- 
	return state
  }
// ---
  function log_apnd(buf){ var f=null // ? append to fn_log, https://stackoverflow.com/questions/10193532/javascript-how-to-append-data-to-a-file
	  if(_activexON && fn_log!= null && buf.length>0){
	      try{ f = fso.OpenTextFile(fn_log, fsiomode.append); // workpath+fn_log
		  // msg('-- log apnd opened:'+fn_log) 
          } catch(err){ msg('-- apnd open "'+workpath+fn_log+'"'+eoln+' err:'+err+eoln);
	         if(err=='Error: Permission denied') msg('--  may be this file is opened from another apl.'+eoln)
	      }
	  }
	  
	  if(!undef(f)) { 
	      try{ f.WriteLine(buf)}catch(err){ msg('-- log apnd: "'+buf+'"'+eol+' err:'+err+eoln);} // +i, buf[i]
      }
      if(!undef(f)){ f.close(); } //  msg('-- log apnd closed ')
  }
// ---  
  function open_file(id, fn,mode,create,format){
    try{var f = fso.OpenTextFile(fn, mode,create,format); msg('opened') // workpath+
    }catch(err){ msg('--- '+id+'open("'+fn+'")\n  err:'+err);
	   if(err=='Error: Permission denied') msg('   may be this file is opened from another apl.')
	}
	return f
  }
// --- 
  function save_par(data){ var filename=''
    if(_activexON && job.ord!='' && jobs!=''){ 
      with(job) filename='lib/'+[ord,clt,isu,dat].join(' ')+'.seq-job';
      // msg('save_par: begin'+eoln)
	   // -- open 
	   try{ f = fso.OpenTextFile(jobs+'/'+filename, fsiomode.write, true/*create*/,fsformat.ASCII); 
	    // msg(' save_par: opened'+eoln)
       }catch(err){ mes('-- *.seq-job open to save "'+filename+'"'+eol+' ::<e>'+err+'</e>');
	   	  msg(mes+eoln); log_apnd(mes)
	      if(err=='Error: Permission denied') msg('   may be this file is opened from another apl.'+eoln)
		  return
	   }
    } else msg(' save_par: skip! ax:'+_activexON+' ord:'+job.ord+eoln)
    
	if(undef(f)) return
	{//-- write   
	     try{ f.WriteLine(data)}
		 catch(err){ mes=('-- save-par: save ['+i,']="'+data+'"\n   ::<e>'+err+'</e>');
	       msg(mes+eoln); log_apnd(mes)
		   return
		 }
	  mes='{ "'+filename+'" } // saved'; msg(mes); log_apnd(mes) 
	}
	// -- close
	if(!undef(f)) f.close(); // msg('closed'+eoln) // --- !? and not err  
    
  }
// --- 
  function putCSVzint() { var mes,f,rec // global ,filetype,ar
	if(_activexON && job.ord!='' && jobs!='' && (seq.val.length>0)){ msg(' saveCSVzint: begin'+eoln)
       var filename=job.ord+' ('+seq.bcn+' '+bcn_id(seq.bcn)+')'
	               +' ['+(seq.val.length)+'].eps-list.csv' // space in name break it as batch param
	   // -- open 
	   // mes='{-- '+jobs+'eps/'+filename; msg(mes+eoln); log_apnd(mes);
	   try{ f = fso.OpenTextFile(jobs+'/'+filename, fsiomode.write, true/*create*/,fsformat.ASCII); 
	      msg(' saveCSVzint: opened'+eoln)
       }catch(err){ mes('-- *.eps-list.csv open to save"'+filename+'"'+eol+' ::<e>'+err+'</e>');
	   	  msg(mes+eoln); log_apnd(mes)
	      if(err=='Error: Permission denied') msg('   may be this file is opened from another apl.'+eoln)
		  return
	   }
	} else msg(' saveCSVzint: skip! ax:'+_activexON+' ord:'+job.ord+' val[]:'+seq.val.length+eoln)
	if(undef(f)) return
	{//-- write
      var buf=''	   
	  for (i=0; i<=seq.val.length-1; i++) { rec=seq.val[i]; buf+=rec+'<br/>'
	     try{ f.WriteLine(rec)}
		 catch(err){ mes=('-- eps-list.csv save ['+i,']="'+rec+'"\n   ::<e>'+err+'</e>');
	       msg(mes+eoln); log_apnd(mes)
		   return
		 }
      }
	//mes='-- saved (barcode:'+seq.bcn+')'; msg(mes+eoln); log_apnd(mes)
	  mes='{  "save": "'+jobs+''+filename+'" }'; msg(mes); log_apnd(mes) 
      msg('<div ID="eps.csv" class="info" style="width:630px; height:250px;">'+buf+'</div>'+eoln)
	}
	// -- close
	if(!undef(f)) f.close();  msg('closed'+eoln) // --- !? and not err  
  }   
// ---  
  function putCSVindd() { var mes,f,rec// global ,filetype,ar
	if(_activexON && (seq.typ=='ord' || seq.typ=='val') && (seq.val.length>0)){
	  msg(' putCSVindd: begin col='+seq.col+eoln)
	  // --- open 
	  var filename=job.ord+' ('+seq.bcn+' '+bcn_id(seq.bcn)+')'
	              +' ['+(seq.val.length/seq.col*seq.stp)+'x'+seq.col+'].pdf-list.csv'
//   if(seq.bcn==bcn_[0].bcid)
//    mes='{-- '+jobs+'pdf/'+filename; msg(mes); log_apnd(mes) 
	       
	  try{ f = fso.OpenTextFile(jobs+'pdf/'+filename, fsiomode.write, true/*create*/,fsformat.ASCII); 
	     msg('-- putCSVindd: opened'+eoln)
      }catch(err){ mes('-- *.pdf-list.csv save open "'+filename+'"'+eol+' <e>'+err+'</e>');
               msg(mes+eol); log_apnd(mes)
	      if(err=='Error: Permission denied') msg('-- may be this file is opened from another apl.'+eoln)
		  return
	  }
	} else { 
	  msg(['putCSVindd: wrn! ','_activexON:',_activexON,'seq.typ:"',seq.typ,'"','seq.fil:"',seq.fil,'"'
	  ,'seq.val[',seq.val.length,']','seq.col:',seq.col,'seq.row:',seq.row,'seq.bcn:',seq.bcn].join(' ')); return
	}
	if(undef(f)) return
	{// --- write hdr
      var isFile=seq.bcn>0, csvhdr=''; buf=''
	  var kolName='col_'; if(isFile) kolName='@file_';
      for (var i=1; i<=seq.col; i++) { csvhdr+=kolName+i; if(i<seq.col) csvhdr+=','}
	  try{ f.WriteLine(csvhdr); buf+=csvhdr+eoln}  
	  catch(err){ 
		mes=('-- *.pdf-list.csv save hdr("'+csvhdr+'")'+eol+' ::<e>'+err+'</e>');
	    msg(mes+eoln);log_apnd(mes)
		return
	  }	 
	}	  
	{// --- write table
      var i=-1,j,v
      for (var ri=1; ri<=seq.row; ri++) { rec=''
        for (var ki=1; ki<=seq.col; ki++) { i++;
           j=          -1 +(seq.row)*(ki-1) +ri +ki -(ki-1)*1-1; // ok
		   if(typeof(j)==='undefined'){ msg('= []:'+j+eoln); return }
		   v=seq.val[j]
		   if(typeof(v)==='undefined'){ msg('= seq['+j+']:'+v+eoln); return }// seq[2001]:undefined
	  	   rec+=''+v; if(isFile) rec+='.pdf'; // output new values
	  	   if(ki<seq.col) rec+=','
        }
	    buf+=rec
        if(isFile) buf+='.pdf'
        try{ f.WriteLine(rec+eoln)}
	    catch(err){ 
	  	  mes=('-- *.pdf-list.csv save ['+i,'] row:'+ri+' rec:"'+rec+'"'+eol+' ::<e>'+err+'</e>');
	      msg(mes+eoln); log_apnd(mes)
	  	  return
	    }
	  }
    } 
	// mes='-- saved (barcode:'+seq.bcn+')'; msg(mes);log_apnd(mes);
	mes='{  "save": "'+jobs+'pdf/'+filename+'" }'; msg(mes); log_apnd(mes) 
	msg('<div ID="pdf.csv" class="info" style="width:630px; height:400px;">'+buf+'</div>')
	// --- close
	if(!undef(f)){ f.close(); }; msg('closed'+eoln)
  }
// --- ?
  function run_pers_init(){ var fn_init='seq-init.cmd'// pers_init_bat="#pers-init.bat"
	msg('run: '+fn_init)// +' '+order+' '+user
	if(_activexON) fsh.Run(/*command:*/fn_init,/*WindowStyle:*/1,/*WaitOnReturn:*/true ); 
  }
/* docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/windows-scripting/d5fk67ky(v=vs.84)?redirectedfrom=MSDN
	 fsh.Run("command.com /K ???")
	 fsh.Run("cmd /C d:\\"+Project+"\\???.bat",WindowStyle,WaitOnReturn) // [WindowStyle:0..10], [WaitOnReturn:true|false]
     0	Hides the window and activates another window.
     1	Activates and displays a window. If the window is minimized or maximized, the system restores it to its original size and position. An application should specify this flag when displaying the window for the first time.
     2	Activates the window and displays it as a minimized window.
     3	Activates the window and displays it as a maximized window.
     4	Displays a window in its most recent size and position. The active window remains active.
     5	Activates the window and displays it in its current size and position.
     6	Minimizes the specified window and activates the next top-level window in the Z order.
     7	Displays the window as a minimized window. The active window remains active.
     8	Displays the window in its current state. The active window remains active.
     9	Activates and displays the window. If the window is minimized or maximized, the system restores it to its original size and position. An application should specify this flag when restoring a minimized window.
     10	Sets the show-state based on the state of the program that started the application.
	 docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/windows-scripting/ateytk4a%28v%3dvs.84%29
*/
// --- 
  function run(f){ var res=''
	  msg(eoln+'run: '+f+' ')
	  if(_activexON) { 
	     res=fsh.run(f,1); //,10: unable to wait for process
	  // fsh.Run(/*command:*/runpar,/*WindowStyle:*/1,/*WaitOnReturn:*/true );
	     msg(' <z>runed</z> '+res) 
	  } else msg(' <e>skipped</e>')
	  msg(eoln)
	  // open tab with file/dir/cmd <a href="">...</a>
  //   0: The system cannot find the file specified
  // 102: Unable to read input file;  =0 was unexpected at this time.
  }
// ---
  function csv2eps(){ var runpar,mes,bcn=bcn_id(seq.bcn) // old: run_make_eps, "...#eps-make.bat"
	 if(bcn==0) return
	 if(seq.val.length<1) return
     var filename=job.ord+' ('+seq.bcn+' '+bcn_id(seq.bcn)+')'
	             +' ['+(seq.val.length)+'].eps-list.csv'
	 // space in name without "" breaks batch param	 
     /* 'csv2eps.cmd' barcodetype filetype csvfile *-/
       csv2eps.cmd 20 eps 193408_1_Code-128.zint.csv      
       %zint% --batch --mirror --filetype=eps --cmyk -b %bt% -i %file%
     /*  */
	 runpar='"'+src+'csv2eps.cmd" '+seq.bcn+' eps ' + '"..\\'+filename+'"'  // "cd %jobs%\eps"
  //      %zintdir%\%zint% --batch --mirror --filetype=%ft% --cmyk -b %bt% -i %file%
  // runpar=zintdir+zint+' --batch --mirror --filetype=eps --cmyk -b '+seq.bcn+' -i '+filename
  // set output dir jobs\eps ro  zint !?
  //  --nobackground
  
  // var d1 = new Date(), start=d1.getHours()+':'+d1.getMinutes()+':'+d1.getSeconds();
  // mes="--- csv2eps begin:"+start; msg(mes+eoln);  log_apnd(mes); 
  // msg('--- todo: '+runpar+eoln); log_apnd('--- todo: '+runpar);  
	 if(_activexON) run(runpar);
  // var d2 = new Date(), stop=d2.getHours()+':'+d2.getMinutes()+':'+d2.getSeconds();
  // mes="--- csv2eps final:"+stop; msg(mes+eoln); log_apnd(mes); 
  } 
// ---
  function ps2pdf(){ var runpar,mes,bcn=bcn_id(seq.bcn) // old: run_make_eps, "...#eps-make.bat"
	 if(bcn==0) return // ?
	 if(seq.val.length<1) return
	 var l=1 // seq.val.length-1
	 for(var i=0; i<=l; i++){
     // "cd %jobs%\pdf"
       runpar='"'+src+'ps2pdf.cmd" "..\\ps\\'+seq.val[i]+'.ps"'  
       if(_activexON) run(runpar);
	 }
  } 
// ---  
  function eps2ps(){ // refine eps
    var br='<br/>'+eol
    
    var j=0,k//,run='"'+eps_gray_bat+'" '+par[p].order; msg('eps gray: '+run) 
    var d1 = new Date(), start=d1.getHours()+':'+d1.getMinutes()+':'+d1.getSeconds();
    var mes=("--- 'eps2ps' begin: "+start)// time
    msg(mes+eoln); 
	log_apnd(mes)
    //    font                   white                         black
    fnd_=["/Helvetica findfont", "0.00 0.00 0.00 setrgbcolor", "1.00 1.00 1.00 setrgbcolor"]
    rep_=["/ArialMT findfont"  , "0 setgray"                 , "100 setgray"]
    k=seq.val.length; total_err=0
	if(_activexON){  // fsh.run(run)
      for(i=0; i<=k-1; i++) {// (srcpath,trgpath,fname,fnd_,rep_)
		j+=file_repl_str(jobs+'eps/','.eps' ,jobs+'ps/','.ps' ,seq.val[i],fnd_,rep_) 
		// log_apnd('... '+ar[i]+':'+j/k+' repl.')
		if(total_err>10) { var mes="-- 'eps2ps': stopped due to too much errors: ";
          msg(mes+eoln); log_apnd(mes)
		  break;
		}
	  } 
	}
	var d2 = new Date(), stop=d2.getHours()+':'+d2.getMinutes()+':'+d2.getSeconds();
    mes=("--- 'eps2ps' final: "+stop+', '+j+' replaces in '+(k)+' files err:'+total_err)// time
    msg(mes+eoln); log_apnd(mes)
  }
// ---
  total_err=0
  function file_repl_str(srcpath,s_ext,trgpath,t_ext,fname,fnd_,rep_){ // replace srings in file
// open Error: File not found
  var br='<br/>'+eol,mes
    // msg("repl_str(srcpath,trgpath,fname,fnd_,rep_):"+srcpath+br  +trgpath+br  +fname+br
    //    +' fnd_['+fnd_.join(',')+']'+br+' rep_['+rep_.join(',')+']'+br)
    // --- skip on empty par
	   if(!_activexON || fname== null || fname=='') {total_err++; return 0}
	   var f_=fnd_.length,r_=rep_.length, i,j,k
	   if(f_<1 || r_<1)  {total_err++; return 0}
	// -- check for miss/empty dir srcpath
    // batch: if NOT exist %srcdir%\NUL stop
	// del tmp after all
	// -- open file in srcpath
	   try{ file_inp = fso.OpenTextFile(srcpath+fname+s_ext, fsiomode.read, false/*create*/,fsformat.ASCII); 
       }catch(err){ mes="-- 'eps repl': open inp:"+srcpath+fname+s_ext+' event:"'+err+'"';
	     if(err=='Error: Permission denied') mes+='   may be opened/blocked from another apl./protection'
	     if(err=='Error: File not found')    mes+='   may be not created'
	     log_apnd(mes); msg(mes+eoln); 
	     total_err++; return 0
	   }
	// -- open file in trgpath
	   try{ file_out = fso.OpenTextFile(trgpath+fname+t_ext, fsiomode.write, true/*create*/,fsformat.ASCII); 
       }catch(err){ mes="-- 'eps repl': open out:"+trgpath+fname+t_ext+' event:"'+err+'"';
	     if(err=='Error: Permission denied') mes+='   may be this file is opened from another apl.'
	     msg(mes+eoln)
		 log_apnd(mes); 
	     total_err++; return 0
	   }
	   total_err=0; // if(dbg) msg("-- 'eps repl': opened 2 files"+eoln)
	// -- read all to eof
	   var line, i=0; // buf = file.ReadAll();
       while(!file_inp.AtEndOfStream){ 
	     try{ line=file_inp.ReadLine()} catch(err){ msg('-- eps repl:  read inp event:"'+err+'"')} 
	     for(j=0; j<=f_; j++) if(line==fnd_[j]) { line=rep_[j]; i++ } // -- fnd_rep for each line
		 try{ file_out.WriteLine(line)} catch(err){ msg('-- eps repl: write out event:"'+err+'"')}
	   }
	// -- close input
	   if(!undef(file_inp)) file_inp.close();
	   if(!undef(file_out)) file_out.close();
	   return i
  }
// ---  
  function get_csv(fname,hdr,col){ var fn=fname ,file_inp ,mes // ,hdr,col
	var err=!true,mes=''; fill=seq.val.length
	  if(fill>0)              { err=true; mes+='-- get_csv: already fill with '+fill+eoln}
      if(!_activexON)         { err=true; }
      if(fn== null || fn=='') { err=true; mes+='-- get_csv: empty file name.'}
    if(err){ msg(mes+eoln); log_apnd(mes); return 0 }
    // -- open file
    mes='-- get_csv:'+fn+' hdr:'+hdr+' cols:'+col; msg(mes+eoln); log_apnd(mes); 
    try{ file_inp = fso.OpenTextFile(fn, fsiomode.read, false,fsformat.ASCII); 
      }catch(err){ mes='-- csv inp open err:'+fn+' err:'+err;
      if(err=='Error: Permission denied') mes+='   may be this file is opened from another apl.'
      msg(mes+eoln); log_apnd(mes); return -1
    }
    // -- read all to eof
    var line; // buf = file.ReadAll();
    var i=-1, buf=''; 
	seq.val=[]; 
    while(!file_inp.AtEndOfStream){ 
      try{ line=file_inp.ReadLine()} catch(err){ msg('-- csv inp read err:'+err+eoln);} 
 	  seq.val[++i]=line;// line.split(',')[0]
 	  buf+=('['+i+']='+seq.val[i]+eoln)
    }
	msg(buf)
    // -- close input
    if(!undef(file_inp)) file_inp.close();
	// -- par to seq.*, ui
	seq.tot=seq.val.length;  seq_tot.value=seq.tot;
	seq.col=col;             seq_col.value=seq.col;
	seq.row=seq.tot/seq.col; seq_row.value=seq.row;
	var id_=setById("seq_mak"); id_.innerHTML='<v>●</v>';// ◎ ●
	
    mes='-- get_csv: values='+ seq.tot; msg(mes); log_apnd(mes);
	return i
  }
// ---   
load_end();
