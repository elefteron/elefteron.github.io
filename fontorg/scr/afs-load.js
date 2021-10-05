load_new('scr/afs-load.js')
// -------------------
// -- for getmem   
//    F=2+2+2 +1+1 +2+1 +2+1 +101+(FntNameLng+1)*2+2; // file max lng
//    P=253+2 // path max lng /*for ex.: D:\xxxxx*/
//    S=SetNameLng+1 +2+2+2+2 // :word
// -------------------
      MaxKey=3+2+2;
      keyTable   =[] //[MaxKey]
      keyTable[0]='PS=';   keyTable[1]='TYPE=';  keyTable[2]='STYL='
      keyTable[3]='WNAM='; keyTable[4]='WFIL=';  /* Windows only */
      keyTable[5]='MNAM='; keyTable[6]='MFIL=';  /* Mac only     */
      AFSTable   =[]
      AFSTable[0]=''
      AFSTable[1]='%!BeginSet ';    AFSTable[2]='%!EndSet ';        
      AFSTable[3]='keys:...'
      AFSTable[4]='%!UsePath ';     AFSTable[5]='%!PathSeparator '; 
      AFSTable[6]='%!AdobeFontSet'; AFSTable[7]='%!UseVolume ';
      AFSTable[8]='%!';
// 6  %!AdobeFontSet 2.0
// 1  %!BeginSet aaaaa
// 5  %!PathSeparator :
// 7  %!UseVolume C:
// 4  %!UsePath :fnt:nonserif:
// 3  PS=AharoniBold,TYPE=TT,STYL=BOLD,WNAM=Aharoni,,Bold,WFIL=ahronbd.ttf
// 2  %!EndSet 
// --------------------------------------------------------
Par       =[]; LastPar=-1 //?
function adPar(){ if(LastPar>=MaxKey) return
  LastPar++
  Par[LastPar]=String//(FntNameLng)              
} 
for (i=0; i<MaxKey; i++) {adPar(); Par[i]=' '}
// --------------------------------------------------------
function GetKey(key, buf, wstr,n) {// buf - del key+par wstr - par
 var err=false
 if ( key==undefined) {log('GetKey 1:  key=undefined!'+eol+br); err=true}
 if ( buf==undefined) {log('GetKey 2:  buf=undefined!'+eol+br); err=true}
 if (wstr==undefined) {log('GetKey 3: wstr=undefined!'+eol+br); err=true}
 if (err) return false
  var i,k,fr, b
  wstr='';//?
  i=FindStr(',,',buf);            
  if (i>=0) delstr(buf,i,1); 
  i=FindStr(key,buf);              
  if (i<-0) return false;     
  
  fr=i; b=buf; 
  if(test>2) log('GetKey.delstr_left fr='+fr+'. ln='+(i+key.length-1)+eol)
  b=delstr(buf,0,i+key.length); // del left
  k=FindStr(',',b); if (k<0)  k=b.length; else k=k-1;
  for (i=0; i<=k; i++) wstr+=b.charAt(i)  // copy
  buf=delstr(buf,fr,key.length+k+1);//?
  if(test>1) log('GetKey: '+key+', wstr='+wstr+eol+br)
  Par[n]=wstr
  return true
}// ------------------------------------------------/* */
function AFS_Scan(buf){  /*return: CrntSetName,Par[1..5]*/
  if (buf=='') return
  if (buf==undefined) {log('AFS_Scan 1:  buf=undefined!'+eol+br); err=true}
  var AFS_Scan_=0; LastPar=-1
/*--- input syntax: 
PS name,type(TT/PS==T1/MM/MMI),[style],win name,[...]-ignored,[Win style]-ignored!,wfile /* */
var  i,wstr,w
  wstr=TrimSP(buf,'B'); // log('AFS_Scan trimed:'+wstr+eol+br)
  if (wstr=='')  return;

  for (i=1; i<=8; i++){  AFS_Scan_=i; 
    if (i!=3) if(GetKey(AFSTable[i],buf,wstr,1)) {
      if (test>1) log('AFS_Scan:'+AFS_Scan_+eol+br);
      return AFS_Scan_; 
    }
  }
  /*8: skip comment and other commands*/

  // if path exist return PathNo, else save newPath  &&  return PathNo:*/
  
  if (test>1)  log('AFS_Scan.  buf='+buf+eol+'AFS_Scan. wstr='+wstr+eol+br)
  AFS_Scan_=3; LastPar=-1
  for (i=0; i<MaxKey; i++) {
    if (GetKey(keyTable[i],buf,wstr,i)) { LastPar=i
      wstr=TrimSP(wstr,'B');
      if (test>1)  log('AFS_Scan. found key['+i+']="'+keyTable[i]+'" : '+Par[i]+' '+eol);
    };
  }
  
///*skip second style descr:*/
//if (test>0)  if (i>0)  log('AFS_Scan. skip '+i+' chars: "'+buf+'"'+eol);

  /*convert PS SubTypes:*/
  if      (Par[1]=='T1')   Par[1]='1'
  else if (Par[1]=='T3')   Par[1]='3'
  else if (Par[1]=='MM')   Par[1]='M'
  else if (Par[1]=='MMI')  Par[1]='I' /*without file name*/
  else if (Par[1]=='TT')   Par[1]='T'
  else if (Par[1]=='OT')   Par[1]='O'
  /*(Light,Normal,Normal-Italic) (Bold) (Italic) (Bold-Italic,Bold Italic)*/
  /*convert Style to NBIT:*/
  if      (Par[2]=='NORMAL' || Par[2]=='PLAIN')             Par[2]='N'
  else if (Par[2]=='BOLD'       )                           Par[2]='B'
  else if (Par[2]=='ITALIC'     )                           Par[2]='I'
  else if (Par[2]=='BOLDITALIC'  
        || Par[2]=='BOLD ITALIC' || Par[2]=='BOLD-ITALIC')  Par[2]='T'
  else{
//    log(errclr+'AFS_Scan.bad/missing par[2]: styl='+Par[2]+endclr+eol+br);
    par[2]='N'
  }
  
  if(test>2)log('AFS_Scan:'+AFS_Scan_+eol+br);
  return AFS_Scan_
}// ------------------------------------------------

/*--- load & parse *.afs, list parse result ---*/
function AFS_load (pfr,fname,fext){ var Win_Mac='?' /*:char */ ,AFS
var buf,savebuf,mes ,ln ,i,j,k,err/*:integer*/
  inpf=pfr+fname+fext// activex cant work with relative path
  log('=== AFS load: from '+inpf+eol+br);
  /*--- open ---*/
    iomode=1 // iomode=1:read, 2:write 8:append
    createNewIfUnexist=false
    // =True:Unicode                
    // =False:ascii  - if omitted, the file is opened as ASCII. 
    // =TristateUseDefault?:system default  
    Unicode=false 
    load=fso.OpenTextFile(inpf,iomode,createNewIfUnexist,Unicode);
    
    //  overwrite=true/false (if omitted)
    //  save=fso.CreateTextFile(,overwrite ,unicode);
  /*---*/                                             
  ln=0; PrevFont='?'; CrntSetName='?'; CrntPath='?';
  // CrntSet=adSet(); Sets[CrntSet].Name='Outside Any SET'
  //if (test>1) 
	//log('Set no:'+fl(CrntSet,4,' ')+' name='+CrntSetName
	 //   +' Lastset='+LastSet        +eol+br)
	    
  while (!load.AtEndOfStream){  // (!eof(load))        - pascal
    buf= load.ReadLine();       // readLn(Inp_fh,buf); - pascal  
    ln++;
    buf=TrimSP(buf,'B');
    if (buf=='' || buf==undefined) continue 
    if (test>2) log('line('+ln+'): '+buf+eol+br)
    for (i=0; i<MaxKey; i++) Par[i]='?';
    savebuf=buf;
    for (i=0; i<MaxKey; i++) Par[i]=''// clear previous par
    
    AFS=AFS_Scan(buf);
    if(test>1) { log('LoadAFS. ['+AFS+']='+AFSTable[AFS]+eol) 
	     for (i=0;i<=LastPar; i++) buf+=eol+i+':'+keyTable[i]+Par[i]; 
	     //log('LoadAFS.Par[0..'+LastPar+'] '+buf+eol)// from AFS_Scan()
    }
// -------------
    // -- 3:adFont() 1,2:adSet() 4:adPath() 7:vol 
	// -- sets are sequential and not repeated, but paths not!!!
	// log(br+'line '+ln+' #afs '+AFS+'='+AFSTable[AFS]+': ')
	// log(br+'line '+ln+' '+savebuf)
    if (AFS==1)  { 
	    CrntSetName=Par[1];// AFSTable[1]='%!BeginSet ';
    //if (LastSet<MaxSet)  { 
	    CrntSet=adSet()/*new SET*/
	      if (test>1) log('LoadAFS.Set no:'+CrntSet+' name='+CrntSetName
	                      +' Lastset='+LastSet        +eol+br)
	      if (ValidFontName(CrntSetName)>-1){ 
  	      if (test>0) 
  	        log(errclr+'LoadAFS.ValidFontName: bad chars "'+CrntSetName+'"'+endclr+eol+br)
	        // CrntSetName='Set#'+CrntSet;// change bad set name
        }
        Sets[CrntSet].Name=CrntSetName;
	      if (test>0) log('Set# '+CrntSet+' Name='+Sets[CrntSet].Name+eol+br);
    //} else { log('LoadAFS.Exceeded maxSet='+fl(MaxSet,6,' ')+eol); return;};
    } else if (AFS==2) {  CrntSetName='?' /*end of SET*/ // AFSTable[2]='%!EndSet '; 
    } else if (AFS==3) { /*New file*/          

    //if (LastFont>=MaxFont) { 
    //  log('LoadAFS.Exceeded maxFont='+fl(MaxFont,6,' ')+eol); return;
    //}
      CrntFont=adFont();
//    if (LastFont==0)  {
	      if      (FindStr('WNAM=',savebuf)>-1)  Win_Mac='W'
	      else if (FindStr('MNAM=',savebuf)>-1)  Win_Mac='M'
	      else Win_Mac='?'
//    }
      with (Fonts[CrntFont]) { //=Bad     /*0=ok,1=win,2=ps,3=both*/
	      SetNo=CrntSet; Flag='*'; Bad=0; PathNo=CrntPath;
	      RepStWin='-'; RepWin=0; RepStPs='-'; RepPs=0;
	      if      (FindStr('CYR',CrntSetName)>-1)  Flag='C'
	      else if (FindStr('LAT',CrntSetName)>-1)  Flag='L';

	      if (par[3]!='?')  WinName =Par[3]; else WinName =Par[3+1];
	      if (par[4]!='?')  FileName=Par[4]; else FileName=Par[4+2];
	      PSname=Par[0];
	      TypeCh=Par[1];
	      
	      if (Win_Mac=='M') /*for MacOS*/  { var mpar=Caps(PSname);
	        j=FindStr('-',mpar); if (j>-1)  delstr(mpar,1,j);/*name-styles*/
	        StyleCh='N';
	        if (FindStr('BOLD'  ,mpar)>-1)  StyleCh='B';
	        if (FindStr('ITALIC',mpar)>-1) 
	          if (StyleCh=='B')  StyleCh='T'; else StyleCh='I';
	        if (test>0) log('LoadAFS. mac style='+mpar+' new='+StyleCh+eol+br);
	      } else /*Win OS*/ { StyleCh=Par[2];
	        if (StyleCh=='?')  StyleCh='N'; /*style Normal by default*/
	      }
	      if (StyleCh!='N' && StyleCh!='B' && StyleCh!='I' && StyleCh!='T')
	        StyleCh='N' 
	      // ShowFont(CrntFont)
        /*--- clear left&right spaces in font names*/
	      //buf=TrimSP(WinName,'B'); WinName=buf;
	      mes=''; 
	      err=ValidFontName(WinName); //=Bad     /*0=ok,1=win,2=ps,3=both*/
	      if (err>-1)  { 
	        mes+='Win name bad char at pos:'+fl(err,5,' ')+' "'+WinName+'"'+eol
	        //+fl(CrntFont,FntNameLng,' ');
	         Bad=1;// WinName='?';
	      }
	      flng=WinName.length
	      if (flng<0 || flng>FntNameLng) mes+='Win name miss/too long :'
		     +fl(flng,5,' ')+' "'+fl(WinName,FntNameLng,'_')+'"'+eol

	      err=ValidFontName(PSname);
	      if (err>-1)  { 
	        mes+='Ps  name bad char at pos:'+fl(err,5,' ')+' "'+PSname+'"' +eol
	        //+fl(CrntFont,4,' ');
	        if (Bad==0) Bad=2; else Bad=3;// PSname='?'; 
	      }
	      flng=PSname.length
	      if (flng<0 || flng>FntNameLng) mes+='PS  name too short/long :'
		    +fl(flng,5,' ')+' "'+fl(PSname,FntNameLng,'_')+'"' +eol
	      
	      if (mes!='')
	        log(errclr+'LoadAFS.line '+fl(ln,4,' ')+': '//+' "'+savebuf+'"'+eol
	        +mes+endclr+eol+br);
      }/*with*/;
	} else if (AFS==4) {var UsePath=savebuf.substring(AFSTable[AFS].length,savebuf.length);
	  // change PathSep with / in UsePath 
        savebuf='';   
	    for (var i=0;i<UsePath.length; i++){ 
		  var c=UsePath.charAt(i); if(c==PathSep) c='/'; savebuf+=c;
		}; UsePath=savebuf;
		UsePath=UseVol+UsePath
		// if exist -> get old#; if new adPath -> last+1
		var newpath=true
		for (var i=0;i<=LastPath; i++){
		  if(UsePath==Paths[i].Name){CrntPath=i; newpath=false; break;}
		}
	    if(newpath) CrntPath=adPath(UsePath,0);
	} else if (AFS==5) {var PathSep=savebuf.charAt(AFSTable[AFS].length);
//  } else if (AFS==6) {// AFSTable[6]='%!AdobeFontSet';
	} else if (AFS==7) {var UseVol=savebuf.charAt(AFSTable[AFS].length)+':';
    } /*else if AFS==0  "skip empty line"*/
  }
  load.Close();// Close(load);
  
  if      (Win_Mac=='M')  buf=''//+'"OS=Mac"'
  else if (Win_Mac=='W')  buf=''//+'"OS=Windows"'
  else buf=' unknown par."Wnam=":'
  log('=== AFS loaded. '+' lines:'+fl(ln,6,' ')+' Win_Mac:'+Win_Mac+buf
     +' fonts files:'+fl(LastFont+1,6,' ')+' Sets:' +fl(LastSet+1,4,' ')+eol+br);
  return Win_Mac
}// ------------------------------------------------
load_end()