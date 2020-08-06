import React, { Component } from 'react';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';

import coronaImage from './images/covid.png';

import { fetchData } from './api/index';

import styles from './App.module.css';

class App extends Component {
	state = {
		data: {},
		country: '',
	};

	async componentDidMount() {
		const data = await fetchData();
		this.setState({ data });
	}

	handleCountryChange = async (country) => {
		// console.log(country);
		//fetch data
		const data = await fetchData(country);
		//set state
		this.setState({ data, country });
	};

	render() {
		return (
			<div className={styles.container}>
				<img className={styles.image} src={coronaImage} alt="COVID-19" />
				<Cards data={this.state.data} />
				<CountryPicker
					handleCountryChange={(country) => this.handleCountryChange(country)}
				/>
				<Chart data={this.state.data} country={this.state.country} />
			</div>
		);
	}
}

export default App;
