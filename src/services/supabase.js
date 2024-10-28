import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ajnppociocqtqwziddgv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqbnBwb2Npb2NxdHF3emlkZGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4NjM0MjksImV4cCI6MjA0MjQzOTQyOX0.9G3Y1gejeeeOgVhhcdnnWiolF0xO3T4gHZt3Vx7HRrw";

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
