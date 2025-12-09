import { createClient } from '@supabase/supabase-js'

const URL = 'https://pmkafuubahivepqusdfl.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBta2FmdXViYWhpdmVwcXVzZGZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3ODEzNTYsImV4cCI6MjA4MDM1NzM1Nn0.LoSAh2PMRUJKNVKhyEgMuEznOWw9opCRomPiKDIKymU';
export const supabase = createClient(URL, API_KEY);