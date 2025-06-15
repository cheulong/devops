variable "network_rules" {
  type = list(object({
    default_action             = string
    ip_rules                   = list(string)
  }))
  description = "values for the network rules block in the storage account resource."
}

