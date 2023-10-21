import { SearchCommonItem } from "@/interface";

const Fetch = async (route: string, params?: any) => {
    try {
      return await (await fetch(route, params)).json();
    } catch (error) {
      console.log(error.message);
    }
};

const InstantSearch= async (query): Promise<Array<SearchCommonItem>|null> => {
  try {
    const data = await Fetch(
      "https://trackapi.nutritionix.com/v2/search/instant",
      {
        method: "POST",
        headers: {
          "x-app-id": "b440226d",
          "x-app-key": "0abf05b85324a05f917c9dea030502d0",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      }
    );

    if (data) {
      const format = data?.common?.map(
				(a) =>
					({
						// Choose only the interested fields
						food_name: a.food_name,
						calories: a.nf_calories,
						serving_unit: a.serving_unit,
						serving_qty: a.serving_qty,
					} as SearchCommonItem)
			) as Array<SearchCommonItem>;

      return format;
    }
    return null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const NutrientSearch = async (query) => {
  try {
    const data = (
      await Fetch("https://trackapi.nutritionix.com/v2/natural/nutrients/", {
        method: "POST",
        headers: {
          "x-app-id": "b440226d",
          "x-app-key": "0abf05b85324a05f917c9dea030502d0",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      })
    ).foods[0];

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const nutritionix =  {
  search: InstantSearch,
  nutrients: NutrientSearch,
};

export default nutritionix
