@description('Name of the Static Web App resource.')
param name string = 'portfolio-website'

@description('Static Web Apps is not available in every region. West Europe is the closest to Krakow that offers it.')
@allowed([
  'westeurope'
  'northeurope'
  'eastasia'
  'eastus2'
  'centralus'
  'westus2'
])
param location string = 'westeurope'

resource site 'Microsoft.Web/staticSites@2023-01-01' = {
  name: name
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    // The repository is built and deployed by Azure Pipelines, so the resource
    // owns no source control connection of its own.
    allowConfigFileUpdates: true
    stagingEnvironmentPolicy: 'Enabled'
  }
}

output defaultHostname string = site.properties.defaultHostname
output resourceId string = site.id
