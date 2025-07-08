/**
 * Utility functions for checking deployment status
 */

/**
 * Check the status of a deployment
 * @param deployId The deployment ID to check
 * @returns The deployment status
 */
export async function checkDeploymentStatus(deployId: string): Promise<any> {
  try {
    const response = await fetch(`/.netlify/functions/deployment-status?id=${deployId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to check deployment status: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error checking deployment status:', error);
    throw error;
  }
}

/**
 * Get the deployment status of the current project
 * @returns The deployment status
 */
export async function getDeploymentStatus(): Promise<any> {
  // Get the deployment ID from localStorage or environment
  const deployId = localStorage.getItem('current_deploy_id') || 
                   import.meta.env.VITE_DEPLOY_ID;
  
  if (!deployId) {
    throw new Error('No deployment ID found');
  }
  
  return checkDeploymentStatus(deployId);
}

export default {
  checkDeploymentStatus,
  getDeploymentStatus
};