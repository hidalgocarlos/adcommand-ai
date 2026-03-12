import axios from 'axios';

const META_API_BASE = 'https://graph.facebook.com/v19.0';

export interface MetaCampaign {
  id: string;
  name: string;
  status: string;
  objective: string;
  daily_budget?: string;
  lifetime_budget?: string;
  start_time?: string;
  stop_time?: string;
}

export interface MetaInsight {
  impressions: string;
  clicks: string;
  spend: string;
  reach: string;
  inline_link_click_ctr: string;
  cpp: string;
  cpc: string;
  cpm: string;
  actions?: Array<{ action_type: string; value: string }>;
  action_values?: Array<{ action_type: string; value: string }>;
  frequency: string;
}

export class MetaAdsApi {
  constructor(private accessToken: string) {}

  private async get<T>(endpoint: string, params: any = {}): Promise<T> {
    try {
      const response = await axios.get(`${META_API_BASE}${endpoint}`, {
        params: {
          access_token: this.accessToken,
          ...params,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Meta API Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error?.message || 'Meta API request failed');
    }
  }

  async getAdAccountInfo(adAccountId: string) {
    return this.get(`/${adAccountId}`, { fields: 'id,name,currency' });
  }

  async getCampaigns(adAccountId: string) {
    const fields = 'id,name,status,objective,daily_budget,lifetime_budget,start_time,stop_time';
    return this.get<{ data: MetaCampaign[] }>(`/${adAccountId}/campaigns`, { fields });
  }

  async getCampaignInsights(campaignId: string, timeRange: { since: string; until: string }) {
    const fields = 'impressions,clicks,spend,reach,inline_link_click_ctr,cpp,cpc,cpm,actions,action_values,frequency';
    return this.get<{ data: MetaInsight[] }>(`/${campaignId}/insights`, {
      fields,
      time_range: JSON.stringify(timeRange),
      level: 'campaign',
    });
  }

  async getAdSets(campaignId: string) {
    return this.get(`/${campaignId}/adsets`, {
      fields: 'id,name,status,daily_budget,targeting',
    });
  }

  async getAds(adSetId: string) {
    return this.get(`/${adSetId}/ads`, {
      fields: 'id,name,status,creative',
    });
  }
}
