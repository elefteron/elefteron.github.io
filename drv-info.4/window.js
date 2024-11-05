load+='window '
function setw(w,h,posy,posx){x=0;y=0
// if (posy=='T') y=0;
   if (posy=='B') y=maxy-h1      +taskbarup*taskbarH;
   if (posy=='C') y=(maxy-h1)/2  +taskbarup*taskbarH;
// if (posx=='L') x=0;
   if (posx=='R') x=maxx-w1      +taskbarleft*taskbarW;
   if (posx=='C') x=(maxx-w1)/2  +taskbarleft*taskbarW;
   window.resizeTo(w,h);
   window.moveTo(x,y)
}// ---------------------------------------
    caption=1; scrollbar=1;

    taskbarup=0; taskbarleft=1 // set manually if up or left; how to get?
    maxx =screen.availWidth;
    maxy =screen.availHeight;
    taskbarH=screen.height-maxy;
    taskbarW=screen.width-maxx;
    scrollbarSz=15
// ---
