class ExpressEroor extends Error {
    constructor(message, statudCode) {
        super();
        this.message = message;
        this.statudCode = statudCode;
    }
}

module.exports = ExpressEroor;