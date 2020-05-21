import React, { useEffect, useState } from "react";
import { AccountResponse } from "stellar-sdk";

import { HorizonBalanceLine, KeySecret } from "helpers/types";
import StellarService from "services/StellarService";

import { OffersTable } from "components/AccountInfo/OffersTable";
import { OperationsTable } from "components/AccountInfo/OperationsTable";
import ErrorSection from "components/ErrorSection";

export const AccountInfo = ({
  title,
  keypair,
  updatedAt,
}: {
  title: string;
  keypair: KeySecret;
  updatedAt: Date;
}) => {
  const [error, setError] = useState("");
  const [account, setAccount] = useState<AccountResponse | undefined>(
    undefined,
  );

  useEffect(() => {
    StellarService.getAccount(keypair.publicKey)
      .then((accountResponse) => setAccount(accountResponse))
      .catch((e) => setError(JSON.stringify(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedAt]);

  return (
    <div className="box">
      <h1 className="title is-size-3">{title}</h1>

      <ErrorSection errorMessage={error} onClearError={() => setError("")} />

      <div className="level">
        <div className="level-left">
          <p className="level-item">Public Key</p>
          <p className="level-item"></p>
          <p className="level-item"></p>
        </div>
        <div className="level-right">
          <p className="level-item">{keypair.publicKey}</p>
        </div>
      </div>

      <div className="level">
        <div className="level-left">
          <p className="level-item">Secret</p>
        </div>
        <div className="level-right">
          <p className="level-item">{keypair.secret}</p>
        </div>
      </div>

      <h5 className="title is-size-5">Balances</h5>

      {account && (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Code</th>
              <th>Balance</th>
              <th>Issuer</th>
            </tr>
          </thead>
          <tbody>
            {account.balances.map((b) => {
              const balance = b as HorizonBalanceLine;
              return (
                <tr key={JSON.stringify(b)}>
                  <td>{balance.asset_code ?? "XLM"}</td>
                  <td>{balance.balance}</td>
                  <td>{balance.asset_issuer ?? "native"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <OffersTable account={account} />

      <br></br>
      <OperationsTable account={account} />
    </div>
  );
};
