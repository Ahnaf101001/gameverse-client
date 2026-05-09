import { useEffect } from "react";
import ShopSection from "../../Utilities/shop section/ShopSection";

const Shop = () => {
  useEffect(() => {
    document.title = "Game Verse | Shop";
  }, []);

  return (
    <div>
      <ShopSection />
    </div>
  );
};

export default Shop;
