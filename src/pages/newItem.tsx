import React, { useEffect, useState } from "react";

import colors from "../colors";
import nutritionix from "@/nutritionix-api";
import { CommonItem, SearchCommonItem } from "../interface";

import {
	extract_data_from_date,
	get_week_of_date,
	todayDate,
	transform_month_to_string,
	transform_week_to_string,
} from "../time";
import { useSelector } from "react-redux";
import { RootState, useRootDispatch } from "@/provider/store";
import dateConsumptionAction from "@/provider/store/actions/dateConsumption.action";
import cacheAction from "@/provider/store/actions/cache.action";

const NewItemScreen = (props) => {
	const app_date = useSelector<RootState>(
		(state) => state.general.app_date
	) as string;

	// Set the modal ID - Handles also the modal visibility
	const [modalItemID, setModalItemID] = useState<string>();
	const [results, setResults] = useState<Array<SearchCommonItem> | null>([]);
	const [loading, setLoading] = useState<boolean>(false);

	/**
	 * Search for 20 foods from the database for a particular query
	 * The data is filtered to take only desired fields of interface SearchCommonItem
	 */
	const Search = async (query) => {
		try {
			if (!query) return;
			setLoading(true);

			const response = await nutritionix.search(query);

			setResults(response);
			setLoading(false);
		} catch (error) {
			console.log(error.message);
			setLoading(false);
		}
	};

	/**
	 * Triggers the close of the modal
	 */
	const CloseModal = () => setModalItemID(null);

	/**
	 * Triggers the opening of the modal and set's the current food_name
	 * The food name is important for the furteher detailed fetch of the food
	 * which is taken place in the modal component
	 *
	 */
	const OpenModal = (food_name) => setModalItemID(food_name);

	// // Header date system
	// const is_today = todayDate() === app_date;
	// const decompose_date = extract_data_from_date(app_date);

	// // Stringified week
	// const week = transform_week_to_string(
	// 	get_week_of_date(decompose_date[0], decompose_date[1], decompose_date[2])
	// );

	// // Check if the date month is current month
	// const is_current_month = parseInt(decompose_date[1]) == new Date().getMonth();
	// // Stringified month
	// const month = transform_month_to_string(decompose_date[1]);

	// // check if the date year is current year
	// const is_current_year =
	// 	parseInt(decompose_date[2]) === new Date().getFullYear();

	// const year = decompose_date[2];

	// const timing = is_today
	// 	? "Today"
	// 	: week +
	// 	  " " +
	// 	  decompose_date[0] +
	// 	  ((!is_current_month && " " + month) || "") +
	// 	  ((!is_current_year && " " + year) || "");

	return (
		// <SafeAreaView style={styles.container}>
		// 	<ScrollView stickyHeaderIndices={[1]}>
		// 		<Header
		// 			goBack={true}
		// 			navigation={props.navigation}
		// 			page={session}
		// 			small={timing}
		// 		/>
		// 		<SearchInput
		// 			placeholder="Search for a product"
		// 			onSearch={Search}
		// 			loading={loading}
		// 		/>
		// 		{results && results.length > 0 ? (
		// 			<>
		// 				<Text style={styles.smallText}>Results</Text>
		// 				<SearchResultRender OpenModal={OpenModal} items={results} />
		// 			</>
		// 		) : (
		// 			<>
		// 				<Text style={styles.smallText}>Your Favourites</Text>
		// 				<FavouritesRender session={session} />
		// 			</>
		// 		)}
		// 		{modalItemID && (
		// 			<ItemModal
		// 				visible={!!modalItemID}
		// 				onDismiss={CloseModal}
		// 				ID={modalItemID}
		// 				session={session}
		// 			/>
		// 		)}
		// 	</ScrollView>
		// </SafeAreaView>
		<div className="bg-white h-screen">
			<SearchInput
				onSearch={Search}
				loading={loading}
				placeholder="Search for food item..."
			/>

			{results && results.length > 0 ? (
				<>
					<p>Results</p>
					{/** Render data */}
					{/* <SearchResultRender OpenModal={OpenModal} items={results} /> */}
					{results.map((item) => (
						<ItemCard data={item} onPress={OpenModal} key={item.food_name} />
					))}
				</>
			) : (
				<>
					<p>Your Favourites</p>
					{/* <FavouritesRender session={session} /> */}
				</>
			)}
			{modalItemID && (
				<ItemModal
					visible={!!modalItemID}
					onDismiss={CloseModal}
					ID={modalItemID}
					session={session}
				/>
			)}
		</div>
	);
};

/**
 * Design of the search input used in @NewItemScreen
 */
const SearchInput = (props: {
	onSearch: any;
	loading: boolean;
	placeholder: string;
}) => {
	const [text, setText] = useState<string>();
	return (
		<div>
			<input
				placeholder={props.placeholder}
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button onClick={() => props.onSearch(text)}>Search</button>
		</div>
	);
};

const ItemCard = ({
	data: { food_name, serving_qty, serving_unit, calories },
	onPress,
}: {
	data: SearchCommonItem;
	onPress: any;
}) => {
	return (
		<div>
			<div>
				<p>{food_name}</p>
				<div>
					{1} x {serving_unit} ({serving_qty}){" "}
					{calories && "/ " + calories + "kcal"}
				</div>
			</div>
			<div>
				<button onClick={onPress}>Show</button>
			</div>
		</div>
	);
};

const ItemModal = ({ ID, visible, onDismiss, session }) => {
	const dispatch = useRootDispatch();

	const [type, set_type] = useState<string>();
	const [result, set_result] = useState<any>();
	const [quantity, set_quantity] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const [saveItemLoading, setSaveItemLoading] = useState<boolean>(false);

	// All the data that is fetched is then filteerd to fit the CommonItem interface
	const data: CommonItem = result && {
		calories: result.nf_calories || 0,
		carbohydrates: result.nf_total_carbohydrate || 0,
		fat: result.nf_total_fat || 0,
		consumed_at: Date.now(),
		food_name: result.food_name,
		id: Math.random() * 10e8,
		potassium: result.nf_potassium || 0,
		protein: result.nf_protein || 0,
		saturated_fat: result.nf_saturated_fat || 0,
		serving_qty: result.serving_qty || 0,
		serving_unit: result.serving_unit || 0,
		serving_weight_grams: result.serving_weight_grams || 0,
		sodium: result.nf_sodium || 0,
		sugars: result.nf_sugars || 0,
		cholesterol: result.nf_cholesterol || 0,
		dietary_fiber: result.nf_dietary_fiber || 0,
		quantity: quantity || 1,
	};

	// The Search function is ran to get the main item
	useEffect(() => {
		setLoading(true);

		if (!ID) onDismiss();

		(async () => {
			await Search();
		})();

		setLoading(false);
	}, []);

	// The function fetched the main item for its details
	const Search = async () => {
		const result = await nutritionix.nutrients(ID);
		set_result(result);
	};

	// Push the current item to the consumed list
	const AddNewItem = async () => {
		setSaveItemLoading(true);

		await dispatch(dateConsumptionAction.AddItemToRecord(session, data));
		setSaveItemLoading(false);
		onDismiss();
	};

	// Add the item to the favourite list
	const setFavourite = async () => dispatch(cacheAction.AddFavouriteItem(data));

	if (loading || !data) return <></>;

	return (
		<div>
			<div>
				{result && (
					<div>
						<div>
							{/**Children data */}

							<div>
								Name: {data.food_name}
								<button onClick={setFavourite}>Favorite</button>
								Calories: {data.calories}
							</div>
							<input
								value={quantity}
								onChange={(e) => set_quantity(+e.target.value)}
							/>
							<div>Serving unit: {result.serving_unit}</div>
							{/** Render data */}
							{/* <Cards data={result} /> */}
							<button onClick={AddNewItem}>Save</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default NewItemScreen;
