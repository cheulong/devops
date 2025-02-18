## Create a kind cluster
```yaml
kind create cluster --config create-cluster.yaml --name mycluster
```
## Get clusters
```yaml
kind get clusters
```
## Get clusters
```yaml
kubectl cluster-info --context mycluster
```
## Deleting a Cluster
```yaml
kind delete cluster --name mycluster
```