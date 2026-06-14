namespace SchoolERP.Gateway.Scaling;

public interface IScalerProvider
{
    Task ScaleUpAsync(string clusterName, int currentReplicaCount);
    Task ScaleDownAsync(string clusterName, int currentReplicaCount);
}