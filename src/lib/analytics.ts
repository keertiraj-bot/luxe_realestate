"use client";

export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
    // In production, you would connect this to Google Analytics, Facebook Pixel, or Mixpanel
    console.log(`[ANALYTICS]: ${eventName}`, params);

    // Future expansion for GTM:
    /*
    if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
            event: eventName,
            ...params
        });
    }
    */
};
