<?php
    if($_SERVER["QUERY_STRING"]!=""&&file_exists("./streams/{$_SERVER["QUERY_STRING"]}.png")){
        header('Content-Type: image/jpeg');
        $source = imagecreatefrompng("./streams/{$_SERVER["QUERY_STRING"]}.png");
        $im = imagecreatetruecolor(320,256);
        imagecopyresampled($im, $source, 0, 0, 0, 0, 320, 240, 704, 480);
        imagestring($im, 2, 2, 240, date(DATE_ATOM, filemtime("./streams/{$_SERVER["QUERY_STRING"]}.png")), 0xFFFFFF);
        imagejpeg($im, NULL, 50);
    }else{
        header("content-type: text/plain");
?>what stream m8?<?php } ?>