function adjustSidebar(){if($(".sticky").offset()){var s=$(".sticky").offset().top;$(window).scroll(function(){var i=$(window).scrollTop(),t=$(".sticky").width();s<(i+=50)?($(".sticky").css({position:"fixed",top:50}),$(".sticky").width(t)):($(".sticky").css("position","static"),$(".sticky").width("auto"))})}}