## 1. Decide first

- [ ] 1.1 Which ref a content rebuild deploys from, per the proposal. Requires
      Mateusz, because it decides whether content can reach production without
      a person

## 2. The studio

- [ ] 2.1 `sanity deploy`, claiming `mbargiel-portfolio.sanity.studio`
- [ ] 2.2 Confirm an editor with a Sanity login can change content without a
      checkout
- [ ] 2.3 Confirm the studio's CORS origin was added, since deploy does it

## 3. The webhook

- [ ] 3.1 Incoming webhook service connection in Azure DevOps
- [ ] 3.2 Webhook in Sanity, firing on publish for `project` and `experience`
- [ ] 3.3 Pipeline resource and trigger
- [ ] 3.4 Secret pipeline variable for the shared key

## 4. Verify

- [ ] 4.1 Publish an edit in the studio and time it to the live site
- [ ] 4.2 Confirm the run deploys from the ref chosen in 1.1
- [ ] 4.3 Confirm a content rebuild does not create a version
