import Card from "../Card/Card";

export default function Cards({Videos}) {

   return (
      <div>
          {Videos.map(prop => 
              <Card 
                 key={prop.id}
                 id={prop.id}
                 name={prop.name}
                 image={prop.image}
                 released_at={prop.released_at}
                 genres={prop.genres}
              />
          )}
      </div>
   )
};