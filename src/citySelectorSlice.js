import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibleStates: {},
  visibleCities: {},
  stateSelected: [],
  citySelected: [],
  data: { state: [], city: [] },
  searchQuery: "",
  filteredCities: [],
  allCities: [],
};

const citySelectorSlice = createSlice({
  name: "citySelector",
  initialState,
  reducers: {
    toggleCountry: (state, action) => {
      const { countryId } = action.payload;
      state.visibleStates[countryId] = !state.visibleStates[countryId];
    },
    toggleState: (state, action) => {
      const { stateId } = action.payload;
      state.visibleCities[stateId] = !state.visibleCities[stateId];
    },
    selectState: (state, action) => {
      const { stateName, cities } = action.payload;
      if (state.stateSelected.includes(stateName)) {
        state.stateSelected = state.stateSelected.filter(
          (item) => item !== stateName
        );
        state.citySelected = state.citySelected.filter(
          (city) => !cities.includes(city)
        );
      } else {
        state.stateSelected.push(stateName);
        state.citySelected.push(...cities);
      }

      state.data = { state: state.stateSelected, city: state.citySelected };
    },
    selectCity: (state, action) => {
      const { cityName, stateNames } = action.payload;

      if (cityName && stateNames) {
        state.citySelected = state.citySelected.filter(
          (item) => item !== cityName
        );
        state.stateSelected = state.stateSelected.filter(
          (stateName) => !stateNames.includes(stateName)
        );

        if (!state.citySelected.includes(cityName)) {
          state.citySelected.push(cityName);
        }

        state.stateSelected.push(...stateNames);
      } else if (cityName) {
        state.citySelected = state.citySelected.filter(
          (item) => item !== cityName
        );

        if (!state.citySelected.includes(cityName)) {
          state.citySelected.push(cityName);
        }

        state.stateSelected = [];
      }

      state.data = { state: state.stateSelected, city: state.citySelected };
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    filterCities: (state, action) => {
      const query = state.searchQuery.toLowerCase();
      if (query) {
        state.filteredCities = state.allCities.filter((city) => {
          const includesQuery = city.toLowerCase().includes(query);

          return includesQuery;
        });
      } else {
        state.filteredCities = [];
      }
    },
    setAllCities: (state, action) => {
      const data = action.payload;
      const allCities = [];

      data.forEach((country) => {
        country.state.forEach((state) => {
          state.city.forEach((city) => {
            allCities.push(city.name);
          });
        });
      });

      state.allCities = allCities;
    },
  },
});

export const {
  toggleCountry,
  toggleState,
  selectState,
  selectCity,
  setSearchQuery,
  filterCities,
  setAllCities,
} = citySelectorSlice.actions;

export default citySelectorSlice.reducer;
