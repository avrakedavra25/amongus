import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface RegistrationData {
  id?: string;
  fullName: string;
  scholarNumber: string;
  branch: string;
  email: string;
  phoneNumber: string;
  hostelSector: string;
  crewmateColor: string;
  registeredAt?: string;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Check if valid credentials are provided
const isConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your-project-id') &&
  !supabaseAnonKey.includes('your-anon-key') &&
  !supabaseAnonKey.includes('your-key-here')
);

export const supabase: SupabaseClient | null = (isConfigured && supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const LOCAL_STORAGE_KEY = 'amongus_campus_registrations';

/**
 * Saves a participant registration to Supabase if configured,
 * or gracefully persists to localStorage as a fallback.
 */
export async function submitRegistration(data: Omit<RegistrationData, 'id' | 'registeredAt'>): Promise<{
  success: boolean;
  isOfflineMode: boolean;
  registration: RegistrationData;
  error?: string;
}> {
  const newRecord: RegistrationData = {
    ...data,
    id: `CREW-${Math.floor(100000 + Math.random() * 900000)}`,
    registeredAt: new Date().toISOString()
  };

  // Try Supabase first if configured
  if (supabase) {
    try {
      const { error } = await supabase
        .from('registrations')
        .insert([
          {
            full_name: newRecord.fullName,
            scholar_number: newRecord.scholarNumber,
            branch: newRecord.branch,
            email: newRecord.email,
            phone_number: newRecord.phoneNumber,
            hostel_sector: newRecord.hostelSector,
            crewmate_color: newRecord.crewmateColor,
            created_at: newRecord.registeredAt
          }
        ]);

      if (error) {
        console.warn('Supabase insert failed, saving to local offline storage:', error.message);
      } else {
        return {
          success: true,
          isOfflineMode: false,
          registration: newRecord
        };
      }
    } catch (err) {
      console.warn('Network error reaching Supabase, using local fallback:', err);
    }
  }

  // LocalStorage Fallback
  try {
    const existing = getLocalRegistrations();
    existing.push(newRecord);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
    return {
      success: true,
      isOfflineMode: true,
      registration: newRecord
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown storage error';
    return {
      success: false,
      isOfflineMode: true,
      registration: newRecord,
      error: message
    };
  }
}

export function getLocalRegistrations(): RegistrationData[] {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}
