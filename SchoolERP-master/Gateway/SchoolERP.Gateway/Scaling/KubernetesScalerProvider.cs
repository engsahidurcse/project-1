using k8s;
using k8s.Models;

namespace SchoolERP.Gateway.Scaling;

public class KubernetesScalerProvider : IScalerProvider
{
    private readonly IKubernetes _k8sClient;
    private readonly string _namespace = "default";

    public KubernetesScalerProvider()
    {
        // Automatically load Kubernetes configuration if running inside a cluster pod
        var config = KubernetesClientConfiguration.InClusterConfig();
        _k8sClient = new Kubernetes(config);
    }

    public async Task ScaleUpAsync(string clusterName, int currentReplicaCount)
    {
        int targetReplicas = currentReplicaCount + 1;
        if (targetReplicas > 5) return; // Maximum hard limit of 5 replicas

        await UpdateK8sDeploymentReplicasAsync(clusterName, targetReplicas);
        Console.WriteLine($"[K8s-SCALER] Requested Kubernetes to Scale Up deployment '{clusterName}' to {targetReplicas} replicas.");
    }

    public async Task ScaleDownAsync(string clusterName, int currentReplicaCount)
    {
        int targetReplicas = currentReplicaCount - 1;
        if (targetReplicas < 1) return; // Minimum hard limit of 1 replica

        await UpdateK8sDeploymentReplicasAsync(clusterName, targetReplicas);
        Console.WriteLine($"[K8s-SCALER] Requested Kubernetes to Scale Down deployment '{clusterName}' to {targetReplicas} replicas.");
    }

    private async Task UpdateK8sDeploymentReplicasAsync(string deploymentName, int replicaCount)
    {
        // Create the JSON merge patch string to update replicas
        var patchStr = $"{{\"spec\":{{\"replicas\":{replicaCount}}}}}";

        // Define the V1Patch object with correct content type
        var patch = new V1Patch(patchStr, V1Patch.PatchType.MergePatch);

        // FIXED: Corrected parameter types and positions for the official Kubernetes API call
        await _k8sClient.AppsV1.PatchNamespacedDeploymentScaleAsync(
            body: patch,               // Parameter 1: The patch body (V1Patch)
            name: deploymentName,      // Parameter 2: Name of the deployment (string)
            namespaceParameter: _namespace // Parameter 3: The K8s namespace (string)
        );
    }
}