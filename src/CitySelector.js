import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import countryList from "./task.json";
import {
  toggleCountry,
  toggleState,
  selectState,
  selectCity,
  setSearchQuery,
  filterCities,
  setAllCities,
} from "./citySelectorSlice";
import "./App.css";
const CitySelector = () => {
  const dispatch = useDispatch();
  const {
    visibleStates,
    visibleCities,
    stateSelected,
    citySelected,
    data,
    searchQuery,
    filteredCities,
  } = useSelector((state) => state.citySelector);

  const handleCountryClick = (country) => {
    dispatch(toggleCountry({ countryId: country.id }));
  };

  const handleStateCheck = (state) => {
    const stateName = state.state;
    const cities = state.city.map((city) => city.name);
    dispatch(selectState({ stateName, cities }));
  };

  const handleCityCheck = (state, city) => {
    const cityName = city.name;
    const stateNames = countryList
      .map((country) =>
        country.state.find((s) => s.city.some((c) => c.name === cityName))
      )
      .filter(Boolean)
      .map((state) => state.state);
    dispatch(selectCity({ cityName, stateNames }));
  };
  const handleCitCheck = (city) => {
    const cityName = city;
    const stateNames = countryList
      .map((country) =>
        country.state.find((s) => s.city.some((c) => c.name === cityName))
      )
      .filter(Boolean)
      .map((state) => state.state);

    dispatch(selectCity({ cityName, stateNames }));
  };

  const handleStateClick = (state) => {
    dispatch(toggleState({ stateId: state.id }));
  };

  useEffect(() => {
    dispatch(setAllCities(countryList));
    console.log(filteredCities);
  }, []);

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
    dispatch(filterCities());
  };

  return (
    <div className="container d-flex justify-content-center flex-column align-items-center">
      <div className="  ">
        <div className=" panel rounded-2 shadow-lg p-3">
          <div className="w-100">
            <input
              type="text"
              placeholder="Search for a city"
              value={searchQuery}
              onChange={handleSearch}
            />
            <ul className="">
              {filteredCities?.map((city, index) => (
                <li key={index} onClick={() => handleCitCheck(city)}>
                  {city}
                </li>
              ))}
            </ul>
          </div>
          <ul>
            {countryList?.map((country) => (
              <div key={country.id}>
                <div
                  className="fw-bold fs-5"
                  onClick={() => handleCountryClick(country)}
                >
                  {country.country}
                </div>
                <ul>
                  {visibleStates[country.id] &&
                    country.state?.map((state) => (
                      <div key={state.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={stateSelected.includes(state.state)}
                          onChange={() => handleStateCheck(state)}
                        />
                        <span
                          className="px-3"
                          onClick={() => handleStateClick(state)}
                        >
                          {state.state}
                        </span>
                        <ul>
                          {visibleCities[state.id] &&
                            state.city?.map((city) => (
                              <div key={city.id}>
                                <input
                                  className="mx-3 form-check-input"
                                  type="checkbox"
                                  checked={citySelected.includes(city.name)}
                                  onChange={() => handleCityCheck(state, city)}
                                />
                                <span className="">{city.name}</span>
                                <br />
                              </div>
                            ))}
                        </ul>
                      </div>
                    ))}
                </ul>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="my-5">
        <button className="btn  btn-warning " onClick={() => console.log(data)}>
          submit
        </button>
      </div>
    </div>
  );
};

export default CitySelector;
