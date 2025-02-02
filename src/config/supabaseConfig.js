import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sgkyldaxfbijtravxhth.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNna3lsZGF4ZmJpanRyYXZ4aHRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzOTEyOTYsImV4cCI6MjA1Mzk2NzI5Nn0.AzMJW7G2foLJ3EN_eQfQOfmGoweYI1cFBWuHK06TtDk";

export const supabase = createClient(supabaseUrl, supabaseKey);
