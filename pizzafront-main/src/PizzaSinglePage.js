import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

export function PizzaSinglePage(props) {
    const params = useParams();
    const id = params.pizzaId;
    const[pizza,setPizza] = useState([]);
    const[isPending, setPending] = useState(false);
    useEffect(() => {
        setPending(true);
        (async () => {
            try {
                const res= await fetch(`https://pizza.kando-dev.eu/Pizza/${id}`)
                const pizza = await res.json();
                setPizza(pizza);
            }
            catch(error) {
                console.log(error);
            }
            finally {
                setPending(false);
            }
        })();
    }, [id]);

    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            {isPending || !pizza.id ? (
                <div className="spinner-border" role="progressbar"></div>
            ) : (
                <div className="card p-3">
                    <div className="card-body">
                        <h5 className="card-title">{pizza.name}</h5>
                        <div className="lead">Gluténmentes: {pizza.isGlutenFree>0? "igen" : "nem" }</div>
                        <img alt={pizza.name}
                            className="img-fluid rounded"
                            style={{maxHeight: "500px"}}
                            src={pizza.kepURL ? pizza.kepURL : 
                            "https://via.placeholder.com/400x800"} 
                        />
                    </div>
                    <div>
                        <NavLink role='back-link' to="/"><i className="bi bi-backspace"></i></NavLink>
                        <NavLink role='edit-pizza-link' key="y" to={"/mod-pizza/" + pizza.id}><i className="bi bi-pencil"></i></NavLink>
                    </div>   
                </div>
            )}
        </div>
    );
}
export default PizzaSinglePage;
