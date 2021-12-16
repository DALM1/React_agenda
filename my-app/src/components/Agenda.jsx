import { useState, useEffect, useRef, useCallback } from "react";
import Card from "./Card";
import Recherche from "./Recherche";
// import Lottie from "react-lottie";
import * as animationData from "./animation.json";
const Agenda = () => {
  const maRef = useRef();
  const [state, setState] = useState([]);
  const [valeur, setValeur] = useState("");

  const [loading, setLoading] = useState(true);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const callApi = useCallback(() => {
    setLoading(true);
    //le useCallback permet de garder en mémoire la définition de la fonction. Autrement dit elle ne sera pas recalculée à chaque fois
    let url = `https://data.iledefrance.fr/api/records/1.0/search/?dataset=evenements-publics-cibul&q=${valeur}&rows=36`; //ES6
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setState(data.records);
        setLoading(false);
      });
  }, [valeur]); //on a besoin d'indiquer la dépendance variable "valeur" dans les dépendances car on l'utilise dans la fonction callApi

  //   const callApi = () => {
  //     let url = `https://data.iledefrance.fr/api/records/1.0/search/?dataset=evenements-publics-cibul&q=${valeur}&rows=36`; //ES6
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setState(data.records);
  //       });
  //   };
  //   useEffect(() => {
  //         callApi();
  //   }, []);
  //   useEffect(() => {
  //     let debounce; //je déclare ma variable debounce (pour ne pas avoir d'erreur "debounce non défini" dans notre cleanup function)

  //     if (valeur.length > 0) { // s'il y a au moins une lettre de tapée, je lance le compteur
  //       debounce = setTimeout(() => { //je stocke dans la variable debounce,le timeout qui va appeler callApi() 2 secondes après
  //         callApi();
  //       }, 2000);
  //     } else {  //si on a rien dans valeur, comme c'est le cas lors du premier chargement du composant, on appelle directement callApi sans attendre
  //       callApi();
  //     }
  //     return () => {
  //       //cleanup
  //       clearTimeout(debounce); // on supprime le précédent timeout pour ne pas avoir autant de requête de faites que de lettres
  //     };
  //   }, [valeur, callApi]); //on doit rentrer dans le useEffect à chaque modification de valeur. On est aussi obligé de charger callApi sinon on aura un warning dans noter terminal, mais il faudra prévoir le fait que callApi soit englobé dans un useCallBack pour ne pas que callApi soit recalculé à chaque fois, sinon on aura une boucle infinie ici
  useEffect(() => {
    clearTimeout(maRef.current);
    if (valeur.length > 0) {
      // s'il y a au moins une lettre de tapée, je lance le compteur
      maRef.current = setTimeout(() => {
        //je stocke dans la variable debounce,le timeout qui va appeler callApi() 2 secondes après
        callApi();
      }, 2000);
    } else {
      //si on a rien dans valeur, comme c'est le cas lors du premier chargement du composant, on appelle directement callApi sans attendre
      callApi();
    }
  }, [valeur, callApi]); //on doit rentrer dans le useEffect à chaque modification de valeur. On est aussi obligé de charger callApi sinon on aura un warning dans noter terminal, mais il faudra prévoir le fait que callApi soit englobé dans un useCallBack pour ne pas que callApi soit recalculé à chaque fois, sinon on aura une boucle infinie ici

  // Si je veux afficher uniquement le bouton annuler la recherche lorsque valeur a un moins un caractère (mais du coup vous perdez le reste du return, puisque le return qui suivra ne sera pas appelé)
  //   if (valeur.length > 0 ) {
  //       return (
  //           <button>Annuler la recherche</button>
  //       )
  //   }

  const handleResetSearch = () => {
    setValeur("");
  };
  return (
    <>
      <Recherche valeur={valeur} setValeur={setValeur} callApi={callApi} />
      {valeur.length > 0 ? (
        <button onClick={handleResetSearch}>Annuler la recherche</button>
      ) : (
        <button>Reset</button>
      )}
      {loading ? (
        // <Lottie> etait à la place de recherche ????
        <Recherche options={defaultOptions} height={400} width={400} />
      ) : (
        <div className="d-flex flex-row flex-wrap justify-content-center">
          {state.length > 0 ? (
            state.map((item) => {
              return (
                <Card
                  key={item.recordid}
                  title={item.fields.title}
                  link={item.fields.link}
                  image={item.fields.image}
                  description={item.fields.description}
                />
              );
            })
          ) : (
            <div>Aucun résultat</div>
          )}
        </div>
      )}
    </>
  );
};

export default Agenda;

// 14h15: PIRATES
// 14h45: START UP NATION
// 15h15:OCEAN PIXEL
// 15h45:TRIPEE
// 16h15: BRIC ET BROC
// Merci de me dire si tous sont bien prévenus
