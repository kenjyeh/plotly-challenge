var dropdown = d3.select("#selDataset");

d3.selectAll("#selDataset").on("change", getData )


//create getData function to call on 
function getData(){
//load json file and console log to check
d3.json("samples.json").then((data)=> {
     console.log(data)


//grab id names
var names = data.names
console.log(names)
 
names.forEach(function(name) {
     
dropdown.append("option").text(name).property("value")})
//select userInput Variable and dropdownMenu selection
var dropdownMenu = d3.select("#selDataset");
var userInput = dropdownMenu.property("value");

//getting Demographic data
var demo_data=data.metadata.filter(meta=>meta.id.toString() === userInput)
console.log(demo_data)
//Creating demo_info
var demo_info = d3.select("#sample-metadata")
demo_info.html("")
demo_info.append("h5").text(`ID: ${userInput}`)
demo_info.append("h5").text(`Gender:${demo_data[0].gender}`);
demo_info.append("h5").text(`Ethnicity:${demo_data[0].ethnicity} `);
demo_info.append("h5").text(`Age:${demo_data[0].age} `);
demo_info.append("h5").text(`Location:${demo_data[0].location} `);
demo_info.append("h5").text(`Belly Button Type:${demo_data[0].bbtype}`);
demo_info.append("h5").text(`wfreq: ${demo_data[0].wfreq}`);


//set filtered data dn filtered ID 
var filteredData= data.samples.filter(id => id.id === userInput)
console.log(filteredData)

var filteredID = filteredData.map(id=>id.otu_ids)
console.log(filteredID)

//Getting sample values

var filteredSample = filteredData.map(sample=>sample.sample_values)
console.log(filteredSample)

// creating TOp 10 OTU Id's
var slicedID = filteredID[0].slice(0,10).reverse()
var labels = slicedID.map(d=>"OTU " + d)
console.log(labels)
// creaitng lables for y axis
var slicedSample = filteredSample[0].slice(0,10).reverse()
console.log(slicedID)
console.log(slicedSample)


//creating traces for bar graphs
var trace1={
    x: slicedSample,
    y: labels, 
    text: slicedID, 
    type: "bar",
    orientation: "h"
};


var data = [trace1];

var layout = {
    title: "Top 10 OTU ID's", 
    margin: {
        l:100,
        r:100,
        t:100,
        b:100
    }
}



Plotly.newPlot("bar", data,layout)


// Bubble Chart 
var trace2 = {
    x: slicedID,
    y: slicedSample,
    mode: 'markers',
    marker: {
      size: slicedSample,
      color: ['rgb(128, 0, 0)', 'rgb(245, 130, 48)',  'rgb(250, 190, 212)', 'rgb(210, 245, 60)','rgb(170, 255, 195)', 'rgb(70, 240, 240)',  'rgb(0, 130, 200)', 'rgb(145, 30, 180)', 'rgb(128, 128, 128)']
    }
  };
  
  var data1 = [trace2];
  
  var layout = {
    title: 'Marker Size',
    showlegend: false,
    height: 600,
    width: 1300
  };
  
  Plotly.newPlot('bubble', data1, layout);

})}

getData()