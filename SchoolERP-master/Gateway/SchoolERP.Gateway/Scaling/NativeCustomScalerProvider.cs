using System.Diagnostics;

namespace SchoolERP.Gateway.Scaling;

public class NativeCustomScalerProvider : IScalerProvider
{
    private static readonly Dictionary<int, Process> _runningProcesses = new();
    private static readonly object _lock = new();

    public Task ScaleUpAsync(string clusterName, int currentReplicaCount)
    {
        lock (_lock)
        {
            int nextReplicaId = currentReplicaCount + 1;
            int newPort = 5000 + nextReplicaId;

            // Dynamically start a new local process instance using dotnet CLI tools
            var proc = Process.Start(new ProcessStartInfo
            {
                FileName = "dotnet",
                Arguments = $"run --project ../SchoolERP.{clusterName}.API --urls=https://localhost:{newPort}",
                UseShellExecute = true
            });

            if (proc != null)
            {
                _runningProcesses.Add(nextReplicaId, proc);
                Console.WriteLine($"[NATIVE-SCALER] Native C# spawned local process for {clusterName} on port {newPort}");
            }
        }
        return Task.CompletedTask;
    }

    public Task ScaleDownAsync(string clusterName, int currentReplicaCount)
    {
        lock (_lock)
        {
            if (_runningProcesses.TryGetValue(currentReplicaCount, out var procToKill))
            {
                // Kill the physical process on the current host operating system
                procToKill.Kill();
                procToKill.Dispose();
                _runningProcesses.Remove(currentReplicaCount);
                Console.WriteLine($"[NATIVE-SCALER] Native C# killed local process replica ID: {currentReplicaCount}");
            }
        }
        return Task.CompletedTask;
    }
}