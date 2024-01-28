import './style.css'
import * as d3 from "d3"

const rawData =  fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
.then(response => response.json())
.then(data => data.data)
const data = await rawData

//width: 940px height: 600px

const height = 460;
const width = 900


const padding = 40

//data[0] == date 
//data[1] == GDP
const scaleY = d3.scaleLinear()
.domain([d3.min(data, d => d[1]*0.00001), d3.max(data, d => d[1])])
.range([height - padding,  padding ])


const scaleX = d3.scaleTime()
.domain([d3.min(data, d => new Date(d[0])), d3.max(data, d => new Date(d[0]))])
.range([padding, width -  padding])

d3.select('#app')
.append('svg')
.attr('width', width)
.attr('height', height)



d3.select('svg')
.append('g')
.attr('id', 'x-axis')
.attr("transform", `translate(0,${height - padding})`)
.call(d3.axisBottom(scaleX))

d3.select('svg')
.append('g')
.attr("transform", `translate(${padding},0)`)
.attr('id', 'y-axis')
.call(d3.axisLeft(scaleY))

//data[0] == date 
//data[1] == GDP
d3.select('svg')
.selectAll('rect')
.data(data)
.enter()
.append('rect')
.attr('class', 'bar')
.attr('data-date', (d) => d[0])
.attr('data-gdp', (d) => d[1])
.attr('width', 2)
.attr('height', (d) => height - padding- scaleY(d[1]))
.attr('x', (d) => scaleX(new Date(d[0])))
.attr('y', (d) => scaleY(d[1]))