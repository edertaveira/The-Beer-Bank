import React from 'react';
import { Beer } from './Beer';


export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.props.updateInSearch(false);
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
                {beers.map(beer => this.renderBeer(beer))}
            </div>
        )
    }



}