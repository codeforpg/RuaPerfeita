<!DOCTYPE html>
<html lang="en" ng-app="app">
<head>
    <base href="/">
    <meta charset="UTF-8">
    <title>Rua Perfeita</title>
    <link rel="stylesheet" href="../node_modules/angular/angular-csp.css">
    <link rel="stylesheet" href="/node_modules/material-design-lite/material.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="node_modules/ng-toast/dist/ngToast.css">
    <link rel="stylesheet" href="node_modules/ng-dialog/css/ngDialog.css">
    <link rel="stylesheet" href="node_modules/ng-dialog/css/myth/ngDialog-theme-plain.css">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/bootstrap-theme.css">
    <link rel="stylesheet" href="css/style.css">
    <link href='https://fonts.googleapis.com/css?family=Poiret+One' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>

    <script>
        var base_url = '{{ route("index") }}/';
    </script>

    <script src="node_modules/angular/angular.js"></script>
    <script src="node_modules/angular-animate/angular-animate.js"></script>
    <script src="node_modules/angular-sanitize/angular-sanitize.js"></script>
    <script src="node_modules/angular-route/angular-route.min.js"></script>
    <script src="node_modules/angular-cookies/angular-cookies.js"></script>
    <script src="node_modules/lodash/lodash.min.js"></script>
    <script src="node_modules/angular-google-maps/dist/angular-google-maps.js"></script>
    <script src="node_modules/angular-simple-logger/dist/angular-simple-logger.min.js"></script>
    <script src="node_modules/material-design-lite/material.min.js"></script>
    <script src="node_modules/ng-toast/dist/ngToast.js"></script>
    <script src="node_modules/ng-dialog/js/ngDialog.js"></script>
    <script src="node_modules/jquery/dist/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="/lib/socket.io.js"></script>
    <script src="js/main.js"></script>
    <script src="js/provider/rua_perfeita.provider.js"></script>
    <script src="js/controllers/main.controller.js"></script>
    <script src="js/controllers/google.controller.js"></script>
    <script src="js/service/socket.service.js"></script>
    <script src="js/service/pin.service.js"></script>
    <script src="js/service/tipo.service.js"></script>
    <script src="js/service/add-pin.service.js"></script>
    <script src="js/script.js"></script>
</head>
<body ng-cloak class="cover">
<div class="demo-layout-transparent mdl-layout mdl-js-layout">
    <header class="mdl-layout__header mdl-layout__header--transparent header">
        <div class="mdl-layout__header-row">
            <!-- Title -->
            <span class="mdl-layout-title title">Rua Perfeita</span>
            <!-- Add spacer, to align navigation to the right -->
            <div class="mdl-layout-spacer"></div>
            <!-- Navigation -->
            <nav class="mdl-navigation">
                <a class="mdl-navigation__link" href="javascript:void(0)" id="show-como-usar">Como Usar</a>
                <a class="mdl-navigation__link" href="javascript:void(0)" id="show-tente-tambem">Tente Também</a>
                <a class="mdl-navigation__link" href="">Acompanhe as votações</a>
            </nav>
        </div>
    </header>
    <toast></toast>
    <main class="mdl-layout__content" ng-view>
    </main>
    <dialog class="col-md-5 no-border" id="como-usar">
        <h4 class="mdl-dialog__title">Como Usar?</h4>
        <div class="mdl-dialog__content">
            <p>
                <ul>
                    <li>
            <p class="como-usar">1 - Localize a rua que voce acha que precise de melhorias</p></li>
            <li><p class="como-usar">2 - Escolha sua melhoria na lista à direita</p></li>
            <li><p class="como-usar">3 - Clique no mapa para <strong>adicionar sua melhoria</strong></p></li>
            </ul>
            </p>
        </div>
        <div class="mdl-dialog__actions">
            <button type="button" class="mdl-button mdl-js-button mdl-js-ripple-effect close">Fechar</button>
        </div>
    </dialog>
    <dialog class="col-md-5 no-border" id="tente-tambem">
        <h4 class="mdl-dialog__title">Tente Também</h4>
        <div class="mdl-dialog__content">
            <ul>
                <li><p class="como-usar">1 - Veja outras melhorias da cidade ou do seu bairro</p></li>
                <li><p class="como-usar">2 - Clique sobre elas</p></li>
                <li><p class="como-usar">3 - <strong>Vote</strong> se esta melhoria seria boa ou não para aquela região
                    </p></li>
            </ul>
        </div>
        <div class="mdl-dialog__actions">
            <button type="button" class="mdl-button mdl-js-button mdl-js-ripple-effect close">Fechar</button>
        </div>
    </dialog>
</div>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Descrição da melhoria</h4>
            </div>
            <div class="modal-body">
                <p>
                    <small>Explique no que esta melhoria iria auxilar esata via</small>
                </p>
                <textarea ng-model="descricao"></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" data-dismiss="modal" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" id="save" data-dismiss="modal" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
