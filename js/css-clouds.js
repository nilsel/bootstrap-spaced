/* CSS3 clouds by @thespite */
/*global $:false, requestAnimationFrame:false*/
/*jshint devel:true, browser:false*/

    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelRequestAnimationFrame = window[vendors[x]+
              'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame){
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if (!window.cancelAnimationFrame){
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
    }());

    var layers = [],
        objects = [],
        world = document.getElementById( 'world' ),
        viewport = document.getElementById( 'viewport' ),
        d = 0,
        p = 400,
        worldXAngle = 0,
        worldYAngle = 0;

    viewport.style.webkitPerspective = p;
    viewport.style.MozPerspective = p;
    viewport.style.oPerspective = p;


    function createCloud() {

        var div = document.createElement( 'div'  );
        div.className = 'cloudBase';
        var x = 256 - ( Math.random() * 512 );
        var y = 256 - ( Math.random() * 512 );
        var z = 256 - ( Math.random() * 512 );
        var t = 'translateX( ' + x + 'px ) translateY( ' + y + 'px ) translateZ( ' + z + 'px )';
        div.style.webkitTransform = t;
        div.style.MozTransform = t;
        div.style.oTransform = t;
        world.appendChild( div );

        for( var j = 0; j < 6 + Math.round( Math.random() * 10 ); j++ ) {
            var cloud = document.createElement( 'div' );
            cloud.className = 'cloudLayer';

            var cx = 256 - ( Math.random() * 512 );
            var cy = 256 - ( Math.random() * 512 );
            var cz = 100 - ( Math.random() * 200 );
            var a = Math.random() * 360;
            var s = 0.25 + Math.random();
            x *= 0.2; y *= 0.2;
            cloud.data = {
                x: cx,
                y: cy,
                z: cz,
                a: a,
                s: s,
                speed: 0.1 * Math.random()
            };
            var ct = 'translateX( ' + cx + 'px ) translateY( ' + cy + 'px ) translateZ( ' + cz + 'px ) rotateZ( ' + a + 'deg ) scale( ' + s + ' )';
            cloud.style.webkitTransform = ct;
            cloud.style.MozTransform = ct;
            cloud.style.oTransform = ct;

            div.appendChild( cloud );
            layers.push( cloud );
        }

        return div;
    }
    function generate() {
        objects = [];
        if ( world.hasChildNodes() ) {
            while ( world.childNodes.length >= 1 ) {
                world.removeChild( world.firstChild );
            }
        }
        for( var j = 0; j < 4; j++ ) {
            objects.push( createCloud() );
        }
    }
    function updateView() {
        var t = 'translateZ( ' + d + 'px ) rotateX( ' + worldXAngle + 'deg) rotateY( ' + worldYAngle + 'deg)';
        world.style.webkitTransform = t;
        world.style.MozTransform = t;
        world.style.oTransform = t;
    }

    //window.addEventListener( 'mousewheel', onContainerMouseWheel );
    ///test window.addEventListener( 'DOMMouseScroll', onContainerMouseWheel );

    window.addEventListener( 'mousemove', function( e ) {
        worldYAngle = -( 0.5 - ( e.clientX / window.innerWidth ) ) * 180;
        worldXAngle = ( 0.5 - ( e.clientY / window.innerHeight ) ) * 180;
        updateView();
    } );



    /*function onContainerMouseWheel( event ) {

        event = event ? event : window.event;
        d = d - ( event.detail ? event.detail * -5 : event.wheelDelta / 8 );
        updateView();

    }*/


//    Iterate layers[], update the rotation and apply the
//    inverse transformation currently applied to the world.
//    Notice the order in which rotations are applied.

function update (){

    for( var j = 0; j < layers.length; j++ ) {
        var layer = layers[ j ];
        layer.data.a += layer.data.speed;
        var t = 'translateX( ' + layer.data.x + 'px ) ' +
            'translateY( ' + layer.data.y + 'px ) ' +
            'translateZ( ' + layer.data.z + 'px ) ' +
            'rotateY( ' + ( - worldYAngle ) + 'deg ) ' +
            'rotateX( ' + ( - worldXAngle ) + 'deg ) ' +
            'scale( ' + layer.data.s + ')';
        layer.style.transform = t;
    }

    requestAnimationFrame( update );

}

     generate();

    update();

