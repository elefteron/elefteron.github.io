@echo off
set  user=%USERNAME%
echo ... 0.set-dirs.cmd  
:: -- cannot start from local net adr (\\unc_name) - not supported
:: -- default places on disk 
:: --------------------------------------- set-dirs --- manual config here:
     set src_drv=c
     set prg_drv=c
     set job_drv=c
     set    root=%job_drv%:\$desk
     set    jobs=%job_drv%:\$desk\$seq-jobs
     set     eps=%job_drv%:\$desk\$seq-jobs\eps
     set      ps=%job_drv%:\$desk\$seq-jobs\ps
     set     pdf=%job_drv%:\$desk\$seq-jobs\pdf
	 
	 set     src=%src_drv%:\$prog.run\seq
     set  sequsr=%src_drv%:\$prog.run\seq\seq-user.js
	 
     set zintdir=%prg_drv%:\$prog.run\zint-2.10.0
     set    zint=Zint.exe

     if "%user%"=="" ( echo.... miss./undef. username&& goto eof)
	 :: -- diff logs for diff computers
     set  log=%job_drv%:\$desk\$seq-jobs\seq-%user%.log
:: --------------------------------------- set-dirs --- end config
