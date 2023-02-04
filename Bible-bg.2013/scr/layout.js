_load._new('scr/layout.js')
/** borderStyle=['none'  ,'hidden','dotted','dashed','solid','double'   ,'inherit'
                ,'groove','ridge' ,'inset' ,'outset'] // 3d, 
// 3d - The effect depends on the border-color value
// hidden 	The same as "none", except in border conflict resolution for table elements
// inherit 	Specifies that the border style should be inherited from the parent element
/** -- **/
    // -- bible layout "cross" with access functions ---
    {// define layout: sz,bg,va,placeholders to access: xxx_.innerHTML=''
    var _frm=0    ,_log=1      // box[_#]
       , frm_=null, log_=null  // box[_#].plc 
       ,_mnu=2    ,_hdr=3    ,_idx=4    ,_txt=5    ,_not=6     , _crv=7    ,_crh=8
       , mnu_=null, hdr_=null, idx_=null, txt_=null, not_=null ,  crv_=null, crh_=null
       , box=[]
      /** html layout :**-/
        <span id="log"></span><br/>
        <span id="frm">
          <span id="mnu"></span><span id="crv"></span><span id="hdr"></span><br/>
          <span id="crh"></span><br/>
          <span id="idx"></span><span id="txt"></span><br/>
          <span id="not"></span>
        </span>
      /** **/
      box=[{id:'frm' ,block:'table',nm:'frm_',plc:null } // frame table 
          ,{id:'log' ,block:'div'  ,nm:'log_',plc:null } // log messages
          ,{id:'mnu' ,block:'div'  ,nm:'mnu_',plc:null } // menu box
          ,{id:'hdr' ,block:'div'  ,nm:'hdr_',plc:null } // header 
          ,{id:'idx' ,block:'div'  ,nm:'idx_',plc:null } // index
          ,{id:'txt' ,block:'div'  ,nm:'txt_',plc:null } // text, box[_txt].id 
          ,{id:'not' ,block:'div'  ,nm:'not_',plc:null } // notes
          ,{id:'crv' ,block:'div'  ,nm:'crv_',plc:null } // cross vert
          ,{id:'crh' ,block:'div'  ,nm:'crh_',plc:null } // cross horiz
          ]
// var clkwid =120
   var icoh=300, icow=200
// --- on 1280/1024 use as 100% except fixed
      var wcr=12,hcr=12            ,h1=24,  hn=0;// hn=120 fixed 
      var w1=260,w2=650            ,h2=740, ht=h2-hn-2; // w1=262 w2=620 h2=735
      var w=w1+wcr+w2, h=h1+hcr+h2
         ,vw_=920,  vh_=800 , k=1 
         ,vw =null, vh =null;
      vh = window.innerHeight; vw = window.innerWidth; // get viewport

      set_box_sizes = function() {// recalc w1,w2,h1,h2
      //out(log_,'get_win_size():old:: vw:',vw_,' vh:',vh_,' k:',k,br)
        var wk=(vw/vw_),  hk=(vh/vh_) 
        k=wk; if(wk>hk) k=hk;
        out(log_,'get_win_size():new:: vw:',vw,' vh:',vh,' k:',k,br)
      //out(log_,'get_win_size():old::'
      //+' w1:',w1,' w2:',w2 ,' h1:',h1,' h2:',h2 ,' hn:',hn,' ht:',ht,br)
        //-- new values:
        w =(k*w ).toFixed(0)-10;    h =(k*h ).toFixed(0)-10; hn=(k*hn).toFixed(0);
        w2=w-w1-wcr;                h2=h-h1-hcr;
        ht=h2-hn-2;
        out(log_,'get_win_size():new::'
        +' w1:',w1,' w2:',w2 ,' h1:',h1,' h2:',h2 ,' hn:',hn,' ht:',ht,br)
      }
      set_box_sizes()
      
      box[_frm].sz={w:w,  h:h} 
                                            
      box[_mnu].sz={w:w1 ,h:h1 };  box[_hdr].sz={w:w2,h:h1};
      box[_idx].sz={w:w1 ,h:h2 };  box[_txt].sz={w:w2,h:ht};
                                   box[_not].sz={w:w2,h:hn}; 
      box[_crv].sz={w:wcr,h:hcr};           
      box[_crh].sz={w:wcr,h:hcr};           
      box[_log].sz={w:box[_frm].sz.w ,h:800} 
      for(var i in box) box[i].sz.un='px'
      // verticalAlign:top | text-top | middle
      box[_frm].bg='#707070'; box[_frm].va='top'; box[_frm].bw='2px'; box[_frm].bc='#c0c0c0'; box[_frm].bs='ridge'; 
      box[_log].bg='#202020'; box[_log].va='top'; box[_log].bw='0px'; box[_log].bc='#ccc'   ; box[_log].bs='solid';
      box[_mnu].bg='#101a20'; box[_mnu].va='top'; box[_mnu].bw='0px'; box[_mnu].bc='#ccc'   ; box[_mnu].bs='none';
      box[_hdr].bg='#101a20'; box[_hdr].va='top'; box[_hdr].bw='0px'; box[_hdr].bc='#ccc'   ; box[_hdr].bs='none';
      box[_idx].bg='#101a20'; box[_idx].va='top'; box[_idx].bw='0px'; box[_idx].bc='#ccc'   ; box[_idx].bs='none';
      box[_txt].bg='#101a20'; box[_txt].va='top'; box[_txt].bw='0px'; box[_txt].bc='#ccc'   ; box[_txt].bs='none';
      box[_not].bg='#202a30'; box[_not].va='top'; box[_not].bw='0px'; box[_not].bc='#ccc'   ; box[_not].bs='none';
      box[_crv].bg='maroon' ; box[_crv].va='top'; box[_crv].bw='0px'; box[_crv].bc='#ccc'   ; box[_crv].bs='none';
      box[_crh].bg='maroon' ; box[_crh].va='top'; box[_crh].bw='0px'; box[_crh].bc='#ccc'   ; box[_crh].bs='none';
    }//--
    function nm2no(nm_){// nm2no('log_') -> log_  -- box[log_].nm=
      for(var i=0; i<box.length; i++) if(box[i].nm==nm_) return i
      out(log_,'nm2no('+nm_+'): unknown .nm -> null') 
      return null // null | _log
    }
    function layout_make(box_){// -> box,box_.innerHTML=layout
      var tblhdr=' id="'+box[_frm].id+'"' +' cellspacing="0" cellpading="0"'
      var rs=function(n){return ' rowspan="'+n+'"'}
      var cs=function(n){return ' colspan="'+n+'"'}
      var va=' valign="top"'
         // box[i].plc <- div for box[i].id
         var iframe='' //  targeting a link to open div box
         for(var i=_log; i<=_not; i++){// span,div,iframe
           var id=' id="'  +box[i].id+'"' // ,nm=' name="'+box[i].id+'"'
              ,stl=' style="'+'white-space:normal;' // nowrap | normal
//                +'vertical-align:top;'
                  +'overflow-x:auto;overflow-y:auto;' 
                  +'"' 
              box[i].plc=htm_([box[i].block,id           +stl,''])
           /* box[i].plc=htm_(['iframe'    ,nm+' src="#"'+stl,''])
           // box[i].plc=htm_(['div'       ,id           +stl,box[i].plc])
           // <div id="content"><iframe name="content" src="#"|src="home.html></iframe></div>
           // <a href="#" target="frame1">Link Text</a>
           */
         }
        var crh=cs(3)+' id="'+box[_crh].id+'"' // id in td not in content
           ,crv=rs(4)+' id="'+box[_crv].id+'"' // box[_crv].sz.w ? not work!
           ,crd='&nbsp;&nbsp;', v=' style="vertical-align:top;"' 
        var layout=htm_(['table',tblhdr,
              row_('',[[v      ,box[_mnu].plc] ,[crv,crd],[v,box[_hdr].plc] ])
             +row_('',[[    crh,           '']                              ]) 
             +row_('',[[v+rs(2),box[_idx].plc]           ,[v,box[_txt].plc] ]) 
             +row_('',[                                   [v,box[_not].plc] ]) 
             ]);                           
      // log_ & box_ already defined !!!
      box_.innerHTML=layout;
    }// ---
    function layout_cfg(box_){// --- bible layout config: xxx_.style.zzz= w,h,clr,...
      var islayok=null
      // set box[i].plc <- DOM pointers of box[i].id
      for(var i in box){
        box[i].plc=document.getElementById(box[i].id)
        if     (undef(box[i].plc)) box[i].st='undef'; 
        else if(box[i].plc==null)  box[i].st=null;    
        else    box[i].st='ok'
        if(box[i].st!='ok'){ islayok=false
          out(log_,'! box['+i+'].nm='+box[i].nm+' .id='+box[i].id+' .st='+box[i].st+br)
        }
      }; if(islayok==null) islayok=true // ok found all box[i].id 
      if(!islayok) return islayok
      // --- xxx_ <- box[_xxx].plc
      frm_=box[_frm].plc; // same as box_
      mnu_=box[_mnu].plc; hdr_=box[_hdr].plc; 
      idx_=box[_idx].plc; txt_=box[_txt].plc; 
      log_=box[_log].plc; not_=box[_not].plc; 
      crv_=box[_crv].plc; crh_=box[_crh].plc; 
      var buf=''
      for(var i in box){ // apply box[i] values to corresponding DOM places:
        if(undef(box[i].plc) || box[i].plc==null){
          out(log_,'config_layout(): bad box['+i+'].plc '+br)
          continue
        }else if(dbg>0){ 
          var b2='box['+i+' ?= '+nm2no(box[i].nm)+'].nm='+box[i].nm
                +' .id='+box[i].id+' .st='+box[i].st
          buf+=b2+' width          :'+box[i].sz.w +box[i].sz.un+br
          buf+=b2+' height         :'+box[i].sz.h +box[i].sz.un+br
          buf+=b2+' borderWidth    :'+box[i].bw   +br
          buf+=b2+' borderStyle    :'+box[i].bs   +br
          buf+=b2+' borderColor    :'+box[i].bc   +br
          buf+=b2+' backgroundColor:'+box[i].bg   +br
          buf+=b2+' verticalAlign  :'+box[i].va   +br
        }
        if (!undef(box[i].sz.w) && !undef(box[i].sz.h)) {
        /** ie err: 154,155: invalid argument, ch35: */
          if(!undef(box[i].sz.w)) box[i].plc.style.width          =box[i].sz.w+box[i].sz.un;
          if(!undef(box[i].sz.h)) box[i].plc.style.height         =box[i].sz.h+box[i].sz.un;
        }                                    
        if  (!undef(box[i].bw  )) box[i].plc.style.borderWidth    =box[i].bw; // border-width: 1px;
        if  (!undef(box[i].bs  )) box[i].plc.style.borderStyle    =box[i].bs; // border-style: solid
        if  (!undef(box[i].bc  )) box[i].plc.style.borderColor    =box[i].bc; // border-color: black; 
        if  (!undef(box[i].bg  )) box[i].plc.style.backgroundColor=box[i].bg;
        if  (!undef(box[i].va  )) box[i].plc.style.verticalAlign  =box[i].va;
        buf+=br
      }; 
      if(dbg>1) out(log_,htm_(['code','',buf])+br)
// ?  box[_log].plc.style.class='log'
// ?  text-ALIGN:left  vertical-align:text-top top  
// ?  log_.style.whiteSpace='nowrap'; 
// ?  text-ALIGN:left  vertical-align:text-top top 
// ?  word-wrap: normal | break-word
// ?  dom.whiteSpace= / style:white-space: {normal | nowrap};
// ?  overflow: hidden; 
// ?  frm_.style.innerborder='10px'   
// ?  frm_.style.innerborderColor='maroon'
      return islayok
    }// ---
_load._end()