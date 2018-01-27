import * as THREE from 'three';
import * as d3 from "d3";

const width  = window.innerWidth
const height = window.innerHeight
const canvas = document.querySelector('.canvas')
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 3000)
const scene  = new THREE.Scene()
const geo    = new THREE.Geometry()

scene.fog = new THREE.FogExp2(0x000000, 0.0007);
camera.position.z = 1000

function initialize(data) {
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

  function canvasCircle(color, size) {
    const cv  = document.createElement('canvas')
    cv.width  = cv.height = size
    const ctx = cv.getContext('2d')
    const txt = new THREE.Texture(cv)
    const center = size / 2

    ctx.beginPath()
    ctx.arc(center, center, center, 0, 2 * Math.PI, false)
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()

    txt.needsUpdate = true

    return txt
  }

  data.forEach((player) => {
    const {'pca-one':x, 'pca-two':y, 'pca-three':z} = player
    const mat = new THREE.PointsMaterial({
      size: 20,
      map: canvasCircle(scale.c(player.PlayerPosition), 256),
      transparent: true,
      depthWrite: false
    })

    const particle = new THREE.Points()
  })

}

d3.csv('pca.csv').get((data) => {
  initialize(data)
})
