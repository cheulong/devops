# We strongly recommend using the required_providers block to set the
# Azure Provider source and version being used
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}
}

# Environment variables
variable "environment" {
  type = string
  description = "value of the environment to deploy to"
  default = "dev"
}

locals {
  tags = {
    environment = var.environment
    created_by  = "Terraform"
  }
}

# Create a resource group
resource "azurerm_resource_group" "example" {
  name     = "example-resources"
  location = "Southeast Asia"
  tags = local.tags
}

output "resource_group_id" {
  value = azurerm_resource_group.example.id
  description = "The ID of the resource group"
}