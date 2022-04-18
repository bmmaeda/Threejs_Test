import * as THREE from './three.js-master/build/three.module.js'
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
import {OrbitControls} from './three.js-master/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
const loader = new GLTFLoader()

loader.load('assets/barco/scene.gltf', function(gltf){
    console.log(gltf)
    const root = gltf.scene;
    root.scale.set(11,11,11)
    scene.add(root);
}, function (xhr){
   console.log((xhr.loaded/xhr.total * 100) + "% carregado")  
}, function(error){
    console.log('Aconteceu um erro')
})
const light = new THREE.HemisphereLight(0xffffff, 0xffffff,3)
light.position.set(4,4,5)
scene.add(light)
const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})

const sizes = { //define window const size
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera( 75, sizes.width/sizes.height, 1, 1000)
camera.position.set(0,1,3)
scene.add(camera)

const controls = new OrbitControls( camera, renderer.domElement ) //camera control
    controls.minDistance = 3;
    controls.maxDistance = 5;
    renderer.setClearColor( 0x20B2AA, 1);
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.gammoOuput = true
    renderer.render(scene, camera)

window.addEventListener( 'resize', onWindowResize, false ); //window auto-resize
    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
function animate(){
    requestAnimationFrame(animate)  
    controls.update()
    renderer.render(scene,camera)
}
animate()
