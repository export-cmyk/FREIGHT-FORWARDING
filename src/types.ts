export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  features: string[];
  mode: 'ocean' | 'air' | 'customs' | 'road' | 'docs' | 'logistics';
}

export interface HowItWorksStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  statusBadge: string;
}

export interface NetworkHub {
  id: string;
  region: string;
  ports: string[];
  description: string;
  coordinates: { x: number; y: number }; // percentage on map
  connections: string[];
  activeTradeVolume: string;
}

export interface QuoteFormData {
  fullName: string;
  companyName: string;
  email: string;
  mobile: string;
  origin: string;
  destination: string;
  direction: 'Export' | 'Import';
  serviceType: 'FCL' | 'LCL' | 'Air' | 'Customs' | 'Transportation';
  commodity: string;
  containerType: string;
  cargoWeight: string;
  weightUnit: 'MT' | 'KG';
  message: string;
}
