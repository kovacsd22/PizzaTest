import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function PizzaModPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const [pizzaData, setPizzaData] = useState({});
    const [modname, setModname] = useState("");
    const [modisGlutenFree, setModisGlutenFree] = useState(false);
    const [modimageURL, setModimageURL] = useState("");

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

    const modName = (e) => {
        setModname(e.target.value);
    }
    const modIsGlutenFree = (e) => {
        setModisGlutenFree(e.target.checked);
    }
    const modImageURL = (e) => {
        setModimageURL(e.target.value);
    }

    const handleModification = () => {
      console.log("Módosítás előtt:", pizzaData);
  
      fetch(`https://pizza.kando-dev.eu/Pizza/${id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              id: pizzaData.id,
              name: modname,
              isGlutenFree: modisGlutenFree ? 1 : 0,
              kepURL: modimageURL,
          }),
      })
      .then((response) => {
          console.log("PUT válasz fejlécek:", response.headers);
          console.log("PUT válasz státusz:", response.status);
  
          return response.text(); 
      })
      .then((data) => {
          console.log("Módosítás után (szöveges válasz):", data);
          navigate("/");
      })
      .catch((error) => {
          console.error("PUT Error:", error);
      });
  }
    return (
        <div className='p-5 content bg-lavender text-center'>
            <h2>Pizza módosítás</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleModification();
                }}
            >
                <div className='form-group row pb-3'>
                    <label htmlFor="name" className='col-sm-3 col-form-label'> Név: </label>
                    <div>
                        <input type="text" id="name" name="name" className="form-control" value={modname} onChange={modName} autoComplete="off" />
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <label htmlFor="isGlutenFree" className='col-sm-3 col-form-label'> Gluténmentes: </label>
                    <div>
                        <input type="checkbox" id="isGlutenFree" name="isGlutenFree" className="form-check-input" checked={modisGlutenFree} onChange={modIsGlutenFree} />
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <label htmlFor="imageURL" className='col-sm-3 col-form-label'> Kép URL: </label>
                    <div>
                        <input type="text" id="imageURL" name="imageURL" className="form-control" value={modimageURL} onChange={modImageURL} autoComplete="off" />
                    </div>
                </div>
                <button type="submit" className='btn btn-success'>Küldés</button>
            </form>
        </div>
    );
}