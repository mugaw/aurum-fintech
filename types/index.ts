export interface User {
 id: string;
 email: string;
 name: string;
 avatar?: string;
 tier: 'basic' | 'premium' | 'vip';
 joinedAt: Date;
}

export interface Portfolio {
 totalValue: number;
 change24h: number;
 changePercentage24h: number;
 assets: Asset[];
 history: PortfolioHistoryPoint[];
}

export interface Asset {
 id: string;
 symbol: string;
 name: string;
 type: 'stock' | 'crypto' | 'realestate' | 'commodity';
 price: number;
 change24h: number;
 changePercentage24h: number;
 holdings: number;
 value: number;
 allocation: number;
 icon?: string;
}

export interface PortfolioHistoryPoint {
 date: string;
 value: number;
}

export interface InvestmentArticle {
 id: string;
 title: string;
 excerpt: string;
 content: string;
 category: string;
 author: string;
 publishedAt: Date;
 readTime: number;
 imageUrl?: string;
 tags: string[];
}

export interface PricingTier {
 id: string;
 name: string;
 description: string;
 monthlyPrice: number;
 yearlyPrice: number;
 features: string[];
 highlighted?: boolean;
}

export interface MarketTicker {
 symbol: string;
 price: number;
 change: number;
 changePercent: number;
}
