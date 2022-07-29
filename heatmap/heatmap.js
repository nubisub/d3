const source =
	"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

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
	data = dataset.monthlyVariance;
	const baseTemp = dataset.baseTemperature;

	let year = dataset.monthlyVariance.map((item) => item.year);

	year = [...new Set(year)];
	// make year to string
	year = year.map((item) => item.toString());

	var month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	let value = dataset.monthlyVariance.map((item) => {
		let temp = item.variance + baseTemp;
		temp = temp.toFixed(2);
		return temp;
	});

	// make key and value from month variance dataset
	let value1 = dataset.monthlyVariance.map((item, index) => {
		return {
			key: item.month,
			value: item.variance,
		};
	});

	var arrayValue = [];
	var arrayTemp = [];

	var arrayValue2 = [];
	var arrayTemp2 = [];

	for (let index = 0; index < value.length; index++) {
		arrayTemp.push(value[index]);
		if (index % 12 == 11 || index == value.length - 1) {
			arrayValue.push(arrayTemp);
			arrayTemp = [];
		}
	}

	for (let index1 = 0; index1 < 12; index1++) {
		for (let index = 0; index < arrayValue.length; index++) {
			arrayTemp2.push(arrayValue[index][index1]);
		}
		arrayValue2.push(arrayTemp2);
		arrayTemp2 = [];
	}

	var data = [
		{
			z: arrayValue2,
			y: month,
			x: year,
			type: "heatmap",
			hoverongaps: false,
			hovertemplate:
				"<i>Year</i>: %{x}" +
				"<br><i>Month</i>: %{y}" +
				"<br><i>Temperature</i>:<b>%{z}</b><extra></extra>",
		},
	];
	var layout = {
		title: {
			text: "Monthly Global Land-Surface Temperature 1753 - 2015: base temperature 8.66℃",

			font: {
				family: "Roboto, monospace",
				size: 24,
			},
			xref: "paper",
			x: 0.05,
		},
		xaxis: {
			title: {
				text: "Year",
			},
		},
		yaxis: {
			title: {
				text: "Month",
			},
		},
		autosize: false,
		width: 1300,
		height: 600,
	};
	var config = {
		responsive: true,
		displayModeBar: false,
		scrollZoom: true,
		displayModeBar: false,
	};

	Plotly.newPlot("myDiv", data, layout, config);
};
