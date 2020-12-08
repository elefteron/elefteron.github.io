load_new('scr/fontorg-desc.js')
// utf-16
   oldbg ='\u0460\u0461\u0462\u0463\u0464\u0465\u0466\u0467'   
         +'\u0468\u0469\u046A\u046B\u046C\u046D\u046E\u046F' 
         +'\u0470\u0471\u0472\u0473\u0474\u0475\u0476\u0477'
         +'\u0478\u0479\u047A\u047B\u047C\u047D\u047E\u047F\u0480\u0481'

desc=[
 '<span class="h2">••• FontOrg прочита .afs и създава каталози в .rtf/.htm формати за преглед/предпечат/сравнение.</span>'
,'• Информацията за шрифтовете се взима от AdobeTypeManager(ATM) след експорт в .afs файл.'
,'• HTM каталогът съдържа цялата информация от afs в отделни таблици за пътища, сетове, шрифтове, грешки и статистика. Той има навигационни връзки между таблиците, удобни за преглед на големи колекции.'
,'• RTF каталогът съдържа всички шрифтове с тест-символите групирани по set-ове, без  таблиците за пътища, сетове, грешки и статистика.'
,'• Възможни грешки са повторени или невалидни имена PostScript/TrueType/Windows.' 
,'• Ако един шрифт присъства в afs той ще бъде проверен за дублиране и изведен в каталога,'
+'  независимо дали е активен в момента и дали съществува.'
,'• Каталогът rtf/htm показва теста на шрифтовете само ако са активни в момента.'
,' За да е независим по време, място и набор шрифтове, каталогът трябва да е pdf!'
,'• За да направите PDF каталог, импортирате някой от създадените rtf/htm каталози в Indesign, QuarkXpress, PageMaker, Word, Write и експортирате pdf.,'
,''
,'<span class="h1">••• С каталозите (rtf/htm/pdf) могат да се проверят символите на всеки шрифт върху екран или принтери</span>'
+', да се направи/поправи групирането на шрифтове.'
,'• Всички HTM каталози на Fontorg ползват един външен файл fontorg-def.js,'
,' който дефинира символите за показване в променливите TESThtmwin,TESThtmmac,TESTrtfwin,TESTrtfmac: '
,'• Пример на извеждан текст за всеки шрифт в каталога:<span class="h3">'
,'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz '
,'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ абвгдежзийклмнопрстуфхцчшщъыьэюя '
,'А\u00c0\u00e0 Е\u00c8\u00e8 И\u040d\u045d О\u00d2\u00f2 У\u00dd\u00fd \u0404\u0454 \u0401\u0451 '
+'ЎўҐЃѓЌќЋћЏџђћЎўЉљЊњ '
,'\u0460\u0461\u0462\u0463\u0464\u0465\u0466\u0467'   
         +'\u0468\u0469\u046A\u046B\u046C\u046D\u046E\u046F' 
         +'\u0470\u0471\u0472\u0473\u0474\u0475\u0476\u0477'
         +'\u0478\u0479\u047A\u047B\u047C\u047D\u047E\u047F\u0480\u0481'
,'№§“”„ ‘’‚•°…†‰-–— ™©®0123456789\'";,. `~!@#$%^&-_=+[]{}()<>'
,'</span>'
,'<span class="h1">••• Възможни проблеми:</span>'
,'• Ако някой шрифт от каталога не е инсталиран или не е коректен, може да имате проблеми с наливането на каталога'
+' или с визуализацията на някои шрифтове в съответната програма. '
,'• Браузърът показва несъществуващите символи и шрифтове с ?, с квадрат или в някакъв друг шрифт, без никакво открояване!!! '
,'  Подобен е резултата и с .rtf.'
,''
,'<span class="h1">••• Препоръки:</span>'
,'• Късите пътища до шрифтовете намаляват натоварването на системата (C:/fоnts/serif-oval\).'
,'• Голямото количесто едновременно активни шрифтове забавя работата на Windows'
,'• С мениджъри на шрифтове, подобни на ATM, активирате/спирате цели множества.'
,'• След промени, проверявайте за дублирани имена на шрифтове '
+' и дали всички(!) шрифтове работят, чрез правене на htm/rtf каталог '
+' или с мениджър на шрифтове ATM/X-fonter/CharMap/FontNav '
,''
,'<span class="h2">••• Организиране на шрифтове в отделни папки</span> (не се отчита от предпечатните и офис програми!)'
,'• Групиране по [вид-употреба(сериф/декор/...), фамилия,символи/езиков набор, произход]' 
,'• Добре е групите да са с ясни имена, които се ползват, както за папките, така и за set-овете:'
,'- Смесено групиране (вид-подвид и употреба и вътре по фамилия): <span class="h3">'
,' decor-caligr,decor-hand, decor-gothic, decor-min, decor-max, decor-slav'
,' serif-not, serif-courier, serif-hidеn, serif-oval, serif-sharp'
,' monosp, pics, symbol, win-sys, asian, hebrew, arab</span>'
// dc,dh,dg,dm,dx,ds,sn,sc,sh,ss,mo,pi,sy,ws,as
,'• Предварително преименуване на файловете .ttf/.otf към техните шрифтови имена помага на групирането (FontRenamer,free,neuber.com).'
,'• Смяна на имената вътре в шрифтовeте с добавяне на идентификатор на група,може да направи групирането видимо за всички програми '// ? програма
,'• При повторение на шрифтове в различни групи, съберете ги заедно'
// ?или направете само връзки към шрифт.'
,''
,'<span class="h1">••• Организиране на шрифтове с ATM:</span>'
,'• Добавяте папкитe в ATM sets със същото име.(ATM сетовете са с дървовидна структура, но с едно ниво на вложеност.)'
+'• Да се включи "Add without copy" за да не се дублират шрифтове в друга папка!!! '
,'• Засега само с ATM извлечената информация за шрифтовете се експортира в текстов файл - .afs'
,''
,'<span class="h1">••• Файлови формати:</span>'
,'• .AFS --- (pc):<span class="h3">'
,'%!BeginSet Cyr'
,'PS=AcademyNormal,TYPE=PS,WNAM=Academy,WFIL=ACN_____.PFM'
,'PS=AGOptCyrillicBold-Italic,TYPE=TT,STYL=BOLDITALIC,WNAM=AGOptCyrillic,, Bold-Italic,WFIL=AGOPT-BI.TTF'
,'PS=AmbassadoreType,TYPE=TT,WNAM=AmbassadoreType,WFIL=AMBASSAD.TTF'
,'%!EndSet'
,'</span>'
,'• .RTF --- (pc):<span class="h3">'  // for js: \ -> \\
,'{\\rtf1\\ansi\\ansicpg1251\\deff0'
,'{\\fonttbl'
,'{\\f0\fnil Arial;}'
,'{\\f1\fnil Aardvark;}'
,'}'
,'\\ulnone\\fs24'
,'\\f0\\b0\\i0 1234567890\\tab ArialCyr\\tab\\f0 ABCD,\\b abcd,\\i \\fs32 БВГД,абвгд.\\fs24\\par'
,'\\f0\\b0\\i0 1234567890\\tab Aardvark\\tab\\f1 ABCD,abcd,АБВГД,абвгд.\\par'
,'} '
,'</span>'
]
todo=['hide/show sets,show error list, color sets by css, get Path list, paths count in set statistis, errors # per set + errlist links,'
     ,' fontfiles as links with full path, "type-charset": symbol-ascii, serif-lat+cyr'
	 ,'четене от командния ред или избор на параметрите от *.ini файл'
     ,'извличане на информацията директно от папките с шрифтове'
	 ,'преименуване/местене на избрани папки/файлове/шрифтове в друг сет или папка' 
	 ,'четене на win.ini, atm.ini, fobefntlst файлове, registry part'
	 ,'fontname change:!? - видимост на групите в списъците за шрифтове на Indesign, QuarkXpress,... или на системно ниво'
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
5.0	fonts subst: - синоним "Arial Cyr" на шрифта "Arial" за кирилица
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