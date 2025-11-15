// src/supabaseAdmin.ts
import { createClient } from "@supabase/supabase-js";

// URL của project Supabase
const supabaseUrl = "https://qdkbtuhfpyhwrreyghgu.supabase.co";

// Đây là **SERVICE ROLE KEY** (không phải anon key!)
const supabaseServiceRoleKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFka2J0dWhmcHlod3JyZXlnaGd1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTk3NzkzNSwiZXhwIjoyMDc3NTUzOTM1fQ.dC0IdurHNoww-VrE7B52WK6Msps6dgBXNIlfhI2s44w";

// Export client admin
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
