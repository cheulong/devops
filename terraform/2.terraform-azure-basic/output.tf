output "resource_group_id" {
  value       = [for rg in azurerm_resource_group.example : rg.name]
  description = "The ID of the resource group"
}