const {GraphQLEnumType} = require("graphql");

const ProductStatusEnumType = new GraphQLEnumType({
    name: 'ProductStatusEnum',
    description: 'Status types for Product types.',
    values: {
        active: {
            value: "active",
            description: "The product is ready to sell and is available to customers on the online store, sales channels, and apps. By default, existing products are set to active."
        },
        archived: {
            value: "archived",
            description: "The product is no longer being sold and isn't available to customers on sales channels and apps."
        },
        draft: {
            value: "draft",
            description: "The product isn't ready to sell and is unavailable to customers on sales channels and apps. By default, duplicated and unarchived products are set to draft."
        },
    }
})

module.exports = ProductStatusEnumType