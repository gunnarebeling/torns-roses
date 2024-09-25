import { useState, useEffect } from "react";
import { getDistributorFlowers } from "../../services/distributorServices/distributorServices";
import { getDistributorRetailers } from "../../services/distributorServices/distributorServices";
import { getAllNurseryFlowers } from "../../services/nurseryServices/nurseryServices";
import "./Distributor.css";

export const DistributorsItem = ({ distributor }) => {
  const [distributorFlowers, setDistributorFlowers] = useState([]);
  const [distributorRetailers, setDistributorRetailers] = useState([]);
  const [nurseryFlowers, setNurseryFlowers] = useState([]);

  useEffect(() => {
    getDistributorFlowers(distributor.id).then((distObject) => {
      setDistributorFlowers(distObject);
    });
    getAllNurseryFlowers().then((res) => {
      setNurseryFlowers(res);
    });
  }, []);

  useEffect(() => {
    getDistributorRetailers(distributor.id).then((distObject) => {
      setDistributorRetailers(distObject);
      console.log(distObject);
    });
  }, []);
  const flowerPrice = (flower) => {
    const flowerPrice = nurseryFlowers.find(
      (nursFlower) =>
        nursFlower.nurseryId === flower.nurseryId &&
        nursFlower.flowerId === flower.flowerId
    );
    const price = flowerPrice?.price;

    return price;
  };

  return (
    <div className="distributor-list mx-auto my-5" key={distributor.id}>
      <h3 className="text-center mt-3">{distributor.name}</h3>
      <div className="d-flex flex-wrap justify-content-center">
        {distributorFlowers.map((flower) => {
          return (
            <div className="flower-item m-2 p-3" key={flower.id}>
              <h5>{flower.flower.species}</h5>
              <p>Color: {flower.flower.color}</p>
              <p className="price fw-bold">
                $
                {(
                  flowerPrice(flower) *
                  (1 + flower.distributor.markup)
                ).toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>
      <div className="retailer-item mb-3">
        <p className="text-center">These retailers buy from us:</p>
        <div className="d-flex justify-content-center align-items-center">
          {distributorRetailers.map((item, index) => (
            <span key={item.id} className="mx-2">
              {item.businessName}
              {index < distributorRetailers.length - 1 && (
                <span className="mx-1">-</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
