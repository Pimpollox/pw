import React from "react";
import PropTypes from "prop-types";
import './CollectionCard-Style.css';

function CollectionCard({ collection }) {
  const modelo = collection.modelos && collection.modelos[0] ? collection.modelos[0] : null;
<<<<<<< HEAD
  const imagenUrl = modelo && modelo.imagen ? modelo.imagen : '/data/6d770e1266568c74.png';
=======
  const imagenUrl = modelo && modelo.imagen ? modelo.imagen : '/data/imgpordefecto.jpg'; 
>>>>>>> 824cb14520404e6cdddce334cde54457f501f5fb

  return (
    <div className="CollectionCard">
      {modelo ? (
        <div className="bckg-div" style={{ backgroundImage: `url(${imagenUrl})` }}>
          <h3>{collection.nombre}</h3>
          <p>Ver más</p>
        </div>
      ) : (
        <div className="bckg-div">
          <h3>{collection.nombre}</h3>
          <p>Sin modelos disponibles</p>
        </div>
      )}
    </div>
  );
}

CollectionCard.propTypes = {
  collection: PropTypes.shape({
    modelos: PropTypes.arrayOf(
      PropTypes.shape({
        imagen: PropTypes.string.isRequired,
      })
    ),
    nombre: PropTypes.string.isRequired,
  }).isRequired,
};

export default CollectionCard;
