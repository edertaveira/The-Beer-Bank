import React from 'react';
import { Beer } from './Beer';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


export class Search extends React.Component {

    constructor(props) {
        super(props);
        this.props.updateInSearch(true);
    }

    renderBeer(beer) {
        return (
            <div key={beer.id} className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <Beer
                    handleFavorite={this.props.handleFavorite}
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
                        <BreadcrumbItem active>Search</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                {beers.map(beer => this.renderBeer(beer))}
            </div>
        )
    }



}