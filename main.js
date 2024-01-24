import './style.css'
import * as d3 from "d3"

const rawData =  fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
.then(response => response.json())
.then(data => data.data)
const data = await rawData

//width: 940px height: 600px
const height = 600;
const width = 940

const marginRight = 60;
const marginBottom = 30;
const marginLeft = 40;
const marginTop = 20;


const scaleY = d3.scaleLinear()
.domain([d3.min(data, d => d[1]), d3.max(data, d => d[1])])
.range([height - 50,0])

const scaleX = d3.scaleLinear()
.domain([d3.min(data, d => d[0].match(/[\d]+/gm)[0]), d3.max(data, d => d[0].match(/[\d]+/gm)[0])])
.range([0, width -  marginRight])


d3.select('#app')
.append('svg')
.attr('width', width)
.attr('height', height)

d3.select('svg')
.append('g')
.attr("transform", `translate(${marginLeft},${height - marginBottom})`)
.call(d3.axisBottom(scaleX))

d3.select('svg')
.append('g')
.attr("transform", `translate(${marginLeft},${marginTop})`)
.call(d3.axisLeft(scaleY))

