@echo off
set  user=%USERNAME%
set start_all=%time%  
@echo ... 'csv2eps' user:%USERNAME% 
cd /d F:\$prog.run\seq
@echo cd=%cd%

set err=y
call 0.set-dirs-%user%.cmd
call 1.chk-dirs.cmd

if '%err%'=='y'  (
  echo ... stop to correct errors and run again
  @pause
  goto :EOF
)   
:: @echo ... csv2eps.cmd user:%USERNAME% crnt-dir:%cd%>>%log%
cd /d %jobs%\eps
:: @echo ... new crnt-dir:%cd%
:: @echo ... new crnt-dir:%cd%>>%log%
   @echo ... 'csv2eps' user:%USERNAME% crnt-dir:%cd%
   @echo ... 'csv2eps' user:%USERNAME% crnt-dir:%cd%>>%log%
   
rem --- 3 input par
:: bt=20 - code-128
set bt=%1
:: ft=eps
set ft=%2
set file=%3
:: must be "..\*.csv"

set msg=%0 %bt% %ft% %file%
echo ... src:%src%
echo ... src:%src%>>%log%
echo ... todo:%msg%
echo ... todo:%msg%>>%log%

set msg=
if '%bt%'==''       set msg=%msg% barcode type miss as param; 
if '%file%'==''     set msg=%msg% barcodes .csv miss as param; 

if NOT exist %file% set msg=%msg% barcodes .csv not exist: %file%;

set z=%zintdir%\%zint%
:: echo ... z=%z% 
if NOT exist %z% set msg=%msg% zint apl not found at: %z%; 
@echo msg:%msg%

::  csv was unexpected at this time.
if NOT '%msg%'=='' (
:: @echo %msg%
   @echo %msg%>>%log%
   @set /p ask=-- bad var`s
   @goto :EOF 
)

:epsmake
set starttime=%time:~0,2%:%time:~3,2%:%time:~6,2%
set msg=... 'csv2eps' begin: %starttime% user:%USERNAME% 
echo %msg%>>%log%
echo %msg% 

:: %z% -o %eps%\%nm%.eps -b %bt% -d "%nm%"	

echo %z% --batch --mirror --filetype=%ft% --cmyk -b %bt% -i %file%
set /p ask=-- pause before run zint.exe

     %z% --batch --mirror --filetype=%ft% --cmyk -b %bt% -i %file%
:: --- runtime err
:: Error 125: Invalid option
:: (20CODE128)[2000].eps-list.csv
:: --- runtime err
:: 102: Unable to read input file
:: --- 

set stoptime=%time:~0,2%:%time:~3,2%:%time:~6,2%

:: --- calculate duration
::  set start_all=%time%
    set stop_all=%time%
	set dur=
    call %src%\dur.cmd %start_all% %stop_all%
:: --- 

set msg=... 'csv2eps' final: %stoptime% dur:%dur%
echo %msg%>>%log%
echo %msg%
   :: err 102: Unable to read input file
   :: =0 was unexpected at this time.
if NOT ERRORLEVEL=0 @echo %err% ERRORLEVEL
set /p ask=... end ...

:: cd /d %src%
:EOF