const getStoredShopToBuy = () => {
  const storedShopToBuy = localStorage.getItem("shops_to_buy");
  if (storedShopToBuy) return JSON.parse(storedShopToBuy);
  return [];
};

const saveShopToBuy = (id) => {
  const storedShopsToBuy = getStoredShopToBuy();
  const exists = storedShopsToBuy.find((shop) => shop.id === id);
  if (!exists) {
    storedShopsToBuy.push(id);
    localStorage.setItem("shops_to_buy", JSON.stringify(storedShopsToBuy));
  }
};

export { getStoredShopToBuy, saveShopToBuy };
