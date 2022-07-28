const source = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"

const fetchData = (source) => {
	return new Promise((resolve, reject) =>
		fetch(source)
			.then((res) => res.json())
			.then((data) => resolve(data))
			.catch((err) => reject(err))
	);
};

const makeChart = async () => {
	const data = await fetchData(source);
    return data.data;
}

window.onload = async () => {
	let dataset = await makeChart();

	const max = d3.max(dataset, (d) => d[1]);
	const min = d3.min(dataset, (d) => d[1]);

	const w = 950;
	const h = 350;
	padding = 40;

	const svg = d3
		.select("#chart")
		.append("svg")
		.attr("width", w)
		.attr("height", 400);


	svg
		.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", (d, i) =>i * ((w-40) / dataset.length))
		// .attr("y", (d) =>  h - ((d[1] / (max - min) * (h-40))))
		.attr("y",h)
		.attr("width", (w-40) / dataset.length)
		// .attr("height", (d) =>  (((d[1]) / (max - min ) * (h-40)))	 )
		.attr("fill", "teal")	
		.attr("transform", "translate(40,0)")

		const xScale = d3.scaleLinear().domain([1947, 2016]).range([padding, w ]);
		const yScale = d3.scaleLinear().domain([0, max]).range([h, 0]);
		
		svg
			.append("g")
			.attr("transform", `translate(0, ${h})`)
			.call(d3.axisBottom(xScale))
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", "-.55em")
			.attr("transform", "rotate(-30) translate(8, 15)")
			.text(function (d, i) {
				let temp = d.toString();
				let clean = temp.replace(/,/g, "");
				return clean;
			});
			// replace , with space
			

		svg
			.append("g")
			.attr("transform", "translate(" + padding + ",0)")
			.call(d3.axisLeft(yScale))
			.append("text")
			.attr("fill", "#000")
			.attr("transform", "rotate(-90) translate(-30, 0)")
			.attr("y", 6)
			.attr("dy", "1em")
			.attr("text-anchor", "end")
			.text("Gross Domestic Product")
			.attr("class", "axis-label")
			.attr("font-size", "1.5em");
			
		svg
			.selectAll("rect")
			.transition()
			.duration(800)
			.attr("y", (d) => h - (d[1] / (max - min)) * (h - 40))
			.attr("height", (d) => (d[1] / (max - min)) * (h - 40))
			.delay(function (d, i) {
				return i * 10/ dataset.length; ;
			});


			svg
				.selectAll("text")
				

};