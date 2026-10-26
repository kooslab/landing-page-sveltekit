# Meta Ads MCP Server Tools Reference

Server URL: `https://mcp.facebook.com/ads`

## Available Capabilities

The Meta ads MCP server exposes tools for the following. Ask the agent "what tools are available?" to get the current full list from the server.

### Campaign Management

- Create campaigns (objective: Traffic / link clicks)
- Edit campaign settings
- Pause / activate campaigns

### Ad Set Management

- Create ad sets with audience targeting, budget, schedule, placements
- Edit ad set budget, targeting, schedule
- ABO (Ad Set Budget Optimization): each ad set has its own daily budget

### Ad Management

- Create ads within ad sets
- Upload image/video assets to the asset library
- Create ad creative (single image, video, carousel)
- All new ads are **paused by default** — must be explicitly set live

### Reporting

- Pull campaign/ad set/ad level metrics
- Key metrics for microtests: impressions, link clicks, CTR, CPC, spend
- Date range filtering
- Breakdown by ad set or ad

### Custom Audiences

- Create, update, delete custom audiences

### A/B Tests

- Create and manage A/B tests
- Get results on existing tests

### Activity Logs

- View account-level change history

### Help & Troubleshooting

- Search Meta Business Help Center articles

## Authentication

The MCP server uses OAuth. Setup:

1. Add server: `claude mcp add --transport http meta-ads https://mcp.facebook.com/ads`
2. Inside Claude Code, run `/mcp` → select `meta-ads` → Authenticate
3. Browser opens Meta OAuth login
4. Grant access to the ad account

## Safety Rules

- All ads created are **paused by default**
- Budget changes can be restricted via Business Suite → Ads MCP Server settings
- All actions require user authorization through the AI agent
- Destructive actions (deleting campaigns, audiences) always require explicit user confirmation
