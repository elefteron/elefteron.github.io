@echo off
rem chcp 866
rem encoding ansi (win-1251)
:: (by elefter@abv.bg at 2021-11-5) 
:: todo 4 test os w10,w11, copy fnt, reg fnt;
set test=n
setlocal enabledelayedexpansion
set start_all=%time%
set  user=%USERNAME%
:: --- get os name (%os%==='windows nt' is not enought informative)
set OS_=
   ver | find "Windows XP [Version 5.1.260" >NUL && ( set OS_=XP&&  goto end_os_chk )
   ver | find "Windows [Version 6.1.760" >NUL && ( set OS_=win-7&& goto end_os_chk )
   ver | find "Windows [Version 6.2.920">NUL && ( set OS_=win-8&&  goto end_os_chk )
   ver | find "Windows [Version 6.3.960">NUL && ( set OS_=8.1&& goto end_os_chk )
   ver | find "Windows [Version 10">NUL && ( set OS_=win-10&& goto end_os_chk )
   ver | find "Windows [Version 11">NUL && ( set OS_=win-11&& goto end_os_chk )
:end_os_chk
if "%os_%"=="" set os_=%POWERSHELL_DISTRIBUTION_CHANNEL%
if "%os_%"=="" set os_=unidentified

:: current directory is %CD% or %~dp0  %homedrive% is c: usually
@echo.=== 'setup SEQ':: comp:'%COMPUTERNAME%' os:'%os_%' user:'%USER%' at %date% %time% ===
@echo cd=%cd%
:: if NOT '%cd%'=='c:\$prog.run\seq\' cd /d c:\$prog.run\seq\

:: -- default 
call 0.set-dirs.cmd
:: -- user profile - manual edit
call 0.set-dirs-%user%.cmd
:: -- 
set err=?
call 1.chk-dirs.cmd
if %err%==y ( 
  set /p ask=... chk-dir errors: correct and run again! 
  goto eof
) else ( 
  echo.... chk-dirs: ok
)

:usr_
:: --- recreate %sequsr% (.js)
call 2.dir2js.cmd
if "%test%"=="y" ( type %sequsr% | more && set /p ask=... ? is ok "%sequsr%" )

:: --- log
@echo. >>%log% 
set msg=src:"%src:\=/%/", jobs:"%jobs:\=/%/", file:"seq-%user%.log" made_by:'setup.cmd', at:'%date% %start_all%'
@echo.// -- { %msg% }>>%log% 
@echo. >>%log% 

:: --- customise %jobs% folder with icon: make 'desktop.ini' 
set custdesk=%jobs%\desktop.ini
echo.... customise '%custdesk%' folder icon
:: recreate to avoid dbl
if exist %custdesk% attrib %custdesk% -s -h
echo.[.ShellClassInfo]>%custdesk%
:: absolute path - ok, not relative
:: echo.IconResource=C:\Windows\system32\SHELL32.dll,305>>%custdesk%
   echo.IconResource=%CD%\ico\Code-128 R19G00001.ico,0 >> %custdesk%
   set e=%errorlevel%
   if NOT %e%==0 echo.... err:%e%
   attrib %custdesk% +s +h
@echo. ok
if "%test%"=="y" type %custdesk% | more
if "%test%"=="y" set /p ask=.... end customise desktop.ini
set custdesk=

:: --- install font 'anastasia'
echo ... font 'Anastasia.ttf' from %CD%
if NOT exist %systemroot%\fonts\Anastasia.ttf (
   echo ... missing 
   echo.To install font, UAC will ask to confirm 'regedit' run
   copy %CD%\Anastasia.ttf %systemroot%\fonts
   set e=%errorlevel%
   if NOT %e%==0 echo.... err:%e%
if "%test%"=="y" set /p ask=... ? copy fnt

:: if not registered ?
   regedit /s addfnt.reg
   set e=%errorlevel%
   if NOT %e%==0 echo.... err:%e%
   if NOT exist %systemroot%\fonts\Anastasia.ttf echo ... try to install it manually 
if "%test%"=="y" set /p ask=... ? regedit fnt
) else echo. exist

:: --- calculate duration
::  set start_all=%time%
    set stop_all=%time%
    call dur.cmd %start_all% %stop_all%
:: ---

@echo.=== final 'setup.cmd' dur:%dur% ===
:: @set /p ask=
goto :run

:hlp
@echo.
@echo. usage: setup.cmd
@echo. purpose: no need of install, but need of setup
@echo. 
@echo. 1. check and make folders: ?:\$desk\$seq-jobs, ..\eps,..\ps,..\pdf
@echo. 2. make custom icon for $seq-jobs
@echo. 3. if not exist try to install font Anastasia.ttf
@echo. 4. setup save vars and dir path to 'seq-user.js'
@echo. 5. append msg to log
@echo.
   @set /p ask=

:run
:: select engine: mshta.exe iexplore firefox seamonkey
   set eng=mshta.exe

::@echo START seq: && set /p ask=
   %eng% seq.hta
:: start %eng% seq.hta
:: call seq.hta
   set e=%errorlevel%
   if NOT %e%==0 echo.... err:%e%
set /p ask=... setup end, press enter to close

:: 'a' is not recognized as an internal or external command,
:: operable program or batch file.
:: ... err:9009
:eof