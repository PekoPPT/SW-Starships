export default class StarShip {
    constructor(name, consumables, passengers) {
        this.name = name;
        this._consumables = this._parseConsumables(consumables);
        this._passengers = this._parsePassengers(passengers);
    }

    get maxDaysInSpace() {
        return this._consumables / this._passengers;
    }

    _parseConsumables(consumables) {
        let consumableSplitValues = consumables.split(' ');
        if (consumableSplitValues[1] === 'years' || consumableSplitValues[1] === 'year') {
            return consumableSplitValues[0] * 365;
        }
        else if (consumableSplitValues[1] === 'months' || consumableSplitValues[1] === 'month') {
            return consumableSplitValues[0] * 30;
        }
        else if (consumableSplitValues[1] === 'weeks' || consumableSplitValues[1] === 'week') {
            return consumableSplitValues[0] * 7;
        }
        else if (consumableSplitValues[1] === 'days' || consumableSplitValues[1] === 'day') {
            return consumableSplitValues[0];
        }
        else if (consumableSplitValues[1] === 'hours' || consumableSplitValues[1] === 'hour') {
            return consumableSplitValues[0] / 24;
        }
    }

    _parsePassengers(passengers) {
        return parseInt(passengers.replace(",", ""))
    }

}