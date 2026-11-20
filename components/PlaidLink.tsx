import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { Button } from "./ui/button";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createLinkToken, exchangePublicToken } from "@/lib/actions/user.actions";

function PlaidLink({ user, variant }: PlaidLinkProps) {
  const route = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    async function getLinkToken() {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    }
    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token, _) => {
      if (!public_token) {
        console.error("Plaid did not return a public token");
        return;
      }

      await exchangePublicToken({
        publicToken: public_token,
        user,
      });
      route.push("/");
    },
    [user, route],
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);
  return (
    <>
      {variant === "primary" ? (
        <Button className="plaidlink-primary" onClick={() => open} disabled={!ready}>
          Connect Bank
        </Button>
      ) : variant === "ghost" ? (
        <Button>Connect Bank</Button>
      ) : (
        <Button>Connect Bank</Button>
      )}
    </>
  );
}

export default PlaidLink;
