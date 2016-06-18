<!DOCTYPE html>
<html lang="en" ng-app="app">
<head>
    <base href="/">
    <meta charset="UTF-8">
    <title>Rua Perfeita</title>
    <link rel="stylesheet" href="../node_modules/angular/angular-csp.css">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/bootstrap-theme.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body ng-cloak>

<div ng-view>

</div>
<script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
<script src="node_modules/angular/angular.js"></script>
<script src="node_modules/angular-route/angular-route.min.js"></script>
<script src="node_modules/angular-google-maps/dist/angular-google-maps.js"></script>
<script src="node_modules/lodash/lodash.min.js"></script>
<script src="node_modules/jquery/dist/jquery.min.js"></script>
<script src="node_modules/angular-simple-logger/dist/angular-simple-logger.min.js"></script>
<script src="/lib/socket.io.js"></script>
<script src="js/main.js"></script>
<script src="js/provider/rua_perfeita.provider.js"></script>
<script src="js/controllers/main.controller.js"></script>
<script src="js/controllers/google.controller.js"></script>
<script src="js/service/socket.service.js"></script>
<script src="js/service/pin.service.js"></script>
</body>
</html>