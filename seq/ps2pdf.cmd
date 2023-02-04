@echo off
set  user=%USERNAME%
set start_all=%time%  
@echo ... 'ps2pdf' user:%USERNAME% 

set err=n
set scr=c:\$prog.run\seq\
@echo cd=%cd%
@echo scr=%src%
if NOT '%cd%'=='%src%' err=y
if '%err%'=='y'  (
  echo ... stop to correct errors and run again
  @pause
  goto :EOF
)   

:: @echo ... ps2pdf.cmd user:%USERNAME% crnt-dir:%cd%>>%log%
cd /d %jobs%\pdf
:: @echo ... new crnt-dir:%cd%
:: @echo ... new crnt-dir:%cd%>>%log%
   @echo ... 'ps2pdf' user:%USERNAME% crnt-dir:%cd%
   @echo ... 'ps2pdf' user:%USERNAME% crnt-dir:%cd%>>%log%

set file=%1
set msg=%0 %file%
echo ... src:%src%
echo ... src:%src%>>%log%
echo ... todo:%msg%
echo ... todo:%msg%>>%log%

set msg=
set z=%src%\ps2pdf.exe
if NOT exist %z%    set msg='%msg% ps2pdf apl not found at: %src%'
if NOT exist %name%.ps set msg='%msg% .ps not exist: %name%.ps'

if NOT '%msg%'=='' (
:: @echo %msg%
   @echo %msg%>>%log%
   @set /p ask=-- bad param`s
   @goto :EOF 
)

:ps2pdf
set starttime=%time:~0,2%:%time:~3,2%:%time:~6,2%
set msg=... 'ps2pdf' begin: %starttime% user:%USERNAME% 
echo %msg%>>%log%
echo %msg% 

echo ps2pdf from ..\ps to ..\pdf
cd ..\pdf
echo cd=%cd%

set /p ask=-- pause before run ps2pdf
%z% %file%
:: --- 

set stoptime=%time:~0,2%:%time:~3,2%:%time:~6,2%

:: --- calculate duration
::  set start_all=%time%
    set stop_all=%time%
	set dur=
::  call %src%\dur.cmd %start_all% %stop_all%
:: --- 

set msg=... 'ps2pdf' final: %stoptime% dur:%dur%
echo %msg%>>%log%
echo %msg%
if NOT ERRORLEVEL=0 @echo %err% ERRORLEVEL
set /p ask=... end ...

:: cd /d %src%
:EOF