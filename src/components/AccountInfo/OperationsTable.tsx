import React, { useEffect, useState } from "react";
import { AccountResponse, ServerApi } from "stellar-sdk";

import StellarService from "services/StellarService";

import ErrorSection from "components/ErrorSection";
import { OperationRow } from "components/AccountInfo/OperationRow";

export const OperationsTable = ({ account }: { account?: AccountResponse }) => {
  const [error, setError] = useState("");
  const [operations, setOperations] = useState<
    ServerApi.OperationRecord[] | undefined
  >(undefined);

  useEffect(() => {
    if (!account) {
      return;
    }
    StellarService.getOperations(account)
      .then((operations) => setOperations(operations))
      .catch((e) => setError(JSON.stringify(e)));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  if (!operations || operations.length === 0) {
    return null;
  }

  return (
    <div>
      <h5 className="title is-size-5">Operations</h5>

      <ErrorSection errorMessage={error} onClearError={() => setError("")} />

      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Id</th>
            <th>Details</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {operations.map((op) => (
            <OperationRow key={JSON.stringify(op)} operation={op} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
