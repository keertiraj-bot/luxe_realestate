export interface Property {
    id: string;
    title: string;
    price: number;
    location: string;
    type: 'Flat' | 'House' | 'Plot';
    description: string;
    images: string[];
    bedrooms?: number;
    bathrooms?: number;
    area: string;
    amenities: string[];
    latitude: number;
    longitude: number;
    created_at: string;
}

export interface Enquiry {
    id: string;
    name: string;
    phone: string;
    email?: string;
    property_id: string;
    message: string;
    created_at: string;
}
