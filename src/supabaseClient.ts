// src/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qdkbtuhfpyhwrreyghgu.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFka2J0dWhmcHlod3JyZXlnaGd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5Nzc5MzUsImV4cCI6MjA3NzU1MzkzNX0.yqyq_-U9oNgDR8t3uWaHikgeaBxxrjdrEYEL43nbXGg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
