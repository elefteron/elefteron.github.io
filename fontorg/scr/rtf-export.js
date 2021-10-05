load_new('scr/rtf-export.js')
function RtfExport(pto,fname,fext,Win_Mac,date){ var s1='\\' 
  HDRclr=s1+'cf2'; SETclr=s1+'cf1'; TXTclr=s1+'cf3'; TXTclr=s1+'cf2';
  var i,k,buf,TESTrtf,mes, TestSz, DefSz,BI; 
  // TestSz:string[3]; DefSz:string[3]; BI:string[10];
  
  outf=pto+fname+fext
  log(eol+'=== RTF export to: '+outf+eol+br);
  /*--- open ---*/
    iomode=2 // iomode=1:read, 2:write 8:append
    createNewIfUnexist=true
    // =True:Unicode                
    // =False:ascii  - if omitted, the file is opened as ASCII. 
    // =TristateUseDefault?:system default  
    Unicode=false 
    save=fso.OpenTextFile(outf,iomode,createNewIfUnexist,Unicode);
    
    //  overwrite=true/false (if omitted)
    //  save=fso.CreateTextFile(,overwrite ,unicode);
  /*---*/                                             
  
/*--- RTF Header export (ReachTextFormat) ---*/
  CrntSet=-1;
  if (Win_Mac=='W') buf='{'+s1+'rtf1'+s1+'ansi'+s1+'ansicpg1251'+s1+'deff0 ' /*:Windows RTF start*/
  else              buf='{'+s1+'rtf0'+s1+'mac' +s1+'deff21';                 /*:MacOS   RTF start*/
  buf=buf+'{'+s1+'fonttbl'
         +'{'+s1+'f0'+s1+'fnil'+s1+'fcharset0 Arial;}'; /*Default font==Arial*/
  save.Write(buf+eol);  // buf=load.ReadLine()
  for (i=1; i<=LastFont; i++) with (Fonts[i]) {
    buf='{'+s1+'f'+i+s1+'fnil '+WinName+';}';
    if (i==LastFont)  buf=buf+'}'; save.write(buf+eol);
  };
  save.write('{'+s1+'colortbl ;'
     +s1+'red0'  +s1+'green255'+s1+'blue255;'   // 1:cyan
     +s1+'red0'  +s1+'green0'  +s1+'blue0;'     // 2:black
     +s1+'red0'  +s1+'green0'  +s1+'blue255;'   // 3:blue
     +s1+'red255'+s1+'green255'+s1+'blue0;'     // 4:yellow
     +s1+'red255'+s1+'green0'  +s1+'blue255;'   // 5:magenta
     +s1+'red255'+s1+'green0'  +s1+'blue0;}'    // 6:red
     +eol);
  buf=s1+'uc1'+s1+'pard'       // end of font table
      /*rtfTab stops*/
      // Trunc() - rounded to integer - pascal
      // Math.floor(a) -integer closest to and not greater than a -js
      +s1+'tx'+Math.floor(568* 0.6)
      +s1+'tx'+Math.floor(568* 1.5)
      +s1+'tx'+Math.floor(568* 2.5)
      +s1+'tx'+Math.floor(568* 5.0)
      +s1+'tx'+Math.floor(568* 9.0)
      +s1+'tx'+Math.floor(568*14.0)
      +s1+'tx'+Math.floor(568*19.0)
      +TXTclr             //default color
      +s1+'lang1026'+s1+'ulnone' //?, no underline
      +s1+'f0'+s1+'fs'+DefTxtSz*2//set default font=0  &&  default text size==points*2*/
  save.write(buf+eol);
  save.write('{'+s1+'info{'+s1+'title Fontorg catalog ""'+fname+'", files='+LastFont+'}}'+eol);
  var mw='os=?'; if (Win_Mac=='W') mw='win'; else if (Win_Mac=='M') mw='mac';
  save.write(s1+'f0'+s1+'fs'+18*2+'Fontorg catalog "'+fname+'" '+mw+' files='+(LastFont+1)+rtfNwln+eol);
/*--- RTF body export with message for bad names*/
  DefSz =DefTxtSz*2 
  if (Win_Mac=='W') TESTrtf=TESTrtfwin; else TESTrtf=TESTrtfmac;
  for (k=1; k<= LastFont; k++) with (Fonts[k]){
    if (SetNo!=CrntSet) with (Sets[SetNo])    {CrntSet=SetNo;
      buf=SETclr+s1+'f0'+s1+'fs'+DefSz
	       +s1+'b No'+rtfTab+'Type'+rtfTab+'Style'+rtfTab
	       +'File name'+rtfTab+'Font name'+rtfTab+'Ps name'+rtfTab
	       +'{files='+(TTfil+PSfil)+' in Set:'+Name+'}'+s1+'b0'+rtfNwln /*antetka*/
      save.write(buf+eol);
    };
    /* if Flag=='C'  { };/**/
    buf=''; BI='';/* --- normal/bold/italic/b+i --- */
    if      (StyleCh=='B')  BI=s1+'b '
    else if (StyleCh=='I')  BI=s1+'i '
    else if (StyleCh=='T')  BI=s1+'b'+s1+'i ';
 /* mes=GetFontErr(k); if mes!=''  mes='/*\cf5 '+mes+'\cf0\f0\b0\i0}'; */
    buf=TXTclr+s1+'f0'+s1+'fs'+DefSz+' '
	     +k+rtfTab+TypeCh+rtfTab+StyleCh+rtfTab
	     +FileName+rtfTab+WinName+rtfTab+PSname/*+rtfTab+mes*/+rtfNwln;
    save.write(buf+eol);
    save.write('{'+TXTclr+s1+'f'+k+s1+'fs'+TestTxtSz+eol);
    save.write(BI+TESTrtf   /* hex val \'hh if code>127 */ +s1+'cf0'+s1+'f0'+s1+'b0'+s1+'i0'+rtfNwln+eol);
  }/*for k*/;
  save.write(gener+' at '+date+'}}'+eol);
  save.Close(); // Close(Out_fh);
  log('=== RTF exported.'+eol+br);
}// ------------------------------------------------
load_end()