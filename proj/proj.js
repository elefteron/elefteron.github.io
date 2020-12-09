/* encoding: utf-8" check string: *-/
 BG: ах, чудна българска земьо, полюшвай цъфтящи жита! 
 EN: the quick brown fox jumps over the lazy dog!
 
ABCDEFGHIJKLMNOPRSTUVWXYZ abcdefghijklmnoprstuvwxyz 
АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯ абвгдежзийклмнопрстуфхцчшщъьюя 
ÀàЀѐЍѝÒò ѢѣѤѥѦѧѨѩѪѫѬѭѴѵ €§«»°©®№ ЁёЫыЭэ 0123456789:;.,-+=()[]<>{}«» 
$¢£€¥ƒ#%‰&'"º¹²³¼½¾.,:;‘’“”‚„!¡?¿«»‹›+=±÷×<>¬–—―‾…·•@©®™()[]{}|¦/\⁄*†‡§¶ª°ßﬁﬂµ^~´`¨ˆ˜ˉ˘˙˚¸˝˛ˇ
/* */
{  tbr='rr'; scrn='r'; sp=28; xc=19; yc=14; // 38,19,14 :manual! space for scroll; screen grid x, y cells -?auto get
   sw=screen.width; sh=screen.height;                     // 1280,1024
   swa=screen.availWidth; sha=screen.availHeight          // 1280,1024 ?
   if(swa>sw) swa=sw; if(sha>sh) sha=sh; 
   wcell=(swa/xc).toFixed(2); hcell=(sha/yc).toFixed(2);  // 64,73.14;  67.37,73.14   // num.toPrecision(4)== .toFixed(2)
   tbw=64; tbh=0; // tbw=(sw-swa); tbh=(sh-sha);          // 64,0;      0?,0?
   tmp+='--- wcell:'+wcell+', hcell:'+hcell+', tbw:'+tbw+', tbh:'+tbh+' sw:'+sw+' sh:'+sh+' swa:'+swa+' sha:'+sha+heol; 
   mw=(3*wcell-sp).toFixed(0); // :manual 3*64-28=164
   // scr pos=[rl]:r; tbr pos=scr+pos[trbl]: rr; 
   if      (scrn=='r'){ // r scr x:right-mw,y:top
   // proj_.xy=[sw -mw           ,   0]; proj_.wh=[mw+sp,sh ]; // l tb
   // proj_.xy=[sw -mw-  sp  -tbw,   0]; proj_.wh=[mw+sp,sh ]; // r tb
      proj_.xy=[sw -mw-1*sp  -tbw,74/2]; proj_.wh=[mw+sp,700]; // r tb
   }else if(scrn=='l'){ // l scr x:right-mw,y:top
      proj_.xy=[sw -mw-1*sp -1280,74/2]; proj_.wh=[mw+sp,sh-2*45]; 
   }
   if(proj_.wh[0]>swa) proj_.wh[0]=swa; if(proj_.wh[1]>sha) proj_.wh[1]=sha; 
}
   proj_.mnu_grp='background-color:#7373ff;color:#000000; height:11px; border:0px;font-size:10pt; ';
   proj_.mnu_hdr='background-color:#4ca6ff;color:#000000; height:19px; border:0px;';
   proj_.mnu_bdy='background-color:#3f240c;color:#ffff99; height:16px; border:0px;'; //  width:'+mw+'px;
{  run_npp       = bck_slash('F:/!prog.run/npp+/notepad++.exe');
   run_md5deep64 = bck_slash('F:/!prog.run/md5deep-4.4/md5deep64.exe');  // 
// run_hashdeep64= 'F:/!prog.run/md5deep-4.4/hashdeep64.exe'; // 
// run_sha1deep64= 'F:/!prog.run/md5deep-4.4/sha1deep64.exe'; // 
// run_md5summ   = 'F:/!prog.run/md5summer/md5summer.exe'; // cli?
// run_md5sum32  = 'F:/!prog.run/md5sum/md5sum.exe';       // 32b only, check: -cv MD5SUM.TXT
   run_zip       = bck_slash('C:/Program Files/7-Zip/7z.exe'); 
} 
{  root='F:/elefter.dev'; /* source root */ proj=proj || []; var j=proj.length-1;  
   /** - fld is relative to root, subs are relative to fld, except abs. paths like '>...'
       - scan subs[].files[] <- scanFileList_to_ar(root,subfld) 
   **/
 { n='main'; // subs:[{'#fld':"*",files:[/*scan*/]}, ... ] // ?! -> {.id}.files.js   // ?setup, ?dependencies
   proj[++j]={grp:n ,id:"Charmap"    ,ico:"Ab.ico" ,subs:[{fld:"Charmap" } ] }
   proj[++j]={grp:n ,id:"SVC-8"      ,ico:"R19G00001.ico" 
      ,subs:[{fld:"SVC-8" } ,{work:'>C:/$desk/#pers/'},{data:'>C:/$desk/#pers/#data'}] 
   }
   proj[++j]={grp:n ,id:"FontOrg"    ,ico:"ico/Ab.ico"    ,subs:[{fld:"fontorg.js"} ,{afs:"fonts-data"}
     ,{lib:"lib"},{scr:"scr"} ] 
   }
   proj[++j]={grp:n ,id:"psw"        ,ico:"encript.ico"   ,subs:[{fld:"psw"},{data:"data" }] } 
 }
 { n='proj mng'                              
   proj[++j]={grp:n ,id:"proj"       ,ico:"ico/inodebdv.ico",subs:[{fld:"proj"       }] }
   proj[++j]={grp:n ,id:"run-hta"    ,ico:"ico/Run.ico"     ,subs:[{fld:"run-hta"    }] }
   proj[++j]={grp:n ,id:"proj-list"  ,ico:"fldr_1blue.ico"  ,subs:[{fld:"proj-list"  }] }
   proj[++j]={grp:n ,id:"proj-info"  ,ico:"APPS Info.ico"   ,subs:[{fld:"proj-info"  } ,{scr:"scr"}] }
 }
 { n='log'                              
   proj[++j]={grp:n ,id:"run-cmd"    ,ico:"ico/clicknrun.ico" ,subs:[{fld:"run-cmd"  } ,{'#scr':"scr"},{'log':"log"}] }
   proj[++j]={grp:n ,id:"boot-log"   ,ico:"pics/clicknrun.ico",subs:[{fld:"boot-log" }
             ,{data:"data"},{lib:"lib"},{menu:"menu"},{pics:"pics"},{prog:"prog"},{js:"scr"} ] }
 }
 { n='Bible-bg';
   proj[++j]={grp:n ,id:"Bible-bg.13",ico:"Bible-bg.ico"  ,subs:[{fld:"Bible-bg/Bible-bg.2013" },{'scr ':'scr'} ] } // sub proj
   proj[++j]={grp:n ,id:"Bible-bg.10",ico:"Bible-bg.ico"  ,subs:[{fld:"Bible-bg/Bible-bg.2010" },{'#cont':'content'} 
            ,{'#fmt'  :'content/fmt'     },{'#index':'content/index'},{text    :'content/text' }
            ,{'#words':'content/words'   },{'#xml'  :'content/xml'  }
            ,{'#album':'content/album'   },{'#clock':'content/clock'},{'#color':'content/color'}
            ,{'#kal'  :'content/kalendar'},{'#nt.pg':'content/nt.pg'}
             ] }
   proj[++j]={grp:n ,id:"Bible-bg.09",ico:"Bible-bg.ico"  ,subs:[{fld:"Bible-bg/Bible-bg.2009" },{'scr ':'scr'} ] } // sub proj
   proj[++j]={grp:n ,id:"Bible icons",ico:"Bible-bg.ico"  ,subs:[{fld:"Bible-bg/Bible.icons"   } ] }  
   proj[++j]={grp:n ,id:"Bible-bg text",ico:"Bible-bg.ico",subs:[{fld:"Bible-bg/Bible-bg.text" } ] }  
   proj[++j]={grp:n ,id:"Bible text" ,ico:"Bible-bg.ico"  ,subs:[{fld:"Bible-bg/Bible.text"    } ] }  
 }
 { n='x14 widgets';  
   proj[++j]={grp:n ,id:"X14"        ,ico:"ico/d.ico"     ,subs:[{fld:"x14"},{lib :'lib'  } ,{run:'run'}] } // ? "x_widgets"
   proj[++j]={grp:n ,id:"X14-cal"    ,ico:"cal/kal.ico"   ,subs:[{fld:"x14"},{cal :'cal'  } ,{lib:'lib'},{scr:'cal/scr'},{run:'run/run.cal'}] }
   proj[++j]={grp:n ,id:"X14-clk"    ,ico:"clk/clock.ico" ,subs:[{fld:"x14"},{clk :'clk'  } ,{lib:'lib'},{scr:'clk/scr'},{run:'run/run.clk'}] }
   proj[++j]={grp:n ,id:"X14-drv"    ,ico:"drv/d.ico"     ,subs:[{fld:"x14"},{drv :'drv'  } ,{lib:'lib'},{scr:'drv/scr'},{run:'run/run.drv'}] }
   proj[++j]={grp:n ,id:"X14-icard"  ,ico:"icard/ea-k.ico",subs:[{fld:"x14"},{'#icаrd':'icard'},{lib:'lib'}] }
 }
 { n='file sys'                          
   proj[++j]={grp:n ,id:"dirlist"    ,ico:"foldlist.ico"    ,subs:[{fld:"dirlist"    }] }
   proj[++j]={grp:n ,id:"fs.menu-csv",ico:"ico/FOLDtree.ico",subs:[{fld:"fs.menu-csv"} ,{data:"data"}] }
   proj[++j]={grp:n ,id:"drv-info.4" ,ico:"d.ico"           ,subs:[{fld:"drv-info.4" }] }
   proj[++j]={grp:n ,id:"drv-log"    ,ico:"d.ico"           ,subs:[{fld:"drv-log"    }] } // test= subs:['?']
 }
} 
   if(!iex){  //if(dbg) tmp+=(files_list);       
     msg=load_files_list(files_list); /* proj[].subs[].files<- load_files_list(files_list) <- files_list[] <- files_list.js */ 
     if(dbg) {tmp+=(msg); console.log(files_list); } // before set_def()
   }
   for(j in proj) {set_def(j); set_ext(j)}// set project defaults in order of apperance proj[i].id 
   grp_def(); // -> grp_=[], grp_opn=[]; grp_sel=[]; all_sel;
   
   function set_ext(pn) { var i ,pid=proj[pn].id; //,pn=proj_indx(proj_);
     if(pn<0 || pid=='') { alert('proj[].id: invalid indx['+pn+'] or miss .id:'+pid+' '); return}
     if(undef(proj[pn].act)) proj[pn].act=[];
     var root_fld_  = root+'/'+proj[pn].fld // fld_        = .fld_
     // ,fld_id_    = fld_+'/'+proj[pn].id  // fld_id_     = .fld_/.id

 /* run : 'cmd /c cd /d '+proj[pn].fld+' && start run/x-widgets.run.hta'/* */ 
 /* run_cmd  : 'cmd /c call run.cmd eng:hta file:"../calendar/calendar.hta" par:"1,3,1"' /* */
 /* dirlist.lst: bad chars; hsh: break by invalid utf-8 */ 
      switch (pid) { // not for every proj
        case 'run-cmd'    : { 
          var i=proj[pn].act.length-1;// append to act[]
             proj[pn].act[++i] = set_cmd(root_fld_,'cmd','run.cmd on ','scr') 
             proj[pn].act[++i] = set_cmd(root_fld_,'cmd','run.cmd off','scr') 
             proj[pn].act[++i] = set_cmd(root_fld_,'cmd','run.cmd apl','scr') 
             proj[pn].act[++i] = set_cmd(root_fld_,'cmd','run.cmd sys','scr') 
             proj[pn].act[++i] = set_cmd(root_fld_,'cmd','run.cmd dbg','scr') 
             proj[pn].act[++i] = set_cmd(root_fld_,'cmd','run.cmd hlp','scr') 
          // proj[pn].act[++i] = [': ^on' ,'cmd /c cd /d '+root_fld_+' && call scr/run.cmd on  && pause', 'run.cmd on '] 
          // proj[pn].act[++i] = [': ^off','cmd /c cd /d '+root_fld_+' && call scr/run.cmd off && pause', 'run.cmd off']
          // proj[pn].act[++i] = [': ^apl','cmd /c cd /d '+root_fld_+' && call scr/run.cmd apl && pause', 'run.cmd apl']
          // proj[pn].act[++i] = [': ^sys','cmd /c cd /d '+root_fld_+' && call scr/run.cmd sys && pause', 'run.cmd sys']
          // proj[pn].act[++i] = [': ^dbg','cmd /c cd /d '+root_fld_+' && call scr/run.cmd dbg && pause', 'run.cmd dbg']
          // proj[pn].act[++i] = [': ^hlp','cmd /c cd /d '+root_fld_+' && call scr/run.cmd hlp && pause', 'run.cmd hlp']
        break; }
      }
   // 'boot-log'   : { boot-data-js.cmd
   //      ,'run cmd'    : 'cmd /c cd /d '+proj[pn].fld+' && call  boot-log.cmd %1 && pause'
   //      ,'run setup'  : 'cmd /c cd /d '+proj[pn].fld+' && call  boot-log setup.cmd && pause' 
   // opnSes=["login" ,"log2"/usr/wrk,"shutabort","boot" ,"startup"]
   // clsSes=["lock"  ,"logoff","hibern" ,"sleep","restart","shutdown","switch"] //,"work]"]; 
   // todo: shutdown at_time, shutdown after_time, shutdown at_event        

   /**-/
        proj[pn].ico='pen.ico';
        proj[pn].fld=root;  
        proj[pn].work     = ''; proj[pn].state='+';
        proj[pn].files = [// act?:'xxx'- Edit,Run by ext,Path open
         {act?:'e-p',path:'F:/elefter.dev'           , file:'dev-tools.js'} 
        ,{act?:'erp',path:'F:/elefter.dev/psw2'      , file:'psw2.htm'}
   //   ,{act?:'erp',path:'F:/elefter.dev/psw/data'  , file:'index.html'}
   //   ,{act?:'e-p',path:'F:/elefter/psw/'          , file:'lastpass.csv'}
   //   ,{act?:'e-p',path:'F:/elefter.dev'           , file:'plug-ins.js'}
   //   ,{act?:'e-p',path:'F:/elefter/'              , file:'new-poetry-ea.js'}
   //   ,{act?:'erp',path:'f:/elefter.dev/cv/'       , file:'CV-Elefter-bg-pub+.htm'}
   //   ,{act?:'-rp',path:'F:/elefter/cv/'           , file:'elefter-arnaudov_cv_dotbrain 2020-06-08.pdf'}
   //   ,{act?:'--p',path:'F:/elefter/!dela/'        , file:''}
   //   ,{act?:'--p',path:'F:/elefter/!!mouse.docs/' , file:''}
   //   ,{act?:'--p',path:'f:/elefter.dev/draw/'     , file:''}
   //   ,{act?:'--p',path:'f:/elefter.dev/cv/'       , file:''}
        ]
        proj[pn].act={ // run with eng[]
            'edit dev-tools': 'cmd /c start '+npp+' '+proj[pn].files[0].path+'/'+proj[pn].files[0].file
           ,'edit psw2'     : 'cmd /c start '+npp+' '+proj[pn].files[1].path+'/'+proj[pn].files[1].file
           ,'run psw2'      : 'cmd /c start '+proj[pn].files[1].path+'/'+proj[pn].files[1].file
         }; break;} /**/ 
   }; 
/* */