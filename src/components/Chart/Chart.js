import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api/index';
import { Line, Bar } from 'react-chartjs-2';
import Spinner from '../../components/Spinner/Spinner';

import styles from './Chart.module.css';

const Chart = (props) => {
	const [dailyData, setDailyData] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			const DailyData = await fetchDailyData();
			setDailyData(DailyData);
		};
		fetchAPI();
	}, []);

	const lineChart = dailyData.length ? (
		<Line
			data={{
				labels: dailyData.map((d) => d.date),
				datasets: [
					{
						data: dailyData.map((d) => d.confirmed),
						label: 'Infected',
						borderColor: '#3333ff',
						fill: true,
					},
					{
						data: dailyData.map((d) => d.deaths),
						label: 'Deaths',
						borderColor: 'red',
						backgroundColor: 'rgba(255,0,0,0.5)',
						fill: true,
					},
				],
			}}
		/>
	) : (
		<Spinner />
	);

	const barChart = props.data.confirmed ? (
		<Bar
			data={{
				labels: ['Infected', 'Recovered', 'Deaths'],
				datasets: [
					{
						label: 'People',
						backgroundColor: [
							'rgba(0, 0, 255, 0.5)',
							'rgba(0, 255, 0, 0.5)',
							'rgba(255, 0, 0, 0.5)',
						],
						data: [
							props.data.confirmed.value,
							props.data.recovered.value,
							props.data.deaths.value,
						],
					},
				],
			}}
			options={{
				legend: { display: false },
				title: { display: true, text: `Current state in ${props.country}` },
			}}
		/>
	) : null;

	return (
		<div className={styles.container}>
			{props.country ? barChart : lineChart}
		</div>
	);
};

export default Chart;
