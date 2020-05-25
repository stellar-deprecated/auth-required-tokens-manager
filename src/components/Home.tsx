import React from "react";
import { AccountInfo } from "components/AccountInfo";

import { Env } from "helpers/Env";
import { UpdatedAt } from "helpers/types";
import { AuthRequiredButtons } from "components/AccountInfo/AuthRequiredButtons";
import { useRedux } from "hooks/useRedux";

export function Home() {
  const { updatedAt } = useRedux<{ updatedAt: UpdatedAt }>("updatedAt");

  return (
    <div>
      <AuthRequiredButtons
        kpIssuer={Env.issuer}
        kpSender={Env.sender}
        kpReceiver={Env.receiver}
      />

      <section className="section">
        <div className="columns is-desktop is-multiline is-centered">
          <div className="column is-4">
            <AccountInfo
              title="Asset Issuer"
              keypair={Env.issuer}
              updatedAt={updatedAt.date}
            />
          </div>
          <div className="column is-4">
            <AccountInfo
              title="Sender"
              keypair={Env.sender}
              updatedAt={updatedAt.date}
            />
          </div>
          <div className="column is-4">
            <AccountInfo
              title="Receiver"
              keypair={Env.receiver}
              updatedAt={updatedAt.date}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
