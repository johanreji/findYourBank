import './App.css';
import { Routes, Route } from "react-router-dom";
import SideNav from './Components/SideNav';
import AllBanks from './Components/AllBanks';
import BankDetail from './Components/BankDetail';
import { useEffect, useState } from "react";
const URL = "https://vast-shore-74260.herokuapp.com/banks?city="

function App() {

  const [banks, setBanks] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [city, setCity] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setIsError(false)
      try {
        let response = await fetch(URL + city.toUpperCase());
        let data = await response.json();
        if (data && Array.isArray(data)) {
          setBanks(data);
        } else {
          setIsError(true)
        }
      } catch (error) {
        setIsError(true)
      };
      setIsLoading(false)
    }
    fetchData();
  }, [city]);

  const toggleFav = (ifsc) => {
    favourites.includes(ifsc) ?
      setFavourites(favourites.filter(fav => fav != ifsc)) :
      setFavourites([...favourites, ifsc]);
  }

  return (
    <>
      <div className="header">Find Your Bank</div>
      <div className="main">
        <SideNav />
        <div className="content">
          <Routes>
            <Route path="/all-banks"
              element={<AllBanks isError={isError} isLoading={isLoading} pageSize={pageSize}
                setPageSize={setPageSize} startIndex={startIndex} setStartIndex={setStartIndex}
                setCity={setCity} city={city} banks={banks} />} />

            <Route path="/bank-details/:ifsc" element={<BankDetail favourites={favourites} toggleFav={toggleFav} banks={banks} />} />
            <Route path="/favourites"
              element={<AllBanks isFavourite={true} isError={isError} isLoading={isLoading} pageSize={pageSize}
                setPageSize={setPageSize} startIndex={startIndex} setStartIndex={setStartIndex}
                setCity={setCity} city={city} banks={banks.filter(bank => favourites.includes(bank.ifsc))} />} />
            <Route path="/" element={<AllBanks isError={isError} isLoading={isLoading} pageSize={pageSize}
              setPageSize={setPageSize} startIndex={startIndex} setStartIndex={setStartIndex}
              setCity={setCity} city={city} banks={banks} />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
