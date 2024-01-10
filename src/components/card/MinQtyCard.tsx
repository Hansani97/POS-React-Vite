import React from "react";

interface ProductsProps{
    image:string,
    name:string,
    description:string,
}
function MinQtyCard(props:ProductsProps){
    const styleObj:React.CSSProperties={
        width:'100%',
        marginBottom:'10px'
    }

    return(
        <div className="card" style={styleObj}>
            <img src={props.image} className="card-img-top" alt={props.name}/>
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">{props.description}</p>
                    {/*<a href="#" className="btn btn-primary">Go somewhere</a>*/}
                </div>
        </div>
    )
}

export default MinQtyCard