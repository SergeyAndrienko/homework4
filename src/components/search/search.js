import React, {useState, useEffect} from 'react';
import Modal from "../modal/modal";
import HolidayItem from "../holiday-item/holiday-item";
import Spinner from "../spiner/spiner";
import HolidayList from "../holiday-list/holiday-list";

function Search() {

    const [items, setItems] = useState([]);
    const [searchDate, setSearchDate] = useState('');
    const [codeCountry, setCodeCountry] = useState(['AD']);
    const [nameHolidays, setNameHolidays] = useState([]);
    const [isLoaded, setIsLoaded] = useState('');

    useEffect(() => {
        fetch("https://date.nager.at/api/v3/AvailableCountries ")
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);

                }
            )
    }, []);


    function handleSubmit(e) {
        fetch(`https://date.nager.at/api/v3/PublicHolidays/${searchDate}/${codeCountry}`)
            .then(res => res.json())
            .then((result) => {
                    setNameHolidays(result);
                    setIsLoaded(false)

                }
            )
        e.preventDefault();

        setIsLoaded(true)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="countryCode">
                    Country code:
                    <select
                        onChange={e => {
                            setCodeCountry(e.target.value)
                        }}
                        value={codeCountry}
                        multiple={false}
                        id="countryCode"
                    >   {items.map(item => (
                        <option key={item.name}>
                            {item.countryCode}
                        </option>
                    ))}
                    </select>
                </label>

                <label htmlFor="year">
                    Year:
                    <input type="number" min="1000"
                           onChange={(e) => setSearchDate(e.target.value)}
                           value={searchDate}
                           required
                           id="year"

                    />
                </label>
                <button type="submit">
                    Search
                </button>
            </form>

            <HolidayList isLoaded={isLoaded} nameHolidays={nameHolidays} countryCode={codeCountry}
                         searchDate={searchDate}/>

        </div>
    );
};


export default Search;





