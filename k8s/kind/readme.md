## Create a kind cluster
```yaml
kind create cluster --config create-cluster.yaml --name my-kind-cluster
```
## Get clusters
```yaml
kind get clusters
```
## Get clusters info
```yaml
kubectl cluster-info --context kind-my-kind-cluster
```
## Switch cluster
```yaml
kubectl cluster-info --context kind--my-kind-cluster
```
## Deleting a Cluster
```yaml
kind delete cluster --name my-kind-cluster
```