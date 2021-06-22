const { Model } = require('objection');

class ProductVariant extends Model {
    static get tableName() {
        return 'productVariant';
    }
}

module.exports = ProductVariant