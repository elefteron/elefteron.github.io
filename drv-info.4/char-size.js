load+='char-size '
    h1=w1=0
    kw=11;/*font-size  :10pt;*/ kh=11/*line-height:12pt;*/
    chW=kw*0.674;               chH=kh*2.04  // points*pixel_size=char_pixels
    function winw(){ w1=chars*chW      +tblW  +scrollbar*scrollbarSz +5 /* 7px right zone !?*/
    	return w1 
    }
    function winh(){ h1=(1+Drives+2)*chH      +scrollbar*scrollbarSz +5
    	return h1    //          
    }
