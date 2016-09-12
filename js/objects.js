var CreateObjects = function() {
    this.init = function() {
        var scene = document.querySelector('a-scene');

        var number = 80;
        var angle = -90;
        var increase = Math.PI * 2 / number;
        for(var i = 0; i < number; i++){
            var box = document.createElement('a-box');
            box.setAttribute('id', 'box'+i);
            box.setAttribute('material', 'shader: phong; color: #bada55; specular: #333; shininess: 50');

            var x = 20 * Math.cos(angle);
            var z = -20 * Math.sin(angle);

            box.setAttribute('position', x + ' 1 ' + z);
            scene.appendChild(box);
            angle += increase;
        }
    },
    this.heightSet = function(i, height) {
        var box = document.getElementById('box'+i);
        // box.setAttribute('height', Math.abs(Math.cos(10*(height/128))) + 1);
        box.setAttribute('height', 1 + (10*(height/128)));
    },
    this.playObj = function() {
        var scene = document.querySelector('a-scene');
        var tetra = document.createElement('a-tetrahedron');
        tetra.setAttribute('id', 'play');
        tetra.setAttribute('material', 'shader: phong; color: blue; specular: #333; shininess: 40');
        tetra.setAttribute('position', '0, 1, -8');
        tetra.setAttribute('rotation', '45, 45, 0');
        scene.appendChild(tetra);
    }
}
