import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveTreeMap } from "@nivo/treemap";
import { useEffect } from "react";

const source =
	"https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

	
const fetchData = (source) => {
	return new Promise((resolve, reject) =>
		fetch(source)
			.then((res) => res.json())
			.then((res) => res.children)
			.then((data) => resolve(data))
			.catch((err) => reject(err))
	);
};

// const dataset = await fetchData(source);
// console.log(dataset);


const data = {
	name: "nivo",
	color: "hsl(206, 70%, 50%)",
	children: [
		{
			name: "viz",
			color: "hsl(187, 70%, 50%)",
			children: [
				{
					name: "stack",
					color: "hsl(295, 70%, 50%)",
					children: [
						{
							name: "cchart",
							color: "hsl(301, 70%, 50%)",
							loc: 42554,
						},
						{
							name: "xAxis",
							color: "hsl(74, 70%, 50%)",
							loc: 62277,
						},
						{
							name: "yAxis",
							color: "hsl(221, 70%, 50%)",
							loc: 78496,
						},
						{
							name: "layers",
							color: "hsl(176, 70%, 50%)",
							loc: 140654,
						},
					],
				},
				{
					name: "ppie",
					color: "hsl(161, 70%, 50%)",
					children: [
						{
							name: "chart",
							color: "hsl(344, 70%, 50%)",
							children: [
								{
									name: "pie",
									color: "hsl(120, 70%, 50%)",
									children: [
										{
											name: "outline",
											color: "hsl(40, 70%, 50%)",
											loc: 49869,
										},
										{
											name: "slices",
											color: "hsl(264, 70%, 50%)",
											loc: 17105,
										},
										{
											name: "bbox",
											color: "hsl(201, 70%, 50%)",
											loc: 70984,
										},
									],
								},
								{
									name: "donut",
									color: "hsl(282, 70%, 50%)",
									loc: 194330,
								},
								{
									name: "gauge",
									color: "hsl(169, 70%, 50%)",
									loc: 175575,
								},
							],
						},
						{
							name: "legends",
							color: "hsl(61, 70%, 50%)",
							loc: 125193,
						},
					],
				},
			],
		},
		{
			name: "colors",
			color: "hsl(167, 70%, 50%)",
			children: [
				{
					name: "rgb",
					color: "hsl(295, 70%, 50%)",
					loc: 23227,
				},
				{
					name: "hsl",
					color: "hsl(295, 70%, 50%)",
					loc: 155103,
				},
			],
		},
		{
			name: "utils",
			color: "hsl(107, 70%, 50%)",
			children: [
				{
					name: "randomize",
					color: "hsl(183, 70%, 50%)",
					loc: 69062,
				},
				{
					name: "resetClock",
					color: "hsl(43, 70%, 50%)",
					loc: 24940,
				},
				{
					name: "noop",
					color: "hsl(122, 70%, 50%)",
					loc: 175405,
				},
				{
					name: "tick",
					color: "hsl(123, 70%, 50%)",
					loc: 141128,
				},
				{
					name: "forceGC",
					color: "hsl(353, 70%, 50%)",
					loc: 113837,
				},
				{
					name: "stackTrace",
					color: "hsl(74, 70%, 50%)",
					loc: 117536,
				},
				{
					name: "dbg",
					color: "hsl(223, 70%, 50%)",
					loc: 59270,
				},
			],
		},
		{
			name: "generators",
			color: "hsl(199, 70%, 50%)",
			children: [
				{
					name: "address",
					color: "hsl(45, 70%, 50%)",
					loc: 97096,
				},
				{
					name: "city",
					color: "hsl(295, 70%, 50%)",
					loc: 72961,
				},
				{
					name: "animal",
					color: "hsl(349, 70%, 50%)",
					loc: 181716,
				},
				{
					name: "movie",
					color: "hsl(207, 70%, 50%)",
					loc: 117554,
				},
				{
					name: "user",
					color: "hsl(230, 70%, 50%)",
					loc: 36750,
				},
			],
		},
		{
			name: "set",
			color: "hsl(122, 70%, 50%)",
			children: [
				{
					name: "clone",
					color: "hsl(341, 70%, 50%)",
					loc: 8224,
				},
				{
					name: "intersect",
					color: "hsl(131, 70%, 50%)",
					loc: 40130,
				},
				{
					name: "merge",
					color: "hsl(167, 70%, 50%)",
					loc: 123078,
				},
				{
					name: "reverse",
					color: "hsl(62, 70%, 50%)",
					loc: 52099,
				},
				{
					name: "toArray",
					color: "hsl(135, 70%, 50%)",
					loc: 91022,
				},
				{
					name: "toObject",
					color: "hsl(234, 70%, 50%)",
					loc: 181961,
				},
				{
					name: "fromCSV",
					color: "hsl(212, 70%, 50%)",
					loc: 116047,
				},
				{
					name: "slice",
					color: "hsl(171, 70%, 50%)",
					loc: 6135,
				},
				{
					name: "append",
					color: "hsl(296, 70%, 50%)",
					loc: 156319,
				},
				{
					name: "prepend",
					color: "hsl(247, 70%, 50%)",
					loc: 169941,
				},
				{
					name: "shuffle",
					color: "hsl(175, 70%, 50%)",
					loc: 85764,
				},
				{
					name: "pick",
					color: "hsl(131, 70%, 50%)",
					loc: 107235,
				},
				{
					name: "plouc",
					color: "hsl(135, 70%, 50%)",
					loc: 196810,
				},
			],
		},
		{
			name: "text",
			color: "hsl(357, 70%, 50%)",
			children: [
				{
					name: "trim",
					color: "hsl(3, 70%, 50%)",
					loc: 116696,
				},
				{
					name: "slugify",
					color: "hsl(128, 70%, 50%)",
					loc: 91366,
				},
				{
					name: "snakeCase",
					color: "hsl(294, 70%, 50%)",
					loc: 105941,
				},
				{
					name: "camelCase",
					color: "hsl(323, 70%, 50%)",
					loc: 132865,
				},
				{
					name: "repeat",
					color: "hsl(113, 70%, 50%)",
					loc: 12066,
				},
				{
					name: "padLeft",
					color: "hsl(265, 70%, 50%)",
					loc: 173856,
				},
				{
					name: "padRight",
					color: "hsl(160, 70%, 50%)",
					loc: 122925,
				},
				{
					name: "sanitize",
					color: "hsl(91, 70%, 50%)",
					loc: 1543,
				},
				{
					name: "ploucify",
					color: "hsl(282, 70%, 50%)",
					loc: 147901,
				},
			],
		},
		{
			name: "misc",
			color: "hsl(81, 70%, 50%)",
			children: [
				{
					name: "greetings",
					color: "hsl(12, 70%, 50%)",
					children: [
						{
							name: "hey",
							color: "hsl(147, 70%, 50%)",
							loc: 55668,
						},
						{
							name: "HOWDY",
							color: "hsl(351, 70%, 50%)",
							loc: 56529,
						},
						{
							name: "aloha",
							color: "hsl(237, 70%, 50%)",
							loc: 171486,
						},
						{
							name: "AHOY",
							color: "hsl(76, 70%, 50%)",
							loc: 18553,
						},
					],
				},
				{
					name: "other",
					color: "hsl(140, 70%, 50%)",
					loc: 55336,
				},
				{
					name: "path",
					color: "hsl(231, 70%, 50%)",
					children: [
						{
							name: "pathA",
							color: "hsl(11, 70%, 50%)",
							loc: 154760,
						},
						{
							name: "pathB",
							color: "hsl(6, 70%, 50%)",
							children: [
								{
									name: "pathB1",
									color: "hsl(122, 70%, 50%)",
									loc: 192669,
								},
								{
									name: "pathB2",
									color: "hsl(184, 70%, 50%)",
									loc: 189600,
								},
								{
									name: "pathB3",
									color: "hsl(310, 70%, 50%)",
									loc: 190266,
								},
								{
									name: "pathB4",
									color: "hsl(105, 70%, 50%)",
									loc: 145057,
								},
							],
						},
						{
							name: "pathC",
							color: "hsl(284, 70%, 50%)",
							children: [
								{
									name: "pathC1",
									color: "hsl(253, 70%, 50%)",
									loc: 183535,
								},
								{
									name: "pathC2",
									color: "hsl(116, 70%, 50%)",
									loc: 6468,
								},
								{
									name: "pathC3",
									color: "hsl(47, 70%, 50%)",
									loc: 62915,
								},
								{
									name: "pathC4",
									color: "hsl(55, 70%, 50%)",
									loc: 93333,
								},
								{
									name: "pathC5",
									color: "hsl(199, 70%, 50%)",
									loc: 28215,
								},
								{
									name: "pathC6",
									color: "hsl(291, 70%, 50%)",
									loc: 73820,
								},
								{
									name: "pathC7",
									color: "hsl(242, 70%, 50%)",
									loc: 128042,
								},
								{
									name: "pathC8",
									color: "hsl(205, 70%, 50%)",
									loc: 166820,
								},
								{
									name: "pathC9",
									color: "hsl(177, 70%, 50%)",
									loc: 115372,
								},
							],
						},
					],
				},
			],
		},
	],
};
const dataset = {
	name: "Video Game Sales Data Top 100",
	children: [
		{
			name: "2600",
			children: [
				{
					name: "Pac-Man",
					category: "2600",
					value: "7.81",
				},
			],
		},
		{
			name: "Wii",
			children: [
				{
					name: "Wii Sports",
					category: "Wii",
					value: "82.53",
				},
				{
					name: "Mario Kart Wii",
					category: "Wii",
					value: "35.52",
				},
				{
					name: "Wii Sports Resort",
					category: "Wii",
					value: "32.77",
				},
				{
					name: "Wii Play",
					category: "Wii",
					value: "28.92",
				},
				{
					name: "New Super Mario Bros. Wii",
					category: "Wii",
					value: "28.32",
				},
				{
					name: "Wii Fit",
					category: "Wii",
					value: "22.7",
				},
				{
					name: "Wii Fit Plus",
					category: "Wii",
					value: "21.79",
				},
				{
					name: "Super Smash Bros. Brawl",
					category: "Wii",
					value: "12.84",
				},
				{
					name: "Super Mario Galaxy",
					category: "Wii",
					value: "11.35",
				},
				{
					name: "Just Dance 3",
					category: "Wii",
					value: "10.12",
				},
				{
					name: "Just Dance 2",
					category: "Wii",
					value: "9.44",
				},
				{
					name: "Wii Party",
					category: "Wii",
					value: "8.38",
				},
				{
					name: "Mario Party 8",
					category: "Wii",
					value: "8.27",
				},
				{
					name: "Mario & Sonic at the Olympic Games",
					category: "Wii",
					value: "7.99",
				},
				{
					name: "Super Mario Galaxy 2",
					category: "Wii",
					value: "7.51",
				},
			],
		},
		{
			name: "NES",
			children: [
				{
					name: "Super Mario Bros.",
					category: "NES",
					value: "40.24",
				},
				{
					name: "Duck Hunt",
					category: "NES",
					value: "28.31",
				},
				{
					name: "Super Mario Bros. 3",
					category: "NES",
					value: "17.28",
				},
				{
					name: "Super Mario Bros. 2",
					category: "NES",
					value: "7.46",
				},
			],
		},
		{
			name: "GB",
			children: [
				{
					name: "Pokemon Red/Pokemon Blue",
					category: "GB",
					value: "31.37",
				},
				{
					name: "Tetris",
					category: "GB",
					value: "30.26",
				},
				{
					name: "Pokemon Gold/Pokemon Silver",
					category: "GB",
					value: "23.1",
				},
				{
					name: "Super Mario Land",
					category: "GB",
					value: "18.14",
				},
				{
					name: "Pokémon Yellow: Special Pikachu Edition",
					category: "GB",
					value: "14.64",
				},
				{
					name: "Super Mario Land 2: 6 Golden Coins",
					category: "GB",
					value: "11.18",
				},
			],
		},
		{
			name: "DS",
			children: [
				{
					name: "New Super Mario Bros.",
					category: "DS",
					value: "29.8",
				},
				{
					name: "Nintendogs",
					category: "DS",
					value: "24.67",
				},
				{
					name: "Mario Kart DS",
					category: "DS",
					value: "23.21",
				},
				{
					name: "Brain Age: Train Your Brain in Minutes a Day",
					category: "DS",
					value: "20.15",
				},
				{
					name: "Pokemon Diamond/Pokemon Pearl",
					category: "DS",
					value: "18.25",
				},
				{
					name: "Brain Age 2: More Training in Minutes a Day",
					category: "DS",
					value: "15.29",
				},
				{
					name: "Pokemon Black/Pokemon White",
					category: "DS",
					value: "15.14",
				},
				{
					name: "Animal Crossing: Wild World",
					category: "DS",
					value: "12.13",
				},
				{
					name: "Pokemon HeartGold/Pokemon SoulSilver",
					category: "DS",
					value: "11.77",
				},
				{
					name: "Super Mario 64",
					category: "DS",
					value: "10.3",
				},
				{
					name: "Mario Party DS",
					category: "DS",
					value: "8.91",
				},
				{
					name: "Pokemon Black 2/Pokemon White 2",
					category: "DS",
					value: "8.07",
				},
				{
					name: "Pokémon Platinum Version",
					category: "DS",
					value: "7.72",
				},
			],
		},
		{
			name: "X360",
			children: [
				{
					name: "Kinect Adventures!",
					category: "X360",
					value: "21.81",
				},
				{
					name: "Grand Theft Auto V",
					category: "X360",
					value: "16.27",
				},
				{
					name: "Call of Duty: Modern Warfare 3",
					category: "X360",
					value: "14.73",
				},
				{
					name: "Call of Duty: Black Ops",
					category: "X360",
					value: "14.61",
				},
				{
					name: "Call of Duty: Black Ops II",
					category: "X360",
					value: "13.67",
				},
				{
					name: "Call of Duty: Modern Warfare 2",
					category: "X360",
					value: "13.47",
				},
				{
					name: "Halo 3",
					category: "X360",
					value: "12.12",
				},
				{
					name: "Grand Theft Auto IV",
					category: "X360",
					value: "11.01",
				},
				{
					name: "Call of Duty: Ghosts",
					category: "X360",
					value: "10.25",
				},
				{
					name: "Halo: Reach",
					category: "X360",
					value: "9.86",
				},
				{
					name: "Halo 4",
					category: "X360",
					value: "9.71",
				},
				{
					name: "Call of Duty 4: Modern Warfare",
					category: "X360",
					value: "9.31",
				},
				{
					name: "Minecraft",
					category: "X360",
					value: "9.18",
				},
				{
					name: "The Elder Scrolls V: Skyrim",
					category: "X360",
					value: "8.79",
				},
			],
		},
		{
			name: "PS3",
			children: [
				{
					name: "Grand Theft Auto V",
					category: "PS3",
					value: "21.04",
				},
				{
					name: "Call of Duty: Black Ops II",
					category: "PS3",
					value: "13.79",
				},
				{
					name: "Call of Duty: Modern Warfare 3",
					category: "PS3",
					value: "13.32",
				},
				{
					name: "Call of Duty: Black Ops",
					category: "PS3",
					value: "12.63",
				},
				{
					name: "Gran Turismo 5",
					category: "PS3",
					value: "10.7",
				},
				{
					name: "Call of Duty: Modern Warfare 2",
					category: "PS3",
					value: "10.6",
				},
				{
					name: "Grand Theft Auto IV",
					category: "PS3",
					value: "10.5",
				},
				{
					name: "Call of Duty: Ghosts",
					category: "PS3",
					value: "9.36",
				},
				{
					name: "FIFA Soccer 13",
					category: "PS3",
					value: "8.16",
				},
			],
		},
		{
			name: "PS2",
			children: [
				{
					name: "Grand Theft Auto: San Andreas",
					category: "PS2",
					value: "20.81",
				},
				{
					name: "Grand Theft Auto: Vice City",
					category: "PS2",
					value: "16.15",
				},
				{
					name: "Gran Turismo 3: A-Spec",
					category: "PS2",
					value: "14.98",
				},
				{
					name: "Grand Theft Auto III",
					category: "PS2",
					value: "13.1",
				},
				{
					name: "Gran Turismo 4",
					category: "PS2",
					value: "11.66",
				},
				{
					name: "Final Fantasy X",
					category: "PS2",
					value: "8.05",
				},
			],
		},
		{
			name: "SNES",
			children: [
				{
					name: "Super Mario World",
					category: "SNES",
					value: "20.61",
				},
				{
					name: "Super Mario All-Stars",
					category: "SNES",
					value: "10.55",
				},
				{
					name: "Donkey Kong Country",
					category: "SNES",
					value: "9.3",
				},
				{
					name: "Super Mario Kart",
					category: "SNES",
					value: "8.76",
				},
			],
		},
		{
			name: "GBA",
			children: [
				{
					name: "Pokemon Ruby/Pokemon Sapphire",
					category: "GBA",
					value: "15.85",
				},
				{
					name: "Pokemon FireRed/Pokemon LeafGreen",
					category: "GBA",
					value: "10.49",
				},
			],
		},
		{
			name: "PS4",
			children: [
				{
					name: "Call of Duty: Black Ops 3",
					category: "PS4",
					value: "14.63",
				},
				{
					name: "Grand Theft Auto V",
					category: "PS4",
					value: "12.61",
				},
				{
					name: "FIFA 16",
					category: "PS4",
					value: "8.57",
				},
				{
					name: "Star Wars Battlefront (2015)",
					category: "PS4",
					value: "7.98",
				},
				{
					name: "Call of Duty: Advanced Warfare",
					category: "PS4",
					value: "7.66",
				},
				{
					name: "FIFA 17",
					category: "PS4",
					value: "7.59",
				},
			],
		},
		{
			name: "3DS",
			children: [
				{
					name: "Pokemon X/Pokemon Y",
					category: "3DS",
					value: "14.6",
				},
				{
					name: "Mario Kart 7",
					category: "3DS",
					value: "12.66",
				},
				{
					name: "Pokemon Omega Ruby/Pokemon Alpha Sapphire",
					category: "3DS",
					value: "11.68",
				},
				{
					name: "Super Mario 3D Land",
					category: "3DS",
					value: "10.81",
				},
				{
					name: "New Super Mario Bros. 2",
					category: "3DS",
					value: "9.9",
				},
				{
					name: "Animal Crossing: New Leaf",
					category: "3DS",
					value: "9.16",
				},
				{
					name: "Super Smash Bros. for Wii U and 3DS",
					category: "3DS",
					value: "7.55",
				},
			],
		},
		{
			name: "N64",
			children: [
				{
					name: "Super Mario 64",
					category: "N64",
					value: "11.89",
				},
				{
					name: "Mario Kart 64",
					category: "N64",
					value: "9.87",
				},
				{
					name: "GoldenEye 007",
					category: "N64",
					value: "8.09",
				},
				{
					name: "The Legend of Zelda: Ocarina of Time",
					category: "N64",
					value: "7.6",
				},
			],
		},
		{
			name: "PS",
			children: [
				{
					name: "Gran Turismo",
					category: "PS",
					value: "10.95",
				},
				{
					name: "Final Fantasy VII",
					category: "PS",
					value: "9.72",
				},
				{
					name: "Gran Turismo 2",
					category: "PS",
					value: "9.49",
				},
				{
					name: "Final Fantasy VIII",
					category: "PS",
					value: "7.86",
				},
				{
					name: "Crash Bandicoot 2: Cortex Strikes Back",
					category: "PS",
					value: "7.58",
				},
			],
		},
		{
			name: "XB",
			children: [
				{
					name: "Halo 2",
					category: "XB",
					value: "8.49",
				},
			],
		},
		{
			name: "PC",
			children: [
				{
					name: "The Sims 3",
					category: "PC",
					value: "8.01",
				},
			],
		},
		{
			name: "PSP",
			children: [
				{
					name: "Grand Theft Auto: Liberty City Stories",
					category: "PSP",
					value: "7.69",
				},
			],
		},
		{
			name: "XOne",
			children: [
				{
					name: "Call of Duty: Black Ops 3",
					category: "XOne",
					value: "7.39",
				},
			],
		},
	],
};

const Bar = () => {



return (
	<ResponsiveTreeMap
		data={dataset}
		identity="name"
		value="value"
		valueFormat=".02s"
		innerPadding={3}
		margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
		labelSkipSize={12}
		parentLabelPosition="left"
		colors={{ scheme: "red_yellow_blue" }}
		nodeOpacity={0.65}
		borderWidth={4}
	/>
);
}

const App =  () => {
	return (
		<div className="App">
			<Bar />
		</div>
	);
}

export default App;
