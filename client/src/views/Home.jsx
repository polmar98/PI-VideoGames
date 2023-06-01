import Cards from "../components/Cards/Cards"
import Datos from "./Datos";

export default function Home(props) {
    const Videos = Datos;
    console.log("(1)Tipo:",typeof Videos);
    return (
        <div>
           <Cards Videos={Videos}/>
        </div>
    )
}