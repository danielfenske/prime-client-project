import { useDispatch, useSelector } from 'react-redux';


function OpportunityCard() {


    const buttonClick = () => {
        console.log('you clicked a button');
    }

    return(
        <>
        <button onClick={buttonClick}>Hyello</button>
        </>
    )
}

export default OpportunityCard;