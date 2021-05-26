<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">

    <title>Tok dat</title>
    <meta name="keywords" content="tok dat">
    <meta name="description" content="Tok Dat.">

    <meta name="robots" content="all">
    <meta name="author" content="Oliver Staša — Developer">
    <!-- <meta name="viewport" content="width=device-width"> -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

    <link href="/css/main.css" rel="stylesheet">

    <script src="/js/jq.js" type="text/javascript"></script>

  </head>
  <body>

<?php

if ($_GET['tok']) {

    echo '
    <script src="/js/fce.js?v=2.4" type="text/javascript"></script>
    ';

  } else {
    echo '<style>body {opacity: 1}</style><h1 style="color: white; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); padding:0; margin:0;">ve výzdobě</h1>';
  }

?>

  </body>
</html>