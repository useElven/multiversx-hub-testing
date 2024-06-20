import type { NextPage } from 'next';
import { CardContent, Card } from '@/components/ui/card';
import { IframeComponent } from './iframeComponent';

const Home: NextPage = () => {
  return (
    <>
      <Card className="mb-4">
        <CardContent className="mt-6 pb-0">
          <div className="text-xs text-center mx-auto mb-2">
            The app simulates the MultiversX Web Wallet Hub by attaching the
            accessToken. It uses MultiversX{' '}
            <a
              href="https://github.com/multiversx/mx-sdk-js-webview-provider"
              rel="nofollow"
              className="underline"
            >
              webview provider
            </a>
            . Once loaded, the app will automatically connect, allowing you to
            sign transactions via the wrapper app. You can utilize xPortal,
            Ledger, and browser extension. Without 2FA (guardian) redirects.
          </div>
          <div className="text-xs text-center mx-auto mb-3">
            To test the MultiversX Apps Hub (webview) on the devnet, please
            connect your wallet and enter the URL of an application that
            utilizes useElven version 0.20.0 or later.
            <br />
            <strong>
              For testing purposes, only connect to applications you are
              familiar with.
            </strong>
            <br />
            Note that there are no restrictions on the domains that can be
            loaded.
          </div>
        </CardContent>
        <IframeComponent />
      </Card>
    </>
  );
};

export default Home;
