import React, { useContext, useEffect, useState } from "react";

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
import AiButton from "@/components/AiButton";
import { AuthContext } from "@/provider/context";
import { FaArrowLeft } from "react-icons/fa6";
import { AiFillDelete, AiFillStar, AiOutlineStar } from "react-icons/ai";
import {  BiRightArrowAlt } from "react-icons/bi";



const NewItemScreen = (props) => {
	const app_date = useSelector<RootState>(
		(state) => state.general.app_date
	) as string;

	const session = useRouter().query?.session || "breakfast";

	// Set the modal ID - Handles also the modal visibility
	const [modalItemID, setModalItemID] = useState<string>();
	const [results, setResults] = useState<Array<SearchCommonItem> | null>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const { currentUser } = useContext(AuthContext);

    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push(
                "/"
            )
        }
    }, [currentUser])

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


	return (
		<div
			style={{
				background: "white",
				paddingTop: 30,
				paddingBottom: 40,
				minHeight: "100vh",
			}}
		>
			<div
				style={{
					margin: "0 auto",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "0 20px"
				}}
			>
				<div onClick={router.back}><FaArrowLeft/></div>
				<p
					style={{
						fontSize: 18,
						fontWeight: "bold",
						textTransform: "capitalize",
					}}
				>
					{session.split("_").join(" ")}
				</p>
				<div/>
			</div>
			<SearchInput
				onSearch={Search}
				loading={loading}
				placeholder="Search for food item..."
			/>

			{results && results.length > 0 ? (
				<div style={{ marginTop: 40 }}>
					<p
						style={{
							textAlign: "center",
							fontSize: 18,
							color: "rgba(0, 0, 0, 0.65)",
						}}
					>
						Results
					</p>
					{/** Render data */}
					{/* <SearchResultRender OpenModal={OpenModal} items={results} /> */}
					<div
						style={{
							width: "40%",
							margin: "0 auto",
							display: "flex",
							flexDirection: "column",
							gap: 16,
							marginTop: 20,
						}}
					>
						{results.map((item) => (
							<ItemCard data={item} onPress={OpenModal} key={item.food_name} />
						))}
					</div>
				</div>
			) : (
				<div style={{ marginTop: 40 }}>
					<p
						style={{
							textAlign: "center",
							fontSize: 18,
							color: "rgba(0, 0, 0, 0.65)",
						}}
					>
						Your Favourites
					</p>
					{/* <FavouritesRender session={session} /> */}
					<RenderFavourite />
				</div>
			)}
			{modalItemID && (
				<ItemModal
					visible={!!modalItemID}
					onDismiss={CloseModal}
					ID={modalItemID}
					session={session}
				/>
			)}
			<AiButton/>
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
		<div
			style={{
				width: "40%",
				margin: "0 auto",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				paddingRight: 8,
				paddingLeft: 20,
				paddingTop: 4,
				paddingBottom: 4,
				borderWidth: 2,
				borderColor: colors.app.dark_100,
				backgroundColor: colors.app.dark_100,
				borderRadius: 15,
				marginTop: 32,
				boxSizing: "border-box",
			}}
		>
			<input
				placeholder={props.placeholder}
				value={p}
				onChange={(e) => setp(e.target.value)}
				style={{ width: "86%", background: "transparent", outline: "none" }}
			/>
			<button
				style={{
					background: colors.app.green_200,
					padding: "12px 12px",
					borderRadius: 12,
					color: "white",
				}}
				onClick={() => props.onSearch(p)}
			>
				Search
			</button>
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
		<div
			style={{
				borderBottom: "2px solid " + colors.tailwind.gray._100,
				padding: 16,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				cursor: "pointer"
			}}
			onClick={() => onPress(food_name)}
		>
			<div>
				<p
					style={{
						fontSize: 21,
						fontWeight: "bold",
						textTransform: "capitalize",
					}}
				>
					{food_name}
				</p>
				<p style={{ color: colors.app.dark_300 }}>
					{1} x {serving_unit} ({serving_qty}){" "}
					{calories && "/ " + calories + "kcal"}
				</p>
			</div>
			<div>
				<button ><BiRightArrowAlt/></button>
			</div>
		</div>
	);
};

const CardItem = ({ title, value, color }) => {
	return (
		<div
			style={{
				border: "2px solid " + colors.tailwind.blue_gray._100,
				padding: 20,
				display: "flex",
				alignItems: "center",
				borderRadius: 20,
				gap: 12,
			}}
		>
			<div
				style={{ width: 40, height: 40, borderRadius: 12, background: color }}
			></div>
			<div>
				<p style={{ color: colors.app.dark_500, fontWeight: "bold" }}>
					{title}
				</p>
				<p style={{ color: colors.app.dark_500 }}>{value}</p>
			</div>
		</div>
	);
};

const Cards = ({ data }) => {
	const data_local = [
		{
			id: 1,
			name: "Calories",
			value: data.nf_calories.toFixed(1) + " kc",

			opacity_color: colors.tailwind.green._200,
		},
		{
			id: 2,
			name: "Carbs",
			value: data.nf_total_carbohydrate.toFixed(1) + "g",
			opacity_color: colors.tailwind.purple._200,
		},
		{
			id: 3,
			name: "Fat",
			value: data.nf_total_fat.toFixed(1) + "g",
			opacity_color: colors.tailwind.orange._200,
		},
		{
			id: 4,
			name: "Protein",
			value: data.nf_protein.toFixed(1) + "g",
			opacity_color: colors.tailwind.sky._200,
		},
	];
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				gridRowGap: 12,
				gridColumnGap: 12,
				marginTop: 20,
				padding: "0 20px",
			}}
		>
			{data_local.map((item) => (
				<CardItem
					title={item.name}
					value={item.value}
					color={item.opacity_color}
					key={item.id}
				/>
			))}
		</div>
	);
};

const FavouriteText = ({ food_name, calories, onClick }) => {
	const favourites = useRootState((state) => state.cache.favourites);
	const dispatch = useRootDispatch();
	// Check if the item is present in the favourites list
	const isActive = () =>
		favourites.findIndex(
			(a) => a.food_name === food_name && a.calories === calories
		) < 0
			? false
			: true;

	// Remove the item from the favourite list
	const removeFavourite = async () =>
		dispatch(cacheAction.RemoveFavouriteItem(food_name, calories));
	return (
		<button onClick={isActive() ? removeFavourite : onClick}>
			{!isActive() ? <AiOutlineStar/> : <AiFillStar/>}
		</button>
	);
};

const ItemModal = ({ ID, visible, onDismiss, session }) => {
	const dispatch = useRootDispatch();
	const router = useRouter();

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
		router.push("/main");
		onDismiss();
	};

	// Add the item to the favourite list
	const setFavourite = async () => dispatch(cacheAction.AddFavouriteItem(data));

	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				background: "rgba(0,0,0,.2)",
				position: "fixed",
				top: 0,
			}}
		>
			<div
				style={{
					width: 500,
					background: "white",
					border: "2px solid " + "rgba(0,0,0,.05)",
					borderRadius: 20,
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<div>
					{result && (
						<div>
							<div>
								{/**Children data */}
								<div
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										marginTop: 20,
										padding: "0 20px",
									}}
								>
									<div onClick={onDismiss}><FaArrowLeft/></div>
									<p
										style={{
											fontSize: 21,
											fontWeight: "bold",
											textTransform: "capitalize",
										}}
									>
										{data.food_name}
									</p>
									<FavouriteText
										onClick={setFavourite}
										calories={data.calories}
										food_name={data.food_name}
									/>
								</div>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										gap: 12,
										margin: "0 20px",
										paddingTop: 30,
									}}
								>
									<div
										style={{
											background: colors.tailwind.blue_gray._100,
											borderRadius: 20,
											flex: 1,
											padding: 12,
										}}
									>
										<p
											style={{
												fontSize: 16,
												color: colors.tailwind.blue_gray._600,
												fontWeight: "bold",
												textAlign: "center",
											}}
										>
											Quantity
										</p>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												gap: 20,
												color: colors.tailwind.blue_gray._700,
											}}
										>
											<div
												style={{
													fontSize: 24,
													fontWeight: "bold",
													cursor: "pointer",
												}}
												onClick={() =>
													quantity > 0 ? set_quantity(quantity - 1) : null
												}
											>
												-
											</div>
											<p
												style={{
													fontSize: 21,
													fontWeight: "bold",
													color: "black",
												}}
											>
												{quantity}
											</p>
											<div
												style={{
													fontSize: 24,
													fontWeight: "bold",
													cursor: "pointer",
												}}
												onClick={() => set_quantity(quantity + 1)}
											>
												+
											</div>
										</div>
									</div>
									<div
										style={{
											background: colors.tailwind.blue_gray._100,
											borderRadius: 20,
											flex: 1,
											padding: 12,
										}}
									>
										<p
											style={{
												fontSize: 16,
												color: colors.tailwind.blue_gray._600,
												fontWeight: "bold",
												textAlign: "center",
											}}
										>
											Type
										</p>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												gap: 20,
												color: colors.tailwind.blue_gray._700,
											}}
										>
											<p
												style={{
													fontSize: 21,
													fontWeight: "bold",
													color: "black",
												}}
											>
												{data.serving_qty} {data.serving_unit}
											</p>
										</div>
									</div>
								</div>

								{/** Render data */}
								{result && <Cards data={result} />}

								<div
									style={{
										marginTop: 20,
										marginBottom: 20,
										display: "flex",
										alignItems: "center",
									}}
								>
									<button
										style={{
											margin: "0 20px",
											padding: "16px 0",
											background: colors.app.green_100,

											marginTop: 20,
											width: "100%",
											boxSizing: "border-box",
											borderRadius: 12,
											fontSize: 18,
											fontWeight: "bold",
											color: "white",
										}}
										onClick={AddNewItem}
									>
										Save
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			<div onClick={onDismiss} style={{ width: "100%", height: "100vh" }}></div>
		</div>
	);
};

const RenderFavourite = () => {
	const favourites = useRootState((state) => state.cache.favourites);
	return (
		<div style={{ margin: "0 auto", width: "40%", marginTop: 40 }}>
			{favourites.length > 0 ? (
				favourites.map((favourite) => (
					<FavouriteCard
						key={favourite.id as number}
						item={favourite}
						session={Session.breakfast}
					/>
				))
			) : (
				<p style={{ textAlign: "center" }}>No favourites</p>
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
		<div
			style={{
				borderBottom: "2px solid " + colors.tailwind.blue_gray._100,
				padding: 20,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<div style={{ flex: 1 }}>
				<p
					style={{
						fontSize: 18,
						fontWeight: "bold",
						textTransform: "capitalize",
					}}
				>
					{food_name}
				</p>
				<p
					style={{
						marginTop: 2,
						color: colors.app.dark_300,
						flexWrap: "wrap",
					}}
				>
					{quantity} x {serving_unit} ({serving_qty}) / {calories} kcal
				</p>
			</div>
			<div
				style={{
					flexDirection: "row",
					alignItems: "center",
					marginLeft: 30,
					display: "flex",
				}}
			>
				{isAdded ? (
					<button onClick={removeItem}>Remove</button>
				) : (
					<div
						style={{
							flexDirection: "row",
							alignItems: "center",
							display: "flex",
						}}
					>
						<button
							onClick={(number > 0 && (() => setNumber(number - 1))) || null}
						>
							<div
								style={{
									paddingRight: 10,
									justifyContent: "center",
									fontSize: 24,
									fontWeight: "bold",
									color: colors.tailwind.blue_gray._500,
								}}
							>
								-
							</div>
						</button>
						<p
							style={{
								color: number === 0 ? colors.app.dark_200 : colors.app.dark_400,
								justifyContent: "center",
								fontSize: 21,
							}}
						>
							{number}
						</p>
						<button onClick={() => setNumber(number + 1)}>
							<div
								style={{
									paddingRight: 20,
									paddingLeft: 10,
									justifyContent: "center",
									fontSize: 24,
									fontWeight: "bold",
									color: colors.tailwind.blue_gray._500,
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
						<AiFillDelete/>
					</button>
				)}
			</div>
		</div>
	);
};

export default NewItemScreen;
