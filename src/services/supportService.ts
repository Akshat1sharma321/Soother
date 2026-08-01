// Finds real mental-health support places near the user by combining:
// - the browser Geolocation API (user's coordinates, with permission)
// - Nominatim reverse geocoding (coordinates -> readable place name)
// - the Overpass API over OpenStreetMap (nearby counselling centres,
//   social support facilities, and community centres)
// All three are free, keyless, and CORS-friendly.

export interface UserLocation {
  lat: number;
  lon: number;
  city?: string;
}

export interface SupportPlace {
  id: string;
  name: string;
  type: string;
  lat: number;
  lon: number;
  distanceKm: number;
  address?: string;
}

export function getUserLocation(): Promise<UserLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }),
      (error) => {
        const message =
          error.code === error.PERMISSION_DENIED
            ? "Location permission was denied. Please allow location access and try again."
            : "Could not determine your location. Please try again.";
        reject(new Error(message));
      },
      { timeout: 15000, maximumAge: 300000 }
    );
  });
}

export async function reverseGeocode(
  lat: number,
  lon: number
): Promise<string | undefined> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=10`
    );
    if (!response.ok) return undefined;
    const data = await response.json();
    const addr = data?.address ?? {};
    return (
      addr.city || addr.town || addr.village || addr.county || addr.state
    );
  } catch {
    // Place name is cosmetic; results still work without it.
    return undefined;
  }
}

const haversineKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const placeTypeLabel = (tags: Record<string, string>): string => {
  if (tags.healthcare === "psychotherapist") return "Therapy & Counselling";
  if (tags.healthcare === "counselling") return "Counselling Centre";
  if (tags.healthcare === "psychiatry") return "Psychiatric Care";
  if (tags.amenity === "social_facility") return "Social Support Facility";
  if (tags.amenity === "community_centre") return "Community Centre";
  return "Support Facility";
};

const buildAddress = (tags: Record<string, string>): string | undefined => {
  const parts = [
    tags["addr:street"],
    tags["addr:suburb"],
    tags["addr:city"],
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : undefined;
};

export async function fetchNearbySupport(
  lat: number,
  lon: number,
  radiusKm = 10
): Promise<SupportPlace[]> {
  const radiusM = radiusKm * 1000;
  const query = `
    [out:json][timeout:25];
    (
      nwr["healthcare"~"psychotherapist|counselling|psychiatry"](around:${radiusM},${lat},${lon});
      nwr["amenity"="social_facility"](around:${radiusM},${lat},${lon});
      nwr["amenity"="community_centre"](around:${radiusM},${lat},${lon});
    );
    out center tags 60;
  `;

  // The public Overpass instances are sometimes busy — try mirrors in order.
  const endpoints = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass.private.coffee/api/interpreter",
  ];

  let data: any = null;
  let lastError: Error | null = null;
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `data=${encodeURIComponent(query)}`,
      });
      if (!response.ok) {
        throw new Error(`Overpass API error: ${response.status}`);
      }
      data = await response.json();
      break;
    } catch (error) {
      lastError =
        error instanceof Error ? error : new Error("Overpass request failed");
    }
  }
  if (data === null) {
    throw (
      lastError ??
      new Error("All Overpass servers are busy right now. Please try again.")
    );
  }
  const elements: any[] = data?.elements ?? [];

  const places = elements
    .map((el): SupportPlace | null => {
      const tags: Record<string, string> = el.tags ?? {};
      const placeLat = el.lat ?? el.center?.lat;
      const placeLon = el.lon ?? el.center?.lon;
      if (!tags.name || placeLat === undefined || placeLon === undefined) {
        return null;
      }
      return {
        id: `${el.type}-${el.id}`,
        name: tags.name,
        type: placeTypeLabel(tags),
        lat: placeLat,
        lon: placeLon,
        distanceKm: haversineKm(lat, lon, placeLat, placeLon),
        address: buildAddress(tags),
      };
    })
    .filter((p): p is SupportPlace => p !== null)
    .sort((a, b) => a.distanceKm - b.distanceKm);

  return places.slice(0, 12);
}
