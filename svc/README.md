## seria values collector SVC v9.0

### purpose: 
 - SVC v9.0 is a single web page apl. to generate seria values and colect it to .csv
 - create .csv of seria values to generate barcodes as '.eps' files by Zint
 - create .csv of seria values with header to merge barcodes and/or values in Indesign publication 
   - by this way we can produce personalization of print production

### 1. Environment:
  * os: windows xp,vista,7
  * engine: msHTA/ie-8,9/chrome,firefox with 'ietab' plugin
    - enable JavaScript and ActiveX to make files i/o and run cmd
  * depend: of freeware 'Zint barcode studio' to generate barcodes (see 'zint_manual_*.pdf'):
    - download: <a href="http://www.sourceforge.net/projects/zint/files/zint/2.6.3/zint-2.6.3-win32rc2.zip">Zint</a>
    
### 2. Configuration
  * ui languages: en/bg
  * file encoding: utf-8
  * group of serias config: '_pers.js' manually edit yet
  
### 3. Technology:
  * Html,css,js: standard html GUI, no external libraries, IE-8/9 js dialect
  * ActiveX: OS environment access, run batch, file system i/o - save/read data as *.csv
   (ActiveXObject(): "Scripting.FileSystemObject","WScript.Network","WScript.Shell")
   
### 4. Batch actions:
  * 'svc-init.bat' produce 
    - '$svc.usr'
    - tree structure 'c:\\users\\%user%\\Desktop\\#pers\\#data' with '$svc_%user%.log'
  * '#eps-make.bat' run Zint, produce *.eps files

### todo:
  
