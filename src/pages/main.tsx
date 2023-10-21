import React from "react";

import {
	CommonItem,
	DateConsumption,
	FoodNutrients,
	Profile,
	Session,
} from "../interface";

import { useSelector } from "react-redux";
import store, { RootDispatch, RootState, useRootState } from "@/provider/store";
import colors from "@/colors";
import RenderSessionCards from "@/components/RenderSessions";

/**
 * Calulcation of the total consumption of the nutrients
 */

const GET_TOTAL_NUTRIENTS = (data, sessions) => {
	const progress_data: FoodNutrients = {
		carbohydrates: 0,
		fat: 0,
		protein: 0,
		sugars: 0,
		cholesterol: 0,
		potassium: 0,
		sodium: 0,
		dietary_fiber: 0,
		saturated_fat: 0,
		calories: 0,
	};

	sessions.map((field) => {
		data[field].forEach((item: CommonItem) => {
			progress_data.fat += item.fat * item.quantity;
			progress_data.carbohydrates = item.carbohydrates * item.quantity;
			progress_data.protein += item.protein * item.quantity;
			progress_data.sugars += item.sugars * item.quantity;
			progress_data.cholesterol += item.cholesterol * item.quantity;
			progress_data.potassium += item.potassium * item.quantity;
			progress_data.sodium += item.sodium * item.quantity;
			progress_data.dietary_fiber += item.dietary_fiber * item.quantity;
			progress_data.calories += item.calories * item.quantity;
		});
	});
	return progress_data;
};

const MainScreen = ({ navigation }: { navigation: StackNavigationHelpers }) => {
	const dateConsumption = useSelector<RootState>(
		(state) => state.dateConsumption
	) as DateConsumption;

	const target = useSelector<RootState>(
		(state) => state.profile.calories_target || 4000
	) as number;

	// Retrive data of a prticular date from state

	/**
	 * Loop throught all the daily cosumption to add up the interested values to show
	 * The current total calories are also calculated
	 */
	const fixed_sessions: Array<Session> = [
		Session.breakfast,
		Session.second_breakfast,
		Session.lunch,
		Session.snack,
		Session.dinner,
		Session.dessert,
		Session.extra,
	];

	// All the collection of daily consumptions
	const progress_data = GET_TOTAL_NUTRIENTS(dateConsumption, fixed_sessions);

	return (
		<div>
			<Calorimeter target={target} current={progress_data.calories} />
			<Progresses progress_data={progress_data} />
			<RenderSessionCards
				sessions={fixed_sessions} // All the card sessions to show
				date_data={dateConsumption} // Current state date based data
			/>
		</div>
	);
};

const Calorimeter = ({
	target,
	current,
}: {
	target: number;
	current: number;
}) => {
	const value = (target - current)
		.toFixed(0)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	return (
		<div className="">
			<p style={styles.top_text}>Calories left</p>
			<p style={styles.calories}>
				<span style={{ fontFamily: "Inter-Bold" }}>{value}</span> kcal
			</p>
		</div>
	);
};

const Progresses: React.FC<{ progress_data: FoodNutrients }> = (props) => {
	const { mass, calories_target, date_of_birth } = useRootState(
		(state) => state.profile
	);
	const { progress_data } = props;
	const age = date_of_birth?.age || 0;
	const user_mass = mass; // add it to state;

	const total_fat_to_consume = (calories_target * 60.5) / 2000; // ok
	const total_protein_to_consume = user_mass * 1; // based on total_calories_daily consumption
	const total_carbs_to_consume = (calories_target * 275) / 2000; // based on total_calories_daily/8;
	const total_sugar_to_consume =
		(age >= 4 && age <= 6 && 19) || (age >= 7 && age <= 10 && 24) || 30; // 25 for women
	const total_cholesterol_to_consume = 0.3;
	// add other fields

	// FAT : 0.4g per mass is the prescribed journal fat
	const fat_perc =
		progress_data.fat && total_fat_to_consume
			? Math.round((100 * progress_data.fat) / total_fat_to_consume)
			: 0;
	// CARBOHYDRATES: 2000:275 = calories : carbohydrates
	const carb_perc =
		progress_data.carbohydrates && total_carbs_to_consume
			? Math.round((100 * progress_data.carbohydrates) / total_carbs_to_consume)
			: 0;
	// PROTEIN: 3000:60.5 = calroeis: fat
	const protein_perc =
		progress_data.fat && total_protein_to_consume
			? Math.round((100 * progress_data.fat) / total_protein_to_consume)
			: 0;
	// SUGARS
	const sugar_perc =
		progress_data.sugars && total_sugar_to_consume
			? Math.round((100 * progress_data.sugars) / total_sugar_to_consume)
			: 0;
	// CHOLESTEROL
	const chol_perc =
		progress_data.cholesterol && total_cholesterol_to_consume
			? Math.round(
					(100 * progress_data.cholesterol) / total_cholesterol_to_consume
			  )
			: 0;

	const DATA = [
		{
			perc: carb_perc,
			title: "carbs",
			color: colors.app.purple_100,
			total_consume: total_carbs_to_consume,
			pd: progress_data.carbohydrates,
		},
		{
			perc: fat_perc,
			title: "fat",
			color: colors.app.orange_100,
			total_consume: total_fat_to_consume,
			pd: progress_data.fat,
		},
		{
			perc: protein_perc,
			title: "protein",
			color: colors.app.blue_100,
			total_consume: total_protein_to_consume,
			pd: progress_data.protein,
		},
		{
			perc: sugar_perc,
			title: "sugars",
			color: colors.tailwind.red._500,
			total_consume: total_sugar_to_consume,
			pd: progress_data.sugars,
		},
		{
			perc: chol_perc,
			title: "Choles",
			color: colors.tailwind.pink._500,
			total_consume: total_cholesterol_to_consume,
			pd: progress_data.cholesterol,
		},
	];
	console.log(DATA);
	return (
		<div style={styles.container}>
			{DATA.map((item) => (
				<div key={item.title}>
					<p>Title: {item.title}</p>
					<p>Percentage: {item.perc}%</p>
					<p>Consumed: {item.pd}</p>
					<p>Total consume limit: {item.total_consume}</p>
				</div>
			))}
		</div>
	);
};

const styles = {
	container: {
		alignItems: "center",
		marginTop: 20,
		marginBottom: 20,
	},
	top_text: {
		fontSize: 15,
		fontFamily: "Inter",
		color: colors.app.dark_300,
	},
	calories: {
		fontSize: 45,
		fontFamily: "Inter",
		color: colors.app.dark_500,
	},
};

export default MainScreen;
