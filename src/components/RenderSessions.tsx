import React from "react";

import { DateConsumption, CommonItem, Session } from "../interface";
import { useRootDispatch } from "@/provider/store";
import dateConsumptionAction from "@/provider/store/actions/dateConsumption.action";
import { digitize } from "../time";
import colors from "@/colors";
import Card from "./Card";
import { AiFillDelete } from "react-icons/ai";


/**
 * REnder the session cards
 * The component takes an array of the sessions we want to render on the main page(breakfast, lunch, etc.)
 * The data is retreived form the state and extrated based on the date and the session
 * The sessions are looped to show all the cards of each session
 * The <Card /> component is rendered to give design
 * For each card, the items that are consumed on that date and session are displayed using the <Item /> component
 */

const RenderSessionCards: React.FC<{
	sessions: Array<Session>;
	date_data: DateConsumption;
}> = (props) => {
	const { sessions, date_data } = props;
	const _renderItem = ({ item, index }) => {
		const session = item;

		let total_calories = 0;
		let total_fat = 0;
		let total_protein = 0;
		let total_sugar = 0;

		// Load a particular session data
		const session_data = date_data[session];

		// Sum up all the nutrients consumed in a particular session
		session_data?.forEach((item: CommonItem) => {
			total_calories += item.calories * item.quantity;
			total_fat += item.fat * item.quantity;
			total_protein += item.protein * item.quantity;
			total_sugar += item.sugars * item.quantity;
		});

		return (
			<Card
				title={session}
				t_kcal={total_calories}
				t_p={total_fat}
				t_c={total_protein}
				t_f={total_sugar}
				key={session}
				session={session}
			>
				{session_data.map((item: CommonItem) => (
					<Item
						food_name={item.food_name}
						calories={item.calories}
						fat={item.fat}
						sugar={item.sugars}
						protein={item.protein}
						id={item.id}
						session={session}
						key={item.id as string}
						quantity={item.quantity}
						consumed_at={item.consumed_at}
					/>
				))}
			</Card>
		);
	};

	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<p style={styles_main.top_p}>Daily consumption</p>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 20,
					width: "100%",

					alignItems: "center",
				}}
			>
				{sessions.map((session, index) =>
					_renderItem({ item: session, index })
				)}
			</div>
		</div>
	);
};

const time_based_cards = () => {
	const date = new Date();
	const hours = date.getHours();

	if (hours >= 5 && hours <= 9) return 0;
	else if (hours > 9 && hours <= 12) return 1;
	else if (hours > 12 && hours <= 14) return 2;
	else if (hours > 14 && hours <= 18) return 3;
	else if (hours > 18 && hours <= 21) return 4;
	else if (hours > 21 && hours <= 22) return 5;
	else return 6;
};

const styles_main = {
	top_p: {
		fontSize: 15,
		fontFamily: "Inter",
		color: colors.app.dark_300,
		pAlign: "center",
		marginBottom: 40,
		marginTop: 20,
	},
};

/**
 * Component for diplaying all the items eaten in specific date and session
 * Delete consumed food item is created
 */
const Item = ({
	food_name,
	id,
	session,
	calories,
	sugar,
	protein,
	fat,
	quantity,
	consumed_at,
}: {
	food_name: string;
	id: string | number | number[];
	session: Session;
	calories: number;
	sugar: number;
	protein: number;
	fat: number;
	quantity: number;
	consumed_at: any;
}) => {
	const dispatch = useRootDispatch();
	const date = new Date(consumed_at);

	const deleteItem = async () => {
		await dispatch(dateConsumptionAction.RemoveItemFromRecord(session, id));
	};
	return (
		<div style={{ marginBottom: 8 }}>
			<p style={styles.food_name}>
				{food_name}{" "}
				<span style={styles.food_name_span}>
					({quantity} piece at {digitize(date.getHours())}:
					{digitize(date.getMinutes())})
				</span>
			</p>
			<div style={styles.detail_container}>
				<div style={styles.detail_wrapper}>
					<p style={styles.info}>{calories}kcal</p>
					<p style={styles.info}>{protein}g</p>
					<p style={styles.info}>{sugar}g</p>
					<p style={{ color: colors.app.dark_300, fontSize: 12 }}>{fat}g</p>
				</div>
				<button onClick={deleteItem}><AiFillDelete/></button>
			</div>
		</div>
	);
};

const styles = {
	food_name: {
		fontSize: 17,
		pTransform: "capitalize",
		color: colors.app.dark_500,
	},
	food_name_span: { fontSize: 10 },
	container: { marginVertical: 10 },
	detail_container: {
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 7.5,
	},
	detail_wrapper: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	info: {
		color: colors.app.dark_300,
		fontSize: 12,
		marginRight: 15,
	},
};

export default RenderSessionCards;
