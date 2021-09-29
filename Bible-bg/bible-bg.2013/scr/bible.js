_load._new('scr/bible.js')
{// --- bible global,cfg: 
/* ../Bible-bg.text/bible-bg.NT-01.bg.js:
 bible[NT_][1].bktitle='От Матея свето Евангелие'
 bible[NT_][1].bkname='NT.MAT' // NT.MAT== 1.1 
 bible[NT_][1].bkdescr={src:'св.Синод на БПЦ',enc:'utf-8',lang:'bulgarian'}
{bible[NT_][1].bknotes=[[// ^n,c.v,'' 
  ],[ 1,1,0,'Това място е по превода на 70-те, ...'
  
]]}
 bible[NT_][1].bkchapters[ 1]={chtitle:'ГЛАВА 1',vs:[[
  ],[ 1,'Книга за живота на Иисуса Христа, ...'
  
]]}
*/
var Zavet={ot:{name:'OT',num:0}, nt:{name:'NT',num:1}}
    Zavet.ot.fullname='Стар завет'; Zavet.nt.fullname='Нов Завет'
//  tstNM='OT',tstID='-'             tstNM='NT', tstID='+' 
/* --- nh_,oh_:hdr short names, or use OT-hdr.js, NT-hdr.js */
//   book# abr      name                                         ch##   v1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28
// nh[ 1]=['Мат'   ,"Евангелие на ап.Матей"                       ,28,  25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20]
// nh[bNo][0]
var nh_=[''// nh_[bk] bk:1..27 /* --- hdr short names only from NT-hdr.js */
,'Мат'   ,'Марк'  ,'Лука'  ,'Иоан'  ,'Деян'  ,'Яков'  ,'1Пет'  ,'2Пет'  ,'1Иоан' ,'2Иоан' 
,'3Иоан' ,'Юда'   ,'Римл'  ,'1Кор'  ,'2Кор'  ,'Гала'  ,'Еф'    ,'Фил'   ,'Коло'  ,'1Сол'  
,'2Сол'  ,'1Тим'  ,'2Тим'  ,'Тит'   ,'Флм'   ,'Евр'   ,'Откр' ]
// oh[bNo][0]
var oh_=[''// oh_[bk] kb:1..50 /* --- hdr short names only from OT-hdr.js */
,'Бит'   ,'Изх'   ,'Лев'   ,'Чис'   ,'Втор'  ,'Нав'   ,'Съд'   ,'Рут'   ,'1Цар'  ,'2Цар'  
,'3Цар'  ,'4Цар'  ,'1Пар'  ,'2Пар'  ,'1Езд'  ,'Неем'  ,'2Езд'  ,'Тов'   ,'Юдит'  ,'Ест' 
//                ,'1Лет'  ,'2Лет'  
,'Иов'   ,'Пс'    ,'Прит'  ,'Екл'   ,'Пес'   ,'Прем'  ,'Сир'   ,'Ис'    ,'Иер'   ,'Плач'  
,'Посл'  ,'Вар'   ,'Иез'   ,'Дан'   ,'Осия'  ,'Иоил'  ,'Амос'  ,'Авд'   ,'Иона'  ,'Мих'   
,'Наум'  ,'Авак'  ,'Соф'   ,'Агей'  ,'Зах'   ,'Мал'   ,'1Мак'  ,'2Мак'  ,'3Мак'  ,'3Езд' ] 
// ---
      var OT_=0, NT_=1, tt_shnm=['OT','NT']; // testament short_name
      var bkRng=[{min:1,max:50},{min:1,max:27}];      
      var bible=[]; bible[OT_]=[]; bible[NT_]=[]; 
      // '...^N#(note)...' -> [N#,C#,V#,'...note-descr...']
      // !used empty zero records for: [b=0] ,[b].bknotes[n=0] ,[b].bkchapters[c].vs[v=0]
      // ! but OT_=0, NT_=1
// todo: bible[t][b].bkname='NT.MAT' // NT.MAT== 1.1 
// todo: bible[t][b].bkdescr={src:'св.Синод на БПЦ',enc:'utf-8',lang:'bulgarian'}
      for(var b=0; b<=bkRng[OT_].max; b++) 
        bible[OT_][b]={bktitle:''             ,bknotes:[[]/*,[n#,c#,v#,''] */]
                     ,bkchapters:[{chtitle:'',vs:     [[0,'']    /*,[v#,''] */      ]}]};
      for(var b=0; b<=bkRng[NT_].max; b++) 
        bible[NT_][b]={bktitle:''             ,bknotes:[[]/*,[n#,c#,v#,''] */]
                     ,bkchapters:[{chtitle:'',vs:     [[0,'']    /*,[v#,''] */      ]}]};
      /* now ready to load data from files like 'bible.NT-##.bg.js' */
}// ---
    var tblhdr=' cellspacing="1" cellpading="1" border="0"'
    function vno(a){// vno({t:t,b:b,c:c,v:v})
      with(a) var a_=''/* *-/+'['+t+'][' +b+']'/* */ +'['+c+':'+v+']'
      return a_
    }
    function nno(a){// nno({t:t,b:b,c:c,v:v,n:n})
      with(a) var a_='^'+n /* *-/+'['+t+'][' +b+']'/* */ +'['+c+':'+v+']'
      return a_
    }
    function show_books(t,b_Rng){     // show_books (t,[b1,b2])    ->{ti:,ch:,no:}
      var b1=0,b2=0,hasRng=false; 
      if  (!undef(b_Rng)){ hasRng=true
        if(!undef(b_Rng[0])) b1=b_Rng[0];
        if(!undef(b_Rng[1])) b2=b_Rng[1];
      }
      if(b1==0 && b2==0){b1=bkRng[t].min; b2=bkRng[t].max} // set all        
      var bk_adr_name='bible['+t+']'
      // check
        if(BADrange_tt([t,t]))  {out(log_,' bad range TT:'+t+br)
          return {chapters:'',notes:''}
        }
        if(undef(bible[t])){out(log_,' miss testament'+br); 
          return {chapters:'',notes:''}
        }
        
        var BKmax=obj_keys(bible[t],bk_adr_name).length-1 // bkRng[t]=[1,ttBKmax]
        out(log_,'show_books:'+'TT:'+tt_shnm[t]+' BK=['+b1+'..'+b2+'] max='+BKmax+br) 
        if(isNaN(BKmax) || BADrange_bk(t,[b1,b2]) ||  b1>BKmax || b2>BKmax){ 
          out(log_,'miss book/bad range'+br) 
          return {chapters:'',notes:''}
        }
      //--
      var buf_ti='',buf_ch='',buf_no=''
      for(var b=b1; b<=b2; b++){
        if(!undef(bible[t][b])){
          buf_ti+=htm_(['div',' id="bk"',bible[t][b].bktitle])
          buf_ch+=show_chaps(t,b)
          buf_no+=show_notes(t,b)   
        } else { 
          out(log_,'show_books:'+' bible['+t+']['+b+'])=undefined'+br)
        }
      }
      var bk={'ti':buf_ti,'ch':buf_ch,'no':buf_no}
      return bk
    }//---
    function show_notes(t,b){         // show_notes (t,b)          ->html
      {// check
        if(BADrange_bk(t,[b,b])){ out(log_,'bad book range:'+b+br)
          return ''
        }
        var no_adr_name='bible['+t+']['+b+'].bknotes' // tt_shnm[t]
        var NOmax=obj_keys(bible[t][b].bknotes,no_adr_name).length-1
        if(isNaN(NOmax) || undef(obj_keys(bible[t][b].bknotes))){
          out(log_,'miss notes:'+no_adr_name+br)
          return ''
        }
        out(log_,'show_notes: TT='+tt_shnm[t]+' bk#='+b+' notes#1..'+NOmax+br)
        if(NOmax===NaN || NOmax==null || NOmax<1) return ''      
      }
      var tbl=''
      for(var n=1; n<=NOmax; n++){//  in bible[t][b].bknotes
        var no=bible[t][b].bknotes[n][0] 
        var ch=bible[t][b].bknotes[n][1] 
        var vs=bible[t][b].bknotes[n][2] 
        var tx=bible[t][b].bknotes[n][3]
      //var noteno='^'+no+' '+ch+'.'+vs
        var noteno=nno({t:t,b:b,c:ch,v:vs,n:no})
        tbl+=row_('',[[' id="no"',noteno],['',tx]])
      }
      return htm_(['table',tblhdr,tbl])
    }// ---
    function show_chaps(t,b,chRng){   // show_chaps (t,b,[c1,c2])  ->html
      {// check
        var c1=0,c2=0,hasRng=false; 
        if  (!undef(chRng)   ){ hasRng=true
          if(!undef(chRng[0])) c1=chRng[0]; 
          if(!undef(chRng[1])) c2=chRng[1]; 
        }
        if(BADrange_bk(t,[b,b])){ out(log_,'bad book range:'+b+br)
          return ''
        }
        var ch_adr_name='bible['+t+']['+b+'].bkchapters' // tt_shnm[t]
        var CHmax=obj_keys(bible[t][b].bkchapters,ch_adr_name).length-1
        if(isNaN(CHmax) || undef(obj_keys(bible[t][b].bkchapters))){
          out(log_,'miss chapters:'+ch_adr_name+br)
          return ''
        }
        if(c1==0 && c2==0){ c1=1; c2=CHmax } 
        if(hasRng) {var ch_rng_name=' CHmax='+CHmax+' chRng=['+c1+'..'+c2+']'}
        else       {var ch_rng_name=' CHmax='+CHmax+' chAll=['+c1+'..'+c2+']'}
        out(log_,br+'show_chapters: '+ch_adr_name+ch_rng_name+br)
        if(CHmax==null || CHmax<1 
        || c1>c2 || c1<1 || c2<1 || c1>CHmax || c2>CHmax){
          out(log_,'bad chapters range'+br)
          return ''
        }
        if(undef(bible[t][b].bktitle)){
          out(log_,'undefined: bktitle'+br)
          return ''
        }
      }
      var buf=''// htm_(['div',' id="bk"',bible[t][b].bktitle])  
      for(var c=c1;c<=c2; c++){ 
        if(undef(bible[t][b].bkchapters[c].chtitle)){
          out(log_,'undef: chtitle'+br)
          return ''
        }
        var ctx=       bible[t][b].bkchapters[c].chtitle
        buf+=htm_(['div',' id="ch"',ctx])
        buf+=show_verse(t,b,c) // - all verses if omit vsRng=[v1,v2]
      }
      return buf
    }
    function show_verse(t,b,c,vsRng){ // show_verse (t,b,c,[v1,v2])->html
      var v1=0,v2=0; 
      if  (!undef(vsRng)   ){
        if(!undef(vsRng[0])) v1=vsRng[0]; 
        if(!undef(vsRng[1])) v2=vsRng[1]; 
      }
      var VSmax=obj_keys(bible[t][b].bkchapters[c].vs
               ,'bible['+t+']['+b+'].bkchapters['+(c)+'].vs').length-1
      if(v1==0 && v2==0){v1=1;v2=VSmax} 
      out(log_,'show_verse:TT:'+tt_shnm[t]+' bk#'+b+' ch#'+c
              +' vs#['+v1+'..'+v2+'] max='+VSmax+br) 
      if(VSmax<1 || v1>v2 || v1<1 || v2<1 || v1>VSmax || v2>VSmax ){
        out(log_,'show_verse: bad range'+br) 
        return''
      }  
      var tbl=''
      for(var v=v1; v<=v2; v++){//  in bible[t][b].bkchapters[c].vs
      //var vnu=Number(bible[t][b].bkchapters[c].vs[v][0]) // !!! v==vnu
        var vtx=       bible[t][b].bkchapters[c].vs[v][1]
      //out(log_,'show_verse:'+tt_shnm[t]+'.'+b+'.'+c+':'+v+'='+vno({t:t,b:b,c:c,v:v})+'='+vtx+br)
        tbl+=row_('',[[' id="no"',vno({t:t,b:b,c:c,v:v}) ],[' id="txt"',vtx]])
      }
      var tbl=htm_(['table',tblhdr,tbl]) +'<hr/>'
      return tbl
    }  
    function BADrange_bk(t,b_Rng){    // BADrange_bk(t,[b1,b2])
      var b1=b_Rng[0],b2=b_Rng[1]
        return  (t<OT_ || t>NT_)
             || (b1<bkRng[t].min || b1>bkRng[t].max
             ||  b2<bkRng[t].min || b2>bkRng[t].max
             ||  b1>b2)
    }
    function BADrange_tt(ttRng){      // BADrange_tt([t1,t2])
      return (ttRng[0]<OT_ || ttRng[0]>NT_ 
           || ttRng[1]<OT_ || ttRng[1]>NT_ 
           || ttRng[0]>ttRng[1]         )
    }
    function test_obj_fmt(){
    // bible[t][b].bknotes=[ [0,''],...]
    // bible[t][b].bkchapters[c]={chtitle:'ГЛАВА ##',vs:[[0,''],...]}
    // bible[t][b].bkchapters[c].vs[v]:'...^NN(note)...' -> [NN.CCVV.'']
      /* ---search all/show all - only defined: */
      var TTmax=bible.length;
      var t1=OT_, t2=NT_
      hdr_.innerHTML=''
      htmCont('txt_','')// txt_.innerHTML=''
      var tbuf=''
      not_.innerHTML=''
      for(var t=t1; t<=t2; t++){
        var b1=bkRng[t].min; var b2=bkRng[t].max;           // must be!
        var bk_adr_name='bible['+t+']'
        out(log_,' t='+t+' b['+b1+'..'+b2+']: '+br)
        {// check
          if(BADrange_tt([t,t]))  {out(log_,' bat TT='+t+br);      continue}
          if(undef(bible[t])){out(log_,' miss testament'+br); continue}
          
          var BKmax=obj_keys(bible[t],bk_adr_name).length-1 // real !
          var bl=bible[t].length-1
          out(log_,' t='+t+' b['+b1+'..'+b2+']: '+br)
          if(isNaN(BKmax))        {out(log_,' miss testament'+br); continue}
          if(BKmax<bkRng[t].min || BKmax>bkRng[t].max || b2>BKmax){
            out(log_,'! maybe miss 0 record '+br)
            b2=BKmax
          }
          if(BADrange_bk(t,[b1,b2]) || b1>BKmax || b2>BKmax | b1>b2)
          {out(log_,' bad bible[t] or [b1..b2]'+br); continue;}
        }
        for(var b=b1; b<=b2; b++){ 
          out(log_,' '+b+' ')
          if(BADrange_bk(t,[b,b]) || b<1 || b>BKmax || b>bkRng[t].max) continue;
          if(undef(bible[t][b])){ out(log_,'-- undefined'); continue;}
          else{
            if(!undef(bible[t][b].bktitle)) //hdr_.innerHTML+=
            tbuf+=htm_(['div',' id="bk"',bible[t][b].bktitle]) 
          }
          if(!undef(bible[t][b].bknotes)){
            not_.innerHTML+=show_notes(t,b) // or search into
          }
          if(!undef(bible[t][b].bkchapters)){ 
          //txt_.innerHTML+=
            tbuf+=show_chaps(t,b) // or search into
          }
        }
        out(log_,br)
      }
      htmCont('txt_',tbuf)
      /*---*/
      var t=NT_,b=1,c=1,buf='';// ->{ti:,ch:,no:}     
      /* bk *ok/  // събира загл и после събира текста
        buf=show_books(t,b,b);
      //hdr_.innerHTML=buf.ti
        htmCont('txt_',buf.ti+buf.ch); 
        out(not_,buf.no)
      /*---*/
      /* ch all *ok/    
        if(!undef(bible[t][b].bktitle)){
          buf=htm_(['div',' id="bk"',bible[t][b].bktitle])
          hdr_.innerHTML=buf
          htmCont('txt_',show_chaps(t,b)) 
          out(not_,show_notes(t,b)) 
        }
      /*---*/      
      /* ch 1 *ok/ 
        if(!undef(bible[t][b].bktitle)){
          hdr_.innerHTML=htm_(['div',' id="bk"',bible[t][b].bktitle])
          htmCont('txt_',show_chaps(t,b,[c,c])) 
          out(not_,show_notes(t,b)) 
        }
      /*---*/      
      /* vs *ok/ // use: htmCont('txt_',html_) not!: out(txt_,html_)
        htmCont('txt_',show_verse(t, b, 2,[3,4]))
      /*---*/
      /*---
      xxx({t_:ttno   , b_:bkno   , c_:chno   , v_:vsno 
          ,tn:ttname , bn:bkname 
          ,tr:[fr,to], br:[fr,to], cr:[fr,to], vr:[fr,to]})
      /*---*/
    }//--
_load._end()