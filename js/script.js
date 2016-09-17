var AFRAME = require('aframe');

AFRAME.registerShader('phong', {
    schema: {
        color: {default: '#000000'},
        specular: {default: '#111'},
        shininess: {default: '30'}
    },
    init: function (data) {
        this.material = new THREE.MeshPhongMaterial({
            color: data.color,
            specular: data.specular,
            shininess: data.shininess
        });
    }
});

var CreateObjects = function() {
    this.init = function() {
        var scene = document.querySelector('a-scene');

        var number = 60;
        var angle = 0;
        var increase = Math.PI * 2 / number;
        for(var i = 0; i < number; i++){
            var box = document.createElement('a-box');
            box.setAttribute('id', 'box'+i);

            var x = 20 * Math.cos(angle);
            var z = -20 * Math.sin(angle);

            box.setAttribute('position', x + ' 1 ' + z);
            scene.appendChild(box);
            box.setAttribute('material', 'shader: phong; color: #000; specular: #333; shininess: 50');
            angle += increase;
        }

        var plane = document.createElement('a-plane');
        plane.setAttribute('position', '0 1 0');
        scene.appendChild(plane);
        plane.setAttribute('width', '200');
        plane.setAttribute('height', '200');
        plane.setAttribute('rotation', '-90 0 0');
        plane.setAttribute('material', 'shader: flat; color: #111; opacity: 0.7');

        var image = document.createElement('a-image');
        image.setAttribute('position', '0 3.5 -3');
        scene.appendChild(image);
        image.setAttribute('src', './img/attrib.png');
        image.setAttribute('width', '2.56');
        image.setAttribute('height', '.64');
    },
    this.heightSet = function(i, height) {
        var box = document.getElementById('box'+i);
        box.setAttribute('height', 1 + (10*(height/128)));
        var r, g, b;
            r = parseInt((Math.sin((2*height/128*Math.PI/2))+1)*128);
            g = parseInt((Math.sin((2*height/128*Math.PI/2)- 4*Math.PI/3)+1)*128);
            b = parseInt((Math.sin((2*height/128*Math.PI/2)- 2*Math.PI/3)+1)*128);
        function toHex(e) {
            var hex = e.toString(16);
            if (hex.length === 1) {
                return '0' + hex;
            } else if (hex.length > 2){
                return 'ff';
            } else {
                return hex;
            }
        }
        var hexcolor = toHex(r) + toHex(g) + toHex(b);
        box.setAttribute('material', 'color: #'+hexcolor+';');
    }
}

var boxes = new CreateObjects();

var AudioVisualizer = function(player) {
    var audioContext = new (window.AudioContext || window.webkitAudioContext);
    var analyzer = audioContext.createAnalyser();
    var self = this;
    analyzer.fftSize = 256;
    var source = audioContext.createMediaElementSource(player);
    source.connect(analyzer);
    analyzer.connect(audioContext.destination);
    var audioStream = function() {
        analyzer.getByteFrequencyData(self.streamData);
        for (var i = 0; i < 60; i++) {
            boxes.heightSet(i, self.streamData[i]);
        }
    }
    setInterval(audioStream, 25);
    this.volume = 0;
    this.streamData = new Uint8Array(analyzer.frequencyBinCount);
    this.playStream = function(streamURL) {
        player.setAttribute('src', streamURL);
        document.addEventListener('click', function() {
            player.play();
        });
    }
}

window.onload = function () {
    SC.initialize({
        client_id: my_client_id
    });
    var track_url = 'tracks/133881047';
    var player = document.getElementById('player');
    var audioSource = new AudioVisualizer(player);
    boxes.init();
    SC.get(track_url).then(function(track) {
        audioSource.playStream(track.stream_url + '?client_id=5f3ce9cd8d872f71883075400adc9747');
    });
}
