// Apple App Site Association for the Alem Auto Hub iOS app.
//
// alemecohub.kz is the production passkey rpId, so iOS fetches this file
// (through Apple's CDN, which caches it for up to a week) before it lets the
// app create or use a passkey for that domain. `webcredentials` lists the apps
// allowed to: <Apple Team ID>.<bundle id>. Served as JSON at this exact path,
// with no redirect — the middleware matcher leaves /.well-known alone.

export const dynamic = "force-static";

const IOS_APP_IDS = ["X36MMMLU72.com.alem.autohub"];

export function GET() {
  return Response.json({
    webcredentials: { apps: IOS_APP_IDS },
  });
}
