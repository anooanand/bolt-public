import React, { useState, useEffect } from 'react';
import { getDeploymentStatus } from '../lib/deployment';
import { Loader, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface DeploymentStatusProps {
  deployId?: string;
  showDetails?: boolean;
}

export function DeploymentStatus({ deployId, showDetails = false }: DeploymentStatusProps) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'in-progress'>('loading');
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        setStatus('loading');
        setError(null);
        
        const result = await getDeploymentStatus();
        setDetails(result);
        
        if (result.state === 'ready') {
          setStatus('success');
        } else if (result.state === 'error') {
          setStatus('error');
        } else {
          setStatus('in-progress');
          
          // Poll for updates if deployment is in progress
          if (['building', 'enqueued', 'processing', 'uploading'].includes(result.state)) {
            setTimeout(checkStatus, 5000);
          }
        }
      } catch (err: any) {
        console.error('Error checking deployment status:', err);
        setStatus('error');
        setError(err.message || 'Failed to check deployment status');
      }
    };
    
    checkStatus();
  }, [deployId]);

  const getStatusDisplay = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex items-center text-gray-600">
            <Loader className="w-5 h-5 mr-2 animate-spin" />
            <span>Checking deployment status...</span>
          </div>
        );
      case 'success':
        return (
          <div className="flex items-center text-green-600">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>Deployment successful</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center text-red-600">
            <XCircle className="w-5 h-5 mr-2" />
            <span>Deployment failed{error ? `: ${error}` : ''}</span>
          </div>
        );
      case 'in-progress':
        return (
          <div className="flex items-center text-amber-600">
            <Loader className="w-5 h-5 mr-2 animate-spin" />
            <span>Deployment in progress: {details?.state || 'building'}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Deployment Status</h3>
      {getStatusDisplay()}
      
      {showDetails && details && (
        <div className="mt-4 text-sm text-gray-600">
          <div className="grid grid-cols-2 gap-2">
            <div>Deploy ID:</div>
            <div className="font-mono">{details.id}</div>
            
            <div>Site Name:</div>
            <div>{details.name}</div>
            
            <div>Created At:</div>
            <div>{new Date(details.created_at).toLocaleString()}</div>
            
            {details.deploy_url && (
              <>
                <div>Deploy URL:</div>
                <div>
                  <a 
                    href={details.deploy_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {details.deploy_url}
                  </a>
                </div>
              </>
            )}
            
            {details.error_message && (
              <>
                <div>Error:</div>
                <div className="text-red-600">{details.error_message}</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}