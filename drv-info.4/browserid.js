load+='browserID '
function browserID(){ brw='??'; os='???'
var brAgent=navigator.userAgent.toLowerCase();
// ? gecko mozilla
  if(brAgent.indexOf('netscape' )>-1) brw='NS';
  if(brAgent.indexOf('msie'     )>-1) brw='IE';// or netscape as ie
  if(brAgent.indexOf('seamonkey')>-1) brw='SM';
  if(brAgent.indexOf('firefox'  )>-1) brw='FF';//firefox & k-meleon
  if(brAgent.indexOf('opera'    )>-1) brw='OP';
  if(brAgent.indexOf('safari'   )>-1) brw='SF';
  if(brAgent.indexOf('konqueror')>-1) brw='KQ';
//if(brAgent.indexOf('konqueror')>-1) brw='KM';

  if(brAgent.indexOf("mac"      )>-1) os='Mac';
  if(brAgent.indexOf("sunos"    )>-1) os='Sun';
  if(brAgent.indexOf('win'      )>-1) os='Win';
  if(brAgent.indexOf('bsd'      )>-1) os='BSD';
// ---
  return brw
}// --------------------------------------------------
