namespace SchoolERP.Gateway.Scaling;

public class SmartScalerManager
{
    private readonly IScalerProvider _scalerProvider;
    private int _currentReplicaCount = 1;
    private readonly object _counterLock = new();

    public SmartScalerManager()
    {
        // Detect if running inside Kubernetes by checking standard K8s environment variables injected into pods
        bool isKubernetes = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("KUBERNETES_SERVICE_HOST"));

        if (isKubernetes)
        {
            Console.WriteLine("[SYSTEM-INIT] Kubernetes Environment Detected! Initializing Kubernetes Scaler.");
            _scalerProvider = new KubernetesScalerProvider();
        }
        else
        {
            Console.WriteLine("[SYSTEM-INIT] On-Premise/Local Environment Detected! Initializing Native C# Custom Scaler.");
            _scalerProvider = new NativeCustomScalerProvider();
        }
    }

    public async Task TriggerScalingBasedOnCpuAsync(string clusterName, double currentCpuUsage)
    {
        // Evaluate logic rules to determine whether to scale up or down
        if (currentCpuUsage > 70.0 && _currentReplicaCount < 5)
        {
            await _scalerProvider.ScaleUpAsync(clusterName, _currentReplicaCount);
            lock (_counterLock) _currentReplicaCount++;
        }
        else if (currentCpuUsage < 20.0 && _currentReplicaCount > 1)
        {
            await _scalerProvider.ScaleDownAsync(clusterName, _currentReplicaCount);
            lock (_counterLock) _currentReplicaCount--;
        }
    }
}