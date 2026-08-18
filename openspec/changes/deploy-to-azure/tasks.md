## 1. Decisions to settle first

- [x] 1.1 Bicep rather than Terraform, for one resource with no state backend
- [x] 1.2 Staging and the production tag flow in this change
- [x] 1.3 Default `azurestaticapps.net` hostname first, custom domain after

## 2. Infrastructure

- [ ] 2.1 `infra/main.bicep` describing the Static Web App, Free tier
- [ ] 2.2 Deploy it to a resource group and record the command in `docs/`
- [ ] 2.3 Confirm the resource is Free tier and in one region

## 3. Serving

- [ ] 3.1 `staticwebapp.config.json`: 404 page, security headers, PDF content
      type, no rewrite that would swallow unknown paths
- [ ] 3.2 Confirm the export contains a 404 page for it to point at

## 4. Pipeline

- [ ] 4.1 Split into stages, gates unchanged in the first
- [ ] 4.2 Publish the export as an artifact
- [ ] 4.3 Staging stage, conditioned on `main` and a successful verification
- [ ] 4.4 Production stage, conditioned on a `v*.*.*` tag
- [ ] 4.5 Add the tag trigger, which the pipeline does not currently have
- [ ] 4.6 Confirm a pull request runs the gates and deploys nothing

## 5. Version on the footer

- [ ] 5.1 Pass the tag into the build as `NEXT_PUBLIC_APP_VERSION`
- [ ] 5.2 Pass the short commit in the same way
- [ ] 5.3 Footer renders both, or the commit alone when there is no tag
- [ ] 5.4 Confirm the application JS figure is unchanged

## 6. Credentials. Requires Mateusz

- [ ] 6.1 Read the deployment token from the portal or the CLI, without it
      passing through a transcript
- [ ] 6.2 Add it as a secret pipeline variable named `SWA_DEPLOYMENT_TOKEN`

## 7. Verify

- [ ] 7.1 A merge to `main` reaches the staging URL
- [ ] 7.2 A tag reaches production, and the footer shows it
- [ ] 7.3 An unknown path returns the project's 404
- [ ] 7.4 Lighthouse and the viewport sweep against the deployed URL, not just
      the local preview
