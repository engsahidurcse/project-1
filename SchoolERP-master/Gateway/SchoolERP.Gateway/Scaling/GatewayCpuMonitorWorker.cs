namespace SchoolERP.Gateway.Scaling;


// --- 🎯 BACKGROUND CPU WORKER CLASS INCLUDED AT THE BOTTOM OF THE FILE ---

public class GatewayCpuMonitorWorker : BackgroundService
{
    private readonly SmartScalerManager _scalerManager;

    public GatewayCpuMonitorWorker(SmartScalerManager scalerManager)
    {
        _scalerManager = scalerManager;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        Console.WriteLine("[BACKGROUND-WORKER] Gateway CPU Monitoring Service Initialized.");

        while (!stoppingToken.IsCancellationRequested)
        {
            double currentCpu = await CalculateGatewayCpuUsageAsync();

            // Continuously evaluate and trigger dynamic scaling for the Student Cluster
            await _scalerManager.TriggerScalingBasedOnCpuAsync("Student", currentCpu);

            // Wait for 5 seconds before checking the CPU metrics again
            await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
        }
    }

    private async Task<double> CalculateGatewayCpuUsageAsync()
    {
        var startTime = DateTime.UtcNow;
        var startCpuUsage = System.Diagnostics.Process.GetCurrentProcess().TotalProcessorTime;

        await Task.Delay(500); // 500ms sample window to snapshot CPU cycles

        var endTime = DateTime.UtcNow;
        var endCpuUsage = System.Diagnostics.Process.GetCurrentProcess().TotalProcessorTime;

        var cpuUsedMs = (endCpuUsage - startCpuUsage).TotalMilliseconds;
        var totalMsPassed = (endTime - startTime).TotalMilliseconds;

        return (cpuUsedMs / (Environment.ProcessorCount * totalMsPassed)) * 100;
    }
}
