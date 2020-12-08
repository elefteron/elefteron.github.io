/**-/ 
if(_iex){
// HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Fonts
// "Consolas (TrueType)"="C:\\fnt\\~console-monosp\\Consolas.ttf"

// Abbrev.		Root key Name  
// HKCU			HKEY_CURRENT_USER  
// HKLM			HKEY_LOCAL_MACHINE  
// HKCR			HKEY_CLASSES_ROOT  
// HKEY_USERS 	HKEY_USERS 
// HKEY_CURRENT_CONFIG 	HKEY_CURRENT_CONFIG 
//
// Type 			Description 			In the Form of 
// REG_SZ 			A string 				A string 
// REG_DWORD 		A number 				An integer 
// REG_BINARY 		A binary value 			A VBArray of integers 
// REG_EXPAND_SZ 	An expandable string	A string 
//  				(e.g., "%windir%\\calc.exe") 
// REG_MULTI_SZ 	An array of strings 	A VBArray of strings 

//  var WshShell = WScript.CreateObject ("WScript.Shell");
    var WshShell = new ActiveXObject("WScript.Shell");
/// WSHShell.RegWrite(Root + key + valname, value, "REG_SZ");
/// "REG_BINARY"|"REG_SZ"| "REG_DWORD"
/// sregval = WSHShell.RegRead (Root + key + valname);
/// WSHShell.RegDelete(Root + key + valname);
var regroot =  "HKEY_LOCAL_MACHINE"
var regkey  = "\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts\\"
var valname ="Consolas (TrueType)"
// value=WshShell.RegRead(regroot+regkey+valname);// ="C:\\fnt\\~console-monosp\\Consolas.ttf"
// value=WshShell.RegRead(regroot+regkey);// ""= ""
   value=WshShell.RegRead(regroot+regkey);// "*" = unable to open
alert(value)
}
/**/ 