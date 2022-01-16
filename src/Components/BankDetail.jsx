
import { useParams, Link } from "react-router-dom";
import './BankDetail.css'
import backArrow from '../backArrow.png';

const BankDetails = ({ banks }) => {
    const { ifsc } = useParams();
    let selectedBank = banks.find(bank => bank.ifsc == ifsc);

    return <div>
        <div className="sectionHeader">
            <Link className="backBtn" to={`/all-banks`}>
                <img src={backArrow} />
            </Link>
            Bank details
        </div>
        <div>
            <div className="bankField">
                <div>Bank name: </div>
                <div> {selectedBank.bank_name}</div>
            </div>
            <div className="bankField">
                <div>Bank ID: </div>
                <div> {selectedBank.bank_id}</div>
            </div>
            <div className="bankField">
                <div>IFSC code: </div>
                <div>{selectedBank.ifsc}</div>
            </div>
            <div className="bankField">
                <div>Branch: </div>
                <div>
                    {selectedBank.branch}
                </div>
            </div>
            <div className="bankField">
                <div>Address: </div>
                <div>
                    {selectedBank.address}<br />
                    {selectedBank.city}<br />
                    {selectedBank.district}<br />
                    {selectedBank.state}
                </div>
            </div>
        </div>
    </div>
}


export default BankDetails;