## 1. Decisions to settle first

- [x] 1.1 Bicep rather than Terraform, for one resource with no state backend
- [x] 1.2 Staging and the production tag flow in this change
- [x] 1.3 Default `azurestaticapps.net` hostname first, custom domain after

## 2. Infrastructure

- [x] 2.1 `infra/main.bicep` describing the Static Web App, Free tier
- [x] 2.2 Deploy it to a resource group and record the command in `docs/`
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

- [x] 7.1 Record `studioHost` so the deploy is not an interactive prompt
- [ ] 7.2 `sanity deploy`, once the hostname is confirmed
- [ ] 7.3 Publish webhook, so an edit rebuilds. Deferred until the deploy path
      is green: a webhook onto a broken pipeline proves nothing

## 8. Verify

- [ ] 8.1 A merge to `main` reaches the staging URL
- [ ] 8.2 A tag reaches production, and the footer shows it
- [ ] 8.3 An unknown path returns the project's 404
- [ ] 8.4 Lighthouse and the viewport sweep against the deployed URL, not just
      the local preview
