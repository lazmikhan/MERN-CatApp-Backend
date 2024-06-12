const Shops = require("../Models/Shop.js");
module.exports.getShopService = async () => {
  const shops = await Shops.find({});

  return shops;
};
module.exports.getByIdShopService = async (id, data) => {
  const Shop = await Shops.findById(id);

  return Shop;
};
module.exports.postShopService = async (data) => {
  const Shop = await Shops.create(data);
  console.log(Shop);
  return Shop;
};

module.exports.updateShopService = async (id, data) => {
  const ShopId = await Shops.findById(id);
  const Shop = await ShopId.set(data).save();
  return Shop;
};

module.exports.deleteShopService = async (id) => {
  const Shop = await Shops.deleteOne({ _id: id });
  return Shop;
};
