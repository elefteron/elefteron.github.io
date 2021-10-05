_load._new('scr/findtt.js')
function findTT(zNm,tt,th){//inload='findTT'  
// Nbk=Nbl=Obk=Obl=''; f1exp=f1wrd=f1reg=''; f2exp=f2wrd=f2reg=f2plc=''; f3exp=f3wrd=f3reg='';
// ----------------------------------------------------------------------------- find
   fndstr=f1exp.toLowerCase() 
   if(findjstest) out(log_,'findTT:'+zNm+'"'+fndstr+'"'+eol); 
   var fndres='\n<table border="0" valign="top"><tr>\n' //,bNo_=cNo_=vNo_=''
      ,cnt=0,Ccnt=Vcnt=0,Vmiss=0,tabcnt=0,tabmax=5
      ,buf='\n<table>\n'
   if(zNm==Zavet.nt.name) maxbooks=27; else maxbooks=50
   //out(log_,'find: begin'+eot)
    // --- 
   for (var bNo=1;     bNo<=maxbooks;       bNo++){         buf=tt[bNo][0]       
     for (var cNo=1;   cNo<=th[bNo][2];     cNo++){ Ccnt++; buf+=tt[bNo][cNo][0]; Vcnt=0
       for (var vNo=1; vNo<=th[bNo][2+cNo]; vNo++){ 
         if(undef(tt[bNo][cNo][vNo])){
           if(zNm==Zavet.ot.name && ((bNo==22 || bNo==23) && (vNo==1 || vNo==2))){; // skip 66 cases
           } else if(vNo<=th[bNo][2+cNo])  {Vmiss++; out(log_,'verse miss:'+bNo+'.'+cNo+'.'+vNo +'\n')}
         } else { 
           Vcnt++;if(Vcnt>1){buf=''}else{buf=buf.toLowerCase()}// find into bk.name and ch.name
           buf+=tt[bNo][cNo][vNo].toLowerCase()
           if(buf.indexOf(fndstr)>-1){cnt++; 
                 lf++; f[lf]=[zNm,bNo,cNo,vNo ,th[bNo][0]
                             ,repl_1quotes(tt[bNo][cNo][vNo]) ]// old =[bcvfull ,bcvstd ,tt[bNo][cNo][vNo] ]  
           }
         }
       }
     }
   }
   //out(log_,'find: end'+eot)
   if(Vmiss>0)   out(log_,'липсват стихове:'+Vmiss+eol);
// ----------------------------------------------------------------------------- result
   t='Нов завет'; if(zNm==Zavet.ot.name) t='Стар завет'
   f_=repl_1quotes(fndstr)
   sopn='<script'; scls='<\/script>'
   
   hdr='"Bible-BG" намери в '+t+' '+cnt+' стих';if(cnt>1)hdr+='а. ';else hdr+='. ';
   hdr+=' c фраза: <br>'+f_
    
   b='hdr=\''+hdr+'\';\n'+'var f=[];lf='+lf+';\n'
   for (var i=1; i<=lf; i++){//  zNm,bNo,cNo,vNo     
     b+='f['+i+']=['+'"'+f[i][0]+'"'  +',"'+f[i][1]+'"'  +',"'+f[i][2]+'"'  +',"'+f[i][3]+'"' 
                   +',"'+f[i][4]+'"'  +",'"+f[i][5]+"'"  +'];\n' 
                             // ,th[bNo][0],tt[bNo][cNo][vNo]
   }

/* export as array f[] to make smaller output! */ a=[]
   a= '<html><head><title>Bible-BG † find"'+fndstr+'"</title> \n'
     +'<meta http-equiv="Content-Type" content="text/html; charset=utf-8"> \n'// windows-1251
     +sopn+' src="../lib/paths-load.js">'+scls+'\n'
     +sopn+'>'+'dbg=1;var  scr_="scr/";'
          +'file=[scr_+"Bible-BG.css",scr_+"cfg.js"      ,scr_+"colors.js"   ,scr_+"utils.js"' 
          +'     ,scr_+"outfmt.js"   ,scr_+"findres.js"  ,scr_+"biblist.js"  ];' 
          +'cond=[];for (var i=0; i<=file.length-1; i++) cond[i]=true;'
          +'load=load_(file,cond); inload="findTT.hdr";'
     +scls+'\n'
     +sopn+'>\n'
	   +b+"findres('"+f_+"');"+"\n"+"highlight('"+f_+"',bghi,fghi);"+"\n"
	 +scls+'\n'
     +'<\/head>\n<body BGCOLOR="black" text="white">\n' // onload="'++'"
	 +sopn+'>inload="findTT.body"; if(dbg>0) out(log_,load_tst("findTT",load,file.join("; ")));'
	 +scls+'\n'
     +'<\/body><\/html>'
  //a=xmp(a) 
    out(txt_,a); //clst();<- dont use here! 
    //clsl()
}// ---
_load._end()