@echo off
rem chcp 866
rem encoding ansi (win-1251)
:: (by elefter@abv.bg at 2021-11-5) 
:: todo 4 test os w10,w11, copy fnt, reg fnt;
set test=n
setlocal enabledelayedexpansion
set start_all=%time%
:: current directory is %CD% or %~dp0 
:: %homedrive% is c: usually

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

set  user=%USERNAME%
@echo.=== 'svc-init.cmd' user:%USER% comp:%COMPUTERNAME% os:'%os_%' at %date% %time% ===
:: --- cannot start from local net adr (\\unc_name) - not supported msg
:: --- %homedrive% == %systemdrive% == c:
if "%user%"=="" ( echo.... miss./undef. username&& goto eof)
::   set desk=%homedrive%
     set root=%homedrive%\$desk
     set jobs=%homedrive%\$desk\$svc.jobs
     set  eps=%homedrive%\$desk\$svc.jobs\eps
     set  pdf=%homedrive%\$desk\$svc.jobs\pdf
     set  log=%homedrive%\$desk\$svc.jobs\svc.%user%.log
     set svcusr=%CD%\svc_usr.js

if "%test%"=="y" (
     echo root=%root%
     echo jobs=%jobs%
     echo  eps=%eps%
     echo  pdf=%pdf%
     echo  log=%log%
     echo svcusr=%svcusr%
     set /p ask=check vars
)

:: --- recreate (root), jobs, eps, pdf folders, make _log file
set err=
if '%root%'=='' set root=%homedrive%
@echo ... root: %root%\
set msg=
if '%root%'=='%homedrive%' (
   if NOT exist %root%\NUL set msg='... root folder NOT accessible: %root%'
) else (
   if NOT exist %root%\NUL md %root%
   if NOT exist %root%\NUL set msg='... root folder NOT exist and cannot be created: %root%'
) 
if NOT "%msg%"=="" ( echo.%msg% && set err=y && goto eof )
echo ... ok

@echo ... jobs: %jobs%
set msg=
if NOT exist %jobs%\NUL md %jobs%
if NOT exist %jobs%\NUL set msg='... jobs folder NOT exist and cant create: %jobs%'
if NOT "%msg%"=="" ( echo.%msg% && set err=y )
if "%msg%"=="" echo ... ok

@echo ... eps: %eps%
set msg=
if NOT exist %eps%\NUL md %eps%
if NOT exist %eps%\NUL set msg='... eps folder NOT exist and cant create: %eps%'
if NOT "%msg%"=="" ( echo.%msg% && set err=y )
if "%msg%"=="" echo ... ok

@echo ... pdf: %pdf%
set msg=
if NOT exist %pdf%\NUL md %pdf%
if NOT exist %pdf%\NUL set msg='... pdf folder NOT exist and cant create: %pdf%'
if NOT "%msg%"=="" ( echo.%msg% && set err=y )
if "%msg%"=="" echo ... ok

@echo ... log: %log%
set msg=
if NOT exist %log%  echo.>%log%
if NOT exist %log%  set msg='... cannot make log file: %log%'
if NOT "%msg%"=="" ( echo.%msg% && set err=y )
if "%msg%"=="" echo ... ok

if NOT "%err%"=="" (
  echo ... stop to correct errors and run again
  goto :hlp
)
set msg=
set err=

echo.... zint.exe in %CD%
:: set zint=%CD%\zint-2.6.0\Zint.exe
:: set zint=%CD%\zint-2.6.3\Zint.exe
   set zint=%CD%\zint-2.10.0\Zint.exe
set msg=
if NOT exist %zint% ( set msg='... missing Zint at: %zint%' && echo.%msg:'=% && set err=y )
if "%msg%"=="" echo ... ok zint:%zint%

:: --- recreate %svcusr% (.js) and dump inside: %user% %root% %jobs% %eps% %pdf% %log% %OS_% %COMPUTERNAME%; 
:: for folders replace '\' to '/' because of js syntax rules
:: folder/file name chars that can make problems in batch (.cmd/.bat): %*% !*! (*) ^* cyrillic
set msg=--- file:'%svcusr%', made_by:'SVC-init.cmd', at:'%date% %start_all%' ---
   echo.// %msg%>%svcusr%
   echo.comp="%COMPUTERNAME%">>%svcusr%
   echo.  os="%OS_%">>%svcusr%
   echo.user="%user:\=/%">>%svcusr%
   echo. log="%log:\=/%">>%svcusr%
   echo.zint="%zint:\=/%">>%svcusr%
   echo.root="%root:\=/%/">>%svcusr%
   echo.jobs="%jobs:\=/%/">>%svcusr%
   echo. eps="%eps:\=/%/">>%svcusr%
   echo. pdf="%pdf:\=/%/">>%svcusr%
if "%test%"=="y" type %svcusr% | more
if "%test%"=="y" set /p ask=... ? is ok "%svcusr%"

:: --- log
@echo.... log add: %log%
@echo.{-- jobs:"%jobs:\=/%/", at:'%date% %start_all%' made_by:'SVC-init.cmd' --}>>%log% 
@echo.... ok

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
echo.... ok
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
) else echo.... exist

:: --- calculate duration
::  set start_all=%time%
    set stop_all=%time%
    call dur.cmd %start_all% %stop_all%
:: ---

@echo.=== end 'svc-init.cmd' dur:%dur% ===
:: @set /p ask=
goto :run

:hlp
@echo.
@echo. usage: svc/svc-init.cmd
@echo. purpose: no need of install, but need of initial config
@echo. 
@echo. 1. check and make folders: $svc-jobs, eps, ind
@echo. 2. make custom icon for $svc-jobs
@echo. 3. if not exist try to install font Anastasia.ttf
@echo. 4. save file 'svc.user.js' vars: jobs, eps, pdf, comp, os, user, log
@echo. 5. append msg to log
@echo. 6. run svc.hta
@echo.
   @set /p ask=

:run
:: select engine: mshta.exe iexplore firefox seamonkey
   set eng=mshta.exe

::@echo START svc:
:: set /p ask=
:: start %eng% svc.hta
:: call svc.hta
:: set e=%errorlevel%
:: if NOT %e%==0 echo.... err:%e%
set /p ask=...

:: 'a' is not recognized as an internal or external command,
:: operable program or batch file.
:: ... err:9009
:eof