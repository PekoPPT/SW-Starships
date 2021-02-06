import StarShip from "./Starship";

export default class StarWarsUniverse {
    constructor() {
        this.starships = [];
    }

    async init() {
        await this._getStarshipCount();
        await this._createStarships();
    }

    async _getStarshipCount() {
        const fetchResult = await fetch("https://swapi.booost.bg/api/starships");
        const jsonData = await fetchResult.json();
        return jsonData.count;
    }

    async _createStarships() {
        let starShipData = [];
        let fetchResult = await fetch("https://swapi.booost.bg/api/starships");
        let jsonData = await fetchResult.json()
        starShipData.push(...jsonData.results);

        while (jsonData.next !== null) {
            let fetchResult = await fetch(jsonData.next);
            jsonData = await fetchResult.json();
            starShipData.push(...jsonData.results);
        }
        this._validateData(starShipData);
    }

    get theBestStarship() {
        let maxValue = 0;

        const bestStarshipFiltered = this.starships.reduce((bestStarship, currentShip) => {
            if (currentShip._consumables / currentShip._passengers > maxValue) {
                maxValue = currentShip._consumables / currentShip._passengers;
                bestStarship = currentShip;
            }
            return bestStarship;
        }, 0);
        return bestStarshipFiltered;
    }

    _isValidConsumable(shipRawData) {
        if (shipRawData.consumables !== undefined && shipRawData.consumables !== null && shipRawData.consumables !== 'unknown') {
            return true;
        }
    }

    _isValidPassenger(shipRawData) {
        if (shipRawData.passengers !== undefined && shipRawData.passengers !== null && shipRawData.passengers !== 'n/a' && shipRawData.passengers !== '0') {
            return true;
        }
    }

    _validateData(starShipsRawData) {
        let filteredShipData = starShipsRawData.filter((shipRawData) => this._isValidConsumable(shipRawData) && this._isValidPassenger(shipRawData));

        filteredShipData.forEach((currentShip) => {
            this.starships.push(new StarShip(currentShip.name, currentShip.consumables, currentShip.passengers));
        });

    }
}