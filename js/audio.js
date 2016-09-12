var AudioVisualizer = function(player) {
    var audioContext = new (window.AudioContext || window.webkitAudioContext);
    var analyzer = audioContext.createAnalyser();
    var self = this;
    analyzer.fftSize = 256;
    var source = audioContext.createMediaElementSource(player);
    console.log(source);
    source.connect(analyzer);
    analyzer.connect(audioContext.destination);
    var audioStream = function() {
        analyzer.getByteFrequencyData(self.streamData);
        var total = 0;
        for (var i = 0; i < 80; i++) {
            // total += self.streamData[i];
            var boxes = new CreateObjects();
            boxes.heightSet(i, self.streamData[i]);
        }
        // self.volume = total;
    }
    setInterval(audioStream, 25);
    this.volume = 0;
    this.streamData = new Uint8Array(analyzer.frequencyBinCount);
    this.playStream = function(streamURL) {
        player.setAttribute('src', streamURL);
        player.play();
    }
}

window.onload = function () {
    SC.initialize({
        client_id: my_client_id
    });
    // var track_url = 'Torrentz-12-Always-Let-Your-Conscience-Be-Your-Guide-feat.-Milk-Plus-MC-Wreckshin-Betty-Rebel-and-Fatback-Supreme.mp3';
    // var track_url = 'tracks/120590654';
    var track_url = 'tracks/253259621';
    var player = document.getElementById('player');
    var audioSource = new AudioVisualizer(player);
    // SC.stream(track_url);
    var objects = new CreateObjects();
    objects.init();
    objects.playObj();
    SC.get(track_url).then(function(track) {
        audioSource.playStream(track.stream_url + '?client_id=5f3ce9cd8d872f71883075400adc9747');
    });
}
