'use client';

import { Authenticated } from '@/components/elven-ui/authenticated';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  IPlainTransactionObject,
  TransactionsConverter,
} from '@multiversx/sdk-core';
import { useLoginInfo, useNetwork, useSignMessage } from '@useelven/core';
import { FormEvent, useEffect, useRef, useState } from 'react';

const Iframe = ({ url }: { url?: string }) => {
  const { dappProvider } = useNetwork();
  const [transaction, setTransaction] = useState<
    IPlainTransactionObject | undefined
  >();
  const { signMessage, signature } = useSignMessage();
  const [messageType, setMessageType] = useState<string>();

  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const listener = async (e: MessageEvent) => {
      const { type, payload } = e.data;

      switch (type) {
        case 'SIGN_TRANSACTIONS_REQUEST':
          const transactions = payload;
          const converter = new TransactionsConverter();
          const tx = converter.plainObjectToTransaction(transactions[0]);
          setMessageType('SIGN_TRANSACTIONS_REQUEST');
          const signedTx = await dappProvider!.signTransaction(tx);
          setTransaction(converter.transactionToPlainObject(signedTx!));
          break;
        case 'SIGN_MESSAGE_REQUEST':
          const messageToSign = payload?.message;
          setMessageType('SIGN_MESSAGE_REQUEST');
          signMessage({ message: messageToSign });
          break;
        default:
          break;
      }
    };

    window.addEventListener('message', listener);
    return () => {
      window.removeEventListener('message', listener);
    };
  }, [dappProvider, setTransaction, signMessage]);

  useEffect(() => {
    switch (messageType) {
      case 'SIGN_TRANSACTIONS_REQUEST':
        if (transaction && url) {
          ref.current?.contentWindow?.postMessage(
            {
              type: 'SIGN_TRANSACTIONS_RESPONSE',
              payload: {
                data: [transaction],
              },
            },
            url
          );
        }
        break;
      case 'SIGN_MESSAGE_REQUEST':
        if (signature && url) {
          ref.current?.contentWindow?.postMessage(
            {
              type: 'SIGN_MESSAGE_RESPONSE',
              payload: {
                data: {
                  signature,
                  status: 'signed',
                },
              },
            },
            url
          );
        }
        break;
      default:
        break;
    }
  }, [messageType, signature, transaction, url]);

  return (
    url && (
      <iframe
        id="webviewChild"
        src={url}
        className="h-screen w-full border-0"
        ref={ref}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
      ></iframe>
    )
  );
};

export const IframeComponent = () => {
  const { accessToken } = useLoginInfo();

  const [url, setUrl] = useState<string>();
  const [error, setError] = useState(false);

  const handleUrl = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regex = /https:\/\/[\w\-\.]+(\:[0-9]+)?(\/.*)?/i;
    const value = e.currentTarget.url.value;
    const isFullUrl = regex.test(value);
    const isLocalhost = value.includes('localhost');
    if (isFullUrl || isLocalhost) {
      setUrl(`${value}?accessToken=${accessToken}`);
      e.currentTarget.reset();
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (!url || !url.includes(event.origin)) return;

      if (event.data.type === 'LOGOUT_REQUEST') {
        setUrl(undefined);
      }
    };
    window.addEventListener('message', listener);
    return () => {
      window.removeEventListener('message', listener);
    };
  }, [url]);

  return (
    <div>
      <Authenticated
        noSpinner
        fallback={
          <div className="text-center pb-6 font-bold">
            Connect your wallet first!
          </div>
        }
      >
        <form onSubmit={handleUrl} className="w-full p-6">
          <div className="flex items-center justify-center">
            <Input
              name="url"
              className="border rounded-sm mr-2"
              placeholder="Provide URL of an app that uses sdk-dapp, useElven at least v0.20.0 or elven.js at least v0.19.0"
            />
            <Button>Connect</Button>
          </div>
          {error && (
            <div className="text-xs text-destructive mt-2">
              Please include the full URL, starting with &apos;https://&apos;
            </div>
          )}
        </form>

        <Iframe url={url} />
      </Authenticated>
    </div>
  );
};
