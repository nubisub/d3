const source = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

// function to fetch data from source
const fetchData = (source) => {
	return new Promise((resolve, reject) =>
		fetch(source)
			.then((res) => res.json())
			.then((data) => resolve(data))
			.catch((err) => reject(err))
	);
};

// function to get data from source
const makeChart = async () => {
	const data = await fetchData(source);
    return data.data;
};

window.onload = async () => {
	let dataset = await makeChart();

	// get the max and min values of the dataset
	const max = d3.max(dataset, (d) => d[1]);
	const min = d3.min(dataset, (d) => d[1]);


	const w = 950;
	const h = 350;
	padding = 40;

	// create the svg element
	const svg = d3
		.select("#chart")
		.append("svg")
		.attr("width", w)
		.attr("height", 400);

	// create the Bar Chart
	svg
		.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("data-date", (d) => d[0])
		.attr("data-gdp", (d) => d[1])
		.attr("class", "bar")
		.attr("x", (d, i) =>i * ((w-40) / dataset.length))
		.attr("y", h)
		.attr("width", (w-40) / dataset.length)
		.attr("fill", "teal")	
		.attr("transform", "translate(40,0)");

	// create the Scale for the Labels
	const xScale = d3.scaleLinear().domain([1947, 2016]).range([padding, w ]);
	const yScale = d3.scaleLinear().domain([0, max]).range([h, 0]);
	
	// create X axis
	svg
		.append("g")
		.attr("id", "x-axis")
		.attr("transform", `translate(0, ${h})`)
		.call(d3.axisBottom(xScale))
		.selectAll("text")
		.attr("class", "tick")
		.style("text-anchor", "end")
		.attr("dx", "-.8em")
		.attr("dy", "-.55em")
		.attr("transform", "rotate(-30) translate(8, 15)")
		.text(function (d, i) {
			let temp = d.toString();
			let clean = temp.replace(/,/g, "");
			return clean;
		});

	// create Y axis
	svg
		.append("g")
		.attr("id", "y-axis")
		.attr("transform", "translate(" + padding + ",0)")
		.call(d3.axisLeft(yScale))
		.append("text")
		.attr("class", "tick")
		.attr("fill", "#000")
		.attr("transform", "rotate(-90) translate(-30, 0)")
		.attr("y", 6)
		.attr("dy", "1em")
		.attr("text-anchor", "end")
		.text("Gross Domestic Product")
		.attr("class", "axis-label")
		.attr("font-size", "1.5em");
		
	// Create transition for the bars
	svg
		.selectAll("rect")
		.transition()
		.duration(800)
		.attr("y", (d) => h - (d[1] / (max - min)) * (h - 40))
		.attr("height", (d) => (d[1] / (max - min)) * (h - 40))
		.delay(function (d, i) {
			return i * 10/ dataset.length;
		});

		// create the tooltip
		const tooltip = d3
			.select("body")
			.append("div")
			.attr("id", "tooltip")
			.style("opacity", 0);
		

		d3
			.selectAll("rect")
			.on("mouseover", function (d) {
				tooltip
					.transition()
					.duration(200)
					.style("opacity", 1);
				tooltip
					.html(`${d[0]}<br>$${d[1]}`)
					.style("left", d3.event.pageX + 10+ "px")
					.style("top", h+20 + "px")
					.attr("data-date", d[0])
					.attr("data-gdp", d[1]);
			}
			)
			.on("mouseout", function (d) {
				tooltip
					.transition()
					.duration(500)
					.style("opacity", 0);
			}
			);




};