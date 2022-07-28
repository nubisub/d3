const source =
	"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

// function to fetch data from source
const fetchData = (source) => {
    return new Promise((resolve, reject) =>
			fetch(source)
				.then((res) => res.json())
				.then((data) => resolve(data))
				.catch((err) => reject(err))
		);

};

window.onload = async () => {
    let dataset = await fetchData(source);

    let margin = 50;
    let width = 1000;
    let height = 500;

    const maxS = d3.max(dataset, (d) => d.Seconds)/60;
    const minS = d3.min(dataset, (d) => d.Seconds)/60;
    let maxsvg = height - margin - 120;

    const maxY = d3.max(dataset, (d) => d.Year);
    const minY = d3.min(dataset, (d) => d.Year);
	const y = d3.scaleLinear().domain([minS, maxS]).range([ 0, maxsvg]);
	const x = d3.scaleLinear().domain([minY-1, maxY+1]).range([ 0,width-margin-40]);

    // create the svg element
    let svg = d3
                .select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("class", "chart");

    // Main Title
    svg
        .append("text")
        .text("Doping in Professional Bicycle Racing")
        .attr("id", "title")
        .attr("x", width / 2)
        .attr("y", margin + 10)
        .style("font-size", "30px")
        .attr("text-anchor", "middle")
        .style("color", "black")
        .style("display", "block");

    // Subtitle
    svg
        .append("text")
        .text("35 Fastest times up Alpe d'Huez")
        .attr("id", "title")
        .attr("x", width / 2)
        .attr("y", margin + 10 + 30)
        .style("font-size", "20px")
        .attr("text-anchor", "middle")
        .style("color", "black");
    
    // Create Dots
    svg
			.selectAll("circle")
			.data(dataset)
			.enter()
			.append("circle")
			.attr("class", "dot")
			.attr("cx", (d) => {
				return -60;
			})
			.attr("cy", (d) => {
				return y(d.Seconds / 60);
			})
			.attr("r", 7)
			.attr("fill", (d) => {
				return d.Doping ? "#F38181" : "#364F6B";
			})
			.attr("transform", "translate(" + margin + "," + 120 + ")")
            .attr("data-xvalue", (d) => {return d.Year;})
            .attr("data-yvalue", (d) => {return d.Time;});

    // Create X Axis
    svg
			.append("g")
			.attr("id", "x-axis")
			.attr("opacity", "0")
			.attr("transform", "translate(" + margin + "," + (height - margin) + ")")
			.call(d3.axisBottom(x))
			.selectAll("text")
			.attr("transform", "translate(-10,0)rotate(-45)")
			.style("text-anchor", "end")
			.text(function (d, i) {
				let temp = d.toString();
				let clean = temp.replace(/,/g, "");
				return clean;
			});

// Create Y Axis
    svg
        .append("g")
        .attr("id", "y-axis")
        .attr("transform", "translate(" + margin + ","+120+")")
        .call(d3.axisLeft(y))
        .selectAll("text")
        // .attr("transform", "translate(0,-10)rotate(-45)")
        .style("text-anchor", "end")
        .text(function (d, i) {
			let temp = d.toFixed(2).toString();
			var response = temp.substring(0, temp.indexOf("."));
            var response1 = temp.substring(temp.indexOf("."));
            let Seconds = response1 * 60;
            Seconds < 10 ? Seconds += "0" : Seconds;
   

			return response + ":" + Seconds;
		});
        

    let tooltip = d3
        .select("body")
        .append("div")
        .attr("id", "tooltip")
        .style("opacity", 0);

            
	// hober the bar when the mouse is over it
	d3
		.selectAll("circle")
		.on("mouseover", function (d) {
			tooltip
				.transition()
				.duration(200)
				.style("opacity", 1);
			tooltip
				.html(
					`${d.Name}:${d.Nationality}<br>Year:${d.Year} Time:${(
						d.Seconds / 60
					).toFixed(2)}<br><br> ${d.Doping}`
				)
				.style("left", d3.event.pageX + 15 + "px")
				.style("top", d3.event.pageY + 15 + "px")
				.attr("data-year", d.Year)
		}
		)
		.on("mouseout", function (d) {
			tooltip
				.transition()
				.duration(500)
				.style("opacity", 0);
		}
		);

        let legend = svg
            .append("g")
            .attr("id", "legend")

        legend
            .append("rect")
            .attr("x", width - margin)
            .attr("y", height - 250)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", "#364F6B")
            .attr("stroke", "black")
            .attr("stroke-width", 1);

        legend
            .append("text")
            .attr("x", width - margin - 100 -40)
            .attr("y", height - 250 + 12    )
            .text("No doping allegations")
            .style("font-size", "15px")
            .style("color", "#364F6B");
        
        legend
            .append("rect")
            .attr("x", width - margin)    
            .attr("y", height - 250 + 30)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", "#F38181")
            .attr("stroke", "black")
            .attr("stroke-width", 1);

        legend
					.append("text")
					.attr("x", width - margin - 100 - 90)
					.attr("y", height - 250 + 12 +30)
					.text("Riders with doping allegations")
					.style("font-size", "15px")
					.style("color", "#F38181");




 svg
		.select("#x-axis")
		.transition()
		.duration(2000)
		.attr("opacity", "1")
		.call(d3.axisBottom(x));

 svg
		.selectAll("circle")
		.transition()
		.delay(function (d, i) {
			return i * 3;
		})
		.duration(2000)
		.attr("cx", function (d) {
			return x(d.Year);
		})
		.attr("cy", function (d) {
			return y(d.Seconds/60);
		});




};