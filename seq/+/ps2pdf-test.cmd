@echo on
:: inpdir: ..\ps  outdir: ..\pdf
   cd /d C:\$desk\$seq-jobs
   goto gs
   
:MiKTeX
:: ok, but in A4
   set conv="C:\Program Files\MiKTeX\miktex\bin\x64\ps2pdf.exe"
   %conv% ps\A19H02002.ps pdf\A19H02002.pdf   
   goto end
   
:Sumatra
:: run gswin64c.exe, open,show,log-err, manual save
   set conv="F:\$prog.run\SumatraPDF-3.4.2-64.exe"
   call %conv% ps\A19H02003.ps ?: pdf\*.pdf>A19H02003.log
   goto end
   
:gswin
:: open,show, save?
   set conv="C:\Program Files\gs\gs9.55.0\bin\gswin64c.exe"
   %conv% ps\A19H02004.ps -sOutputFile=A19H02004-gswin.pdf
   goto end
   
:gs
:: ok, but a4 - crop all?
:: LIBDIR=C:\Program Files\gs\gs9.55.0\lib\
   set GSC="C:\Program Files\gs\gs9.55.0\bin\gswin64c.exe"
   set conv="C:\Program Files\gs\gs9.55.0\lib\ps2pdf.bat"
   %conv% ps\A19H02005.ps pdf\A19H02004.pdf
   goto end
   
:end
pause
