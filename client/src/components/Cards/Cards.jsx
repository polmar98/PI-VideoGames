import Card from "../Card/Card";
import style from "../Cards/Cards.module.css";

export default function Cards({Videos}) {
   return (
      <div>
         <div className={style.divTarjetas}>
           {Videos.map(prop => 
              <Card 
                 key={prop.id}
                 id={prop.id}
                 name={prop.name}
                 image={prop.image}
                 released={prop.released}
                 genres={prop.Genres}
                 rating={prop.rating}
                 platforms={prop.Platforms}
                 createdinDb={prop.createdInDb}
              />
          )}
          </div>
      </div>
   )
};