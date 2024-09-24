import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRetailerInfo } from "../../services/retailerServices/retailerServices";
import { getNurseryFlowers } from "../../services/nursaryServices/nursaryServices";
import "./Retailer.css";

export const RetailerDetails = () => {
  const [retailerInfo, setRetailerInfo] = useState([]);
  const [nurseryFlowers, setNurseryFlowers] = useState([]);
  const [nurseries, setNurseries] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);

  const { retailerId } = useParams();

  useEffect(() => {
    getRetailerInfo(retailerId).then((res) => {
      setRetailerInfo(res);
    });
    getNurseryFlowers().then((res) => {
      setNurseryFlowers(res);
    });
  }, [retailerId]);
  useEffect(() => {
    const retailersFilter = retailerInfo?.reduce((nurseryList, cur) => {
      if (!nurseryList.some((item) => item.nurseryId === cur.nurseryId)) {
        nurseryList.push({
          nurseryId: cur.nurseryId,
          businessName: cur.nursery.businessName,
        });
      }
      return nurseryList;
    }, []);
    setNurseries(retailersFilter);
  }, [retailerInfo]);
  const flowerPrices = (targetflower) => {
    const specificFlower = nurseryFlowers.find(
      (flower) =>
        flower.flowerId === targetflower.flowerId &&
        flower.nurseryId === targetflower.nurseryId
    );
    const specificFlowerPrice = specificFlower?.price;
    const distroMarkup = 1 + targetflower.distributor.markup;
    const retailMarkup = 1 + targetflower.retailer.markup;
    const priceInFloat = specificFlowerPrice * distroMarkup * retailMarkup;
    const priceInDollars = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(priceInFloat);

    return priceInDollars;
  };

  return (
    <div className="retailer-card mt-5 pt-5">
      <div className="retailers mx-auto mt-5">
        <div className="text-center">
          <header className="business-name display-6 pt-3 my-0">
            {retailerInfo[0]?.retailer.businessName}
          </header>
          <h3 className="address">{retailerInfo[0]?.retailer.address}</h3>
        </div>
        <div className="flowerList pb-4 mb-3">
          <ul className="text-center mx-3 list-unstyled">
            <h2 className="mb-4">Flowers</h2>
            <div className="flowers d-flex mx-auto justify-content-around">
              {retailerInfo.map((flower) => {
                return (
                  <li key={flower.id} className="m-2">
                    <h3>{flower.flower?.species}</h3>
                    <p>color: {flower.flower?.color}</p>
                    <p className="price fw-bold my-0 py-0">
                      {flowerPrices(flower)}{" "}
                    </p>
                     <button className="btn mt-2">Purchase</button> {/*onClick={handlePurchase} */}
                  </li>
                );
              })}
            </div>
          </ul>
        </div>
        <div className="centered-line"></div>
        <div className="distributorList">
          <ul className="text-center mx-3 list-unstyled">
            <h2>Distributor</h2>
            <li>
              <p>{retailerInfo[0]?.distributor?.name}</p>
            </li>
          </ul>
        </div>
        <div className="centered-line"></div>
        <div className="nurseryList">
          <ul className="text-center mx-3 p-2 list-unstyled">
            <h2>Nurseries</h2>
            {nurseries &&
              nurseries.map((nursery) => {
                return <li key={nursery.nurseryId}>{nursery?.businessName}</li>;
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};
