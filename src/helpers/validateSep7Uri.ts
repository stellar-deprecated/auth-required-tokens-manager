import { parseStellarUri } from "@stellarguard/stellar-uri";
import { StellarTomlResolver } from "stellar-sdk";

interface Props {
  uriString: string;
  onError: (error: any) => void;
}

export const validateSep7Uri = async ({ uriString, onError }: Props) => {
  const uri = parseStellarUri(uriString);
  if (!uri.originDomain) {
    throw new Error("origin domain cannot be empty");
  }
  return Promise.all([StellarTomlResolver.resolve(uri.originDomain), uri])
    .then(([toml, uri]) => {
      console.log("toml:", toml);
      console.log("URI_REQUEST_SIGNING_KEY:", toml.URI_REQUEST_SIGNING_KEY);
      return uri.verifySignature();
    })
    .then((isVerified) => console.info("isVerified", isVerified))
    .catch(onError);
};
