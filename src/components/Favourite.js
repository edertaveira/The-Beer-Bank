import React from 'react';
import { Beer } from './Beer';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Favourite extends React.Component {
    constructor(props) {
        super(props);
        this.handleFavorite = this.handleFavorite.bind(this);
        this.props.updateInSearch(false);
    }

    componentDidMount() {
        this.props.loadFavourites();
    }

    handleFavorite(beer) {
        this.props.handleFavorite(beer);
        this.props.loadFavourites();
    }

    renderBeer(beer) {
        return (
            <div key={'f_' + beer.id} className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <Beer handleFavorite={this.handleFavorite}
                    checkFavoritos={this.props.checkFavoritos}
                    onClick={this.props.onClick}
                    beer={beer}
                />
            </div>);
    }



    render() {
        const { beers } = this.props;
        return (
            <div className="row">
                <div className="col-12">
                    <Breadcrumb>
                        <Link className="breadcrumb-item" to="/">Home</Link>
                        <BreadcrumbItem active>Favourite</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                {beers.length > 0 && beers.map(beer => this.renderBeer(beer))}
                {beers.length === 0 && (
                    <div className="col-12">
                        <div className="alert alert-primary" role="alert">
                            Your Favourite list is empty.
                        </div>
                    </div>
                )}
            </div>
        )
    }
}