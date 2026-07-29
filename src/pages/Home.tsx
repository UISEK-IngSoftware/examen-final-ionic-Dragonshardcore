/*CAPA: PRESENTACIÓN 
Consume la información desde la capa de servicios y la muestra utilizando 
componentes de Ionic React.*/
import defaultCharacter from '../assets/default-character.png';
import { useEffect, useState } from 'react';

import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import './Home.css';
import { getCharacters } from '../services/futuramaService';
import { Character } from '../model/Character';

const Home: React.FC = () => {

  /* Estados de la aplicación 
  characters -> almacena la lista de personajes.
  loading    -> controla el estado de carga.
  error      -> almacena el mensaje de error.
  */
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  /*Función encargada de solicitar la información a la capa de servicios*/
  const loadCharacters = async () => {
    // Activa el indicador de carga.
    setLoading(true);
    // Limpia cualquier error anterior.
    setError("");
    try {
      // Obtiene los personajes desde la API.
      const data = await getCharacters();
      // Guarda los personajes en el estado.
      setCharacters(data);

    } catch (error) {
      // Muestra el error en la consola.
      console.error(error);
      // Mensaje que verá el usuario.
      setError("No fue posible cargar los personajes.");

    } finally {
      // Finaliza el estado de carga.
      setLoading(false);

    }

  };
  useEffect(() => {
    loadCharacters();
  }, []);

  /*Permite actualizar manualmente la lista deslizando la pantalla.*/
  const refresh = async (event: CustomEvent) => {

    await loadCharacters();

    // Finaliza la animación del refresher.
    event.detail.complete();

  };

  return (

    <IonPage>

      {/* Encabezado de la aplicación */}
      <IonHeader>

        <IonToolbar color="primary">

          <IonTitle>
            Personajes de Futurama
          </IonTitle>

        </IonToolbar>

      </IonHeader>

      <IonContent fullscreen>

        {/* Permite actualizar la lista deslizando hacia abajo */}
        <IonRefresher
          slot="fixed"
          onIonRefresh={refresh}
        >
          <IonRefresherContent />
        </IonRefresher>

        {/* Estado de carga */}
        {loading && (

          <div className="loading-container">

            <IonSpinner name="crescent" />

            <p>Cargando personajes...</p>

          </div>

        )}

        {/* Estado de error */}
        {!loading && error && (

          <IonText color="danger">

            <h3 style={{ textAlign: "center" }}>
              {error}
            </h3>

          </IonText>

        )}

        {/* Estado cuando la API no devuelve información */}
        {!loading && !error && characters.length === 0 && (

          <IonText color="medium">

            <h3 style={{ textAlign: "center" }}>
              No existen personajes.
            </h3>

          </IonText>

        )}

        {/* Lista de personajes */}
        {!loading && !error && characters.length > 0 && (

          <IonList>

            {/* Recorre el arreglo de personajes y genera una tarjeta por cada uno */}
            {characters.map((character) => (

              <IonCard key={character.id}>

                <IonCardContent>

                  <IonItem lines="none">

                    {/* Imagen del personaje */}
                    <IonAvatar slot="start">

                      <img
                        src={character.image ?? defaultCharacter}
                        alt={character.name}
                      />

                    </IonAvatar>

                    {/* Información del personaje */}
                    <IonLabel>

                      <h2>{character.name}</h2>

                      <p>
                        <strong>Género:</strong> {character.gender}
                      </p>

                      <p>
                        <strong>Estado:</strong> {character.status}
                      </p>

                    </IonLabel>

                  </IonItem>

                </IonCardContent>

              </IonCard>

            ))}

          </IonList>

        )}

      </IonContent>

    </IonPage>

  );

};

export default Home;