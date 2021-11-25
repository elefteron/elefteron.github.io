## seria values collector SVC 8e (epidemy)

### purpose:
 - SVC 8e is a single web page apl. with purpose to generate seria values and colect it in .csv
 - create .csv of seria values to generate barcodes as '.eps' files by Zint
 - create .csv of seria values with header to merge barcodes and/or values in Indesign publication
   - by this way we can produce personalization of print production

### 1. Environment dependencies:
  * os: windows-(xp,vista,7)
  * engines: msHTA/ie-(7..11) ,chrome ,firefox with 'ietab' plugin
    - must enable JavaScript and ActiveX to make files i/o and run cmd shell
  * depend of freeware 'Zint barcode studio' to generate barcodes (see 'zint_manual_*.pdf'):
    - must download: <a href="http://www.sourceforge.net/projects/zint/files/zint/2.6.3/zint-2.6.3-win32rc2.zip">Zint</a>
  * manual install Anastasia.ttf

### 2. Configuration & UI
  * ui languages: en/bg
  * file encoding: utf-8
  * group of serias config: '_pers.js' manually edit yet

### 3. Technology:
  * Html ,css ,js: standard html GUI, no external libraries, IE-(7..11) js dialect
  * ActiveX: OS environment access, run batch, file system i/o - save/read data as *.csv
   (ActiveXObject(): "Scripting.FileSystemObject","WScript.Network","WScript.Shell")

### 4. Batch actions (from src folder):
  * 'svc-init.bat': produce
    - make 'svc_usr.js' in src folder
    - check & make tree structure (where @ is %homedrive% usually c:)
      '@\$desk\#svc.jobs\'    - '$svc.%user%.log'
      '@\$desk\#svc.jobs\eps' - '*.eps-list.csv', -> (Zint) -> '*.eps'-> (refine) -> '*.ps'
      '@\$desk\#svc.jobs\pdf' - '*.pdf-list.csv', '*.pdf' to place with (Indesign) 
  * - 'svc-eps-make.bat bt bn bf'run Zint to produce *.eps, 3 input par`s 

### 5. Todo:
  * help bg upd
  * tables with div/span
  * seria-lib: 'saved seria param' menu as .json, edit, read/save file (old '_pers.js')
  * ui-groups: seria+kols, barcode[], printjob with seria, (fr-to-step), make seria state
  * eps2pdf!!!
  * refine params: grayscale/cmyk/rgb+clr,font ArialMT!!!

  * file '$svc.usr' not in run folder but in '@\$desk\#svc.jobs\'?
  * english help
  * serias collection: import ,append ,export 
  
