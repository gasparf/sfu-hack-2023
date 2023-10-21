import React, { useEffect, useState } from "react";

import colors from "../colors";
import nutritionix from "@/nutritionix-api";
import { CommonItem, SearchCommonItem, Session } from "../interface";

import {
	extract_data_from_date,
	get_week_of_date,
	todayDate,
	transform_month_to_string,
	transform_week_to_string,
} from "../time";
import { useSelector } from "react-redux";
import { RootState, useRootDispatch, useRootState } from "@/provider/store";
import dateConsumptionAction from "@/provider/store/actions/dateConsumption.action";
import cacheAction from "@/provider/store/actions/cache.action";
import { useRouter } from "next/router";

const NewItemScreen = (props) => {
	const app_date = useSelector<RootState>(
		(state) => state.general.app_date
	) as string;

	const session = useRouter().query?.session || "breakfast";

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

	// Header date system
	const is_today = todayDate() === app_date;
	const decompose_date = extract_data_from_date(app_date);

	// Stringified week
	const week = transform_week_to_string(
		get_week_of_date(decompose_date[0], decompose_date[1], decompose_date[2])
	);

	// Check if the date month is current month
	const is_current_month = parseInt(decompose_date[1]) == new Date().getMonth();
	// Stringified month
	const month = transform_month_to_string(decompose_date[1]);

	// check if the date year is current year
	const is_current_year =
		parseInt(decompose_date[2]) === new Date().getFullYear();

	const year = decompose_date[2];

	const timing = is_today
		? "Today"
		: week +
		  " " +
		  decompose_date[0] +
		  ((!is_current_month && " " + month) || "") +
		  ((!is_current_year && " " + year) || "");

	return (
		<div className="bg-white h-screen">
			{timing}
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
					<RenderFavourite />
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
	const [p, setp] = useState<string>();
	return (
		<div>
			<input
				placeholder={props.placeholder}
				value={p}
				onChange={(e) => setp(e.target.value)}
			/>
			<button onClick={() => props.onSearch(p)}>Search</button>
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
				<button onClick={() => onPress(food_name)}>Show</button>
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

	console.log(data);

	// The Search function is ran to get the main item
	useEffect(() => {
		setLoading(true);

		if (!ID) onDismiss();

		(async () => {
			await Search();
		})();

		setLoading(false);
	}, [ID]);

	// The function fetched the main item for its details
	const Search = async () => {
		const result = await nutritionix.nutrients(ID);
		console.log(result);
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

	return (
		<div
			style={{
				width: 400,
				height: 400,
				background: "white",
				position: "absolute",
				top: "50%",
				left: "50%",
				boxShadow: "0 0 10px 2px rgba(0,0,0,.3)",
				transform: "translate(-50%,-50%)",
			}}
		>
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

const RenderFavourite = () => {
	const favourites = useRootState((state) => state.cache.favourites);
	return (
		<div style={{ margin: 20 }}>
			{favourites.length > 0 ? (
				favourites.map((favourite) => (
					<FavouriteCard
						key={favourite.id as number}
						item={favourite}
						session={Session.breakfast}
					/>
				))
			) : (
				<p>No favourites</p>
			)}
		</div>
	);
};

/**
 * Favourite card design component
 * @requires item (CommonItem)
 * @requires session (Fields)
 */
const FavouriteCard = ({
	item,
	session,
}: {
	item: CommonItem;
	session: Session;
}) => {
	const dispatch = useRootDispatch();
	const { food_name, serving_qty, serving_unit, calories, quantity } = item;

	// The state contains the ID of the added item
	const [isAdded, setIsAdded] = useState(null); // contains the new id of the added product
	const [number, setNumber] = useState(0);

	/**
	 * Add a new item to the daily list
	 * The data is stored on mobile and local state
	 * The id of the element is changed so to not create a conflict. That's
	 * beacuse all the consumed items have a unique id
	 */
	const addItem = async () => {
		// Create a unique id for the new item
		const ID = Math.random() * 10e8;
		const data: CommonItem = {
			...item,
			id: ID,
			consumed_at: Date.now(),
			quantity: number || 1,
		};

		await dispatch(dateConsumptionAction.AddItemToRecord(session, data));

		// The item has been added, change the state and show the remove button
		setIsAdded(ID);
		setNumber(0);
	};

	/**
	 *
	 * Remove an item from the consumed list.
	 */
	const removeItem = async () => {
		// isAdded is the ID of the item which got stored through the addItem function above
		await dispatch(
			dateConsumptionAction.RemoveItemFromRecord(session, isAdded)
		);
		setIsAdded(null);
	};

	/**
	 * Remove current favourite item from the list
	 */
	const removeFavouriteItem = async () =>
		dispatch(cacheAction.RemoveFavouriteItem(item.food_name, item.calories));

	return (
		<div>
			<div style={{ flex: 1 }}>
				<p>{food_name}</p>
				<p
					style={{
						marginTop: 2,
						color: colors.app.dark_300,
						fontFamily: "Inter",
						flexWrap: "wrap",
					}}
				>
					{quantity} x {serving_unit} ({serving_qty}) / {calories} kcal
				</p>
			</div>
			<div
				style={{ flexDirection: "row", alignItems: "center", marginLeft: 30 }}
			>
				{isAdded ? (
					<button onClick={removeItem}>Remove Favourite</button>
				) : (
					<div style={{ flexDirection: "row", alignItems: "center" }}>
						<button
							onClick={(number > 0 && (() => setNumber(number - 1))) || null}
						>
							<div
								style={{
									paddingRight: 10,
									height: 25,
									justifyContent: "center",
								}}
							>
								-
							</div>
						</button>
						<p
							style={{
								color: number === 0 ? colors.app.dark_200 : colors.app.dark_400,
								fontFamily: "Inter-Medium",
								justifyContent: "center",
							}}
						>
							{number}
						</p>
						<button onClick={() => setNumber(number + 1)}>
							<div
								style={{
									paddingLeft: 10,
									height: 25,
									justifyContent: "center",
								}}
							>
								+
							</div>
						</button>
					</div>
				)}
				{number > 0 ? (
					<button onClick={addItem}>
						<p>Add</p>
					</button>
				) : (
					<button onClick={removeFavouriteItem}>
						<p>Remove</p>
					</button>
				)}
			</div>
		</div>
	);
};

export default NewItemScreen;
