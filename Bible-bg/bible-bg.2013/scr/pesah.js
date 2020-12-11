_load._new('scr/pesah.js')
var pesah=[0,0] // day,month - new style
var ptxt='+¬ъзкресение ’ристово (¬еликден)'
function setPesah(y){
// църковните плуващи празници са спр¤мо ѕасха
// +(orthodox fixed)/Ж(orthodox float)/h(official)/-(not official)
  if     (y==1991){ pesah=[ 7, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); } 
//else if(y==1992){ pesah=[ 0, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); } 
  else if(y==1993){ pesah=[18, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }
//else if(y==1994){ pesah=[ 0, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }
  else if(y==1995){ pesah=[23, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }
  else if(y==1996){ pesah=[14, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }
  else if(y==1997){ pesah=[27, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }
  else if(y==1998){ pesah=[19, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }
  else if(y==1999){ pesah=[11, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }
  else if(y==2000){ pesah=[30, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }
  else if(y==2001){ pesah=[15, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }
//else if(y==2002){ pesah=[ 0, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }
  else if(y==2003){ pesah=[27, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }
  else if(y==2004){ pesah=[11, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }
  else if(y==2005){ pesah=[ 1, 5]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }
  else if(y==2006){ pesah=[23, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }
  else if(y==2007){ pesah=[ 8, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }
//else if(y==2008){ pesah=[ 0, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }
//else if(y==2009){ pesah=[ 0, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }
//else if(y==2010){ pesah=[ 0, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }
//else if(y==2011){ pesah=[ 0, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }
//else if(y==2012){ pesah=[ 0, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }  
//else if(y==2013){ pesah=[ 0, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }  
//else if(y==2014){ pesah=[ 0, 4]; setHday(pesah[0],pesah[1], y,'Ж',ptxt); }  
  
}/*   --------------------------------------------------------- */
_load._end()