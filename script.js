var width = 960,
    height = 500,
    centered;

var projection = d3.geo.albersUsa()
    .scale(width)
    .translate([0, 0]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
	.attr("class", "fullSVG")
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
window.focusOn = "ALL";
window.rangeMin = 0;
window.rangeMax = 40;

var stateThenYearAvg = [];

var yearThenCountyThenCoordsAndRate = [];

/*var theCallback = function (){
	alert("A");
};*/

var circles = svg.append("svg:g")
    .attr("id", "circles");

var stateName = svg.append("text")
	.attr("x", width/2)
    .attr("y", 50)
    .attr("dy", ".35em") // vertical-align: middle
    .attr("text-anchor", "end") // text-align: right
	.style("opacity",0.0)
    .text("");

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

d3.csv("state_unemployment_data.csv", function(states) {
	
	states.forEach(function(stateEntry) {
		var year = +stateEntry.year,
			stateAbbr = stateEntry.state,
			rate = +stateEntry.rate;
			
		stateToInsertInto = stateThenYearAvg[stateAbbr] || (stateThenYearAvg[stateAbbr] = []);
		stateToInsertInto[year] = rate;
		
		//links = linksByOrigin[origin] || (linksByOrigin[origin] = []);		
		//links.push({source: origin, target: destination});
		//countByAirport[origin] = (countByAirport[origin] || 0) + 1;
		//countByAirport[destination] = (countByAirport[destination] || 0) + 1;
	});

	
	
});





/*d3.csv("county_unemployment_data_small.csv", function(counties) {
	var shouldShow = [];
    var positions = [];


    counties = counties.filter(function(county) {
        var location = [+county.longitude, +county.latitude];
        positions.push(projection(location));
        return true;
    });



	circles.selectAll("circle")
        .data(counties)
        .enter().append("svg:circle")
        .attr("cx", function(d, i) { return positions[i][0]; })
        .attr("cy", function(d, i) { return positions[i][1]; })
		.attr("display", function(d,i) { return "none"; } )
		.attr("year", function(d,i) {return +d.year;})
		.attr("state", function(d, i) { return d.state; }) //Prints out state
		.attr("rate", function(d,i) { return +d.rate; })
        .attr("r", function(d, i) { return 5; });
});*/


















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
	
	/*circles.selectAll("circle")
	.attr("state", function(d) {
		if (d3.select(this).attr("state") == state && d3.select(this).attr("year") == year){
			runningTotal += +d3.select(this).attr("rate");
			totalAdded++;
		}
		return d3.select(this).attr("state");
	});
	
	if(totalAdded == NaN || totalAdded < 1){
		totalAdded = 1;
	}
	return runningTotal/totalAdded;*/
	
	return stateThenYearAvg[state][year];
}


function yearChanged(yearToColor) {
	window.yearToColor = yearToColor;

	//g.selectAll("path")
	//	.classed("active", centered && function(d) { if (d===centered){ window.clickedState = d3.select(this).attr("stateabbr");} return d === centered; });

	if (window.focusOn == "ALL"){ //Repaint all states, remove counties
		g.selectAll("path")
			//.transition().duration(1000)
			.style("fill", function(d,i) {
				
				var stateAvg = findAvgForStateAndYear(yearToColor, d3.select(this).attr("stateabbr"));	
				var color = d3.scale.linear()
				  .domain([0, 10, 20, 30])
				  .range(["blue", "yellow", "orange", "red"]);
			
				if (stateAvg >= window.rangeMin && stateAvg <= window.rangeMax)
					return color(stateAvg);
				else
					return "#aaa";
	
				/*if (stateAvg < 20){
					return "#00F";
				}
				else {
					return "#F00";
				}*/
			
			});
		
		svg.selectAll("text")
			.transition().duration(1000)
			.style("opacity",0.0);
	}
	else { //Zoomed in on state -- repaint all states grey, remove all counties (if any), and recreate counties
		g.selectAll("path")
			.transition().duration(1000)
			.style("fill", function(d,i) {if (d3.select(this).attr("stateabbr") == window.focusOn)return "#aaa"; return "#EEE";});
			
		svg.selectAll("text")
		    .attr("dy", ".35em")
		    .attr("text-anchor", "end")
		    .text(window.focusOn+": "+Math.round(findAvgForStateAndYear(window.yearToColor,window.focusOn)*100)/100 +"%")
			.transition().duration(1000)
			.style("opacity",1.0);
					
		circles.selectAll("circle") //Scale circles according to unemployment
			.attr("r", function(d, i) { return d3.select(this).attr("years").split(',')[window.yearToColor-1992]; /*return 5;*/ })
			.style("display", function(d,i) { if(d3.select(this).attr("years").split(',')[window.yearToColor-1992] >= rangeMin && 
												d3.select(this).attr("years").split(',')[window.yearToColor-1992] <= rangeMax) return "block"; else return "none";});
	
	}	
}

function rangeChanged(min,max) {
	window.rangeMin = min;
	window.rangeMax = max;
	yearChanged(window.yearToColor);
}



function cacheState(inState){
	yearThenCountyThenCoordsAndRate = [];
	
	
	//WAIT--Make circle for each county, have as attributes the rates from 1992 to 2011-then tween between the values on slider change
	
	/*d3.csv("county_unemployment_data_small.csv", function(counties) {
		counties.forEach(function(county) {
			if (county.state != inState)
				continue;
			
			var name = county.county,
				year = +county.year,
				latitude = +county.latitude,
				longitude = +county.longitude,
				rate = +county.rate;
			
			yearToInsertInto = yearThenCountyThenCoordsAndRate[year] || (yearThenCountyThenCoordsAndRate[year] = []);
			yearToInsertInto[name] = rate;

			//links = linksByOrigin[origin] || (linksByOrigin[origin] = []);		
			//links.push({source: origin, target: destination});
			//countByAirport[origin] = (countByAirport[origin] || 0) + 1;
			//countByAirport[destination] = (countByAirport[destination] || 0) + 1;
		});
	});*/
	
	circles.selectAll("circle")
	    .data([])
		.exit()
		.remove();
	
	d3.csv("county_unemployment_data_mod.csv", function(counties) {
		
	    var runningCounties = [];

	    counties = counties.filter(function(county) {
	        //var location = [+county.longitude, +county.latitude];
	        //positions.push(projection(location));
			if (county.state == inState){
				//alert("G");
				if (runningCounties[county.county] == undefined){
					//alert("AA"+county.year);
					runningCounties[county.county] = [];
					runningCounties[county.county][+county.year] = +county.rate;
	        		return true;
				} else {
					runningCounties[county.county][+county.year] = +county.rate;
				}
			}
			return false;
	    });



		circles.selectAll("circle")
	        .data(counties)
	        .enter().append("svg:circle")
	        .attr("cx", function(d, i) { return projection([+d.longitude,+d.latitude])[0]; })
	        .attr("cy", function(d, i) { return projection([+d.longitude,+d.latitude])[1]; })
			.attr("years", function(d, i) { return (runningCounties[d.county]).slice(1992,2012); })/*.attr("year1993", function(d, i) { return runningCounties[d.county][1993]; })
			.attr("year1994", function(d, i) { return runningCounties[d.county][1994]; }).attr("year1995", function(d, i) { return runningCounties[d.county][1995]; })
			.attr("year1996", function(d, i) { return runningCounties[d.county][1996]; }).attr("year1997", function(d, i) { return runningCounties[d.county][1997]; })
			.attr("year1998", function(d, i) { return runningCounties[d.county][1998]; }).attr("year1999", function(d, i) { return runningCounties[d.county][1999]; })
			.attr("year2000", function(d, i) { return runningCounties[d.county][2000]; }).attr("year2001", function(d, i) { return runningCounties[d.county][2001]; })
			.attr("year2002", function(d, i) { return runningCounties[d.county][2002]; }).attr("year2003", function(d, i) { return runningCounties[d.county][2003]; })
			.attr("year2004", function(d, i) { return runningCounties[d.county][2004]; }).attr("year2005", function(d, i) { return runningCounties[d.county][2005]; })
			.attr("year2006", function(d, i) { return runningCounties[d.county][2006]; }).attr("year2007", function(d, i) { return runningCounties[d.county][2007]; })
			.attr("year2008", function(d, i) { return runningCounties[d.county][2008]; }).attr("year2009", function(d, i) { return runningCounties[d.county][2009]; })
			.attr("year2010", function(d, i) { return runningCounties[d.county][2010]; }).attr("year2011", function(d, i) { return runningCounties[d.county][2011]; })*/
			.attr("name", function(d, i) { /*alert(d3.select(this).attr("year1992").split(',')[0]);*/ return d.county; })
			//.attr("display", function(d,i) { return "none"; } )
			//.attr("year", function(d,i) {return +d.year;})
			.attr("state", function(d, i) { return d.state; })
			//.attr("rate", function(d,i) { return +d.rate; })
	        .attr("r", function(d, i) { return d3.select(this).attr("years").split(',')[window.yearToColor-1992]; /*return 5;*/ });
	});
	
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
		.classed("active", centered && function(d) { if (d===centered){ window.focusOn = d3.select(this).attr("stateabbr");} return d === centered; });
	
	
	if (centered != null){
		
		circles.selectAll("circle")
			.attr("display", function(d,i) { if (window.focusOn == d3.select(this).attr("state") && centered){$(this).css("opacity",1.0); return "block";} else return "none"; } )
		
		circles.transition()
			.duration(1000)
			.attr("transform", "translate(" + x*2 + "," + y*2 + ")")
			.style("opacity", function(d,i) { if (window.focusOn == d3.select(this).attr("state") && centered)return 1.0; else return 1.0; });
			
		cacheState(window.focusOn);
	}
	else {
		window.focusOn = "ALL";
		
		circles.transition()
			.duration(1000)
			.attr("transform", "translate(" + x*2 + "," + y*2 + ")")
			.style("opacity",0.0);
			
		/*.each("end", function(){ $(this).css("display","none"); });*/
	}
	
	yearChanged(window.yearToColor);

	g.transition()
		.duration(1000)
		.attr("transform", "scale(" + k + ")translate(" + x + "," + y + ")")
		.style("stroke-width", 1.5 / k + "px");
}