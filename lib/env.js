load_new('../lib/env.js');
function osID(){ var os='???'
var brAgent=navigator.userAgent.toLowerCase();
  if(brAgent.indexOf("mac"      )>-1) os='Mac';
  if(brAgent.indexOf("sunos"    )>-1) os='Sun';
  if(brAgent.indexOf('win'      )>-1) os='Win';
  if(brAgent.indexOf('bsd'      )>-1) os='BSD';
  return os
}// --------------------------------------------------
//if(typeof(dbg)!='undefined' && dbg)alert(load)

// for(i=0;i<frames.length;i++){window.open(frames[i].location);}eval();
// for(i=0;i<frames.length;i++){outl('frame='+i+' location='+frames[i].location+eol+br);}

brws=[['msie'     ,0],['safari' ,0],['k-meleon' ,0],['netscape' ,0],['seamonkey',0] // [id,isactive],...
     ,['firefox'  ,0],['opera'  ,0],['konqueror',0],['chrome'   ,0]]; 
_iex=_saf=_kml=_net=_mon=_fox=_opr=_knq=_chr=false;
function browserID(){ 
   var _brws=-1;// current
   var agent=navigator.userAgent;
// if(dbg>0) outl(agent)
   agent=agent.toLowerCase();
   for(var i=0; i<=brws.length-1; i++){
     brws[i][1]=agent.indexOf(brws[i][0])>-1; if(brws[i][1]) _brws=i;	 
   }
   _iex=brws[0][1]; _saf=brws[1][1]; _kml=brws[2][1]; _net=brws[3][1]; _mon=brws[4][1];
   _fox=brws[5][1]; _opr=brws[6][1]; _knq=brws[7][1]; _chr=brws[8][1];
return _brws;
}// ---
_brws=browserID();// brws[_brws][0]
//not saf:    Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/533.18.1 (KHTML, like Gecko) Version/5.0.1 Safari/533.17.8
//not gog:    Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/534.3 (KHTML, like Gecko) Chrome/6.0.472.55 Safari/534.3

//~   kml:    Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.24pre) Gecko/20100228 K-Meleon/1.5.4
//~   mon sf: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1.15) Gecko/20101027 Mnenhy/0.8.3 SeaMonkey/2.0.10
//~   mon nm: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1.15) Gecko/20101027 Lightning/1.0b1 Mnenhy/0.8.3 SeaMonkey/2.0.10
//~   mon pt: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1.11) Gecko/20100701 SeaMonkey/2.0.6
//~   fox:    Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2.12) Gecko/20101026 Firefox/3.6.12

//    epc:    Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2.7) Gecko/20100723 Epic/1.1 Firefox/3.6.7
//yes iex:    Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; FunWebProducts; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.0.04506.30; .NET CLR 3.5.30729; AskTbIMT/5.8.0.12304)
//    slp:    Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; FunWebProducts; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.0.04506.30; .NET CLR 3.5.30729; AskTbIMT/5.8.0.12304; Sleipnir/2.9.6) 

//yes opr:    Opera/9.80 (Windows NT 5.1; U; en) Presto/2.6.30 Version/10.63
// ---
load_end();