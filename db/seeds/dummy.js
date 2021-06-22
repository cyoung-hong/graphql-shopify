// 1st party Postgres seed
exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE "product" CASCADE');
  await knex.raw('TRUNCATE TABLE "product_variant" CASCADE');

  await knex("product").insert([
    {
      id: 632910392,
      title: "IPod Nano - 8GB",
      status: 'active',
    },
    {
      id: 921728736,
      title: "IPod Touch 8GB",
      status: 'active',
    },
  ]);

  await knex("productVariant").insert([
    {
      id: 49148385,
      product_id: 632910392,
      barcode: "1234_red",
    },
    {
      id: 457924702,
      product_id: 632910392,
      barcode: "1234_black",
    },
    {
      id: 808950810,
      product_id: 632910392,
      barcode: "1234_pink",
    },
  ]);
};
