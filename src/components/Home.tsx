import React from "react";
import { AccountInfo } from "components/AccountInfo";
import { Keypair } from "stellar-sdk";

import { KeySecret, getKeySecret, UpdatedAt } from "helpers/types";
import { AuthRequiredButtons } from "components/AccountInfo/AuthRequiredButtons";
import { useRedux } from "hooks/useRedux";

export function Home() {
  const kpIssuer = Keypair.fromSecret(
    "SAU55V2VP2PWLDJC4GZ65BZX4TBKO7RFQUSFZ5SSPP7L42QLGF5T5QXR",
  );
  const kpMarketMaker = Keypair.fromSecret(
    "SACUJVC7SDDA5Q5GUWUWYTZ2VTL22E3LFGHX5AONNZTJ2M5H7NKTC4NE",
  );

  const senderKeySecret: KeySecret = {
    publicKey: "GBXK7V7OPUDLYNWZ7OC34R35UQCDBRHGMWBNJTV4OFRGX42SO6AL6AB2",
    secret: "SA7G2RTUEVCB4O6RTWTVXVJ35FD34TPT3TOHDAJIRD5GAL2ZRGINYEID",
  };

  const kpReceiver = Keypair.fromSecret(
    "SCLGHN5RWZAA6EK52VZ4VYYCRWWHLHOCE7ELTJY5O4BE5QTXVQCYXOJE",
  );

  const { updatedAt } = useRedux<{ updatedAt: UpdatedAt }>("updatedAt");

  return (
    <div>
      <AuthRequiredButtons
        kpIssuer={getKeySecret(kpIssuer)}
        kpMarketMaker={getKeySecret(kpMarketMaker)}
        kpSender={senderKeySecret}
        kpReceiver={getKeySecret(kpReceiver)}
      />

      <section className="section">
        <div className="columns is-desktop is-multiline is-centered">
          <div className="column is-6">
            <AccountInfo
              title="Asset Issuer"
              keypair={getKeySecret(kpIssuer)}
              updatedAt={updatedAt.date}
            />
          </div>
          <div className="column is-6">
            <AccountInfo
              title="Market Maker"
              keypair={getKeySecret(kpMarketMaker)}
              updatedAt={updatedAt.date}
            />
          </div>
          <div className="column is-6">
            <AccountInfo
              title="Sender"
              keypair={senderKeySecret}
              updatedAt={updatedAt.date}
            />
          </div>
          <div className="column is-6">
            <AccountInfo
              title="Receiver"
              keypair={getKeySecret(kpReceiver)}
              updatedAt={updatedAt.date}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
