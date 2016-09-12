var AFRAME = require('aframe');

AFRAME.registerShader('phong', {
    schema: {
        color: {default: '#fff'},
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
