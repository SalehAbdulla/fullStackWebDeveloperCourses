import contacts from "./contants";
import "./Card.css"
import Avatar from "./Avatar";
import Info from "./Info";

const Card = (card)=>{
    return (
        <div>
            <h1 className="heading" >{card.name}</h1>
            <div className="card">

                <div className="top">
                    <h2 className="name">{card.name}</h2>
                   <Avatar imgURL={card.imgURL}/>
                </div>

                <div className="bottom">
                    <Info info={card.email}/>
                    <Info info={card.phone}/>
                </div>

            </div>
        </div>
    )
}



export default Card