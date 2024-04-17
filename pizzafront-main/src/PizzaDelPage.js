import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

export function PizzaDelPage(props) {
    const params = useParams();
    const id = params.pizzaId;
    const navigate = useNavigate();
    const[pizza,setPizza] = useState([]);
    const[isPending, setPending] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`https://pizza.kando-dev.eu/Pizza/${id}`);
                const pizzaData = await res.json();
                setPizzaData(pizzaData);
                setModname(pizzaData.name);
                setModisGlutenFree(pizzaData.isGlutenFree);
                setModimageURL(pizzaData.kepURL);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            await fetch(`https://pizza.kando-dev.eu/Pizza/${id}`, {
                method: "DELETE",
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            {isPending || !pizza.id ? (
                <div className="spinner-border"></div>
            ) : (
                <div className="card p-3">
                    <div className="card-body">
                        <h5 className="card-title">Törlendő elem: {pizza.name}</h5>
                        <div className="lead">Gluténmentes: {pizza.isGlutenFree>0? "igen" : "nem" }</div>
                        <img alt={pizza.name}
                            className="img-fluid rounded"
                            style={{maxHeight: "500px"}}
                            src={pizza.kepURL ? pizza.kepURL : 
                            "https://via.placeholder.com/400x800"} 
                        />
                    </div>
                    <form onSubmit={handleDelete}>
                        <div>
                            <NavLink to={"/"}><button className="bi bi-backspace">Mégsem</button></NavLink>
                            
                            <button className="bi bi-trash3">Törlés</button>
                        </div>
                    </form>   
                </div>
            )}
        </div>
    );
}

export default PizzaDelPage;
