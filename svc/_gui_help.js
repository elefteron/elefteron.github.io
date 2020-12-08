load_new('scr/_gui_help.js');
/* ах, чудна българска земьо, полюшвай цъфтящи жита! */
  svc_sch='svc-scheme-3.svg'// 'stb-scheme.svg'
  bg=0; en=1; // dict=['bg','en'] - tolang=en;
  {help_tech=[]; help_bcn=[]; help_csv_gen=[]; help_eps_gen=[]; help_ind_mrg=[]; par_desc=[];  
   help_tech[bg]  =['<b>схема на потока данни</b>'
    ,'<img style="background-color:#999999; align-content: center; height:320px" src="'+svc_sch+'">'
,'',"## SVC - \"колектор на серии стойности в .csv и извикване на Zint да направи .eps баркодове\" е уеб приложение единична страница"
,""
,"### Предназначение: "
," - прави серия стойности, събира ги в колекция"
," - прави .csv от серия стойности за да генерира баркодове като '.eps' файлове"
," - прави .csv от серия стойности със заглавка за да слее баркодове или/и стойности в Indesign публикация "
,"   - така можем да направим персонализация на печатна продикция"
,""
,"### 1. Оборудване:"
,"  * оп.система: windows xp,vista,7"
,"  * среда: msHTA/ie-8,9/chrome,firefox ietab прил."
,"    - разрешете JavaScript и ActiveX за да правите файлов вх/изх и да стартирате команди"
,"  * зависи: от безплатния 'Zint barcode studio' за да генерира баркодове (виж 'zint_manual_*.pdf'):"
,"    - изтегли локално: <a href='http://www.sourceforge.net/projects/zint/files/zint/2.6.3/zint-2.6.3-win32rc2.zip'>Zint</a>"
,""
,"### 2. Конфигурация"
,"  * версия: SVC v9.0"
,"  * език на диалога: en/bg"
,"  * файлова кодировка: utf-8"
,"  * задаване на група от серии стойности: '_pers.js' ръчно редактиране засега"
,""
,"### 3. Технология:"
,"  * Html,css,js: стандартен html GUI, няма вуншни библиотеки, IE-8/9 js диалект"
,"  * ActiveX: достъп до оборудването на оп.с-сма, стартиране на скриптови командни файлове batch, файлова с-сма за вх/изх - запис/четене на данни в/от *.csv"
,"   (ActiveXObject(): 'Scripting.FileSystemObject','WScript.Network','WScript.Shell')"
,""
,"### 4. Действия на скриптови командни файлове batch:"
,"  * 'svc-init.bat' прави "
,"    - '$svc.usr'"
,"    - структура папки 'c:\\users\\%user%\\Desktop\\#pers\\#data' със '$svc_%user%.log'"
,"  * '#eps-make.bat' стартира Zint, прави *.eps файлове"
  ]
   help_tech[en]  =['<b>Dataflow scheme</b>'
    ,'<img style="background-color:#999999; align-content: center; height:320px" src="'+svc_sch+'">'
,'',"## SVC - \"seria values collect to .csv and run Zint to make .eps barcodes\" is a single web page app."
,""
,"### Purpose: "
," - make seria values and colect it"
," - create .csv of seria values to generate barcodes as '.eps' files"
," - create .csv of seria values with header to merge barcodes and/or values in Indesign publication "
,"   - by this way we can produce personalization of print production"
,""
,"### 1. Environment:"
,"  * os: windows xp,vista,7"
,"  * engine: msHTA/ie-8,9/chrome,firefox ietab app."
,"    - enable JavaScript and ActiveX to make files i/o and run cmd"
,"  * depend: of freeware 'Zint barcode studio' to generate barcodes (see 'zint_manual_*.pdf'):"
,"    - download: <a href='http://www.sourceforge.net/projects/zint/files/zint/2.6.3/zint-2.6.3-win32rc2.zip'>Zint</a>"
,""
,"### 2. Configuration"
,"  * version: SVC v9.0"
,"  * ui languages: en/bg"
,"  * file encoding: utf-8"
,"  * group of serias config: '_pers.js' manually edit yet"
,""
,"### 3. Technology:"
,"  * Html,css,js: standard html GUI, no external libraries, IE-8/9 js dialect"
,"  * ActiveX: OS environment access, run batch, file system i/o - save/read data as *.csv"
,"   (ActiveXObject(): 'Scripting.FileSystemObject','WScript.Network','WScript.Shell')"
,""
,"### 4. Batch actions:"
,"  * 'svc-init.bat' produce "
,"    - '$svc.usr'"
,"    - tree structure 'c:\\users\\%user%\\Desktop\\#pers\\#data' with '$svc_%user%.log'"
,"  * '#eps-make.bat' run Zint, produce *.eps files"
  ]
  }
  {help_bcn[bg]   =['<b>Seria Values Collect & barcodes</b>'
    ,'Прави серия (подредени стойности) в таблица и съответните им баркодове '
	,''//,'<b>Последователност на действията</b>'
    ,'1. Прави серия стойности по зададени начално число, брой стойности и текстов низ преди и след числото'
	,''
	,'2. Импортира серия стойности от файл .csv (допечатка, клиентски данни), задаване на order#'
	,''
	,'3. Записва направена/импортирана серия стойности за баркодове:'
	,'.. файл: order#_(barcode-name).zint.csv (всички стойности в една колона без заглавие)'
	,''
	,'4. Прави баркодове: ZINT.exe взима списъка стойности от #.zint.csv и прави *.eps файлове'
	,'.. Прецизира готовите *.eps: Заменя шрифт и Преобразува цветността от RGB в Gray' // - ключ cmyk в zint
//  fnd_=["/Helvetica findfont", "0.00 0.00 0.00 setrgbcolor", "1.00 1.00 1.00 setrgbcolor"]
//  rep_=["/Arial findfont",     "0 setgray",                  "100 setgray"]
    ,''
    ,'5. Записва направена/импортирана серия стойности за Indesign:'
	,'.. order#.indd.csv (в колони, заглавен ред и .eps в края на всяка стойност)' 
	,'.. това e таблица за съответствие на всеки *.eps с поле в Indesin'
	,'.. тук # e номер на поръчка (order) в името на таблицата '
	,'.. при частична допечатка ползваме направените вече баркодове (*.eps) с друга таблица.'
	,'.. колоните (K) съответстват на елементите в страница, а редовете (R) на страниците. '
	,'.. целта е стойностите във всяка колона да са последователни - cut&stack'
	,''
	,'6. Събира серии в колекция (новата серия се добавя отдясно):'
	,'.. броят стойности трябва да е еднакъв или се допълва по-късата серия '
	,'.. задава се брой колони - К, на които се разделя всяка серия в колекцията'
	,'.. колоните (K) съответстват на елементите в страница, а редовете (R) на страниците '
	,'.. името на колона в hdr е "@seria-order#_seria-kol_#" - напр: @197106.1_kol_7'
	,'.. @ в името на колона означава, че стойностите в тази колона са файлове (напр: A19E07001.eps)'
	,''
	,'7. Персонализация в Indesign с направената таблица (стойности и/или баркод файлове)'
	,''
  ]
  help_bcn[en]=['']
  }
  {help_csv_gen[bg]=['<b>Генериране на серия в .csv таблица:</b>'
   ,''
   ,'пример: pr=A19H sc= dg=5 fr=2001 to=4000 К=4 bcn=20 id="193408_4 Technopolis_karti_200lv"'
   ,'...ще генерира файл: 193408_4.indd.csv'
   ,'<u>@file_1,@file_2,@file_3,@file_4        </u>'
   ,'<u>A19H02001.eps,A19H02501.eps,A19H03001.eps,A19H03501.eps</u>'
   ,'<u>A19H02002.eps,A19H02502.eps,A19H03002.eps,A19H03502.eps</u>'
   ,'<u>A19H02003.eps,A19H02503.eps,A19H03003.eps,A19H03503.eps</u>'
   ,'...'
   ,'<u>A19F02500.eps,A19F03000.eps,A19F03500.eps,A19F04000.eps</u>'
   ,''
   ,'<b>*. Алтернативно генериране на .csv таблицата с OpenOffice:</b>'
   ,'<b>+</b> Приготвяме първия ред с началните стойности на колоните и влачим няколко колони едновременно до броя редове '
   +' -  Препоръчва се ползването на OpenOffice, защото в него може да контролира разчитането/извеждането на "," при import/export '
   +', в Excell не може да се увеличават (с влачене) стойностите на няколко колони едновременно, символът @ e проблем.'
   ,'<b>+</b> Добавя се заглавие (header) с имена на колоните: @file_1,... и се експортира в .csv файл'
   ,'<b>+</b> Добавя се .eps след всяко име на баркод чрез текстов редактор.'
   ,' '
   ,'* проверете поредността на генерираните стойности и ги запишете в .csv файл'
//,'* стойностите може да се генерират в 1 колона и без име на колона (без DataMerge) в първата стр. в Indesign'
   ,''
   ,'* заради запълването чрез DataMerge в Indesign се добавят имена на колоните (първи ред е с имена на колоните - header), ако стойностите в дадена колона са имена на файлове, името на колона в header започва с @ '
  ]
  help_csv_gen[en]=['']
  }
  {help_eps_gen[bg]=['<b>Алтернативно генериране на баркодове със ZINT.exe в отделна папка</b> (с таблицата!)',''
      ,'<b>!</b> При ръчно пускане на Zint Настройките в интерфейса са:<u>(пример за тип Code 128)</u>'
      ,'* стартира се qtZint.exe <u>download:<a href="http://www.sourceforge.net/projects/zint/files/zint/2.6.3/zint-2.6.3-win32rc2.zip" target="_blank" title="http://www.sourceforge.net/projects/zint/files/zint/2.6.3/zint-2.6.3-win32rc2.zip"> Zint barcode studio 2.6</a></u>'  
      ,'.. в General/Symbology: Code 128 (ISO 15417)'
      ,'.. в Code 128: Standard'
      ,'.. в General/Data to Encode: 123 -> '
      ,'..... start value: 1, end value: 4000, increment by: 1, format: A19F$$$$$'
      ,'..... Sequence: create бутон - показва последователните стойности за баркодовете  в една колона'
      ,'..... Generate bar codes: export бутон '
      ,'........ destination path: <u>"C:/Users/***/Desktop/#pers/#pers-data"</u> (ползвайте локален път за по-бърза работа)'
      ,'........ File Name Prefix: (празно)'
      ,'........ File Name: Same as Data'
      ,'........ File Format: (*.eps)'
      ,'........ ок бутон - създава по един файл за всеки баркод!'
      ,'<br/>Zint symbology table<table>'
	  +row(col("номер")    +col("баркод име"                                  ),'' )
      +row(col(" 1")       +col("Code 11"                                     ),'' )
      +row(col(" 2")       +col("Standard Code 2 of 5"                        ),'' )
      +row(col(" 3")       +col("Interleaved 2 of 5"                          ),'' )
      +row(col(" 4")       +col("Code 2 of 5 IATA"                            ),'' )
      +row(col(" 6")       +col("Code 2 of 5 Data Logic"                      ),'' )
      +row(col(" 7")       +col("Code 2 of 5 Industrial"                      ),'' )
      +row(col(" 8")       +col("Code 3 of 9 (Code 39)"                       ),'' )
      +row(col(" 9")       +col("Extended Code 3 of 9 (Code 39+)"             ),'' )
      +row(col("<u>13</u>")+col("<u>EAN (Including EAN-8 and EAN-13)</u>"     ),'' )
      +row(col("14")       +col("EAN + Check Digit"                           ),'' )
      +row(col("16")       +col("GS1-128 (UCC.EAN-128)"                       ),'' )
      +row(col("18")       +col("Codabar"                                     ),'' )
      +row(col("<u>20</u>")+col("<u>Code 128 (automatic subset switching)</u>"),'' )
      +row(col(" 58")      +col("QR Code"                                     ),'' )
      +row(col(" 60")      +col("Code 128 (Subset B)"                         ),'' )
      +row(col(" 69")      +col("ISBN (EAN-13 with verification stage)"       ),'' )
      +row(col(" 71")      +col("Data Matrix (ECC200)"                        ),'' )
      +row(col(" 72")      +col("EAN-14"                                      ),'' )
      +row(col("128")      +col("Aztec Runes"                                 ),'' )
      +row(col("129")      +col("Code 32"                                     ),'' )
      +row(col("142")      +col("Grid Matrix"	                              ),'' )
      +'</table>'
  ]
  help_eps_gen[en]=['']
  }
  {help_ind_mrg[bg]=['<b>Персонализация в Indesign с генерираните стойности в таблица и съответните им баркодове</b>'
	,''
	,'-- създаваме (свързани*) карета в MasterPage и избираме таблица за съответствие чрез DataMerge/SelectDataSource' //свързани - кога
	,''
  	,'-- запълваме чрез DataMerge полетата с подредените баркодове според имената на колоните им в .csv файла'
	,'-- За всяка колона от .csv избираме поредното каре и кликаме върху полето в палетата DataMerge'
	,'-- напр: за полетата от колона <u>@file_1</u> карето ще се запълни с <u>«file_1»</u>'
	,'-- символът @ в името на колона (*.csv) указва, че стойностите в колоната са файлове,'
	,'-- а *.eps файловете и *.indd.csv са в една папка'
    ,'-- (ако ползваме копие на стар файл новата таблица трябва да се замени в links със relink,'
    +' например при частична допечатка ползваме друга таблица) '
	,''
	,'-- записваме цялата персонализация от генериращия файл  в нов файл *.#pers.indd.'
    ,'-- от последния файл ---.#pers.indd с цялата персонализация генерираме *.pdf за печат '
	,'-- може едновременно да пуснем няколко процеса за генериране на pdf '
	,'-- background tasks показва прогресът им '//'(4 процеса едновременно, следващите чакат)'
	,''
	,'** за да не блокираме файловия мениджър (Explorer) с бавни файлови процеси стартираме Indesign и после зареждаме файл '
	,'-- разделяме файла за печат през 250 стр. за да не е твърде голям и ползваме по-къси имена' 
	,''
	,'*** Организация на файловете за персонализация: авт. се създава папка <u>#pers</u> на desktop :'
	,'папка<u>#data </u>: баркодовете (*.eps) заедно с таблиците (*.csv) за съответствие на баркод с колона и ред (стр)'
	,'папка<u>#data\\tmp </u>: баркодовете от Zint преди замяната на шрифта '
    ,'*** Работим локално и накрая качваме на сървъра папка #data с <u>архивирани баркодове</u>, генериращите файлове,'
	+'и генерираната персонализация '
    ,'* стартираме Indesign и после файла, защото иначе се стартира под Explorer и той ще стои блокиран до завършване на операцията DataMerge!'
  ]
  help_ind_mrg[en]=['']
  }
  var xbg=' style="background-color:#400000;"'
  {par_desc[bg]=[// tbl
	 tbl(row(col('<u>order</u>') +col('поръчка номер') )
	    +row(col('<u>id</u>')    +col('идентификатор - фирма_изделие_цена' ) )
	    +row(col('<u>bcn</u>')   +col('вида баркод в Zint,ако е > 0, стойностите са имена на файлове - @file_#' ) )
		
	    +row(col('<u>pr</u>    ',xbg)+col('предшестващ числото символен низ (напр.A19G)' ) )
	    +row(col('<u>sc</u>    ',xbg)+col('низ в края') )
	    +row(col('<u>dg</u>    ',xbg)+col('брой цифри в числото (с водещи нули), не по-малък от крайното число') )
        +row(col('<u>fr</u>    ',xbg)+col('начално число в серията') )
	    +row(col('<u>val</u>   ',xbg)+col('брой стойности в серията') )

	    +row(col('<u>K</u>     ')+col('брой колони в таблицата (в страницата)') )
	    +row(col('<u>R</u>     ')+col('брой редове (брой страници) <u>r=val/k</u>') )
        +row(col('<u>to</u>    ')+col('крайно число в серията') )
	 )];
     par_desc[en]=['']
     }

  function outhlp(h,tolang,flg){ var buf=''; // tolang: 0=bg, 1=en
    for (var i=0; i<=h[tolang].length-1; i++) buf+=h[tolang][i]+'<br/>';  
    if(flg=='+') hlp_.innerHTML+=buf; else hlp_.innerHTML=buf; 
}
/* todo: +=work, ~=partial_work -=miss, !=work_err, ?=how_todo

seria  imp: file,hdr,byK          [>imp]  [+col]
seria  out: [val] ,ord,id,bcn,k,r [>out: csv_bcn,csv_ind,make-barcode ]  
colect out: [+val],ord,id,bcn,k,r [>out: csv_ind]
--- 	
// + file "#pers.js": read all, copy pers[i] to crnt "csv par"
// + make barcode: eps (svg)

// + preview
// ~ import 
// + seria 
// ~ export pers

// + set-hdr: which kol is @file_# or val_#; and then append .eps after files, but not after values
// ? combine val and file in 2kol
// ? (x) repeat values column for same ticket 

// - init by activex, not batch
// - eps-make by activex, not batch

// - import csv (n column) / set csv par+make csv
// ? import values from .csv get by rows (r1 from all kols, then r2,...) or by kols (k1 from all rows, then k2,...)
// -- inp/out csv delimiters[',',';','\t']

// ? append data at bottom or right, save appended 

// -- inp_matrix for Rm rows by Km kols, but get by kols or by rows (4kol*3row to eof) -> ar[k*r]

// - seria values by step +/-n
 
// + Zint.exe --batch --mirror --filetype=eps --cmyk -b 20 -i zint-data.txt

// ? run as indesign script or load it
*/
/* todo:
=== mainstream work
=get seria
=todo pers->svc-proj-lib in json
=todo collect dif serias in one table

--- etc
-?ind.csv(ff)
-autocheck for all main functions
-todo expand/colate flag > to ^ to >
-todo make/check md5

-xp: set_val():: id:xfil innerHTML: (No-barcode_00000)!=(No-barcode_00000) 
-xp: ... eps repl: open inp:C:\$desk\#pers\#data\tmp\A19E00001.eps event:"Error: File not found" may be not created
*/
load_end();