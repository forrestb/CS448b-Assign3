var width = 960,
    height = 500,
    centered;

var projection = d3.geo.albersUsa()
    .scale(width)
    .translate([0, 0]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var projection = d3.geo.albersUsa()
    //.mode("equidistant")
    //.origin([960*2, 38])
    .scale(960*2);
    //.translate([960*2, 500*2]);

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", click);

var g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
  .append("g")
    .attr("id", "states");

window.yearToColor = 2005;

/*var theCallback = function (){
	alert("A");
};*/

var circles = svg.append("svg:g")
    .attr("id", "circles");

d3.json("uspolitical.json", function(json) {
  g.selectAll("path")
      .data(json.features)
      .enter().append("path")
      .attr("d", path)
	  .attr("stateabbr", function(d, i) { /*alert(d.properties.abbr);*/ return d.properties.abbr;/*"Me!"+i;*/ }) //Prints out state
      .on("click", click);




	/*circles.selectAll("circle")
        .data(airports)
      .enter().append("svg:circle")
        .attr("cx", function(d, i) { return positions[i][0]; })
        .attr("cy", function(d, i) { return positions[i][1]; })
        .attr("r", function(d, i) { return Math.sqrt(countByAirport[d.iata]); })
        .sort(function(a, b) { return countByAirport[b.iata] - countByAirport[a.iata]; });*/

});

d3.csv("county_unemployment_data_small.csv", function(counties) {
	var shouldShow = [];
    var positions = [];


    counties = counties.filter(function(county) {
      //if (countByAirport[count.iata]) {
        var location = [+county.longitude, +county.latitude];
        //locationByAirport[airport.iata] = location;
        positions.push(projection(location));
		//shouldShow.push(+county.year);

		//projection(location)


        return true;
      //}
    });



	circles.selectAll("circle")
        .data(counties)
        .enter().append("svg:circle")
        .attr("cx", function(d, i) { return positions[i][0]; })
        .attr("cy", function(d, i) { return positions[i][1]; })
		.attr("display", function(d,i) { /*if(shouldShow[i] != 1900)*/ return "none"; } )
		.attr("year", function(d,i) {return +d.year;})
		.attr("state", function(d, i) { return d.state; }) //Prints out state
		.attr("rate", function(d,i) { return +d.rate; })
        .attr("r", function(d, i) { return 5; });
        //.sort(function(a, b) { return countByAirport[b.iata] - countByAirport[a.iata]; });






		/*var state = d3.selectAll('path').attr('fill', function(d){
			var abbr = this.id;
			$.each(state_data, function(key, data){
				if(data.state_abbr == abbr){
					state_president = data.president;
				}
			})
			// Return colors
			// based on data					
			if(state_president == "Obama"){
				return "blue"
			}
			else if(state_president == "McCain"){
				return "red"
			}
			else {
				return "#CCC"
			}
		});*/






});


















/*d3.csv("flights-airport.csv", function(flights) {
  var linksByOrigin = {},
      countByAirport = {},
      locationByAirport = {},
      positions = [];

  var arc = d3.geo.greatArc()
      .source(function(d) { return locationByAirport[d.source]; })
      .target(function(d) { return locationByAirport[d.target]; });

  flights.forEach(function(flight) {
    var origin = flight.origin,
        destination = flight.destination,
        links = linksByOrigin[origin] || (linksByOrigin[origin] = []);
    links.push({source: origin, target: destination});
    countByAirport[origin] = (countByAirport[origin] || 0) + 1;
    countByAirport[destination] = (countByAirport[destination] || 0) + 1;
  });

  d3.csv("airports.csv", function(airports) {

    // Only consider airports with at least one flight.
    airports = airports.filter(function(airport) {
      if (countByAirport[airport.iata]) {
        var location = [+airport.longitude, +airport.latitude];
        locationByAirport[airport.iata] = location;
        positions.push(projection(location));
        return true;
      }
    });

    // Compute the Voronoi diagram of airports' projected positions.
    var polygons = d3.geom.voronoi(positions);

    var g = cells.selectAll("g")
        .data(airports)
      .enter().append("svg:g");

    g.append("svg:path")
        .attr("class", "cell")
        .attr("d", function(d, i) { return "M" + polygons[i].join("L") + "Z"; })
        .on("mouseover", function(d, i) { d3.select("h2 span").text(d.name); });

    g.selectAll("path.arc")
        .data(function(d) { return linksByOrigin[d.iata] || []; })
      .enter().append("svg:path")
        .attr("class", "arc")
        .attr("d", function(d) { return path(arc(d)); });

    circles.selectAll("circle")
        .data(airports)
      .enter().append("svg:circle")
        .attr("cx", function(d, i) { return positions[i][0]; })
        .attr("cy", function(d, i) { return positions[i][1]; })
        .attr("r", function(d, i) { return Math.sqrt(countByAirport[d.iata]); })
        .sort(function(a, b) { return countByAirport[b.iata] - countByAirport[a.iata]; });
  });
});*/

function findAvgForStateAndYear(year, state){
	var runningTotal = 0;
	var totalAdded = 0;
	
	circles.selectAll("circle")
	.attr("state", function(d) {
		if (d3.select(this).attr("state") == state && d3.select(this).attr("year") == year){
			runningTotal += +d3.select(this).attr("rate");
			totalAdded++;
		}
		/*else {
			alert(d3.select(this).attr("state"));
			alert(state);
			alert(d3.select(this).attr("year"));
			alert(year);
		}*/
		return d3.select(this).attr("state");
	});
	
	if(totalAdded == NaN || totalAdded < 1){
		totalAdded = 1;
	}
	//alert(runningTotal+","+totalAdded);
	//alert(runningTotal/totalAdded);
	return runningTotal/totalAdded;
}


function colorAllStatesForYear(yearToColor) {
	if (window.yearToColor != yearToColor){
		window.yearToColor = yearToColor;
		
		//g.selectAll("path")
		//	.classed("active", centered && function(d) { if (d===centered){ window.clickedState = d3.select(this).attr("stateabbr");} return d === centered; });
		
		
		g.selectAll("path")
		.style("fill", function(d,i) {
		
			var stateAvg = findAvgForStateAndYear(yearToColor, d3.select(this).attr("stateabbr"));
			
			var color = d3.scale.linear()
			  .domain([0, 15, 30])
			  .range(["red", "yellow", "blue"]);
			
			//alert(stateAvg);
			
			return color(stateAvg);
			
			/*if (stateAvg < 20){
				return "#00F";
			}
			else {
				return "#F00";
			}*/
		
			//d3.select(this).attr("state") && centered)return 1.0; else return 1.0;
			
			
		});
		
		
		
	}
}







function click(d) {
	var x = 0,
	    y = 0,
	    k = 1;

	if (d && centered !== d) {
		var centroid = path.centroid(d);
		x = -centroid[0];
		y = -centroid[1];
		k = 2;
		centered = d;
	} else {
		centered = null;
	}

	g.selectAll("path")
		.classed("active", centered && function(d) { if (d===centered){ window.clickedState = d3.select(this).attr("stateabbr");} return d === centered; });



	//circles.selectAll("circle")
	//	.attr("display", function(d,i) { /*alert(d3.select(this).attr("state").length);*/ if (window.clickedState == d3.select(this).attr("state") && centered)return "block"; else return "none"; } )
	
		//alert(g.selectAll("path").attr("secret", function(d) { return d == "Me!2"; }));

	if (centered != null){
		
		circles.selectAll("circle")
			.attr("display", function(d,i) { if (window.clickedState == d3.select(this).attr("state") && centered){$(this).css("opacity",1.0); return "block";} else return "none"; } )
		
		
		circles.transition()
			.duration(1000)
			.attr("transform", "translate(" + x*2 + "," + y*2 + ")")
			.style("opacity", function(d,i) { if (window.clickedState == d3.select(this).attr("state") && centered)return 1.0; else return 1.0; });
			
			
			//.style("opacity",1).each("end", theCallback);
	}
	else {
		
		//circles.selectAll("circle")
		//	.style("opacity", function(d,i) { if (window.clickedState == d3.select(this).attr("state") && centered)return 1.0; else return 0.0; } )
		
		circles.transition()
			.duration(1000)
			.attr("transform", "translate(" + x*2 + "," + y*2 + ")")
			.style("opacity",0.0);
			
			/*.each("end", function(){ $(this).css("display","none"); });*/
	}


	g.transition()
		.duration(1000)
		.attr("transform", "scale(" + k + ")translate(" + x + "," + y + ")")
		.style("stroke-width", 1.5 / k + "px");
}