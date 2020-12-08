/* ах, чудна българска земьо, полюшвай цъфтящи жита! */
  fsiomode={read:1, write:2, append:8}
  fsformat={SystemDefault:-2,Unicode:-1, ASCII:0}
  
  ActiveX=null, fso=null, fsn=null, fsh=null
  
  function fs_init(){
    if(!undef(window.ActiveXObject)){ ActiveX=typeof(window.ActiveXObject)
      fso = new ActiveXObject("Scripting.FileSystemObject");
      fsn = new ActiveXObject("WScript.Network"); 
      fsh = new ActiveXObject("WScript.Shell");
      if(user==undefined || user=='') user=fsn.UserName;
      if(user=='elefter') zint=zint_paths[0]
      fn_log  ='$svc_'+user+'.log' // par[p].order+
    //fsh.Run( "command.com /K ...")
    } else msg('<e>ActiveX undefined outside IE/mshta!</e> cannot make file i/o.') // ff,node? -- _dui.msg()
    set_paths()
  }

  if(ActiveX!=null) user=fsn.UserName;	  
  function set_paths(){
	// #pers-init.bat > user, desk, pers
       deskpath=desk // 'C:\\Users\\'+user+'\\Desktop\\'
       workpath=pers // 'C:\\Users\\'+user+'\\Desktop\\#pers\\'
	// userpath=user // 'C:\\Users\\'+user+'\\'
  }
	
  function log_apnd(buf){ var f=null // ? append to fn_log, https://stackoverflow.com/questions/10193532/javascript-how-to-append-data-to-a-file
	  if(!undef(ActiveX) && fn_log!= null && buf.length>0){
	      try{ f = fso.OpenTextFile(workpath+fn_log, fsiomode.append); 
		  // msg('-- log apnd opened:'+fn_log) 
          } catch(err){ msg('... apnd open "'+workpath+fn_log+'" \n  err:'+err);
	         if(err=='Error: Permission denied') msg('   may be this file is opened from another apl.')
	      }
	  }
	  
	  if(!undef(f)) { 
	      try{ f.WriteLine(buf)}catch(err){ msg('-- log apnd: "'+buf+'"\n  err:'+err);} // +i, buf[i]
      }
      if(!undef(f)){ f.close(); } //  msg('-- log apnd closed ')
  
  }
  
  function open_file(id, fn,mode,create,format){
    try{var f = fso.OpenTextFile(fn, mode,create,format); msg('opened') // workpath+
    }catch(err){ msg('--- '+id+'open("'+fn+'")\n  err:'+err);
	   if(err=='Error: Permission denied') msg('   may be this file is opened from another apl.')
	}
	return f
  }
// ---  
  function run_pers_init(){ // pers_init_bat="#pers-init.bat"
	var fn=''+pers_init_bat; msg('run: '+''+pers_init_bat)// +' '+order+' '+user
	if(!undef(ActiveX)) fsh.run(/*command:*/fn,/*WindowStyle:*/1,/*WaitOnReturn:*/true ); // +' '+order+' '+user
// set user=%USERPROFILE%
// set desk=%USERPROFILE%\Desktop
// md %desk%\#pers
// md %desk%\#pers\#data
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
}
// ---
  function run_make_eps(){ var bcn=bcn_id(par[p].bcn) 
	if(bcn==bcn_[0].bcid) bcn=''
	var run='"'+eps_gen_bat+'"'+' '+par[p].bcn+' eps '+par[p].order+'_'+bcn+'.zint.csv' 
	// "F:\!prog.run\barcodes\STB\STB-7\#eps-make.bat" 20 eps 193408_1_Code-128.zint.csv 
    // %zint% --batch --mirror --filetype=eps --cmyk -b %bt% -i %file%
    var d = new Date(), start=d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
	msg('... eps make start:'+start+' '+run) 
  //log_apnd('... SvB:: eps make run: '+run)
	if(!undef(ActiveX)) fsh.run(/*command:*/run,/*WindowStyle:*/1,/*WaitOnReturn:*/true );
	// 102: Unable to read input file
	// =0 was unexpected at this time.
  //log_apnd('... SvB:: eps make end: ')
	var d = new Date(), stop=d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
	msg('... eps make  stop:'+stop)
  } 
  
  function repl_eps(){ 
  var br='<br/>'+crlf
  var j=0,k//,run='"'+eps_gray_bat+'" '+par[p].order; msg('eps gray: '+run) 
  var d = new Date(), start=d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
    log_apnd('... eps repl start: '+start)// time
         msg('... eps repl start: '+start)// time
    //    font                   white                         black
    fnd_=["/Helvetica findfont", "0.00 0.00 0.00 setrgbcolor", "1.00 1.00 1.00 setrgbcolor"]
    rep_=["/Arial findfont",     "0 setgray",                  "100 setgray"]
    k=null
	if(!undef(ActiveX)){ k=ar.length; // fsh.run(run)
      for(i=1; i<=k-1; i++) {// (srcpath,trgpath,fname,fnd_,rep_)
		j+=file_repl_str(workpath+'#data\\tmp\\',workpath+'#data\\',ar[i]+'.eps',fnd_,rep_) 
		// log_apnd('... '+ar[i]+':'+j/k+' repl.')
	  } 
	}
	var stop=d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
    log_apnd('... eps repl  stop: '+stop+', '+j+' replaces in '+(k-1)+' files')// time
         msg('... eps repl  stop: '+stop+', '+j+' replaces in '+(k-1)+' files')// time
  }
// ---
  function file_repl_str(srcpath,trgpath,fname,fnd_,rep_){ // replace srings in file
// open Error: File not found
  var br='<br/>'+crlf,mes
    // msg("repl_str(srcpath,trgpath,fname,fnd_,rep_):"+srcpath+br  +trgpath+br  +fname+br
    //    +' fnd_['+fnd_.join(',')+']'+br+' rep_['+rep_.join(',')+']'+br)
    // --- skip on empty par
	   if(undef(ActiveX) || fname== null || fname=='') return 0
	   var f_=fnd_.length,r_=rep_.length, i,j,k
	   if(f_<1 || r_<1 || f_!=r_) return 0
	// -- check for miss/empty dir srcpath
    // batch: if NOT exist %srcdir%\NUL stop
	// del tmp after all
	// -- open file in srcpath
	   try{ file_inp = fso.OpenTextFile(srcpath+fname, fsiomode.read, false/*create*/,fsformat.ASCII); 
       }catch(err){ mes='... eps repl: open inp:'+srcpath+fname+' event:"'+err+'"';
	     if(err=='Error: Permission denied') mes+='   may be opened from another apl.'
	     if(err=='Error: File not found')    mes+='   may be not created'
	     log_apnd(mes); msg(mes)
	     return 0
	   }
	// -- open file in trgpath
	   try{ file_out = fso.OpenTextFile(trgpath+fname, fsiomode.write, true/*create*/,fsformat.ASCII); 
       }catch(err){ mes='... eps repl: open out:'+trgpath+fname+' event:"'+errr+'"';
	     if(err=='Error: Permission denied') msg+='   may be this file is opened from another apl.'
	     log_apnd(mes); msg(mes)
	     return 0
	   }
	// -- read all to eof
	   var line, i=0; // buf = file.ReadAll();
       while(!file_inp.AtEndOfStream){ 
	     try{ line=file_inp.ReadLine()} catch(err){ msg('... eps repl:  read inp event:"'+errr+'"')} 
	     for(j=0; j<=f_; j++) if(line==fnd_[j]) { line=rep_[j]; i++ } // -- fnd_rep for each line
		 try{ file_out.WriteLine(line)} catch(err){ msg('... eps repl: write out event:"'+errr+'"')}
	   }
	// -- close input
	   if(!undef(file_inp)) file_inp.close();
	   if(!undef(file_out)) file_out.close();
	   return i
  }
/* *--/ 
   function get_csv(srcpath,fname,hdr){ var fn=srcpath+fname ,file_inp ,mes
  	   if(undef(ActiveX)) return 0
  	   if(fn== null || fn=='') {
  	      mes='... csv inp: empty file name.'
  		  msg(mes); log_apnd(mes); 
  		  return 0
  	   }
  	// -- open file
  	   mes='... get_csv:'+fn
  	   msg(mes); log_apnd(mes); 
  	   try{ file_inp = fso.OpenTextFile(fn, fsiomode.read, false,fsformat.ASCII); 
        }catch(err){ mes='-- csv inp open err:'+fn+' err:'+err;
  	     if(err=='Error: Permission denied') mes+='   may be this file is opened from another apl.'
  	     msg(mes); log_apnd(mes);
  	     return -1
  	   }
  	// -- read all to eof
  	   var line; // buf = file.ReadAll();
  	   a=0; ar[a]='';
        while(!file_inp.AtEndOfStream){ 
  	     try{ line=file_inp.ReadLine()} catch(err){ msg('-- csv inp read err:'+err);} 
  		 ar[++a]=line;// line.split(',')[0]
  		 msg('['+a+']='+ar[a]+' ')
  	   }
  	// -- close input
  	   if(!undef(file_inp)) file_inp.close();
  	   mes='... get_csv: values='+ a 
  	   msg(mes); log_apnd(mes); 
  	   return a
   }
/* */
  
  function make_seria(){ // ar[a]=pr+lz_num(frm+i ,dg)+sc;
    var mеs='Невалидни или противоречиви параметри!'; mеs='<font style="color:yellow;">'+mеs+'</font>'
    chk_par()
	if(!par_ok) msg(mеs)
	  name();
      a=0; ar[a]='' // =csvhdr;
      var  i, frm ,r=par[p].r,k=par[p].k, pr=par[p].pr, sc=par[p].sc, fr=par[p].fr,to=par[p].to, dg=par[p].dg
      i=0; frm=fr-1
      for (i=1; i<=r*k; i++) { a++; ar[a]=pr+lz_num(frm+i ,dg)+sc; }
	//xval_.innerHTML=a; // a=r.k; par[p].v=a; 
      set_val("xval", "val", par[p].v)
      set_val("SET_v", "val", par[p].v)
	  with (par[p]) mes='... seria: '+a+' ["'+order+'","'+id+'",'+bcn+', "'+pr+'","'+sc+'",'+dg+','+fr+','+v+','+k+']'; // +','+k
      msg(mes); log_apnd(mes) 
	  
      return
  }
