data "azurerm_subnet" "example" {
  name                 = "subnetname"
  virtual_network_name = "vnetname"
  resource_group_name  = "resourcegroupname"
}

resource "azurerm_storage_account" "example" {
  name                = "storageaccountname"
  resource_group_name = "rgname"

  location                 = "West Europe"
  account_tier             = "Standard"
  account_replication_type = "LRS"

  dynamic "network_rules" {
    for_each = var.network_rules
    content {
      default_action             = network_rules.value["default_action"]
      ip_rules                   = network_rules.value["ip_rules"]
      virtual_network_subnet_ids = data.azurerm_subnet.example.id
    }
  }
}