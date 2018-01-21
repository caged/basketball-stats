import * as THREE from 'three';
import * as d3 from "d3";
import ThreeTrackballControls from 'three-trackballcontrols';



const container = document.querySelector('.canvas')
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 5, 3500)
camera.position.z = 2750
camera.position.x = 300;
camera.position.y = 300;

const controls = new ThreeTrackballControls(camera, container);
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x050505)
scene.fog = new THREE.Fog(0x050505, 2000, 3500)

const renderer = new THREE.WebGLRenderer({ antialias: false })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
container.appendChild(renderer.domElement)

const geometry = new THREE.BufferGeometry();
var points;

function init(data) {
  const color = new THREE.Color()
  const positions = []
  const colors = []
  const ext = {
    x: d3.extent(data, d => +d['pca-one']),
    y: d3.extent(data, d => +d['pca-two']),
    z: d3.extent(data, d => +d['pca-three'])
  }

  const scale = {
    x: d3.scaleLinear().domain(ext.x).range([0, window.innerWidth]),
    y: d3.scaleLinear().domain(ext.y).range([0, window.innerHeight]),
    z: d3.scaleLinear().domain(ext.z).range([0, window.innerHeight]),
    c: d3.scaleOrdinal().domain([0, 2]).range(['red', 'green', 'blue'])
  }

  data.forEach((player) => {
    const {'pca-one':x, 'pca-two':y, 'pca-three':z} = player
    positions.push(scale.x(x), scale.y(y), scale.z(z))

    color.set(scale.c(player.PlayerPosition))
    colors.push(color.r, color.g, color.b)
  })

  geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geometry.computeBoundingSphere()

  const material = new THREE.PointsMaterial({ size: 15, vertexColors: THREE.VertexColors })
  points = new THREE.Points(geometry, material)
  scene.add(points)
}

function animate() {
  requestAnimationFrame( animate );
  controls.update()
  render();
}

function render() {
  var time = Date.now() * 0.001;
  // points.rotation.x = time * 0.25;
  // points.rotation.y = time * 0.5;
  renderer.render(scene, camera);
}

d3.csv('pca.csv').get((data) => {
  init(data)
  animate()
})
