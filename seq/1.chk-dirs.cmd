@echo off
echo ... 1.chk-dirs.cmd 
:: call 0.set-dirs.cmd
:: call 0.set-dirs-%user%.cmd
:: call 1.chk-dirs.cmd

:: --- show, check and recreate workjob dirs and log file
set err=n
set msg=
if NOT exist %root%\NUL md %root%
if NOT exist %root% set msg='... root dir recreate err: %root%' 
if NOT "%msg%"=="" (set err=y && @echo....err: %msg%) else (@echo. root:%root% ..ok)

set msg=
if NOT exist %jobs%\NUL md %jobs%
if NOT exist %jobs% set msg='... jobs dir recreate err: %jobs%' 
if NOT "%msg%"=="" (set err=y && @echo.... err: %msg%) else (@echo. jobs:%jobs% ..ok)

set msg=
if NOT exist %eps%\NUL md %eps%
if NOT exist %eps%  set msg='... eps  dir recreate err: %eps%' 
if NOT "%msg%"=="" (set err=y && @echo.... err: %msg%) else (@echo. eps:%eps% ..ok)

set msg=
if NOT exist %ps%\NUL md %ps%
if NOT exist %ps%   set msg='... ps   dir recreate err: %ps%' 
if NOT "%msg%"=="" (set err=y && @echo.... err: %msg%) else (@echo. ps:%ps% ..ok)

set msg=
if NOT exist %pdf%\NUL md %pdf%
if NOT exist %pdf%  set msg='... pdf  dir recreate err: %pdf%' 
if NOT "%msg%"=="" (set err=y && @echo.... err: %msg%) else (@echo. pdf:%pdf% ..ok)

set msg=
if NOT exist %log%  echo.>%log%
if NOT exist %log%  set msg='... cannot make log file: %log%'
if NOT "%msg%"=="" (set err=y && @echo.... err: %msg%) else (@echo. log:%log% ..ok)
:: @echo. >>%log% 

:: -- check only
set msg=
if NOT exist %src%            set msg='%msg%  src dir not defined: %src%' 
if NOT "%msg%"=="" (set err=y && @echo.... err: %msg%) else (@echo. src:%src% ..ok)

set msg=
if NOT exist %zintdir%        set msg='%msg% zint dir not defined: %zintdir%' 
if NOT "%msg%"=="" (set err=y && @echo.... err: %msg%) else (@echo. zintdir:%zintdir% ..ok)
if NOT exist %zintdir%\%zint% set msg='%msg% zint apl not defined: %zint%' 
if NOT "%msg%"=="" (set err=y && @echo.... err: %msg%) else (@echo. zint:%zintdir%\%zint% ..ok)

echo.... end. err:%err%
:: ===