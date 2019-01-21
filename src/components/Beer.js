import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

export const Beer = ({ beer, handleFavorite, checkFavoritos, onClick }) => {
    return (
        <Card>
            <Button color="link" onClick={() => handleFavorite(beer)} className="btn-fav">
                {!checkFavoritos(beer) && <i className="far fa-star"></i>}
                {checkFavoritos(beer) && <i className="fas fa-star"></i>}
            </Button>
            <div className="card-container" onClick={() => onClick(beer)}>
                <CardImg top width="100%" src={beer.image_url} alt={beer.name} />
                <CardBody>
                    <CardTitle>{beer.name}</CardTitle>
                    <CardSubtitle>{beer.tagline}</CardSubtitle>
                </CardBody>
            </div>
        </Card>
    )

}