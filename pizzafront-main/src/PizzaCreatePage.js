import { useNavigate } from "react-router-dom";

export function PizzaCreatePage(){
    const navigate = useNavigate();
    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Új pizza</h2>
            <form
            onSubmit={(event) => {
                event.persist();
                event.preventDefault();
                fetch(`https://pizza.kando-dev.eu/Pizza`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: event.target.elements.name.value,
                        isGlutenFree: event.target.elements.isglutenfree.value,
                        kepURL: event.target.elements.kepurl.value,
                    }),
                })
                .then(() =>
                {
                    navigate("/");
                })
                .catch(console.log);
            }}>
            <div className="form-group row pb-3">
                <label htmlFor="name" className="col-sm-3 col-form-label">Pizza név:</label>
                <div className="col-sm-9">
                <input type="text" id="name" name="name" className="form-control" />
                </div>
            </div>
            <div className="form-group row pb-3">
                <label htmlFor="isglutenfree" className="col-sm-3 col-form-label">Gluténmentes:</label>
                <div className="col-sm-9">
                <input type="number" id="isglutenfree" name="isglutenfree" className="form-control" />
                </div>
            </div>
            <div className="form-group row pb-3">
                <label htmlFor="kepurl" className="col-sm-3 col-form-label">Kép URL-je:</label>
                <div className="col-sm-9">
                <input type="text" id="kepurl" name="kepurl" className="form-control" />
                </div>
            </div>
            <button type="submit" className="btn btn-success">
                Küldés
            </button>
            </form>
        </div>
    );
}
export default PizzaCreatePage;
