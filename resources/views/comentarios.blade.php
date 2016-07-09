<script>
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1046989012044128',
            xfbml      : true,
            version    : 'v2.6'
        });
    };


    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/pt_BR/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    function show(url){
        console.log(url)
        FB.api(
                "/"+url+"/comments",
                function (response) {
                    console.log(1,response);
                }
        );
    }

</script>
<div class="fb-comments" data-width="100%" data-href="{{ 'http://localhost:8000/'.$id }}" data-numposts="5"></div>