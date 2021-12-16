const Card = (props) => {
  const { title, link, image, description } = props;

  return (
    <div className="card m-1" style={{ width: "18rem" }}>
      <img className="card-img-top" src={image} alt="Card" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href={link} className="btn btn-primary">
          Voir l'évènement
        </a>
      </div>
    </div>
  );
};

export default Card;
