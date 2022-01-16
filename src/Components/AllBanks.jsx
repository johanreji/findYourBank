import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './AllBanks.css';

const PAGE_SIZE_LIST = [10, 20, 30, 40, 50];
const AllBanks = ({ isFavourite, banks, city, setCity, startIndex, setStartIndex, pageSize, setPageSize, isError, isLoading }) => {
    const [query, setQuery] = useState("");
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        setStartIndex(0);
    }, [isFavourite, city])

    useEffect(() => {
        if (query == "IFSC") {
            setStartIndex(0);
            setFilteredData(banks.filter(bank => bank.ifsc.includes(searchText)));
        } else if (query == "branch") {
            setStartIndex(0);
            setFilteredData(banks.filter(bank => bank.branch.includes(searchText)));
        } else if (query == "bank_name") {
            setStartIndex(0);
            setFilteredData(banks.filter(bank => bank.bank_name.includes(searchText)));
        } else {
            setFilteredData(banks);
        }

    }, [searchText, query, banks])
    return <div>
        <div className="headerSection">
            <div className="sectionHeader"> {isFavourite ? 'Favourite' : 'All'} banks</div>
            <div className="sectionFilter">
                <select className="cityFilter" value={city} onChange={(e) => setCity(e.target.value)}>
                    <option value="">Select city</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Ernakulam">Ernakulam</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Delhi">Delhi</option>
                </select>
                <select value={query} onChange={(e) => setQuery(e.target.value)}>
                    <option value="">Select category</option>
                    <option value="IFSC">IFSC</option>
                    <option value="branch">Branch</option>
                    <option value="bank_name">Bank name</option>
                </select>
                <input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search"></input>
            </div>
        </div>
        <div className="dataHeader">
            <span>Bank</span>
            <span>IFSC</span>
            <span>Branch</span>
            <span>Bank ID</span>
            <span>Address</span>
        </div>

        {isError && !isLoading && <div className="errorMsg">Error fetching data</div>}
        {!isError && isLoading && <div className="infoMsg">Loading data...</div>}
        {!isError && !isLoading && filteredData.length == 0 && <div className="infoMsg">No data found</div>}

        {!isError && !isLoading && <div>{filteredData && filteredData.slice(startIndex, startIndex + pageSize).map(bank =>
            <Link className="dataRow" to={`/bank-details/${bank.ifsc}`} key={bank.ifsc}>
                <span>{bank.bank_name}</span>
                <span>{bank.ifsc}</span>
                <span>{bank.branch}</span>
                <span>{bank.bank_id}</span>
                <span>{bank.address}</span>
            </Link>
        )}</div>}

        {!isError && !isLoading && filteredData.length > 0 && <div className="footer">
            <span>Rows per page</span>
            <select value={pageSize} onChange={(e) => { setStartIndex(0); setPageSize(+e.target.value); }}>
                {PAGE_SIZE_LIST.map(size => <option value={size}>{size}</option>)}
            </select>

            <div className="navigation" onClick={() => {
                if (startIndex != 0)
                    setStartIndex(startIndex - pageSize);
            }}>{'<'}</div>
            <span>{startIndex + 1}-{startIndex + pageSize} of {filteredData.length}</span>
            <div className="navigation" onClick={() => {
                if (startIndex + pageSize < filteredData.length)
                    setStartIndex(startIndex + pageSize);
            }}>{">"}</div>

        </div>}
    </div>
}
export default AllBanks;