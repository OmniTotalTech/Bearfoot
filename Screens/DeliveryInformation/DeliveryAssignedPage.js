import React from "react";
import DeliveryItem from "../../Components/DeliveryItem";
export default function DeliveryAssignedPage() {
  return (
    <div className="container px-4 ">
      <div className="text-lg">Assigned Deliveries</div>
      <DeliveryItem />
      <DeliveryItem />
      <DeliveryItem />
      <div className="text-lg">Assigned Deliveries</div>
      <DeliveryItem />
      <DeliveryItem />
    </div>
  );
}
