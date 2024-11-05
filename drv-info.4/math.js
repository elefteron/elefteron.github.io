load+='math '
function b2mb(b){var mb   // round or fixed .2
   mb=(b/1024)/1024
// mb=Math.round(mb)
   mb=mb.toFixed(2)
   return mb
}// --------------------------------------
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
  k=Math.floor(n/by_m) // integer closest to and not greater than arg
  if (n==k*by_m) {return true} else {return false}
}// -------------------------------------------------
function groupCharsBy(n,by_m,after_p,ch){
  var l=n.length
  var m=''; var j=0; // s=''
  for (i=l; i>=1; i--) {j++;
    m=n.charAt(i-1)+m
    if(j<l && j>after_p && divisible(j,by_m)) {m=ch+m;} //  s+=j+' '
  }
  return m//   +'(lng:'+l+' by:'+by_m+')'+s
}// -------------------------------------------------
