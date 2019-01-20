import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

export class Beer extends React.Component {

    render() {
        const { beer } = this.props;
        return (
            <Card>
                <Button color="link" onClick={(e) => this.props.handleFavorite(beer)} className="btn-fav">
                    {!this.props.checkFavoritos(beer) && <i className="far fa-star"></i>}
                    {this.props.checkFavoritos(beer) && <i className="fas fa-star"></i>}
                </Button>
                <div className="card-container" onClick={(e) => this.props.onClick(beer)}>
                    <CardImg top width="100%" src={beer.image_url} alt={beer.name} />
                    <CardBody>
                        <CardTitle>{beer.name}</CardTitle>
                        <CardSubtitle>{beer.tagline}</CardSubtitle>
                    </CardBody>
                </div>
            </Card>
        )
    }
}