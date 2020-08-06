import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './CountryPicker.module.css';
import { country } from '../../api/index';

const CountryPicker = (props) => {
	const [fetchedCountries, setFetchedCountries] = useState([]);

	useEffect(() => {
		const fetchCountry = async () => {
			const x = await country();
			setFetchedCountries(x);
		};
		fetchCountry();
	}, []);

	const options = fetchedCountries.length
		? fetchedCountries.map((country, i) => (
				<option key={i} value={country}>
					{country}
				</option>
		  ))
		: null;

	return (
		<FormControl className={styles.formControl}>
			<NativeSelect
				defaultValue=""
				onChange={(e) => props.handleCountryChange(e.target.value)}
			>
				<option value="">Global</option>
				{options}
			</NativeSelect>
		</FormControl>
	);
};

export default CountryPicker;
