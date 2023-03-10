import "./svgeditor.css";
import React, { Component } from 'react';

// import Toast from "./Toast";
import SVGRow from "./components/SVGRow";
import ColorDropdown from "./components/ColorDropdown";
import OptionBar from "./components/OptionBar";

class App extends Component {
	constructor() {
		super();
		this.state = {
			inText: '',
			outText: '',
			inIcon: '',
			outIcon: '',
			detectedColors: [],
		}
	}

	colors =
		[
			{
				name: 'electricBlue',
				friendlyName: 'Electric Blue',
				hex: '#0097dc'
			},
			{
				name: 'richBlue',
				friendlyName: 'Rich Blue',
				hex: '#0c2340'
			},
			{
				name: 'purpleNavy',
				friendlyName: 'Purple Navy',
				hex: '#002f6c'
			},
			{
				name: 'rubyRed',
				friendlyName: 'Ruby Red',
				hex: '#b21f59'
			},
			{
				name: 'sapphireBlue',
				friendlyName: 'Sapphire Blue',
				hex: '#005eb8'
			},
			{
				name: 'riverTeal',
				friendlyName: 'River Teal',
				hex: '#00a19d'
			},
			{
				name: 'midnightGreen',
				friendlyName: 'Midnight Green',
				hex: '#0d5358'
			},
			{
				name: 'carrotOrange',
				friendlyName: 'Carrot Orange',
				hex: '#f4623a'
			},
			{
				name: 'daisyYellow',
				friendlyName: 'Daisy Yellow',
				hex: '#fbaf34'
			},
			{
				name: 'seaGreen',
				friendlyName: 'Sea Green',
				hex: '#34b556'
			},
			{
				name: 'skyBlue',
				friendlyName: 'Sky Blue',
				hex: '#50c0e8'
			},
			{
				name: 'teaRose',
				friendlyName: 'Tea Rose',
				hex: '#f69785'
			},
			{
				name: 'charcoalGrey',
				friendlyName: 'Charcoal Grey',
				hex: '#4a5363'
			},
			{
				name: 'lightGrey',
				friendlyName: 'Light Grey',
				hex: '#d0d3d4'
			},
			{
				name: 'platinum',
				friendlyName: 'Platinum',
				hex: '#f4f5f6'
			}
		]
	schemes =
		[
			{
				"River Sky": {
					primary: this.colors.riverTeal,
					secondary: this.colors.skyBlue
				}
			},
			{
				"Daisy Carrot": {
					primary: this.colors.daisyYellow,
					secondary: this.colors.carrotOrange
				}
			}
			,
			{
				"Ruby Tea": {
					primary: this.colors.rubyRed,
					secondary: this.colors.teaRose
				}
			}
			,
			{
				"Sky Rich": {
					primary: this.colors.skyBlue,
					secondary: this.colors.richBlue
				}
			}
			,
			{
				"Carrot Sapphire": {
					primary: this.colors.carrotOrange,
					secondary: this.colors.sapphireBlue
				}
			}
			,
			{
				"Electric Sapphire": {
					primary: this.colors.electricBlue,
					secondary: this.colors.sapphireBlue
				}
			}
			,
			{
				"Daisy Sea": {
					primary: this.colors.daisyYellow,
					secondary: this.colors.seaGreen
				}
			}
			,
			{
				"River Midnight": {
					primary: this.colors.riverTeal,
					secondary: this.colors.midnightGreen
				}
			}
		]
	componentDidMount() {
		// look for query strings
		// setup toasts
		window.jQuery('.toast').toast({ delay: 4000 })

		// check for passed icon
		let params = new URLSearchParams(window.location.search);
		let iconPath = params.get('icon')

		if (iconPath != null) {
			let decodedPath = decodeURIComponent(iconPath)
			console.log('decodedPath: ', decodedPath)
			console.log('iconPath: ', iconPath)
			fetch(iconPath)
				.then(resp => resp.text())
				.then(iconData => {
					console.log('loaded icon: ', iconData)
					this.updateInput(iconData)
					window.jQuery('#toast-success').toast('show')
				})
				.catch((error) => {
					console.error('Error loading icon:', error);
					window.jQuery('#toast-failure').toast('show')
				})
		}
	}

	// shouldComponentUpdate(nextProps, nextState){
	// 	this.state.detectedColors = this.parseColors(nextState.inText)

	// }

	parseColors = (inputText) => {
		let foundColors = inputText.match(/#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}/g);
		// remove dupes
		if (foundColors != null) {
			return foundColors.filter((m, i) => {
				return foundColors.indexOf(m) === i;
			})
		}
		return [];
	}
	onInInput = ev => {
		this.updateInput(ev.target.value);
	}
	updateInput = newValue => {
		this.setState({ inText: newValue });
		this.setState({ outText: newValue });
		this.setState({ detectedColors: this.parseColors(newValue) })
	}

	recolor = (newHex, oldHex) => {
		let newOutput = this.state.outText.replaceAll(oldHex, newHex)
		this.setState({ outText: newOutput });
	}

	newInput = () => {

	}

	onOutChange = () => {
		this.setState({ outText: '' });
	}
	render() {
		return (
			<section class="bg-white">
				<div class="container">
					<div class="row">
						<SVGRow label="SVG Input" value={this.state.inText} setValue={this.onInInput} input />
						<hr />
						<div class="col-12">
							<h4>Colors</h4>
							<div class="d-flex">
								{this.state.detectedColors.map(color =>
									<ColorDropdown key={color} color={color} colorList={this.colors} recolor={this.recolor} />
								)}
							</div>
						</div>
						<hr />
						<SVGRow label="SVG Output" value={this.state.outText} toggle="tooltip" tooltip="Copy text" />

						<OptionBar />
					</div>
				</div>
			</section>
		)
	}
}

export default App;