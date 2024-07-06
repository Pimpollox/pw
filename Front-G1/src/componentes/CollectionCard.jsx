import React from "react";
import PropTypes from "prop-types";
import './CollectionCard-Style.css';

function CollectionCard({ collection }) {
  const modelo = collection.modelos && collection.modelos[0] ? collection.modelos[0] : null;
  const imagenUrl = modelo && modelo.imagen ? modelo.imagen : 'imgpordefecto.jpg'; 

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
