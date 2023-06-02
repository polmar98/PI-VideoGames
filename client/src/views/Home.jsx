import Cards from "../components/Cards/Cards"
import Datos from "./Datos";

export default function Home(props) {
    const Videos = Datos;
    return (
        <div>
           <Cards Videos={Videos}/>
        </div>
    )
}