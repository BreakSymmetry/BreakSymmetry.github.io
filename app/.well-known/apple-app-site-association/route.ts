const association = {
  applinks: {
    details: [
      {
        appID: '89NP2799WQ.net.BreakSymmetry.AbbyStar',
        paths: [
          'NOT /',
          'NOT /journal/*',
          'NOT /static/*',
          'NOT /assets/*',
          'NOT /images/*',
          '/gameinfo',
        ],
      },
    ],
  },
};

export function GET() {
  return Response.json(association, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': 'application/json',
    },
  });
}
