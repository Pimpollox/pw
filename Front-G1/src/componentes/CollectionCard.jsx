/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import './CollectionCard-Style.css';
function CollectionCard({collection}){
    return(
        <div className="CollectionCard">
            <div className="bckg-div" style={{ backgroundImage: `url(${collection.modelos[0].imagen})` }}>
                <h3>{collection.nombre}</h3>
                <p>Ver más</p>
            </div>
        </div>
    )
}

CollectionCard.propTypes = {
    collection: PropTypes.shape({
        modelos: PropTypes.arrayOf(
            PropTypes.shape({
                imagen: PropTypes.string.isRequired,
            })
        ).isRequired,
        nombre: PropTypes.string.isRequired
    }).isRequired
}

export default CollectionCard;