load_new('../lib/math.js')

/*
// =Math.ceil(n) - smallest integer >= n // (Ceil(5.25) is 6)
// =ff.toString(10)
c=a%b remainder, Modulus Operator (%, mod)
//http://www.w3schools.com/js/js_obj_math.asp
Math.abs(a)     // the absolute value of a
Math.ceil(a)    // integer closest to a and not less than a
Math.exp(a)     // exponent of a
Math.floor(a)   // integer closest to and not greater than a
Math.log(a)     // log of a base e
Math.max(a,b)   // the maximum of a and b
Math.min(a,b)   // the minimum of a and b
Math.pow(a,b)   // a to the power b
Math.random()   // pseudorandom number in the range 0 to 1
Math.round(a)   // integer closest to a
Math.sqrt(a)    // square root of a
// Note that trigonometric functions assume
// that the argument is in radians, not degrees!
Math.sin(a)     // sine of a
Math.cos(a)     // cosine of a
Math.tan(a)     // tangent of a
Math.asin(a)    // arc sine of a
Math.acos(a)    // arc cosine of a
Math.atan(a)    // arc tangent of a
Math.atan2(a,b) // arc tangent of a/b
// math constants
Math.E             Math.PI           Math.SQRT2
Math.SQRT1_2       Math.LN2          Math.LN10
Math.LOG2E         Math.LOG10E
/* */
function b2kb(b){var kb   // round or fixed .2
   kb=b/1024
// kb=Math.round(kb)
   kb=kb.toFixed(2)
   return kb
}// --------------------------------------
function b2mb(b){var mb   // round or fixed .2
   mb=(b/1024)/1024
// mb=Math.round(mb)
   mb=mb.toFixed(2)
   return mb
}// --------------------------------------
function b2gb(b){var gb   // round or fixed .2
   gb=((b/1024)/1024)/1024
// gb=Math.round(gb)
   gb=gb.toFixed(2)
   return gb
}// --------------------------------------
function b_grp3(a,f){ var nsp='&nbsp;'
//  groupCharsBy (n,by_m,after_p,ch) = (aaa,3,3,nsp)
  if(undef(a)) return ''
  var b=a.toString()
  
  var f_perm=[b2kb,b2mb,b2gb],found=false
  for(var i in f_perm){found=(f_perm[i]==f);
    if(found) { var b=f(a.toString());break;} 
  };
  if(!found) log(' b_grp3(): unknown func. call. ignored.'+br)
  
      b=groupCharsBy(b,3,3,nsp)
    //b=b.substring(0,b.length-3) // cut last 3 chars
  return b
}// --------------------------------------
function groupCharsBy(n,by_m,after_p,ch){
  if(undef(n)){
    log('groupCharsBy(): undef. n (n,by_m,after_p,ch)='+br
       +[n,by_m,after_p,ch]+br)
    return 0
  }
  var l=n.toString().length
  var m=''; var j=0; // s=''
  for (i=l; i>=1; i--) {j++;
    m=n.charAt(i-1)+m
    if(j<l && j>after_p && divisible(j,by_m)) {m=ch+m;} //  s+=j+' '
  }
  return m//   +'(lng:'+l+' by:'+by_m+')'+s
}// -------------------------------------------------
function hex8Vol(ni){
  n=ni; maxn=4294967295/*ffff-ffff*/;
  var nh,nhex,l,m,i,h=['0','0','0','0'   ,'0','0','0','0']
  if      (n<0)    {n=maxn+n+1}
//else if (n>maxn) {}// cut only last 8 hex digits       !?
  nh=n.toString(16).toUpperCase()
  l=nh.length; m=8-l
  for (i=m+1; i<=8; i++) h[i-1]=nh.charAt(i-m-1) // align to right 8 pos
  nh=''; for (i=1; i<=8; i++) {nh+=h[i-1]}
  nhex=groupCharsBy(nh,4,1,'-')
  return nhex
}// -------------------------------------------------
function divisible(n,by_m){ // for count every by_m
  var k=Math.floor(n/by_m) // integer closest to and not greater than arg
  if (n==k*by_m) {return true} else {return false}
}// -------------------------------------------------
load_end()