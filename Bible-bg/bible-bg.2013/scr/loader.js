/** @file '../lib/loader.js' @date  [y:2013,m:5,d:7,v:5.3] @devID 'elefter@abv.bg' */
// "use strict";
var undef=function(v) { return (typeof(v)=='undefined') } 
function isdef(s) {return typeof s!='undefined';}
var par  =function(name,val) {var ok=(!undef(name) && !undef(val) && !(val=='' || val==null)) 
  if(ok) return (' '+name+'="'+val+'"') 
  else {out(log_,'par(name,val): skip empty/undef. name/val'); return ''}
}
// str_to_int: a=Number(a); a=a.toNumber(); a=a.valueOf(); a=parseInt(a,10); 
{// --- globals --- 
  var br='<br/>', eol='\n',brl=eol+br;  // dont use \r
  var dbg =dbg  || 0
     ,log_=log_ || null;
/* agents: ---  new/old=+/-
 msie         + Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET4.0C) 
 msie-hta     + Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET4.0C)
 slimbrowser: + Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET4.0C; SlimBrowser/6.01.101) 
 sleipnir:    - Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; FunWebProducts; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.0.04506.30; .NET CLR 3.5.30729; AskTbIMT/5.8.0.12304; Sleipnir/2.9.6) 
 chrome:      + Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.97 Safari/537.22
 safari:      - Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/533.18.1 (KHTML, like Gecko) Version/5.0.1 Safari/533.17.8
 opera:       + Opera/9.80 (Windows NT 5.1) Presto/2.12.388 Version/12.14
 seamonkey:   + Mozilla/5.0 (Windows NT 5.1; rv:19.0) Gecko/20100101 Firefox/19.0 SeaMonkey/2.16.1 
 firefox:     + Mozilla/5.0 (Windows NT 5.1; rv:19.0) Gecko/20100101 Firefox/19.0
 k-meleon:    + Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.24pre) Gecko/20100228 K-Meleon/1.5.4
--- */
 // os_br_en_ag() ->  _os,_engine,_browser, _mob; _iex,...
  var _mob,_os ,_engine ,_browser='' // browser:can find many id's 
     ,_iex,_saf,_net,_mon,_fox,_opr,_knq,_chr  ,_kml,_slm,_slp
}// ---
function os_br_en_ag(){ // -> _os,_engine,_browser - browser flags
  var _browsers=
    ['MSIE'     ,'Netscape' ,'Seamonkey','Firefox','Opera' ,'Chrome' 
    ,'Slimbrowser','Konqueror','K-meleon','Sleipnir','Safari'
    ]; 
  var _engines =['Trident' ,'Gecko'  ,'Presto','Khtml','AppleWebKit',]; 
  _mob=false;_iex=false;_saf=false;_kml=false;_net=false;_mon=false;_fox=false;_opr=false;_knq=false;_chr=false;_slm=false;_slp=false; 
  _os=''; _engine=''; _browser=''
  var agent=navigator.userAgent ,a=agent.toLowerCase()

  for(var i=0; i<=_engines.length-1; i++){
    if(a.indexOf(_engines[i])>-1) _engine+=_engines[i]+' ';	 
  }

  for(var i=0; i<=_browsers.length-1; i++){
    var j=a.indexOf(_browsers[i].toLowerCase())
    if(j>-1) _browser+=_browsers[i]+' ';
    if(j>-1) {
      _iex=(_browsers[i]=='MSIE'      )
      _fox=(_browsers[i]=='Firefox'   )
      _mon=(_browsers[i]=='Seamonkey' )
      _saf=(_browsers[i]=='Safari'    )
      _opr=(_browsers[i]=='Opera'     )
      _chr=(_browsers[i]=='Chrome'    )
      _knq=(_browsers[i]=='Konqueror' )
      _net=(_browsers[i]=='Netscape'  )
    //_kml=(_browsers[i]=='K-meleon'  )
    //_slm=(_browsers[i]=='Slimbrowser')
    //_slp=(_browsers[i]=='Sleipnir'  )
    }	
  }
  _mob= (a.indexOf('Mobile')>-1)
  
  _os+= (a.indexOf("mac"  )>-1) ? 'Mac' : '';
  _os+= (a.indexOf("sunos")>-1) ? 'Sun' : '';
  _os+= (a.indexOf('win'  )>-1) ? 'Win' : '';
  _os+= (a.indexOf('bsd'  )>-1) ? 'BSD' : '';
  _os+= (a.indexOf('OS 5_')>-1) ? 'OS5' : '';
  
  if(dbg>1){
    out(log_,'loader.js: os_br_en_ag():'+' os:'+_os+' browser:'+_browser 
                    +' engine:' +_engine +brl+' agent:'  +agent  +brl);
  }
}// ---
function _err(msg,url,ln){//  usage: window.onerror = _load_err - _iex? 
  var fm='?'; if(!undef(_file_crnt_nm)) fm=_file_crnt_nm;
  var msgA=[{name:'line:'   ,val:ln       }
       ,{name:'error:'  ,val:msg      }
       ,{name:'url:'    ,val:url      }
       ,{name:'browser:',val:_browser }
       ,{name:'in_load:',val:fm       }];
  var msgS='-->'+eol
  if(!undef(log_)){
    for(var i=0; i<msgA.length; i++){
      msgS+=msgA[i].name+'"'+htm_(['font',' color="red"',msgA[i].val])+'"'+br
    };
    out(log_,msgS+eol+br); 
  } else {                                                          
    for(var i=0; i<msgA.length; i++){
      msgS+=msgA[i].name+'"'+msgA[i].val +'"'+eol
    };
    alert('log:'+msgS)
  }
  return true; // supress default error message 
//return false;// default handler run.
}// ---

{// screen i/o
  function sys(s){document.write(s)}
  var out_stack=''
  function out(){// (plc_,p1,...) - append to plc_.innerHTM, p1==null to clear
    /** --- out(log_,...) ---  
      <span id='log'></span>                    // 1.make a place in html body
      var log_ = document.getElementById("log") // 2.init log_
      out(log_,p1,...)                          // 3.append to log
      log_.innerHTML='';                        // clear log
    **/
    var s='',plc_=arguments[0]; // Variadic function: arguments[] is a special variable!
    var clear=(arguments[1]==null) // begin with null to clear box
    for (var i=1; i<arguments.length; ++i) 
      if(arguments[i]!=null && arguments[i]!='') s+= arguments[i]; // skip empty's
    if(undef(plc_) || plc_==null || plc_=='')  out_stack+='»'+s // document.write(s)
    else
      try{ 
        if(clear) plc_.innerHTML=''
        plc_.innerHTML+=out_stack+s; 
        out_stack='' 
      }catch(Exception){ document.write(out_stack+'»»'+s); out_stack=''}
  }//--
}
function htm_(h,e){ // htm_([tag,par,data],eol)
  var eol=''; if(undef(e) && e=='\n') eol='\n';
  return '<'+h[0]+' '+h[1]+'>'+eol
  +h[2]+'</'+h[0]+'>'+eol;
}
function row_(p,r){ var newrows='' // row_(rowpar,[ [par,data],...])
  for(var i in r){          
    if(undef(r[i])) { out(log_,'row_():skip missed col['+i+']'+br);
    } else             newrows+=htm_(['td',r[i][0],r[i][1]])+eol 
  }
  return htm_(['tr',p, newrows])+eol;
}

function is(a,op,b){/* is(2,'in',[0,3,1,2]) -> [t|f,inobj,as_at,#] */
  k=-1; foundobj=false; foundarr=false; foundstr=false;
  if(op=='in'){
    if(typeof(b)=='string'){
      k=b.indexOf(a); foundstr=(k>=0);
      if(foundstr) return[true,'in string','at pos.',k]
      else         return[true,'in string',''       ,k]
    }else if(typeof(b)=='object'){// -- also for arrays
      foundobj=(a in b);
      for(var i in b){ foundarr=(a==b[i]); if(foundarr) {k=i; break} };
    }
  }
  if     ( foundobj &&  foundarr && k>= 0) 
    return [true ,'in array'    ,'as index', k];
  else if( foundobj && !foundarr && k==-1) 
    return [true ,'in object'   ,'as key'  ,-1];
  else if(!foundobj &&  foundarr) 
    return [true ,'in object'   ,'as value', k];
  else
    return [false,'in obj./arr.',''        ,-1];
}// ---
function isObj(o){
  return (typeof o === 'object' && typeof o.splice !== 'function');
}
function obj_keys(obj,name_){ name='?'
  if(!undef(name)) name=name_ 
  if(undef(obj)){ 
    out(log_,' obj_keys():'+'undefined obj '+name+br)
    return {'err':'undefined obj','name':name};
  }
  if(obj==null)               { 
    out(log_,' obj_keys():'+'null obj '+name+br)
    return {'err':'null obj','name':name};
  }
// ok:[km], err:[sm,ff] -> error:"TypeError: obj is not an object" 
  if(_fox){ var keys=Object.keys(obj) }
  else    { var keys=[], kl=-1; for (var i in obj) {kl++; keys[kl]=i} }
  return keys; 
// if (obj.hasOwnProperty(name)) ...
// var myObject = { name: "Cody", status: "Surprised" };
// for (var propertyName in myObject) {
//   out(log_, propertyName + " : " + myObject[propertyName] +br);
// }
}// ---
function obj_list(obj,name_){
  if(undef(obj))   return 'obj undef.'// try!?
  if(undef(name_)) return 'name undef.'
  var n=name_ ,buf=''// obj_keys(eval(n),n);
  var ok=obj_keys(obj,n);
  // buf+=n+'['+ok.length+']:'+ok+br
  for(var i=0; i<ok.length; i++){
    var n2=n+'.'+ok[i]
    var v=eval(n2)
    var t=typeof(v)
    var j
    if(typeof(v)=='string')   v=v.substring(0,20)  
    if(typeof(v)=='function'){
      v=String(v); j=v.indexOf('{')
      v=v.substring(0,j)+'{...}'
    } 
    if(typeof(v)=='object'){// v=obj_keys(ok[i],n2);
    }
    buf+='['+(i+1)+']= '+name_+'.'+ok[i]+' "'+t+'" :'+v+br
  }
  if(dbg>1) out(log_,buf)
  return buf
}
{// DOM access by id
  function contentbyID(id){return document.getElementById(id).innerHTML;}
  {//-- getComputedStyle() // http://snipplr.com/view/13523/
      if (!window.getComputedStyle) {
        window.getComputedStyle = function(el, pseudo) {
          this.el = el;
          this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
              prop = prop.replace(re, function () {
                return arguments[2].toUpperCase();
              });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
          }
          return this;
        }
      } 
  //  window.onload = function() {
  //    var compStyle = window.getComputedStyle(document.getElementById('test'), "");
  //    alert(compStyle.getPropertyValue("color"));
  //    alert(compStyle.getPropertyValue("float"));
  //    alert(compStyle.getPropertyValue("background-color"));
  //  }
  }//--
  function dump_elem(layID){
    //https://developer.mozilla.org/en-US/docs/DOM/element.style
      var elt = document.getElementById(layID);
      var buf = "{ // "+_browser+br
      var und=0, cnt=0, emp=0, obj=0, toshow;
      var st = elt.style;
      var cs = window.getComputedStyle(elt, null); //?
      for (x in st) {cnt++; toshow=false;// x is name, st[x] is value
        var v=st[x]
        if(!undef(v)){
          if(typeof(v)=='string'){ if(v=='') emp++; else toshow=true}
          if(typeof(v)=='object'){           obj++; }
          else toshow=true
          if(toshow){
            var cx=window.getComputedStyle(elt, null).x; // window.getComputedStyle(elt).x; 
            buf +=" ,"+x +":'"+v+"'"    
                 +" >cx '"+cx+"'" 
                 +" >cs '"+cs[x]+"'" 
                 +br;
          }
        } else und++;
      }
      buf+='} // cnt='+cnt+' undef='+und+' obj='+obj+' empty='+emp+br
      return buf
  }
  function dump_some(){
    var s='', cnt
    var mets= document.getElementsByTagName('meta' );  cnt=0; s+=br+'meta`s='+mets.length
    for (var i=0; i< mets.length; i++)  
      if(mets[i].content=='') cnt++; else s+=br+'meta['+i+']='+ mets[i].content;
    if(cnt>0) s+=br+'-- empty`s='+cnt
    var frms= document.getElementsByTagName('frame' ); cnt=0; s+=br+'frame`s='+frms.length
    for (var i=0; i< frms.length; i++)  
      if(frms[i].src=='') cnt++; else  s+=br+'frame['+i+']='+ frms[i].src;
    if(cnt>0) s+=br+'-- empty`s='+cnt
    var lnks= document.getElementsByTagName('link'  ); cnt=0; s+=br+'link`s='+lnks.length
    for (var i=0; i<  lnks.length; i++) 
      if(lnks[i].src=='') cnt++; else  s+=br+'link['+i+']='+ lnks[i].href+' '+lnks[i].type;
    if(cnt>0) s+=br+'-- empty`s='+cnt
    var scrs= document.getElementsByTagName('script'); cnt=0; s+=br+'script`s='+scrs.length
    for (var i=0; i<scrs.length; i++)
      if(scrs[i].src=='') cnt++; else  s+=br+'script['+i+']='+ scrs[i].src;
    if(cnt>0) s+=br+'-- empty`s='+cnt
    var hrfs= document.getElementsByTagName('a'     ); cnt=0; s+=br+'href`s='+hrfs.length
    for (var i=0; i<hrfs.length; i++)
      if(hrfs[i].href=='') cnt++; else s+=br+'href['+i+']='+ hrfs[i].href;//!?
    if(cnt>0) s+=br+'-- empty`s='+cnt
    var imgs= document.getElementsByTagName('img');    cnt=0; s+=br+'img`s='+imgs.length
    for (var i=0; i<imgs.length; i++)
      if(imgs[i].src=='') cnt++; else  s+=br+'img['+i+']='+ imgs[i].src;
    if(cnt>0) s+=br+'-- empty`s='+cnt
    return s
  }
  function Hide    (id){
    if(undef(id)){ sys('Hide(id): id=undefined'); return}
    var p_=document.getElementById(id)
    if(undef(p_) || p_==null){ sys('Hide(id): id='+id+' missing'); return}
    p_.style.display = "none" ; 
  }
  function Show    (id){
    if(undef(id)){ sys('Show(id): id=undefined'); return}
    var p_=document.getElementById(id)
    if(undef(p_) || p_==null){ sys('Show(id): id='+id+' missing'); return}
    p_.style.display = "block"; 
  }
  function ShowHide(id){// switch hide/show for id
    if(undef(id)){ sys('ShowHide(id): id=undefined'); return}
    var p_=document.getElementById(id)
    if(undef(p_) || p_==null){ sys('ShowHide(id): id='+id+' missing'); return}
    if(p_.style.display!= "none") Hide(id); else Show(id);
  }
}//--
{/* roots todo
  var root_='../'; // relative paths
  var roots=[
   {vol:'maxtor 81',       drv:'e:', dir:'/Tedy/my-dev/'}     
  ,{vol:'hitachi 82',      drv:'d:', dir:'/elefter/my-dev~/'} 
  ,{vol:'quantum ex 6.4a', drv:'c:', dir:'/elefter/my-dev+/'} 
  ,{vol:'HDS.82res-p2'   , drv:'d:', dir:'/elefter.dev/my-dev+/'}
  ]
  var drive_=roots.drv, rootloc_=roots.drv+roots.dir;
  var rootlocx_='\\elefter.dev\\my-dev+\\' // with \\ for activex    
*/}
  var rootlocx_='e:\\elefter.dev\\my-dev+\\' // with \\ for activex 
/* box=_make_box(
    [{no:0,id:'hdr',t:'row'  ,w:___,h:___,u:'px',bg:'#______',fg:'#______',sh:'btn',st:''}
    ,{no:1,id:'idx',t:'col'  ,w:___,h:___,u:'px',bg:'#______',fg:'#______',sh:'btn',st:''}
    ,{no:2,id:'wrk',t:'col'  ,w:___,h:___,u:'px',bg:'#______',fg:'#______',sh:'btn',st:''}
    ,{no:3,id:'wdg',t:'col'  ,w:___,h:___,u:'px',bg:'#______',fg:'#______',sh:'btn',st:''}
    ,{no:4,id:'ftr',t:'row'  ,w:___,h:___,u:'px',bg:'#______',fg:'#______',sh:'btn',st:''}
    ,{no:5,id:'log',t:'row'  ,w:___,h:___,u:'px',bg:'#______',fg:'#______',sh:'btn',st:''} 
    ],to_id) // log must always exist
*/
function shell_line(id,w,h,c1,c2){// shell_line('log',100,9,'#444','#88f')
  var hr='<hr width="'+w+'" size="'+h+'px" color="'+c1+'"'
        +' align="left"'+' style="float:left;"'
        +    ' onClick="ShowHide(\''+id+'\')"' 
        +' onmouseover="this.style.color=\''+c2+'\'"'
        + ' onmouseout="this.style.color=\''+c1+'\'"/>'
  /* opera: <hr size=9> not work!? */
  return hr
}
function make_box(layout,to_id){// -> box[]
  var	defstl='margin:0 auto 0 auto;'    // outside box
            +'padding:0 0 0 0;'         // inside
            +'border:1px silver dashed;'// test frame
          //+'float:left;'
      ,box=[],lay_=document.getElementById(to_id)
      ,fatal=false, log=null
  if(undef(lay_) || lay_==null){ fatal=true
    msg='*** fatal *** _make_box: missing layout id='+to_id+br
    sys(htm_(['div','id="log"',msg]))
    return box
  }
  for(var i=0; i<=(layout.length-1); i++){ var no=Number(i)
    if(undef(layout[i].id) || layout[i].id==null || layout[i].id=='') continue
    var no=Number(i);    if(no<0)                    no=0
    var id=layout[i].id; if(id.indexOf('log')>=0)    log=no
    var t =layout[i].t;  if(!(t=='row' || t=='col')) t  ='row'
    box.push({'no':no,'id':id,'t':t ,p_:null,w:null,h:null,u:'px',sh:'',stat:false,st:'',bg:'',fg:''})
    
    if(!undef(layout[i].w ) && layout[i].w !=null && layout[i].w !=0 ) box[i].w  =layout[i].w ;  
    if(!undef(layout[i].h ) && layout[i].h !=null && layout[i].h !=0 ) box[i].h  =layout[i].h ;  
    if(!undef(layout[i].u ) && layout[i].u !=null && layout[i].u !='') box[i].u  =layout[i].u ; 
    if(!undef(layout[i].bg) && layout[i].bg!=null && layout[i].bg!='') box[i].bg =layout[i].bg; 
    if(!undef(layout[i].fg) && layout[i].fg!=null && layout[i].fg!='') box[i].fg =layout[i].fg; 
    if(!undef(layout[i].sh) && layout[i].sh!=null && layout[i].sh!='') box[i].sh =layout[i].sh; 

    { box[i].st=defstl
      if(box[i].w>0)    box[i].st+='width:' +box[i].w  +box[i].u +';'
      if(i==log && (box[i].h<=0 || box[i].h==null)) box[i].h=200
      if(box[i].h>0)    box[i].st+='height:'+box[i].h  +box[i].u +';'
      if(box[i].bg!='') box[i].st+='background-color:' +box[i].bg+';'
      if(box[i].fg!='') box[i].st+='color:'            +box[i].fg+';'
      if(!undef(layout[i].st) && layout[i].st!=null && layout[i].st!='') box[i].st+=layout[i].st; 
    }
    {if(box[i].t=='row' && no>0 && !_iex) box[i].sh+='<br>' 
      var tag='span';  if(box[i].t=='row') tag='div';
      var shell=box[i].sh; // if(shell!='') shell+=br
      lay_.innerHTML+=
        shell + htm_([tag,'id="'+box[i].id+'"'+par('style',box[i].st),''])//+ br
      box[i].p_=document.getElementById(box[i].id)
      box[i].stat=(box[i].p_!=null)
    }
  }
  if(log==null || !box[log].stat){
    msg='*** warning *** _make_box: log forced.'+br
    sys(htm_(['div','id="log"',msg]))
    box[log].p_=document.getElementById(box[log].id)
    box[log].stat=(box[log].p_==null)
  }
  return box
}
/*'=MOL'  is horizontal mnu_,out_,log_ from top to bottom
  ':M=OL' is vertical mnu on left, horizontal out_,log_ on right
             <tr><td rowspan="2" valign="top">mnu</td><td>out</td></tr>
             <tr>                                     <td>log</td></tr>
  html=make_tbl(
     '=OLM' // order: '=OL','=MOL','=OLM',':M=OL','=OL:M'
     // name  id      line hide btn line
    ,[['mnu','mnu.xxx','-','h','mnu','-']
    , ['out','wrk.xxx',' ','s',''   ,' ']
    , ['log','log.xxx','-','h','log','-']] 
  )
* /
make_tbl=function(layout_,ext){// -> html
  var hr='<hr style="color:gray;"/>'
  var wrapno=' wrap="no"' // default is yes, used for: table,tr,td
  var wrapstl=' white-space: nowrap;white-space: normal;'
//         +' overflow: hidden;' // ?
  var tblhdr=' cellspacing="1" cellpading="1" border="0"'
  var btn1=' style="background-color:gold;color:black;'
      +'border: 2px gray outset;"'// width style color inherit?
  // 'border-width:1px; border-color:blue; border-style:solid;'
  // styles=[solid,double,groove,dotted,dashed,inset,outset,ridge ,hidden]
  {// --- logID, log_, outID, out_, mnuID, mnu_
    for(var i=0; i<=(ext.length-1); i++){
      var id_='',h1_='',ev_='',bt_='',bn_='',h2_='',an_=''   
      if(ext[i][0]=='mnu') {id_=ext[i][1];} // mnuID=id_
      if(ext[i][0]=='out') {id_=ext[i][1];} // outID=id_
      if(ext[i][0]=='log') {id_=ext[i][1];} // logID=id_
      if(ext[i][2]=='-')    h1_=hr
      if(ext[i][4]!='' )   {bn_=ext[i][4];bt_=btn1;}
      if(ext[i][3]=='h')   {ev_=' onclick="ShowHide(\''+id_+'\')"'
                            an_=htm_(['a',' title="show/hide"'+ev_+bt_,bn_]) }
      if(ext[i][5]=='-')    h2_=hr 
      var rez=h1_+an_+htm_(['span',' id="'+id_+'"',''])+h2_+eol 
    //'span','div' - div make new line at end! 
      if(ext[i][0]=='mnu') {var mnu_=rez;}
      if(ext[i][0]=='out') {var out_=rez;}
      if(ext[i][0]=='log') {var log_=rez;}
    //backIDs[i]=id_// ext[i][0]
    }
  }// ---
  var layouts_=['=OL','=MOL' ,'=OLM' ,':M=OL' ,'=OL:M'] 
  function MOL(layout_){
    var rs=' rowspan="2" valign="top"'
    var tbl='';
    if      (layout_=='=OL'  ){ tbl= row_('',[['',out_]])
                                    +row_('',[['',log_]]) 
    }else if(layout_=='=MOL' ){ tbl= row_('',[['',mnu_]])
                                    +row_('',[['',out_]])
                                    +row_('',[['',log_]]) 
    }else if(layout_=='=OLM' ){ tbl= row_('',[['',out_]])
                                    +row_('',[['',log_]])
                                    +row_('',[['',mnu_]])
    }else if(layout_==':M=OL'){ tbl= row_('',[[rs,mnu_],['',out_]])
                                    +row_('',[['',log_]]) 
    }else if(layout_=='=OL:M'){ tbl= row_('',[['',out_],[rs,mnu_]])
                                    +row_('',[['',log_]]) 
    }
    return tbl;
  }// ---
  if(undef(layout_)) var layout='=OL'; else var layout=layout_;
  var lin=false; for(i in layouts_){lin=(layout_==layouts_[i]); if(lin)break} 
  //alert('?is layout='+layout_+' in layouts_[]:'+lin+eol)
  if(!lin) layout_=':M=OL'
  var all=htm_(['table',tblhdr,MOL(layout_)])
  return all;// send a content to body/hdr by sys()
}// ---  
*/
//----------------------------------------------------------
var _load=_load || {}; 
var _loader=function(){  // constructor _loader
//-- this.a - public, var a - internal
/** usage in each .js file ---
  _load._new(filename) 
  ...
  _load._end() 
--- **/
/** usage in head of page, if prefer to load by _load([]) : ---
<head>
<script src="../lib/loader.js"></script>
<script> _load._do(["styles.css",'work.js']); </script>
</head>
--- **/
/** ----------==loadjs== -> _loadv
 browser      0  1  2  3  => _loadv  activex  engine
 msie         +  -  +  +  => 0,2,3   +        trident
 msie-hta     +  -  +  +  => 0,2,3   +        trident
 slimbrowser  +  -  +  +  => 0,2,3   +        trident
 k-meleon     +  -  +  +  => 0,2,3   -        gecko
 seamonkey    +  -  ~  ~! => 0       -        gecko
 firefox      +  -  ~  ~! => 0       -        gecko
 opera        +  -  +  +  => 0,2,3   -        presto
 chrome       +  -  ~  ~! => 0       -        AppleWebKit(KHTML, like Gecko)
    if(   _engine.indexOf('trident' )>=0
      ||  _engine.indexOf('presto'  )>=0
      || _browser.indexOf('k-meleon')>=0
      ) _loadv=3 
//  _loadv=3 is better, but dont load files for engines=['gecko','khtml','applewebkit']
//-- http://www.nczonline.net/blog/2009/06/23/loading-javascript-without-blocking/
--- **/
var 
  _file_crnt_nm='', _file_crnt_no=null
 ,_file=[] // [{path:'',file:'',ext:'',status:null},...] 
//const 
 ,_loadv=0 // load variants: 0 -write /3 - append child to head !not in my order!
 ,_stat_new ='new' , _stat_end ='ok', _stat_todo='todo'        // --- status ---
 ,_stat_miss='miss', _stat_unkn=null, _stat_inload='in load'
this._has_err=function(){
  var err=false
  for(var i=0; i<=_file.length-1; i++) with(_file[i]) 
    if(_file[i].status==_stat_miss || _file[i].status==_stat_unkn)
      {err=true; break}
  return err
}
this._new =function(_newfile){// also called from _newfile at begin
  _file_crnt_no=-1; 
  for(var i in _file){
    if(_file[i].path+_file[i].file+_file[i].ext==_newfile){
      _file_crnt_no=i; break;
    }
  }// ---
  if(_file_crnt_no<0){ 
    var last_file_no=_file.length-1;
    if(dbg>1){ out(log_,'warn: _load._new("'+_newfile+'"):'
                 +' file not predefined'
                 +', insert after ['+last_file_no+']');
    }
    /* insert file,status */
    _file_crnt_no=last_file_no+1; 
    _file[_file_crnt_no]={}; 
    var pend=_newfile.lastIndexOf('/')
    var fend=_newfile.lastIndexOf('.')  
    var eend=_newfile.length-1;
    if(pend<0) _file[_file_crnt_no].path=''
    else       _file[_file_crnt_no].path=_newfile.substring(0,pend+1)
    _file[_file_crnt_no].file           =_newfile.substring(pend+1,fend);
    _file[_file_crnt_no].ext            =_newfile.substring(fend,eend+1);
    /* --- */    
  }
  _file[_file_crnt_no].status=_stat_new;
  _file_crnt_nm=_newfile;
  if(dbg>1){ 
    out(log_,br+'._load._new():[0..'+(_file.length-1)+']\n'+br)
  //for(i in _file) 
    var i=_file_crnt_no
    out(log_,'_file['+i+'].file='+_file[i].file+'\n'+br);
  }
  if(dbg>1) sys('_load._new("'+_newfile+'")'+br)
}// ---
this._end =function(){            // called from _newfile at end
  var last_file_no=_file.length-1;
  if(_file_crnt_no<0 || _file_crnt_no>last_file_no){
    out(log_,'warn: _load_end():[0..'+last_file_no+']'
       +' bad _file_crnt_no='+_file_crnt_no+' _file_crnt_nm='+_file_crnt_nm
       +', skip.')
  } else if(_file_crnt_nm!=
     _file[_file_crnt_no].path+_file[_file_crnt_no].file+_file[_file_crnt_no].ext
    ){
    out(log_,'err: _load_end():[0..'+last_file_no+']' // logic err !?
       +' file not match to current='+_file_crnt_nm
       +' file='+_file[_file_crnt_no].path+_file[_file_crnt_no].file+_file[_file_crnt_no].ext
       +', skip.')
  } else {
    _file[_file_crnt_no].status=_stat_end;
    if(dbg>0){ out(log_,'.load_end(): ['+_file_crnt_no+'].pfe='+_file_crnt_nm 
                   +' .status='+_file[_file_crnt_no].status+' '+br)
      if(dbg>1) sys('_load_end('+_file_crnt_nm+')'+br)
    }
    _file_crnt_nm=''
  }
}// ---
this._list=function(){            // -> html 
  var buf='', al=' align="left"', ar=' align="right"';	
  var clrn=' style="color:black";'
    buf=row_(' style="background-color:dimgray;"',
       [[ar+clrn,'#' ]
       ,[ar+clrn,'path/']
       ,[al+clrn,'file']
       ,[al+clrn,'.ext']
       ,[   clrn,'-status-']] )
  for(var i=0; i<=_file.length-1; i++){// (var i in _file)
    var clrs='red',clrn=''; 
    if     (_file[i].status==_stat_end ) clrs='lime'; 
    else if(_file[i].status==_stat_todo) clrs='cyan';
    else if(_file[i].status==_stat_miss) clrs='red';
    else                      clrs='magenta'; // err!
    clrs=' style="color:'+clrs+'";'
    clrn=' style="color:black";'
  //if(i==Math.floor(i/col)*col) buf+='</tr>'+eol;	
  // file=_file[i].file
  //var j=file.lastIndexOf('/'), l=file.length;
  //var subdir=''; if(j>=0) subdir=file.substring(0,j+1) // with /
  //var fname =file.substring(j+1,l) 
    var a='<a title="file['+i+']='
    +_file[i].path+_file[i].file+_file[i].ext
    +'; status='+_file[i].status+'">'
    buf+=row_(' style="background-color:dimgray;"',
       [[ar+clrn,   i                     ]
       ,[ar     , a+_file[i].path  +'</a>']
       ,[al     , a+_file[i].file  +'</a>']
       ,[al     , a+_file[i].ext   +'</a>']
       ,[   clrs, a+_file[i].status+'</a>']] )
  }
  buf='<pre>'/* *-/+'<xmp>'/* */
     +htm_(['table '
           ,' cellspacing="1" cellpading="1" wrap="no" border="0"'
         //+' style="background-color:dimgray;"'
           ,buf])
     /* *-/+'</xmp>'/* */+'</pre>'+eol+br;
  return buf;
}// ---
this._do  =function(files_new){   // load _file[], return report _load_list()-> 
// without _load._new(file)..._load._end(); but set _file[]
// with   _^, set: _file_crnt_nm,_file_crnt_no
  // append files_new at end of _file[] 
  for (var i in files_new){
    var dbl=false;
    for(var j in _file){
      if(files_new[i].path+files_new[i].file+files_new[i].ext
      ==     _file[j].path    +_file[j].file+    _file[j].ext){ 
        dbl=true;
        if(dbg>1) 
          out(log_,'_load(): warn: skip repeated file['+i+']='+files_new[i]+' with ['+j+']. skip'+br);
        break;
      } 
    }
    if(!dbl){/* insert, status=todo */
      var _file_new_no=_file.length;// _file_new_no++;
      _file[_file_new_no]={}; 
      _file[_file_new_no]=
        {'path':files_new[i].path,'file':files_new[i].file
        , 'ext':files_new[i].ext ,'status':_stat_todo      }; 
    }
  }
  
  if(dbg>0){ out(log_,'_load(): files='+_file.length+br);
    for(i in _file){  
      out(log_,'_file['+i+']'
         +'{path:'  +_file[i].path+',file:'  +_file[i].file
         +', ext:'  +_file[i].ext +',status:'+_file[i].status+'\n'+br);
    }
  }

  for(i in _file){// load *.js/*.css:
    if(_file[i].status==_stat_todo){
      with(_file[i]) {var fname=path+file+ext}
      this._new(fname)
      if(dbg>0) out(log_,'_load('+i+'):');
      var iscss=_file[i].ext=='.css', isjs =_file[i].ext=='.js'
      if      (iscss){ var _load_type="text/css";
        if(dbg>0) out(log_,'_load css['+i+']='+fname+' ...');
        if(_loadv==0) { 
          sys('<link href="'+fname
            +'" type="'+_load_type+'" rel="stylesheet" />');
          if(_file[i].status!=_stat_end) _file[i].status=_stat_unkn;
        } else if(_loadv==3) { 
          _load3(i,_load_type) // not in iex/hta; yes in fox
          if(_file[i].status!=_stat_end) _file[i].status=_stat_inload
        }
        if(dbg>0)out(log_,': _loadv='+_loadv+eol) 
	    }else if(isjs) { var _load_type="text/javascript";
        if(dbg>0) out(log_,'_load js ['+i+']='+fname+' ...');
        if(_loadv==0) { 
          sys('<scr'+'ipt src="'+fname+'"><\/scr'+'ipt>');
          if(_file[i].status!=_stat_end) _file[i].status=_stat_unkn;
        } else if(_loadv==3) { 
          _load3(i,_load_type); 
          if(_file[i].status!=_stat_end) _file[i].status=_stat_inload
        }
        if(dbg>0)out(log_,': _loadv='+_loadv+eol)      
	    }else{if(dbg>0)out(log_,' not .js/.css ; skip')}
      
      if(dbg>0) out(log_,'; stat='+_file[i].status+br)
    }
  }
}// --- 

function _load3    (i,_load_type){
    var fname=_file[i].path+_file[i].file+_file[i].ext
    out(log_,'load3(): ['+i+'] '+fname)//+'; _load_type='+_load_type+".loaded "+br
//  --- http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml
    if (_file[i].ext=='.js' ){ //if filename is a external JavaScript file
      var f=document.createElement('script')
      f.setAttribute("type","text/javascript")
  //  f.type=_load_type; 
      f.setAttribute("src", fname)
    } else if (_file[i].ext=='.css'){ //if filename is an external CSS file
      var f=document.createElement("link")
      f.setAttribute("rel", "stylesheet")
      f.setAttribute("type", "text/css")
  //  f.type=_load_type; 
      f.setAttribute("href", fname)
    } else { out(log_,' not .js/.css; skiped.'+br); return }
//  --- 
    /* */
    if(_iex){//trident engine  
      f.onreadystatechange = function(){
        if (  f.readyState=="loaded" 
           || f.readyState=="complete"){
          f.onreadystatechange = null;
          _file[i].status=_stat_end; 
          if(dbg>0) out(log_,' (msie) ok: load3('+i+'):'+fname+br); 
        }
      }
    } else {                
      f.onload = function(i,msg){ 
        _file[i].status=_stat_end; 
        if(dbg>0) out(log_,msg+' (not msie) ok: load3('+i+'):'+fname+br); 
      }
    } 
    /* */
    if (!undef(f)) {
      document.getElementsByTagName("head")[0].appendChild(f);
      out(log_, ' ok: load3('+i+'):'+fname+br)
    } else 
      out(log_,' err: load3('+i+'):'+fname+br)
}// ---
}//--
_load=new _loader() // construct _load
//----------------------------------------------------------
_load._new('../lib/loader.js')
/* test: *-/ out(log_,obj_list(_load,'_load')) 
// [1] _load._has_err     :function(){...}
// [2] _load._new         :function(_newfile){...}
// [3] _load._end         :function(){...}
// [4] _load._list        :function(){...}
// [5] _load._do          :function(files_new){...}
// [6] _load._make_layout :function(layout_,ext){...}
/* */
os_br_en_ag()
_load._end();