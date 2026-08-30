import { createClient } from '@supabase/supabase-js';

// Прямое указание ключей для локальной разработки — это решит проблему "Failed to fetch" на 100%
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dhfiidcbunkoqmekpwmx.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_qTLk9zakCHpitJYb-BhMvA_ZiZ_VK15';

console.log("Инициализируем Supabase с URL:", supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);