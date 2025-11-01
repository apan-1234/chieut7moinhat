// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qdkbtuhfpyhwrreyghgu.supabase.co"; // dán URL bạn vừa copy
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFka2J0dWhmcHlod3JyZXlnaGd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5Nzc5MzUsImV4cCI6MjA3NzU1MzkzNX0.yqyq_-U9oNgDR8t3uWaHikgeaBxxrjdrEYEL43nbXGg"; // dán key bạn copy

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
