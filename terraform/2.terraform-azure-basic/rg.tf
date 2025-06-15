# Create a resource group
resource "azurerm_resource_group" "example" {
  count    = 2
  name     = "example-resources-${count.index}"
  location = "Southeast Asia"
  tags = local.tags
  # lifecycle {
  #   create_before_destroy = true
  #   prevent_destroy       = true
  #   ignore_changes = [
  #     tags,
  #   ]
  #   replace_triggered_by = [
  #     local.tags.environment
  #   ]
  # }
}

