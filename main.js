import './style.css'
import * as d3 from "d3"

const rawData =  fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
.then(response => response.json())
.then(data => data.data)
const data = await rawData

//width: 940px height: 600px

const height = 600;
const width = 940


const padding = 40

//data[0] == date 
//data[1] == GDP
const scaleAxisY = d3.scaleLinear()
.domain([0, d3.max(data, d=> d[1])])
.range([height - padding, padding])

const scaleY = d3.scaleLinear()
.domain([0, d3.max(data, d => d[1])])
.range([height - padding, padding])

const scaleAxisX = d3.scaleTime()
.domain([d3.min(data, d => new Date(d[0])), d3.max(data, d => new Date(d[0]))])
.range([padding, width - padding] )

const scaleX = d3.scaleTime()
.domain([d3.min(data, d => new Date(d[0])), d3.max(data, d => new Date(d[0]))])
.range([padding, width - padding])


d3.select('#app')
.append('svg')
.attr('width', width)
.attr('height', height)



d3.select('#app').append('div')
.attr('id', 'tooltip')

d3.select('#app')
.append('p')
.attr('id','author')
.html('by ')
.insert('a')
.attr('target','__blank')
.attr('href',"https://github.com/Banzaidev")
.html('Banzaidev')


d3.select('svg')
.append('g')
.attr('class','axis')
.attr('id', 'x-axis')
.attr("transform", `translate(0,${height - padding})`)
.call(d3.axisBottom().scale(scaleAxisX))

d3.select('svg')
.append('g')
.attr('class','axis')
.attr("transform", `translate(${padding},${0})`)
.attr('id', 'y-axis')
.call(d3.axisLeft().scale(scaleAxisY))

//data[0] == date 
//data[1] == GDP
d3.select('svg')
.selectAll('rect')
.data(data)
.enter()
.append('rect')
.attr('class', 'bar')
.on('mouseover', (e) => {
    const date = e.target.attributes['data-date'].value
    const gdp = e.target.attributes['data-gdp'].value
    const x = e.target.attributes['x'].value
    const heightRect = e.target.attributes['height'].value
    console.log(e)
    d3.select('#tooltip')
    .style('visibility', 'visible')
    .attr('data-date', date)
    .attr('data-gdp', gdp)
    .style('top', `${e.clientX} + 20px`)
    .style('left', `${e.clientY  + 20}px`)
    .style('transform', `translate(${x-387}px, ${-padding-heightRect-100}px`)
    .html(`Date: ${date} \n GDP: ${gdp}`)
    
})
.on('mouseleave', (e) => {
    d3.select('#tooltip')
    .style('visibility', 'hidden')
})
.attr('data-date', (d) => d[0])
.attr('data-gdp', (d) => d[1])
.attr('width', 3)
.attr('height', (d) => height - padding - scaleY(d[1]))
.attr('x', (d) => scaleX(new Date(d[0])))
.attr('y', (d) => scaleY(d[1]))
