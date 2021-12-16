const Recherche = (props) => {
  const { valeur, setValeur, callApi } = props;

  const handleChange = (e) => {
    setValeur(e.target.value);
  };
  return (
    <>
      <input type="text" value={valeur} onChange={handleChange} />
      <button onClick={callApi}>Rechercher</button>
    </>
  );
};

export default Recherche;
