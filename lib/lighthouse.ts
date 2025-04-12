import lighthouse from '@lighthouse-web3/sdk';

const LIGHTHOUSE_API_KEY = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY || '';

export const uploadToLighthouse = async (file: File) => {
  try {
    const response = await lighthouse.upload(file, LIGHTHOUSE_API_KEY);
    return response.data;
  } catch (error) {
    console.error('Error uploading to Lighthouse:', error);
    throw error;
  }
};

export const getLighthouseDealStatus = async (cid: string) => {
  try {
    const response = await lighthouse.dealStatus(cid);
    return response.data;
  } catch (error) {
    console.error('Error getting deal status:', error);
    throw error;
  }
};

export const createLighthouseDeal = async (cid: string) => {
  try {
    const response = await lighthouse.createDeal(cid, {
      num_copies: 2,
      repair_threshold: 28800,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Lighthouse deal:', error);
    throw error;
  }
}; 