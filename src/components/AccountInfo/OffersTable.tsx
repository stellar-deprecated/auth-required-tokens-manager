import React, { useEffect, useState } from "react";
import { AccountResponse, ServerApi } from "stellar-sdk";

import StellarService from "services/StellarService";

import ErrorSection from "components/ErrorSection";

export const OffersTable = ({ account }: { account?: AccountResponse }) => {
  const [error, setError] = useState("");
  const [offers, setOffers] = useState<ServerApi.OfferRecord[] | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!account) {
      return;
    }
    StellarService.getOffers(account)
      .then((offers) => setOffers(offers))
      .catch((e) => setError(JSON.stringify(e)));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  if (!offers || offers.length === 0) {
    return null;
  }

  return (
    <div>
      <h5 className="title is-size-5">Offers</h5>

      <ErrorSection errorMessage={error} onClearError={() => setError("")} />

      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Id</th>
            <th>Selling</th>
            <th>Buying</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => {
            return (
              <tr key={JSON.stringify(offer)}>
                <td>{offer.id}</td>
                <td>{`${parseFloat(offer.amount)} ${offer.selling.asset_code ??
                  "XLM"}`}</td>
                <td>{`${parseFloat(offer.amount) *
                  parseFloat(offer.price)} ${offer.buying.asset_code ??
                  "XLM"}`}</td>
                <td>{offer.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
