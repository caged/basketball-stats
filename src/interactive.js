import { csv, select, scaleLinear, extent, scaleOrdinal } from 'd3';
import tsnejs from './tsne.js';

const META = [
  'PLAYER_NAME',
  'TEAM_ABBREVIATION',
  'AGE',
  'PlayerPosition'
]

const STATS = [
  'OFF_RATING',
  'DEF_RATING',
  'NET_RATING',
  'AST_PCT',
  'AST_TO',
  'AST_RATIO',
  'OREB_PCT',
  'DREB_PCT',
  'REB_PCT',
  'TM_TOV_PCT',
  'EFG_PCT',
  'TS_PCT',
  'USG_PCT',
  'FGM',
  'FGA',
  'FGM_PG',
  'FGA_PG'
]

function render(data) {
  const statdata = data.map(d => {
    return STATS.map((s) => +d[s])
  })

  const optel = select('#options')
  const visel = select('.js-content')
  const stepel = select('.js-steps')
  const options = {}
  var paused = false
  var step = 0
  var chunk = 1
  var frame

  const timescale = scaleLinear()
    .domain([0, 20, 50, 100, 200, 6000])
    .range([60, 30, 20, 10, 0]);

  slider(optel, 'Perplexity', 2, 100, 10)
  slider(optel, 'Epsilon', 1, 20, 5)

  updateOptions()

  const margin = { t: 10, r: 10, b: 10, l: 10 }
  const width = parseInt(visel.style('width')) - margin.l - margin.r
  const height = parseInt(visel.style('height')) - margin.t - margin.b

  const x = scaleLinear()
    .range([0, width])

  const y = scaleLinear()
    .range([0, height])

  const color = scaleOrdinal()
    .domain(['G', 'F', 'C'])
    .range(['red', 'green', 'blue'])

  const svg = visel.append('svg')
    .attr('width', width + margin.l + margin.r)
    .attr('height', height + margin.t + margin.b)
  .append('g')
    .attr('transform', `translate(${margin.l},${margin.t})`)

  var tsne = new tsnejs.tSNE(options)
  tsne.initDataRaw(statdata)

  select('.js-pause')
    .on('click', function() {
      select(this).classed('paused', paused = !select(this).classed('paused'))
      tick()
    })

  function tick() {
    if(paused) return

    if(step >= 400) chunk = 10
    for(var k = 0; k < chunk; k++) {
      tsne.step()
      ++step
    }

    const solution = tsne.getSolution().map((xy, i) => {
      const player = data[i]
      return new Point(xy, player)
    })

    plot(solution, svg)

    stepel.text(step)

    var timeout = timescale(step)
    setTimeout(() => { frame = window.requestAnimationFrame(tick) }, timeout)
  }

  function updateOptions() {
    const inputs = optel.node().querySelectorAll('input')
    inputs.forEach((input) => {
      options[input.name] = +input.value
    })
  }

  function slider(el, name, min, max, val) {
    const sect = el.append('div')
      .attr('class', 'slider')

    sect.append('span')
      .attr('class', `slider-label slider-label-${name}`)
      .text(name)

    const value = sect.append('span')
      .attr('class', `slider-value slider-value-${name}`)
      .text(val)

    const slider = sect.append('input')
      .attr('class', 'option')
      .attr('type', 'range')
      .attr('min', min)
      .attr('max', max)
      .attr('value', val)
      .attr('name', name.toLowerCase())
      .on('change', updateOptions)
      .on('input', () => value.text(slider.node().value))
  }

  function plot(players, canvas) {
    const xext = extent(players, (d) => d.xy[0])
    const yext = extent(players, (d) => d.xy[1])

    x.domain(xext)
    y.domain(yext)

    const nodes = canvas.selectAll('.node')
      .data(players)

    nodes.enter().append('circle')
      .attr('class', 'node')
      .attr('r', 3)
      .attr('cx', (d) => 0)
      .attr('cy', (d) => 0)
      .style('fill', (d) => color(d.meta.PlayerPosition))
      .on('mouseover', (d) => console.log(d.meta.PLAYER_NAME))

    nodes
      .attr('cx', (d) => x(d.xy[0]))
      .attr('cy', (d) => y(d.xy[1]))

    nodes.exit().remove()
  }

  tick()
}


class Point {
  constructor(xy, meta) {
    this.xy = xy
    this.meta = meta
  }
}

csv('players-with-position.csv')
  .get(render)
