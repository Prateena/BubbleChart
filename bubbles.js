(function(){
	var width = 1200,
	   height = 500;

var svg = d3.select("#chart")
            .append("svg")
            .attr("height", height)
            .attr("width", width)
            .append("g")
            .attr("transform", "translate(0,0)")

            var radiusScale = d3.scaleSqrt().domain([6, 283]).range([2, 25])

 
 var simulation = d3.forceSimulation()
     .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05))
      .force("collide", d3.forceCollide(function(d)
            	{
            		return radiusScale(d.sales);
            	}))

            d3.queue()
            .defer(d3.csv, "sales1.csv")
            .await(ready)

            function ready(error, datapoints) {
            
            	var circles = svg.selectAll(".artist")
            	.data(datapoints)
            	.enter().append("circle")
            	.attr("class", "artist")
            	.attr("r", function(d)
            	{
            		return radiusScale(d.sales);
            	})
    
            	.attr("fill", function(d){
            		var sales = d.sales
            		if(sales<=50)
            			return "white"
            		if(sales>50 && sales<=100)
            			return "Green"
            		if(sales > 100 && sales <= 200)
            			return "Red"
            		if(sales > 200)
            			return "Purple"
            	})



            

    simulation.nodes(datapoints)
              .on('tick', ticked)
    
    function ticked() {
    	circles
    	.attr("cx",function(d) {
    		return d.x
    	})
        .attr("cy", function(d) {
        	return d.y
        })
    }        
            }
})();