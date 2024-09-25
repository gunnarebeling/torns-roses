import { useEffect, useState } from "react";
import { getShoppingCartInfo } from "../../services/shoppingCartServices/shoppingCartService";
import "./ShoppingCart.css";

export const ShoppingCart = ({ currentUser }) => {
  const [flowersInfo, setFlowersInfo] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    getShoppingCartInfo().then((res) => {
      setShoppingCart(res);
    });
  }, []);
  useEffect(() => {
    const customerShoppingCart = shoppingCart.filter(
      (item) => currentUser === item.customerId
    );
    const flowerObj = customerShoppingCart.reduce(
      (flowerDataList, cartitem) => {
        const existingFlower = flowerDataList.find(
          (item) => item.flowerId === cartitem.flowerId
        );
        if (!existingFlower) {
          let obj = {
            price: cartitem.price,
            species: cartitem.flower.species,
            quantity: 1,
            flowerId: cartitem.flowerId,
          };
          flowerDataList.push(obj);
        } else {
          existingFlower.quantity++;
          existingFlower.price += cartitem.price;
        }
        return flowerDataList;
      },
      []
    );
    setFlowersInfo(flowerObj);
  }, [shoppingCart]);
  return (
    <div className="shopping-cart mt-5 pt-5 mx-auto text-center">
      <div className="text-center">
        <header className="display-6">- Cart -</header>
      </div>
      <div className="row">
        <div className="cart mx-auto text-center p-5">
          <h3 className="mb-4">Flowers</h3>
          <ul className="flowersList list-unstyled">
            {flowersInfo.map((flower) => {
              return (
                <li key={flower.flowerId} className="mb-3">
                  <div className="d-flex justify-content-center align-items-center">
                    <section>{flower?.species}</section>
                    <section className="ms-2 qty">({flower?.quantity})</section>
                    <section className="price ms-2">${flower?.price.toFixed(2)}</section>
                  </div>
                  
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
