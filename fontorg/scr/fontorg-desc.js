load_new('scr/fontorg-desc.js')
// utf-16
   oldbg ='\u0460\u0461\u0462\u0463\u0464\u0465\u0466\u0467'   
         +'\u0468\u0469\u046A\u046B\u046C\u046D\u046E\u046F' 
         +'\u0470\u0471\u0472\u0473\u0474\u0475\u0476\u0477'
         +'\u0478\u0479\u047A\u047B\u047C\u047D\u047E\u047F\u0480\u0481'

desc=[
 '<span class="h2">��� FontOrg ������� .afs � ������� �������� � .rtf/.htm ������� �� �������/���������/���������.</span>'
,'� ������������ �� ���������� �� ����� �� AdobeTypeManager(ATM) ���� ������� � .afs ����.'
,'� HTM ��������� ������� ������ ���������� �� afs � ������� ������� �� ������, ������, ��������, ������ � ����������. ��� ��� ������������ ������ ����� ���������, ������ �� ������� �� ������ ��������.'
,'� RTF ��������� ������� ������ �������� � ����-��������� ��������� �� set-���, ���  ��������� �� ������, ������, ������ � ����������.'
,'� �������� ������ �� ��������� ��� ��������� ����� PostScript/TrueType/Windows.' 
,'� ��� ���� ����� ��������� � afs ��� �� ���� �������� �� ��������� � ������� � ��������,'
+'  ���������� ���� � ������� � ������� � ���� ����������.'
,'� ��������� rtf/htm ������� ����� �� ���������� ���� ��� �� ������� � �������.'
,' �� �� � ��������� �� �����, ����� � ����� ��������, ��������� ������ �� � pdf!'
,'� �� �� ��������� PDF �������, ����������� ����� �� ����������� rtf/htm �������� � Indesign, QuarkXpress, PageMaker, Word, Write � ������������ pdf.,'
,''
,'<span class="h1">��� � ���������� (rtf/htm/pdf) ����� �� �� �������� ��������� �� ����� ����� ����� ����� ��� ��������</span>'
+', �� �� �������/������� ����������� �� ��������.'
,'� ������ HTM �������� �� Fontorg ������� ���� ������ ���� fontorg-def.js,'
,' ����� �������� ��������� �� ��������� � ������������ TESThtmwin,TESThtmmac,TESTrtfwin,TESTrtfmac: '
,'� ������ �� �������� ����� �� ����� ����� � ��������:<span class="h3">'
,'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz '
,'�������������������������������� �������������������������������� '
,'�\u00c0\u00e0 �\u00c8\u00e8 �\u040d\u045d �\u00d2\u00f2 �\u00dd\u00fd \u0404\u0454 \u0401\u0451 '
+'������������������� '
,'\u0460\u0461\u0462\u0463\u0464\u0465\u0466\u0467'   
         +'\u0468\u0469\u046A\u046B\u046C\u046D\u046E\u046F' 
         +'\u0470\u0471\u0472\u0473\u0474\u0475\u0476\u0477'
         +'\u0478\u0479\u047A\u047B\u047C\u047D\u047E\u047F\u0480\u0481'
,'����� ��������-�� ���0123456789\'";,. `~!@#$%^&-_=+[]{}()<>'
,'</span>'
,'<span class="h1">��� �������� ��������:</span>'
,'� ��� ����� ����� �� �������� �� � ���������� ��� �� � ��������, ���� �� ����� �������� � ���������� �� ��������'
+' ��� � �������������� �� ����� �������� � ����������� ��������. '
,'� ��������� ������� ���������������� ������� � �������� � ?, � ������� ��� � ������� ���� �����, ��� ������� ����������!!! '
,'  ������� � ��������� � � .rtf.'
,''
,'<span class="h1">��� ���������:</span>'
,'� ������ ������ �� ���������� ��������� ������������� �� ��������� (C:/f�nts/serif-oval\).'
,'� �������� ��������� ������������ ������� �������� ������ �������� �� Windows'
,'� � ��������� �� ��������, ������� �� ATM, ����������/������� ���� ���������.'
,'� ���� �������, ������������ �� ��������� ����� �� �������� '
+' � ���� ������(!) �������� �������, ���� ������� �� htm/rtf ������� '
+' ��� � �������� �� �������� ATM/X-fonter/CharMap/FontNav '
,''
,'<span class="h2">��� ������������ �� �������� � ������� �����</span> (�� �� ������ �� ������������� � ���� ��������!)'
,'� ��������� �� [���-��������(�����/�����/...), �������,�������/������ �����, ��������]' 
,'� ����� � ������� �� �� � ���� �����, ����� �� �������, ����� �� �������, ���� � �� set-�����:'
,'- ������� ��������� (���-������ � �������� � ����� �� �������): <span class="h3">'
,' decor-caligr,decor-hand, decor-gothic, decor-min, decor-max, decor-slav'
,' serif-not, serif-courier, serif-hid�n, serif-oval, serif-sharp'
,' monosp, pics, symbol, win-sys, asian, hebrew, arab</span>'
// dc,dh,dg,dm,dx,ds,sn,sc,sh,ss,mo,pi,sy,ws,as
,'� ������������� ������������ �� ��������� .ttf/.otf ��� ������� �������� ����� ������ �� ����������� (FontRenamer,free,neuber.com).'
,'� ����� �� ������� ����� � �������e�� � �������� �� ������������� �� �����,���� �� ������� ����������� ������ �� ������ �������� '// ? ��������
,'� ��� ���������� �� �������� � �������� �����, �������� �� ������'
// ?��� ��������� ���� ������ ��� �����.'
,''
,'<span class="h1">��� ������������ �� �������� � ATM:</span>'
,'� �������� ������e � ATM sets ��� ������ ���.(ATM �������� �� � ���������� ���������, �� � ���� ���� �� ���������.)'
+'� �� �� ������ "Add without copy" �� �� �� �� �������� �������� � ����� �����!!! '
,'� ������ ���� � ATM ����������� ���������� �� ���������� �� ���������� � ������� ���� - .afs'
,''
,'<span class="h1">��� ������� �������:</span>'
,'� .AFS --- (pc):<span class="h3">'
,'%!BeginSet Cyr'
,'PS=AcademyNormal,TYPE=PS,WNAM=Academy,WFIL=ACN_____.PFM'
,'PS=AGOptCyrillicBold-Italic,TYPE=TT,STYL=BOLDITALIC,WNAM=AGOptCyrillic,, Bold-Italic,WFIL=AGOPT-BI.TTF'
,'PS=AmbassadoreType,TYPE=TT,WNAM=AmbassadoreType,WFIL=AMBASSAD.TTF'
,'%!EndSet'
,'</span>'
,'� .RTF --- (pc):<span class="h3">'  // for js: \ -> \\
,'{\\rtf1\\ansi\\ansicpg1251\\deff0'
,'{\\fonttbl'
,'{\\f0\fnil Arial;}'
,'{\\f1\fnil Aardvark;}'
,'}'
,'\\ulnone\\fs24'
,'\\f0\\b0\\i0 1234567890\\tab ArialCyr\\tab\\f0 ABCD,\\b abcd,\\i \\fs32 ����,�����.\\fs24\\par'
,'\\f0\\b0\\i0 1234567890\\tab Aardvark\\tab\\f1 ABCD,abcd,�����,�����.\\par'
,'} '
,'</span>'
]
todo=['hide/show sets,show error list, color sets by css, get Path list, paths count in set statistis, errors # per set + errlist links,'
     ,' fontfiles as links with full path, "type-charset": symbol-ascii, serif-lat+cyr'
	 ,'������ �� ��������� ��� ��� ����� �� ����������� �� *.ini ����'
     ,'��������� �� ������������ �������� �� ������� � ��������'
	 ,'������������/������� �� ������� �����/�������/�������� � ���� ��� ��� �����' 
	 ,'������ �� win.ini, atm.ini, fobefntlst �������, registry part'
	 ,'fontname change:!? - �������� �� ������� � ��������� �� �������� �� Indesign, QuarkXpress,... ��� �� �������� ����'
]
/**-/
 rtf->pc-Quark->.xtg->macQuark
FO input.afs [win.ini] [atm.ini] [reg_part]  - input files
{ /RTF |/HTML/Both} - output format 
/msg  - output with messages
/CYR={/short|/long|"..."} - test string for CYRillic set
/LAT={/short|/long|"..."} - test string for LATin set
/sets - separate output for every set
*/
/**-/
5.0	fonts subst: - ������� "Arial Cyr" �� ������ "Arial" �� ��������
5.1	win98: Win.ini 
		[FontSubstitutes]
		Arial Cyr,204=Arial,204
		
5.2 winxp/registry
Windows Registry Editor Version 5.00
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\FontSubstitutes]
"[cyr]Arial,204"="Arial,204"

6.0 fonts/registry
6.1	win98/Registry 4:
	[HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Fonts]
	"Arial (TrueType)"="D:\\Fonts\\ARIAL.TTF"

	[HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\PostScriptFonts]
	"Erika-Normal (Type 1)"="M0:HSERIKA_.PFM|B0:HSERIKA_.PFB"

	[HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Fonts Folder\Bad Fonts]
	"C:\\Fonts\\win\\outlook.ttf"=dword:00000057
	
6.1	win98/Registry 5:
Windows Registry Editor Version 5.00
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Fonts]
"Arial (TrueType)"="C:\\fnt\\serif-not\\Arial 2008\\Arial.ttf"
"Consolas (TrueType)"="C:\\fnt\\~console-monosp\\Consolas.ttf"
"LetterGothicStd (OpenType)"="C:\\fnt\\~console-monosp\\LetterGothicStd.otf"

*/
load_end()