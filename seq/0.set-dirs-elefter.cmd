@echo off
set  user=%USERNAME%
echo ... 0.set-dirs-%user%.cmd 
:: --- cannot start from local net adr (\\unc_name) - not supported
:: -- profile elefter & usb: 

:: %homedrive% == %systemdrive% == c:  
::https://www.windowscentral.com/how-check-hard-drive-model-serial-number-firmware-version-and-more-using-command-prompt
:: wmic logicaldisk get Description,DeviceID,DriveType,MediaType,VolumeName,VolumeSerialNumber,Size,Access

:: --- %CD:~0,2% == f:   -- the start dir
     set crnt=%CD:~0,1%
	 set isusb=n

     for /F "usebackq tokens=1,2,3,4 " %%i in (`wmic logicaldisk get caption^,description^,drivetype 2^>NUL`) do (
::	   -- crnt drivetype==2
       if %%l equ 2 (
	     if "%%i"=="%crnt%:" set isusb=y
rem      echo "%%i" is a USB drive.
       )
     )
:: --------------------------------------- set-dirs-%user% --- manual config here:
::   echo  current run drive "%crnt%" is-usb-drive: "%isusb%"
:: ---	 places on disk 
     set src_drv=f
     set prg_drv=f
     set job_drv=c
:: ---	 places on usb 
	 if "%isusb%"=="y" (
	   echo  current run drive "%crnt%" is usb
       set src_drv=%crnt%
       set prg_drv=%crnt%
       set job_drv=%crnt%
	 )
     set root=%job_drv%:\$desk
     set jobs=%job_drv%:\$desk\$seq-jobs
     set  eps=%job_drv%:\$desk\$seq-jobs\eps
     set   ps=%job_drv%:\$desk\$seq-jobs\ps
     set  pdf=%job_drv%:\$desk\$seq-jobs\pdf
	 
	 set    src=%src_drv%:\$prog.run\seq
     set sequsr=%src_drv%:\$prog.run\seq\seq-user.js
	 
     set zintdir=%prg_drv%:\$prog.run\zint-2.10.0
     set    zint=Zint.exe

     if "%user%"=="" ( echo.... miss./undef. username&& goto eof)
	 :: -- diff logs for diff computers
     set  log=%job_drv%:\$desk\$seq-jobs\seq-%user%.log
:: --------------------------------------- set-dirs-%user% --- end config