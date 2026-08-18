## 1. Decisions to settle first

- [x] 1.1 Bicep rather than Terraform, for one resource with no state backend
- [x] 1.2 Staging and the production tag flow in this change
- [x] 1.3 Default `azurestaticapps.net` hostname first, custom domain after

## 2. Infrastructure

- [x] 2.1 `infra/main.bicep` describing the Static Web App, Free tier
- [x] 2.2 Deploy it to a resource group and record the command in `docs/`
- [x] 2.4 Redeploy into Mateusz's own subscription. The first resource was
      created in a tenant he is only a guest in. It now runs in the
      btopservice.net tenant, in West US 2, because Static Web Apps exists in
      five regions and West Europe refuses new subscriptions
- [x] 2.3 Confirm the resource is Free tier and in one region

## 3. Serving

- [x] 3.1 `staticwebapp.config.json`: 404 page, security headers, PDF content
      type, no rewrite that would swallow unknown paths
- [x] 3.2 Confirm the export contains a 404 page for it to point at

## 4. Pipeline

- [x] 4.1 Split into stages, gates unchanged in the first
- [x] 4.2 Publish the export as an artifact
- [x] 4.3 Staging stage, conditioned on `main` and a successful verification
- [x] 4.4 Production stage, conditioned on a `v*.*.*` tag
- [x] 4.5 Add the tag trigger, which the pipeline does not currently have
- [x] 4.6 Confirm a pull request runs the gates and deploys nothing

## 5. Version on the footer

- [x] 5.1 Pass the tag into the build as `NEXT_PUBLIC_APP_VERSION`
- [x] 5.2 Pass the short commit in the same way
- [x] 5.3 Footer renders both, or the commit alone when there is no tag
- [x] 5.4 Confirm the application JS figure is unchanged

## 6. Credentials. Requires Mateusz

- [x] 6.1 Read the deployment token from the portal or the CLI, without it
      passing through a transcript
- [x] 6.2 Add it as a secret pipeline variable named `SWA_DEPLOYMENT_TOKEN`

## 7. The studio and the content path

Carried into the `publish-content` change. The deployment path they depend on
is green, which is what they were waiting for.

- [x] 7.1 Record `studioHost` so the deploy is not an interactive prompt
- [ ] 7.2 `sanity deploy`, once the hostname is confirmed. Carried into the
      publish-content change
- [ ] 7.3 Publish webhook, so an edit rebuilds. Carried into the same change,
      now that the deploy path it depends on is green

## 8. Verify

- [x] 8.1 A merge to `main` reaches the staging URL
- [x] 8.2 A tag reaches production, and the footer shows it: v1.0.0 · 78d340c
- [x] 8.3 An unknown path returns the project's 404
- [x] 8.4 Lighthouse and the viewport sweep against staging: performance 0.96,
      accessibility 1.00, seven widths clean, both CVs still extracting
- [x] 8.5 The same against production: performance 0.95, accessibility 1.00,
      and SEO 1.00, which staging could not show because it sends
      `x-robots-tag: none`
