# Luxe Realty - Premium Real Estate for Buyers

This is a production-ready real estate website built with Next.js 14, Supabase, GSAP, and Framer Motion. It is designed specifically for property buyers with direct WhatsApp integration.

## 🚀 Deployment Guide (Vercel + Supabase)

### 1. Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** and run the following to create tables:

```sql
-- Create properties table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  price BIGINT NOT NULL,
  location TEXT NOT NULL,
  type TEXT CHECK (type IN ('Flat', 'House', 'Plot')),
  description TEXT,
  images TEXT[] DEFAULT '{}',
  bedrooms INT,
  bathrooms INT,
  area TEXT,
  amenities TEXT[] DEFAULT '{}',
  latitude FLOAT,
  longitude FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create enquiry table
CREATE TABLE buyer_enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Optional but recommended)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON properties FOR SELECT USING (true);
```

### 2. Google Maps API
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a Project and Enable **Maps JavaScript API**.
3. Create an API Key in **Credentials**.

### 3. Environment Variables
Create a `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER=91XXXXXXXXXX
```

### 4. Deploy to Vercel
1. Push this code to GitHub.
2. Link your repository to a new project in [Vercel](https://vercel.com).
3. Add the environment variables in Vercel project settings.
4. Click **Deploy**.

## 🏘️ Features
- **Buyer Centric**: Clean, focused interface for searching and viewing properties.
- **WhatsApp Integration**: Instant enquiry via pre-filled WhatsApp messages.
- **Admin Panel**: Secure dashboard to manage listings and view buyer leads.
- **Premium UI**: Smooth animations using GSAP and Framer Motion.
- **Map View**: Location clarity with Google Maps integration.

## 🛠️ Tech Stack
- Frontend: Next.js 14 (App Router)
- Styling: Tailwind CSS
- Animations: GSAP, Framer Motion
- Backend: Supabase (Auth + DB)
