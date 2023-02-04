"Sequencer": This is .hta local single web page apl. to make/get/save sequence values like array [b#a,...] to/from *.csv, make barcode by calling ZINT, make place order to *.csv for indesign *.pdf and save all job par's o *.job .
-------------------

## SEQ: sequence values generator 
 - local single web page apl
 
### 1. Purpose & Functionality:
 a) @"make" ordered sequences values from seq. parameters
 b) @"get" ord/unordered seq. values from .csv file 
 *) @autofill row with empty val to end of col
 
 c) @"save" ready seq. values to 2 types of .csv files
    - only values in simple .csv without header 
    - multi-column .csv with header to merge fields (in Indesign) with values/barcodes to personalize print production
	  
 d) @"save-job" (seq. & job par's, values of unord-seq.) to .seq-job file
    @"load-jobs" all saved .seq-job as jobs-lib, to copy its par's & val's  
	  
 e) barcodes producing: eps>pdf | svg>pdf ?
    - @"val>eps" call Zint to make barcodes as '.eps' from simple '.csv'  
    - @"eps>ps"  make .ps with refined eps content: rgb>grayscale,font-name replace
    - @"ps>pdf"  make .pdf to faster import in Indesign (eps/ps is 10 times slover)
	  -- @Acrodistiller is fastest but make big files in A4
	     ? not automated yet! 
	  -- @SumatraPDF is better & free (auto crop to data size, smaller file size)
	     ! uses GS:  'C:\Program Files\gs\gs9.55.0\bin\gswin64c.exe'
	     ? not automated yet! 
	  -- @combine all produced .pdf's in one file with Acrobat XI is fast 
	     -- ? crop all
		 -- ? merge from combined: A19H#.pdf:pg# 
		 
### 2. Interface
 -- help & user-interface language: bg/en
 -- color themes: dark, color modifier 
 -- @"seq state" -> total -> append
 -- ? @tables with div/span
  
### 3. Environment & Technology:
 -- file encoding: utf-8
 -- os: tested on windows-[xp..X]
 -- engines: msHTA/ie-(7..11) ,chrome ,firefox with 'ietab' plugin
    - must enable JavaScript and ActiveX to make files i/o and run cmd shell
 -- depend of freeware 'Zint barcode studio' to make barcodes (see zint manual):
    - need to download: <a href="http://www.sourceforge.net/projects/zint/files/zint/2.6.3/zint-2.6.3-win32rc2.zip">Zint</a>
 -- depend of acrobat-distiller/sumatrapdf - for convert .ps/.eps to .pdf
 -- manual install Anastasia.ttf
 -- Html ,css ,js: standard html GUI, no external libraries, IE-(7..11) js 1.5 dialect
 -- ActiveX: OS environment access, run batch, file system i/o - save/read data as *.csv
    * (ActiveXObject(): "Scripting.FileSystemObject","WScript.Network","WScript.Shell")

### 4. Batch actions (from 'src folder' seq):
 -- 'setup.cmd' -
    - check & make tree structure (where @ is %homedrive% usually c:)
      '@\$desk\#seq-jobs\'    - 'seq-%user%.log'
      '@\$desk\#seq-jobs\eps' - '*.eps-list.csv', -> (Zint) -> '*.eps'-> (refine) -> '*.ps'
      '@\$desk\#seq-jobs\ps'  - '*.eps'-> (refine) -> '*.ps'
      -- call 0.set-dirs.cmd        -- default
      -- call 0.set-dirs-%user%.cmd -- user profile - manual edit
      -- call 1.chk-dirs.cmd
    - make 'seq-usr.js' in src folder
      '..\$desk\#seq-jobs\pdf' - '*.ps'-> (distill) -> '*.pdf' & combine to one file to place with Indesign
 -- 'csv2eps.cmd bt bn bf'     - run Zint to produce *.eps from '*.eps-list.csv'
 -- 'ps2pdf.cmd'               - ?
